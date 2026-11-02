import { motion as Motion } from "framer-motion";
import { ShoppingCart, Sparkles, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Flagship Mobiles & Smart Tech",
    subtitle: "Experience High-Speed Performance & AI Cameras",
    image: "/categories/mobiles.png",
    category: "Mobiles",
    badge: "⚡ NEW LAUNCH SALE"
  },
  {
    title: "Party Speakers & Soundbars",
    subtitle: "Deep Bass, Bluetooth 5.3 & Home Theatre Audio",
    image: "/categories/speaker.png",
    category: "Speaker",
    badge: "🔥 TOP SELLER AUDIO"
  },
  {
    title: "Smartwatches & Accessories",
    subtitle: "HD Display, Bluetooth Calling & Health Tracking",
    image: "/categories/smartwatch.png",
    category: "Smart Watch",
    badge: "💎 PREMIUM WEARABLES"
  },
  {
    title: "Pro Audio & ANC Earbuds",
    subtitle: "Studio Fidelity, Active Noise Cancellation & 40H Playtime",
    image: "/categories/audio.png",
    category: "Audio",
    badge: "✨ HIGH FIDELITY"
  }
];

const PromoBanner = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [typedText, setTypedText] = useState("");

  // Auto slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Typing Effect
  useEffect(() => {
    let i = 0;
    const text = slides[current].title;
    setTypedText("");

    const typing = setInterval(() => {
      setTypedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(typing);
    }, 40);

    return () => clearInterval(typing);
  }, [current]);

  return (
    <section
      className="relative isolate min-h-[370px] sm:min-h-[430px] md:min-h-[520px] overflow-hidden bg-slate-950 border-b border-slate-800 select-none"
      aria-label="Featured Electronics Banners"
    >
      {/* Background Lighting Glows */}
      <div className="absolute top-0 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-blue-600/25 rounded-full blur-[100px] md:blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-amber-500/20 rounded-full blur-[100px] md:blur-[130px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] pointer-events-none" />

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-900/80" />

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 mx-auto flex flex-col md:flex-row h-full w-full max-w-7xl items-center justify-between px-3 sm:px-6 py-3.5 md:py-16 text-white min-h-[370px] sm:min-h-[430px] md:min-h-[520px] gap-2 md:gap-8">
        
        {/* LEFT TEXT CONTENT */}
        <div className="z-10 w-full max-w-2xl text-center md:text-left space-y-1 md:space-y-4">
          <Motion.span
            key={slides[current].badge}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1 bg-blue-600/20 border border-blue-400/30 text-amber-300 text-[9px] md:text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md"
          >
            <Sparkles className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-amber-400" />
            <span>{slides[current].badge}</span>
          </Motion.span>

          <h1 className="text-lg sm:text-3xl md:text-6xl font-black leading-tight tracking-tight text-white min-h-[30px] sm:min-h-[60px] md:min-h-[120px] flex items-center justify-center md:justify-start">
            <span>
              {typedText}
              <span className="animate-pulse text-amber-400">|</span>
            </span>
          </h1>

          <Motion.p
            key={slides[current].subtitle}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-slate-300 text-[11px] sm:text-base md:text-lg max-w-xl font-normal leading-tight line-clamp-1 md:line-clamp-none"
          >
            {slides[current].subtitle}
          </Motion.p>

          {/* MOBILE NATIVE APP FULL LARGER IMAGE SHOWCASE (< md) */}
          <div className="block md:hidden py-1">
            <Motion.div
              key={`mobile-img-${current}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[360px] h-52 sm:h-60 mx-auto relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-xl bg-slate-900"
            >
              <img
                src={slides[current].image}
                alt={slides[current].title}
                className="w-full h-full object-cover filter saturate-[1.15]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 flex items-center justify-between text-xs text-amber-300 font-extrabold shadow-md">
                <span>{slides[current].category}</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Original DSLR
                </span>
              </div>
            </Motion.div>
          </div>

          {/* SIDE-BY-SIDE (LEFT-RIGHT) BUTTON ACTIONS ON MOBILE */}
          <div className="grid grid-cols-2 gap-2 pt-1 md:pt-4 md:flex md:flex-row md:justify-start w-full max-w-[360px] md:max-w-none mx-auto md:mx-0">
            <button
              onClick={() => navigate(`/shop?category=${encodeURIComponent(slides[current].category)}`)}
              className="rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-600 px-2.5 md:px-7 py-2 md:py-3.5 text-xs md:text-sm font-extrabold text-slate-950 transition-all shadow-lg shadow-amber-400/20 cursor-pointer flex items-center justify-center gap-1"
            >
              <span className="truncate">Shop {slides[current].category}</span>
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
            </button>

            <button
              onClick={() => navigate('/shop')}
              className="flex items-center justify-center gap-1 rounded-xl bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md px-2.5 md:px-6 py-2 md:py-3.5 text-xs md:text-sm font-bold text-white transition border border-slate-700 cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
              <span className="truncate">Explore All</span>
            </button>
          </div>
        </div>

        {/* DESKTOP RIGHT AI DSLR IMAGE SHOWCASE (>= md) */}
        <Motion.div
          key={slides[current].image}
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block w-[420px] h-[340px] relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-slate-900 group shrink-0"
        >
          {/* AI Generated High-Res DSLR Image */}
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover filter saturate-[1.15] group-hover:scale-105 transition-transform duration-700"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Glass Category Badge Overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center justify-between text-white shadow-lg">
            <div>
              <span className="text-xs font-bold text-amber-300 block">{slides[current].category} Collection</span>
              <span className="text-[10px] text-slate-400">DSLR Studio Photography Asset</span>
            </div>
            <span className="text-xs font-extrabold text-blue-400 bg-blue-500/20 px-2.5 py-1 rounded-full border border-blue-400/30">
              100% Authentic
            </span>
          </div>
        </Motion.div>
      </div>

      {/* DOTS NAVIGATION */}
      <div className="absolute bottom-1.5 md:bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 md:gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`h-1.5 md:h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
              i === current ? "bg-amber-400 w-5 md:w-8" : "bg-slate-600 w-1.5 md:w-2.5 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default PromoBanner;

