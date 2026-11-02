import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, ArrowRight, Sparkles } from "lucide-react"
import authService from "../../services/authService"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")
    setLoading(true)

    try {
      const data = await authService.forgotPassword(email)
      setMessage(data.message || "Password reset OTP sent to your email.")
      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`)
      }, 900)
    } catch (err) {
      setError(err.response?.data?.message || "Unable to send OTP right now")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 bg-slate-950 text-slate-100 select-none">
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-6 space-y-1">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-black text-white tracking-wider">
              DXHUB<span className="text-amber-400">.</span>
            </h1>
          </Link>
          <p className="text-xs text-amber-400 font-extrabold tracking-wider uppercase">
            Electronics & Gadgets
          </p>
        </div>

        <div className="text-center mb-6 space-y-1">
          <h2 className="text-xl font-bold text-white">Forgot Password?</h2>
          <p className="text-xs text-slate-400">
            Enter your registered email address to receive a 6-digit verification OTP.
          </p>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Registered Email</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-600 transition shadow-lg shadow-amber-400/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Send Reset OTP</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Remember your password?{" "}
          <Link to="/login" className="text-amber-400 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
