/**
 * ApkDownloadCard.jsx - [DOWNLOAD SECTION]
 * Official APK download card, specifications & SHA-256 hash.
 */

import React, { useState } from 'react';
import { Download, Smartphone, ShieldCheck, Copy, Check } from 'lucide-react';

const ApkDownloadCard = () => {
  const [copied, setCopied] = useState(false);
  const checksum = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  const handleCopyChecksum = () => {
    navigator.clipboard.writeText(checksum);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <Smartphone className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">DXHUB Locker DPC</h3>
            <p className="text-xs text-slate-500">Version 4.2.8 (Build 4280)</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
          Verified Production
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
        <div className="flex justify-between py-1 border-b border-slate-200">
          <span className="text-slate-500">File Size:</span>
          <strong className="text-slate-900">4.8 MB (Ultra-Lightweight)</strong>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-200">
          <span className="text-slate-500">Battery Footprint:</span>
          <strong className="text-emerald-600">&lt;0.8% per 24 hours</strong>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-200">
          <span className="text-slate-500">Android Compatibility:</span>
          <strong className="text-slate-900">Android 9.0 up to Android 15</strong>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-slate-500">Hardware Hooks:</span>
          <strong className="text-slate-900">Knox, MediaTek & Unisoc Guard</strong>
        </div>
      </div>

      {/* SHA-256 Checksum */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 uppercase">SHA-256 Checksum</span>
          <button
            onClick={handleCopyChecksum}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Hash'}</span>
          </button>
        </div>
        <p className="p-2.5 rounded-xl bg-slate-100 font-mono text-[11px] text-slate-600 break-all select-all">
          {checksum}
        </p>
      </div>

      {/* Download Button */}
      <a
        href="#download-apk"
        onClick={(e) => {
          e.preventDefault();
          alert('Downloading official DXHUB Enterprise DPC client package (v4.2.8-prod.apk)...');
        }}
        className="w-full py-3.5 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all"
      >
        <Download className="w-5 h-5" />
        <span>Download DXHUB DPC APK (v4.2.8)</span>
      </a>

      <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Signed with DXHUB Master Production Cryptographic Key</span>
      </div>
    </div>
  );
};

export default ApkDownloadCard;

