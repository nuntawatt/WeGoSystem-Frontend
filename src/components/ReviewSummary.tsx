// Small review summary block (demo data)
import { ReviewItem } from '../lib/demoData';

export default function ReviewSummary({ items }: { items: ReviewItem[] }) {
  if (!items?.length) return null;
  const avg = Math.round((items.reduce((s, r) => s + r.rating, 0) / items.length) * 10) / 10;

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Reviews</h4>
        <div className="text-sm">⭐ {avg} / 5 • {items.length} reviews</div>
      </div>
      <ul className="space-y-2 max-h-44 overflow-y-auto pr-1">
        {items.map((r) => (
          <li key={r.id} className="bg-white/5 rounded-lg p-3">
            <div className="text-sm font-semibold">
              {r.user} <span className="opacity-70 text-xs">({r.at})</span>
            </div>
            <div className="text-xs">⭐ {r.rating}</div>
            <div className="text-sm opacity-90">{r.comment}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}