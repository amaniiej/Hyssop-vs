import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CTA() {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);

  // Rotate the "Seal" based on scroll for a premium interactive feel
  useEffect(() => {
    const handleScroll = () => setRotation(window.scrollY * 0.2);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-32 px-6 bg-[#0b1f1a] overflow-hidden">
      
      {/* --- CINEMATIC IMAGE BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 brightness-[0.4] grayscale-20"
          style={{ backgroundImage: "url('/images/hero-img.jpeg')" }}
        />
        {/* Subtle Vignette to blend edges */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0b1f1a] via-transparent to-[#0b1f1a]" />
      </div>

      {/* --- SURPRISE GRAPHIC: GIANT HOLLOW TYPOGRAPHY --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-10">
        <h2 
          className="text-[20vw] font-black leading-none opacity-[0.04] uppercase tracking-tighter"
          style={{ 
            WebkitTextStroke: "2px white", 
            color: "transparent",
            transform: 'rotate(-5deg)'
          }}
        >
          Transform
        </h2>
      </div>

      {/* --- CINEMATIC LIGHTING --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-green-500/10 blur-[160px] rounded-full pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Left Side: Bold Statement */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <span className="w-12 h-px bg-amber-400/50"></span>
            <span className="text-amber-400 text-xs tracking-[0.5em] uppercase font-bold">Your Sanctuary Awaits</span>
          </div>
          
          <h3 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
            Ready to Begin <br />
            <span className="italic">Your Sacred Return?</span>
          </h3>
          
          <p className="text-gray-100 text-lg md:text-xl max-w-lg mb-10 font-light leading-relaxed">
            ከዘመናዊው ሕይወት ጫጫታ ፈቀቅ ይበሉና የምድርን የፈውስ ጥበብ መልሰው ያግኙ። ወደ ጤና የሚወስደው ጉዞዎ በአንድ ዉሳኔ ብቻ ይጀምራል።
          </p>

          {/* THE BUTTON: REWRITTEN WITH TANIADOU DNA */}
          <div className="relative inline-block group cursor-pointer">
            <button 
              onClick={() => navigate('/shop')}
              className="relative px-12 py-5 bg-transparent border-none text-white font-black uppercase tracking-[0.3em] text-[11px] cursor-pointer z-10 transition-transform active:scale-95"
            >
              Enter The Shop
              
              {/* 1. Base Layer (Inset Shadow & Glow) */}
              <div className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-green-500/20 shadow-[inset_0_0_12px_rgba(74,222,128,0.4)] transition-all duration-300 group-hover:bg-green-500/40 group-hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]" />
              
              {/* 2. Border Mask Layer */}
              <div className="absolute inset-0 -z-10 rounded-full p-px" 
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor'
                }} 
              />

              {/* 3. Interactive Shimmer */}
              <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden pointer-events-none">
                 <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-45 -translate-x-full group-hover:animate-shimmer" />
              </div>
            </button>
          </div>
        </div>

        {/* Right Side: THE ROTATING SEAL */}
        <div className="relative flex-1 flex justify-center items-center">
          
          <div 
            className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="text-[7.5px] uppercase tracking-[0.6em] fill-white/30 font-bold">
                <textPath xlinkHref="#circlePath">
                  • SACRED • ORGANIC • POTENT • REMEMBERED • 
                </textPath>
              </text>
            </svg>
          </div>

          <div className="absolute w-24 h-24 md:w-32 md:h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center">
            <span className="text-4xl md:text-5xl">@</span>
            <div className="absolute inset-0 rounded-full bg-linear-to-tr from-green-500/20 to-transparent animate-pulse" />
          </div>
          
        </div>

      </div>

      {/* Background grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-30" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }}></div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
      `}</style>
    </section>
  );
}