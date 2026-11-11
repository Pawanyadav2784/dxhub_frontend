/**
 * AboutHeader.jsx - [ABOUT SECTION]
 * Compact & Distinct Light Daylight About Banner:
 * - Same crisp light palette & smooth motion as Home, with its own mirrored composition
 * - Left: Compact gently levitating 3D global enterprise art (/banners/about_light_banner.jpg)
 * - Right: Original About headline, copy & Explore / Partner buttons
 * - Base: Clean unified white 3-column summary divider strip
 */

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Globe, Cloud, Tv } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Globe,
    title: 'Software & Mobile Apps',
    desc: '250+ enterprise portals & cross-platform apps delivered.'
  },
  {
    icon: Cloud,
    title: 'Cloud DevOps & DPC Security',
    desc: '99.99% SLA uptime protecting 120K+ connected fleets.'
  },
  {
    icon: Tv,
    title: 'Smart Wholesale Supply Chain',
    desc: '3,200+ regional partner hubs across India.'
  }
];

const AboutHeader = () => {
  const stageRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: Number((-y * 5).toFixed(2)),
      rotateY: Number((x * 6).toFixed(2))
    });
  };

  const handleMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f2f7ff] via-[#f9fbff] to-[#fafbfd] border-b border-slate-200/65 select-none">
      {/* Subtle Drifting Pastel Orbs */}
      <motion.div
        animate={{ x: [0, 24, 0], y: [0, -14, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none -top-20 left-[12%] w-80 h-80 rounded-full bg-sky-200/35 blur-3xl absolute"
      />
      <motion.div
        animate={{ x: [0, -24, 0], y: [0, 14, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none top-4 right-[10%] w-72 h-72 rounded-full bg-indigo-200/30 blur-3xl absolute"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-7">
        {/* Compact Mirrored Split: Visual Left, Content Right (Distinct from Home) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
          {/* LEFT (5 Cols): Unique Light About Global Ecosystem Visual */}
          <div
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 relative order-2 lg:order-1"
            style={{ perspective: '1000px' }}
          >
            <motion.div
              animate={{ y: [-4, 4, -4], rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
              transition={{
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                rotateX: { type: 'spring', stiffness: 180, damping: 20 },
                rotateY: { type: 'spring', stiffness: 180, damping: 20 }
              }}
              className="rounded-[24px] bg-white p-2 border border-blue-100/90 shadow-[0_20px_50px_-15px_rgba(37,99,235,0.16)]"
            >
              <div className="relative rounded-[18px] overflow-hidden bg-[#f4f8ff] aspect-[16/10]">
                <motion.img
                  src="/banners/about_light_banner.jpg"
                  alt="DXHUB Technology About Global IT & Enterprise Ecosystem"
                  animate={{ scale: [1, 1.045, 1] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full object-cover object-center will-change-transform"
                />
              </div>
            </motion.div>
          </div>

          {/* RIGHT (7 Cols): Original About Content Verbatim */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-4 text-left order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-[11px] font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>About DXHUB Technology</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-black text-slate-900 tracking-tight leading-[1.13]">
              Pioneering Full-Stack IT &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
                Smart Enterprise Commerce
              </span>
            </h1>

            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal max-w-2xl">
              DXHUB Technology unites cutting-edge software engineering — custom web &amp; mobile platforms, AWS cloud infrastructure, and Sentinel MDM security — with an expansive nationwide supply chain for smart consumer electronics.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/services-mdm"
                className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-600/20 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                <motion.span
                  aria-hidden="true"
                  animate={{ x: ['-130%', '220%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.4, ease: 'easeInOut' }}
                  className="pointer-events-none absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                />
                <span className="relative z-10">Explore Capabilities</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact-mdm"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-white border border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 shadow-xs hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Partner With Us</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Compact Frosted White 3-Highlight Strip */}
        <div className="rounded-2xl bg-white/95 border border-blue-100/90 p-4 sm:p-5 shadow-[0_8px_28px_-10px_rgba(37,99,235,0.08)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {HIGHLIGHTS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex items-start gap-3.5 ${idx > 0 ? 'pt-4 md:pt-0 md:pl-6' : ''}`}
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <IconComp className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-extrabold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeader;
