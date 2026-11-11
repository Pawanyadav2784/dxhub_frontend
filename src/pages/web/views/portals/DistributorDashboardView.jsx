/**
 * DistributorDashboardView.jsx - [VIEW PORTAL]
 * City Distributor Regional Hub for allocating license batches to local mobile shops.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Layers, 
  Send, 
  CheckCircle2, 
  Store, 
  ShoppingBag,
  Zap
} from 'lucide-react';
import { KeyController } from '../../controllers/KeyController';

const DistributorDashboardView = () => {
  const [stats, setStats] = useState(KeyController.fetchStats());
  const [transferTarget, setTransferTarget] = useState('Om Telecom & Electronics');
  const [transferQty, setTransferQty] = useState(25);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotice('');

    const res = await KeyController.allocateKeys({
      fromRole: 'distributor',
      toRole: 'retailer',
      receiverName: transferTarget,
      quantity: transferQty
    });
    setLoading(false);

    if (res.success) {
      setStats({ ...res.stats });
      setNotice(`✅ Successfully transferred ${transferQty} digital keys to ${transferTarget}!`);
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
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
            City Distributor Hub (Tier 2)
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Regional Channel & License Transfer
          </h1>
          <p className="text-xs text-slate-500">Patna Metro Regional Operations</p>
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
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-fadeIn">
          {notice}
        </div>
      )}

      {/* ── METRIC CARDS ────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <p className="text-xs font-extrabold uppercase text-slate-500">Available Key Pool</p>
          <p className="text-3xl font-black text-cyan-600 mt-2">{stats.cityDistributorPool} Keys</p>
          <p className="text-[11px] text-slate-400 mt-1">Ready for retail dispatch</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <p className="text-xs font-extrabold uppercase text-slate-500">Dispatched Downstream</p>
          <p className="text-3xl font-black text-blue-600 mt-2">{stats.cityDistributorAllocated} Keys</p>
          <p className="text-[11px] text-slate-400 mt-1">Across 42 active mobile shops</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <p className="text-xs font-extrabold uppercase text-slate-500">Retailer Fleet Status</p>
          <p className="text-3xl font-black text-emerald-600 mt-2">99.2% Uptime</p>
          <p className="text-[11px] text-slate-400 mt-1">Sub-second telemetry active</p>
        </div>
      </div>

      {/* ── BATCH ALLOCATION FORM & RECENT LEDGER ────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Transfer Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-cyan-600" />
            <h3 className="text-lg font-black text-slate-900">Transfer Keys to Retailer</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Allocate license quota from your City Hub pool directly to a registered retail shop.
          </p>

          <form onSubmit={handleTransfer} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Select Retail Partner</label>
              <select
                value={transferTarget}
                onChange={(e) => setTransferTarget(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 outline-none bg-white font-semibold"
              >
                <option value="Om Telecom & Electronics">Om Telecom (Fraser Road)</option>
                <option value="Gupta Mobile Gallery">Gupta Mobile (Boring Road)</option>
                <option value="Sri Balaji Communications">Sri Balaji (Kankarbagh)</option>
                <option value="Patna Tech World">Patna Tech World (Exhibition Rd)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Key Quantity</label>
              <input
                type="number"
                min="5"
                max={stats.cityDistributorPool}
                value={transferQty}
                onChange={(e) => setTransferQty(Number(e.target.value))}
                required
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 outline-none font-bold text-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading || stats.cityDistributorPool < transferQty}
              className="w-full py-3 rounded-xl text-xs font-extrabold text-white bg-cyan-600 hover:bg-cyan-700 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Authorizing Transfer...' : 'Execute Key Allocation'}</span>
            </button>
          </form>
        </div>

        {/* Ledger */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-black text-slate-900">Recent Batch Ledger</h3>
          <div className="space-y-2 text-xs">
            {stats.batches.map((b, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">{b.batchId} ➔ {b.receiver}</p>
                  <p className="text-[10px] text-slate-500">From: {b.sender} • Date: {b.date}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-cyan-700 text-sm">+{b.quantity} Keys</span>
                  <span className="text-[9px] block text-emerald-600 font-extrabold uppercase">{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default DistributorDashboardView;

