import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Where do the herbs originate?",
      a: "Our herbs are ethically wild-harvested at peak lunar potency. We source directly from the highlands of Ethiopia and organic estates in the Americas, ensuring every leaf carries its original healing vibration."
    },
    {
      q: "How do I prepare the traditional infusions?",
      a: "Preparation is a ritual. For infusions, steep 1-2 teaspoons in 85°C water for 12 minutes. For roots, a slow 20-minute decoction is best. A detailed guide is included with every order."
    },
    {
      q: "Do you provide global shipping?",
      a: "Yes. From our hubs in Addis Ababa and Dallas, we bridge the globe. We use eco-conscious, light-blocking packaging to ensure the herbs reach your doorstep fresh and potent."
    },
    {
      q: "Are these safe to use with medication?",
      a: "Nature is powerful. While our herbs are pure, they are potent. We strongly advise a consultation with your healthcare provider if you are on prescription protocols."
    },
    {
      q: "How should I store my herbs to keep them fresh?",
      a: "Keep your botanicals in a cool, dark sanctuary. Sunlight and moisture are the enemies of potency. Our light-blocking bags are designed for this, but airtight glass jars in a dark cupboard are ideal."
    },
    {
      q: "Can I steep the same leaves multiple times?",
      a: "Many of our whole-leaf herbs can be infused 2-3 times. Each steep reveals different layers of the plant's profile. Continue until the color and aroma begin to fade."
    },
    {
      q: "Are your products third-party lab tested?",
      a: "Integrity is our foundation. Every batch is tested for microbial purity and heavy metals to ensure that what you put into your body is as clean as nature intended."
    },
    {
      q: "How long until I feel the benefits?",
      a: "Herbal medicine is a journey, not a quick fix. While some feel immediate clarity, most botanical protocols take 2-4 weeks of consistent ritual to fully harmonize with your body's systems."
    },
    {
      q: "Do you offer personalized consultations?",
      a: "Yes. Our certified herbalists provide one-on-one sessions to help you craft a ritual specifically tailored to your body's unique needs and spiritual goals."
    }
  ];

  const isAnyOpen = openIndex !== null;

  return (
    <section id="faq" className="relative py-24 px-6 bg-[#f5f0eb] overflow-hidden">
      
      {/* ── GREEN-YELLOWY BACKDROP WITH 30% RICHER SOFT SHADES (15% gap top/bottom) ── */}
      <div 
        className="absolute top-[15%] bottom-[15%] left-0 right-0 z-0 pointer-events-none overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #cbd9b2 0%, #ebecbe 50%, #c4dbb9 100%)", // Increased richness of the base by 30%
        }}
      >
        {/* Soft edge fade overlays to prevent sharp transitions */}
        <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-[#f5f0eb] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#f5f0eb] to-transparent" />
        
        {/* Layered smooth glowing "shades" - Increased opacity by 30% for a stronger color wash */}
        <div className="absolute top-[20%] left-1/4 w-100 h-100 bg-green-400/35 blur-[90px] rounded-full mix-blend-multiply animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-1/4 w-100 h-100 bg-yellow-400/30 blur-[90px] rounded-full mix-blend-multiply animate-pulse-slow delay-700" />
      </div>

      {/* ── BACKGROUND WATERMARKS & TIMELINE LINES ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* THE "FAQS" BACKGROUND WATERMARK */}
        <div 
          className={`absolute right-[5%] top-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-1000 ease-in-out ${isAnyOpen ? "gap-y-20" : "gap-y-8"}`}
        >
          {[
            { char: 'F', rot: '-rotate-12', delay: '0s' },
            { char: 'A', rot: 'rotate-6', delay: '0.2s' },
            { char: 'Q', rot: '-rotate-6', delay: '0.4s' },
            { char: 'S', rot: 'rotate-12', delay: '0.6s' }
          ].map((item, idx) => (
            <span 
              key={idx} 
              className={`text-[12rem] md:text-[18rem] font-black leading-[0.8] text-amber-600/10 select-none ${item.rot} transition-all duration-700`}
              style={{ 
                textShadow: '0 0 50px rgba(245,158,11,0.1)',
                animation: `float-letter 8s ease-in-out infinite ${item.delay}`
              }}
            >
              {item.char}
            </span>
          ))}
        </div>

        {/* Animated Curly Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1000 1000">
          <path d="M-100,200 C150,50 350,450 500,200 C650,50 850,450 1100,200" stroke="rgba(34,197,94,0.18)" strokeWidth="1" fill="none" className="animate-draw-path" />
          <path d="M1100,800 C850,600 650,1000 500,800 C350,600 150,1000 -100,800" stroke="rgba(245,158,11,0.18)" strokeWidth="1.5" fill="none" className="animate-draw-path-reverse" />
        </svg>

        {/* Grainy Finish */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
             style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/asfalt-light.png')` }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 items-center">
          
          {/* --- LEFT SIDE: COMPACT QUESTIONS --- */}
          <div className="lg:col-span-10">
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-0.5 w-8 bg-amber-500" />
                <span className="text-[10px] tracking-[0.5em] uppercase text-amber-600 font-black">Botanical Inquiries</span>
              </div>
              <h3 className="text-5xl md:text-7xl font-serif text-[#0b1f1a] leading-tight">
                Common <span className="italic text-green-700 font-light">Wisdom</span>
              </h3>
            </header>

            <div className="space-y-1">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`transition-all duration-500 border-b border-black/6 ${openIndex === i ? "bg-white/60 backdrop-blur-md rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.02)] px-2" : ""}`}
                >
                  <button 
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between py-6 px-4 text-left cursor-pointer group"
                  >
                    <span className={`text-base md:text-lg font-bold tracking-wide transition-all duration-500 ${openIndex === i ? "text-green-700" : "text-gray-700 group-hover:text-[#0b1f1a]"}`}>
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full border transition-all duration-500 flex items-center justify-center ${openIndex === i ? "rotate-90 bg-green-600 border-green-600 text-white" : "border-black/8 text-[#0b1f1a]/40 group-hover:border-black"}`}>
                      {openIndex === i ? <FaMinus className="text-[10px]" /> : <FaPlus className="text-[10px]" />}
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-700 ease-in-out ${openIndex === i ? "max-h-62.5 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="px-4 pb-8 text-gray-600 leading-relaxed text-base font-semimedium max-w-3xl italic">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes float-letter {
          0%, 100% { transform: translateY(0) scale(1); filter: brightness(1); }
          50% { transform: translateY(-25px) scale(1.02); filter: brightness(1.2); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes draw-path {
          0% { stroke-dashoffset: 2000; stroke-dasharray: 2000; }
          100% { stroke-dashoffset: 0; stroke-dasharray: 2000; }
        }
        .animate-draw-path { animation: draw-path 20s linear infinite; }
        .animate-draw-path-reverse { animation: draw-path 30s linear infinite reverse; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 12s ease-in-out infinite; }
      `}</style>
    </section>
  );
}