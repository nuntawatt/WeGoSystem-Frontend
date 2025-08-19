// apps/frontend/src/hooks/useProfile.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../lib/apiClient';

export const useProfile = () => {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.get('/users/me');
      return data;
    },
    retry: 0
  });

  const updateProfile = useMutation({
    mutationFn: (payload: any) => api.put('/users/me', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] })
  });

  return { ...query, updateProfile: updateProfile.mutate };
};
