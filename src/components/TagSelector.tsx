// apps/frontend/src/components/TagSelector.tsx
import { useState } from 'react';
import clsx from 'clsx';

export default function TagSelector({
  available,
  value,
  onChange
}: {
  available: string[];
  value: string[];
  onChange: (tags: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>(value);
  const toggle = (tag: string) => {
    const next = selected.includes(tag)
      ? selected.filter((t) => t !== tag)
      : [...selected, tag];
    setSelected(next);
    onChange(next);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {available.map((tag) => (
        <button
          key={tag}
          onClick={() => toggle(tag)}
          className={clsx(
            'px-3 py-1 rounded-full ring-1 ring-white/20 transition',
            selected.includes(tag)
              ? 'bg-primary-500 text-white'
              : 'bg-white/10 text-white/90 hover:bg-white/20'
          )}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}
