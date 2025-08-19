// apps/frontend/src/components/AvailabilityPicker.tsx
import dayjs from 'dayjs';
import { useAvailability } from '../hooks/useAvailability';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function AvailabilityPicker() {
  const { grid, toggleCell, toRanges } = useAvailability(7, 24);
  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold mb-3">Availability</h3>
      <div className="grid grid-cols-8 gap-1">
        <div />
        {Array.from({ length: 24 }).map((_, h) => (
          <div key={h} className="text-xs text-center opacity-70">{h}</div>
        ))}
        {grid.map((row, d) => (
          <>
            <div key={`label-${d}`} className="text-sm opacity-80 py-1">{days[d]}</div>
            {row.map((on, h) => (
              <button
                key={`${d}-${h}`}
                onClick={() => toggleCell(d, h)}
                title={`${days[d]} ${h}:00`}
                className={`h-7 rounded ${on ? 'bg-primary-500' : 'bg-white/10 hover:bg-white/20'}`}
              />
            ))}
          </>
        ))}
      </div>
      <div className="mt-4">
        <pre className="text-xs opacity-80 whitespace-pre-wrap">
{JSON.stringify(
  toRanges().map(r => ({
    start: dayjs(r.start).format('ddd HH:mm'),
    end: dayjs(r.end).format('ddd HH:mm')
  })), null, 2)}
        </pre>
      </div>
    </div>
  );
}
