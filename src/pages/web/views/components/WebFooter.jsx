/**
 * WebFooter.jsx - [VIEW COMPONENT]
 * Sleek Midnight Slate-Blue Enterprise Footer (#1e293b).
 * Contrasts harmoniously against the bright Light Executive body,
 * featuring crisp slate typography, animated blue link indicators,
 * WhatsApp/Social circle buttons, and authentic Noida corporate contact details.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const WebFooter = () => {
  return (
    <footer className="relative bg-[#1e293b] text-slate-300 border-t border-slate-700/75 select-none">
      {/* ── SUBTLE ARCHITECTURAL TOP SHIMMER ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/35 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[160px] bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.06),transparent)] pointer-events-none" />

      {/* ── MAIN 4-COLUMN FOOTER CONTAINER ─────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 text-left">
          {/* ── COLUMN 1: BRAND & SOCIAL ICONS (4 COLS) ──── */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-0.5 ring-2 ring-sky-400/50 flex items-center justify-center shrink-0 bg-white overflow-hidden">
                <img
                  src="/dxhub_logo_clean.png"
                  alt="DXHUB Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">DXHUB</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/70 text-sky-200 tracking-wider uppercase border border-slate-600/80">
                  Technology
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300/90 leading-relaxed max-w-sm font-normal">
              Building innovative software solutions and enterprise commerce ecosystems for modern businesses. Transforming bold ideas into scalable digital products.
            </p>

            {/* Circular Social Icons with WhatsApp */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://wa.me/919211651100"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900/75 hover:bg-[#25D366] text-slate-300 hover:text-white border border-slate-700 hover:border-[#25D366] flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                title="WhatsApp Chat"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.549 1.768.809 2.796.809 3.181 0 5.767-2.586 5.767-5.766.001-3.182-2.585-5.796-5.767-5.796zm3.377 8.163c-.144.405-.837.774-1.17.825-.311.047-.704.072-2.18-.541-1.89-1.042-3.11-2.973-3.204-3.1-.095-.127-.768-1.022-.768-1.95 0-.928.486-1.385.66-1.575.174-.19.38-.238.507-.238.127 0 .254.001.365.006.118.005.277-.044.434.333.162.388.554 1.349.602 1.447.048.098.08.214.016.342-.064.127-.096.206-.19.317-.095.111-.2.248-.286.333-.095.095-.195.199-.084.389.111.19.493.813 1.057 1.316.726.647 1.338.848 1.528.943.19.095.301.079.412-.048.111-.127.476-.555.602-.745.127-.19.254-.159.428-.095.174.064 1.109.523 1.3.618.19.095.317.143.365.222.048.079.048.459-.096.864zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.307A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.154c-1.61 0-3.113-.487-4.368-1.325l-.313-.21-2.955.775.788-2.88-.228-.363A8.113 8.113 0 013.846 12c0-4.496 3.658-8.154 8.154-8.154s8.154 3.658 8.154 8.154-3.658 8.154-8.154 8.154z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900/75 hover:bg-[#0077b5] text-slate-300 hover:text-white border border-slate-700 hover:border-[#0077b5] flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer text-xs font-bold"
                title="LinkedIn"
              >
                in
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900/75 hover:bg-white text-slate-300 hover:text-slate-900 border border-slate-700 hover:border-white flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer text-xs font-bold"
                title="X (Twitter)"
              >
                𝕏
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900/75 hover:bg-[#E1306C] text-slate-300 hover:text-white border border-slate-700 hover:border-[#E1306C] flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900/75 hover:bg-[#1877F2] text-slate-300 hover:text-white border border-slate-700 hover:border-[#1877F2] flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer text-xs font-bold"
                title="Facebook"
              >
                f
              </a>
            </div>
          </div>

          {/* ── COLUMN 2: QUICK LINKS (2 COLS) ─────────────── */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase text-white tracking-widest">Company</h4>
            <ul className="space-y-2.5 text-sm text-slate-300 font-normal">
              <li>
                <Link to="/" className="group/flink inline-flex items-center gap-0 hover:gap-2 hover:text-white transition-all duration-200">
                  <span className="w-0 group-hover/flink:w-2.5 h-[2px] bg-sky-400 rounded-full transition-all duration-200" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about-mdm" className="group/flink inline-flex items-center gap-0 hover:gap-2 hover:text-white transition-all duration-200">
                  <span className="w-0 group-hover/flink:w-2.5 h-[2px] bg-sky-400 rounded-full transition-all duration-200" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/services-mdm" className="group/flink inline-flex items-center gap-0 hover:gap-2 hover:text-white transition-all duration-200">
                  <span className="w-0 group-hover/flink:w-2.5 h-[2px] bg-sky-400 rounded-full transition-all duration-200" />
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link to="/services-mdm" className="group/flink inline-flex items-center gap-0 hover:gap-2 hover:text-white transition-all duration-200">
                  <span className="w-0 group-hover/flink:w-2.5 h-[2px] bg-sky-400 rounded-full transition-all duration-200" />
                  <span>Technology Stack</span>
                </Link>
              </li>
              <li>
                <Link to="/store" className="group/flink inline-flex items-center gap-0 hover:gap-2 hover:text-white transition-all duration-200">
                  <span className="w-0 group-hover/flink:w-2.5 h-[2px] bg-sky-400 rounded-full transition-all duration-200" />
                  <span>Online Store</span>
                </Link>
              </li>
              <li>
                <Link to="/contact-mdm" className="group/flink inline-flex items-center gap-0 hover:gap-2 hover:text-white transition-all duration-200">
                  <span className="w-0 group-hover/flink:w-2.5 h-[2px] bg-sky-400 rounded-full transition-all duration-200" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* ── COLUMN 3: SOLUTIONS (3 COLS) ────────────────── */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase text-white tracking-widest">Solutions</h4>
            <ul className="space-y-2.5 text-sm text-slate-300 font-normal">
              <li>
                <Link to="/services-mdm" className="group/flink inline-flex items-center gap-0 hover:gap-2 hover:text-white transition-all duration-200">
                  <span className="w-0 group-hover/flink:w-2.5 h-[2px] bg-sky-400 rounded-full transition-all duration-200" />
                  <span>Web Development</span>
                </Link>
              </li>
              <li>
                <Link to="/services-mdm" className="group/flink inline-flex items-center gap-0 hover:gap-2 hover:text-white transition-all duration-200">
                  <span className="w-0 group-hover/flink:w-2.5 h-[2px] bg-sky-400 rounded-full transition-all duration-200" />
                  <span>Mobile App Engineering</span>
                </Link>
              </li>
              <li>
                <Link to="/services-mdm" className="group/flink inline-flex items-center gap-0 hover:gap-2 hover:text-white transition-all duration-200">
                  <span className="w-0 group-hover/flink:w-2.5 h-[2px] bg-sky-400 rounded-full transition-all duration-200" />
                  <span>Custom Enterprise Software</span>
                </Link>
              </li>
              <li>
                <Link to="/services-mdm" className="group/flink inline-flex items-center gap-0 hover:gap-2 hover:text-white transition-all duration-200">
                  <span className="w-0 group-hover/flink:w-2.5 h-[2px] bg-sky-400 rounded-full transition-all duration-200" />
                  <span>DPC / EMM Solutions</span>
                </Link>
              </li>
              <li>
                <Link to="/services-mdm" className="group/flink inline-flex items-center gap-0 hover:gap-2 hover:text-white transition-all duration-200">
                  <span className="w-0 group-hover/flink:w-2.5 h-[2px] bg-sky-400 rounded-full transition-all duration-200" />
                  <span>AWS Cloud &amp; DevOps</span>
                </Link>
              </li>
              <li>
                <Link to="/store" className="group/flink inline-flex items-center gap-0 hover:gap-2 hover:text-white transition-all duration-200">
                  <span className="w-0 group-hover/flink:w-2.5 h-[2px] bg-sky-400 rounded-full transition-all duration-200" />
                  <span>Wholesale Electronics (Non-IT)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* ── COLUMN 4: CONTACT US (3 COLS) ──────────────── */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase text-white tracking-widest">Contact Us</h4>

            <div className="space-y-3.5 text-sm text-slate-300">
              <div className="flex items-start gap-3 group">
                <div className="w-7 h-7 rounded-lg bg-slate-900/75 border border-slate-700 text-sky-300 group-hover:text-white group-hover:border-sky-400/60 flex items-center justify-center shrink-0 mt-0.5 transition-all">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="truncate">
                  <a
                    href="mailto:business@dxhub.in"
                    className="hover:text-white transition-colors truncate block font-medium"
                  >
                    business@dxhub.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-7 h-7 rounded-lg bg-slate-900/75 border border-slate-700 text-sky-300 group-hover:text-white group-hover:border-sky-400/60 flex items-center justify-center shrink-0 mt-0.5 transition-all">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <a href="tel:+919211651100" className="hover:text-white transition-colors font-medium">
                    +91 92116 51100
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-7 h-7 rounded-lg bg-slate-900/75 border border-slate-700 text-sky-300 group-hover:text-white group-hover:border-sky-400/60 flex items-center justify-center shrink-0 mt-0.5 transition-all">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-snug">
                  Sector 62, Electronic City, Noida, Uttar Pradesh - 201309
                </p>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-7 h-7 rounded-lg bg-slate-900/75 border border-slate-700 text-sky-300 group-hover:text-white group-hover:border-sky-400/60 flex items-center justify-center shrink-0 mt-0.5 transition-all">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300">Mon - Sat: 9:30 AM - 7:30 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM COPYRIGHT & LEGAL BAR ───────────────────── */}
      <div className="border-t border-slate-700/70 bg-[#162032] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} DXHUB Technology Private Limited. All rights reserved.</p>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link to="/about-mdm" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about-mdm" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/about-mdm" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WebFooter;
