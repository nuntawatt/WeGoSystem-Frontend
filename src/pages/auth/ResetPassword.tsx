import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../../components/Toasts';
import { auth } from '../../lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const PUBLIC_URL =
  import.meta.env.VITE_PUBLIC_URL || (typeof window !== 'undefined' ? window.location.origin : '');

const USE_HOSTED =
  String(import.meta.env.VITE_AUTH_HOSTED || '').toLowerCase() === 'true';

const actionCodeSettings = USE_HOSTED
  ? { url: `${PUBLIC_URL}/auth/signin`, handleCodeInApp: false }
  : { url: `${PUBLIC_URL}/auth/reset`, handleCodeInApp: true };

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return toast('กรุณากรอกอีเมล');

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, trimmed, actionCodeSettings);

      toast(
        USE_HOSTED
          ? 'ส่งลิงก์รีเซ็ตแล้ว (ใช้หน้ารีเซ็ตของ Firebase)'
          : 'ส่งลิงก์รีเซ็ตรหัสผ่านแล้ว กรุณาเช็คอีเมลของคุณ'
      );

      if (!USE_HOSTED) {
        const u = new URLSearchParams({ hint: 'check-email', email: trimmed });
        nav(`/auth/reset?${u.toString()}`, { replace: true });
      }
    } catch (err: any) {
      console.error('[reset password]', err?.code, err?.message);
      const code = err?.code as string | undefined;
      const message =
        code === 'auth/invalid-email' ? 'อีเมลไม่ถูกต้อง'
      : code === 'auth/user-not-found' ? 'ไม่มีผู้ใช้ด้วยอีเมลนี้'
      : code === 'auth/operation-not-allowed' ? 'ยังไม่ได้เปิด Email/Password ใน Firebase'
      : code === 'auth/network-request-failed' ? 'เครือข่ายขัดข้อง ลองใหม่'
      : code === 'auth/too-many-requests' ? 'ส่งคำขอมากเกินไป โปรดลองใหม่ภายหลัง'
      : 'ส่งอีเมลไม่สำเร็จ';
      toast(message);
    } finally {
      setLoading(false);
    }
  };

  const valid = /\S+@\S+\.\S+/.test(email.trim());

  return (
    <section className="container-app py-10">
      <div className="card p-6 max-w-md mx-auto">
        <h3 className="text-xl font-semibold mb-4">Reset Password</h3>
        <form onSubmit={submit} className="space-y-3">
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            className="input"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
          />
          <button className="btn-primary w-full" type="submit" disabled={loading || !valid}>
            {loading ? 'Sending…' : 'Send'}
          </button>
          <p className="text-xs text-white/70">
            เราจะส่งลิงก์รีเซ็ตรหัสผ่านไปที่อีเมลของคุณ
          </p>
          {USE_HOSTED && (
            <p className="text-xs text-white/50">
              * โหมดทดสอบ: ใช้หน้ารีเซ็ตของ Firebase (handleCodeInApp: false)
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
