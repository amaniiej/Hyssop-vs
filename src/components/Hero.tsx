import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export default function Hero() {
  const [offset, setOffset] = useState(0);
  const [showCalendly, setShowCalendly] = useState(false);
  const navigate = useNavigate();
  const savedScrollY = useRef(0);

  // ─── PARALLAX EFFECT ───
  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── ADVANCED SCROLL LOCK ───
  useEffect(() => {
    if (showCalendly) {
      savedScrollY.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top      = `-${savedScrollY.current}px`;
      document.body.style.left     = "0";
      document.body.style.right    = "0";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.position = "";
      document.body.style.top      = "";
      document.body.style.left     = "";
      document.body.style.right    = "";
      document.body.style.overflow = "";
      window.scrollTo({ top: savedScrollY.current, behavior: "instant" as ScrollBehavior });
    }
    return () => {
      document.body.style.position = "";
      document.body.style.overflow = "";
    };
  }, [showCalendly]);

  // ─── MODAL RENDERED VIA PORTAL ───
  const modal = showCalendly ? createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/85 backdrop-blur-xl animate-fadeIn px-4"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={() => setShowCalendly(false)}
    >
      <div
        className="relative w-full max-w-5xl h-[90vh] bg-[#0b1f1a]/80 backdrop-blur-[60px] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl"
        style={{ boxShadow: "0 0 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowCalendly(false)}
          className="absolute top-6 right-6 z-50 bg-white/5 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white border border-white/10 transition-all cursor-pointer"
        >
          <FaTimes />
        </button>

        <iframe
          src="https://calendly.com/hyssopherbswelness/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0b1f1a&text_color=ffffff&primary_color=22c55e"
          width="100%"
          height="100%"
          frameBorder="0"
          className="relative z-10"
          title="Select a Date & Time"
        ></iframe>

        <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-[#0b1f1a] to-transparent z-20 pointer-events-none" />
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0b1f1a]"
      >
        {/* ─── NEW: FADE TO WHITE TRANSITION ─── */}
        <div 
            className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-white via-white/20 to-transparent z-
            [5] pointer-events-none" 
        />

        {/* Background Decorative Glows */}
        <div className="absolute w-150 h-150 bg-green-500/10 blur-[130px] rounded-full -top-48 -left-24" />
        <div className="absolute w-100 h-100 bg-green-900/20 blur-[100px] rounded-full bottom-0 right-0" />

        <div className="container mx-auto px-6 md:px-12 z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* LEFT SIDE: Content */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-green-400 text-sm tracking-[0.55em] uppercase mb-4 font-semibold">
                ልዩ የእፅዋት መፍትሄዎች
              </p>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 font-serif text-white">
                Hyssop Herbs <br />
                <span className="text-green-500">& Wellness</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg italic">
                "ፈውስ ከተፈጥሮ ይጀምራል።" የሰውነትዎን ተፈጥሯዊ ሚዛን ለመመለስ በጥንቃቄ የተዘጋጁትን በእጅ የተሰሩ ኦርጋኒክ መድኃኒቶቻችንን ያግኙ።
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center">
                
                {/* SHOP NOW */}
                <div onClick={() => navigate('/shop')} className="relative group cursor-pointer">
                  <button className="relative px-12 py-5 bg-transparent border-none text-white font-bold text-sm uppercase tracking-widest cursor-pointer z-10 transition-transform active:scale-95">
                    Shop Now
                    <div className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-green-500/20 shadow-[inset_0_0_12px_rgba(74,222,128,0.4)] transition-all duration-300 group-hover:bg-green-500/40 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]" />
                    <div className="absolute inset-0 -z-10 rounded-full p-px" 
                      style={{
                        background: 'linear-gradient(180deg, rgba(134,239,172,0.4) 0%, rgba(134,239,172,0) 100%)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor'
                      }} 
                    />
                  </button>
                </div>

                {/* BOOK CALL */}
                <div onClick={() => setShowCalendly(true)} className="relative group cursor-pointer">
                  <button className="relative px-12 py-5 bg-transparent border-none text-white font-bold text-sm uppercase tracking-widest cursor-pointer z-10 transition-transform active:scale-95">
                    Book A Call
                    <div className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-amber-500/10 shadow-[inset_0_0_12px_rgba(251,191,36,0.3)] transition-all duration-300 group-hover:bg-amber-500/30 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]" />
                    <div className="absolute inset-0 -z-10 rounded-full p-px" 
                      style={{
                        background: 'linear-gradient(180deg, rgba(251,191,36,0.4) 0%, rgba(251,191,36,0) 100%)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor'
                      }} 
                    />
                  </button>
                </div>

              </div>

              <div className="mt-12 flex flex-wrap gap-10 justify-center md:justify-start opacity-70">
                {["100% Organic", "Fast Shipping", "Delivered with Care"].map((text, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-green-1000">✔</span>
                    <span className="text-xs uppercase font-bold tracking-widest text-green-1000">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: Image */}
            <div className="flex-1 relative">
              <div 
                className="relative z-10 w-full max-w-lg mx-auto scale-90"
                style={{ transform: `translateY(${offset * -0.05}px)` }}
              >
                <img
                  src="/images/hero-img.jpeg" 
                  alt="Hyssop Herbs"
                  className="rounded-2xl shadow-2xl border border-white/5 object-cover w-full h-125"
                />
                
                <div className="absolute -bottom-6 -left-6 bg-[#0f3d2e]/90 backdrop-blur-md p-4 rounded-xl border border-green-500/20 shadow-xl hidden md:block text-left">
                  <p className="text-green-400 font-bold text-sm">Customer Choice</p>
                  <p className="text-white text-xs">Pure Hyssop Extract</p>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-500/5 rounded-full" />
            </div>

          </div>
        </div>
      </section>

      {modal}
    </>
  );
}