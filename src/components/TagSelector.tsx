// Purpose: tag input + chips + suggestions
import { useState } from 'react';

export default function TagSelector({
  value,
  onChange,
  suggestions = ['running', 'coffee', 'boardgames', 'hiking', 'music', 'yoga'],
}: {
  value: string[];
  onChange: (v: string[]) => void;
  suggestions?: string[];
}) {
  const [input, setInput] = useState('');

  const add = (t: string) => {
    const tag = t.trim().toLowerCase();
    if (!tag) return;
    if (value.includes(tag)) return;
    onChange([...value, tag]);
    setInput('');
  };
  const remove = (t: string) => onChange(value.filter((x) => x !== t));

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((t) => (
          <span key={t} className="tag inline-flex items-center gap-2">
            {t}
            <button type="button" className="opacity-70 hover:opacity-100" onClick={() => remove(t)}>
              ✕
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="input flex-1"
          placeholder="Add a tag and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add(input);
            }
          }}
        />
        <button type="button" className="btn-primary" onClick={() => add(input)}>
          Add
        </button>
      </div>

      {!!suggestions.length && (
        <div className="mt-2 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              type="button"
              key={s}
              className="px-2 py-1 rounded-lg ring-1 ring-white/10 hover:bg-white/10 transition text-sm"
              onClick={() => add(s)}
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}