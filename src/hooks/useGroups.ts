// apps/frontend/src/hooks/useGroups.ts
import { useQuery } from '@tanstack/react-query';
import api from '../lib/apiClient';

export const useGroups = () => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/groups');
        return data;
      } catch {
        return [{ _id: 'g1', name: 'Hikers', members: ['Alice', 'Bob'] }];
      }
    }
  });
};
