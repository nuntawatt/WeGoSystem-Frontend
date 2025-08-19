// apps/frontend/src/components/RatingDialog.tsx
import { useState } from 'react';
import { toast } from './Toasts';

export default function RatingDialog() {
  const [rating, setRating] = useState(0);
  const submit = () => toast(`Thanks! You rated ${rating}/5`);
  return (
    <div className="card p-3">
      <div className="font-semibold mb-2">Rate Activity</div>
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setRating(n)}
            className={`text-2xl ${rating >= n ? 'text-yellow-400' : 'text-white/40'}`}
          >
            ★
          </button>
        ))}
      </div>
      <button className="btn-primary" onClick={submit}>Submit</button>
    </div>
  );
}
