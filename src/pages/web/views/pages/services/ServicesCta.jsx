/**
 * ServicesCta.jsx - [SERVICES SECTION]
 * Enterprise quote request & store visit call-to-action in Light Executive UI.
 */

import React from 'react';
import { Link } from 'react-router-dom';

const ServicesCta = () => {
  return (
    <div className="p-8 rounded-3xl bg-white text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-200/90 shadow-[0_8px_30px_-8px_rgba(15,23,42,0.06)]">
      <div className="space-y-2 text-center md:text-left">
        <h3 className="text-2xl font-black text-slate-900">Need a Customized Enterprise Quote?</h3>
        <p className="text-xs text-slate-600 max-w-lg">
          We provide custom software architectures, enterprise DPC provisioning, cloud DevOps, and wholesale retail supply.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/contact-mdm"
          className="px-6 py-3 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md"
        >
          Contact Enterprise Sales
        </Link>
        <Link
          to="/store"
          className="px-6 py-3 rounded-full text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 transition-colors shadow-sm"
        >
          Visit Store
        </Link>
      </div>
    </div>
  );
};

export default ServicesCta;
