/**
 * AppDownloadView.jsx - [PAGE VIEW]
 * Modular APK Download View combining decoupled download card & 6-tap setup guide.
 */

import React from 'react';
import ApkDownloadCard from './download/ApkDownloadCard';
import SixTapSetupGuide from './download/SixTapSetupGuide';

const AppDownloadView = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-red-600 uppercase tracking-widest px-3 py-1 bg-red-50 rounded-full border border-red-200">
          Official Client Release
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Download DXHUB DPC Client
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Engineered as an Android Enterprise Device Policy Controller (DPC). Runs invisibly with zero user-end uninstall ability and sub-second push connectivity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6">
          <ApkDownloadCard />
        </div>
        <div className="lg:col-span-6">
          <SixTapSetupGuide />
        </div>
      </div>
    </div>
  );
};

export default AppDownloadView;
