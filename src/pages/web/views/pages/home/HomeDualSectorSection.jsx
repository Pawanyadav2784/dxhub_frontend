/**
 * HomeDualSectorSection.jsx - [SECTION VIEW]
 * World-Class 3D Interactive Mouse Parallax Dual-Sector Enterprise Showcase.
 * Sector 1: Full-Stack IT & Cloud Engineering (Websites, Mobile Apps, AWS DevOps, SEO, Sentinel MDM, Cyber Security)
 * Sector 2: Non-IT Wholesale Consumer Electronics & Regional Supply Chain (Smart Appliances, Mobile Fleet, Fast Chargers, Logistics)
 */

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Tv, 
  Store, 
  Sparkles, 
  Smartphone,
  Globe,
  Cloud,
  TrendingUp,
  Cpu,
  Layers,
  KeyRound,
  Server,
  Code2
} from 'lucide-react';
import Trolley3DIcon from '../../components/Trolley3DIcon';

// ── 3D MOUSE PARALLAX BENTO CARD ────────────────────
const ParallaxSectorCard = ({ title, highlight, description, icon: Icon, features, badge, ctaText, ctaLink, image, accent = 'cyan' }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotate({
      x: -((y - centerY) / centerY) * 10,
      y: ((x - centerX) / centerX) * 10,
    });
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setSpotlight({ x: 0, y: 0, opacity: 0 });
  };

  const isCyan = accent === 'cyan';
  const isAmber = accent === 'amber';
  const isPurple = accent === 'purple';
  const isEmerald = accent === 'emerald';

  const getBorderHover = () => {
    if (isAmber) return 'hover:border-amber-400 hover:shadow-amber-500/20';
    if (isPurple) return 'hover:border-purple-400 hover:shadow-purple-500/20';
    if (isEmerald) return 'hover:border-emerald-400 hover:shadow-emerald-500/20';
    return 'hover:border-cyan-400 hover:shadow-cyan-500/25';
  };

  const getIconColor = () => {
    if (isAmber) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    if (isPurple) return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    if (isEmerald) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.15s ease-out, border-color 0.25s, box-shadow 0.25s'
      }}
      className={`relative p-7 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-5 group overflow-hidden select-none ${getBorderHover()}`}
    >
      {/* Dynamic Cursor Spotlight Aura */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, ${
            isAmber ? 'rgba(245, 158, 11, 0.18)' : isEmerald ? 'rgba(16, 185, 129, 0.18)' : isPurple ? 'rgba(168, 85, 247, 0.18)' : 'rgba(6, 182, 212, 0.18)'
          }, transparent 70%)`
        }}
      />

      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-2xl border ${getIconColor()} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md`}>
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {badge}
          </span>
        </div>

        <div>
          <span className={`text-xs font-black uppercase tracking-wider ${isAmber ? 'text-amber-400' : isEmerald ? 'text-emerald-400' : isPurple ? 'text-purple-400' : 'text-cyan-400'}`}>
            {highlight}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1 group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Optional Embedded Real Product Preview Strip */}
        {image && (
          <div className="h-32 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-center p-2.5 my-2 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="max-h-28 object-contain group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 drop-shadow-lg"
            />
          </div>
        )}

        <div className="pt-2">
          <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2">
            Enterprise Deliverables:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-300">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isAmber ? 'text-amber-400' : isEmerald ? 'text-emerald-400' : isPurple ? 'text-purple-400' : 'text-cyan-400'}`} />
                <span className="leading-tight">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between relative z-10">
        <Link
          to={ctaLink}
          className={`inline-flex items-center gap-2 text-xs font-black group-hover:translate-x-1 transition-transform ${isAmber ? 'text-amber-400 hover:text-amber-300' : 'text-cyan-400 hover:text-cyan-300'}`}
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

