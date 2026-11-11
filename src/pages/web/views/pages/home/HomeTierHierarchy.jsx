/**
 * HomeTierHierarchy.jsx - [SECTION VIEW]
 * 4-Tier Enterprise Supply Chain with Connected Workflow Indicators.
 * Re-styled with luxury Cosmic Sapphire & Aurora Luminescence theme.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, Building2, Store, Users, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';

const TIERS = [
  {
    tier: '01',
    title: 'Super Distributor',
    subtitle: 'Zonal Apex Pool',
    keys: '5,000 Keys',
    desc: 'Receives root cryptographic key tranches directly from DXHUB Technology. Authorized for regional sub-dealer onboarding and multi-district governance.',
    icon: Building2,
    accent: 'purple',
    badge: 'Zonal Root Pool',
    borderColor: 'hover:border-purple-400 hover:shadow-purple-500/25',
    pillStyle: 'bg-purple-500/10 text-purple-300 border-purple-500/30'
  },
  {
    tier: '02',
    title: 'Master Distributor',
    subtitle: 'District Wholesale Hub',
    keys: '1,200 Keys',
    desc: 'Allocates verified MDM licenses to local retail store chains and independent showroom dealers with automated credit and zero-leakage ledger audits.',
    icon: Store,
    accent: 'cyan',
    badge: 'District Hub',
    borderColor: 'hover:border-cyan-400 hover:shadow-cyan-500/25',
    pillStyle: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
  },
  {
    tier: '03',
    title: 'Retail Store Dealer',
    subtitle: 'Counter Provisioning',
    keys: '150 Keys',
    desc: 'Executes rapid 6-tap QR setup on financed smartphones at point-of-sale. Manages local customer EMI schedules and triggers sub-second freeze alerts.',
    icon: Users,
    accent: 'amber',
    badge: 'Retail Counter',
    borderColor: 'hover:border-amber-400 hover:shadow-amber-500/25',
    pillStyle: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
  },
  {
    tier: '04',
    title: 'Consumer End-User',
    subtitle: 'Zero-NPA Device',
    keys: '1 Device',
    desc: 'Enjoys full uninhibited smartphone performance when EMIs are paid on time. In case of payment lapse, instant UPI QR screen facilitates immediate restoration.',
    icon: ShieldCheck,
    accent: 'emerald',
    badge: 'Restricted User',
    borderColor: 'hover:border-emerald-400 hover:shadow-emerald-500/25',
    pillStyle: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
  }
];

const HomeTierHierarchy = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      
      {/* ── SECTION HEADER ───────────────────────────── */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/40 text-purple-300 text-xs font-black uppercase tracking-wider shadow-lg shadow-purple-500/10 backdrop-blur-md">
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span>Zero-Leakage Supply Chain</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          4-Tier Distribution Architecture
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
          Every cryptographic license key is immutably tracked from Zonal apex reserves down to hyper-local mobile counters.
        </p>
      </div>

      {/* ── 4 CARDS GRID WITH LUXURY HOVER LIFT ───────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TIERS.map((tier) => {
          const IconComp = tier.icon;
          return (
            <div
              key={tier.tier}
              className={`cyber-card p-6 flex flex-col justify-between group transition-all duration-300 border border-slate-800 bg-slate-900/70 backdrop-blur-xl ${tier.borderColor} hover:shadow-2xl hover:-translate-y-2`}
            >
              <div>
                {/* Header with step number & key count */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-sm text-white group-hover:scale-105 transition-transform duration-200">
                    {tier.tier}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${tier.pillStyle}`}>
                    <KeyRound className="w-3 h-3" />
                    <span>{tier.keys}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <IconComp className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{tier.subtitle}</span>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                  {tier.title}
                </h3>

                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed font-normal">
                  {tier.desc}
                </p>
              </div>

              {/* Footer specs tag */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-cyan-300">
                <span className="text-[11px] font-mono">{tier.badge}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default HomeTierHierarchy;
