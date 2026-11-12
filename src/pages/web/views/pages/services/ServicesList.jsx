/**
 * ServicesList.jsx - [SERVICES SECTION]
 * Smooth animated Service Cards grid switching gracefully between IT & Non-IT sectors
 * with Stripe-grade mouse-tracking spotlight radial glows and crisp upward lift hover.
 */

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Layers, 
  Smartphone, 
  Tv, 
  Store, 
  ShieldAlert,
  Globe,
  Cloud,
  KeyRound,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { ServiceModel } from '../../../models/ServiceModel';

const ServiceCard = ({ service, activeTab, index }) => {
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

  const getIcon = (name) => {
    const baseClass = "w-6 h-6 transition-colors duration-300";
    switch (name) {
      case 'Globe': return <Globe className={`${baseClass} text-blue-600 group-hover:text-white`} />;
      case 'Cloud': return <Cloud className={`${baseClass} text-sky-600 group-hover:text-white`} />;
      case 'KeyRound': return <KeyRound className={`${baseClass} text-indigo-600 group-hover:text-white`} />;
      case 'TrendingUp': return <TrendingUp className={`${baseClass} text-emerald-600 group-hover:text-white`} />;
      case 'ShieldAlert': return <ShieldAlert className={`${baseClass} text-rose-600 group-hover:text-white`} />;
      case 'Cpu': return <Cpu className={`${baseClass} text-blue-600 group-hover:text-white`} />;
      case 'Layers': return <Layers className={`${baseClass} text-indigo-600 group-hover:text-white`} />;
      case 'Smartphone': return <Smartphone className={`${baseClass} text-blue-600 group-hover:text-white`} />;
      case 'Tv': return <Tv className={`${baseClass} text-blue-600 group-hover:text-white`} />;
      case 'Zap': return <Zap className={`${baseClass} text-indigo-600 group-hover:text-white`} />;
      case 'Store': return <Store className={`${baseClass} text-sky-600 group-hover:text-white`} />;
      case 'Sparkles': return <Sparkles className={`${baseClass} text-blue-600 group-hover:text-white`} />;
      default: return <ShieldCheck className={`${baseClass} text-blue-600 group-hover:text-white`} />;
    }
  };

  const isIt = activeTab === 'it';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-8 rounded-3xl border border-slate-200/85 hover:border-blue-400/75 hover:shadow-[0_22px_45px_-12px_rgba(37,99,235,0.18)] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.04)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between space-y-6 group overflow-hidden select-none"
    >
      {/* Top expanding gradient accent bar */}
      <span className="pointer-events-none absolute top-0 left-0 h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-blue-600 to-sky-400 transition-all duration-500 ease-out" />
      {/* Dynamic Cursor Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: cursor.active ? 1 : 0,
          background: `radial-gradient(400px circle at ${cursor.x}px ${cursor.y}px, rgba(37, 99, 235, 0.10), transparent 68%)`
        }}
      />

      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="p-3.5 rounded-2xl border bg-blue-50 border-blue-200/80 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:border-transparent transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-2xs">
            {getIcon(service.icon)}
          </div>
          <span className="text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 tracking-wider">
            {service.badge}
          </span>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            {service.highlight}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 transition-colors group-hover:text-blue-700">
            {service.title}
          </h3>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed font-normal">
            {service.description}
          </p>
        </div>

        <div className="pt-2">
          <p className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-2.5">
            Key Capabilities &amp; Deliverables:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
            {service.features.map((f, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-600" />
                <span className="leading-tight">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
        {isIt ? (
          <Link
            to="/contact-mdm"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:px-4 group-hover:py-1.5 rounded-full transition-all duration-300"
          >
            <span>Consult IT Engineering Team</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <Link
            to="/store"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:px-4 group-hover:py-1.5 rounded-full transition-all duration-300"
          >
            <span>Procure from DXHUB Wholesale Store</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </motion.div>
  );
};

const ServicesList = ({ activeTab }) => {
  const itServices = ServiceModel.getItSecurityServices();
  const nonItServices = ServiceModel.getNonItServices();
  const list = activeTab === 'it' ? itServices : nonItServices;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left"
      >
        {list.map((service, idx) => (
          <ServiceCard key={service.id} service={service} activeTab={activeTab} index={idx} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default ServicesList;
