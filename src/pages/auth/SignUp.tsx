import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from '../../components/Toasts';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast('Account created');
      nav('/');
    } catch (e: any) {
      toast(e.message);
    }
  };

  return (
    <section className="max-w-md mx-auto card p-5">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      <form className="space-y-3" onSubmit={submit}>
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn-primary w-full">Sign Up</button>
      </form>
      <div className="mt-3 text-sm">Already have an account? <Link to="/auth/signin" className="underline">Sign in</Link></div>
    </section>
  );
}
