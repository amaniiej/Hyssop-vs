import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function Navbar() {
  const [active, setActive]       = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  
  // ─── UNIVERSAL LANGUAGE LOGIC (LocalStorage) ───
  const [isAmharic, setIsAmharic] = useState(() => {
    return localStorage.getItem("hyssop_lang") === "am";
  });

  const navigate  = useNavigate();
  const location  = useLocation();

  // ─── TRANSLATION DICTIONARY ───
  const labels = {
    en: {
      home: "Home",
      about: "About Us",
      services: "Services",
      shop: "Shop",
      faq: "FAQs",
      contact: "Contact Us",
      shopBtn: "Shop Now",
      navigate: "Navigate",
      langToggle: "አማርኛ"
    },
    am: {
      home: "መነሻ",
      about: "ስለ እኛ",
      services: "አገልግሎቶቻችን",
      shop: "ኸርቦቻችን",
      faq: "ጥያቄና መልስ",
      contact: "እኛን ያገኙ",
      shopBtn: "አሁኑኑ ይግዙ",
      navigate: "ይምረጡ",
      langToggle: "English"
    }
  };

  const t = isAmharic ? labels.am : labels.en;

  const toggleLanguage = () => {
    const nextLang = !isAmharic;
    setIsAmharic(nextLang);
    localStorage.setItem("hyssop_lang", nextLang ? "am" : "en");
    // Notifies other components to update their text immediately
    window.dispatchEvent(new Event("languageChange"));
  };

   useEffect(() => {
     if (menuOpen) {
       setMenuOpen(false);
     }
   }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (location.pathname === "/") {
        const sections = ["home", "about", "products", "story", "services", "reviews", "faq", "contact"];
        let current = "home";
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) { current = section; break; }
          }
        }
        setActive(current);
      } else {
        setActive(location.pathname.split("/")[1] || "home");
      }
    };

    if (location.pathname === "/" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, location.hash]);

  const handleNav = (target: string, isPage: boolean) => {
    setMenuOpen(false);
    if (isPage) {
      navigate(`/${target === "home" ? "" : target}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (location.pathname !== "/") {
        navigate(`/#${target}`);
      } else {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navItems = [
    { name: t.home,     id: "home",     type: "scroll" },
    { name: t.about,    id: "about",    type: "page"   },
    { name: t.services, id: "services", type: "scroll" },
    { name: t.shop,     id: "shop",     type: "page"   },
    { name: t.faq,      id: "faq",      type: "scroll" },
    { name: t.contact,  id: "contact",  type: "page"   },
  ];

  return (
    <>
      <div className={`fixed w-full z-5000 transition-all duration-500 px-4 md:px-6 ${isScrolled ? "top-4" : "top-0"}`}>
        <nav className={`max-w-7xl mx-auto flex justify-between items-center px-5 md:px-8 py-3.5 md:py-4 transition-all duration-500 rounded-full border
          ${isScrolled
            ? "bg-[#0b1f1a]/70 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-transparent"}`}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNav("home", true)}>
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
              <img src="/logo.png" className="w-8 h-8 md:w-9 md:h-9 relative z-10 brightness-110" alt="Hyssop" />
            </div>
            <div className="leading-none">
              <h1 className="text-lg md:text-xl font-bold tracking-tighter text-white">Hyssop</h1>
              <p className="text-[8px] md:text-[9px] text-green-400 uppercase tracking-[0.2em] font-black">Wellness</p>
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map(item => {
              const isActive = active === item.id;
              return (
                <button key={item.id}
                  onClick={() => handleNav(item.id, item.type === "page")}
                  className={`relative uppercase tracking-[0.2em] font-black transition-all duration-300 cursor-pointer
                    ${isActive ? "text-green-400" : "text-gray-400 hover:text-white"}
                    ${isAmharic ? "text-[14px]" : "text-[11px]"}`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right side area */}
          <div className="flex items-center gap-3 md:gap-6">
            
            {/* ─── DESKTOP LANGUAGE TOGGLE ─── */}
            <button 
              onClick={toggleLanguage}
              className="hidden md:block px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-green-400 hover:border-green-400 transition-all cursor-pointer bg-white/5"
            >
              {t.langToggle}
            </button>

            {/* Socials */}
            <div className="hidden lg:flex gap-4 text-gray-500 border-l border-white/10 pl-6">
              <a href="https://www.instagram.com/hyssop_herbs_and_wellness" target="_blank" rel="noreferrer"
                className="hover:text-green-400 transition-colors cursor-pointer"><FaInstagram /></a>
              <a href="https://www.tiktok.com/@hyssopherbswellness?_r=1&_t=ZS-96lL4j8OdBl" target="_blank" rel="noreferrer"
                className="hover:text-green-400 transition-colors cursor-pointer"><FaTiktok /></a>
              <a href="https://www.youtube.com/@addissinanatural" target="_blank" rel="noreferrer"
                className="hover:text-green-400 transition-colors cursor-pointer"><FaYoutube /></a>
            </div>

            {/* Shop Now button */}
            <div className="hidden md:block relative group cursor-pointer">
              <button
                onClick={() => handleNav("shop", true)}
                className={`relative px-6 py-2.5 bg-transparent border-none text-white font-black uppercase tracking-widest cursor-pointer z-10 transition-transform active:scale-95
                ${isAmharic ? "text-[12px]" : "text-[10px]"}`}
              >
                {t.shopBtn}
                <div className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-green-500/20 shadow-[inset_0_0_10px_rgba(74,222,128,0.4)] transition-all duration-300 group-hover:bg-green-500/40" />
                <div className="absolute inset-0 -z-10 rounded-full p-px"
                  style={{ background: "linear-gradient(180deg,rgba(255,255,255,0.4) 0%,rgba(255,255,255,0) 100%)", WebkitMask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor" }} />
              </button>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.25 cursor-pointer z-6000"
              aria-label="Toggle menu"
            >
              <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-400 ease-in-out origin-center
                ${menuOpen ? "w-5 rotate-45 translate-y-[6.5px]" : "w-5"}`} />
              <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ease-in-out
                ${menuOpen ? "w-0 opacity-0" : "w-4 opacity-100"}`} />
              <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-400 ease-in-out origin-center
                ${menuOpen ? "w-5 -rotate-45 -translate-y-[6.5px]" : "w-5"}`} />
            </button>
          </div>
        </nav>
      </div>

      {/* ── MOBILE MENU OVERLAY ─────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-4990 bg-black/60 backdrop-blur-sm transition-opacity duration-500 md:hidden
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 z-4995 w-[85vw] max-w-85 flex flex-col
          transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden`}
        style={{
          transform:      menuOpen ? "translateX(0)" : "translateX(100%)",
          background:     "rgba(6,20,17,0.98)",
          backdropFilter: "blur(40px)",
          borderLeft:     "1px solid rgba(255,255,255,0.07)",
          boxShadow:      "-20px 0 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Drawer top — Nav + Language Toggle */}
        <div className="px-7 pt-24 pb-6 border-b border-white/6 flex items-center justify-between">
          <p className="text-[10px] text-green-400/60 uppercase tracking-[0.5em] font-black">{t.navigate}</p>
          
          <button 
            onClick={toggleLanguage}
            className="px-4 py-1.5 rounded-full border border-white/10 text-[11px] font-black uppercase text-amber-500 bg-white/5 active:scale-95 transition-all"
          >
            {t.langToggle}
          </button>
        </div>

        <nav className="flex-1 px-7 py-6 flex flex-col gap-2 overflow-y-auto">
          {navItems.map((item, i) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id, item.type === "page")}
                className="group relative flex items-center gap-4 w-full text-left py-4 px-4 rounded-2xl transition-all duration-300 cursor-pointer"
                style={{
                  transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
                  opacity:    menuOpen ? 1 : 0,
                  transform:  menuOpen ? "translateX(0)" : "translateX(20px)",
                  background: isActive ? "rgba(52,211,153,0.08)" : "transparent",
                }}
              >
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full transition-all duration-300
                    ${isActive ? "h-6 bg-green-400 shadow-[0_0_8px_#4ade80]" : "h-0 bg-transparent"}`}
                />
                <span className={`font-serif tracking-wide transition-colors duration-300
                  ${isActive ? "text-white" : "text-white/40"}
                  ${isAmharic ? "text-[24px]" : "text-xl"}`}>
                  {item.name}
                </span>
                {isActive && (
                  <span className="ml-auto text-green-400/60 text-xs">→</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Drawer bottom — socials + shop button */}
        <div className="px-8 py-8 border-t border-white/6 flex flex-col gap-5 bg-white/1">
          <div className="flex items-center gap-6 text-gray-500 text-xl">
            <a href="https://www.instagram.com/hyssop_herbs_and_wellness" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@hyssopherbswellness?_r=1&_t=ZS-96lL4j8OdBl" target="_blank" rel="noreferrer"><FaTiktok /></a>
            <a href="https://www.youtube.com/@addissinanatural" target="_blank" rel="noreferrer"><FaYoutube /></a>
          </div>

          <div className="relative group cursor-pointer">
            <button
              onClick={() => handleNav("shop", true)}
              className={`relative w-full py-4 bg-transparent border-none text-white font-black uppercase tracking-[0.25em] cursor-pointer z-10 transition-transform active:scale-95
              ${isAmharic ? "text-[11px]" : "text-[10px]"}`}
            >
              {t.shopBtn}
              <div className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-green-500/20 shadow-[inset_0_0_14px_rgba(74,222,128,0.35)] transition-all duration-300 group-hover:bg-green-500/35" />
              <div className="absolute inset-0 -z-10 rounded-full p-px"
                style={{ background: "linear-gradient(180deg,rgba(255,255,255,0.3) 0%,rgba(255,255,255,0) 100%)", WebkitMask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor" }} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer-line { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-shimmer-line { animation: shimmer-line 3s infinite; }
      `}</style>
    </>
  );
}