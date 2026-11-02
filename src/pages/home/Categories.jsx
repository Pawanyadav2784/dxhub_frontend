import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowUpRight, Sparkles, Zap, Flame, Star } from "lucide-react"
import { CATEGORIES_DATA } from "../../utils/categoryData"

// Reliable high-res backup images
const FALLBACK_IMAGES = {
  mobiles: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80",
  speaker: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
  audio: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  "chargers-and-adaptors": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80",
  "data-cable": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=800&q=80",
  "power-bank": "https://images.unsplash.com/photo-1609592424074-8d4a66a1a1f0?w=800&q=80",
  "smart-watch": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  "mobile-accessories": "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&q=80",
  "home-appliances": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
  "it-accessories": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
  "office-supply": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80"
}

// Separate Categories into 3 Rows:
// Row 1 (3 items): Mobiles, Speaker, Audio
// Row 2 (4 items): Chargers & Adaptors, Data Cable, Power Bank, Smart Watch
// Row 3 (4 items): Mobile Accessories, Home Appliances, IT Accessories, Office Supply
const row1Categories = CATEGORIES_DATA.slice(0, 3)
const row2Categories = CATEGORIES_DATA.slice(3, 7)
const row3Categories = CATEGORIES_DATA.slice(7, 11)

const Category3DCard = ({ item, heightClass = "h-64", isHero = false }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/shop?category=${encodeURIComponent(item.name)}`)
  }

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGES[item.id] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
  }

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`group relative ${heightClass} rounded-3xl overflow-hidden cursor-pointer shadow-[0_15px_35px_rgba(15,23,42,0.1)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.22)] border border-slate-200/80 bg-slate-900 transition-all duration-500`}
    >
      {/* Background Image */}
      <img
        src={item.image}
        alt={item.name}
        onError={handleImageError}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter saturate-[1.15]"
      />

      {/* 3D Vignette Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-transparent pointer-events-none" />

      {/* Top Floating Badge */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
        {isHero ? (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold tracking-wider uppercase shadow-lg">
            <Flame className="w-3 h-3 fill-current" /> TOP CATEGORY
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/20 text-blue-300 text-[10px] font-bold">
            <Sparkles className="w-3 h-3 text-amber-400" /> ESSENTIALS
          </span>
        )}

        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 shadow-md">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Bottom Content & Subcategories */}
      <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-2">
        <div>
          <h3 className={`${isHero ? "text-2xl md:text-3xl" : "text-xl"} font-black tracking-tight text-white drop-shadow-md group-hover:text-amber-300 transition-colors`}>
            {item.name}
          </h3>
        </div>

        {/* Subcategories Glass Chips (Hidden on mobile for Row 2 & 3, visible on desktop) */}
        <div className={`gap-1.5 pt-1 ${isHero ? 'flex flex-wrap' : 'hidden md:flex md:flex-wrap'}`}>
          {item.subcategories.slice(0, isHero ? 4 : 3).map((sub, sIdx) => (
            <span
              key={sIdx}
              className="text-[10px] bg-white/15 backdrop-blur-md text-amber-200 border border-white/10 px-2.5 py-0.5 rounded-full font-semibold shadow-sm"
            >
              {sub}
            </span>
          ))}
          {item.subcategories.length > (isHero ? 4 : 3) && (
            <span className="text-[10px] bg-white/10 backdrop-blur-md text-slate-300 border border-white/10 px-2 py-0.5 rounded-full font-medium">
              +{item.subcategories.length - (isHero ? 4 : 3)} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const Categories = () => {
  return (
    <div className="py-8 md:py-20 px-3 md:px-8 bg-slate-50/70 border-y border-slate-200/60 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-1.5 md:space-y-2 mb-6 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-[11px] md:text-xs font-bold">
            <Zap className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-500 fill-amber-500" /> Explore Collections
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Shop By Electronics Categories
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-xs md:text-sm">
            Discover smartphones, audio gear, smart watches, accessories & home appliances with guaranteed authentic quality.
          </p>
        </div>

        {/* ── ROW 1: 3 BOXES (Mobiles, Speaker, Audio) ───────────────────── */}
        <div className="mb-4 md:mb-6">
          <div className="flex items-center gap-2 text-[11px] md:text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 md:mb-3 px-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Featured Electronics (Row 1)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 md:gap-6">
            {row1Categories.map((item) => (
              <Category3DCard key={item.id} item={item} heightClass="h-52 sm:h-72 md:h-80" isHero={true} />
            ))}
          </div>
        </div>

        {/* ── ROW 2: 4 BOXES (Chargers, Data Cable, Power Bank, Smart Watch) ── */}
        <div className="mb-4 md:mb-6">
          <div className="flex items-center gap-2 text-[11px] md:text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 md:mb-3 px-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Power & Wearables (Row 2)
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {row2Categories.map((item) => (
              <Category3DCard key={item.id} item={item} heightClass="h-44 sm:h-56 md:h-64" isHero={false} />
            ))}
          </div>
        </div>

        {/* ── ROW 3: 4 BOXES (Accessories, Appliances, IT, Office) ─────────── */}
        <div>
          <div className="flex items-center gap-2 text-[11px] md:text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 md:mb-3 px-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Tech & Home Essentials (Row 3)
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {row3Categories.map((item) => (
              <Category3DCard key={item.id} item={item} heightClass="h-44 sm:h-56 md:h-64" isHero={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories