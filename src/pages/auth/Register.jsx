import { useContext, useState } from "react"
import { Link, useNavigate, Navigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, Mail, Lock, Phone, ShoppingBag, Store, MapPin, 
  ArrowRight, ShieldCheck, Sparkles, UserPlus, AlertCircle, Zap, Gem, CheckCircle2 
} from "lucide-react"
import { AuthContext } from "../../context/AuthContext"

const Register = () => {
  const { register, user } = useContext(AuthContext)
  const navigate = useNavigate()

  if (user) return <Navigate to="/" replace />

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'customer',
    shopName: '',
    shopDescription: '',
    masterPin: '',
    street: '',
    city: '',
    state: '',
    postalCode: ''
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (formData.role === 'vendor' && formData.masterPin !== '92116511') {
      setError("Invalid Vendor Master Security PIN! Only authorized sellers can register.")
      return
    }

    setLoading(true)

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      phone: formData.phone,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: 'India'
      }
    }

    if (formData.role === 'vendor') {
      userData.shopName = formData.shopName
      userData.shopDescription = formData.shopDescription
      userData.masterPin = formData.masterPin
    }

    const result = await register(userData)
    
    if (result.success) {
      navigate('/')
    } else {
      setError(result.message || "Registration failed. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-slate-100/80 flex items-center justify-center p-3 md:p-6 overflow-hidden select-none py-4">
      {/* Soft Ambient Background Lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-[120px] pointer-events-none" />
      
      {/* ── UNIFIED 3D SPLIT CARD (Identical theme to Login.jsx) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.12)] overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[92vh]"
      >
        {/* ── LEFT PANEL: Royal Sapphire Brand Showcase ─────────── */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-950 p-6 md:p-8 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Brand Header */}
          <div className="space-y-4 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>DXHUB Registration</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
              Start Shopping & Selling <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Today</span>
            </h2>
            <p className="text-xs text-blue-200/80 leading-relaxed">
              Create an account to track shipments, save wishlist items, or launch your own seller shop.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-3 my-4 z-10">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Customer Account</h4>
                <p className="text-[10px] text-blue-200/70">Shop electronics & jewelry effortlessly</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Vendor Portal</h4>
                <p className="text-[10px] text-blue-200/70">Sell products pan-India with 0 hassle</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Instant Activation</h4>
                <p className="text-[10px] text-blue-200/70">Immediate access upon signup</p>
              </div>
            </div>
          </div>

          {/* Footer Guarantee */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-blue-200/70 z-10">
            <span>© 2026 DXHUB Store</span>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3 h-3" /> Guaranteed Privacy
            </span>
          </div>
        </div>

        {/* ── RIGHT PANEL: Pristine Form Area ──────────────────── */}
        <div className="md:col-span-7 p-5 md:p-7 flex flex-col justify-between bg-white overflow-y-auto scrollbar-hide">
          <div>
            {/* Header */}
            <div className="mb-4 space-y-1">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Create Account
              </h1>
              <p className="text-xs text-slate-500">
                Select account type and fill in your details below
              </p>
            </div>

            {/* Error Box */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              
              {/* Account Type Selector Chips */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  I want to:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'customer' })}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      formData.role === 'customer'
                        ? "bg-blue-600 border-blue-600 text-white shadow-md"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Shop as Customer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'vendor' })}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      formData.role === 'vendor'
                        ? "bg-amber-500 border-amber-500 text-white shadow-md"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Sell as Vendor</span>
                  </button>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Rahul Sharma"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center justify-center text-lg hover:scale-125 transition-transform duration-200 cursor-pointer"
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

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center justify-center text-lg hover:scale-125 transition-transform duration-200 cursor-pointer"
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
              </div>

              {/* Vendor Specific Details */}
              {formData.role === 'vendor' && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
                  <input
                    type="text"
                    name="shopName"
                    required
                    value={formData.shopName}
                    onChange={handleChange}
                    placeholder="Shop / Business Name *"
                    className="w-full px-3 py-2 rounded-lg border border-amber-300 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <textarea
                    name="shopDescription"
                    rows="2"
                    value={formData.shopDescription}
                    onChange={handleChange}
                    placeholder="Brief Shop Description..."
                    className="w-full px-3 py-2 rounded-lg border border-amber-300 bg-white text-xs resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div className="relative">
                    <input
                      type="password"
                      name="masterPin"
                      required
                      value={formData.masterPin}
                      onChange={handleChange}
                      placeholder="Vendor Master Security PIN *"
                      className="w-full px-3 py-2 rounded-lg border border-amber-400 bg-white text-xs text-amber-900 font-bold placeholder-amber-600/70 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span>Security Key</span> 🔑
                    </div>
                  </div>
                  <p className="text-[10px] text-amber-800 font-semibold leading-tight pt-0.5">
                    🔒 Vendor registration is protected. Enter master security pin to authorize account creation.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-1.5 transition cursor-pointer mt-2"
              >
                {loading ? "Creating Account..." : "Complete Registration"}
              </motion.button>
            </form>
          </div>

          {/* Footer Link */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-extrabold hover:underline">
                Sign In Here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
