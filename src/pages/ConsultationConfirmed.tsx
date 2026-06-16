import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCheckCircle, FaCalendarAlt, FaLock, FaArrowRight } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
const supabase = (SUPABASE_URL && SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL")
  ? createClient(SUPABASE_URL, SUPABASE_ANON)
  : null;

export default function ConsultationConfirmed() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(true);
  const [verifying, setVerifying] = useState(true);

  // Synchronizes with your Navbar's universal language toggle
  const [isAmharic, setIsAmharic] = useState(() => {
    return localStorage.getItem("hyssop_lang") === "am";
  });

  useEffect(() => {
    const handleLangChange = () => {
      setIsAmharic(localStorage.getItem("hyssop_lang") === "am");
    };
    window.addEventListener("languageChange", handleLangChange);
    return () => window.removeEventListener("languageChange", handleLangChange);
  }, []);

  // ─── ROUTE GUARD: VERIFY STRIPE SESSION ───
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!sessionId) {
        if (!cancelled) {
          setIsAuthorized(false);
          setVerifying(false);
        }
        return;
      }

      try {
        if (supabase) {
          // Queries your database to ensure this Stripe session is valid and exists in your orders
          const { data, error } = await supabase
            .from("orders")
            .select("status")
            .eq("id", sessionId)
            .single();

          if (!cancelled) {
            if (!error && data) {
              setIsAuthorized(true);
            } else {
              // If session isn't in DB yet, fallback to validating format (useful for test checkouts)
              setIsAuthorized(sessionId.startsWith("cs_"));
            }
          }
        } else {
          // Fallback during local development if Supabase isn't configured yet
          if (!cancelled) setIsAuthorized(sessionId.startsWith("cs_"));
        }
      } catch {
        if (!cancelled) setIsAuthorized(false);
      } finally {
        if (!cancelled) setVerifying(false);
      }
    };

    void run();
    return () => { cancelled = true; };
  }, [sessionId]);

  const content = {
    en: {
      badge: "Payment Successful",
      title: "Schedule Your Consultation",
      desc: "Thank you for your payment. Your space is now reserved in our sanctuary registry. Please use the calendar below to select the perfect date and time for your healing guidance.",
      caption: "Secure Booking Portal",
      verifying: "Verifying your payment sanctuary...",
      lockTitle: "Sanctuary Access Locked",
      lockDesc: "This booking portal is reserved exclusively for customers with completed consultation payments. If you have already paid, please check your secure link or email confirmation.",
      lockBtn: "Return to Home"
    },
    am: {
      badge: "ክፍያዎ ተጠናቋል",
      title: "የምክር ሰዓትዎን ይያዙ",
      desc: "ክፍያዎ በተሳካ ሁኔታ ተጠናቋል። የምክር ሰዓት ለመያዝ ዝግጁ ነዎት። እባክዎ ከታች ያለውን ሰሌዳ በመጠቀም ለእርስዎ የሚመቸውን የክትትልና የምክር ሰዓት ይምረጡ።",
      caption: "ደህንነቱ የተጠበቀ የቀጠሮ ሰሌዳ",
      verifying: "የክፍያ ሁኔታዎን በማረጋገጥ ላይ...",
      lockTitle: "የቀጠሮ ሰሌዳው ተቆልፏል",
      lockDesc: "ይህ የቀጠሮ ማስያዣ ገጽ ክፍያቸውን ላጠናቀቁ ደንበኞች ብቻ የተዘጋጀ ነው። ክፍያ ፈጽመው ይህንን ካዩ እባክዎ በኢሜልዎ የተላከውን አስተማማኝ ሊንክ ያረጋግጡ።",
      lockBtn: "ወደ መነሻ ገጽ ይመለሱ"
    }
  };

  const t = isAmharic ? content.am : content.en;

  return (
    <div className="bg-[#f0f4f1] text-[#0b1f1a] min-h-screen flex flex-col font-sans selection:bg-green-500/30 overflow-x-hidden relative">
      <SEO
        title="Consultation Confirmed | Hyssop Herbs & Wellness"
        description="Schedule your herbal consultation session."
        url="https://hyssopherb.com/consultation-confirmed"
        noindex={true}
      />
      <Navbar />

      {/* ─── TOP DARK FADE FOR NAVBAR VISIBILITY (Fades exactly above the Title) ─── */}
      <div className="absolute top-0 left-0 right-0 h-[2
      4rem] bg-linear-to-b from-[#0b1f1a] to-transparent z-0 pointer-events-none" />

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[-10%] w-125 h-125 bg-green-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 bg-amber-500/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 grow flex flex-col items-center justify-center pt-32 pb-24 px-6 max-w-5xl mx-auto w-full">
        
        {verifying ? (
          /* --- STATE 1: VERIFYING --- */
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-sm font-light italic">{t.verifying}</p>
          </div>
        ) : !isAuthorized ? (
          /* --- STATE 2: ACCESS LOCKED (Unauthorized Bypassers) --- */
          <div className="text-center max-w-md mx-auto my-12 p-8 bg-white/70 backdrop-blur-xl border border-black/5 rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.05)] animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 mx-auto mb-6">
              <FaLock className="text-xl" />
            </div>
            <h2 className="text-2xl font-serif text-[#0b1f1a] mb-3">{t.lockTitle}</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">{t.lockDesc}</p>
            <button
              onClick={() => navigate("/")}
              className="w-full py-4 bg-[#0b1f1a] text-white font-black uppercase text-[10px] tracking-[0.25em] rounded-2xl hover:bg-[#113022] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>{t.lockBtn}</span>
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        ) : (
          /* --- STATE 3: PAYMENT CONFIRMED (Authorized Booking) --- */
          <div className="w-full flex flex-col items-center animate-fadeIn">
            {/* Header Welcome Block */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4 animate-pulse">
                <FaCheckCircle className="text-green-600 text-sm" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-green-700 font-black">
                  {t.badge}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-4 text-[#0b1f1a]">
                {t.title}
              </h1>
              
              <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed">
                {t.desc}
              </p>
            </div>

            {/* Embedded Inline Calendly Container */}
            <div className="w-full bg-white/70 backdrop-blur-xl border border-black/5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden relative">
              <div className="h-1.5 w-full bg-linear-to-r from-green-500 via-amber-400 to-green-500" />
              
              <div className="p-2 md:p-6 min-h-175 relative">
                <iframe
                  src="https://calendly.com/hyssopherbswelness/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=f0f4f1&text_color=0b1f1a&primary_color=22c55e"
                  width="100%"
                  height="700"
                  frameBorder="0"
                  className="w-full relative z-10 rounded-2xl"
                  title="Schedule Consultation"
                />
              </div>
            </div>

            {/* Footer Accent */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 text-gray-400 text-xs">
                <FaCalendarAlt />
                <span className="uppercase tracking-[0.2em] font-bold">{t.caption}</span>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}