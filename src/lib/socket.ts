import { io, Socket } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL;

let socket: Socket | null = null;

export function getSocket(): Socket | null {
  if (!API_URL) return null;       
  if (socket) return socket;

  socket = io(API_URL, {
    transports: ['websocket'],
    autoConnect: false,                
    path: '/socket.io',
  });

  socket.on('connect_error', () => {
  });

  return socket;
}

// helper สำหรับหน้า GroupDetail เวลาอยากเชื่อมจริง
export function connectSocket() {
  const s = getSocket();
  if (s && !s.connected) s.connect();
}
export function disconnectSocket() {
  if (socket && socket.connected) socket.disconnect();
}