import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Height cut by 50%: pt-10 pb-5 (was pt-20 pb-10). Background shifted to distinct Charcoal Ink (#061411)
    <footer className="relative bg-[#061411] pt-10 pb-5 px-6 overflow-hidden border-t border-amber-500/20">
      
      {/* --- GROUNDING BORDER ACCENT --- */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute -bottom-24 -left-20 w-48 h-48 bg-green-500/5 blur-[80px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Tightened internal row margins from mb-16 to mb-6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mb-6">
          
          {/* COLUMN 1: BRAND STORY (Tightened spacing) */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src="/logo.png" className="w-8 h-8 brightness-120" alt="Hyssop Logo" />
              <div>
                <h2 className="text-lg font-bold tracking-tight text-white leading-none">Hyssop</h2>
                <p className="text-[9px] text-green-400 uppercase tracking-[0.3em] font-black">Wellness</p>
              </div>
            </div>
            <p className="text-gray-50 text-xs leading-relaxed font-semimedium italic">
              "Healing Begins With Nature." Global ancestral wellness remedies.
            </p>
            <div className="flex gap-4 text-lg text-gray-500 pt-1">
               <a href="https://www.facebook.com/share/17KVuWgHUN/" target="_blank" className="hover:text-amber-400 transition-colors"><FaFacebook /></a>
               <a href="https://www.instagram.com/hyssop_herbs_and_wellness" target="_blank" className="hover:text-amber-400 transition-colors"><FaInstagram /></a>
               <a href="https://www.youtube.com/@addissinanatural" target="_blank" className="hover:text-amber-400 transition-colors"><FaYoutube /></a>
               <a href="https://www.tiktok.com/@hyssopherbswellness?_r=1&_t=ZS-96V2clq11LY" target="_blank" className="hover:text-amber-400 transition-colors"><FaTiktok /></a>
            </div>
          </div>

          {/* COLUMN 2: EAST AFRICA HQ */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-emerald-400 font-black border-b border-white/5 pb-1">East Africa HQ</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-emerald-400 mt-1 text-xs shrink-0" />
                <p className="text-gray-300 text-sm font-light leading-snug">
                  Bole kekere 1st floor # 1-012/5<br />
                  Addis Ababa, Ethiopia
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-emerald-400 text-xs" />
                <p className="text-gray-300 text-sm font-light">+251 952 161 260</p>                
                <p className="text-gray-300 text-sm font-light">or</p>
                <p className="text-gray-300 text-sm font-light">+251 998 267 544</p>
              </div>
            </div>
          </div>

          {/* COLUMN 3: NORTH AMERICA HQ */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-amber-400 font-black border-b border-white/5 pb-1">North America</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-amber-400 mt-1 text-xs shrink-0" />
                <p className="text-gray-300 text-sm font-light leading-snug">
                  Dallas, TX 75038<br />
                  Texas, USA
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-amber-400 text-xs" />
                <p className="text-gray-300 text-sm font-light">+1 214 756 7361</p>
              </div>
            </div>
          </div>

          {/* COLUMN 4: QUICK CONTACT */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black border-b border-white/5 pb-1">Inquiries</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-green-400 text-xs shrink-0" />
                <a href="mailto:Hyssopherbswelness@gmail.com" className="text-gray-300 text-sm font-light hover:text-amber-400 transition-colors truncate block max-w-full">
                  Hyssopherbswelness@gmail.com
                </a>
              </div>
              <div className="pt-1 flex flex-wrap gap-2">
                <a href="/shop">
                  <button className="px-4 py-1.5 border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-gray-300 hover:bg-white hover:text-[#061411] hover:border-white transition-all cursor-pointer">
                    Shop All Herbs
                  </button>
                </a>

              </div>
            </div>
          </div>

        </div>

        {/* --- BOTTOM BAR (Tightened margin pt-4 instead of pt-8) --- */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-gray-500">
          <p>© {currentYear} Hyssop Herbs & Wellness.</p>
          <div className="flex gap-6 italic font-serif opacity-30 lowercase tracking-normal text-xs">
            <span>organic</span>
            <span>small batch</span>
            <span>hand crafted</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
