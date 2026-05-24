import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the hook

export default function Hero() {
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0b1f1a]"
    >
      {/* Background Decorative Glows */}
      <div className="absolute w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full -top-48 -left-24" />
      <div className="absolute w-[400px] h-[400px] bg-green-900/20 blur-[100px] rounded-full bottom-0 right-0" />

      <div className="container mx-auto px-6 md:px-12 z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* LEFT SIDE: Content */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-green-400 text-sm tracking-[0.2em] uppercase mb-4 font-semibold">
              Premium Herbal Solutions
            </p>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 font-serif text-white">
              Hyssop Herbs <br />
              <span className="text-green-500">& Wellness</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg italic">
              "Healing Begins With Nature." Discover our hand-crafted organic 
              remedies designed to restore your body's natural balance.
            </p>

            {/* ─── FIXED BUTTONS USING NAVIGATE ─── */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center">
              
              {/* SHOP NOW BUTTON (Emerald Theme) */}
              <div 
                onClick={() => navigate('/shop')} 
                className="relative group cursor-pointer no-underline"
              >
                <button className="relative px-10 py-4 bg-transparent border-none text-white font-bold text-sm uppercase tracking-widest cursor-pointer z-10 transition-transform active:scale-95">
                  Shop Now
                  {/* Base Layer */}
                  <div className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-green-500/20 shadow-[inset_0_0_12px_rgba(74,222,128,0.4)] transition-all duration-300 group-hover:bg-green-500/40 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]" />
                  {/* Glowing Border Layer */}
                  <div className="absolute inset-0 -z-10 rounded-full p-[1px]" 
                    style={{
                      background: 'linear-gradient(180deg, rgba(134,239,172,0.4) 0%, rgba(134,239,172,0) 100%)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor'
                    }} 
                  />
                </button>
              </div>

              {/* BOOK CALL BUTTON (Amber Theme) */}
              <div 
                onClick={() => navigate('/contact')} 
                className="relative group cursor-pointer no-underline"
              >
                <button className="relative px-10 py-4 bg-transparent border-none text-white font-bold text-sm uppercase tracking-widest cursor-pointer z-10 transition-transform active:scale-95">
                  Book A Call
                  {/* Base Layer */}
                  <div className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-amber-500/10 shadow-[inset_0_0_12px_rgba(251,191,36,0.3)] transition-all duration-300 group-hover:bg-amber-500/30 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]" />
                  {/* Glowing Border Layer */}
                  <div className="absolute inset-0 -z-10 rounded-full p-[1px]" 
                    style={{
                      background: 'linear-gradient(180deg, rgba(251,191,36,0.4) 0%, rgba(251,191,36,0) 100%)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor'
                    }} 
                  />
                </button>
              </div>

            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap gap-6 justify-center md:justify-start opacity-70">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✔</span>
                <span className="text-xs uppercase tracking-widest text-white">100% Organic</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✔</span>
                <span className="text-xs uppercase tracking-widest text-white">Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✔</span>
                <span className="text-xs uppercase tracking-widest text-white">Delivered with Care</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Image */}
          <div className="flex-1 relative">
            <div 
              className="relative z-10 w-full max-w-lg mx-auto scale-90"
              style={{ transform: `translateY(${offset * -0.05}px)` }}
            >
              <img
                src="/images/hero-img.jpeg" 
                alt="Hyssop Herbal Products"
                className="rounded-2xl shadow-2xl border border-white/5 object-cover w-full h-125"
              />
              
              <div className="absolute -bottom-6 -left-6 bg-[#0f3d2e]/90 backdrop-blur-md p-4 rounded-xl border border-green-500/20 shadow-xl hidden md:block">
                <p className="text-green-400 font-bold text-sm">Customer Choice</p>
                <p className="text-white text-xs">Pure Hyssop Extract</p>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-500/5 rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
}
