/**
 * AboutMetrics.jsx - [ABOUT SECTION]
 * Clean Unified Light Executive Enterprise Metrics Strip with smooth scroll reveal.
 */

import React from 'react';
import { motion } from 'framer-motion';

const METRICS = [
  { value: '250+', label: 'Enterprise IT Projects', color: 'text-blue-600' },
  { value: '3,200+', label: 'Partner Retail Hubs', color: 'text-indigo-600' },
  { value: '99.99%', label: 'Cloud Uptime SLA', color: 'text-emerald-600' },
  { value: '120K+', label: 'Secured Devices', color: 'text-amber-600' }
];

const AboutMetrics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 border border-blue-100/90 shadow-[0_12px_36px_-12px_rgba(37,99,235,0.08)]"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x-0 lg:divide-x divide-slate-100">
        {METRICS.map((item) => (
          <div key={item.label} className="group transition-transform duration-200 hover:-translate-y-0.5">
            <p className={`text-3xl sm:text-4xl font-black ${item.color}`}>{item.value}</p>
            <p className="text-xs uppercase font-bold text-slate-500 mt-1 tracking-wider">{item.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AboutMetrics;
