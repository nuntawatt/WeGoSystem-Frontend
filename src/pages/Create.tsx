// apps/frontend/src/pages/Create.tsx
import { useState } from 'react';
import { CreateActivitySchema } from '../lib/validators';
import { toast } from '../components/Toasts';
import { createActivity } from '../lib/firestore';
import { useAuth } from '../hooks/useAuth';

export default function Create() {
  const [form, setForm] = useState({ name: '', description: '', tags: '' });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validate
    const parsed = CreateActivitySchema.safeParse({
      ...form,
      tags: form.tags
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    });
    if (!parsed.success) {
      toast(parsed.error.errors[0].message);
      return;
    }

    if (!user) {
      toast('Please sign in first.');
      return;
    }

    try {
      setLoading(true);
      await createActivity({
        title: parsed.data.name,
        description: parsed.data.description,
        tags: parsed.data.tags,
        createdBy: user.uid,
      });
      toast('✅ Activity created successfully!');
      setForm({ name: '', description: '', tags: '' });
    } catch (err: any) {
      console.error(err);
      toast('❌ Failed to create activity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid md:grid-cols-2 gap-6">
      <form onSubmit={onSubmit} className="card p-4 space-y-3">
        <h3 className="text-xl font-semibold">Create Activity</h3>
        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <textarea
          className="input h-28"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="input"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <button
          className="btn-primary w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Create'}
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
