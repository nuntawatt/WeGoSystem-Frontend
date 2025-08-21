// Purpose: Create activity form + Zod validation + TagSelector
import { useState } from 'react';
import { CreateActivitySchema } from '../lib/validators';
import { toast } from '../components/Toasts';
import TagSelector from '../components/TagSelector';
import { api } from '../lib/apiClient';

export default function Create() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = CreateActivitySchema.safeParse({ name, description: desc, tags });
    if (!parsed.success) {
      toast(parsed.error.errors[0].message);
      return;
    }
    try {
      await api.post('/activities', parsed.data).catch(() => {});
      toast('Activity created');
      setName('');
      setDesc('');
      setTags([]);
    } catch (err) {
      toast('Failed to create (demo only)');
    }
  };

  return (
    <section className="grid md:grid-cols-2 gap-6">
      <form onSubmit={onSubmit} className="card p-4 space-y-3">
        <h3 className="text-xl font-semibold">Create Activity</h3>
        <input
          className="input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="input h-28"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div>
          <div className="text-sm font-medium mb-1">Tags</div>
          <TagSelector value={tags} onChange={setTags} />
        </div>
        <button className="btn-primary w-full" type="submit">
          Create
        </button>
      </form>
      <div className="card p-4">
        <h3 className="text-xl font-semibold mb-2">Tips</h3>
        <ul className="list-disc ml-5 space-y-1 opacity-90">
          <li>Use clear titles</li>
          <li>Add at least 1–3 tags</li>
          <li>Provide a short, friendly description</li>
        </ul>
      </div>
    </section>
  );
}