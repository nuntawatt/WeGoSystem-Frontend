import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/wego-logo.png';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import clsx from 'clsx';

const APP_NAME = import.meta.env.VITE_APP_NAME || 'WeGo';

export default function Navbar() {
  const { user } = useAuth();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx('px-3 py-2 rounded-lg transition hover:bg-white/10', isActive && 'bg-white/10');

  return (
    <header className="sticky top-0 z-50 bg-primary-900/70 backdrop-blur ring-1 ring-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          {/* กล่องโลโก้แบบ badge เพื่อให้ PNG โดดเด่นบนพื้น deep blue */}
          <span className="inline-flex items-center justify-center rounded-xl bg-brand-choco ring-1 ring-brand-gold/30 p-1.5 shadow-brand-soft">
            <img
              src={logo}
              alt={`${APP_NAME} logo`}
              className="h-9 w-9 sm:h-11 sm:w-11 object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </span>

          {/* wordmark สีทองให้เข้าธีม */}
          <span className="text-lg sm:text-xl font-extrabold tracking-wide text-brand-gold">
            {APP_NAME}
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-2 sm:gap-3">
          <NavLink to="/" className={linkClass}>Explore</NavLink>
          <NavLink to="/create" className={linkClass}>Create</NavLink>

          {user ? (
            <>
              <span className="hidden md:inline text-sm opacity-90 mr-1 max-w-[180px] truncate">
                {user.email}
              </span>
              <NavLink to="/profile" className={linkClass}>Profile</NavLink>
              <button onClick={() => signOut(auth)} className="btn-primary">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/auth/signin" className="btn-primary">Sign in</NavLink>
              <NavLink
                to="/auth/signup"
                className="px-4 py-2 rounded-lg ring-1 ring-white/20 hover:bg-white/10 transition"
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