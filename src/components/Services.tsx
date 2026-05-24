import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import for Vercel routing fix

export default function Services() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const mouseRef   = useRef({ x: 0.5, y: 0.5 });
  const targetRef  = useRef({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate   = useNavigate(); // Hook for navigation

  const services = [
    { name: "100% Organic Herbs",     accent: "emerald", large: true  },
    { name: "Liver Health",           accent: "green",   large: false },
    { name: "Blood Sugar Balance",    accent: "teal",    large: false },
    { name: "Hypertension Care",      accent: "teal",    large: false },
    { name: "Gut & Intestine Healing",accent: "emerald", large: true  },
    { name: "Insomnia Relief",        accent: "indigo",  large: false },
    { name: "Anxiety & Stress Care",  accent: "indigo",  large: false },
    { name: "Labor Support",          accent: "amber",   large: false },
    { name: "Menstrual Wellness",     accent: "rose",    large: false },
    { name: "Hormonal Balance",       accent: "emerald", large: true  },
    { name: "Fertility Guidance",     accent: "amber",   large: false },
    { name: "Expert Consultations",   accent: "green",   large: false },
    { name: "Wellness Monitoring",    accent: "teal",    large: false },
  ];

  const accentMap: Record<string, { border: string; glow: string; dot: string }> = {
    emerald: { border: "rgba(52,211,153,0.30)",  glow: "rgba(52,211,153,0.08)",  dot: "#34d399" },
    green:   { border: "rgba(74,222,128,0.25)",  glow: "rgba(74,222,128,0.07)",  dot: "#4ade80" },
    teal:    { border: "rgba(45,212,191,0.25)",  glow: "rgba(45,212,191,0.07)",  dot: "#2dd4bf" },
    indigo:  { border: "rgba(129,140,248,0.20)", glow: "rgba(129,140,248,0.06)", dot: "#818cf8" },
    amber:   { border: "rgba(251,191,36,0.22)",  glow: "rgba(251,191,36,0.06)",  dot: "#fbbf24" },
    rose:    { border: "rgba(251,113,133,0.20)", glow: "rgba(251,113,133,0.06)", dot: "#fb7185" },
  };

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

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      targetRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top)  / rect.height,
      };
    };
    section.addEventListener("mousemove", onMove);

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

      for (const o of orbs) {
        const x = (o.cx + Math.sin((s / o.pX) * Math.PI * 2) * o.ax) * W;
        const y = (o.cy + Math.cos((s / o.pY) * Math.PI * 2) * o.ay) * H;
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
    <section id="services" className="relative overflow-hidden flex flex-col justify-center" style={{ background: "#0b1f1a" }}>
      <div className="absolute top-0 left-0 right-0 h-36 pointer-events-none z-20" style={{ background: "linear-gradient(to bottom, #0b1f1a 0%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none z-20" style={{ background: "linear-gradient(to top, #0b1f1a 0%, transparent 100%)" }} />

      {/* ─── HERO IMAGE ─── */}
      <div className="relative w-full z-10">
        <img src="/images/hyssop_shapes.png" className="w-full h-auto block" style={{ filter: "brightness(0.35) saturate(0.65) sepia(0.18)" }} alt="Hyssop botanical shapes" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: "rgba(11,31,26,0.35)", mixBlendMode: "multiply" }} />
          <div className="absolute top-0 left-0 right-0 h-1/4" style={{ background: "linear-gradient(to top, transparent, #0b1f1a)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 55% at center, transparent 45%, #0b1f1a 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-[12%]" style={{ background: "linear-gradient(to bottom, transparent, #0b1f1a)" }} />
        </div>
      </div>

      {/* Sacred Rituals Label - High Brightness */}
      <div className="relative z-30 flex justify-center" style={{ marginTop: "-2.5rem" }}>
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400" />
          <span className="font-black tracking-[0.6em] uppercase" style={{ fontSize: "12px", color: "#fff", textShadow: "0 0 15px rgba(255,255,255,1), 0 0 30px rgba(251,191,36,0.8)" }}>
            Sacred Rituals
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent via-amber-400" />
        </div>
      </div>

      <div ref={sectionRef} className="relative px-4 pt-16 pb-28 flex flex-col justify-center z-10">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ mixBlendMode: "screen" }} />
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(34,197,94,0.05) 0%, transparent 65%)" }} />

        <div className="relative z-10 max-w-screen-xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-5 leading-tight">
              Healing <em className="text-green-400" style={{ fontStyle: "italic" }}>Offerings</em>
            </h2>
            <p className="text-gray-400/80 text-sm md:text-base font-light max-w-xl mx-auto italic leading-relaxed">
              Ancient botanical wisdom meets modern wellness — a pathway toward lasting balance.
            </p>
          </div>

          {/* Bubble cloud with TaniaDou DNA */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-12 gap-y-6 md:gap-y-10 w-full mb-24">
            {services.map((svc, i) => {
              const ac = accentMap[svc.accent];
              return (
                <div key={i} className="group relative cursor-default" style={{ animation: `pill-float ${11 + (i % 6)}s ease-in-out infinite`, animationDelay: `${i * 0.35}s` }}>
                  <div className="absolute inset-0 rounded-full pointer-events-none" style={{ border: `1px solid ${ac.border}`, animation: `halo-breathe ${7 + (i % 4)}s ease-in-out infinite`, animationDelay: `${i * 0.5}s`, transform: "scale(1.22)", filter: "blur(1.5px)" }} />
                  
                  {/* Bubble Content with TaniaDou Style Masking & Inset Shadow */}
                  <div className="relative flex items-center gap-2.5 rounded-full backdrop-blur-xl transition-all duration-700 overflow-hidden shadow-[inset_0_0_12px_rgba(255,255,255,0.05)] border border-white/5"
                    style={{ padding: svc.large ? "12px 32px" : "10px 24px", background: "rgba(255,255,255,0.03)" }}
                  >
                    {/* The TaniaDou Masked Border effect applied to bubbles */}
                    <div className="absolute inset-0 p-[1px] opacity-20 group-hover:opacity-100 transition-opacity" 
                         style={{
                           background: `linear-gradient(180deg, ${ac.dot} 0%, transparent 100%)`,
                           WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                           WebkitMaskComposite: 'xor'
                         }} 
                    />
                    
                    <span className="shrink-0 rounded-full" style={{ width: "5px", height: "5px", background: ac.dot, boxShadow: `0 0 8px ${ac.dot}` }} />
                    <span className="font-serif text-white/90 group-hover:text-white whitespace-nowrap tracking-wide transition-colors duration-500" style={{ fontSize: svc.large ? "18px" : "15px" }}>
                      {svc.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* THE BIG BUTTON: TaniaDou Style Consultation CTA */}
          <div className="flex flex-col items-center gap-6">
            <p className="text-gray-500/70 text-[10px] tracking-[0.4em] uppercase font-black">Personalized Healing Guidance</p>
            
            <div onClick={() => navigate("/contact")} className="relative group cursor-pointer">
              <button className="relative px-14 py-5 bg-transparent border-none text-white font-black uppercase tracking-[0.4em] text-[11px] cursor-pointer z-10 transition-transform active:scale-95">
                Book a Consultation Call
                {/* Base Layer */}
                <div className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-amber-500/10 shadow-[inset_0_0_20px_rgba(251,191,36,0.3)] transition-all duration-300 group-hover:bg-amber-500/20 group-hover:shadow-[0_0_35px_rgba(251,191,36,0.25)]" />
                {/* TaniaDou Border DNA */}
                <div className="absolute inset-0 -z-10 rounded-full p-[1px]" 
                  style={{
                    background: 'linear-gradient(180deg, rgba(251,191,36,0.5) 0%, rgba(251,191,36,0) 100%)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor'
                  }} 
                />
              </button>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pill-float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes halo-breathe { 0%, 100% { opacity: 0.5; transform: scale(1.2); } 50% { opacity: 0; transform: scale(1.5); } }
      `}</style>
    </section>
  );
}
