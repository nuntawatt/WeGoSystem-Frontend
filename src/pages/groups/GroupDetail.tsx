import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MemberList from '../../components/MemberList';
import ChatPanel from '../../components/ChatPanel';
import AvailabilityPicker from '../../components/AvailabilityPicker';
import RatingDialog from '../../components/RatingDialog';
import { connectSocket, disconnectSocket, getSocket } from '../../lib/socket';

export default function GroupDetail() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    // เชื่อมต่อเฉพาะเมื่ออยู่ในหน้า Group
    connectSocket();
    const s = getSocket();
    if (s && id) s.emit('joinGroup', id);

    return () => {
      if (s && id && s.connected) s.emit('leaveGroup', id);
      disconnectSocket();
    };
  }, [id]);

  if (!id) {
    return (
      <section className="card p-5">
        <div className="font-semibold">Group not found.</div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <ChatPanel groupId={id} />
        <RatingDialog />
      </div>
      <div className="space-y-6">
        <MemberList />
        <AvailabilityPicker />
      </div>
    </section>
  );
}