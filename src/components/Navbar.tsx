import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function Navbar() {
  const [active, setActive]       = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Lock body scroll when menu is open
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
    { name: "Home",       id: "home",    type: "scroll" },
    { name: "About Us",   id: "about",   type: "page"   },
    { name: "Services",   id: "services",type: "scroll" },
    { name: "Shop",       id: "shop",    type: "page"   },
    { name: "FAQs",       id: "faq",     type: "scroll" },
    { name: "Contact Us", id: "contact", type: "page"   },
  ];

  return (
    <>
      {/* ── NAVBAR BAR ─────────────────────────────────────────────────── */}
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
          <div className="hidden md:flex items-center gap-10">
            {navItems.map(item => {
              const isActive = active === item.id;
              return (
                <button key={item.id}
                  onClick={() => handleNav(item.id, item.type === "page")}
                  className={`relative text-[11px] uppercase tracking-[0.3em] font-black transition-all duration-300 cursor-pointer
                    ${isActive ? "text-green-400" : "text-gray-400 hover:text-white"}`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right side: socials + shop button + hamburger */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Socials — desktop only */}
            <div className="hidden lg:flex gap-4 text-gray-500 border-r border-white/10 pr-6">
              <a href="https://www.instagram.com/hyssop_herbs_and_wellness" target="_blank" rel="noreferrer"
                className="hover:text-green-400 transition-colors cursor-pointer"><FaInstagram /></a>
              <a href="https://www.tiktok.com/@addissinanaturalbeauty" target="_blank" rel="noreferrer"
                className="hover:text-green-400 transition-colors cursor-pointer"><FaTiktok /></a>
              <a href="https://www.youtube.com/@addissinanatural" target="_blank" rel="noreferrer"
                className="hover:text-green-400 transition-colors cursor-pointer"><FaYoutube /></a>
            </div>

            {/* Shop Now button — desktop only */}
            <div className="hidden md:block relative group cursor-pointer">
              <button
                onClick={() => handleNav("shop", true)}
                className="relative px-6 py-2.5 bg-transparent border-none text-white font-black uppercase tracking-widest text-[10px] cursor-pointer z-10 transition-transform active:scale-95"
              >
                Shop Now
                <div className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-green-500/20 shadow-[inset_0_0_10px_rgba(74,222,128,0.4)] transition-all duration-300 group-hover:bg-green-500/40" />
                <div className="absolute inset-0 -z-10 rounded-full p-px"
                  style={{ background: "linear-gradient(180deg,rgba(255,255,255,0.4) 0%,rgba(255,255,255,0) 100%)", WebkitMask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor" }} />
                <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-45 -translate-x-full group-hover:animate-shimmer" />
                </div>
              </button>
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.25 cursor-pointer z-6000 group"
              aria-label="Toggle menu"
            >
              {/* Three lines that animate into X */}
              <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-400 ease-in-out origin-center
                ${menuOpen ? "w-5 rotate-45 translate-y-[6.5px]" : "w-5"}`} />
              <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ease-in-out
                ${menuOpen ? "w-0 opacity-0" : "w-4 opacity-100"}`} />
              <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-400 ease-in-out origin-center
                ${menuOpen ? "w-5 -rotate-45 -translate-y-[6.5px]" : "w-5"}`} />
            </button>
          </div>
        </nav>

        {/* Shimmer line */}
        <div className={`max-w-7xl mx-auto h-px mt-2 overflow-hidden px-10 transition-opacity duration-700 ${isScrolled ? "opacity-20" : "opacity-0"}`}>
          <div className="h-full bg-linear-to-r from-transparent via-green-400 to-transparent animate-shimmer-line" style={{ width: "100%" }} />
        </div>
      </div>

      {/* ── MOBILE MENU OVERLAY ─────────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-4990 bg-black/60 backdrop-blur-sm transition-opacity duration-500 md:hidden
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer panel — slides in from the right */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-4995 w-[78vw] max-w-[320px] flex flex-col
          transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden`}
        style={{
          transform:      menuOpen ? "translateX(0)" : "translateX(100%)",
          background:     "rgba(6,20,17,0.96)",
          backdropFilter: "blur(40px)",
          borderLeft:     "1px solid rgba(255,255,255,0.07)",
          boxShadow:      "-20px 0 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Drawer top — logo repeat + close hint */}
        <div className="px-7 pt-20 pb-8 border-b border-white/6">
          <p className="text-[9px] text-green-400/60 uppercase tracking-[0.5em] font-black">Navigate</p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-7 py-6 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item, i) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id, item.type === "page")}
                className="group relative flex items-center gap-4 w-full text-left py-3.5 px-4 rounded-2xl transition-all duration-300 cursor-pointer"
                style={{
                  // Stagger the entrance animation
                  transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
                  opacity:    menuOpen ? 1 : 0,
                  transform:  menuOpen ? "translateX(0)" : "translateX(20px)",
                  background: isActive ? "rgba(52,211,153,0.08)" : "transparent",
                }}
              >
                {/* Active indicator bar */}
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full transition-all duration-300
                    ${isActive ? "h-6 bg-green-400 shadow-[0_0_8px_#4ade80]" : "h-0 bg-transparent"}`}
                />

                {/* Item number */}
                <span className={`text-[10px] font-black tabular-nums transition-colors duration-300
                  ${isActive ? "text-green-400/60" : "text-white/15"}`}>
                  0{i + 1}
                </span>

                {/* Item name */}
                <span className={`font-serif text-lg tracking-wide transition-colors duration-300
                  ${isActive ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>
                  {item.name}
                </span>

                {/* Arrow on active */}
                {isActive && (
                  <span className="ml-auto text-green-400/60 text-xs">→</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Drawer bottom — socials + shop button */}
        <div className="px-7 py-7 border-t border-white/6 flex flex-col gap-5">
          {/* Socials */}
          <div className="flex items-center gap-5 text-gray-500">
            <a href="https://www.instagram.com/hyssop_herbs_and_wellness" target="_blank" rel="noreferrer"
              className="hover:text-green-400 transition-colors cursor-pointer text-lg"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@hyssopherbswellness?_r=1&_t=ZS-96V2clq11LY" target="_blank" rel="noreferrer"
              className="hover:text-green-400 transition-colors cursor-pointer text-lg"><FaTiktok /></a>
            <a href="https://www.youtube.com/@addissinanatural" target="_blank" rel="noreferrer"
              className="hover:text-green-400 transition-colors cursor-pointer text-lg"><FaYoutube /></a>
          </div>

          {/* Shop Now CTA */}
          <div className="relative group cursor-pointer">
            <button
              onClick={() => handleNav("shop", true)}
              className="relative w-full py-3.5 bg-transparent border-none text-white font-black uppercase tracking-[0.25em] text-[10px] cursor-pointer z-10 transition-transform active:scale-95"
            >
              Shop Now
              <div className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-green-500/20 shadow-[inset_0_0_14px_rgba(74,222,128,0.35)] transition-all duration-300 group-hover:bg-green-500/35" />
              <div className="absolute inset-0 -z-10 rounded-full p-px"
                style={{ background: "linear-gradient(180deg,rgba(255,255,255,0.3) 0%,rgba(255,255,255,0) 100%)", WebkitMask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor" }} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer      { 100% { transform: translateX(200%); } }
        @keyframes shimmer-line { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-shimmer      { animation: shimmer 2.5s infinite; }
        .animate-shimmer-line { animation: shimmer-line 3s infinite; }
      `}</style>
    </>
  );
}
