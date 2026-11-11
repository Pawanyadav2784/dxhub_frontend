/**
 * HomeFleetShowcase.jsx - [SECTION VIEW]
 * Staggered Multi-Product Hardware Fleet Showcase with 3D Mouse Parallax & Dynamic Spotlight.
 * Features:
 * - Real category images (mobiles, smartwatch, appliances, chargers, speaker, powerbank)
 * - Individual card 3D tilt & dynamic mouse cursor spotlight on hover
 * - Sequential one-by-one staggered entrance animation (Framer Motion)
 * - Elegant luxury dark obsidian glassmorphism aesthetic
 */

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Smartphone, 
  Watch, 
  Tv, 
  Zap, 
  Volume2, 
  BatteryCharging, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FLEET_PRODUCTS = [
  {
    id: 'fleet-mobile',
    title: 'Samsung Galaxy A15 5G',
    category: 'Financed Mobile Device',
    tag: 'Core MDM Protection',
    image: '/categories/mobiles.png',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    borderColor: 'group-hover:border-cyan-400',
    badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
    icon: Smartphone,
    specs: ['Sub-1.2s MQTT Lock', 'Recovery Wipe Blocked', 'Dynamic UPI QR'],
    status: 'Knox Armed',
    statusColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
  },
  {
    id: 'fleet-watch',
    title: '4G Cellular Smart Watch Ultra',
    category: 'Wearable Financed Device',
    tag: 'eSIM Tamper Guard',
    image: '/categories/smartwatch.png',
    glowColor: 'rgba(168, 85, 247, 0.3)',
    borderColor: 'group-hover:border-purple-400',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
    icon: Watch,
    specs: ['eSIM Tamper Alert', 'Live GPS Ping', '72h Auto Lock'],
    status: 'GPS Active',
    statusColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
  },
  {
    id: 'fleet-appliances',
    title: 'Smart 4K LED TV & Home Tech',
    category: 'Wholesale B2B Showroom',
    tag: 'Direct Factory Dispatch',
    image: '/categories/appliances.png',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    borderColor: 'group-hover:border-amber-400',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
    icon: Tv,
    specs: ['Dealer Bulk Margin', 'Factory Direct Pricing', 'Doorstep Logistics'],
    status: 'Wholesale Stock',
    statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
  },
  {
    id: 'fleet-chargers',
    title: 'GaN 65W Fast Charging Hub',
    category: 'Counter Retail Accessory',
    tag: 'Up to 45% Margin',
    image: '/categories/chargers.png',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    borderColor: 'group-hover:border-emerald-400',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
    icon: Zap,
    specs: ['BIS Safety Certified', 'GaN III Fast Tech', 'Instant Counter Swap'],
    status: 'High Margin',
    statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
  },
  {
    id: 'fleet-speaker',
    title: 'BassBoom RGB Wireless Speaker',
    category: 'Audio & Lifestyle Goods',
    tag: 'Fast Inventory Turn',
    image: '/categories/speaker.png',
    glowColor: 'rgba(244, 63, 94, 0.3)',
    borderColor: 'group-hover:border-rose-400',
    badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
    icon: Volume2,
    specs: ['24-Hour Battery Life', 'Waterproof IPX7', 'Showroom Demo Units'],
    status: 'Fast Moving',
    statusColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
  },
  {
    id: 'fleet-powerbank',
    title: '20,000mAh Dual Type-C Backup',
    category: 'Power & Charging Hub',
    tag: '22.5W Fast Delivery',
    image: '/categories/powerbank.png',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    borderColor: 'group-hover:border-blue-400',
    badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
    icon: BatteryCharging,
    specs: ['Airline Approved', 'Digital LED Display', 'Triple Device Output'],
    status: 'In Stock',
    statusColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.94 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } 
  }
};

// ── 🌟 INDIVIDUAL 3D MOUSE-TILT & SPOTLIGHT CARD COMPONENT ──
const InteractiveTiltCard = ({ product, idx }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const IconComp = product.icon;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    setMousePos({ x, y });
    setTilt({
      x: -normY * 10,
      y: normX * 12
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      variants={cardVariants}
      className="perspective-1000 h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px)` 
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
          transition: 'transform 0.15s ease-out'
        }}
        className={`relative h-full rounded-3xl p-6 flex flex-col justify-between border border-slate-800/90 bg-slate-900/70 backdrop-blur-xl shadow-xl overflow-hidden group ${product.borderColor} transition-colors duration-300 cursor-pointer`}
      >
        {/* Dynamic Spotlight Glow following cursor inside card */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
            style={{
              background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, ${product.glowColor}, transparent 80%)`
            }}
          />
        )}

        <div className="relative z-10">
          
          {/* Card Top Pill & Telemetry Status */}
          <div className="flex items-center justify-between mb-4">
            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${product.badgeColor}`}>
              {product.tag}
            </span>
            
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border flex items-center gap-1.5 ${product.statusColor}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
              <span>{product.status}</span>
            </span>
          </div>

          {/* Real Product Image Stage */}
          <div className="relative h-44 rounded-2xl bg-gradient-to-b from-slate-950/80 to-slate-900/90 border border-slate-800/90 flex items-center justify-center p-3 my-2 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-36 max-w-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-400 ease-out"
            />
            <span className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-500 font-bold">
              REF-0{idx + 1}
            </span>
          </div>

          {/* Title & Category */}
          <div className="mt-4 text-left">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <IconComp className="w-3.5 h-3.5 text-cyan-400" />
              <span>{product.category}</span>
            </div>
            
            <h3 className="text-lg font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors">
              {product.title}
            </h3>
          </div>

          {/* Hardware Specs Pills */}
          <div className="mt-3 pt-3 border-t border-slate-800/90 flex flex-wrap gap-1.5">
            {product.specs.map((spec, sIdx) => (
              <span 
                key={sIdx}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
              >
                {spec}
              </span>
            ))}
          </div>

        </div>

        {/* Card Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800/90 flex items-center justify-between text-xs font-bold relative z-10">
          <Link
            to="/services-mdm"
            className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
          >
            <span>Telemetry Specs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to="/store"
            className="text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider"
          >
            <span>Procure</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

      </div>
    </motion.div>
  );
};

const HomeFleetShowcase = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      
      {/* ── SECTION HEADER ───────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-black uppercase tracking-wider shadow-lg shadow-cyan-500/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Multi-Device FinTech Fleet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Protected Mobile Hardware & Showroom Inventory
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Every financed device maintains high-speed MQTT TLS 1.3 heartbeat pings. Move your cursor over any card to interact with real-time 3D tilt and telemetry specifications.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/store"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-md shadow-cyan-500/25 transition-all duration-300"
          >
            <span>Open DXHUB Store</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── 🌟 STAGGERED 3D MOUSE-TILT GRID (ENTERS ONE-BY-ONE) ── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {FLEET_PRODUCTS.map((product, idx) => (
          <InteractiveTiltCard key={product.id} product={product} idx={idx} />
        ))}
      </motion.div>

    </section>
  );
};

export default HomeFleetShowcase;
