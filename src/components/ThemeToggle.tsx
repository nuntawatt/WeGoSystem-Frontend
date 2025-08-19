// apps/frontend/src/components/ThemeToggle.tsx
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [scheme, setScheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', scheme === 'dark');
  }, [scheme]);
  return (
    <button
      className="rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-2"
      onClick={() => setScheme((s) => (s === 'dark' ? 'light' : 'dark'))}
      title="Toggle theme"
    >
      {scheme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