const HomeDualSectorSection = () => {
  const [activeSector, setActiveSector] = useState('it'); // 'it' | 'non-it'

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10 select-none">
      <div className="space-y-10 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-black uppercase tracking-wider shadow-lg shadow-cyan-500/10 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dual Ecosystem Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Integrated IT Engineering &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                Non-IT Wholesale Commerce
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Explore how DXHUB bridges the gap between deep-tech software infrastructure (custom websites, apps, AWS cloud, and MDM hardware lockouts) and direct factory wholesale distribution of smart consumer electronics.
            </p>
          </div>

          <Link
            to="/store"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all duration-300 shadow-md shadow-cyan-500/25 shrink-0"
          >
            <Trolley3DIcon className="w-4 h-4" />
            <span>Visit DXHUB Store</span>
          </Link>
        </div>

        {/* ── SECTOR TOGGLE CONTROLLER ────────────────── */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-xl w-fit">
          <button
            onClick={() => setActiveSector('it')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeSector === 'it'
                ? 'bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Code2 className="w-4 h-4 text-slate-950" />
            <span>Sector 1: Full-Stack IT & Cloud Solutions</span>
          </button>

          <button
            onClick={() => setActiveSector('non-it')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeSector === 'non-it'
                ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Tv className="w-4 h-4 text-slate-950" />
            <span>Sector 2: Non-IT Wholesale Electronics</span>
          </button>
        </div>

        {/* ── SECTOR 1: ADVANCED IT SOLUTIONS GRID ─────── */}
        {activeSector === 'it' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 animate-fade-in">
            <ParallaxSectorCard
              title="Custom Web & Enterprise Portals"
              highlight="React 19 • Next.js • High-Speed Web"
              description="Bespoke corporate websites, high-converting retail portals, and custom dealer dashboards built with 3D UI, zero latency, and seamless payment gateways."
              icon={Globe}
              badge="Web Engineering"
              accent="cyan"
              ctaText="Explore Web Development"
              ctaLink="/services-mdm"
              features={[
                'Sub-second page speeds & 99+ Core Web Vitals',
                'Scalable React, Next.js, and Tailwind architecture',
                'Custom B2B dealer billing & inventory portals',
                'Multi-gateway UPI, Razorpay, and Card checkouts'
              ]}
            />

            <ParallaxSectorCard
              title="Native Mobile Apps & Sentinel DPC"
              highlight="Android • iOS • Enterprise DPC"
              description="Native Kotlin and cross-platform Flutter mobile applications. Powers our proprietary Android Enterprise Device Policy Controller (DPC) with permanent background persistence."
              icon={Smartphone}
              badge="Mobile Engineering"
              accent="purple"
              ctaText="Explore Mobile Solutions"
              ctaLink="/services-mdm"
              features={[
                'Foreground persistence with zero OS kill',
                'Offline-first SQLite cryptographic database',
                'Instant push telemetry via MQTT TLS 1.3',
                'Dynamic lock screen overlay with live UPI QR'
              ]}
            />

            <ParallaxSectorCard
              title="AWS Cloud Infrastructure & DevOps"
              highlight="AWS EC2 • S3 • RDS • CI/CD"
              description="Enterprise cloud hosting with automated multi-region backup systems, containerized Docker/Kubernetes clusters, and serverless architectures with guaranteed 99.99% uptime."
              icon={Cloud}
              badge="Cloud & DevOps"
              accent="cyan"
              ctaText="Explore Cloud Architecture"
              ctaLink="/services-mdm"
              features={[
                'Elastic auto-scaling for 100K+ concurrent users',
                'Automated CI/CD deployment pipelines',
                'AWS RDS PostgreSQL & MongoDB clusters',
                'CloudFront edge CDN for global instant loading'
              ]}
            />

            <ParallaxSectorCard
              title="Technical SEO & Digital Growth"
              highlight="Google Top Rank • Organic Traffic"
              description="Data-driven search engine optimization, semantic schema markup, keyword taxonomy dominance, and conversion optimization to rank your business at the top of Google."
              icon={TrendingUp}
              badge="SEO & Growth"
              accent="emerald"
              ctaText="Explore SEO Services"
              ctaLink="/services-mdm"
              features={[
                'Top rankings across Tier-1/2/3 local markets',
                'Automated structured data (JSON-LD) generation',
                'Asset compression for 95+ Google PageSpeed',
                'Comprehensive Google Analytics 4 tracking'
              ]}
            />
          </div>
        )}

        {/* ── SECTOR 2: NON-IT WHOLESALE COMMERCE GRID ──── */}
        {activeSector === 'non-it' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 animate-fade-in">
            <ParallaxSectorCard
              title="Wholesale Smart 4K TVs & Appliances"
              highlight="Direct Factory B2B Margins Up to 35%"
              description="Direct factory wholesale distribution of high-demand 4K Ultra HD Smart TVs, Inverter Refrigerators, and Split ACs for offline retail showrooms across India."
              icon={Tv}
              badge="Smart Appliances"
              accent="amber"
              image="/categories/appliances.png"
              ctaText="Browse Wholesale Showroom"
              ctaLink="/store"
              features={[
                'Direct dispatch from factory manufacturing lines',
                '1+2 Year official manufacturer replacement warranties',
                'Doorstep freight delivery with free installation',
                'Flexible trade credit lines for registered dealers'
              ]}
            />

            <ParallaxSectorCard
              title="Financed 5G Mobiles & Gadgets Fleet"
              highlight="High-Demand Showroom Stock"
              description="Priority retail allocation of high-demand 5G smartphones, 4G cellular smartwatches, and wireless audio equipment with zero customer default risk via Sentinel MDM."
              icon={Smartphone}
              badge="Mobile Fleet"
              accent="cyan"
              image="/categories/mobiles.png"
              ctaText="Order Mobile Inventory"
              ctaLink="/store"
              features={[
                'Instant IMEI onboarding with Sentinel MDM',
                'Top-tier inventory pools: Samsung, Realme, Xiaomi',
                'High customer showroom footfall turnover',
                'Protected wholesale dealer restocking rates'
              ]}
            />

            <ParallaxSectorCard
              title="Showroom GaN 65W Fast Chargers"
              highlight="High Retail Margin Goods (Up to 45%)"
              description="Ultra-compact Gallium Nitride (GaN) III multi-port chargers, heavy-duty braided 100W cables, and counter display merchandiser kits engineered for fast retail counter turn."
              icon={Zap}
              badge="High Margin Retail"
              accent="emerald"
              image="/categories/chargers.png"
              ctaText="Procure Counter Accessories"
              ctaLink="/store"
              features={[
                'Up to 45% retailer profit margin per unit',
                'BIS Indian safety certified electrical engineering',
                'Free premium acrylic showroom display racks',
                '1-Year instant counter replacement warranty'
              ]}
            />

            <ParallaxSectorCard
              title="4-Tier Supply Chain & Insured Freight"
              highlight="Sub-48-Hour Regional Delivery SLA"
              description="Multi-district supply chain and insured logistics network connecting Super Distributors, City Master Distributors, and 3,200+ local retail store showrooms."
              icon={Layers}
              badge="Regional Supply Chain"
              accent="purple"
              ctaText="Join Distribution Network"
              ctaLink="/contact-mdm"
              features={[
                'Exclusive territorial dealership allocation',
                '100% insured transit against damage or transit loss',
                'Sub-48-hour delivery timeline to remote stores',
                'Transparent multi-tier volume rebate bonuses'
              ]}
            />
          </div>
        )}

      </div>
    </section>
  );
};

export default HomeDualSectorSection;
