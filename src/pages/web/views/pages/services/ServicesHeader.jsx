/**
 * ServicesHeader.jsx - [SERVICES SECTION]
 * Compact & Distinct Light Daylight Services Banner:
 * - Same bright light theme & smooth animations as Home, compact sub-page sizing
 * - Preserves original Services copy & Sector 1 / Sector 2 Framer Motion pill switcher verbatim
 * - Displays dedicated Light Services 3D illustration (/banners/services_light_banner.jpg)
 */

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles } from 'lucide-react';
import Trolley3DIcon from '../../components/Trolley3DIcon';

const ServicesHeader = ({ activeTab, onTabChange }) => {
  const isIt = activeTab === 'it';
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
        className="pointer-events-none -top-20 left-[15%] w-80 h-80 rounded-full bg-sky-200/35 blur-3xl absolute"
      />
      <motion.div
        animate={{ x: [0, -24, 0], y: [0, 14, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none top-4 right-[10%] w-72 h-72 rounded-full bg-indigo-200/30 blur-3xl absolute"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
          {/* LEFT (7 Cols): Original Services Title, Subtitle & Sector Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-4 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-[11px] font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Enterprise Solutions Suite</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-black text-slate-900 tracking-tight leading-[1.13]">
              Comprehensive IT Solutions &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
                Enterprise Commerce
              </span>
            </h1>

            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal max-w-xl">
              From custom website &amp; mobile app engineering, AWS cloud architecture, SEO growth, and Sentinel MDM security — to factory-direct smart consumer electronics.
            </p>

            {/* Compact Gliding Sector Switcher */}
            <div className="pt-1.5">
              <div className="inline-flex flex-wrap items-center p-1.5 rounded-2xl sm:rounded-full bg-white border border-slate-200/90 shadow-xs gap-1">
                <button
                  type="button"
                  onClick={() => onTabChange('it')}
                  className="relative flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl sm:rounded-full text-xs font-extrabold tracking-wide transition-colors cursor-pointer"
                >
                  {isIt && (
                    <motion.div
                      layoutId="sectorTabActive"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl sm:rounded-full shadow-sm shadow-blue-600/20"
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-2 ${isIt ? 'text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                    <ShieldCheck className={`w-4 h-4 ${isIt ? 'text-white' : 'text-blue-600'}`} />
                    <span>Sector 1: Full-Stack IT &amp; Cloud</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onTabChange('non-it')}
                  className="relative flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl sm:rounded-full text-xs font-extrabold tracking-wide transition-colors cursor-pointer"
                >
                  {!isIt && (
                    <motion.div
                      layoutId="sectorTabActive"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl sm:rounded-full shadow-sm shadow-blue-600/20"
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-2 ${!isIt ? 'text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                    <Trolley3DIcon className="w-4 h-4" />
                    <span>Sector 2: Non-IT Wholesale</span>
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT (5 Cols): Unique Dedicated Light Services Artwork */}
          <div
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 relative"
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
                  src="/banners/services_light_banner.jpg"
                  alt="DXHUB Enterprise IT Solutions & Cloud Architecture"
                  animate={{ scale: [1, 1.045, 1] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full object-cover object-center will-change-transform"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHeader;
