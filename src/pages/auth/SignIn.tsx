import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from '../../components/Toasts';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const loc = useLocation() as any;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast('Signed in');
      nav(loc.state?.from?.pathname ?? '/');
    } catch (e: any) {
      toast(e.message);
    }
  };

  return (
    <section className="max-w-md mx-auto card p-5">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form className="space-y-3" onSubmit={submit}>
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn-primary w-full">Sign In</button>
      </form>
      <div className="mt-3 text-sm">
        <Link to="/auth/reset" className="underline">Forgot password?</Link>
        <div className="mt-2">No account? <Link to="/auth/signup" className="underline">Sign up</Link></div>
      </div>
    </section>
  );
}
