import { useAuth } from '../hooks/useAuth';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <section className="max-w-3xl mx-auto p-6">
        <div className="card p-6 animate-pulse">Loading profile…</div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="max-w-3xl mx-auto p-6">
        <div className="card p-6 text-center">
          <p className="opacity-90">Sign in to view profile.</p>
          <a href="/auth/signin" className="btn-primary inline-block mt-4">Go to Sign in</a>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="card p-6 flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 grid place-items-center text-white text-xl font-bold">
          {user.email?.[0]?.toUpperCase() ?? 'U'}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold truncate">{user.email}</h1>
          <p className="text-sm opacity-80 truncate">UID: {user.uid}</p>
        </div>
        <button className="btn-primary" onClick={() => signOut(auth)}>Logout</button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-semibold mb-2">Interests (coming soon)</h3>
          <p className="opacity-80 text-sm">Tag your interests to get better activity matches.</p>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold mb-2">Privacy</h3>
          <ul className="text-sm list-disc ml-5 opacity-90 space-y-1">
            <li>Your email is private by default</li>
            <li>Block/report features available in groups</li>
          </ul>
        </div>
      </div>
    </section>
  );
}