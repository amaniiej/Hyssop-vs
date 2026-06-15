import { useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const mouseRef   = useRef({ x: 0.5, y: 0.5 });
  const targetRef  = useRef({ x: 0.5, y: 0.5 }); 
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate   = useNavigate();

  // ─── UPDATED SERVICES WITH TRANSLATIONS ───
  const services = [
    { name: "100% Organic የሆኑ ኸርቦች", en: "100% Organic Herbs", accent: "emerald", large: true  },
    { name: "ለጉበት", en: "Liver Health", accent: "green", large: false },
    { name: "ለስኳር", en: "Blood Sugar", accent: "teal", large: false },
    { name: "ለደም ግፊት", en: "Hypertension", accent: "teal", large: false },
    { name: "ለአንጀት", en: "Gut Health", accent: "emerald", large: true  },
    { name: "ለእንቅልፍ ማጣት", en: "Insomnia Relief", accent: "indigo", large: false },
    { name: "ለጭንቀት", en: "Anxiety & Stress", accent: "indigo", large: false },
    { name: "ለምጥ", en: "Labor Support", accent: "amber", large: false },
    { name: "ለፔሬድ", en: "Menstrual Care", accent: "rose", large: false },
    { name: "ያለ እድሜ ለማረጥ", en: "Early Menopause", accent: "emerald", large: true  },
    { name: "ለመፀነስ ችግር", en: "Fertility Support", accent: "amber", large: false },
    { name: "ለማንኛውንም አይነት ሆርሞን ችግር", en: "Hormonal Balance", accent: "green", large: false },
    { name: "በባለሞያ የሚታገዙ ምክሮች", en: "Expert Guidance", accent: "teal", large: false },
  ];

  const accentMap: Record<string, { border: string; glow: string; dot: string }> = {
    emerald: { border: "rgba(52,211,153,0.30)",  glow: "rgba(52,211,153,0.08)",  dot: "#34d399" },
    green:   { border: "rgba(74,222,128,0.25)",  glow: "rgba(74,222,128,0.07)",  dot: "#4ade80" },
    teal:    { border: "rgba(45,212,191,0.25)",  glow: "rgba(45,212,191,0.07)",  dot: "#2dd4bf" },
    indigo:  { border: "rgba(129,140,248,0.20)", glow: "rgba(129,140,248,0.06)", dot: "#818cf8" },
    amber:   { border: "rgba(251,191,36,0.22)",  glow: "rgba(251,191,36,0.06)",  dot: "#fbbf24" },
    rose:    { border: "rgba(251,113,133,0.20)", glow: "rgba(251,113,133,0.06)", dot: "#fb7185" },
  };

  // ─── ALIGNED GRID FOR FLOWER LOGO WATERMARKS ───
  const logoGrid = [
    { t: '5%', l: '10%' }, { t: '5%', l: '50%' }, { t: '5%', l: '90%' },
    { t: '25%', l: '30%' }, { t: '45%', l: '90%' },
    { t: '85%', l: '10%' }, { t: '85%', l: '50%' }, { t: '85%', l: '90%' },
    { t: '15%', l: '90%' }, { t: '75%', l: '5%' }
  ];

  // ─── STRIPE REDIRECT LOGIC ───
  const handleBookCall = () => {
    window.location.href = "https://book.stripe.com/test_28E5kw2mIgaafi51Vr8Zq00";
  };

  // ─── CANVAS ANIMATION LOGIC ───
  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    // Detect mobile screens to optimize listeners
    const isMobile = window.innerWidth < 1024;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      targetRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top)  / rect.height,
      };
    };

    // Skip attaching expensive move listener on mobile
    if (!isMobile) {
      section.addEventListener("mousemove", onMove);
    }

    const orbs = [
      { cx: 0.22, cy: 0.40, ax: 0.11, ay: 0.07, pX: 88,  pY: 72,  hue: 148, a: 0.12, r: 0.50 },
      { cx: 0.75, cy: 0.58, ax: 0.09, ay: 0.08, pX: 105, pY: 82,  hue: 158, a: 0.09, r: 0.46 },
      { cx: 0.50, cy: 0.80, ax: 0.07, ay: 0.05, pX: 68,  pY: 92,  hue: 140, a: 0.07, r: 0.38 },
    ];

    const draw = (now: number) => {
      const s = now / 1000;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Re-evaluate mobile state during resize events
      const isMobileNow = window.innerWidth < 1024;

      for (const o of orbs) {
        // If mobile, keep bubbles beautifully static (timeFactor = 0) so they don't consume CPU
        const timeFactor = isMobileNow ? 0 : s;

        const x = (o.cx + Math.sin((timeFactor / o.pX) * Math.PI * 2) * o.ax) * W;
        const y = (o.cy + Math.cos((timeFactor / o.pY) * Math.PI * 2) * o.ay) * H;
        const r = o.r * Math.max(W, H);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0,    `hsla(${o.hue},68%,42%,${o.a})`);
        g.addColorStop(0.45, `hsla(${o.hue},62%,38%,${o.a * 0.3})`);
        g.addColorStop(1,    `hsla(${o.hue},55%,32%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ─── OPTIMIZATION: Skip requestAnimationFrame loop entirely on mobile ───
      if (isMobileNow) {
        return; 
      }

      const ease = 0.03;
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * ease;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * ease;
      const mx = mouseRef.current.x * W;
      const my = mouseRef.current.y * H;
      const mo = ctx.createRadialGradient(mx, my, 0, mx, my, W * 0.30);
      mo.addColorStop(0,   "rgba(74,222,128,0.08)");
      mo.addColorStop(0.5, "rgba(52,211,153,0.03)");
      mo.addColorStop(1,   "rgba(52,211,153,0)");
      ctx.fillStyle = mo;
      ctx.beginPath();
      ctx.arc(mx, my, W * 0.30, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
      ro.disconnect();
    };
  }, []);

  return (
    <section id="services" className="relative overflow-hidden flex flex-col justify-center bg-[#f5f0eb]">
      {/* Seam Fades */}
      <div className="absolute top-0 left-0 right-0 h-36 pointer-events-none z-20"
        style={{ background: "linear-gradient(to bottom, #f5f0eb 0%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none z-20"
        style={{ background: "linear-gradient(to top, #f5f0eb 0%, transparent 100%)" }} />

      {/* ─── HERO IMAGE BLOCK ─── */}
      <div className="relative w-full z-10">
        <img src="/images/hyssop_shapes.png" className="w-full h-auto block" style={{ filter: "brightness(0.35) saturate(0.65) sepia(0.18)" }} alt="Hyssop shapes" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: "rgba(11,31,26,0.35)", mixBlendMode: "multiply" }} />
          <div className="absolute top-0 left-0 right-0 h-1/4" style={{ background: "linear-gradient(to top, transparent, #0b1f1a)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 55% at center, transparent 45%, #0b1f1a 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-[12%]" style={{ background: "linear-gradient(to bottom, transparent, #0b1f1a)" }} />
        </div>
      </div>

      {/* Sacred Rituals Label */}
      <div className="relative z-30 flex justify-center" style={{ marginTop: "-2.5rem" }}>
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-linear-to-r from-transparent via-amber-400" />
          <span className="font-black tracking-[0.6em] uppercase text-[#fde68a]" style={{ fontSize: "12px", textShadow: "0 0 15px rgba(251,191,36,0.8)" }}>
            Sacred Rituals
          </span>
          <div className="h-px w-12 bg-linear-to-l from-transparent via-amber-400" />
        </div>
      </div>

      <div ref={sectionRef} className="relative px-4 pt-16 pb-28 flex flex-col justify-center z-10">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ mixBlendMode: "screen" }} />

        {/* ── GREEN-YELLOWY BACKDROP WITH RICHER SOFT SHADES (FAQ STYLE - 15% bounds) ── */}
        <div 
          className="absolute top-[15%] bottom-[15%] left-0 right-0 z-0 pointer-events-none overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #cbd9b2 0%, #ebecbe 50%, #c4dbb9 100%)", // Richer green-yellow backdrop
          }}
        >
          {/* Soft edge fade overlays to prevent sharp transitions */}
          <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-[#f5f0eb] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#f5f0eb] to-transparent" />
          
          {/* Layered smooth glowing "shades" */}
          <div className="absolute top-[20%] left-1/4 w-100 h-100 bg-green-400/35 blur-[90px] rounded-full mix-blend-multiply animate-pulse-slow" />
          <div className="absolute bottom-[20%] right-1/4 w-100 h-100 bg-yellow-400/30 blur-[90px] rounded-full mix-blend-multiply animate-pulse-slow delay-700" />
        </div>

        {/* ── FLOWER LOGO WATERMARKS (ALIGNED FLOW - Opacity reduced for light background) ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.04]">
          {logoGrid.map((pos, i) => (
            <img 
              key={i}
              src="/images/hysspo-bg-preview.png" 
              className="absolute select-none"
              style={{ 
                top: pos.t, 
                left: pos.l, 
                width: '150px',
                transform: 'translate(60%, -40%) rotate(-15deg)' 
              }}
              alt="" 
            />
          ))}
        </div>

        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(34,197,94,0.05) 0%, transparent 65%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-serif text-[#0b1f1a]] mb-5 leading-tight">
              Healing <em className="text-green-800 italic">Offerings</em>
            </h2>
            <p className="text-[#0b1f1a] text-sm md:text-base font-semibold max-w-xl mx-auto italic leading-relaxed">
              በ Hyssop herbs & wellness የምንሰጣቸው አገልግሎቶች
            </p>
          </div>

          {/* Bubble Cloud - Updated for Dual Language with Visible White Background Design */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-12 gap-y-6 md:gap-y-10 w-full mb-24">
          {services.map((svc, i) => {
          const ac = accentMap[svc.accent];
          return (
          <div key={i} className="group relative cursor-default" style={{ animation: `pill-float ${11 + (i % 6)}s ease-in-out infinite`, animationDelay: `${i * 0.35}s` }}>
          {/* Outer halo glow - stronger on white */}
          <div className="absolute inset-0 rounded-full pointer-events-none" style={{ border: `2px solid ${ac.border}`, animation: `halo-breathe ${7 + (i % 4)}s ease-in-out infinite`, animationDelay: `${i * 0.5}s`, transform: "scale(1.22)", filter: "blur(2px)", opacity: 0.6 }} />

          {/* Main bubble - dark gradient for white background visibility */}
          <div className="relative flex flex-col items-center gap-1 rounded-full backdrop-blur-xl transition-all duration-700 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_0_20px_rgba(0,0,0,0.4)] border border-white/10"
          style={{ 
            padding: svc.large ? "14px 36px" : "12px 28px", 
            background: `linear-gradient(145deg, rgba(11,31,26,0.95) 0%, rgba(11,31,26,0.85) 100%)`,
            boxShadow: `0 8px 32px ${ac.dot}20, inset 0 0 20px rgba(0,0,0,0.4)`
          }}
          >
          {/* Gradient border - top fade, visible on dark */}
          <div className="absolute inset-0 p-px opacity-30 group-hover:opacity-100 transition-opacity duration-500"
          style={{
          background: `linear-gradient(180deg, ${ac.dot} 0%, transparent 100%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor'
          }}
          />

          {/* Inner glow - green accent for depth */}
          <div className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(74,222,128,0.15) 0%, transparent 60%)`,
            opacity: 0.4,
            transition: 'opacity 500ms',
          }}
          />

          {/* Amharic Text - Dark background, visible white text */}
          <span className="font-serif text-white group-hover:text-white/95 whitespace-nowrap tracking-wide transition-colors duration-500 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" 
          style={{ fontSize: svc.large ? "18px" : "15px", fontWeight: 600 }}>
          {svc.name}
          </span>

          {/* English Translation - Darker, more visible on white background */}
          <span className="uppercase font-black tracking-[0.2em] text-green-400 group-hover:text-green-300 transition-colors duration-500 text-[9px] md:text-[10px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" 
          style={{ letterSpacing: '0.2em' }}>
          {svc.en}
          </span>
          </div>

          {/* Hover glow effect - stronger on white */}
          <div className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `0 0 40px ${ac.dot}40, 0 0 80px ${ac.dot}20`,
            transform: 'scale(1.1)',
          }}
          />
          </div>
          );
          })}
          </div>

          {/* ─── CTA BUTTONS ─── */}
          <div className="flex flex-col items-center gap-8 mt-10">
             <p className="text-gray-500 text-[11px] tracking-[0.3em] uppercase font-black">Begin your restoration</p>
             <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                
                {/* SHOP NOW */}
                <div onClick={() => navigate('/shop')} className="relative group cursor-pointer">
                  <button className="relative px-12 py-5 bg-transparent border-none text-white font-black text-sm uppercase tracking-widest cursor-pointer z-10 transition-transform active:scale-95">
                    Shop Now
                    <div className="absolute inset-0 -z-10 rounded-full border border-green-400/30 transition-all duration-300 group-hover:border-green-300/50"
                      style={{ background: 'linear-gradient(135deg, rgba(21,128,61,0.95) 0%, rgba(22,163,74,0.80) 50%, rgba(21,128,61,0.70) 100%)', backdropFilter: 'blur(12px)' }}
                    />
                    <div className="absolute inset-0 -z-10 rounded-full p-px"
                      style={{
                        background: 'linear-gradient(180deg, rgba(134,239,172,0.5) 0%, rgba(134,239,172,0) 60%)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor'
                      }}
                    />
                  </button>
                </div>

                {/* BOOK A CALL - Connected to handleBookCall instead of setShowCalendly */}
                <div onClick={handleBookCall} className="relative group cursor-pointer">
                  <button className="relative px-12 py-5 bg-transparent border-none text-white font-black text-sm uppercase tracking-widest cursor-pointer z-10 transition-transform active:scale-95">
                    Book A Consultation Call
                    <div className="absolute inset-0 -z-10 rounded-full border border-amber-400/30 transition-all duration-300 group-hover:border-amber-300/50"
                      style={{ background: 'linear-gradient(135deg, rgba(180,83,9,0.95) 0%, rgba(217,119,6,0.80) 50%, rgba(180,83,9,0.70) 100%)', backdropFilter: 'blur(12px)' }}
                    />
                    <div className="absolute inset-0 -z-10 rounded-full p-px"
                      style={{
                        background: 'linear-gradient(180deg, rgba(251,191,36,0.5) 0%, rgba(251,191,36,0) 60%)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor'
                      }}
                    />
                  </button>
                </div>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pill-float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes halo-breathe { 0%, 100% { opacity: 0.5; transform: scale(1.2); } 50% { opacity: 0; transform: scale(1.5); } }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}