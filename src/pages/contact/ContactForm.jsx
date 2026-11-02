import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Sparkles, HelpCircle, ShoppingBag, Gem, Handshake } from "lucide-react"
import api from "../../services/api"
import { ENDPOINTS } from "../../utils/endpoints"

const categories = [
  { id: "general", label: "General Query", icon: HelpCircle },
  { id: "orders", label: "Orders & Shipping", icon: ShoppingBag },
  { id: "custom", label: "Custom Jewelry", icon: Gem },
  { id: "partnership", label: "Vendor Partnership", icon: Handshake },
]

const ContactForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("general")
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errorMsg) setErrorMsg("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setErrorMsg("")

    try {
      const payload = {
        ...form,
        subject: `[${categories.find(c => c.id === selectedCategory)?.label || 'General'}] Inquiry`
      }
      await api.post(ENDPOINTS.CONTACT, payload)
      setSubmitted(true)
      setForm({ name: "", email: "", phone: "", message: "" })
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Unable to send your message right now. Please try again or call us.")
    } finally {
      setSending(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full relative"
    >
      {/* Background Decorative Glow */}
      <div className="absolute -top-6 -right-6 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main 3D Container */}
      <div className="relative bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.08)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)] transition-shadow duration-500">
        
        {/* Header */}
        <div className="mb-6 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Instant Dispatch
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Leave a Message
          </h2>
          <p className="text-xs md:text-sm text-slate-500">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        {/* Category Pills */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Select Inquiry Type
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isSelected = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? "bg-slate-900 text-amber-400 shadow-md scale-[1.02] border border-slate-800"
                      : "bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 border border-transparent"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-amber-400" : "text-slate-400"}`} />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Success Modal / State */}
        <AnimatePresence>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-10 text-center space-y-4"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Message Delivered!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. A confirmation has been logged and our team is currently processing your inquiry.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition duration-200 shadow-lg"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (Optional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <span className="text-xs font-bold">+91</span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message</label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    rows="4"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more about your query..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all duration-200 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={sending}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition duration-300 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
              >
                {sending ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Sending Your Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Priority Message</span>
                  </>
                )}
              </motion.button>
            </form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default ContactForm
