import { useRef } from "react";
import { FaSun, FaLeaf, FaFlask, FaVial, FaMortarPestle } from "react-icons/fa";

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    {
      icon: <FaLeaf />,
      title: "Ethical Wild-Sourcing",
      subtitle: "Phase 01: Gathering",
      desc: "Our journey begins in protected soils. We hand-select herbs only at their peak lunar potency, ensuring the plant's alkaloid profile is at its highest.",
      detail: "Alkaloid Peak: 100% | Origin: High-Altitude",
      side: "left"
    },
    {
      icon: <FaSun />,
      title: "Bio-Preservation",
      subtitle: "Phase 02: Curing",
      desc: "Industrial heat destroys the soul of the herb. We utilize a 14-day slow sun-curing process that preserves delicate volatile oils and vital enzymes.",
      detail: "Temp Max: 32°C | Duration: 336 Hours",
      side: "right"
    },
    {
      icon: <FaMortarPestle />,
      title: "Sacred Alchemy",
      subtitle: "Phase 03: Blending",
      desc: "Each formula is hand-blended in small batches. We use traditional cold-milling techniques to prevent oxidation and maintain the herb's living energy.",
      detail: "Batch Size: < 5kg | Method: Cold-Milled",
      side: "left"
    },
    {
      icon: <FaVial />,
      title: "Purity Assay",
      subtitle: "Phase 04: Validation",
      desc: "Science validates the spirit. Every batch undergoes a rigorous microbial and heavy-metal assay to ensure absolute safety and standardized potency.",
      detail: "Purity Grade: 99.9% | Lab Verified",
      side: "right"
    },
    {
      icon: <FaFlask />,
      title: "Vibrational Infusion",
      subtitle: "Phase 05: Potency",
      desc: "Before bottling in light-protected glass, our herbs are vibrationally infused with intention, bridging the gap between medicine and magic.",
      detail: "Storage: Miron Glass | Energy: High-Freq",
      side: "left"
    }
  ];

  // Logic for the Aligned Grid of 15 Logos
  const logoGrid = [
    // Row 1
    { t: '5%', l: '10%' }, { t: '5%', l: '50%' }, { t: '5%', l: '90%' },
    // Row 2 (Staggered)
    { t: '25%', l: '30%' }, { t: '25%', l: '70%' },
    // Row 3
    { t: '45%', l: '10%' }, { t: '45%', l: '50%' }, { t: '45%', l: '90%' },
    // Row 4 (Staggered)
    { t: '65%', l: '30%' }, { t: '65%', l: '70%' },
    // Row 5
    { t: '85%', l: '10%' }, { t: '85%', l: '50%' }, { t: '85%', l: '90%' },
    // Fillers for total of 15
    { t: '15%', l: '90%' }, { t: '75%', l: '5%' }
  ];

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-24 bg-[#f5f0eb] overflow-hidden"
    >
      {/* ── 15 ALIGNED LOGO WATERMARKS (-15 DEGREE SLANT) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.25]">
        {logoGrid.map((pos, i) => (
          <img 
            key={i}
            src="/images/hysspo-bg-preview.png" 
            className="absolute select-none"
            style={{ 
              top: pos.t, 
              left: pos.l, 
              width: '220px', // Consistent sizing for alignment
              transform: 'translate(50%, -50%) rotate(-15deg)' 
            }}
            alt="" 
          />
        ))}
      </div>

      {/* ── LIVING BACKGROUND (Animated Glows) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full animate-pulse delay-700" />
        
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <path d="M500,0 Q600,500 500,1000" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="5 5" />
          <path d="M450,0 Q350,500 450,1000" stroke="rgba(34,197,94,0.2)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-amber-500/50" />
            <span className="text-[10px] tracking-[0.6em] uppercase text-#0b1f1a font-black">The Hyssop Standard</span>
            <div className="h-px w-8 bg-amber-500/50" />
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-[#0b1f1a] leading-tight">
            From <span className="italic text-green-400">Seed</span> to <span className="text-amber-400">Soul</span>
          </h2>
        </div>

        {/* ── THE HIGH-DENSITY TIMELINE ── */}
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className={`flex flex-col md:flex-row items-center gap-12 ${step.side === 'right' ? 'md:flex-row-reverse' : ''}`}
            >
              <div className={`flex-1 ${step.side === 'left' ? 'md:text-right' : 'md:text-left'}`}>
                <div className="group">
                  <span className="text-[green-500/30] text-[10px] tracking-[0.4em] uppercase font-black mb-2 block">{step.subtitle}</span>
                  <h4 className="text-3xl md:text-4xl font-serif text-[#0b1f1a] mb-4 group-hover:text-green-400 transition-colors">{step.title}</h4>
                  <p className="text-gray-800 text-base font-medium leading-relaxed mb-6 max-w-lg ml-auto mr-auto md:ml-0 md:mr-0">
                    {step.desc}
                  </p>
                  <div className={`text-[10px] font-mono tracking-widest text-amber-600 uppercase border-t border-white/5 pt-4 inline-block`}>
                    {step.detail}
                  </div>
                </div>
              </div>

              <div className="relative shrink-0 flex items-center justify-center w-24 h-24">
                <div className="absolute inset-0 border border-green-500/10 rounded-full animate-ping opacity-20" />
                <div className="w-16 h-16 rounded-4xl bg-white/3 backdrop-blur-xl border border-white/10 flex items-center justify-center text-[#0b1f1a] text-2xl shadow-2xl z-10 transition-transform group-hover:scale-110">
                   {step.icon}
                </div>
                {i !== steps.length - 1 && (
                  <div className="absolute top-full h-24 w-px bg-linear-to-b from-white/10 to-transparent" />
                )}
              </div>

              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>

        {/* ── OUR PROMISE CARD ── */}
        <div className="mt-32 relative max-w-4xl mx-auto">
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="/images/flower-bgd.jpeg"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              alt=""
            />
            <div className="absolute inset-0 bg-linear-to-br from-[#0b1f1a] via-transparent to-black/60" />
            
            <div className="relative z-10 py-10 md:py-12 px-8 text-center">
              <span className="text-[#0b1f1a] text-[10px] tracking-[0.8em] uppercase font-black block mb-4">Our Promise</span>
              <h5 className="text-[#0b1f1a] font-serif italic text-2xl md:text-4xl leading-snug">
                "We don't just sell herbs; <br />
                <span className="text-green-900">we steward a sacred ritual</span> of healing."
              </h5>
              <div className="mt-8 flex justify-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-500/20" />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}