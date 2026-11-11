/**
 * RetailerDashboardView.jsx - [VIEW PORTAL]
 * Point of Sale Workbench for local mobile shop retailer with sub-second device locks & enrollment.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Lock, 
  Unlock, 
  Search, 
  Plus, 
  QrCode, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle,
  Zap,
  ShoppingBag,
  X
} from 'lucide-react';
import { DeviceController } from '../../controllers/DeviceController';

const RetailerDashboardView = () => {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  // New Device Form State
  const [newDevice, setNewDevice] = useState({
    brand: 'Samsung',
    model: 'Galaxy A15 5G',
    imei1: '',
    imei2: '',
    customerName: '',
    customerPhone: '',
    totalLoan: 13999,
    emiAmount: 1750,
    totalEmis: 8,
    paidEmis: 1,
    nextDueDate: '2026-11-20'
  });

  const loadDevices = () => {
    setDevices(DeviceController.fetchAllDevices());
  };

  useEffect(() => {
    loadDevices();
  }, []);

  const handleToggleLock = async (deviceId) => {
    setLoading(true);
    setActionMessage('Broadcasting MQTT TLS 1.3 signal to hardware...');
    const res = await DeviceController.toggleLock(deviceId);
    setLoading(false);
    if (res.success) {
      loadDevices();
      setActionMessage(res.message);
      setTimeout(() => setActionMessage(''), 4500);
    }
  };

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    if (!newDevice.imei1 || !newDevice.customerName || !newDevice.customerPhone) {
      alert('Please fill in IMEI-1, Customer Name, and Customer Phone.');
      return;
    }

    setLoading(true);
    const res = await DeviceController.enrollDevice({
      ...newDevice,
      retailerName: 'Om Telecom & Electronics'
    });
    setLoading(false);

    if (res.success) {
      loadDevices();
      setShowEnrollModal(false);
      setActionMessage(res.message);
      setTimeout(() => setActionMessage(''), 4500);
      setNewDevice({
        brand: 'Samsung',
        model: 'Galaxy A15 5G',
        imei1: '',
        imei2: '',
        customerName: '',
        customerPhone: '',
        totalLoan: 13999,
        emiAmount: 1750,
        totalEmis: 8,
        paidEmis: 1,
        nextDueDate: '2026-11-20'
      });
    } else {
      alert(res.error);
    }
  };

  const filtered = devices.filter(
    d =>
      d.imei1.includes(search) ||
      d.customerName.toLowerCase().includes(search.toLowerCase()) ||
      d.brand.toLowerCase().includes(search.toLowerCase()) ||
      d.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* ── TOP BANNER ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
              Retailer Workbench (Tier 3)
            </span>
            <span className="text-xs text-slate-500 font-semibold">Store: Om Telecom (Patna Hub)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Financed Devices Command Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowEnrollModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Enroll New Device (QR)</span>
          </button>

          <Link
            to="/store"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
            <span>DXHUB Store</span>
          </Link>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Zap className="w-4 h-4 text-cyan-600" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* ── METRIC CARDS ────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-[11px] font-extrabold uppercase text-slate-500">Total Enrolled</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{devices.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-[11px] font-extrabold uppercase text-slate-500">Active Phones</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {devices.filter(d => d.status === 'ACTIVE').length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-[11px] font-extrabold uppercase text-slate-500">Locked / Overdue</p>
          <p className="text-2xl font-black text-rose-600 mt-1">
            {devices.filter(d => d.status === 'LOCKED').length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-[11px] font-extrabold uppercase text-slate-500">Retail Keys Balance</p>
          <p className="text-2xl font-black text-blue-600 mt-1">150 Keys</p>
        </div>
      </div>

      {/* ── SEARCH & FILTER ─────────────────────────────── */}
      <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <Search className="w-5 h-5 text-slate-400 ml-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by IMEI-1, Customer Name, Mobile Model..."
          className="w-full text-xs font-semibold outline-none bg-transparent"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-600 text-xs mr-2">
            Clear
          </button>
        )}
      </div>

      {/* ── DEVICE TABLE ────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px] tracking-wider">
                <th className="py-3 px-4">Device & Model</th>
                <th className="py-3 px-4">IMEI-1</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">EMI Status</th>
                <th className="py-3 px-4">Lock Status</th>
                <th className="py-3 px-4 text-right">Hardware Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{d.brand} {d.model}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{d.imei1}</td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{d.customerName}</p>
                    <p className="text-[10px] text-slate-500">{d.customerPhone}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-700">₹{d.emiAmount}/mo</span>
                    <span className="text-[10px] text-slate-400 block">Due: {d.nextDueDate}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-black text-[10px] uppercase tracking-wider ${
                        d.status === 'LOCKED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {d.status === 'LOCKED' ? '🔒 Locked' : '🟢 Active'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleToggleLock(d.id)}
                      disabled={loading}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                        d.status === 'LOCKED'
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-rose-600 hover:bg-rose-700 text-white'
                      }`}
                    >
                      {d.status === 'LOCKED' ? (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span>Unlock</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Lock Device</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ENROLL DEVICE MODAL ─────────────────────────── */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-black text-slate-900">Provision New Device</h3>
              </div>
              <button
                onClick={() => setShowEnrollModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Fill the customer financing details below. The 6-tap QR payload will be bound to the IMEI.
            </p>

            <form onSubmit={handleEnrollSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Brand</label>
                  <input
                    type="text"
                    value={newDevice.brand}
                    onChange={(e) => setNewDevice({ ...newDevice, brand: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Model</label>
                  <input
                    type="text"
                    value={newDevice.model}
                    onChange={(e) => setNewDevice({ ...newDevice, model: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">IMEI-1 (15 Digits) *</label>
                <input
                  type="text"
                  maxLength="15"
                  value={newDevice.imei1}
                  onChange={(e) => setNewDevice({ ...newDevice, imei1: e.target.value })}
                  placeholder="869018274019283"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Customer Name *</label>
                  <input
                    type="text"
                    value={newDevice.customerName}
                    onChange={(e) => setNewDevice({ ...newDevice, customerName: e.target.value })}
                    placeholder="e.g. Amit Kumar"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Customer Phone *</label>
                  <input
                    type="tel"
                    value={newDevice.customerPhone}
                    onChange={(e) => setNewDevice({ ...newDevice, customerPhone: e.target.value })}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Monthly EMI (₹)</label>
                  <input
                    type="number"
                    value={newDevice.emiAmount}
                    onChange={(e) => setNewDevice({ ...newDevice, emiAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Total Loan (₹)</label>
                  <input
                    type="number"
                    value={newDevice.totalLoan}
                    onChange={(e) => setNewDevice({ ...newDevice, totalLoan: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>{loading ? 'Generating Onboarding Token...' : 'Enroll & Generate 6-Tap QR'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default RetailerDashboardView;

