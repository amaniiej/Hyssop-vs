import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  image: string;
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const savedScrollY = useRef(0);

  useEffect(() => {
    if (selectedProduct) {
      savedScrollY.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollY.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo({ top: savedScrollY.current, behavior: "instant" as ScrollBehavior });
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, [selectedProduct]);

  // ─── ADDED 4TH PRODUCT & UPDATED LIST ───
  const products: Product[] = [
    {
      id: 1,
      title: "Soursop Leaves",
      category: "Medicinal Herbs",
      price: "$12.00",
      image: "/images/herb-face-mask.jpg",
      description: "Soursop leaves are traditionally used in herbal medicine for their potential health benefits, including promoting relaxation, supporting the immune system, and aiding digestion. They contain various compounds, including antioxidants studied for their anti-inflammatory properties.",
    },
    {
      id: 2,
      title: "Passion Flower",
      category: "Medicinal Herbs",
      price: "$12.00",
      image: "/images/passion-flower.jpg",
      description: "A typically fast-growing vine known for showy, intricate flowers. Passiflora produces exotic blooms used historically for relaxation and sleep support, attracting pollinators with its distinctive corona of filaments.",
    },
    {
      id: 3,
      title: "Calendula Flower",
      category: "Medicinal Herbs",
      price: "$12.00",
      image: "/images/Calendula-flower.jpg",
      description: "Organic yellow to bright orange blooms valued for skin-soothing, anti-inflammatory properties. Typically infused into oils for balms or steeped into tea to support cellular restoration and healing.",
    },
    {
      id: 4,
      title: "Women's Cleansing",
      category: "Medicinal Herbs",
      price: "$11.00",
      image: "/images/WOMENs CLEANSING.jpg",
      description: "A deeply restorative and gentle blend crafted specifically for women's holistic wellness. Formulated with traditional herbs to support natural cleansing, hormonal balance, and inner vitality.",
    }
  ];

  // Modal rendered via portal
  const modal = selectedProduct ? createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/85 backdrop-blur-xl animate-fadeIn px-4"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={() => setSelectedProduct(null)}
    >
      <div
        className="relative w-full max-w-5xl bg-[#061411]/80 backdrop-blur-[60px] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
        style={{ boxShadow: "0 0 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-6 right-6 z-30 bg-white/5 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white border border-white/10 transition-all cursor-pointer"
        >
          ✕
        </button>

        <div className="md:w-5/12 h-56 md:h-auto relative shrink-0">
          <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.title} />
          <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#0b1f1a]/40" />
        </div>

        <div className="relative z-10 md:w-7/12 p-10 md:p-14 flex flex-col justify-between">
          <div className="mb-8">
            <span className="text-green-400 text-[10px] tracking-[0.5em] uppercase mb-2 block font-black">{selectedProduct.category}</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-3 text-white leading-tight">{selectedProduct.title}</h2>
            <p className="text-2xl font-bold text-white/90 mb-6">{selectedProduct.price}</p>
            <div className="h-px w-12 bg-green-500/40 mb-8" />
            <p className="text-gray-300 leading-relaxed font-light text-base italic">
              {selectedProduct.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate("/shop")}
              className="flex-1 py-4 bg-green-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-green-500 transition-all cursor-pointer shadow-lg"
            >
              Add to Sanctuary
            </button>
            <button
              onClick={() => setSelectedProduct(null)}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <section id="products" className="relative py-24 px-6 bg-[#f5f0eb] overflow-hidden">
        
        {/* Living background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-150 h-150 bg-green-500/10 blur-[130px] rounded-full animate-pulse-slow" />
          <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 bg-emerald-600/10 blur-[110px] rounded-full animate-pulse-slow delay-1000" />
          
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
            <path d="M-100,200 C200,50 400,500 600,200 S900,50 1100,200" stroke="rgba(11,31,26,0.1)" strokeWidth="0.5" fill="none" className="animate-draw-line" />
            <path d="M1100,800 C850,600 500,1000 200,800 S-100,600 -200,800" stroke="rgba(34,197,94,0.2)" strokeWidth="1" fill="none" className="animate-draw-line-slow" />
          </svg>

          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-green-500/30 rounded-full animate-float-pollen"
              style={{
                top: `${(i * 17 + 5) % 100}%`,
                left: `${(i * 23 + 8) % 100}%`,
                animationDelay: `${i * 1.5}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.6em] uppercase text-amber-500 font-black block mb-4">Botanical Apothecary</span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#0b1f1a]">
              Nature's <span className="text-green-600 italic font-light">Pharmacy</span>
            </h2>
          </div>

          {/* ─── 4-COLUMN GRID REDESIGN ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {products.map((product) => (
              <div key={product.id} className="group w-full max-w-75 perspective-distant">
                {/* ─── DARK GREEN PREMIUM CARD DESIGN ─── */}
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="relative h-85 rounded-[35px] overflow-hidden cursor-pointer transition-all duration-700 ease-out transform-gpu transform-3d group-hover:transform-[rotateY(8deg)_rotateX(2deg)] group-hover:shadow-[0_20px_40px_-10px_rgba(22,163,74,0.3)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]"
                  style={{
                    background: "linear-gradient(145deg, #1c4d3b 0%, #123326 100%)", // Deep forest green
                    border: "1px solid rgba(34,197,94,0.15)"
                  }}
                >
                  {/* Subtle inner emerald glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent opacity-60" />

                  <div className="absolute inset-2.5 rounded-[28px] border border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden transform-[translateZ(25px)] shadow-[inset_0_0_15px_rgba(0,0,0,0.1)]">
                    <div className="relative h-[55%] w-full overflow-hidden bg-black/20">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale-15 group-hover:grayscale-0"
                      />
                      {/* Fade image bottom directly into the dark card */}
                      <div className="absolute inset-0 bg-linear-to-t from-[#123326] via-[#123326]/60 to-transparent" />
                    </div>

                    <div className="px-5 py-4 h-[45%] flex flex-col justify-between relative z-10">
                      <div>
                        <h3 className="text-lg font-serif text-white mb-1 group-hover:text-green-400 transition-colors line-clamp-1">{product.title}</h3>
                        <p className="text-gray-400 text-[8px] tracking-[0.3em] uppercase mb-0">{product.category}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <p className="text-lg font-bold text-green-400">{product.price}</p>
                        <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-[#0b1f1a] transition-all duration-300">
                          <span className="text-xs">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ─── REDESIGNED HIGH-VISIBILITY BUTTON ─── */}
          <div className="mt-24 text-center">
            <div className="relative inline-block group cursor-pointer">
              <button
                onClick={() => navigate("/shop")}
                className="relative px-12 py-5 rounded-full border-none text-white font-black text-[11px] uppercase tracking-[0.2em] cursor-pointer z-10 transition-all duration-300 active:scale-95 shadow-[0_10px_30px_rgba(11,31,26,0.3)] hover:shadow-[0_15px_35px_rgba(22,163,74,0.3)] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #0b1f1a 0%, #0f3d2e 100%)", // Solid rich dark green
                }}
              >
                <span className="relative z-20 flex items-center gap-3">
                  Browse Full Catalog
                  <span className="text-green-400 text-sm group-hover:translate-x-1 transition-transform">→</span>
                </span>
                
                {/* Elegant glow border */}
                <div className="absolute inset-0 rounded-full border border-green-500/30 group-hover:border-green-400/60 transition-colors duration-500 z-10" />
                
                {/* Beautiful Shimmer effect */}
                <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden pointer-events-none z-0">
                  <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-45 -translate-x-full group-hover:animate-shimmer" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {modal}

      <style>{`
        @keyframes draw-line { 
          0% { stroke-dashoffset: 2000; stroke-dasharray: 2000; opacity: 0; } 
          50% { opacity: 0.5; }
          100% { stroke-dashoffset: 0; stroke-dasharray: 2000; opacity: 0.1; } 
        }
        .animate-draw-line { animation: draw-line 15s linear infinite; }
        .animate-draw-line-slow { animation: draw-line 25s linear infinite reverse; }

        @keyframes float-pollen {
          0% { transform: translate(0, 0); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translate(100px, -100px); opacity: 0; }
        }
        .animate-float-pollen { animation: float-pollen 20s linear infinite; }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
        .animate-pulse-slow { animation: pulse-slow 10s ease-in-out infinite; }

        @keyframes shimmer { 
          0% { transform: translateX(-150%) skewX(-45deg); }
          100% { transform: translateX(250%) skewX(-45deg); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }

        @keyframes fadeIn { 
          from { opacity: 0; transform: scale(0.98); } 
          to { opacity: 1; transform: scale(1); } 
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </>
  );
}