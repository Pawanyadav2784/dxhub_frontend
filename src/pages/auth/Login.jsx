import { useContext, useState } from "react"
import { Link, useNavigate, useSearchParams, Navigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Mail, Lock, Eye, EyeOff, Sparkles, LogIn, AlertCircle, ArrowRight, 
  ShieldCheck, Zap, Gem, CheckCircle2, ShoppingBag 
} from "lucide-react"
import { AuthContext } from "../../context/AuthContext"

const Login = () => {
  const { login, user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Redirect if already logged in
  if (user) return <Navigate to={redirectTo} replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await login(email, password)
    
    if (result.success) {
      navigate(redirectTo, { replace: true })
    } else {
      setError(result.message || "Invalid email or password.")
    }
    setLoading(false)
  }

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-slate-100/80 flex items-center justify-center p-3 md:p-6 overflow-hidden select-none">
      {/* Soft Ambient Background Lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-[120px] pointer-events-none" />
      
      {/* ── UNIFIED 3D SPLIT CARD (Fits on 1 Screen without scrolling) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.12)] overflow-hidden grid grid-cols-1 md:grid-cols-12"
      >
        {/* ── LEFT PANEL: Royal Sapphire Brand Showcase ─────────── */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-950 p-6 md:p-8 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
          {/* Glowing Ambient Light Inside Left Panel */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Brand Header */}
          <div className="space-y-4 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>DXHUB Premium</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
              Elevate Your Shopping <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Experience</span>
            </h2>
            <p className="text-xs text-blue-200/80 leading-relaxed">
              Access your personalized dashboard, manage express orders, and unlock member-exclusive deals.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-3 my-6 z-10">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Express Delivery</h4>
                <p className="text-[10px] text-blue-200/70">Pan India priority order shipping</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">100% Safe Checkout</h4>
                <p className="text-[10px] text-blue-200/70">Razorpay & COD payment options</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                <Gem className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Authentic Products</h4>
                <p className="text-[10px] text-blue-200/70">Certified electronics & jewelry</p>
              </div>
            </div>
          </div>

          {/* Left Footer Guarantee */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-blue-200/70 z-10">
            <span>© 2026 DXHUB Store</span>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3 h-3" /> Verified Secure
            </span>
          </div>
        </div>

        {/* ── RIGHT PANEL: Pristine Form Area ──────────────────── */}
        <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between bg-white">
          <div>
            {/* Header */}
            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold md:hidden mb-2">
                <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
                <span>DXHUB Store</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-xs md:text-sm text-slate-500">
                Sign in to manage your account and track your orders
              </p>
            </div>

            {/* Error Alert Box */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 📝 Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center justify-center text-xl hover:scale-125 transition-transform duration-200 cursor-pointer"
                    title={showPassword ? "Dekh liya password! 🐵" : "Shh... Secret Password! 🙈"}
                  >
                    {showPassword ? (
                      <span className="animate-bounce inline-block">🐵</span>
                    ) : (
                      <span className="hover:rotate-12 inline-block transition-transform">🙈</span>
                    )}
                  </button>
                </div>
              </div>

              {/* 🚀 Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition duration-300 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer mt-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Account</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* Footer Link */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              New to DXHUB?{" "}
              <Link to="/register" className="text-blue-600 font-extrabold hover:underline inline-flex items-center gap-1">
                Create Free Account <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
