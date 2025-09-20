import { useMemo, useState } from 'react';
import { CreateActivitySchema } from '../lib/validators';
import { toast } from '../components/Toasts';
import TagSelector from '../components/TagSelector';
import { api } from '../lib/apiClient';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../hooks/useAuth';

export default function Create() {
  const { user } = useAuth();
  const { data } = useProfile();

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  // ใช้ชื่อที่สมัครเป็นตัวแสดงผล
  const userName = useMemo(
    () =>
      (data?.displayName?.trim() ||
        user?.displayName?.trim() ||
        user?.email?.split('@')[0] ||
        '') as string,
    [data?.displayName, user?.displayName, user?.email]
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = CreateActivitySchema.safeParse({ name, description: desc, tags });
    if (!parsed.success) { toast(parsed.error.errors[0].message); return; }
    try {
      await api.post('/activities', parsed.data).catch(() => {});
      toast('Activity created');
      setName(''); setDesc(''); setTags([]);
    } catch { toast('Failed to create (demo only)'); }
  };

  return (
    <section className="container-app grid md:grid-cols-2 gap-6 py-8">
      <form onSubmit={onSubmit} className="card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Create Activity</h3>
          <span className="text-sm opacity-80">User: <span className="font-medium">{userName}</span></span>
        </div>

        <div>
          <label className="label" htmlFor="name">Name</label>
          <input id="name" className="input" placeholder="e.g. Saturday Hike" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label className="label" htmlFor="desc">Description</label>
          <textarea id="desc" className="input h-28" placeholder="Short description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>

        <div>
          <div className="label">Tags</div>
          <TagSelector value={tags} onChange={setTags} />
        </div>

        <button className="btn-primary w-full" type="submit">Create</button>
      </form>

      <aside className="card p-5">
        <h3 className="text-xl font-semibold mb-2">Tips</h3>
        <ul className="list-disc ml-5 space-y-1 opacity-90">
          <li>Use clear, friendly titles</li>
          <li>Add 1–3 descriptive tags</li>
          <li>Keep description short and helpful</li>
        </ul>
      </aside>
    </section>
  );
}
