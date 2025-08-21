import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { toast } from '../../components/Toasts';

export default function SignUp() {
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast('โปรดกรอกชื่อ');
    if (!email.trim()) return toast('โปรดกรอกอีเมล');
    if (pw.length < 6) return toast('รหัสผ่านอย่างน้อย 6 ตัวอักษร');

    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(auth, email, pw);
      await updateProfile(user, { displayName: name });
      toast('สมัครสำเร็จ! 🎉');
      nav('/profile');
    } catch (err: any) {
      const code = String(err?.code || '');
      // แปลง error ของ Firebase ให้เข้าใจง่าย
      if (code.includes('auth/email-already-in-use')) {
        toast(
          'อีเมลนี้มีบัญชีอยู่แล้ว • กด "Sign in" ถ้ามีบัญชี หรือ "Reset password" ถ้าลืมรหัสผ่าน'
        );
      } else if (code.includes('auth/invalid-email')) {
        toast('อีเมลไม่ถูกต้อง');
      } else if (code.includes('auth/weak-password')) {
        toast('รหัสผ่านอ่อนเกินไป (อย่างน้อย 6 ตัวอักษร)');
      } else {
        toast(`สมัครไม่สำเร็จ: ${err?.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] grid place-items-center">
      <form onSubmit={onSubmit} className="card w-full max-w-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-white">Create account</h2>

        <input
          className="input"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          placeholder="name@email.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          placeholder="Password"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Creating…' : 'Sign up'}
        </button>

        <p className="text-center text-sm text-white/80">
          Already have an account?{' '}
          <Link className="underline" to="/auth/signin">
            Sign in
          </Link>
          {' • '}
          <Link className="underline" to="/auth/reset">
            Reset password
          </Link>
        </p>
      </form>
    </div>
  );
}
