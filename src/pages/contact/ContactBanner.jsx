import { motion } from "framer-motion"
import { Headphones, Sparkles, ShieldCheck, Zap, MessageCircle } from "lucide-react"

const ContactBanner = () => {
  return (
    <div className="relative w-full min-h-[340px] md:min-h-[380px] bg-slate-950 flex items-center justify-center overflow-hidden py-12 px-4 select-none">
      {/* 3D Background Lighting & Glowing Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950" />

      {/* Animated Glowing Spheres */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [-20, 20, -20],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-100px] left-1/4 w-[350px] h-[350px] bg-blue-600/30 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          y: [-20, 20, -20],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-100px] right-1/4 w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Modern Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Floating 3D Graphic Cards / Decorative Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center"
      >
        {/* Top Floating Glass Badge */}
        <motion.div
          whileHover={{ scale: 1.05, rotateZ: -1 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-xs md:text-sm font-medium text-blue-200 mb-6 cursor-pointer"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-white font-semibold">24/7 Live Support</span>
          <span className="text-blue-300/60">•</span>
          <span className="text-amber-300 flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5" /> Instant Response
          </span>
        </motion.div>

        {/* Main 3D Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
        >
          Let's Build Something{" "}
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_10px_10px_rgba(245,158,11,0.2)]">
            Extraordinary
          </span>{" "}
          Together
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base md:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed"
        >
          Have questions about your orders, products, or custom queries? Reach out to our dedicated team for rapid, priority assistance.
        </motion.p>

        {/* Quick Feature Chips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-6"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-xs md:text-sm font-medium backdrop-blur-sm">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Fast Response Rate</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-xs md:text-sm font-medium backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified Support</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-xs md:text-sm font-medium backdrop-blur-sm">
            <Headphones className="w-4 h-4 text-blue-400" />
            <span>Dedicated Assistance</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ContactBanner