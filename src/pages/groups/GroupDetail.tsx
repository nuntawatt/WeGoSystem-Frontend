// Group page with Chat + Members + Availability + Ratings
import { useParams } from 'react-router-dom';
import MemberList from '../../components/MemberList';
import ChatPanel from '../../components/ChatPanel';
import AvailabilityPicker from '../../components/AvailabilityPicker';
import RatingDialog from '../../components/RatingDialog';


export default function GroupDetail() {
  const { id } = useParams();
  return (
    <section className="container-app py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <ChatPanel groupId={id!} />
        <RatingDialog />
      </div>
      <div className="space-y-6">
        <MemberList />
        <AvailabilityPicker />
      </div>
    </section>
  );
}