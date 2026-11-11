/**
 * FaqSection.jsx - [VIEW COMPONENT]
 * Interactive 2-Column Editorial Split FAQ Section — 100% Pure IT Software Concepts.
 * Features:
 * - Sticky Left Executive Heading + Light Pastel Solution Architect Contact Card
 * - Right Floating Rounded White Accordion Cards with Framer Motion smooth height expansion
 * - Rotating plus-to-close icon indicator and soft Royal Blue active highlight
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageCircle, ArrowRight, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: "What software development and IT services does DXHUB Technology provide?",
    a: "DXHUB Technology is a full-stack software engineering company specializing in custom web application development (React 19, Next.js), native and cross-platform mobile applications (iOS Swift, Android Kotlin, Flutter), AWS cloud DevOps, enterprise ERP/CRM systems, and UI/UX design."
  },
  {
    q: "Does DXHUB Technology provide Mobile Device Management (MDM) & Sentinel DPC?",
    a: "Yes! DXHUB engineers the proprietary Sentinel MDM platform and Android Enterprise Device Policy Controller (DPC) client, built for sub-1.2s remote management directives via MQTT TLS 1.3, enterprise fleet policies, and strict compliance controls."
  },
  {
    q: "How does DXHUB ensure security, scalability, and code quality for client projects?",
    a: "Every project follows clean modular architecture, automated CI/CD deployment pipelines, strict OWASP Top 10 and TLS 1.3 security standards, automated QA testing suites, and full IP source-code ownership transfer upon completion."
  },
  {
    q: "Which technology stack does DXHUB use for custom software and web platforms?",
    a: "We utilize modern, production-proven stacks: React.js, Next.js, and TypeScript on the frontend; React Native, Flutter, and Kotlin/Swift on mobile; Node.js, Express, Python, Go, and Java on backend; MongoDB, PostgreSQL, and Redis for databases; and AWS, Docker, and Kubernetes for cloud infrastructure."
  },
  {
    q: "Does DXHUB Technology build custom ERP, CRM, and enterprise SaaS dashboards?",
    a: "Yes, our engineering team designs and builds scalable custom enterprise systems including multi-tenant SaaS platforms, inventory & billing ERPs, automated CRM workflows, and real-time analytics dashboards tailored to your business."
  },
  {
    q: "Can I schedule a consultation or request a live technical demo with DXHUB?",
    a: "Yes! Click 'Contact Us' or reach our engineering desk directly via WhatsApp at +91 92116 51100. Our senior solution architects respond within 2 hours for project scoping and architecture calls."
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8 sm:pb-12 relative z-10 select-none text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Sticky Header + Light Pastel Architect Desk Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200/80">
              <HelpCircle className="w-3.5 h-3.5" />
              FREQUENTLY ASKED
            </span>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Frequently Asked{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Questions
              </span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Common questions about DXHUB Technology's custom software engineering, mobile app development, AWS cloud DevOps, and enterprise security.
            </p>
          </div>

          {/* Interactive Pastel Quick-Support Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl bg-gradient-to-br from-[#eff6ff] via-[#f5f8ff] to-[#eef2ff] border border-blue-200/80 p-6 shadow-xs space-y-4"
          >
            <div className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-700 bg-white/90 px-3 py-1 rounded-full border border-emerald-200/80 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Architects Online · &lt; 2h SLA</span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-extrabold text-slate-900">Need Custom Architecture?</h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Speak directly with our senior engineering desk for project scoping, AWS sizing, or Sentinel DPC evaluation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href="https://wa.me/919211651100"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold text-emerald-800 bg-white border border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 shadow-2xs transition-all duration-200"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>

              <Link
                to="/contact-mdm"
                className="group inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm shadow-blue-600/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Interactive Floating White Accordion Cards */}
        <div className="lg:col-span-7 space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const serial = String(idx + 1).padStart(2, '0');
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.28, delay: idx * 0.04 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-blue-300 shadow-[0_14px_34px_-12px_rgba(37,99,235,0.16)]'
                    : 'bg-white/90 border-slate-200/85 hover:border-blue-200 hover:bg-white hover:shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <span
                      className={`text-[11px] font-black tabular-nums px-2 py-0.5 rounded-md border shrink-0 transition-colors duration-200 ${
                        isOpen
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-50 text-slate-400 border-slate-200 group-hover:text-blue-600 group-hover:border-blue-200'
                      }`}
                    >
                      {serial}
                    </span>
                    <span
                      className={`text-sm sm:text-[15px] font-extrabold transition-colors leading-snug ${
                        isOpen ? 'text-blue-700' : 'text-slate-800 group-hover:text-blue-700'
                      }`}
                    >
                      {faq.q}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-blue-50 border-blue-200 text-blue-700 rotate-45'
                        : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:border-blue-200 group-hover:text-blue-600'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-5 sm:pl-[3.6rem] text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal border-t border-slate-100 pt-3.5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
