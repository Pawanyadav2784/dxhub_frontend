/**
 * SuperDistributorDashboardView.jsx - [VIEW PORTAL]
 * Zonal Apex Command Workbench managing 5,000+ master cryptographic keys pool.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Layers, 
  Send, 
  Globe2, 
  ShoppingBag,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { KeyController } from '../../controllers/KeyController';

const SuperDistributorDashboardView = () => {
  const [stats, setStats] = useState(KeyController.fetchStats());
  const [targetHub, setTargetHub] = useState('Patna Regional Hub');
  const [qty, setQty] = useState(500);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');

  const handleApexTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotice('');

    const res = await KeyController.allocateKeys({
      fromRole: 'super_distributor',
      toRole: 'distributor',
      receiverName: targetHub,
      quantity: qty
    });
    setLoading(false);

    if (res.success) {
      setStats({ ...res.stats });
      setNotice(`✅ Dispatched ${qty} cryptographic keys from Apex Pool to ${targetHub}!`);
      setTimeout(() => setNotice(''), 4500);
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* ── HEADER ──────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
            Zonal Apex Command (Tier 1)
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Zonal Head Licensing & Revenue Pool
          </h1>
          <p className="text-xs text-slate-500">North & Eastern Zone Territory Head</p>
        </div>

        <Link
          to="/store"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
          <span>DXHUB Store</span>
        </Link>
      </div>

      {notice && (
        <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold animate-fadeIn">
          {notice}
        </div>
      )}

      {/* ── METRIC CARDS ────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md">
          <p className="text-xs font-extrabold uppercase text-cyan-400">Master Reserve Pool</p>
          <p className="text-3xl font-black text-white mt-2">{stats.superDistributorPool} Keys</p>
          <p className="text-[10px] text-slate-400 mt-1">Apex Zonal Reserve</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <p className="text-xs font-extrabold uppercase text-slate-500">Allocated Downstream</p>
          <p className="text-3xl font-black text-blue-600 mt-2">{stats.superDistributorAllocated} Keys</p>
          <p className="text-[10px] text-slate-400 mt-1">To 8 Regional City Hubs</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <p className="text-xs font-extrabold uppercase text-slate-500">Active Retail Fleet</p>
          <p className="text-3xl font-black text-emerald-600 mt-2">1,280+ Phones</p>
          <p className="text-[10px] text-slate-400 mt-1">Real-time sync across zone</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <p className="text-xs font-extrabold uppercase text-slate-500">Recovery Rate</p>
          <p className="text-3xl font-black text-amber-500 mt-2">99.4%</p>
          <p className="text-[10px] text-slate-400 mt-1">Zero NPA benchmark</p>
        </div>
      </div>

      {/* ── APEX DISPATCH FORM ──────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Send className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-black text-slate-900">Zonal Tranche Dispatch (To Regional City Hubs)</h3>
        </div>

        <form onSubmit={handleApexTransfer} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Target Regional Hub</label>
            <select
              value={targetHub}
              onChange={(e) => setTargetHub(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 outline-none bg-white font-semibold"
            >
              <option value="Patna Regional Hub">Patna Regional Hub (Bihar)</option>
              <option value="Varanasi Regional Hub">Varanasi Regional Hub (East UP)</option>
              <option value="Ranchi Regional Hub">Ranchi Regional Hub (Jharkhand)</option>
              <option value="Kolkata North Hub">Kolkata North Hub (West Bengal)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Key Tranche Quantity</label>
            <input
              type="number"
              min="50"
              max={stats.superDistributorPool}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 outline-none font-bold text-slate-900"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading || stats.superDistributorPool < qty}
              className="w-full py-2.5 rounded-xl text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>{loading ? 'Processing Cryptographic Tranche...' : 'Dispatch Tranche'}</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default SuperDistributorDashboardView;

