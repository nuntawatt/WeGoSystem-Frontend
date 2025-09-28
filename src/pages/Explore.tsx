import { useMemo, useState } from 'react';
import { DEMO_EVENTS, ALL_TAGS, EventItem} from '../lib/demoData';
import TagFilterBar from '../components/TagFilterBar';
import EventCard from '../components/EventCard';

export default function Explore() {
  const [q, setQ] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const toggleTag = (t: string) => setTags((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  const filtered = useMemo(() => {
    let arr: EventItem[] = [...DEMO_EVENTS];
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      arr = arr.filter((e) => e.title.toLowerCase().includes(s) || e.about.toLowerCase().includes(s) || e.tags.some((t) => t.toLowerCase().includes(s)));
    }
    if (tags.length) arr = arr.filter((e) => tags.every((t) => e.tags.includes(t)));
    return arr.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
  }, [q, tags]);

  return (
    <section className="container-app py-10 text-white space-y-6">
      <header className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Explore <span className="brand-gradient">Activities</span>
        </h2>
        <p className="opacity-90">Find buddies and groups</p>
      </header>

      <TagFilterBar allTags={ALL_TAGS} active={tags} onToggle={toggleTag} query={q} onQuery={setQ} />

      {filtered.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filtered.map((ev) => (<EventCard key={ev.id} event={ev} />))}
        </div>
      ) : (
        <div className="card p-8 text-center">
          <div className="text-lg font-semibold">ไม่พบกิจกรรมที่ตรงกับการค้นหา</div>
          <div className="opacity-80">ลองลบตัวกรองหรือพิมพ์คำค้นใหม่อีกครั้ง</div>
        </div>
      )}


      <p className="text-center text-sm opacity-70">* Demo dataset — เมื่อเชื่อมต่อ Backend จะใช้ข้อมูลจริง/Realtime</p>
    </section>
  );
}