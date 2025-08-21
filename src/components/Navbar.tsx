import { Link, NavLink } from 'react-router-dom';
import wegoPng from '../assets/wego-logo.png'; // ใช้ PNG ที่คุณใส่ไว้
import { useAuth } from '../hooks/useAuth';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import clsx from 'clsx';

const APP_NAME = import.meta.env.VITE_APP_NAME || 'WeGo';

export default function Navbar() {
  const { user } = useAuth();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'px-3 py-2 rounded-lg transition text-white/90 hover:text-white hover:bg-white/10',
      isActive && 'bg-white/10 !text-white'
    );

  return (
    <header className="sticky top-0 z-50 bg-primary-900/70 backdrop-blur ring-1 ring-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={wegoPng}
            onError={(e) => ((e.currentTarget.style.display = 'none'))}
            className="h-8 w-8 rounded-lg shadow-brand-soft"
            alt={`${APP_NAME} logo`}
          />
          <span className="text-xl font-extrabold tracking-wide text-white">
            {APP_NAME}
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-2 sm:gap-3">
          <NavLink to="/" className={linkClass}>
            Explore
          </NavLink>
          <NavLink to="/create" className={linkClass}>
            Create
          </NavLink>

          {user ? (
            <>
              <span className="hidden md:inline text-sm text-white/80 mr-1 max-w-[180px] truncate">
                {user.email}
              </span>
              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>
              <button onClick={() => signOut(auth)} className="btn-primary">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/auth/signin" className="btn-primary">
                Sign in
              </NavLink>
              <NavLink
                to="/auth/signup"
                className="px-4 py-2 rounded-lg ring-1 ring-white/20 hover:bg-white/10 transition text-white"
              >
                Sign up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
