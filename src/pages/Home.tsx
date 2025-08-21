// Landing page with logo + tagline + CTA
import { Link } from 'react-router-dom';
import logoPng from '../assets/wego-logo.png';

export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 text-white">
      <div className="flex items-center gap-3 mb-6">
        <img src={logoPng} alt="WeGo" className="h-10 w-10 rounded-lg shadow-brand-soft" />
        <div className="text-2xl font-extrabold">WeGo</div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            ไปคนเดียวไม่ต้องเหงา<br />
            <span className="text-brand-gold">เพราะเราจะหาคนไปด้วยให้คุณ</span>
          </h1>
          <p className="opacity-90 max-w-xl">
            หาเพื่อนร่วมกิจกรรม, จัดกลุ่ม, นัดเวลา, คุยกันในแชต — ครบจบในที่เดียว
          </p>
          <div className="flex gap-3">
            <Link to="/auth/signup" className="btn-primary">สมัครสมาชิก</Link>
            <Link to="/explore" className="px-4 py-2 rounded-lg ring-1 ring-white/20 hover:bg-white/10 transition">
              สำรวจอีเวนต์
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="card p-4">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop"
              alt="Hero"
              className="rounded-xl object-cover h-72 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}