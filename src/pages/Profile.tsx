// Purpose: Profile editor with Firestore storage
import { useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../hooks/useAuth';
import TagSelector from '../components/TagSelector';
import { toast } from '../components/Toasts';

export default function Profile() {
  const { user } = useAuth();
  const { data, isLoading, updateProfile } = useProfile();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setDisplayName(data.displayName || user?.email || '');
      setBio(data.bio || '');
      setInterests(data.interests || []);
    }
  }, [data, user]);

  const save = async () => {
    try {
      await updateProfile({ displayName, bio, interests });
      toast('Profile updated');
    } catch {
      toast('Failed to update profile');
    }
  };

  if (!user) return <div className="card p-4">Please sign in to view profile.</div>;
  if (isLoading) return <div className="card p-4">Loading…</div>;

  return (
    <section className="grid md:grid-cols-2 gap-6">
      <div className="card p-4 space-y-3">
        <h3 className="text-xl font-semibold">Your Profile</h3>
        <input className="input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        <textarea className="input h-28" value={bio} onChange={(e) => setBio(e.target.value)} />
        <div>
          <div className="text-sm font-medium mb-1">Interests</div>
          <TagSelector value={interests} onChange={setInterests} />
        </div>
        <button className="btn-primary w-full" onClick={save}>Save</button>
      </div>
      <div className="card p-4">
        <div className="text-sm opacity-80">Email</div>
        <div className="text-lg font-semibold">{user.email}</div>
        <div className="mt-4">
          <div className="text-sm opacity-80">UID</div>
          <div className="text-xs break-all opacity-90">{user.uid}</div>
        </div>
      </div>
    </section>
  );
}