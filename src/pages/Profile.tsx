import { useEffect, useRef, useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../hooks/useAuth';
import TagSelector from '../components/TagSelector';
import { toast } from '../components/Toasts';
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { Edit3 } from 'lucide-react';

const BIO_MAX = 240;
const AVATAR_MAX_MB = 5;

async function compressImage(file: File, maxSide = 512, quality = 0.82): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { alpha: true })!;
  ctx.drawImage(bitmap, 0, 0, w, h);

  const blob: Blob = await new Promise((res) =>
    canvas.toBlob((b) => res(b as Blob), 'image/jpeg', quality)
  );
  return blob;
}

export default function Profile() {
  const { user } = useAuth();
  const { data, isLoading, updateProfile } = useProfile();
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [photoURL, setPhotoURL] = useState<string>('');

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const bioRef = useRef<HTMLTextAreaElement | null>(null);
  const storage = getStorage();

  useEffect(() => {
    if (data || user) {
      const emailPrefix = user?.email?.split('@')[0] || '';
      setUsername(data?.username || emailPrefix);
      setDisplayName(data?.displayName || user?.displayName || data?.username || emailPrefix);
      setBio(data?.bio || '');
      setInterests(data?.interests || []);
      setPhotoURL(data?.photoURL || user?.photoURL || '');
    }
  }, [data, user]);

  const openFilePicker = () => fileInputRef.current?.click();

  const onSelectFile = async (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast('กรุณาเลือกไฟล์รูปภาพ');
      return;
    }
    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > AVATAR_MAX_MB) {
      toast(`ไฟล์ใหญ่เกินไป (จำกัด ${AVATAR_MAX_MB} MB)`);
      return;
    }

    let blob: Blob;
    try {
      blob = await compressImage(file, 512, 0.82);
    } catch {
      blob = file;
    }

    const localUrl = URL.createObjectURL(blob);
    setPhotoURL(localUrl);

    if (!user?.uid) return;
    const path = `avatars/${user.uid}.jpg`;
    const ref = storageRef(storage, path);

    setUploading(true);
    setProgress(0);

    let lastPct = 0;
    let timedOut = false;
    const SOFT_TIMEOUT_MS = 45000;
    const STALL_TIMEOUT_MS = 10000;
    let stallTimer: number | undefined;
    const resetStall = () => {
      if (stallTimer) window.clearTimeout(stallTimer);
      stallTimer = window.setTimeout(() => {
        timedOut = true;
        task.cancel();
      }, STALL_TIMEOUT_MS);
    };
    const softTimeout = window.setTimeout(() => {
      timedOut = true;
      task.cancel();
    }, SOFT_TIMEOUT_MS);

    const task = uploadBytesResumable(ref, blob, {
      contentType: 'image/jpeg',
      cacheControl: 'public, max-age=31536000',
    });

    resetStall();

    task.on(
      'state_changed',
      (snap) => {
        const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        if (pct !== lastPct) {
          lastPct = pct;
          setProgress(pct);
          resetStall();
        }
      },
      async () => {
        if (stallTimer) window.clearTimeout(stallTimer);
        window.clearTimeout(softTimeout);

        if (timedOut) {
          try {
            setUploading(true);
            const retry = uploadBytesResumable(ref, blob, {
              contentType: 'image/jpeg',
              cacheControl: 'public, max-age=31536000',
            });
            await new Promise<void>((resolve, reject) => {
              retry.on(
                'state_changed',
                (s) => setProgress(Math.round((s.bytesTransferred / s.totalBytes) * 100)),
                reject,
                () => resolve()
              );
            });
            const url = await getDownloadURL(ref);
            setPhotoURL(url);
            setUploading(false);
            setProgress(100);
            toast('อัปโหลดรูปเรียบร้อย');
            return;
          } catch {
            setUploading(false);
            toast('อัปโหลดช้าหรือเครือข่ายมีปัญหา ลองอีกครั้ง');
            return;
          }
        } else {
          setUploading(false);
          toast('อัปโหลดรูปไม่สำเร็จ');
        }
      },
      async () => {
        if (stallTimer) window.clearTimeout(stallTimer);
        window.clearTimeout(softTimeout);
        const url = await getDownloadURL(task.snapshot.ref);
        setPhotoURL(url);
        setUploading(false);
        setProgress(100);
        toast('อัปโหลดรูปเรียบร้อย');
      }
    );
  };

  const removeAvatar = async () => {
    try {
      if (!user?.uid) return;
      const path = `avatars/${user.uid}.jpg`;
      await deleteObject(storageRef(storage, path)).catch(() => {});
      setPhotoURL('');
      toast('ลบรูปโปรไฟล์แล้ว');
    } catch {
      toast('ลบรูปไม่สำเร็จ');
    }
  };

  const save = async () => {
    try {
      if (bio.length > BIO_MAX) {
        toast(`Bio ยาวเกิน ${BIO_MAX} ตัวอักษร`);
        return;
      }
      await updateProfile({
        username,
        displayName: displayName?.trim() || username,
        bio,
        interests,
        photoURL,
      });
      toast('Profile updated');
      setIsEditingUsername(false);
      setIsEditingBio(false);
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

  const firstChar = (displayName || username || user.email || '?').charAt(0).toUpperCase();

  return (
    <section className="container-app py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <p className="opacity-60 text-sm">Update your public profile and preferences</p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[320px,minmax(0,640px)] items-start">
        <aside className="card p-4 space-y-4 self-start">
          <h3 className="text-lg font-semibold">Profile Picture</h3>

          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0">
              {photoURL ? (
                <img
                  src={photoURL}
                  alt="Avatar"
                  className="h-20 w-20 rounded-full object-cover ring-2 ring-white/20"
                />
              ) : (
                <div className="grid h-20 w-20 place-items-center rounded-full bg-white/10 text-2xl font-semibold ring-2 ring-white/20">
                  {firstChar}
                </div>
              )}
              {uploading && (
                <div className="absolute -bottom-2 left-1/2 w-24 -translate-x-1/2 rounded-full bg-white/10">
                  <div
                    className="h-1 rounded-full bg-gradient-to-r from-amber-400 to-pink-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={openFilePicker}
                className="rounded-full px-4 py-2 font-semibold text-white shadow-lg shadow-amber-500/10
                           bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-400 hover:to-pink-400
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 transition disabled:opacity-60"
                disabled={uploading}
              >
                {uploading ? 'Uploading…' : 'Upload Picture'}
              </button>
              {photoURL && (
                <button
                  onClick={removeAvatar}
                  className="rounded-full px-4 py-2 font-semibold border border-white/15 bg-white/5 hover:bg-white/10"
                >
                  Remove
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                hidden
                onChange={(e) => onSelectFile(e.target.files?.[0] || null)}
              />
              <p className="text-xs text-white/60">แนะนำ 512×512px • ไม่เกิน {AVATAR_MAX_MB}MB</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2">
            <div className="text-base font-medium">Account</div>
            <div className="text-sm opacity-80">{displayName}</div>
            <div className="text-sm opacity-80">{user.email}</div>
          </div>
        </aside>

        <main className="card p-5 space-y-5 self-start w-full max-w-2xl">
          <h3 className="text-lg font-semibold">Your Details</h3>

          <div>
            <label className="label" htmlFor="display">Username</label>
            <div className="relative">
              <input
                id="display"
                ref={usernameRef}
                className={`input pr-10 ${isEditingUsername ? 'ring-2 ring-amber-300/40' : ''}`}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                readOnly={!isEditingUsername}
              />
              <button
                type="button"
                aria-label="Edit username"
                aria-pressed={isEditingUsername}
                onClick={() => {
                  setIsEditingUsername((v) => !v);
                  setTimeout(() => usernameRef.current?.focus(), 0);
                }}
                className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 ring-1 ring-white/15 ${
                  isEditingUsername ? 'bg-amber-500/80' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Edit3 className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          <div>
            <label className="label" htmlFor="email">Email</label>
            <input id="email" className="input" value={user?.email || ''} readOnly />
          </div>

          <div>
            <label className="label" htmlFor="bio">Bio</label>
            <div className="relative">
              <textarea
                id="bio"
                ref={bioRef}
                className={`input h-28 resize-y pr-10 ${isEditingBio ? 'ring-2 ring-amber-300/40' : ''}`}
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX))}
                readOnly={!isEditingBio}
              />
              <button
                type="button"
                aria-label="Edit bio"
                aria-pressed={isEditingBio}
                onClick={() => {
                  setIsEditingBio((v) => !v);
                  setTimeout(() => bioRef.current?.focus(), 0);
                }}
                className={`absolute right-2 top-2 rounded-full p-1 ring-1 ring-white/15 ${
                  isEditingBio ? 'bg-amber-500/80' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Edit3 className="h-4 w-4 text-white" />
              </button>
            </div>
            <div className="text-right text-xs opacity-70">{bio.length}/{BIO_MAX}</div>
          </div>

          <div>
            <div className="label">Interests</div>
            <TagSelector value={interests} onChange={setInterests} />
          </div>

          <div className="pt-2">
            <button className="btn-primary w-auto" onClick={save} disabled={uploading}>
              Save changes
            </button>
          </div>
        </main>
      </div>
    </section>
  );
}
