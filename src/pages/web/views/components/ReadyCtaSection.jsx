/**
 * ReadyCtaSection.jsx - [VIEW COMPONENT]
 * "Ready to Build Your Next Product?" — Soft Light Luminous Aurora Architectural Card.
 * Features:
 * - Soft daylight pastel gradient framing above the Matte Black footer
 * - Automatic breathing ambient pastel orbs
 * - Automatic diagonal shimmer sweep on the primary Contact Us button
 * - Gently wave-floating 4 Value Pillar Cards for lively continuous smoothness
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Lightbulb, Headphones, ArrowRight } from 'lucide-react';

const VALUE_PILLARS = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    subtitle: 'Agile sprints',
    iconColor: 'text-amber-600 bg-amber-50 border-amber-200/80'
  },
  {
    icon: ShieldCheck,
    title: 'Secure Solutions',
    subtitle: 'Enterprise grade',
    iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200/80'
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    subtitle: 'Modern tech stack',
    iconColor: 'text-blue-600 bg-blue-50 border-blue-200/80'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    subtitle: 'Dedicated engineers',
    iconColor: 'text-indigo-600 bg-indigo-50 border-indigo-200/80'
  }
];

const ReadyCtaSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pb-16 relative z-10 select-none">
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#eff6ff] via-white to-[#eef2ff] border border-blue-200/85 shadow-[0_24px_60px_-20px_rgba(37,99,235,0.14)] px-6 sm:px-10 lg:px-14 py-12 sm:py-16 text-center">
        {/* Soft Animated Daylight Pastel Orbs */}
        <motion.div
          animate={{ x: [0, 32, 0], y: [0, -18, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none -top-24 -left-24 w-72 h-72 rounded-full bg-sky-200/45 blur-3xl absolute"
        />
        <motion.div
          animate={{ x: [0, -32, 0], y: [0, 18, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none -bottom-24 -right-24 w-80 h-80 rounded-full bg-indigo-200/45 blur-3xl absolute"
        />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-slate-900 leading-tight">
            Ready to Build Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Next Product?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            Let's discuss your idea and make it happen. Our software engineering &amp; cloud architecture teams are ready to transform your vision into scalable digital reality.
          </p>

          {/* Clean Light Executive Action Group */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              to="/contact-mdm"
              className="relative group inline-flex items-center gap-2 px-7 py-3 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-600/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              <motion.span
                aria-hidden="true"
                animate={{ x: ['-130%', '220%'] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.6, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
              />
              <span className="relative z-10">Contact Us</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/services-mdm"
              className="px-7 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-blue-300 hover:text-blue-700 shadow-xs hover:-translate-y-0.5 transition-all duration-300"
            >
              View Our Work
            </Link>
          </div>

          {/* 4 Gently Wave-Floating Value Cards */}
          <div className="pt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {VALUE_PILLARS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.title}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4,
                    delay: idx * 0.45,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="group bg-white/95 rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col items-center space-y-2"
                >
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${item.iconColor}`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-extrabold text-slate-900">{item.title}</p>
                  <p className="text-[11px] font-medium text-slate-500">{item.subtitle}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyCtaSection;
