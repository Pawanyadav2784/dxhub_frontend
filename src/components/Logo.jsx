import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 py-0.5 group select-none">
      <div className="bg-white px-2.5 py-1 rounded-xl shadow-md border border-white/50 group-hover:scale-105 transition-transform duration-200 shrink-0">
        <img
          src="/logo.jpg"
          alt="DXHUB"
          className="h-7 sm:h-8 md:h-9 w-auto object-contain"
        />
      </div>
      <div className="leading-tight">
        <h1 className="text-white text-base md:text-xl font-black tracking-wider relative inline-block">
          DXHUB
          <span className="absolute -top-1 -right-3 text-[8px] text-amber-300">™</span>
        </h1>
        <p className="text-amber-300 text-[9px] md:text-[10px] tracking-wider font-extrabold uppercase">
          Electronics & Gadgets
        </p>
      </div>
    </Link>
  )
}

export default Logo
