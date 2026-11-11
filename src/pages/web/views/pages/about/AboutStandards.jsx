/**
 * AboutStandards.jsx - [ABOUT SECTION]
 * Compliance certifications & hardware security standards styled in crisp Daylight UI.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const STANDARDS = [
  {
    title: 'Android Enterprise DPC Certified (IT)',
    desc: 'Runs as a trusted Device Owner application with strict administrative integrity controls.'
  },
  {
    title: 'AWS Cloud & ISO 27001 Security (IT)',
    desc: 'Enterprise AWS cloud hosting with 99.99% uptime SLA and TLS 1.3 cryptographic data transmission.'
  },
  {
    title: 'BIS Indian Safety Certification (Non-IT)',
    desc: 'All GaN chargers, powerbanks, and appliances comply with Bureau of Indian Standards electrical safety.'
  },
  {
    title: 'OEM 1+2 Year Warranty & Insured Freight (Non-IT)',
    desc: 'Direct manufacturer backed warranties and 100% insured multi-district logistics transit.'
  }
];

const AboutStandards = () => {
  return (
    <div className="space-y-6 text-left select-none">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35 }}
        className="p-7 sm:p-9 rounded-3xl border border-slate-200/85 bg-white shadow-[0_8px_30px_-8px_rgba(15,23,42,0.05)] space-y-6"
      >
        <h3 className="text-2xl font-black text-slate-900">
          Enterprise Standards &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Security Certifications
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-600">
          {STANDARDS.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 p-4 rounded-2xl bg-[#f8faff] border border-slate-200/75 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-300"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-bold">{item.title}</strong>
                <span className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#eff6ff] via-[#f6f9ff] to-[#eef2ff] border border-blue-200/80 shadow-xs">
        <div>
          <h4 className="font-extrabold text-slate-900 text-base">
            Want to collaborate or partner with DXHUB?
          </h4>
          <p className="text-xs sm:text-[13px] text-slate-600 mt-0.5">
            Discuss software engineering projects or regional wholesale supply partnerships.
          </p>
        </div>
        <Link
          to="/contact-mdm"
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-600/20 hover:-translate-y-0.5 transition-all"
        >
          <span>Connect with Our Team</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default AboutStandards;
