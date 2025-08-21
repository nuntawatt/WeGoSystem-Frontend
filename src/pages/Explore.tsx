// Explore Events with search + tag filter + cards grid
import { useMemo, useState } from 'react';
import { DEMO_EVENTS, ALL_TAGS, EventItem, DEMO_REVIEWS } from '../lib/demoData';
import TagFilterBar from '../components/TagFilterBar';
import EventCard from '../components/EventCard';
import ReviewSummary from '../components/ReviewSummary';

export default function Explore() {
  const [q, setQ] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const toggleTag = (t: string) =>
    setTags((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  const filtered = useMemo(() => {
    let arr: EventItem[] = [...DEMO_EVENTS];
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      arr = arr.filter(
        (e) =>
          e.title.toLowerCase().includes(s) ||
          e.about.toLowerCase().includes(s) ||
          e.tags.some((t) => t.toLowerCase().includes(s))
      );
    }
    if (tags.length) arr = arr.filter((e) => tags.every((t) => e.tags.includes(t)));
    return arr.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
  }, [q, tags]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 text-white space-y-6">
      <header className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Explore <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-yellow-300 to-teal-300">Activities</span>
        </h2>
        <p className="opacity-90">Find buddies and groups — deep blue edition 💙</p>
      </header>

      <TagFilterBar allTags={ALL_TAGS} active={tags} onToggle={toggleTag} query={q} onQuery={setQ} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filtered.map((ev) => (
          <EventCard key={ev.id} event={ev} />
        ))}
      </div>

      <div className="pt-4">
        <ReviewSummary items={DEMO_REVIEWS[filtered[0]?.id] ?? []} />
      </div>

      <p className="text-center text-sm opacity-70">
        * Demo dataset — เมื่อเชื่อมต่อ Backend จะใช้ข้อมูลจริง/Realtime
      </p>
    </section>
  );
}