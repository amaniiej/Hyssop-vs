import { FaMicroscope, FaMagic, FaLeaf } from "react-icons/fa";

// Deterministic pseudo-random generator (stable across renders)
function seededRandom(seed: number) {
  return ((seed * 9301 + 49297) % 233280) / 233280;
}

// Floating seeds component with deterministic positions
function FloatingSeeds() {
  return [...Array(8)].map((_, i) => (
    <div key={i} className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-seed-float blur-[1px]" style={{ 
      top: `${seededRandom(i * 2) * 100}%`, 
      left: `${seededRandom(i * 3) * 100}%`, 
      animationDelay: `${i * 1.5}s` 
    }} />
  ));
}

export default function Story() {
  return (
    <section id="story" className="relative py-20 px-6 overflow-hidden bg-[#112e20] shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]">
      
      {/* --- THE ARTISTIC LAYERED BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* 1. Warm Amber Glow on the Left (Illuminates the text) */}
        <div className="absolute top-0 left-[-10%] w-[50%] h-full bg-linear-to-r from-amber-600/15 via-amber-500/5 to-transparent blur-[100px]" />
        
        {/* 2. RIGHT BACKGROUND IMAGE (Feathered Fade Effect into the Warm Green) */}
        <div className="absolute top-0 right-0 w-full md:w-[55%] h-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 brightness-110 saturate-[0.8]"
            style={{ backgroundImage: "url('/images/journey-to-wellness.jpeg')" }}
          />
          {/* Left edge fade - blends the image smoothly into the dark green text area */}
          <div className="absolute inset-0 bg-gradient
          -to-r from-[#112e20] via-[#112e20]/80 to-transparent" />
          {/* Top and Bottom edge fade - removes sharp horizontal lines */}
          <div className="absolute inset-0 bg-linear-to-b from-[#112e20] via-transparent to-[#112e20]" />
          {/* Right edge fade - softens the extreme right side */}
          <div className="absolute inset-0 bg-linear-to-l from-[#112e20] via-transparent to-transparent opacity-50" />
        </div>

        {/* 3. Deep Warm Emerald Pulse on the Right */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-150 h-150 bg-green-500/10 blur-[150px] rounded-full animate-pulse-slow" />
        
        {/* 4. Weaving Curly Spirit Lines (Warm Golden-Green) */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <path d="M-100,300 C150,150 350,650 500,300 S850,150 1100,300" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5" fill="none" className="animate-draw-path" />
        </svg>

        {/* 5. Glowing Floating Seeds */}
        <FloatingSeeds />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="lg:w-[60%] w-full text-left space-y-10">
          
          {/* Header & New Context Info */}
          <div className="space-y-4">
            <span className="text-amber-500 text-[10px] tracking-[0.8em] uppercase font-black block drop-shadow-md">The Philosophy</span>
            <h3 className="text-5xl md:text-7xl font-serif text-[#f5f0eb] leading-tight drop-shadow-lg">
              The Journey to <br />
              <span className="italic text-green-400 font-light">Wellness is:</span>
            </h3>
            <p className="text-gray-300 text-lg font-light leading-relaxed max-w-xl italic border-l-2 border-amber-500/40 pl-6 drop-shadow-sm">
              ጤና ሕይወትን የማደስ ሂደት እንጂ ግብ አይደለም፤ ከተፈጥሮ ጋር መዋሃድ ነው። እውነተኛ ፈውስ የሚገኘው ጥንታዊ የእፅዋት ጥበብ ከዘመናዊ ሳይንስ ጋር ሲዋሃድ እና በሥጋና በመንፈስ መካከል ድልድይ ሲገነባ ነው።
            </p>
          </div>

          {/* The Three Nodes */}
          <div className="space-y-8">
            {[
              { icon: <FaMicroscope />, title: "Science & Spirit", desc: "Evidence-based research meeting intentional high-vibrational energy." },
              { icon: <FaMagic />, title: "Ancient Healing", desc: "Modern medicine returning to the powerful roots of ancestral wisdom." },
              { icon: <FaLeaf />, title: "Sacred Remedy", desc: "A remembering for the body, the mind, and the eternal human spirit." }
            ].map((item, idx) => (
              <div key={idx} className="group flex items-start gap-6 max-w-lg cursor-default">
                <div className="w-14 h-14 shrink-0 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-xl text-amber-400 group-hover:text-amber-300 group-hover:border-amber-400/50 transition-all duration-700 backdrop-blur-md shadow-lg relative overflow-hidden">
                  {/* Expanding golden-green background on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-amber-500/20 to-green-500/20 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full" />
                  <span className="relative z-10">{item.icon}</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-serif text-[#f5f0eb] group-hover:text-amber-400 transition-colors drop-shadow-sm">{item.title}</h4>
                  <p className="text-gray-400 text-sm font-light italic leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* The Stats */}
          <div className="flex flex-row items-center gap-12 border-t border-white/10 pt-10">
            <div className="group relative">
              <div className="flex items-baseline drop-shadow-md">
                <span className="text-5xl md:text-6xl font-serif text-[#f5f0eb] tracking-tighter">98</span>
                <span className="text-lg text-amber-500 ml-0.5">%</span>
              </div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-green-400 font-bold mt-1">Herbal Purity</p>
            </div>

            <div className="group relative">
              <div className="flex items-baseline drop-shadow-md">
                <span className="text-5xl md:text-6xl font-serif text-[#f5f0eb] tracking-tighter">100</span>
                <span className="text-lg text-amber-500 ml-0.5">%</span>
              </div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-green-400 font-bold mt-1">Natural Essence</p>
            </div>
          </div>

          {/* Signature */}
          <div className="pt-6">
            <p className="text-white/20 font-serif italic text-[10px] tracking-[0.5em] uppercase">Crafted with Intention</p>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes seed-float {
          0%, 100% { transform: translate(0, 0); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translate(80px, -80px) rotate(45deg); opacity: 0; }
        }
        @keyframes draw-path {
          0% { stroke-dashoffset: 1000; stroke-dasharray: 1000; }
          100% { stroke-dashoffset: 0; stroke-dasharray: 1000; }
        }
        .animate-seed-float { animation: seed-float linear infinite; }
        .animate-draw-path { animation: draw-path 18s linear infinite; }
        .animate-pulse-slow { animation: pulse 10s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.3; } }
      `}</style>
    </section>
  );
}