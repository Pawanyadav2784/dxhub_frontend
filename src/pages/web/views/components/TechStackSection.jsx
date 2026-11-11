/**
 * TechStackSection.jsx - [VIEW COMPONENT]
 * "Technology Stack We Use" — Automatic Live Cycling Workbench Layout.
 * Features:
 * - Automatically cycles smoothly through all 6 technology stacks every 4.2s (pauses on hover)
 * - Visible timer hairline on the active sidebar selector item with spring layoutId indicator
 * - Right Animated White Showcase Panel with domino-staggered TechTile entrances
 * - Optional "View All 6 Stacks" side-by-side grid toggle
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Smartphone,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  LayoutGrid,
  Sparkles
} from 'lucide-react';

const CARD_THEMES = {
  blue: {
    pillBg: 'bg-blue-50 text-blue-700 border-blue-200',
    iconBox: 'bg-blue-50 text-blue-600 border-blue-100',
    iconActive: 'bg-gradient-to-br from-blue-600 to-sky-500 text-white border-transparent shadow-md shadow-blue-600/20',
    accentBar: 'from-blue-600 to-sky-500',
    tileHover: 'hover:border-blue-300 hover:shadow-[0_12px_28px_-10px_rgba(37,99,235,0.20)]'
  },
  indigo: {
    pillBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    iconBox: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    iconActive: 'bg-gradient-to-br from-indigo-600 to-violet-500 text-white border-transparent shadow-md shadow-indigo-600/20',
    accentBar: 'from-indigo-600 to-violet-500',
    tileHover: 'hover:border-indigo-300 hover:shadow-[0_12px_28px_-10px_rgba(79,70,229,0.20)]'
  },
  emerald: {
    pillBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconBox: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    iconActive: 'bg-gradient-to-br from-emerald-600 to-teal-500 text-white border-transparent shadow-md shadow-emerald-600/20',
    accentBar: 'from-emerald-600 to-teal-500',
    tileHover: 'hover:border-emerald-300 hover:shadow-[0_12px_28px_-10px_rgba(5,150,105,0.20)]'
  },
  amber: {
    pillBg: 'bg-amber-50 text-amber-700 border-amber-200',
    iconBox: 'bg-amber-50 text-amber-600 border-amber-100',
    iconActive: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white border-transparent shadow-md shadow-amber-500/20',
    accentBar: 'from-amber-500 to-orange-500',
    tileHover: 'hover:border-amber-300 hover:shadow-[0_12px_28px_-10px_rgba(217,119,6,0.20)]'
  },
  teal: {
    pillBg: 'bg-teal-50 text-teal-700 border-teal-200',
    iconBox: 'bg-teal-50 text-teal-600 border-teal-100',
    iconActive: 'bg-gradient-to-br from-teal-600 to-cyan-500 text-white border-transparent shadow-md shadow-teal-600/20',
    accentBar: 'from-teal-600 to-cyan-500',
    tileHover: 'hover:border-teal-300 hover:shadow-[0_12px_28px_-10px_rgba(13,148,136,0.20)]'
  },
  violet: {
    pillBg: 'bg-violet-50 text-violet-700 border-violet-200',
    iconBox: 'bg-violet-50 text-violet-600 border-violet-100',
    iconActive: 'bg-gradient-to-br from-violet-600 to-purple-600 text-white border-transparent shadow-md shadow-violet-600/20',
    accentBar: 'from-violet-600 to-purple-600',
    tileHover: 'hover:border-violet-300 hover:shadow-[0_12px_28px_-10px_rgba(124,58,237,0.20)]'
  }
};

const TECH_CATEGORIES = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    subtitle: 'Web Interfaces & Interactive Experiences',
    icon: Code2,
    theme: 'blue',
    technologies: [
      { name: 'React.js', tag: 'UI Library', badgeBg: 'bg-sky-50 text-sky-600 border-sky-200/70', short: 'Re' },
      { name: 'Next.js', tag: 'SSR Framework', badgeBg: 'bg-slate-100 text-slate-900 border-slate-200', short: '▲' },
      { name: 'Vue.js', tag: 'Reactive UI', badgeBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/70', short: 'V' },
      { name: 'Angular', tag: 'Enterprise Web', badgeBg: 'bg-rose-50 text-rose-600 border-rose-200/70', short: 'A' },
      { name: 'TypeScript', tag: 'Type-Safe JS', badgeBg: 'bg-blue-50 text-blue-600 border-blue-200/70', short: 'TS' },
      { name: 'Tailwind CSS', tag: 'Design System', badgeBg: 'bg-cyan-50 text-cyan-600 border-cyan-200/70', short: 'TW' },
      { name: 'HTML5', tag: 'Semantic Web', badgeBg: 'bg-orange-50 text-orange-600 border-orange-200/70', short: 'H5' },
      { name: 'CSS3', tag: 'Modern Layout', badgeBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/70', short: 'C3' }
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    subtitle: 'iOS, Android & Cross-Platform Apps',
    icon: Smartphone,
    theme: 'indigo',
    technologies: [
      { name: 'React Native', tag: 'Cross-Platform', badgeBg: 'bg-sky-50 text-sky-600 border-sky-200/70', short: 'RN' },
      { name: 'Flutter', tag: 'Multi-OS Dart', badgeBg: 'bg-blue-50 text-blue-600 border-blue-200/70', short: 'Fl' },
      { name: 'Android Native', tag: 'Google OS', badgeBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/70', short: 'An' },
      { name: 'iOS (Swift)', tag: 'Apple OS', badgeBg: 'bg-orange-50 text-orange-600 border-orange-200/70', short: 'Sw' },
      { name: 'Kotlin', tag: 'Modern Android', badgeBg: 'bg-purple-50 text-purple-600 border-purple-200/70', short: 'Kt' },
      { name: 'Java', tag: 'Enterprise DPC', badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/70', short: 'Jv' },
      { name: 'Android DPC', tag: 'Fleet Policy', badgeBg: 'bg-teal-50 text-teal-700 border-teal-200/70', short: 'MD' },
      { name: 'SQLite', tag: 'Offline Sync', badgeBg: 'bg-slate-100 text-slate-700 border-slate-200', short: 'SQ' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    subtitle: 'Scalable APIs & High-Concurrency Services',
    icon: Server,
    theme: 'emerald',
    technologies: [
      { name: 'Node.js', tag: 'Event-Driven', badgeBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/70', short: 'JS' },
      { name: 'Express.js', tag: 'API Engine', badgeBg: 'bg-slate-100 text-slate-900 border-slate-200', short: 'Ex' },
      { name: 'Python', tag: 'Automation & AI', badgeBg: 'bg-blue-50 text-blue-600 border-blue-200/70', short: 'Py' },
      { name: 'Django', tag: 'Rapid Backend', badgeBg: 'bg-teal-50 text-teal-700 border-teal-200/70', short: 'Dj' },
      { name: 'Java Spring', tag: 'Enterprise Core', badgeBg: 'bg-green-50 text-green-600 border-green-200/70', short: 'Sp' },
      { name: 'PHP Laravel', tag: 'Web Systems', badgeBg: 'bg-rose-50 text-rose-600 border-rose-200/70', short: 'Lv' },
      { name: '.NET Core', tag: 'High-Load API', badgeBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/70', short: '.N' },
      { name: 'Go (Golang)', tag: 'Microservices', badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200/70', short: 'Go' }
    ]
  },
  {
    id: 'database',
    title: 'Database & Storage',
    subtitle: 'High-Throughput & ACID Data Clusters',
    icon: Database,
    theme: 'amber',
    technologies: [
      { name: 'MongoDB', tag: 'NoSQL Cluster', badgeBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/70', short: 'Mg' },
      { name: 'PostgreSQL', tag: 'Relational ACID', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/70', short: 'Pg' },
      { name: 'MySQL', tag: 'Structured DB', badgeBg: 'bg-sky-50 text-sky-700 border-sky-200/70', short: 'My' },
      { name: 'Redis', tag: 'In-Memory Cache', badgeBg: 'bg-rose-50 text-rose-600 border-rose-200/70', short: 'Rd' },
      { name: 'Firebase', tag: 'Realtime Sync', badgeBg: 'bg-amber-50 text-amber-600 border-amber-200/70', short: 'Fb' },
      { name: 'Cassandra', tag: 'Distributed DB', badgeBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/70', short: 'Cs' },
      { name: 'Amazon RDS', tag: 'Managed Cloud', badgeBg: 'bg-orange-50 text-orange-600 border-orange-200/70', short: 'RD' },
      { name: 'Elasticsearch', tag: 'Search Engine', badgeBg: 'bg-teal-50 text-teal-700 border-teal-200/70', short: 'Es' }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps Architecture',
    subtitle: '99.99% Uptime Clusters & CI/CD Pipelines',
    icon: Cloud,
    theme: 'teal',
    technologies: [
      { name: 'AWS EC2 & S3', tag: 'Cloud Compute', badgeBg: 'bg-amber-50 text-amber-600 border-amber-200/70', short: 'AW' },
      { name: 'Docker', tag: 'Containers', badgeBg: 'bg-sky-50 text-sky-600 border-sky-200/70', short: 'Dk' },
      { name: 'Kubernetes', tag: 'Orchestration', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/70', short: 'K8' },
      { name: 'CI/CD Actions', tag: 'Auto Deploy', badgeBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/70', short: 'CI' },
      { name: 'Nginx', tag: 'Load Balancer', badgeBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/70', short: 'Nx' },
      { name: 'Linux Server', tag: 'Core OS', badgeBg: 'bg-slate-100 text-slate-800 border-slate-200', short: 'Lx' },
      { name: 'CloudFront', tag: 'Global CDN', badgeBg: 'bg-orange-50 text-orange-600 border-orange-200/70', short: 'CF' },
      { name: 'MQTT Broker', tag: 'Live Telemetry', badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200/70', short: 'MQ' }
    ]
  },
  {
    id: 'security',
    title: 'Security & Device Management',
    subtitle: 'Enterprise Compliance & Encryption Standards',
    icon: ShieldCheck,
    theme: 'violet',
    technologies: [
      { name: 'TLS 1.3', tag: 'Encrypted Pipe', badgeBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/70', short: 'TL' },
      { name: 'OAuth 2.0', tag: 'Identity Guard', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/70', short: 'OA' },
      { name: 'JWT Auth', tag: 'Stateless Token', badgeBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/70', short: 'JW' },
      { name: 'AES-256', tag: 'Vault Storage', badgeBg: 'bg-rose-50 text-rose-600 border-rose-200/70', short: 'AE' },
      { name: 'Knox Guard', tag: 'Device Layer', badgeBg: 'bg-slate-100 text-slate-800 border-slate-200', short: 'KG' },
      { name: 'ISO 27001', tag: 'Compliance', badgeBg: 'bg-teal-50 text-teal-700 border-teal-200/70', short: 'IS' },
      { name: 'DDoS Shield', tag: 'Edge Defense', badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/70', short: 'DD' },
      { name: 'RBAC Controls', tag: 'Access Roles', badgeBg: 'bg-purple-50 text-purple-600 border-purple-200/70', short: 'RB' }
    ]
  }
];

const AUTO_CYCLE_MS = 4200;

const TechTile = ({ tech, tileHover, isSelected, onHoverOrSelect }) => (
  <button
    type="button"
    onMouseEnter={() => onHoverOrSelect?.(tech)}
    onClick={() => onHoverOrSelect?.(tech)}
    className={`group/tile relative w-full text-left p-4 rounded-2xl border flex flex-col justify-between gap-3 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer ${
      isSelected
        ? 'bg-white border-blue-400 shadow-[0_12px_28px_-10px_rgba(37,99,235,0.22)] ring-1 ring-blue-100'
        : `bg-[#f9fbff] hover:bg-white border-slate-200/80 ${tileHover}`
    }`}
  >
    <div className="flex items-center justify-between">
      <div
        className={`w-10 h-10 rounded-xl border flex items-center justify-center text-xs font-black tracking-tight shadow-2xs transition-transform duration-300 group-hover/tile:scale-110 group-hover/tile:-rotate-3 ${tech.badgeBg}`}
      >
        {tech.short}
      </div>
      <span
        className={`w-2 h-2 rounded-full transition-colors ${
          isSelected ? 'bg-blue-600' : 'bg-slate-200 group-hover/tile:bg-blue-500'
        }`}
      />
    </div>

    <div className="min-w-0">
      <p className="text-[13px] font-extrabold text-slate-900 truncate">{tech.name}</p>
      <p className="text-[11px] font-medium text-slate-500 mt-0.5 truncate">{tech.tag}</p>
    </div>
  </button>
);

const TechStackSection = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeTech, setActiveTech] = useState(null);
  const [showAllGrid, setShowAllGrid] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Automatic cycling across categories every 4.2s when hovered or expanded is not blocking
  useEffect(() => {
    if (isPaused || showAllGrid) return;
    const timer = setInterval(() => {
      setSelectedIdx((prev) => (prev + 1) % TECH_CATEGORIES.length);
      setActiveTech(null);
    }, AUTO_CYCLE_MS);
    return () => clearInterval(timer);
  }, [isPaused, showAllGrid]);

  const activeCategory = TECH_CATEGORIES[selectedIdx] || TECH_CATEGORIES[0];
  const ActiveIcon = activeCategory.icon;
  const activeStyle = CARD_THEMES[activeCategory.theme] || CARD_THEMES.blue;

  const handleSelectCategory = (idx) => {
    setSelectedIdx(idx);
    setActiveTech(null);
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8 relative z-10 select-none text-left"
    >
      <div className="space-y-8">
        {/* Clean Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="space-y-2.5 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-200/80">
              <Sparkles className="w-3 h-3" />
              TECHNOLOGY STACK
            </span>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Technology Stack{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                We Use
              </span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              We build high-performance software systems using modern, production-proven engineering stacks and resilient cloud architectures.
            </p>
          </div>

          <button
            onClick={() => setShowAllGrid((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50/40 shadow-xs transition-all cursor-pointer self-start md:self-end shrink-0"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{showAllGrid ? 'Interactive Workbench View' : 'View All 6 Stacks'}</span>
          </button>
        </div>

        {/* Mode 1: Automatic Cycling Interactive Split Workbench */}
        {!showAllGrid ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* LEFT: Auto-Progressing Category Selector Sidebar */}
            <div className="lg:col-span-4 space-y-2.5">
              {TECH_CATEGORIES.map((cat, idx) => {
                const Icon = cat.icon;
                const style = CARD_THEMES[cat.theme] || CARD_THEMES.blue;
                const isSelected = idx === selectedIdx;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onMouseEnter={() => handleSelectCategory(idx)}
                    onClick={() => handleSelectCategory(idx)}
                    className={`relative overflow-hidden w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-3.5 cursor-pointer group ${
                      isSelected
                        ? 'bg-white border-blue-200 shadow-[0_14px_30px_-12px_rgba(37,99,235,0.16)]'
                        : 'bg-[#f8faff] border-slate-200/75 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeTechSidebarBar"
                        transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                        className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-gradient-to-b ${style.accentBar}`}
                      />
                    )}

                    {/* Live auto-advance hairline along bottom edge */}
                    {isSelected && !isPaused && (
                      <motion.span
                        key={cat.id + '-timer'}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTO_CYCLE_MS / 1000, ease: 'linear' }}
                        style={{ originX: 0 }}
                        className={`pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${style.accentBar} opacity-75`}
                      />
                    )}

                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isSelected ? style.iconActive : `${style.iconBox} group-hover:scale-105`
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-extrabold truncate transition-colors ${
                          isSelected ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                        }`}
                      >
                        {cat.title}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{cat.subtitle}</p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                        isSelected ? style.pillBg : 'bg-white text-slate-400 border-slate-200'
                      }`}
                    >
                      {cat.technologies.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* RIGHT: Animated Live Tech Canvas */}
            <div className="lg:col-span-8 bg-white rounded-[26px] border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(37,99,235,0.08)] p-6 sm:p-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${activeStyle.iconActive}`}>
                        <ActiveIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900">{activeCategory.title}</h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{activeCategory.subtitle}</p>
                      </div>
                    </div>

                    <Link
                      to="/contact-mdm"
                      className="text-xs font-extrabold text-blue-600 hover:text-indigo-700 bg-blue-50 hover:bg-blue-100/80 px-4 py-2 rounded-full border border-blue-200/80 transition-colors"
                    >
                      Build With This Stack →
                    </Link>
                  </div>

                  {/* 8 Tech Cards Domino Cascade (Interactive Hover & Click without navigating away) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    {activeCategory.technologies.map((tech, idx) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.25, delay: idx * 0.035 }}
                      >
                        <TechTile
                          tech={tech}
                          tileHover={activeStyle.tileHover}
                          isSelected={activeTech?.name === tech.name}
                          onHoverOrSelect={setActiveTech}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Subtle Live Focused Tech Info Strip inside workbench */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-100">
                    <span className="font-medium">
                      Focused module:{' '}
                      <strong className="text-slate-900">
                        {activeTech ? `${activeTech.name} (${activeTech.tag})` : `${activeCategory.technologies[0].name} & 7 core modules`}
                      </strong>
                    </span>
                    <span className="text-[11px] font-semibold text-blue-600">Hover any category on the left to preview stack</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* Mode 2: Side-by-Side All 6 Categories */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {TECH_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const style = CARD_THEMES[cat.theme] || CARD_THEMES.blue;
              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-5"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${style.iconBox}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">{cat.title}</h3>
                      <p className="text-xs text-slate-500">{cat.subtitle}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {cat.technologies.map((tech) => (
                      <TechTile key={tech.name} tech={tech} tileHover={style.tileHover} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TechStackSection;
