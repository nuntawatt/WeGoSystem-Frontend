import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useState } from 'react';
import { toast } from '../../components/Toasts';

export default function ResetPassword() {
  const [email, setEmail] = useState('');

  const reset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast('Reset email sent');
    } catch (e: any) {
      toast(e.message);
    }
  };

  return (
    <section className="max-w-md mx-auto card p-5">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form className="space-y-3" onSubmit={reset}>
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="btn-primary w-full">Send reset link</button>
      </form>
    </section>
  );
}
