/**
 * PortalLoginView.jsx - [VIEW PORTAL]
 * 4-Tier Portal Login with 1-Click Quick Demo Switchers.
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  Users, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { AuthController } from '../../controllers/AuthController';
import { TIERS } from '../../models/UserModel';

const PortalLoginView = () => {
  const navigate = useNavigate();
  const demoUsers = AuthController.getAvailableRoles();

  const [emailOrPhone, setEmailOrPhone] = useState('retailer@dxhub.in');
  const [pin, setPin] = useState('5500');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoleQuickSelect = async (role) => {
    setLoading(true);
    const res = await AuthController.loginAsDemoRole(role);
    setLoading(false);
    if (res.success) {
      redirectToRoleDashboard(role);
    }
  };

  const handleFormLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await AuthController.loginWithPin(emailOrPhone, pin);
    setLoading(false);

    if (res.success) {
      redirectToRoleDashboard(res.user.role);
    } else {
      setError(res.error);
    }
  };

  const redirectToRoleDashboard = (role) => {
    if (role === TIERS.SUPER_DISTRIBUTOR) navigate('/portal/super-distributor');
    else if (role === TIERS.DISTRIBUTOR) navigate('/portal/distributor');
    else if (role === TIERS.RETAILER) navigate('/portal/retailer');
    else if (role === TIERS.CUSTOMER) navigate('/portal/customer');
    else navigate('/portal/retailer');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      
      {/* ── HEADER ──────────────────────────────────────── */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <Lock className="w-3.5 h-3.5" />
          Enterprise Access Gate
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          DXHUB Command & Dealer Portals
        </h1>
        <p className="text-slate-600 text-sm">
          Select your supply chain tier below for instant 1-click access, or sign in with your PIN.
        </p>
      </div>

      {/* ── 1-CLICK QUICK ACCESS DEMO TIERS ─────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-extrabold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            1-Click Quick Demo Login (Instant Simulation)
          </span>
          <span className="text-[11px] text-slate-400">Click any role to test</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {demoUsers.map((u) => (
            <button
              key={u.role}
              onClick={() => handleRoleQuickSelect(u.role)}
              className="text-left p-4 rounded-2xl border border-slate-200/90 hover:border-blue-500 hover:bg-blue-50/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700">
                  {u.badge}
                </span>
                <h4 className="font-black text-slate-900 text-sm mt-2">{u.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{u.name}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>Enter Portal</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── PIN LOGIN FORM ──────────────────────────────── */}
      <div className="max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <h3 className="text-lg font-black text-slate-900">Credential / PIN Login</h3>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleFormLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">
              Registered Email or Phone
            </label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">
              4-Digit Security PIN
            </label>
            <input
              type="password"
              maxLength="6"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono tracking-widest"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-extrabold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
          </button>
        </form>

        <div className="pt-3 border-t border-slate-100 text-center">
          <Link
            to="/store"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Looking for shopping? Go to DXHUB Store</span>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default PortalLoginView;

