/**
 * CustomerPortalView.jsx - [VIEW PORTAL]
 * Customer Self-Service EMI Payment & Instant Hardware Auto-Unlock Portal.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  QrCode, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  ArrowRight, 
  ShoppingBag,
  Zap,
  CreditCard,
  AlertTriangle
} from 'lucide-react';
import { DeviceController } from '../../controllers/DeviceController';

const CustomerPortalView = () => {
  const [identifier, setIdentifier] = useState('864209051839201'); // Default test IMEI
  const [device, setDevice] = useState(null);
  const [utrNumber, setUtrNumber] = useState('');
  const [paying, setPaying] = useState(false);
  const [alert, setAlert] = useState({ type: '', text: '' });

  const handleSearch = (e) => {
    e.preventDefault();
    setAlert({ type: '', text: '' });
    const found = DeviceController.getDeviceById(identifier.trim());
    if (found) {
      setDevice(found);
    } else {
      setDevice(null);
      setAlert({ type: 'error', text: 'No device found for this IMEI or Phone. Please verify and try again.' });
    }
  };

  const handlePayAndUnlock = async (e) => {
    e.preventDefault();
    if (!device) return;
    setPaying(true);
    setAlert({ type: '', text: '' });

    const res = await DeviceController.payEmiAndAutoUnlock(device.id, utrNumber);
    setPaying(false);

    if (res.success) {
      setDevice(res.device);
      setAlert({ type: 'success', text: res.message });
      setUtrNumber('');
    } else {
      setAlert({ type: 'error', text: res.error });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* ── HEADER ──────────────────────────────────────── */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-800">
          Customer Self-Service (Tier 4)
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Customer EMI Payment & Auto-Unlock
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          If your financed phone is locked due to an overdue installment, pay your EMI via UPI below to unlock your device instantly.
        </p>
      </div>

      {/* ── LOOKUP FORM ─────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-black text-slate-900">Enter Phone IMEI or Mobile Number</h3>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter 15-digit IMEI-1 or 10-digit Phone..."
            required
            className="flex-grow px-4 py-3 rounded-xl border border-slate-300 font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
          >
            Find My Device
          </button>
        </form>
      </div>

      {alert.text && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn ${
            alert.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {alert.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{alert.text}</span>
        </div>
      )}

      {/* ── DEVICE DETAILS & UPI UNLOCK SECTION ──────────── */}
      {device && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm items-start">
          
          {/* Device info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Smartphone className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">{device.brand} {device.model}</h3>
                <p className="text-xs text-slate-500 font-mono">IMEI: {device.imei1}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Customer Name:</span>
                <strong className="text-slate-900">{device.customerName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Monthly EMI Due:</span>
                <strong className="text-blue-600 text-sm">₹{device.emiAmount}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Due Date:</span>
                <strong className="text-slate-900">{device.nextDueDate}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Hardware Status:</span>
                <span
                  className={`font-black uppercase tracking-wider text-[11px] ${
                    device.status === 'LOCKED' ? 'text-rose-600' : 'text-emerald-600'
                  }`}
                >
                  {device.status === 'LOCKED' ? '🔒 Remote Locked' : '🟢 Active & Unlocked'}
                </span>
              </div>
            </div>

            {device.status === 'LOCKED' && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                <strong>Reason:</strong> {device.lockReason || 'EMI Overdue Security Lockdown'}
              </div>
            )}
          </div>

          {/* Dynamic UPI Payment Card */}
          <div className="md:col-span-6 bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <QrCode className="w-4 h-4" />
                Dynamic Retail UPI QR
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-extrabold uppercase">
                Instant Auto-Unlock
              </span>
            </div>

            {/* UPI QR Display */}
            <div className="bg-white p-4 rounded-xl text-center max-w-[200px] mx-auto shadow-md">
              <div className="w-36 h-36 mx-auto bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center p-2">
                <QrCode className="w-24 h-24 text-slate-800" />
                <span className="text-[9px] font-mono font-bold text-slate-600 mt-1">UPI: dxhub@icici</span>
              </div>
              <p className="text-[11px] font-extrabold text-slate-900 mt-2">Scan & Pay ₹{device.emiAmount}</p>
            </div>

            {/* UTR Form */}
            <form onSubmit={handlePayAndUnlock} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 uppercase font-bold text-[10px] mb-1">
                  12-Digit Bank UTR / UPI Reference Number
                </label>
                <input
                  type="text"
                  maxLength="16"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  placeholder="e.g. 431092819023"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 font-mono text-cyan-300 outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                disabled={paying}
                className="w-full py-2.5 rounded-xl text-xs font-extrabold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Zap className="w-4 h-4" />
                <span>{paying ? 'Verifying with Bank Network...' : 'Verify Payment & Unlock Device'}</span>
              </button>
            </form>
          </div>

        </div>
      )}

      {/* ── FOOTER LINK ─────────────────────────────────── */}
      <div className="text-center pt-4">
        <Link
          to="/store"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600"
        >
          <ShoppingBag className="w-4 h-4 text-amber-500" />
          <span>Explore Smartphones & Accessories on DXHUB Store</span>
        </Link>
      </div>

    </div>
  );
};

export default CustomerPortalView;

