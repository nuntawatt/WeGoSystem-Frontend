import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import clsx from 'clsx';
import LogoWeGoIcon from './LogoWeGoIcon';

const APP_NAME = import.meta.env.VITE_APP_NAME || 'WeGo';

export default function Navbar() {
  const { user } = useAuth();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'px-2 py-1 rounded-md text-white/90 hover:text-white transition font-semibold',
      'hover:underline underline-offset-8 decoration-2',
      isActive && 'underline decoration-2 text-white'
    );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary-900/70 backdrop-blur">
      <div className="container-app flex items-center justify-between py-2">
        <Link to="/" className="flex items-center gap-3" aria-label={APP_NAME}>
          <span className="text-2xl md:text-3xl font-extrabold leading-none">
            <span className="bg-gradient-to-r from-emerald-400 via-amber-300 to-pink-400 bg-clip-text text-transparent">
              We
            </span>
            <span className="text-white">Go</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <NavLink to="/explore" className={linkClass}>Explore</NavLink>
          <NavLink to="/create" className={linkClass}>Create</NavLink>

          {user ? (
            <>
              <NavLink to="/profile" className={linkClass}>Profile</NavLink>
              <button onClick={() => signOut(auth)} className="ml-2 btn-primary rounded-full px-5 py-2">
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/auth/signin" className="ml-2 btn-primary rounded-full px-5 py-2"> Sign in</NavLink>
              <NavLink to="/auth/signup" className="btn-ghost rounded-full px-4 py-2">Sign up</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
