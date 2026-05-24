import { useState, useEffect } from "react";
import { FaEnvelope, FaInstagram, FaWhatsapp, FaPaperPlane } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
const supabase = (SUPABASE_URL && SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL")
  ? createClient(SUPABASE_URL, SUPABASE_ANON)
  : null;

export default function Contact() {
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
  return (
    <section id="contact" className="relative py-16 px-6 bg-[#0b1f1a] overflow-hidden">
      
      {/* --- DYNAMIC GRADIENT RADIANCE --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Compact Header */}
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-serif text-white mb-2">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">Sanctuary</span> Connection
          </h3>
          <p className="text-gray-400 text-sm font-light">Reach out for inquiries and wellness guidance.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          
          {/* --- LEFT: COMPACT INFO PILLS (2 Cols) --- */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center gap-4 hover:border-green-500/30 transition-all group">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                <FaEnvelope />
              </div>
              <div className="overflow-hidden">
                <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Email</p>
                <p className="text-white text-sm truncate">Hyssopherbswelness@gmail.com</p>
              </div>
            </div>

            <a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center gap-4 hover:border-green-500/30 transition-all group block">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                <FaWhatsapp />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">WhatsApp</p>
                <p className="text-white text-sm">+{whatsappNumber}</p>
              </div>
            </a>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center gap-4 hover:border-green-500/30 transition-all group">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                <FaInstagram />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Instagram</p>
                <p className="text-white text-sm">@hyssop_wellness</p>
              </div>
            </div>
            
            {/* Simple Signature */}
            <div className="pt-4 text-center lg:text-left">
               <p className="text-[10px] text-amber-500/40 uppercase tracking-[0.4em] italic font-serif">Handcrafted with Intention</p>
            </div>
          </div>

          {/* --- RIGHT: GRADIENT FORM (3 Cols) --- */}
          <div className="lg:col-span-3 relative group">
            {/* Subtle glow behind form */}
            <div className="absolute -inset-1 bg-gradient-to-br from-green-500/20 to-emerald-900/20 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            
            <form onSubmit={handleSubmit} className="relative bg-gradient-to-br from-[#0f3d2e] to-[#0b1f1a] p-8 rounded-[2rem] border border-white/10 shadow-2xl space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition-all"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition-all"
                />
              </div>
              
              <textarea 
                placeholder="How can we help your wellness journey?" 
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition-all resize-none"
              ></textarea>

              <button type="submit" className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all cursor-pointer">
                <span>Send Message</span>
                <FaPaperPlane className="text-[10px]" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}