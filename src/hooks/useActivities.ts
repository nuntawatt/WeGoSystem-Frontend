// fetch activities from API, fallback demo
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/apiClient';

export type Activity = {
  _id?: string;
  name: string;
  description?: string;
  tags?: string[];
  coverUrl?: string;
  date?: string;
};

export function useActivities() {
  return useQuery<Activity[]>({
    queryKey: ['activities'],
    queryFn: async () => {
      const { data } = await api.get('/activities');
      if (Array.isArray(data)) return data as Activity[];

      return [
        {
          _id: 'demo-1',
          name: 'Sunday Boardgames',
          description: 'Casual games & coffee',
          tags: ['boardgames', 'coffee'],
          coverUrl:
            'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1600&auto=format&fit=crop'
        },
        {
          _id: 'demo-2',
          name: 'Hiking @ Doi Suthep',
          description: 'Easy trail + film photo',
          tags: ['hiking', 'film'],
          coverUrl:
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop'
        }
      ];
    }
  });
}