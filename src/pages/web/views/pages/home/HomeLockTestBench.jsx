/**
 * HomeLockTestBench.jsx - [SECTION VIEW]
 * Interactive 3-Step Zero-NPA FinTech Workflow Studio.
 * Styled with luxury Cosmic Sapphire & Aurora Luminescence theme.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  QrCode, 
  Cpu, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Smartphone,
  Lock,
  Layers,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: '6-Tap QR Onboarding',
    tag: 'At Retail Counter',
    duration: '< 90 Seconds',
    description: 'When unboxing a fresh financed phone, the retailer taps 6 times on the Android welcome screen and scans the provisioning QR code. Android Enterprise DPC binds invisibly with zero user-end uninstall permission.',
    icon: QrCode,
    accent: 'cyan',
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    highlight: 'Recovery Wipe Blocked'
  },
  {
    step: '02',
    title: 'Cryptographic Background Telemetry',
    tag: 'Automated Cloud Guard',
    duration: '<0.8% Battery/Day',
    description: 'The device maintains high-speed MQTT TLS 1.3 heartbeat pings. If an unregistered SIM card is inserted or the phone remains offline for over 72 hours, the hardware automatically locks down.',
    icon: Cpu,
    accent: 'purple',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    highlight: 'SIM-Swap Sensor Active'
  },
  {
    step: '03',
    title: 'Sub-Second Remote Lock & Auto-Unlock',
    tag: 'Default Prevention',
    duration: 'Sub-1.2s Delivery',
    description: 'If a customer defaults on an EMI date, a 1-click directive from the retailer immediately freezes all third-party apps, displaying a full-screen dynamic UPI QR. Scanning and paying immediately unlocks the phone.',
    icon: ShieldAlert,
    accent: 'emerald',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    highlight: 'Real-Time NPCI Settlement'
  }
];

const HomeLockTestBench = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = WORKFLOW_STEPS[activeStep];
  const IconComponent = current.icon;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
      
      {/* ── CARD SHELL (LUXURY GLASSMORPHIC CONTAINER) ── */}
      <div className="bg-slate-900/75 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-slate-700/60 shadow-2xl shadow-cyan-950/20 space-y-8 text-left relative overflow-hidden">
        
        {/* Ambient Corner Radial Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-cyan-500/30 text-cyan-300 text-xs font-black uppercase tracking-wider shadow-sm">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Automated Zero-NPA Lifecycle</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Hardware-Enforced Protocol Architecture
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              From unboxing at the retail counter to automated monthly EMI recovery, every state change is cryptographically authenticated.
            </p>
          </div>

          <Link
            to="/contact-mdm"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-black text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 transition-all shrink-0"
          >
            <span>Request Dealership Demo</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {WORKFLOW_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activeStep === idx
                  ? 'bg-slate-800/90 border-cyan-400/80 shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-400/50 -translate-y-1'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-black ${activeStep === idx ? 'text-cyan-400' : 'text-slate-400'}`}>
                  PHASE {s.step}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {s.duration}
                </span>
              </div>
              <h4 className="font-black text-white text-base">{s.title}</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{s.tag}</p>
            </button>
          ))}
        </div>

        {/* Active Step Feature Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-slate-800 relative overflow-hidden">
          
          <div className="lg:col-span-8 space-y-4 relative z-10">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${current.badgeColor}`}>
              <span>{current.tag}</span>
              <span>•</span>
              <span className="text-white">{current.duration}</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {current.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {current.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>{current.highlight}</span>
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Hard-Reset Bypass</span>
              </span>
              <span className="flex items-center gap-1.5 text-purple-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Encrypted MQTT Protocol</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex items-center justify-center relative z-10">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 flex items-center justify-center shadow-xl shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
                <IconComponent className="w-14 h-14 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HomeLockTestBench;
