import { useEffect, useRef, useState } from 'react';
import { getSocket } from '../lib/socket';
import { toast } from './Toasts';

type ChatMsg = { id: string; text: string; user: string; at: number; readBy: string[] };

export default function ChatPanel({ groupId }: { groupId: string }) {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const warnedRef = useRef(false);

  useEffect(() => {
    const s = getSocket();

    if (!s) {
      if (!warnedRef.current) {
        warnedRef.current = true;
        toast('Chat server not connected (dev mode). Messages will stay local.');
      }
      return;
    }
    
    setConnected(s.connected);

    const onConnect = () => {
      setConnected(true);
      s.emit('joinGroup', groupId);
    };
    const onDisconnect = () => setConnected(false);

    const onChat = (m: ChatMsg) => setMsgs((prev) => [...prev, m]);
    const onTyping = (u: string) => {
      setTyping(u);
      setTimeout(() => setTyping(null), 1200);
    };
    const onRead = (payload: { messageId: string; userId: string }) => {
      setMsgs((prev) =>
        prev.map((m) =>
          m.id === payload.messageId && !m.readBy.includes(payload.userId)
            ? { ...m, readBy: [...m.readBy, payload.userId] }
            : m
        )
      );
    };

    s.on('connect', onConnect);
    s.on('disconnect', onDisconnect);
    s.on('chatMessage', onChat);
    s.on('typing', onTyping);
    s.on('messageRead', onRead);

    // ถ้าเชื่อมอยู่แล้ว ก็เข้าห้องเลย
    if (s.connected) s.emit('joinGroup', groupId);

    return () => {
      s.off('connect', onConnect);
      s.off('disconnect', onDisconnect);
      s.off('chatMessage', onChat);
      s.off('typing', onTyping);
      s.off('messageRead', onRead);
      if (s.connected) s.emit('leaveGroup', groupId);
    };
  }, [groupId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs.length]);

  const send = () => {
    if (!input.trim()) return;

    const payload: ChatMsg = {
      id: crypto.randomUUID(),
      text: input,
      user: 'me',
      at: Date.now(),
      readBy: ['me'],
    };

    // แสดงทันทีใน UI (optimistic)
    setMsgs((prev) => [...prev, payload]);
    setInput('');

    const s = getSocket();
    if (s && s.connected) {
      s.emit('chatMessage', { groupId, message: payload });
      toast('Message sent');
    } else {
      // ไม่มี backend ก็แค่เงียบ ๆ (dev)
      if (!warnedRef.current) {
        warnedRef.current = true;
        toast('Chat server not connected — message kept locally.');
      }
    }
  };

  const onTyping = () => {
    const s = getSocket();
    if (s && s.connected) s.emit('typing', groupId);
  };

  return (
    <div className="card p-3 h-[480px] flex flex-col">
      <div className="font-semibold mb-2">
        Group Chat
        <span className={`ml-2 text-xs ${connected ? 'text-green-400' : 'text-yellow-300'}`}>
          {connected ? '● connected' : '● offline (local only)'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {msgs.map((m) => (
          <div key={m.id} className={`max-w-[80%] ${m.user === 'me' ? 'ml-auto text-right' : ''}`}>
            <div className="bg-white/10 rounded-lg px-3 py-2">
              <div>{m.text}</div>
              <div className="text-[10px] opacity-60 mt-1">
                {new Date(m.at).toLocaleTimeString()} • Read: {m.readBy.length}
              </div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {typing && <div className="text-xs opacity-70 mt-1">{typing} is typing…</div>}

      <div className="mt-2 flex gap-2">
        <input
          className="input flex-1"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            onTyping();
          }}
          placeholder="Type a message…"
        />
        <button onClick={send} className="btn-primary">
          Send
        </button>
      </div>
    </div>
  );
}