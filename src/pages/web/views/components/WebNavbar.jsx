/**
 * WebNavbar.jsx - [VIEW COMPONENT]
 * Ultra-Clean Full-Width Frosted Glass Navigation Bar.
 * Features:
 * - Spacious 76px airy layout with crisp hairline border and live reading progress beam
 * - Royal Blue ringed DXHUB emblem with gentle breathing aura & hover tilt
 * - Crystal-clear unclipped "IT & SMART COMMERCE" dark subtext + smooth DXHUB gradient underline
 * - Silky Framer Motion layoutId="activeNavDock" gliding pill indicator across routes
 * - Compact Royal Blue Store button with periodic automatic light sheen sweep
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import Trolley3DIcon from './Trolley3DIcon';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about-mdm' },
  { name: 'Services', path: '/services-mdm' },
  { name: 'Contact', path: '/contact-mdm' }
];

const WebNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-2xl border-b border-slate-200/90 shadow-[0_8px_30px_-10px_rgba(37,99,235,0.10)]'
          : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/65'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">
          {/* ── 🌟 OFFICIAL DXHUB TECHNOLOGY BRAND LOGO ── */}
          <Link to="/" className="relative flex items-center gap-3 group select-none">
            <div className="relative flex items-center justify-center shrink-0">
              <motion.span
                animate={{ scale: [1, 1.14, 1], opacity: [0.35, 0.05, 0.35] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-blue-500/45"
              />
              <div className="relative w-11 h-11 rounded-full p-0.5 ring-2 ring-blue-600 shadow-sm shadow-blue-600/20 group-hover:ring-indigo-600 group-hover:shadow-md group-hover:shadow-blue-600/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 ease-out flex items-center justify-center bg-white overflow-hidden">
                <img
                  src="/dxhub_logo_clean.png"
                  alt="DXHUB Technology Official Logo"
                  className="w-full h-full object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="flex flex-col text-left justify-center gap-1">
              <div className="flex items-center gap-2 leading-none">
                <span className="relative text-xl font-black tracking-tight text-blue-600 group-hover:text-indigo-700 transition-colors duration-300 leading-none">
                  DXHUB
                  <span className="absolute -bottom-1 left-0 h-[2.5px] w-0 group-hover:w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300 ease-out" />
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 tracking-wider uppercase border border-blue-200/80 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-2xs leading-none">
                  Technology
                </span>
              </div>
              <span className="text-[9.5px] font-bold text-slate-700 group-hover:text-slate-900 tracking-[0.16em] uppercase transition-colors duration-300 leading-none">
                IT & Smart Commerce
              </span>
            </div>
          </Link>

          {/* ── CENTER GLIDING NAVIGATION DOCK ── */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/80 shadow-inner">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-5 py-1.5 text-[13.5px] rounded-full transition-colors duration-200 select-none ${
                    active
                      ? 'text-blue-700 font-extrabold'
                      : 'text-slate-600 font-semibold hover:text-slate-950'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeNavDock"
                      transition={{ type: 'spring', stiffness: 460, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-white shadow-xs border border-blue-100/90"
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* ── RIGHT ACTION AREA (BALANCED YELLOW STORE BUTTON WITH 3D TROLLEY) ── */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/store"
              className="relative group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-extrabold tracking-wide uppercase text-slate-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 border border-amber-300 shadow-sm shadow-amber-500/25 hover:shadow-md hover:shadow-amber-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
            >
              <motion.span
                aria-hidden="true"
                animate={{ x: ['-130%', '220%'] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 3.6, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white/45 to-transparent skew-x-[-20deg]"
              />
              <Trolley3DIcon className="w-[19px] h-[19px] relative z-10 drop-shadow-[0_1px_2px_rgba(15,23,42,0.28)]" />
              <span className="relative z-10">STORE</span>
            </Link>
          </div>

          {/* ── MOBILE MENU TOGGLE ───────────────────── */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/store"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black tracking-wider uppercase text-slate-950 bg-gradient-to-r from-yellow-400 to-amber-400 border border-amber-300 shadow-sm transition-all duration-300"
            >
              <Trolley3DIcon className="w-[18px] h-[18px] drop-shadow-[0_1px_2px_rgba(15,23,42,0.28)]" />
              <span>STORE</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE DROPDOWN MENU ───────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-xl">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            );
          })}

          <div className="pt-2.5 border-t border-slate-100">
            <Link
              to="/store"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-black tracking-wider uppercase text-slate-950 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 border border-amber-300 shadow-sm transition-all duration-300"
            >
              <Trolley3DIcon className="w-5 h-5 drop-shadow-[0_1px_2px_rgba(15,23,42,0.25)]" />
              <span>STORE</span>
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default WebNavbar;
