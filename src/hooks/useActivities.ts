import { useQuery } from '@tanstack/react-query';
import { getActivities } from '../lib/firestore';

export type Activity = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
};

const demoActivities: Activity[] = [
  {
    id: 'demo-1',
    title: 'Hiking Adventure',
    description: 'Explore mountains',
    tags: ['outdoor', 'fitness'],
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'demo-2',
    title: 'Live Music Jam',
    description: "Let's jam",
    tags: ['music', 'guitar'],
    image:
      'https://images.unsplash.com/photo-1520975922161-72f37a6903b5?q=80&w=1200&auto=format&fit=crop',
  },
];

export function useActivities() {
  return useQuery<Activity[]>({
    queryKey: ['activities'],
    queryFn: async () => {
      try {
        const list = await getActivities();
        if (!list || list.length === 0) return demoActivities;
        // getActivities() คืนข้อมูลเป็น {id, ...} อยู่แล้ว
        return list as Activity[];
      } catch (e) {
        console.warn('useActivities: fallback to demo due to Firestore error:', e);
        return demoActivities;
      }
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}