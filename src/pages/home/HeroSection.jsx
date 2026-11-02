import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <div className="relative h-[520px] bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 bg-cover bg-center flex items-center justify-center overflow-hidden">
      {/* Background overlay image */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600')] bg-cover bg-center opacity-25 mix-blend-overlay"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white max-w-3xl px-6"
      >
        <span className="inline-block bg-blue-600/80 text-yellow-300 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest border border-blue-400/30">
          Smart Electronics & Tech Gadgets
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
          Next-Gen Electronics at <span className="text-yellow-400">Unbeatable Prices</span>
        </h1>

        <p className="text-gray-300 text-base md:text-lg mb-8 max-w-xl mx-auto">
          Explore smartphones, bluetooth speakers, TWS earbuds, smartwatches, home appliances & IT accessories.
        </p>

        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate('/shop')}
            className="bg-yellow-400 text-gray-900 font-bold px-8 py-3.5 rounded-xl hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-400/20"
          >
            Explore All Products
          </button>
          <button 
            onClick={() => navigate('/shop?category=Mobiles')}
            className="bg-blue-600/80 hover:bg-blue-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-all border border-blue-400/40"
          >
            Shop Mobiles
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default HeroSection