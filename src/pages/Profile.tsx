import { useState, useEffect, useMemo } from 'react';
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

  const userName = useMemo(() => {
    return (
      displayName?.trim() ||
      user?.displayName?.trim() ||
      user?.email?.split('@')[0] ||
      ''
    );
  }, [displayName, user?.displayName, user?.email]);

  useEffect(() => {
    if (data || user) {
      setDisplayName(data?.displayName || user?.displayName || user?.email || '');
      setBio(data?.bio || '');
      setInterests(data?.interests || []);
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

  if (!user)
    return (
      <section className="container-app py-8">
        <div className="card p-4">Please sign in to view profile.</div>
      </section>
    );

  if (isLoading)
    return (
      <section className="container-app py-8">
        <div className="card p-4">Loading…</div>
      </section>
    );

  return (
    <section className="container-app py-8">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <p className="opacity-80 text-sm">Update your public profile and preferences</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="card p-5 space-y-4">
          <h3 className="text-xl font-semibold">Your Profile</h3>

          {/* Username (อ่านอย่างเดียว) */}
          <div>
            <label className="label" htmlFor="username">Username</label>
            <input
              id="username"
              className="input"
              value={userName}
              readOnly
            />
          </div>

          {/* Display name (แก้ไขได้) */}
          <div>
            <label className="label" htmlFor="display">Display name</label>
            <input
              id="display"
              className="input"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="ชื่อที่จะแสดงให้คนอื่นเห็น"
            />
          </div>

          {/* Email (อ่านอย่างเดียว) */}
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              className="input"
              value={user?.email || ''}
              readOnly
            />
          </div>

          {/* Bio */}
          <div>
            <label className="label" htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              className="input h-28"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell others about you in a few lines"
            />
            <div className="text-right text-xs opacity-70">{bio.length}/240</div>
          </div>

          {/* Interests */}
          <div>
            <div className="label">Interests</div>
            <TagSelector value={interests} onChange={setInterests} />
          </div>

          <button className="btn-primary w-full" onClick={save}>Save</button>
        </div>

        {/* Right: Preview / Account */}
        <div className="card p-5 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-white/10 grid place-items-center text-xl font-semibold">
              {(displayName || user.email || '?').charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-lg font-semibold">{displayName || user.email}</div>
              <div className="text-sm opacity-90">{userName}</div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 space-y-3">
            <div>
              <div className="text-sm opacity-80">Username</div>
              <div className="text-base font-medium">{userName}</div>
            </div>
            <div>
              <div className="text-sm opacity-80">Email</div>
              <div className="text-base font-medium">{user.email}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
