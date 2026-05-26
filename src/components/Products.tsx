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
            {/* FIXED: Added navigate handler to the button */}
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
      <section id="products" className="relative py-24 px-6 bg-[#0b1f1a] overflow-hidden">
        
        {/* Living background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-150 h-150 bg-green-500/10 blur-[130px] rounded-full animate-pulse-slow" />
          <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 bg-emerald-600/10 blur-[110px] rounded-full animate-pulse-slow delay-1000" />
          
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000">
            <path d="M-100,200 C200,50 400,500 600,200 S900,50 1100,200" stroke="white" strokeWidth="0.5" fill="none" className="animate-draw-line" />
            <path d="M1100,800 C850,600 500,1000 200,800 S-100,600 -200,800" stroke="rgba(34,197,94,0.3)" strokeWidth="1" fill="none" className="animate-draw-line-slow" />
          </svg>

          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-green-400/40 rounded-full animate-float-pollen"
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
            <span className="text-[10px] tracking-[0.6em] uppercase text-amber-400 font-black block mb-4">Botanical Apothecary</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white">
              Nature's <span className="text-green-400 italic font-light">Pharmacy</span>
            </h2>
          </div>

          {/* Products grid */}
          <div className="grid md:grid-cols-3 gap-12 justify-items-center">
            {products.map((product) => (
              <div key={product.id} className="group w-full max-w-75 perspective-distant">
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="relative h-80 rounded-[40px] overflow-hidden cursor-pointer transition-all duration-700 ease-out transform-gpu transform-3d group-hover:transform-[rotateY(12deg)_rotateX(2deg)] group-hover:shadow-[rgba(34,197,94,0.2)_-20px_40px_50px_0px]"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                  <div className="absolute inset-2.5 rounded-4xl border border-white/10 bg-white/2 backdrop-blur-xs overflow-hidden transform-[translateZ(30px)]">
                    <div className="relative h-[60%] w-full overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale-30 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#0b1f1a] via-[#0b1f1a]/10 to-transparent" />
                    </div>

                    <div className="px-6 py-4">
                      <h3 className="text-xl font-serif text-white mb-0.5 group-hover:text-green-400 transition-colors">{product.title}</h3>
                      <p className="text-gray-500 text-[9px] tracking-[0.3em] uppercase mb-3">{product.category}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-white/90">{product.price}</p>
                        <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 opacity-0 group-hover:opacity-100 transition-all">
                          <span className="text-xs">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Browse button */}
          <div className="mt-20 text-center">
            <div className="relative inline-block group cursor-pointer">
              <button
                onClick={() => navigate("/shop")}
                className="relative px-12 py-5 bg-transparent border-none text-white font-black text-[11px] uppercase tracking-[0.2em] cursor-pointer z-10 transition-transform active:scale-95"
              >
                Browse Full Catalog
                <div className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-green-500/20 shadow-[inset_0_0_12px_rgba(74,222,128,0.4)] transition-all duration-300 group-hover:bg-green-500/40 group-hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]" />
                <div className="absolute inset-0 -z-10 rounded-full p-px" 
                  style={{
                    background: 'linear-gradient(180deg, rgba(134,239,172,0.4) 0%, rgba(134,239,172,0) 100%)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor'
                  }} 
                />
                <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden pointer-events-none">
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

        @keyframes shimmer { 100% { transform: translateX(200%); } }
        .animate-shimmer { animation: shimmer 2.5s infinite; }

        @keyframes fadeIn { 
          from { opacity: 0; transform: scale(0.98); } 
          to { opacity: 1; transform: scale(1); } 
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </>
  );
}
