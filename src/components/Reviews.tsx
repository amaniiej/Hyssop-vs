import { FaStar } from "react-icons/fa";

export default function Reviews() {
  const testimonials = [
    { name: "Mekdes", herb: "Agrimony Herb", text: "The Agrimony infusion has been a game-changer for my digestion. I feel lighter and more balanced." },
    { name: "Yared", herb: "Artemisia Abyssinica", text: "Incredible quality. The Artemisia has a profound energy that cleared my paths like nothing else." },
    { name: "Dawit", herb: "Ashwagandha", text: "Finally, a natural way to manage stress. This Ashwagandha is pure potency. My sleep has doubled." },
    { name: "Mena", herb: "Calendula Flower", text: "These flowers make the most soothing oil. It’s like a warm, healing hug from nature itself." },
    { name: "Senite", herb: "Blood Purifier Blend", text: "I noticed a difference in my skin clarity within two weeks. Truly healing from the inside out." },
    { name: "Mahder", herb: "Castor Oil", text: "Liquid gold. My hair feels thicker and my skin is glowing. Exceptional cold-pressed purity." },
    { name: "Abeba", herb: "Chasteberry", text: "A sacred gift for women's wellness. For the first time in years, my cycle feels regulated." },
    { name: "Mentesnot", herb: "Colon Cleanser", text: "Gentle yet effective. It helped me reset my system after months of feeling sluggish. A must-have." }
  ];

  // Logic for the Aligned Grid of 15 Logos
  const logoGrid = [
    { t: '5%', l: '10%' }, { t: '5%', l: '50%' }, { t: '5%', l: '90%' },
    { t: '25%', l: '30%' }, { t: '45%', l: '90%' },
    { t: '85%', l: '10%' }, { t: '85%', l: '50%' }, { t: '85%', l: '90%' },
    { t: '15%', l: '90%' }, { t: '75%', l: '5%' }
  ];

  const scrollItems = [...testimonials, ...testimonials];

  return (
    <section id="reviews" className="relative py-24 bg-[#f5f0eb] overflow-hidden">
      
      {/* ── 15 LOGO WATERMARKS (ALIGNED FLOW) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.25]">
        {logoGrid.map((pos, i) => (
          <img 
            key={i}
            src="/images/hysspo-bg-preview.png" 
            className="absolute select-none"
            style={{ 
              top: pos.t, 
              left: pos.l, 
              width: '150px',
              transform: 'translate(60%, -40%) rotate(-15deg)' 
            }}
            alt="" 
          />
        ))}
      </div>

      {/* ── GREEN-YELLOWY SMOOTH BACKDROP (Starts 15% from top, stops 15% from bottom) ── */}
      <div 
        className="absolute top-[15%] bottom-[15%] left-0 right-0 z-0 pointer-events-none overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #dbe8cb 0%, #f1f4d8 50%, #d4e4cd 100%)", // Rich, smooth green-yellowy-green mix
        }}
      >
        {/* Soft edge fades so there are no sharp cuts at the 15% boundaries */}
        <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-[#f5f0eb] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#f5f0eb] to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 px-6">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-0.5 w-8 bg-amber-500" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-amber-500 font-black">Sacred Testimonials</span>
            <div className="h-0.5 w-8 bg-amber-500" />
          </div>
          <h3 className="text-4xl md:text-5xl font-serif text-[#0b1f1a]">
            Witnessed <span className="italic text-green-400 font-light">Benefits</span>
          </h3>
        </div>

        {/* --- MARQUEE WITH YOUR ORIGINAL CARDS --- */}
        <div className="cards-container relative flex overflow-hidden">
          <div className="flex animate-marquee py-12 px-4 hover-parent">
            {scrollItems.map((review, idx) => (
              <div key={idx} className="card relative shrink-0 mx-6">
                <div className="card-content flex flex-col justify-between p-8">
                  <div>
                    <div className="flex gap-1 mb-4 text-amber-400 text-[10px]">
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </div>
                    <p className="tip italic font-serif text-[#0b1f1a] leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 font-bold text-xs">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="second-text font-bold text-[#0b1f1a] text-sm">{review.name}</p>
                      <p className="second-text text-green-400/60 uppercase tracking-widest text-[9px] font-black">{review.herb}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient Fades for Smoothness */}
          <div className="absolute top-0 left-0 w-40 h-full bg-linear-to-r from-[#f5f0eb] to-transparent z-20" />
          <div className="absolute top-0 right-0 w-40 h-full bg-linear-to-l from-[#f5f0eb] to-transparent z-20" />
        </div>
      </div>

      <style>{`
        /* --- YOUR ORIGINAL UNTOUCHED UIVERSE STYLE --- */
        .card {
          width: 380px;
          height: 240px;
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(34, 197, 94, 0.15);
          border-radius: 24px;
          backdrop-filter: blur(30px);
          transition: 400ms;
          cursor: pointer;
        }

        .card::before {
          content: "";
          position: absolute;
          border-radius: 50%;
          width: 8rem;
          height: 8rem;
          top: -10%;
          left: -10%;
          background-color: rgba(34, 197, 94, 0.1);
          filter: blur(40px);
          z-index: -1;
          transition: 500ms;
        }

        .card::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          width: 6rem;
          height: 6rem;
          bottom: -5%;
          right: -5%;
          background-color: rgba(245, 158, 11, 0.08);
          filter: blur(40px);
          z-index: -1;
          transition: 500ms;
        }

        /* Hover Effect for individual card */
        .card:hover {
          transform: scale(1.05);
          border-color: rgba(34, 197, 94, 0.4);
          background-color: rgba(255, 255, 255, 0.05);
        }
        
        .card:hover::before {
          background-color: rgba(34, 197, 94, 0.2);
          transform: scale(1.2);
        }

        /* The "Dope" Sibling Blur Logic */
        .hover-parent:hover .card:not(:hover) {
          filter: blur(6px);
          transform: scale(0.92);
          opacity: 0.5;
        }

        /* --- SMOOTH MARQUEE --- */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }

        .card-content {
          height: 100%;
          width: 100%;
        }
      `}</style>
    </section>
  );
}