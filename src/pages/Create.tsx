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
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [tags, setTags] = useState<string[]>([]);

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
    const parsed = CreateActivitySchema.safeParse({
      name,
      description: desc,
      tags,
      location,
      date,
      time,
    });

    if (!parsed.success) {
      toast(parsed.error.errors[0].message);
      return;
    }
    try {
      await api.post('/activities', parsed.data).catch(() => {});
      toast('✅ Activity created successfully!');
      setName('');
      setDesc('');
      setLocation('');
      setDate('');
      setTime('');
      setTags([]);
    } catch {
      toast('❌ Failed to create activity (demo only)');
    }
  };

  return (
    <section className="container-app flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl space-y-8">
        
        {/* ฟอร์มกรอกข้อมูล */}
        <form
          onSubmit={onSubmit}
          className="card p-6 space-y-5 shadow-lg border border-white/10"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Create Activity</h3>
            <span className="text-sm text-gray-300">
              User: <span className="font-medium text-brand-gold">{userName}</span>
            </span>
          </div>

          <div>
            <label className="label" htmlFor="name">Name</label>
            <input
              id="name"
              className="input"
              placeholder="Saturday Hike"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="desc">Description</label>
            <textarea
              id="desc"
              className="input h-24"
              placeholder="Short description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="location">Location</label>
            <input
              id="location"
              className="input"
              placeholder="Central Park, NYC"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                className="input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label" htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                className="input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <div className="label">Tags</div>
            <TagSelector value={tags} onChange={setTags} />
          </div>

          <button className="btn-primary w-full py-2 text-base font-semibold" type="submit">
            🚀 Create Activity
          </button>
        </form>

        {/* Tips Section */}
        <aside className="card p-5 text-sm">
          <h3 className="text-lg font-bold text-white mb-2">💡 Tips for Better Engagement</h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-300">
            <li>Use clear and friendly titles</li>
            <li>Add 1–3 descriptive tags (#fitness, #outdoor, #social)</li>
            <li>Keep description short and helpful</li>
            <li>Provide location, date & time clearly</li>
            <li>Encourage friends to join and share</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
