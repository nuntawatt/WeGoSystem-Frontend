export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-primary-900/60 backdrop-blur">
      <div className="container-app py-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between text-white/70 text-sm">
        
        {/* Left: Brand + copy */}
        <div className="flex flex-col gap-2">
          <span className="text-xl font-extrabold">
            <span className="bg-gradient-to-r from-emerald-400 via-amber-300 to-pink-400 bg-clip-text text-transparent">
              We
            </span>
            <span className="text-white">Go</span>
          </span>
          <p className="max-w-sm text-white/60">
            หาเพื่อนร่วมกิจกรรม จัดกลุ่ม นัดเวลา คุยกันในแชต — ครบจบในที่เดียว
          </p>
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} WeGo. All rights reserved.
          </p>
        </div>

        {/* Middle: Quick links */}
        <div className="flex flex-wrap gap-6">
          <a href="#" className="hover:text-white transition">Explore</a>
          <a href="#" className="hover:text-white transition">Create</a>
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
        </div>

        {/* Right: Socials */}
        <div className="flex gap-5 text-lg">
          <a href="#" className="hover:text-pink-400 transition" aria-label="Facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-sky-400 transition" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-pink-500 transition" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-red-500 transition" aria-label="YouTube">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
