import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Camera, ExternalLink, Sparkles } from "lucide-react"
import { FaInstagram } from "react-icons/fa"

const electronicsPosts = [
  { img: "/categories/mobiles.png", title: "Flagship Smartphones", tag: "#DXHUBMobiles" },
  { img: "/categories/smartwatch.png", title: "AMOLED Smartwatches", tag: "#SmartWearables" },
  { img: "/categories/audio.png", title: "Studio Wireless Audio", tag: "#ProSound" },
  { img: "/categories/speaker.png", title: "Luxury Speakers", tag: "#PartyVibes" },
  { img: "/categories/powerbank.png", title: "Fast Charging Powerbanks", tag: "#PowerOnTheGo" },
  { img: "/categories/chargers.png", title: "GaN Fast Wall Adapters", tag: "#FastCharge" },
  { img: "/categories/it.png", title: "RGB Mechanical Gear", tag: "#GamingSetup" },
  { img: "/categories/appliances.png", title: "4K Smart Home TV", tag: "#SmartLiving" },
]

const InstagramSection = () => {
  const instagramLink = "https://instagram.com/dxhub_official"
  const scrollRef = useRef(null)

  // Smooth Auto Infinity Scroll Effect
  useEffect(() => {
    const scrollContainer = scrollRef.current
    let animationFrameId
    let scrollAmount = 0

    const slide = () => {
      if (scrollContainer) {
        scrollAmount += 0.8
        scrollContainer.scrollLeft = scrollAmount

        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0
        }
      }
      animationFrameId = requestAnimationFrame(slide)
    }

    animationFrameId = requestAnimationFrame(slide)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  // Duplicate posts for infinite seamless loop
  const allPosts = [...electronicsPosts, ...electronicsPosts]

  return (
    <section className="py-16 md:py-20 bg-slate-950 text-white overflow-hidden relative border-t border-slate-800 select-none">
      {/* Background Lighting Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Heading */}
      <div className="relative z-10 text-center mb-12 px-4 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold shadow-md">
          <FaInstagram className="w-3.5 h-3.5 text-amber-400" />
          <span>@dxhub_official</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
          Follow <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">DXHUB Electronics</span> On Instagram
        </h2>

        <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto">
          Tag us in your unboxing reels & tech setups to get featured on our official store feed!
        </p>
      </div>

      {/* Infinity Slider Reel */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-hidden px-4 select-none scrollbar-hide py-2 relative z-10"
      >
        {allPosts.map((post, i) => (
          <a
            key={i}
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative min-w-[240px] md:min-w-[280px] h-[280px] md:h-[320px] rounded-3xl overflow-hidden group shadow-xl border border-slate-800 bg-slate-900 flex-shrink-0"
          >
            {/* Image */}
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out filter saturate-[1.1]"
            />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

            {/* Bottom Title Pill */}
            <div className="absolute bottom-3 left-3 right-3 text-white z-10 group-hover:opacity-0 transition-opacity duration-300">
              <span className="text-xs font-bold text-white bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-md inline-block">
                {post.title}
              </span>
            </div>

            {/* Hover Glass Overlay */}
            <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <FaInstagram className="w-6 h-6" />
              </div>

              <div>
                <span className="text-sm font-extrabold text-white block">
                  {post.title}
                </span>
                <span className="text-xs text-amber-300 font-semibold block mt-0.5">
                  {post.tag}
                </span>
              </div>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold border border-white/20">
                View Post <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Visit Instagram Button */}
      <div className="relative z-10 text-center mt-12">
        <a
          href={instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-extrabold text-sm shadow-xl shadow-amber-500/20 transition duration-300 hover:scale-105 cursor-pointer"
        >
          <FaInstagram className="w-4 h-4" />
          <span>Visit Official Instagram Feed</span>
        </a>
      </div>
    </section>
  )
}

export default InstagramSection