import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import { toast } from '../../components/Toasts';

function pick(paramStr: string, key: string) {
  const p = new URLSearchParams(paramStr);
  return p.get(key) || '';
}
function getFromQueryOrHash(loc: Location, key: string) {
  return pick(loc.search, key) || (loc.hash ? pick(loc.hash.startsWith('#') ? loc.hash.slice(1) : loc.hash, key) : '');
}

export default function ResetPasswordConfirm() {
  const nav = useNavigate();
  const loc = useLocation();

  const mode = useMemo(() => getFromQueryOrHash(window.location, 'mode'), [loc.search, loc.hash]);
  const oobCode = useMemo(() => getFromQueryOrHash(window.location, 'oobCode'), [loc.search, loc.hash]);
  const apiKeyFromLink = useMemo(() => getFromQueryOrHash(window.location, 'apiKey'), [loc.search, loc.hash]);
  const apiKeyFromApp = import.meta.env.VITE_FIREBASE_API_KEY;

  const [email, setEmail] = useState('');
  const [stage, setStage] = useState<'checking'|'ready'|'done'|'error'|'need-link'>('checking');
  const [reason, setReason] = useState('');

  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [touchedPass, setTouchedPass] = useState(false);
  const [touchedPass2, setTouchedPass2] = useState(false);
  const [loading, setLoading] = useState(false);

  const [manualLink, setManualLink] = useState('');

  // validation
  const tooShort = pass.length > 0 && pass.length < 6;
  const mismatch = pass2.length > 0 && pass !== pass2;
  const showPassErr = touchedPass && tooShort;
  const showPass2Err = touchedPass2 && mismatch;
  const canSubmit = pass.length >= 6 && pass2.length >= 6 && pass === pass2 && !!oobCode && !loading;

  useEffect(() => {
    (async () => {
      try {
        if (!oobCode) {
          setStage('need-link');
          setReason('ลิงก์นี้ไม่มีโค้ดรีเซ็ต (oobCode)');
          return;
        }
        if (mode && mode !== 'resetPassword') throw new Error('invalid-mode');
        if (apiKeyFromLink && apiKeyFromApp && apiKeyFromLink !== apiKeyFromApp) {
          throw new Error('project-mismatch');
        }

        const mail = await verifyPasswordResetCode(auth, oobCode);
        setEmail(mail);
        setStage('ready');
      } catch (e: any) {
        console.error('[verifyPasswordResetCode]', e, { search: loc.search, hash: loc.hash, apiKeyFromLink, apiKeyFromApp });
        setStage('error');
        const msg =
          e?.message === 'invalid-mode' ? 'โหมดของลิงก์ไม่ถูกต้อง' :
          e?.message === 'project-mismatch' ? 'ลิงก์มาจากโปรเจกต์ Firebase คนละตัวกับที่แอปนี้ใช้อยู่' :
          'ลิงก์ไม่ถูกต้องหรือหมดอายุ';
        setReason(msg);
      }
    })();
  }, [oobCode, mode, loc.search, loc.hash, apiKeyFromLink, apiKeyFromApp]);

  const useManualLink = () => {
    try {
      const u = new URL(manualLink);
      const m = pick(u.search, 'mode') || pick(u.hash.replace(/^#/, ''), 'mode');
      const c = pick(u.search, 'oobCode') || pick(u.hash.replace(/^#/, ''), 'oobCode');
      const k = pick(u.search, 'apiKey') || pick(u.hash.replace(/^#/, ''), 'apiKey');

      if (!c) {
        toast('ลิงก์ที่วางไม่มี oobCode');
        return;
      }
      const url = new URL(window.location.href);
      url.searchParams.set('oobCode', c);
      if (m) url.searchParams.set('mode', m);
      if (k) url.searchParams.set('apiKey', k);
      window.location.replace(url.toString());
    } catch {
      toast('รูปแบบลิงก์ไม่ถูกต้อง');
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    try {
      setLoading(true);
      await confirmPasswordReset(auth, oobCode, pass);
      toast('ตั้งรหัสผ่านใหม่เรียบร้อย');
      setStage('done');
      nav('/auth/signin');
    } catch (err: any) {
      console.error('[confirmPasswordReset]', err?.code, err?.message);
      toast('ไม่สามารถตั้งรหัสผ่านได้');
    } finally {
      setLoading(false);
    }
  };

  if (stage === 'checking') {
    return (
      <section className="container-app py-10">
        <div className="card p-6 max-w-md mx-auto">กำลังตรวจสอบลิงก์…</div>
      </section>
    );
  }
  if (stage === 'need-link') {
    return (
      <section className="container-app py-10">
        <div className="card p-6 max-w-md mx-auto space-y-3">
          <div className="text-sm">
            กรุณา <b>เปิดอีเมล</b> แล้วคลิกขวา “Copy link address” จากปุ่มรีเซ็ต จากนั้นวางลิงก์ที่นี่
          </div>
          <input
            className="input"
            placeholder="วางลิงก์จากอีเมล ที่นี่ , ข้อความส่งไปอาจเข้าในกล่องขยะ"
            value={manualLink}
            onChange={(e) => setManualLink(e.target.value)}
          />
          <button className="btn-primary w-full" onClick={useManualLink}>ใช้ลิงก์นี้</button>
          {reason && <div className="text-xs text-white/60">สาเหตุ: {reason}</div>}
        </div>
      </section>
    );
  }
  if (stage === 'error') {
    return (
      <section className="container-app py-10">
        <div className="card p-6 max-w-md mx-auto space-y-2">
          <div>ลิงก์ไม่ถูกต้องหรือหมดอายุ กรุณาขอรีเซ็ตใหม่อีกครั้ง</div>
          {reason && <div className="text-xs text-white/70">สาเหตุ: {reason}</div>}
        </div>
      </section>
    );
  }

  return (
    <section className="container-app py-10">
      <div className="card p-6 max-w-md mx-auto">
        <h3 className="text-xl font-semibold mb-4">ตั้งรหัสผ่านใหม่</h3>

        <p className="text-sm text-white/80 mb-4">
          บัญชี: <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={submit} className="space-y-3">
          {/* Password */}
          <label className="label" htmlFor="pass">รหัสผ่านใหม่</label>
          <input
            id="pass"
            className={`input ${showPassErr ? 'ring-2 ring-red-400/70' : ''}`}
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onBlur={() => setTouchedPass(true)}
            placeholder="อย่างน้อย 6 ตัวอักษร"
            autoComplete="new-password"
          />
          {showPassErr && (
            <div className="text-xs text-red-300">รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษร</div>
          )}

          {/* Confirm */}
          <label className="label" htmlFor="pass2">ยืนยันรหัสผ่าน</label>
          <input
            id="pass2"
            className={`input ${showPass2Err ? 'ring-2 ring-red-400/70' : ''}`}
            type="password"
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
            onBlur={() => setTouchedPass2(true)}
            placeholder="พิมพ์รหัสผ่านเดิมอีกครั้ง"
            autoComplete="new-password"
          />
          {showPass2Err && (
            <div className="text-xs text-red-300">รหัสผ่านไม่ตรงกัน</div>
          )}

          <button className="btn-primary w-full" type="submit" disabled={!canSubmit}>
            {loading ? 'Saving…' : 'บันทึกรหัสผ่านใหม่'}
          </button>
        </form>
      </div>
    </section>
  );
}
