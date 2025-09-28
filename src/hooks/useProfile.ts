// Purpose: read/write user profile in Firestore
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from './useAuth';

export type Profile = {
  username?: string;           
  displayName?: string;
  bio?: string;
  interests?: string[];
  photoURL?: string;            
};

export function useProfile() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const uid = user?.uid || 'anonymous';

  const q = useQuery<Profile>({
    queryKey: ['profile', uid],
    enabled: !!user,
    queryFn: async () => {
      const snap = await getDoc(doc(db, 'profiles', uid));
      const raw = (snap.data() as Profile) || {};

      const emailPrefix = user?.email?.split('@')[0] || '';
      const username = raw.username || emailPrefix;
      const displayName = raw.displayName || user?.displayName || username;

      return {
        username,
        displayName,
        bio: raw.bio || '',
        interests: raw.interests || [],
        photoURL: raw.photoURL || user?.photoURL || '',
      };
    },
  });

  const m = useMutation({
    mutationFn: async (p: Partial<Profile>) => {
      if (!user) throw new Error('not signed in');
      await setDoc(doc(db, 'profiles', uid), p, { merge: true });
      return p;
    },
    onSuccess: (p) => {
      qc.setQueryData<Profile>(['profile', uid], (old) => ({ ...(old || {}), ...(p || {}) }));
    },
  });

  return { ...q, updateProfile: m.mutateAsync };
}
