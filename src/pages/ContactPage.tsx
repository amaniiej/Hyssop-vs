import { useState, useEffect } from "react";
import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEnvelope, FaGlobeAfrica, FaGlobeAmericas, FaPaperPlane } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
const supabase = (SUPABASE_URL && SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL")
  ? createClient(SUPABASE_URL, SUPABASE_ANON)
  : null;

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState(import.meta.env.VITE_MERCHANT_WHATSAPP ?? "251952161260");

  useEffect(() => {
    async function loadWhatsappNumber() {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from("settings")
            .select("value")
            .eq("key", "whatsapp_number")
            .single();
          if (!error && data) {
            setWhatsappNumber(data.value);
          }
        }
      } catch (err) {
        console.warn("Failed to load WhatsApp setting from DB:", err);
      }
    }
    loadWhatsappNumber();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const whatsappText = `🌿 *HYSSOP HERBS - INQUIRY* 🌿\n----------------------------------------\n*From:* ${name}\n*Email:* ${email}\n*Message:* ${message}\n----------------------------------------\n`;
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappText)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Logic for the Aligned Grid of 15 Logos (Matches your Reviews style)
  const logoGrid = [
    { t: '5%', l: '10%' }, { t: '5%', l: '50%' }, { t: '5%', l: '90%' },
    { t: '25%', l: '30%' }, { t: '45%', l: '60%' },
    { t: '85%', l: '10%' }, { t: '5%', l: '50%' }, { t: '85%', l: '90%' },
    { t: '55%', l: '90%' }, { t: '55%', l: '5%' }, { t: '85%', l: '45%' }
  ];

  return (
    <div className="bg-[#095845] text-white min-h-screen flex flex-col font-sans selection:bg-green-500/30 overflow-x-hidden relative">
      <SEO
        title="Book a Consultation | Hyssop Herbs & Wellness"
        description="Book a $25 expert herbal consultation with Hyssop Herbs & Wellness. Get personalized guidance on liver health, hormonal balance, fertility, gut health, and more from a certified Ethiopian herbalist."
        url="https://hyssopherb.com/contact"
      />
      <Navbar />

      {/* --- DYNAMIC GLOWING BACKGROUND (With Logo Watermarks Added) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        
        {/* ── FLOWER LOGO WATERMARKS (Reviews style) ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.25]">
          {logoGrid.map((pos, i) => (
            <img 
              key={i}
              src="/images/hysspo-bg-preview.png" 
              className="absolute select-none"
              style={{ 
                top: pos.t, 
                left: pos.l, 
                width: '220px',
                transform: 'translate(-50%, -50%) rotate(-15deg)' 
              }}
              alt="" 
            />
          ))}
        </div>

        <div className="absolute top-[5%] left-[-5%] w-150 h-150 bg-emerald-600/20 blur-[130px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-125 h-125 bg-green-500/10 blur-[100px] rounded-full" />
        <div className="absolute top-[40%] right-[15%] w-100 h-100 bg-amber-500/10 blur-[110px] rounded-full animate-bounce-slow" />
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <path d="M-100,500 C150,300 350,700 500,500 C650,300 850,700 1100,500" stroke="white" strokeWidth="0.5" fill="none" className="animate-draw" />
          <path d="M500,-100 C300,150 700,350 500,500 C300,650 700,850 500,1100" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" fill="none" />
        </svg>
      </div>
 
      <main className="relative z-10 grow flex items-center pt-20 md:pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-x-12 gap-y-16 items-center lg:-translate-y-[13%]">

          {/* --- LEFT SIDE: THE INFO --- */}
          <div className="space-y-8 md:space-y-10 lg:pr-12">
            <header>
              <h2 className="text-5xl md:text-6xl lg:text-8xl font-serif leading-tight text-white mb-4 md:mb-6">
                Contact <span className="italic text-green-400">Us</span>
              </h2>
              <p className="text-gray-100 text-base md:text-lg font-light max-w-md leading-relaxed border-l-2 border-green-500/30 pl-6">
                ለፈውስ ጉዞዎ የባለሙያ ምክር ለማግኘት በዓለም ዙሪያ ካሉ ቅርንጫፎቻችን ጋር ይገናኙ።
              </p>
            </header>

            <div className="space-y-8 md:space-y-10 max-w-sm">
              {/* Branch: Ethiopia */}
              <a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="flex items-center gap-3 text-emerald-400 mb-2">
                  <FaGlobeAfrica className="text-base group-hover:rotate-12 transition-transform duration-500" />
                  <span className="text-[10px] tracking-[0.4em] uppercase font-black opacity-70 group-hover:opacity-100 transition-opacity">Addis Ababa HQ</span>
                </div>
                <div className="pl-8 border-l border-white/10 group-hover:border-green-500 transition-all">
                  <p className="text-white text-lg font-serif leading-tight">Bole, Kekere building 1st floor room 1-012/5</p>
                  <p className="text-green-400 font-bold mt-2 text-sm tracking-widest">+251 99 826 7544</p>
                  <p className="text-green-400 font-bold mt-2 text-sm tracking-widest">+251 95 216 1260</p>
                </div>
              </a>

              {/* Branch: USA */}
              <div className="group">
                <div className="flex items-center gap-3 text-amber-500 mb-2">
                  <FaGlobeAmericas className="text-base group-hover:rotate-12 transition-transform duration-500" />
                  <span className="text-[10px] tracking-[0.4em] uppercase font-black opacity-70 group-hover:opacity-100 transition-opacity">Texas Office</span>
                </div>
                <div className="pl-8 border-l border-white/10 group-hover:border-amber-500 transition-all">
                  <p className="text-white text-lg font-serif leading-tight">Dallas, Texas 75038</p>
                  <p className="text-amber-500 font-bold mt-2 text-sm tracking-widest">+1 214 756 7361</p>
                </div>
              </div>
            </div>

            {/* Email Contact */}
            <div className="-mt-5">
              <a href="mailto:Hyssopherbswelness@gmail.com" className="group flex items-center gap-4 hover:translate-x-2 transition-transform">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-green-500 group-hover:border-green-500 transition-all">
                  <FaEnvelope className="text-xs text-green-300 group-hover:text-white" />
                </div>
                <span className="text-sm font-bold tracking-tight text-gray-200 group-hover:text-white border-b border-white/10 pb-1 break-all">
                  Hyssopherbswelness@gmail.com
                </span>
              </a>
            </div>
          </div>

          {/* --- RIGHT SIDE: COMPACT FORM --- */}
          <div className="w-full max-w-md lg:ml-auto">
            <form onSubmit={handleSubmit} className="space-y-12 relative">
              <div className="grid md:grid-cols-2 gap-10">

                {/* Name */}
                <div className="relative group">
                  <input
                    type="text"
                    required
                    placeholder=" "
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-sm text-white focus:outline-none transition-all placeholder-transparent"
                    id="name"
                  />
                  <label htmlFor="name"
                    className="absolute left-0 top-3 text-[11px] font-bold tracking-[0.4em] text-gray-100 uppercase transition-all duration-300 peer-focus:-top-6 peer-focus:text-green-400 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-green-400">
                    Full Name
                  </label>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-green-500 w-0 peer-focus:w-full transition-all duration-700" />
                </div>

                {/* Email */}
                <div className="relative group">
                  <input
                    type="email"
                    required
                    placeholder=" "
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-sm text-white focus:outline-none transition-all placeholder-transparent"
                    id="email"
                  />
                  <label htmlFor="email"
                    className="absolute left-0 top-3 text-[11px] font-bold tracking-[0.4em] text-gray-100 uppercase transition-all duration-300 peer-focus:-top-6 peer-focus:text-green-400 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-green-400">
                    Email
                  </label>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-green-500 w-0 peer-focus:w-full transition-all duration-700" />
                </div>
              </div>

              {/* Message */}
              <div className="relative group pt-4">
                <textarea
                  rows={4}
                  required
                  placeholder=" "
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="peer w-full bg-transparent border-b border-white/20 py-3 text-sm text-white focus:outline-none transition-all placeholder-transparent resize-none"
                  id="msg"
                />
                <label htmlFor="msg"
                  className="absolute left-0 top-3 text-[11px] font-bold tracking-[0.4em] text-gray-100 uppercase transition-all duration-300 peer-focus:-top-6 peer-focus:text-green-400 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-green-400">
                  Your Message
                </label>
                <div className="absolute bottom-0 left-0 h-0.5 bg-green-500 w-0 peer-focus:w-full transition-all duration-700" />
              </div>

              <div className="pt-6">
                <button type="submit"
                  className="group flex items-center gap-6 md:gap-10 bg-transparent text-white uppercase tracking-[0.5em] text-[11px] font-black hover:text-green-400 transition-all cursor-pointer">
                  <span>Send Inquiry</span>
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-green-600 group-hover:border-green-600 group-hover:text-white transition-all shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                    <FaPaperPlane className="text-xs" />
                  </div>
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes draw {
          0%   { stroke-dashoffset: 1000; stroke-dasharray: 1000; opacity: 0; }
          50%  { opacity: 0.5; }
          100% { stroke-dashoffset: 0; stroke-dasharray: 1000; opacity: 0.15; }
        }
        .animate-draw { animation: draw 12s linear infinite; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-20px); }
        }
        .animate-bounce-slow { animation: bounce-slow 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}