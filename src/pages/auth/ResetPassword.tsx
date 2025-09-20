import { useState } from 'react';
import { toast } from '../../components/Toasts';
import { auth } from '../../lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';


export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);


  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast('Password reset sent (check your inbox)');
    } catch (err: any) {
      toast(err?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-app py-10">
      <div className="card p-6 max-w-md mx-auto">
        <h3 className="text-xl font-semibold mb-4">Reset Password</h3>
        <form onSubmit={submit} className="space-y-3">
          <label className="label" htmlFor="email">Email</label>
          <input id="email" className="input" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn-primary w-full" type="submit" disabled={loading}>{loading ? 'Sending…' : 'Send'}</button>
          <p className="text-xs text-white/70">เราจะส่งลิงก์รีเซ็ตรหัสผ่านไปที่อีเมลของคุณ</p>
        </form>
      </div>
    </section>
  );
}