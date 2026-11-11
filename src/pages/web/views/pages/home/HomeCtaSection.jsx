/**
 * HomeCtaSection.jsx - [SECTION VIEW]
 * Clean Editorial Call-to-Action with Modern Gradient and Card Hover Lift.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import Trolley3DIcon from '../../components/Trolley3DIcon';

const HomeCtaSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl p-8 sm:p-12 text-white shadow-xl overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 transition-all duration-300 hover:shadow-2xl">
        
        {/* Soft Radial Ambient Lights */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Scale Your Retail Business
            </div>
            
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Ready to Secure Your Retail Network?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl font-normal leading-relaxed">
              Join 3,200+ mobile shop owners and regional distributors achieving zero NPA with DXHUB Technology.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
            <Link
              to="/contact-mdm"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-black text-slate-950 bg-white hover:bg-slate-100 shadow-xl transition-all duration-200 hover:scale-105 active:scale-100"
            >
              <span>Apply for Dealership</span>
              <ArrowRight className="w-4 h-4 text-blue-700 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/store"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 backdrop-blur-md transition-all duration-200 hover:scale-105 shadow-md"
            >
              <Trolley3DIcon className="w-4 h-4" />
              <span>Visit DXHUB Store</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeCtaSection;
