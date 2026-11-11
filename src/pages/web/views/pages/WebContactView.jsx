/**
 * WebContactView.jsx - [VIEW PAGE]
 * Harmonized Light Daylight Aurora Split-Studio Contact Page matching the Home Design System.
 * Features:
 * - Seamless daylight gradient backdrop (from-[#f2f7ff] via-[#f9fbff] to-[#fafbfd]) with drifting pastel orbs
 * - Left Panel: Soft Light Pastel Sapphire & Ice-Blue Info Card with pulsing online indicator,
 *   1-click WhatsApp action, direct phone/email/Noida office channels & quick copy buttons
 * - Right Panel: Crisp elevated pure-white Inquiry Studio with animated layoutId topic selector pills
 *   and auto-shining Submit CTA
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Lock,
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';
import { ContactController } from '../../controllers/ContactController';

const INQUIRY_TOPICS = [
  'Web & Mobile Apps (IT)',
  'Cloud & DevOps (IT)',
  'Sentinel DPC Security (IT)',
  'Smart Wholesale (Non-IT)'
];

const WebContactView = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web & Mobile Apps (IT)',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState('');
  const [alert, setAlert] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopy = (value, field) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', text: '' });

    const res = await ContactController.submitProjectInquiry(formData);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      setAlert({ type: 'success', text: res.message });
    } else {
      setAlert({ type: 'error', text: res.error });
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Web & Mobile Apps (IT)',
      message: ''
    });
    setSubmitted(false);
    setAlert({ type: '', text: '' });
  };

  return (
    <div className="relative bg-gradient-to-b from-[#f2f7ff] via-[#f9fbff] to-[#fafbfd] min-h-[calc(100vh-76px)] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 select-none overflow-hidden">
      {/* Drifting Light Pastel Aurora Orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none -top-24 left-[15%] w-[30rem] h-[30rem] rounded-full bg-sky-200/35 blur-3xl absolute"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none bottom-0 right-[10%] w-[26rem] h-[26rem] rounded-full bg-indigo-200/30 blur-3xl absolute"
      />

      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        {/* Clean Editorial Title Matching Home Gradient Typography */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200/80">
            GET IN TOUCH
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Let’s Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
              Great Together
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Have an upcoming software product, cloud architecture requirement, or wholesale supply inquiry? Reach out directly below.
          </p>
        </motion.div>

        {/* Unified Light Executive Split Studio Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[28px] bg-white border border-blue-100/90 shadow-[0_26px_65px_-16px_rgba(37,99,235,0.14)] p-2.5 sm:p-3.5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch"
        >
          {/* ── LEFT PANEL (5 Cols): LIGHT PASTEL SAPPHIRE CONTACT STUDIO ── */}
          <div className="lg:col-span-5 rounded-[22px] bg-gradient-to-br from-[#eff6ff] via-[#f5f9ff] to-[#eef2ff] border border-blue-200/75 text-slate-900 p-7 sm:p-8 flex flex-col justify-between space-y-8 relative overflow-hidden text-left">
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-700 bg-white/95 px-3 py-1 rounded-full border border-emerald-200/80 shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Desk Online · &lt; 2h Reply SLA</span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Contact Information
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-normal">
                  Connect directly with our Noida engineering &amp; distribution hub for instant assistance.
                </p>
              </div>

              {/* Direct 1-Click WhatsApp Card */}
              <a
                href="https://wa.me/919211651100?text=Hi%20DXHUB%20Team%2C%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-emerald-200 hover:border-emerald-400 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.549 1.768.809 2.796.809 3.181 0 5.767-2.586 5.767-5.766.001-3.182-2.585-5.796-5.767-5.796zm3.377 8.163c-.144.405-.837.774-1.17.825-.311.047-.704.072-2.18-.541-1.89-1.042-3.11-2.973-3.204-3.1-.095-.127-.768-1.022-.768-1.95 0-.928.486-1.385.66-1.575.174-.19.38-.238.507-.238.127 0 .254.001.365.006.118.005.277-.044.434.333.162.388.554 1.349.602 1.447.048.098.08.214.016.342-.064.127-.096.206-.19.317-.095.111-.2.248-.286.333-.095.095-.195.199-.084.389.111.19.493.813 1.057 1.316.726.647 1.338.848 1.528.943.19.095.301.079.412-.048.111-.127.476-.555.602-.745.127-.19.254-.159.428-.095.174.064 1.109.523 1.3.618.19.095.317.143.365.222.048.079.048.459-.096.864zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.307A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.154c-1.61 0-3.113-.487-4.368-1.325l-.313-.21-2.955.775.788-2.88-.228-.363A8.113 8.113 0 013.846 12c0-4.496 3.658-8.154 8.154-8.154s8.154 3.658 8.154 8.154-3.658 8.154-8.154 8.154z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      Chat on WhatsApp
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">+91 92116 51100 • Instant Reply</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Direct Contact Channels with Quick Copy */}
              <div className="space-y-3 pt-1 text-sm">
                <div className="flex items-center justify-between gap-3 bg-white/95 rounded-2xl p-3.5 border border-slate-200/80 hover:border-blue-300 transition-colors">
                  <a href="tel:+919211651100" className="flex items-center gap-3 text-slate-800 hover:text-blue-700 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Direct Line</p>
                      <p className="font-extrabold text-sm text-slate-900">+91 92116 51100</p>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy('+919211651100', 'phone')}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-700 border border-slate-200/75 transition-colors cursor-pointer"
                    title="Copy Phone Number"
                  >
                    {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3 bg-white/95 rounded-2xl p-3.5 border border-slate-200/80 hover:border-blue-300 transition-colors">
                  <a href="mailto:business@dxhub.in" className="flex items-center gap-3 text-slate-800 hover:text-blue-700 transition-colors min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Email Desk</p>
                      <p className="font-extrabold text-sm text-slate-900 truncate">business@dxhub.in</p>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy('business@dxhub.in', 'email')}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-700 border border-slate-200/75 transition-colors cursor-pointer shrink-0"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-start gap-3 bg-white/95 rounded-2xl p-3.5 border border-slate-200/80">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Head Office</p>
                    <p className="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed mt-0.5">
                      Sector 62, Electronic City, Noida, Uttar Pradesh - 201309
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-5 border-t border-blue-200/60 grid grid-cols-2 gap-3 text-[11px] text-slate-600 font-bold">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>NDA Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Mon - Sat: 9:30 - 7:30</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL (7 Cols): CLEAN PURE WHITE FORM STUDIO ── */}
          <div className="lg:col-span-7 p-6 sm:p-9 flex flex-col justify-center text-left">
            {submitted ? (
              <div className="py-10 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/15">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-2xl font-black text-slate-900">Inquiry Dispatched!</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Thank you, <span className="text-blue-700 font-bold">{formData.name}</span>. Our team is reviewing your request and will connect with you within 2 hours.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/919211651100?text=Hi%20DXHUB%20Team%2C%20I%20just%20submitted%20an%20inquiry%20for%20${encodeURIComponent(formData.service)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Continue on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
                  >
                    Send Another Brief
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">Start a Conversation</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal">
                    Choose a topic below and share a short project brief.
                  </p>
                </div>

                {alert.text && alert.type === 'error' && (
                  <div className="p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 bg-rose-50 text-rose-700 border border-rose-200">
                    <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{alert.text}</span>
                  </div>
                )}

                {/* Animated Quick-Topic Selector Pills */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Select Inquiry Domain
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INQUIRY_TOPICS.map((topic) => {
                      const active = formData.service === topic;
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: topic })}
                          className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                            active
                              ? 'text-white border-transparent shadow-sm shadow-blue-600/20'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300 hover:text-slate-900'
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="activeContactTopic"
                              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600"
                            />
                          )}
                          <span className="relative z-10">{topic}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Rahul Sharma"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white text-slate-900 placeholder-slate-400 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 92116 51100"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white text-slate-900 placeholder-slate-400 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Work Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white text-slate-900 placeholder-slate-400 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Message / Project Details *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    required
                    placeholder="Tell us about your project requirements, timeline, or partnership interest..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white text-slate-900 placeholder-slate-400 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 overflow-hidden"
                >
                  {!loading && (
                    <motion.span
                      aria-hidden="true"
                      animate={{ x: ['-130%', '220%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.6, ease: 'easeInOut' }}
                      className="pointer-events-none absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                    />
                  )}
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Brief...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white relative z-10" />
                      <span className="relative z-10">Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WebContactView;
