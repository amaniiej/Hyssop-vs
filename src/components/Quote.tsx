export default function Quote() {
  return (
    <section id="quote" className="relative pt-32 pb-10 px-0 overflow-hidden bg-[#f0f4f1]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
          .curly-font { font-family: 'Dancing Script', cursive; }
          @keyframes drift {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(10px, -10px) rotate(2deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
          .animate-drift { animation: drift 10s ease-in-out infinite; }
        `}
      </style>
      
      {/* Decorative Lines - Darkened to Forest Green for Sage Mist background */}
      <svg className="absolute top-0 left-0 w-100 h-auto opacity-10 pointer-events-none animate-drift" viewBox="0 0 400 400" fill="none">
        <path d="M-50 100C50 150 150 50 250 120C350 190 400 300 500 250" stroke="#0b1f1a" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M-60 120C60 180 180 80 280 150C380 220 420 350 520 300" stroke="#0b1f1a" strokeWidth="0.5" />
      </svg>

      <div className="relative z-10 w-full max-w-none text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-8 bg-green-800/30" />
          <span className="text-xs tracking-[0.4em] uppercase text-green-800 font-bold">The Hyssop Way</span>
          <div className="h-px w-8 bg-green-800/30" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight text-[#0b1f1a] font-bold">
          A Sacred Return <span className="italic font-light opacity-70 text-2xl">to Wellness</span>
        </h2>

        <div className="relative w-full transition-transform px-6 md:px-12">
          <p className="curly-font text-xl md:text-4xl text-[#0b1f1a] font-bold leading-relaxed w-full text-center tracking-wide">
            "The Journey to Wellness is a cycle of transformation where we remember 
            what we have always known to be true: <span className="text-green-700">we know how to heal ourselves</span>, 
            plants and food are sacred remedies, and deep nourishment supports us to 
            be the fullest version of ourselves."
          </p>
        </div>
      </div>
    </section>
  );
}