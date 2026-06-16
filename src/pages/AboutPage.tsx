import { useState, useEffect } from "react";
import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  FaGraduationCap, FaLeaf, FaMedal, FaUtensils, FaPlay, FaTimes, 
  FaHeart, FaUsers, FaLightbulb, FaAward, FaSmile, FaMagic, 
  FaHistory, FaBible, FaMicroscope 
} from "react-icons/fa";

export default function AboutPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    if (activeVideo) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [activeVideo]);

  const videos = [
    { id: "rU7OvA_9w2o", title: "Healing Herbs" },
    { id: "9VCEMOSgVjg", title: "Ancient Prep" },
    { id: "4mkrjkLPAWM", title: "Natural Living" },
    { id: "TS84BjUzNCM", title: "Herbal Wisdom" },
    { id: "IJK0TjlllOY", title: "Sacred Rituals" },
  ];

  const scrollVideos = [...videos, ...videos];

  const values = [
    { icon: <FaHeart />, title: "Passionate About Work", desc: "Passion for work is an enthusiasm and excitement for what we do.", shape: "rounded-tl-[5rem] rounded-br-[5rem]" },
    { icon: <FaUsers />, title: "Creative team members", desc: "A creative team is here to design, execute, and encourage holistic growth.", shape: "rounded-tr-[5rem] rounded-bl-[5rem]" },
    { icon: <FaLightbulb />, title: "Innovation solutions", desc: "Using new concepts to find powerful ways of utilizing ancient herbs.", shape: "rounded-br-[5rem] rounded-tl-[5rem]" },
    { icon: <FaAward />, title: "Qualitiful products", desc: "Product quality refers to how well our herbs satisfy your wellness needs.", shape: "rounded-bl-[5rem] rounded-tr-[5rem]" },
    { icon: <FaSmile />, title: "Customer satisfaction", desc: "Our customers are delighted because of our deep, personal care.", shape: "rounded-tl-[5rem] rounded-br-[5rem]" },
    { icon: <FaMagic />, title: "Simplicity interface", desc: "We believe in minimizing complexity to make healing accessible.", shape: "rounded-tr-[5rem] rounded-bl-[5rem]" }
  ];

  const logoGrid = [
    { t: '5%', l: '10%' }, { t: '5%', l: '50%' }, { t: '5%', l: '90%' },
    { t: '25%', l: '30%' }, { t: '25%', l: '70%' },
    { t: '45%', l: '10%' }, { t: '45%', l: '50%' }, { t: '45%', l: '90%' },
    { t: '65%', l: '30%' }, { t: '65%', l: '70%' },
    { t: '85%', l: '10%' }, { t: '85%', l: '50%' }, { t: '85%', l: '90%' },
    { t: '15%', l: '90%' }, { t: '75%', l: '5%' }
  ];

  return (
    <div className="bg-[#095845] text-white min-h-screen font-sans overflow-x-hidden relative selection:bg-green-500/30">
      <SEO
        title="Our Story & Herbalist | Hyssop Herbs & Wellness"
        description="Meet Addis Limenih, certified herbalist and founder of Hyssop Herbs & Wellness. Discover our mission to bring authentic Ethiopian herbal wisdom to the diaspora in the USA and Canada."
        url="https://hyssopherb.com/about"
      />
      
      {/* --- DOPE BACKGROUND: CURLY LINES & 15 LOGOS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-5%] w-175 h-175 bg-emerald-600/10 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-150 h-150 bg-amber-500/5 blur-[120px] rounded-full" />

        <div className="absolute inset-0 opacity-[0.15]">
          {logoGrid.map((pos, i) => (
            <img 
              key={i}
              src="/images/hysspo-bg-preview.png" 
              className="absolute select-none"
              style={{ 
                top: pos.t, left: pos.l, width: '220px',
                transform: 'translate(-50%, -50%) rotate(-15deg)' 
              }}
              alt="" 
            />
          ))}
        </div>

        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000">
          <path d="M-100,300 C150,100 350,500 500,300 S850,100 1100,300" stroke="white" strokeWidth="0.5" fill="none" className="animate-draw" />
          <path d="M1100,700 C850,500 650,900 500,700 S150,500 -100,700" stroke="rgba(34,197,94,0.4)" strokeWidth="1" fill="none" className="animate-draw-slow" />
        </svg>

        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
             style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/asfalt-light.png')` }} />
      </div>

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 mt-[3vh] pb-24 space-y-32">
        
        {/* --- SECTION 1: ABOUT US --- */}
        <section className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          <div className="lg:w-1/2 space-y-6 -mt-4">
            <h2 className="text-6xl md:text-8xl font-serif leading-tight text-white mb-6">
              About <span className="italic text-green-400">Us</span>
            </h2>
            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-green-100 leading-relaxed">
                Welcome to our herbal family. Every product you find here is crafted 
                with care and guided by nature’s wisdom—so you can live healthier, naturally.
              </h3>
              <div className="space-y-6 text-gray-100 font-light leading-relaxed text-lg">
                <p>“Our herbal health store was born from a deep belief in the healing power of nature. As the founder, my journey began with a passion for natural remedies.”</p>
                <p>“What started as a personal exploration grew into a mission to share safe, effective, and sustainable herbal products with the community. Today, this store stands as a reflection of that vision.”</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center lg:justify-end items-start -mt-8">
            <div className="relative w-full max-w-105">
              <div className="absolute -inset-3 border border-green-500/20 rounded-4xl -z-10 translate-x-3 translate-y-3" />
              <img src="/images/Addis-herb2.jpg" className="w-full h-auto rounded-4xl shadow-2xl border border-white/10" alt="Remedies" />
            </div>
          </div>
        </section>

        {/* --- SECTION 2: THE HERITAGE OF HEALING --- */}
        <section className="py-20 border-t border-white/5 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <FaHistory className="text-amber-500" />
                   <span className="text-[10px] tracking-[0.5em] uppercase text-amber-500 font-black">5000 Years of Wisdom</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-serif leading-tight">
                  Herb: <span className="text-green-400">እፅዋት</span> <br />
                  <span className="text-lg text-gray-400 uppercase tracking-widest italic">(Traditional Medicine)</span>
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed font-light">
                  እፅዋትን ከ 5000 አመታት በፊት በተለይዩ አለማት በባህል መድሃኒትነት እና ምግብነት ሲጠቀሙበት የቆየ ሲሆን በ አለም ላይ ለረጅም አመታት እፅዋትን ወደ ባህላዊ መድሃኒትነት ቀይረው ተጠቃሚ በመሆን ብዙዎችን በመርዳት ከሚታወቁት ሀገራት ጥቂቶቹ <span className="text-green-300 font-medium">ኤዥያ: አፍሪካ እና ላቲን አሜሪካ</span> ይገኙበታል ::
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-md">
                   <div className="flex items-center gap-3 mb-2">
                     <FaMicroscope className="text-green-400" />
                     <span className="text-[9px] font-black uppercase text-green-400">Scientific Fact</span>
                   </div>
                   <p className="text-2xl font-serif text-white">40% <span className="text-xs text-gray-100">of Global Medicine</span></p>
                   <p className="text-[12px] text-gray-200 mt-2">Derived directly from plant sources.</p>
                </div>
                <div className="p-6 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-md">
                   <div className="flex items-center gap-3 mb-2">
                     <FaBible className="text-amber-400" />
                     <span className="text-[9px] font-black uppercase text-amber-400">Ancient Text</span>
                   </div>
                   <p className="text-lg font-serif text-white italic">"Herbs are mentioned in Genesis..."</p>
                   <p className="text-[12px] text-gray-200 mt-2">Referenced from the first chapter.</p>
                </div>
              </div>
            </div>

            {/* --- UPDATED BENEFITS CARD WITH BACKGROUND IMAGE --- */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-green-500/5 blur-3xl rounded-full" />
              <div className="relative p-8 md:p-10 rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 hover:border-green-500/30">
                
                {/* 1. BACKGROUND IMAGE (Dimmed & Blurred) */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center opacity-40 brightness-[1] blur-[0.75px] scale-105 transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: "url('/images/hy-bg-about.jpg')" }}
                />
                
                {/* 2. GRADIENT SHIELD */}
                <div className="absolute inset-0 z-1 bg-linear-to-br from-[#0b1f1a]/80 via-transparent to-[#0b1f1a]/60" />

                <div className="relative z-10 space-y-8">
                  <header className="text-center border-b border-white/10 pb-6">
                    <h4 className="text-green-400 font-serif italic text-2xl md:text-3xl">Benefits: የ እፅዋትን ጥቅም</h4>
                  </header>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    {[
                      { am: "ሰውነትን ያጥባል", en: "Body Detoxification" },
                      { am: "ደምን ያፀዳል", en: "Blood Purification" },
                      { am: "የሞቱ ሴሎችን ያስወግዳል", en: "Cellular Restoration" },
                      { am: "ውፍረትን ይቀንሳል", en: "Natural Weight Loss" },
                      { am: "ለብዙ አይነት ህመሞች", en: "Diverse Healing" },
                      { am: "ፀረ ኢንፍላሜሽን", en: "Anti-Inflammatory" }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col group/item">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)] animate-pulse" />
                          <p className="text-white text-lg font-medium tracking-wide">{item.am}</p>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-300 ml-5 group-hover/item:text-green-300 transition-colors">
                          {item.en}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-center pt-8">
                <p className="text-gray-200 text-sm italic font-medium leading-relaxed max-w-lg mx-auto">
                  "For centuries across countries, people have turned to traditional healers and ancient medicinal knowledge... as mentioned throughout the Bible text."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: THE HERBALIST --- */}
        <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-20 border-t border-white/5">
          <div className="lg:w-2/5 relative">
             <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                <img src="/images/Addis-herb.jpg" className="w-full h-full object-cover" alt="Addis" />
             </div>
             <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-500/20 backdrop-blur-xl rounded-full border border-white/10 flex items-center justify-center text-xl">🌿</div>
          </div>

          <div className="lg:w-3/5 space-y-8">
            <p className="text-2xl md:text-3xl font-serif text-white leading-snug italic">
              “Herbs are nature’s gift. I founded this store to make those gifts accessible, so you can <span className="text-green-400">live healthier—naturally.</span>”
            </p>
            <div>
              <h4 className="text-3xl font-serif text-white">Addis Limenih</h4>
              <p className="text-amber-400 text-[10px] tracking-[0.4em] uppercase font-bold mt-1 border-b border-white/10 pb-4 inline-block">Founder & Herbalist</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 pt-6">
                {[
                  { icon: <FaMedal />, text: "Certified Herbalist" },
                  { icon: <FaLeaf />, text: "Ayurveda Specialist" },
                  { icon: <FaGraduationCap />, text: "Business Graduate" },
                  { icon: <FaUtensils />, text: "Fertility Expert" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-100">
                    <span className="text-green-500">{item.icon}</span>
                    <span className="text-xs tracking-widest uppercase">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- VIDEO GALLERY --- */}
        <section className="pt-10 border-t border-white/5 overflow-hidden">
          <div className="text-center mb-10">
            <h2 className="text-amber-400 text-[10px] tracking-[0.5em] uppercase font-bold mb-2">Tutorials & Wisdom</h2>
            <h3 className="text-2xl font-serif italic text-white">The Botanical Gallery</h3>
          </div>
          <div className="relative flex">
            <div className="flex animate-marquee-slow whitespace-nowrap gap-6 py-4">
              {scrollVideos.map((vid, idx) => (
                <div key={idx} onClick={() => setActiveVideo(vid.id)} className="inline-block w-72 cursor-pointer relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-green-500/50 transition-all duration-500">
                  <img src={`https://i.ytimg.com/vi/${vid.id}/hqdefault.jpg`} className="w-full aspect-video object-cover opacity-80 hover:opacity-100" alt={vid.title} />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="w-12 h-12 rounded-full bg-green-500/80 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl"><FaPlay className="text-white text-xs ml-1" /></div>
                  </div>
                  <div className="p-4"><p className="text-[11px] uppercase tracking-widest font-bold text-green-300">{vid.title}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CORE VALUES --- */}
        <section className="pt-20 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-sm tracking-[0.6em] uppercase text-amber-400 font-bold mb-4">Our Foundations</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white">Our Core <span className="italic text-green-400">Values</span></h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className={`${v.shape} p-10 bg-white/3 border border-white/10 backdrop-blur-md hover:border-green-500/40 transition-all duration-700 group shadow-xl`}>
                <div className="text-3xl text-green-400 mb-6 group-hover:scale-110 transition-transform group-hover:text-amber-400">{v.icon}</div>
                <h4 className="text-xl font-serif text-white mb-3">{v.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed font-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* --- VIDEO MODAL --- */}
      {activeVideo && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fadeIn" onClick={() => setActiveVideo(null)}>
          <button className="absolute top-8 right-8 text-white text-4xl hover:rotate-90 transition-all"><FaTimes /></button>
          <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
            <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        @keyframes marquee-slow { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee-slow { animation: marquee-slow 40s linear infinite; }
        .animate-marquee-slow:hover { animation-play-state: paused; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes draw { 0% { stroke-dashoffset: 1000; stroke-dasharray: 1000; opacity: 0; } 50% { opacity: 0.5; } 100% { stroke-dashoffset: 0; stroke-dasharray: 1000; opacity: 0.15; } }
        .animate-draw { animation: draw 15s linear infinite; }
        .animate-draw-slow { animation: draw 25s linear infinite reverse; }
      `}</style>
    </div>
  );
}