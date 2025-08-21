// Purpose: read/write user profile in Firestore
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from './useAuth';

export type Profile = { displayName?: string; bio?: string; interests?: string[] };

export function useProfile() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const uid = user?.uid || 'anonymous';

  const q = useQuery<Profile>({
    queryKey: ['profile', uid],
    enabled: !!user,
    queryFn: async () => {
      const snap = await getDoc(doc(db, 'profiles', uid));
      return (snap.data() as Profile) || { displayName: user?.email || '', bio: '', interests: [] };
    }
  });

  const m = useMutation({
    mutationFn: async (p: Profile) => {
      if (!user) throw new Error('not signed in');
      await setDoc(doc(db, 'profiles', uid), p, { merge: true });
      return p;
    },
    onSuccess: (p) => {
      qc.setQueryData(['profile', uid], p);
    }
  });

  return { ...q, updateProfile: m.mutateAsync };
}