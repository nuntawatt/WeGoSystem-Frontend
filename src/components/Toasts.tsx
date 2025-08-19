// apps/frontend/src/components/Toasts.tsx
import { useEffect, useState } from 'react';

export default function Toasts() {
  const [toasts, setToasts] = useState<{ id: number; text: string }[]>([]);
  useEffect(() => {
    const handler = (e: CustomEvent<{ text: string }>) => {
      setToasts((t) => [...t, { id: Date.now(), text: e.detail.text }]);
      setTimeout(() => setToasts((t) => t.slice(1)), 3000);
    };
    window.addEventListener('app:toast' as any, handler as any);
    return () => window.removeEventListener('app:toast' as any, handler as any);
  }, []);
  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {toasts.map((t) => (
        <div key={t.id} className="card px-4 py-2">{t.text}</div>
      ))}
    </div>
  );
}

export const toast = (text: string) =>
  window.dispatchEvent(new CustomEvent('app:toast', { detail: { text } }));
