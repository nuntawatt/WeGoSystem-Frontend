// Purpose: demo groups hook (can plug API later)
import { useQuery } from '@tanstack/react-query';
export type Group = { id: string; name: string; members: number; tags: string[] };

export function useGroups() {
  return useQuery<Group[]>({
    queryKey: ['groups'],
    queryFn: async () => [
      { id: 'g1', name: 'Runners CNX', members: 12, tags: ['running'] },
      { id: 'g2', name: 'Indie Music Fans', members: 8, tags: ['music'] }
    ]
  });
}