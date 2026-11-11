/**
 * SixTapSetupGuide.jsx - [DOWNLOAD SECTION]
 * Enterprise 6-Tap QR rapid provisioning visual walkthrough.
 */

import React from 'react';
import { QrCode, AlertCircle } from 'lucide-react';

const SixTapSetupGuide = () => {
  return (
    <div className="bg-white text-slate-900 rounded-3xl p-8 border border-slate-200/80 shadow-lg space-y-6">
      <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
        <QrCode className="w-4 h-4" />
        <span>Enterprise QR Provisioning Protocol</span>
      </div>

      <h3 className="text-2xl font-black tracking-tight text-slate-900">
        How to Provision a Fresh Device (Under 90s)
      </h3>

      <div className="space-y-4 text-xs sm:text-sm text-slate-600">
        <div className="flex items-start gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 text-xs border border-blue-200">
            1
          </span>
          <div>
            <strong className="text-slate-900 block">Power on the Fresh Smartphone</strong>
            At the initial Welcome / "Start" screen of Android, tap 6 times consecutively anywhere on the blank white space.
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 text-xs border border-blue-200">
            2
          </span>
          <div>
            <strong className="text-slate-900 block">Camera QR Scanner Automatically Opens</strong>
            The device initiates the hidden Android Enterprise provisioning camera scanner.
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 text-xs border border-blue-200">
            3
          </span>
          <div>
            <strong className="text-slate-900 block">Scan Retailer Setup QR Code</strong>
            Point the camera at the enrollment QR generated on your Retailer Dashboard workbench.
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 text-xs border border-blue-200">
            4
          </span>
          <div>
            <strong className="text-slate-900 block">Automated Background Lockdown</strong>
            The DPC downloads, binds Device Owner status, permanently disables Recovery Key wipe, and establishes sub-second MQTT telemetry.
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3 text-xs text-blue-800">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
        <span>
          Once enrolled, standard users cannot uninstall, disable device admin, or bypass the offline cryptographic timer.
        </span>
      </div>
    </div>
  );
};

export default SixTapSetupGuide;

