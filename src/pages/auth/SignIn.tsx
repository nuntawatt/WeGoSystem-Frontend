// Purpose: Sign-in with Firebase
import { useState } from 'react';
import { SignInSchema } from '../../lib/validators';
import { toast } from '../../components/Toasts';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = SignInSchema.safeParse({ email, password: pass });
    if (!parsed.success) return toast(parsed.error.errors[0].message);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      toast('Signed in');
      nav('/');
    } catch (err: any) {
      toast(err?.message || 'Failed to sign in');
    }
  };

  return (
    <div className="card p-4 max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-3">Sign in</h3>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
        <button className="btn-primary w-full" type="submit">Sign in</button>
        <div className="text-sm opacity-80 text-center">
          No account? <Link to="/auth/signup" className="underline">Sign up</Link> · <Link to="/auth/reset" className="underline">Reset password</Link>
        </div>
      </form>
    </div>
  );
}