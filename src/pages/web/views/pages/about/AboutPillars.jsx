/**
 * AboutPillars.jsx - [ABOUT SECTION]
 * Four Foundational Corporate Pillars with clean Stripe-grade cursor spotlight + upward lift hover.
 */

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Cloud, 
  Smartphone, 
  CheckCircle2, 
  Tv
} from 'lucide-react';

const PILLAR_THEMES = {
  blue: {
    spotlight: 'rgba(37, 99, 235, 0.09)',
    topBar: 'from-blue-600 to-sky-400',
    borderShadow: 'hover:border-blue-400/75 hover:shadow-[0_22px_45px_-12px_rgba(37,99,235,0.18)]',
    iconRest: 'bg-blue-50 text-blue-600 border-blue-100',
    iconHover: 'group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-sky-500 group-hover:text-white group-hover:border-transparent',
    subColor: 'text-blue-600',
    titleHover: 'group-hover:text-blue-700',
    checkColor: 'text-blue-600'
  },
  indigo: {
    spotlight: 'rgba(79, 70, 229, 0.09)',
    topBar: 'from-indigo-600 to-violet-500',
    borderShadow: 'hover:border-indigo-400/75 hover:shadow-[0_22px_45px_-12px_rgba(79,70,229,0.18)]',
    iconRest: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    iconHover: 'group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-violet-600 group-hover:text-white group-hover:border-transparent',
    subColor: 'text-indigo-600',
    titleHover: 'group-hover:text-indigo-700',
    checkColor: 'text-indigo-600'
  },
  emerald: {
    spotlight: 'rgba(5, 150, 105, 0.09)',
    topBar: 'from-emerald-500 to-teal-400',
    borderShadow: 'hover:border-emerald-400/75 hover:shadow-[0_22px_45px_-12px_rgba(5,150,105,0.18)]',
    iconRest: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    iconHover: 'group-hover:bg-gradient-to-br group-hover:from-emerald-600 group-hover:to-teal-500 group-hover:text-white group-hover:border-transparent',
    subColor: 'text-emerald-600',
    titleHover: 'group-hover:text-emerald-700',
    checkColor: 'text-emerald-600'
  },
  amber: {
    spotlight: 'rgba(217, 119, 6, 0.09)',
    topBar: 'from-amber-500 to-orange-400',
    borderShadow: 'hover:border-amber-400/75 hover:shadow-[0_22px_45px_-12px_rgba(217,119,6,0.18)]',
    iconRest: 'bg-amber-50 text-amber-600 border-amber-100',
    iconHover: 'group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white group-hover:border-transparent',
    subColor: 'text-amber-600',
    titleHover: 'group-hover:text-amber-700',
    checkColor: 'text-amber-600'
  }
};

const PillarCard = ({ title, subtitle, description, icon: Icon, features, badge, accent = 'blue' }) => {
  const cardRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };

  const handleMouseLeave = () => {
    setCursor((prev) => ({ ...prev, active: false }));
  };

  const style = PILLAR_THEMES[accent] || PILLAR_THEMES.blue;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative p-8 rounded-3xl border border-slate-200/85 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.04)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between space-y-6 group overflow-hidden select-none text-left ${style.borderShadow}`}
    >
      {/* Top expanding gradient accent bar */}
      <span
        className={`pointer-events-none absolute top-0 left-0 h-[3px] w-0 group-hover:w-full bg-gradient-to-r ${style.topBar} transition-all duration-500 ease-out`}
      />
      {/* Dynamic Soft Pastel Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: cursor.active ? 1 : 0,
          background: `radial-gradient(420px circle at ${cursor.x}px ${cursor.y}px, ${style.spotlight}, transparent 68%)`
        }}
      />

      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className={`p-3.5 rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-2xs ${style.iconRest} ${style.iconHover}`}>
            <Icon className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {badge}
          </span>
        </div>

        <div>
          <span className={`text-xs font-bold uppercase tracking-wider ${style.subColor}`}>
            {subtitle}
          </span>
          <h3 className={`text-xl sm:text-2xl font-black text-slate-900 mt-1 transition-colors ${style.titleHover}`}>
            {title}
          </h3>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        <div className="pt-2">
          <div className="space-y-2 text-xs font-semibold text-slate-700">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${style.checkColor}`} />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AboutPillars = () => {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Our Four Pillars of{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Technology &amp; Commerce
          </span>
        </h2>
        <p className="text-sm text-slate-600 font-normal">
          Uniting high-speed software engineering, resilient cloud infrastructure, and device security with nationwide wholesale consumer appliances and electronics distribution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        
        <PillarCard
          title="Web & SaaS Platform Engineering"
          subtitle="Sector 1: IT Software"
          description="Building high-performance web applications, enterprise SaaS platforms, and responsive client portals with modern tech stacks, sub-second execution, and automated payment gateways."
          icon={Globe}
          badge="IT Engineering"
          accent="blue"
          features={[
            'Next.js 15, React 19, and Node.js microservices',
            'Sub-second page speeds with 100/100 Core Web Vitals',
            'Role-based dashboards, RBAC security, and billing portals',
            'Seamless payment gateways via Razorpay, Stripe, and UPI'
          ]}
        />

        <PillarCard
          title="Mobile Application Development"
          subtitle="Sector 1: IT Software"
          description="Designing native and cross-platform mobile apps using Flutter, React Native, and Kotlin. Crafted with fluid 60fps animations, offline SQLite caching, and real-time push synchronization."
          icon={Smartphone}
          badge="Mobile Apps"
          accent="indigo"
          features={[
            'Cross-platform Flutter & React Native applications',
            'Native Kotlin (Android) and Swift (iOS) optimization',
            'Offline-first SQLite caching and real-time synchronization',
            'High-speed push messaging via MQTT and Firebase FCM'
          ]}
        />

        <PillarCard
          title="AWS Cloud DevOps & Device Security"
          subtitle="Sector 1: IT Cloud & Security"
          description="Enterprise cloud hosting and deployment automation on AWS EC2, S3, and RDS, coupled with Android Enterprise DPC & Sentinel MDM security protecting corporate device fleets."
          icon={Cloud}
          badge="Cloud & Security"
          accent="emerald"
          features={[
            'Auto-scaling AWS EC2 clusters with guaranteed 99.99% uptime',
            'Automated CI/CD deployment pipelines with continuous monitoring',
            'Sentinel MDM sub-1.2s remote lock directives via MQTT TLS 1.3',
            'Hardware recovery wipe and ADB debugging restriction hooks'
          ]}
        />

        <PillarCard
          title="Wholesale Consumer Goods & Distribution"
          subtitle="Sector 2: Non-IT Commerce"
          description="Direct factory wholesale distribution of 4K Smart TVs, home appliances, cellular hardware, and GaN fast chargers across an insured multi-district supply chain of 3,200+ partner hubs."
          icon={Tv}
          badge="Non-IT Commerce"
          accent="amber"
          features={[
            'Direct factory procurement with up to 35% B2B margins',
            'Official 1+2 Year manufacturer replacement warranties',
            'Doorstep insured freight logistics with sub-48h regional SLA',
            'Integrated B2B digital ordering portal and showroom POS support'
          ]}
        />

      </div>
    </div>
  );
};

export default AboutPillars;
