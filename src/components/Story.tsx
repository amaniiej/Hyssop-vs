import { FaMicroscope, FaMagic, FaLeaf } from "react-icons/fa";

export default function Story() {
  return (
    <section id="story" className="relative py-16 px-6 overflow-hidden bg-[#0b1f1a]">
      
      {/* --- THE ARTISTIC LAYERED BACKGROUND (Adjusted only brightness as per your feedback) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* 1. LEFT 35% YELLOWY-GLOW */}
        <div className="absolute top-0 left-0 w-[35%] h-full bg-linear-to-r from-amber-500/10 via-amber-600/5 to-transparent blur-[80px] opacity-80" />
        
        {/* 2. RIGHT 45% BACKGROUND IMAGE (Brightness set to 1 as requested) */}
        <div className="absolute top-0 right-0 w-[45%] h-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-50 brightness-100 grayscale-10"
            style={{ backgroundImage: "url('/images/journey-to-wellness.jpeg')" }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0b1f1a] via-[#0b1f1a]/60 to-transparent" />
        </div>

        {/* 3. Deep Emerald Pulse */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-125 h-125 bg-emerald-500/10 blur-[140px] rounded-full animate-pulse-slow" />
        
        {/* 4. Weaving Curly Spirit Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <path d="M-100,300 C150,150 350,650 500,300 S850,150 1100,300" stroke="white" strokeWidth="0.5" fill="none" className="animate-draw-path" />
        </svg>

        {/* 5. Floating Seeds */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute w-0.5 h-0.5 bg-white/20 rounded-full animate-seed-float" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${i * 2}s` }} />
        ))}
      </div>

      {/* --- CONTENT (MOVED TO LEFT) --- */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="lg:w-[60%] w-full text-left space-y-10">
          
          {/* Header & New Context Info */}
          <div className="space-y-4">
            <span className="text-amber-400 text-[10px] tracking-[0.8em] uppercase font-black block opacity-80">The Philosophy</span>
            <h3 className="text-5xl md:text-7xl font-serif text-white leading-tight">
              The Journey to <br />
              <span className="italic text-green-400 font-light">Wellness is:</span>
            </h3>
            <p className="text-gray-100 text-lg font-light leading-relaxed max-w-xl italic border-l border-green-500/30 pl-6">
              ጤና ሕይወትን የማደስ ሂደት እንጂ ግብ አይደለም፤ ከተፈጥሮ ጋር መዋሃድ ነው። እውነተኛ ፈውስ የሚገኘው ጥንታዊ የእፅዋት ጥበብ ከዘመናዊ ሳይንስ ጋር ሲዋሃድ እና በሥጋና በመንፈስ መካከል ድልድይ ሲገነባ ነው።
            </p>
          </div>

          {/* The Three Nodes (Now in a vertical elegant stack to save space) */}
          <div className="space-y-8">
            {[
              { icon: <FaMicroscope />, title: "Science & Spirit", desc: "Evidence-based research meeting intentional high-vibrational energy." },
              { icon: <FaMagic />, title: "Ancient Healing", desc: "Modern medicine returning to the powerful roots of ancestral wisdom." },
              { icon: <FaLeaf />, title: "Sacred Remedy", desc: "A remembering for the body, the mind, and the eternal human spirit." }
            ].map((item, idx) => (
              <div key={idx} className="group flex items-start gap-6 max-w-lg">
                <div className="w-14 h-14 shrink-0 rounded-full border border-white/10 flex items-center justify-center text-xl text-green-400/40 group-hover:text-green-400 group-hover:border-green-500/50 transition-all duration-700 backdrop-blur-sm shadow-2xl relative">
                  <div className="absolute inset-0 rounded-full bg-green-400/5 scale-0 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" />
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-serif text-white/90 group-hover:text-white transition-colors">{item.title}</h4>
                  <p className="text-gray-500 text-sm font-light italic leading-relaxed opacity-90">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* The Stats (Moved to left align) */}
          <div className="flex flex-row items-center gap-12 border-t border-white/5 pt-10">
            <div className="group relative">
              <div className="flex items-baseline">
                <span className="text-5xl md:text-6xl font-serif text-white tracking-tighter">98</span>
                <span className="text-lg text-amber-500 ml-0.5">%</span>
              </div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-green-400 font-bold mt-1">Herbal Purity</p>
            </div>

            <div className="group relative">
              <div className="flex items-baseline">
                <span className="text-5xl md:text-6xl font-serif text-white tracking-tighter">100</span>
                <span className="text-lg text-amber-500 ml-0.5">%</span>
              </div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-green-400 font-bold mt-1">Natural Essence</p>
            </div>
          </div>

          {/* Signature */}
          <div className="pt-6">
            <p className="text-white/10 font-serif italic text-[10px] tracking-[0.5em] uppercase">Crafted with Intention</p>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes seed-float {
          0%, 100% { transform: translate(0, 0); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translate(60px, -60px); opacity: 0; }
        }
        @keyframes draw-path {
          0% { stroke-dashoffset: 1000; stroke-dasharray: 1000; }
          100% { stroke-dashoffset: 0; stroke-dasharray: 1000; }
        }
        .animate-seed-float { animation: seed-float linear infinite; }
        .animate-draw-path { animation: draw-path 18s linear infinite; }
        .animate-pulse-slow { animation: pulse 10s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.2; } }
      `}</style>
    </section>
  );
}