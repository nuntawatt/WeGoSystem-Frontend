// Purpose: Reset password via Firebase
import { useState } from 'react';
import { toast } from '../../components/Toasts';
import { auth } from '../../lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ResetPassword() {
  const [email, setEmail] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast('Password reset sent (check your inbox)');
    } catch (err: any) {
      toast(err?.message || 'Failed to send reset email');
    }
  };

  return (
    <div className="card p-4 max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-3">Reset Password</h3>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="btn-primary w-full" type="submit">Send</button>
      </form>
    </div>
  );
}