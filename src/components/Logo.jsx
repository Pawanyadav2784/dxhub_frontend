import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to="/store" className="flex items-center gap-2.5 py-0.5 group select-none">
      <div className="w-10 h-10 rounded-full p-0.5 ring-2 ring-cyan-500/50 shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0 bg-white/10 overflow-hidden">
        <img
          src="/dxhub_logo_clean.png"
          alt="DXHUB Technology"
          className="w-full h-full object-contain rounded-full"
        />
      </div>
      <div className="leading-tight text-left">
        <h1 className="text-white text-base md:text-xl font-black tracking-wider relative inline-block">
          DXHUB
          <span className="absolute -top-1 -right-3 text-[8px] text-cyan-400">™</span>
        </h1>
        <p className="text-cyan-300 text-[9px] md:text-[10px] tracking-wider font-extrabold uppercase">
          Technology & Electronics
        </p>
      </div>
    </Link>
  )
}

export default Logo
