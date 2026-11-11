/**
 * ServicesShowcaseSection.jsx - [VIEW COMPONENT]
 * "Comprehensive Software Solutions & IT Services".
 * Ultra-Clean Airy Daylight Bento with Automatic Ambient Highlight Cycle:
 * - Soft daylight surface (from-white via-[#f6faff] to-white) with subtle border frame
 * - Asymmetric executive header paired with Framer Motion layoutId filter bar
 * - Automatic gentle focus highlight cycling softly across visible cards when idle (pauses on hover)
 * - Smooth cursor spotlight radial glow, top accent line & crisp white typography
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Globe,
  Code2,
  Lock,
  Cloud,
  ShieldCheck,
  Layers,
  Cpu,
  TrendingUp,
  Database,
  GitBranch,
  Activity,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';

const CARD_ACCENTS = {
  indigo: {
    spotlight: 'rgba(79, 70, 229, 0.10)',
    topBar: 'from-indigo-500 to-blue-500',
    autoRing: 'border-indigo-300/90 shadow-[0_16px_38px_-14px_rgba(79,70,229,0.20)] -translate-y-1',
    borderShadow: 'hover:border-indigo-400/80 hover:shadow-[0_22px_45px_-12px_rgba(79,70,229,0.22)]',
    iconRest: 'bg-indigo-50 text-indigo-600 border-indigo-100/90',
    iconHover:
      'group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-blue-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-indigo-600/30',
    titleHover: 'group-hover:text-indigo-700',
    ctaHover:
      'text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-indigo-600/25'
  },
  blue: {
    spotlight: 'rgba(37, 99, 235, 0.10)',
    topBar: 'from-blue-600 to-sky-400',
    autoRing: 'border-blue-300/90 shadow-[0_16px_38px_-14px_rgba(37,99,235,0.20)] -translate-y-1',
    borderShadow: 'hover:border-blue-400/80 hover:shadow-[0_22px_45px_-12px_rgba(37,99,235,0.22)]',
    iconRest: 'bg-blue-50 text-blue-600 border-blue-100/90',
    iconHover:
      'group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-sky-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-blue-600/30',
    titleHover: 'group-hover:text-blue-700',
    ctaHover:
      'text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-600/25'
  },
  emerald: {
    spotlight: 'rgba(5, 150, 105, 0.10)',
    topBar: 'from-emerald-500 to-teal-400',
    autoRing: 'border-emerald-300/90 shadow-[0_16px_38px_-14px_rgba(5,150,105,0.20)] -translate-y-1',
    borderShadow: 'hover:border-emerald-400/80 hover:shadow-[0_22px_45px_-12px_rgba(5,150,105,0.22)]',
    iconRest: 'bg-emerald-50 text-emerald-600 border-emerald-100/90',
    iconHover:
      'group-hover:bg-gradient-to-br group-hover:from-emerald-600 group-hover:to-teal-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-emerald-600/30',
    titleHover: 'group-hover:text-emerald-700',
    ctaHover:
      'text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-emerald-600/25'
  },
  violet: {
    spotlight: 'rgba(124, 58, 237, 0.10)',
    topBar: 'from-violet-600 to-indigo-500',
    autoRing: 'border-violet-300/90 shadow-[0_16px_38px_-14px_rgba(124,58,237,0.20)] -translate-y-1',
    borderShadow: 'hover:border-violet-400/80 hover:shadow-[0_22px_45px_-12px_rgba(124,58,237,0.22)]',
    iconRest: 'bg-violet-50 text-violet-600 border-violet-100/90',
    iconHover:
      'group-hover:bg-gradient-to-br group-hover:from-violet-600 group-hover:to-indigo-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-violet-600/30',
    titleHover: 'group-hover:text-violet-700',
    ctaHover:
      'text-violet-600 group-hover:bg-violet-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-violet-600/25'
  },
  teal: {
    spotlight: 'rgba(13, 148, 136, 0.10)',
    topBar: 'from-teal-500 to-cyan-400',
    autoRing: 'border-teal-300/90 shadow-[0_16px_38px_-14px_rgba(13,148,136,0.20)] -translate-y-1',
    borderShadow: 'hover:border-teal-400/80 hover:shadow-[0_22px_45px_-12px_rgba(13,148,136,0.22)]',
    iconRest: 'bg-teal-50 text-teal-600 border-teal-100/90',
    iconHover:
      'group-hover:bg-gradient-to-br group-hover:from-teal-600 group-hover:to-cyan-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-teal-600/30',
    titleHover: 'group-hover:text-teal-700',
    ctaHover:
      'text-teal-600 group-hover:bg-teal-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-teal-600/25'
  },
  amber: {
    spotlight: 'rgba(217, 119, 6, 0.10)',
    topBar: 'from-amber-500 to-orange-400',
    autoRing: 'border-amber-300/90 shadow-[0_16px_38px_-14px_rgba(217,119,6,0.20)] -translate-y-1',
    borderShadow: 'hover:border-amber-400/80 hover:shadow-[0_22px_45px_-12px_rgba(217,119,6,0.22)]',
    iconRest: 'bg-amber-50 text-amber-600 border-amber-100/90',
    iconHover:
      'group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-amber-500/30',
    titleHover: 'group-hover:text-amber-700',
    ctaHover:
      'text-amber-600 group-hover:bg-amber-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-amber-600/25'
  }
};

const ALL_SERVICES = [
  {
    id: 'mobile-app',
    title: 'Mobile Application Development',
    category: 'Development',
    icon: Smartphone,
    accent: 'indigo',
    description:
      'Build powerful native and cross-platform mobile applications with cutting-edge technologies for iOS and Android platforms.',
    features: [
      'iOS & Android Native',
      'React Native & Flutter',
      'Progressive Web Apps',
      'App Store Optimization'
    ],
    ctaLink: '/contact-mdm'
  },
  {
    id: 'web-dev',
    title: 'Web Development Services',
    category: 'Development',
    icon: Globe,
    accent: 'blue',
    description:
      'Create modern, responsive websites and web applications that deliver exceptional user experiences across all devices.',
    features: [
      'React & Next.js',
      'Responsive Design',
      'E-commerce & SaaS Portals',
      'CMS & API Integration'
    ],
    ctaLink: '/contact-mdm'
  },
  {
    id: 'custom-software',
    title: 'Custom Software Solutions',
    category: 'Enterprise',
    icon: Code2,
    accent: 'emerald',
    description:
      'Enterprise-grade custom software solutions designed specifically to meet your unique business requirements and workflows.',
    features: [
      'Enterprise ERP & CRM',
      'REST & GraphQL APIs',
      'Cloud Architecture',
      'Microservices Core'
    ],
    ctaLink: '/contact-mdm'
  },
  {
    id: 'dpc-mdm',
    title: 'Device Policy Controller (DPC) & EMM',
    category: 'Security',
    icon: Lock,
    accent: 'amber',
    description:
      'Advanced device policy controller and enterprise mobility management solutions for complete mobile fleet security and control.',
    features: [
      'Device Policy Management',
      'Enterprise Fleet Security',
      'Remote Policy Enforcement',
      'Real-Time Telemetry'
    ],
    ctaLink: '/services-mdm'
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps Architecture',
    category: 'Enterprise',
    icon: Cloud,
    accent: 'teal',
    description:
      'Scalable cloud architectures, automated CI/CD deployment pipelines, containerized clusters, and 99.99% high-availability hosting.',
    features: [
      'AWS Cloud (EC2, S3, RDS)',
      'Docker & Kubernetes',
      'Automated CI/CD Pipelines',
      '24/7 Infrastructure Monitoring'
    ],
    ctaLink: '/contact-mdm'
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security & Application Defense',
    category: 'Security',
    icon: ShieldCheck,
    accent: 'violet',
    description:
      'End-to-end cyber protection, encrypted communications, vulnerability penetration testing, and hardened API access defense.',
    features: [
      'TLS 1.3 Encryption',
      'OWASP Security Audits',
      'DDoS Mitigation',
      'OAuth 2.0 & JWT Security'
    ],
    ctaLink: '/contact-mdm'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Product Design & Prototyping',
    category: 'Design',
    icon: Layers,
    accent: 'indigo',
    description:
      'High-conversion, intuitive, and modern digital product experiences crafted with Figma design systems, wireframes, and interactive flows.',
    features: [
      'User-Focused UI/UX',
      'Interactive Prototyping',
      'Figma Design Systems',
      'Responsive Component Libraries'
    ],
    ctaLink: '/contact-mdm'
  },
  {
    id: 'ai-ml',
    title: 'AI & Intelligent Workflow Automation',
    category: 'AI & ML',
    icon: Cpu,
    accent: 'violet',
    description:
      'Smart predictive models, automated business workflows, intelligent analytics, and modern enterprise AI integrations.',
    features: [
      'Predictive Data Models',
      'Business Process Automation',
      'Custom NLP & Chatbots',
      'Automated Data Pipelines'
    ],
    ctaLink: '/contact-mdm'
  },
  {
    id: 'seo-growth',
    title: 'Technical SEO & Performance Engineering',
    category: 'Development',
    icon: TrendingUp,
    accent: 'emerald',
    description:
      'Search engine architecture, JSON-LD schema markup, Google Core Web Vitals 95+ speed tuning, and technical crawl optimization.',
    features: [
      'Google Core Web Vitals 95+',
      'Structured Schema Markup',
      'SSR & Edge Caching',
      'Organic Growth Analytics'
    ],
    ctaLink: '/contact-mdm'
  },
  {
    id: 'database-engineering',
    title: 'High-Scale Database & Backend Systems',
    category: 'Enterprise',
    icon: Database,
    accent: 'blue',
    description:
      'High-throughput distributed databases, ACID-compliant transactional ledgers, and low-latency Redis caching layers.',
    features: [
      'MongoDB & PostgreSQL Clusters',
      'Redis In-Memory Caching',
      'Real-Time WebSocket Events',
      'Automated Disaster Recovery'
    ],
    ctaLink: '/contact-mdm'
  },
  {
    id: 'api-integration',
    title: 'Payment Gateways & API Ecosystems',
    category: 'Development',
    icon: GitBranch,
    accent: 'amber',
    description:
      'Seamless third-party API integrations, webhook orchestration, UPI/Razorpay/Stripe checkout engines, and ERP bridges.',
    features: [
      'Razorpay, Stripe & UPI Flow',
      'Real-Time Webhook Handlers',
      'Legacy System API Wrappers',
      'Rate-Limited API Gateways'
    ],
    ctaLink: '/contact-mdm'
  },
  {
    id: 'qa-devops',
    title: 'Automated QA Testing & Maintenance SLA',
    category: 'Security',
    icon: Activity,
    accent: 'teal',
    description:
      'End-to-end automated regression suites, load stress benchmarking, continuous dependency patching, and dedicated SLA support.',
    features: [
      'Automated E2E Test Suites',
      'Load & Concurrency Testing',
      '24/7 Error Telemetry Alerts',
      'Continuous Security Patching'
    ],
    ctaLink: '/contact-mdm'
  }
];

const CATEGORIES = ['All Services', 'Development', 'Enterprise', 'Security', 'Design', 'AI & ML'];

const InteractiveServiceCard = ({ service, isAutoHighlighted }) => {
  const cardRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    });
  };

  const handleMouseLeave = () => {
    setCursor((prev) => ({ ...prev, active: false }));
  };

  const Icon = service.icon;
  const style = CARD_ACCENTS[service.accent] || CARD_ACCENTS.blue;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        ref={cardRef}
        to={service.ctaLink}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative h-full overflow-hidden p-6 sm:p-7 rounded-2xl bg-white border transition-all duration-500 ease-out flex flex-col justify-between space-y-5 group cursor-pointer hover:-translate-y-2 ${
          isAutoHighlighted
            ? style.autoRing
            : 'border-slate-200/80 shadow-[0_6px_24px_rgba(15,23,42,0.03)]'
        } ${style.borderShadow}`}
      >
        {/* Top expanding gradient accent line */}
        <span
          className={`pointer-events-none absolute top-0 left-0 h-[3px] bg-gradient-to-r transition-all duration-500 ease-out ${
            style.topBar
          } ${isAutoHighlighted ? 'w-full' : 'w-0 group-hover:w-full'}`}
        />

        {/* Cursor-tracking soft pastel spotlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: cursor.active ? 1 : 0,
            background: `radial-gradient(360px circle at ${cursor.x}px ${cursor.y}px, ${style.spotlight}, transparent 68%)`
          }}
        />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 ${style.iconRest} ${style.iconHover}`}
            >
              <Icon className="w-6 h-6" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-200/75">
              {service.category}
            </span>
          </div>

          <div>
            <h3 className={`text-[17px] font-extrabold text-slate-900 transition-colors duration-200 ${style.titleHover}`}>
              {service.title}
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-2 leading-relaxed font-normal">
              {service.description}
            </p>
          </div>

          <ul className="space-y-2 pt-1">
            {service.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-300 rounded-full group-hover:px-4 group-hover:py-1.5 ${style.ctaHover}`}
          >
            <span>Consult Engineers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const ServicesShowcaseSection = () => {
  const [activeCategory, setActiveCategory] = useState('All Services');
  const [showAll, setShowAll] = useState(false);
  const [autoIdx, setAutoIdx] = useState(0);
  const [gridHovered, setGridHovered] = useState(false);

  const filteredServices =
    activeCategory === 'All Services'
      ? ALL_SERVICES
      : ALL_SERVICES.filter((s) => s.category === activeCategory);

  const displayedServices = showAll ? filteredServices : filteredServices.slice(0, 6);

  // Automatic ambient focus highlight cycling softly across visible cards when idle
  useEffect(() => {
    if (gridHovered || displayedServices.length === 0) return;
    const timer = setInterval(() => {
      setAutoIdx((prev) => (prev + 1) % displayedServices.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [gridHovered, displayedServices.length]);

  useEffect(() => {
    setAutoIdx(0);
  }, [activeCategory, showAll]);

  return (
    <section
      id="services-section"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8 relative z-10 select-none"
    >
      <div className="space-y-9">
        {/* Open Asymmetric Executive Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200/75 pb-7">
          <div className="space-y-3 max-w-2xl text-left">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200/75">
              OUR SERVICES
            </span>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-slate-900">
              Comprehensive Software Solutions &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                IT Services
              </span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              We provide end-to-end software development services tailored to your business goals. From mobile app engineering and custom web platforms to enterprise software, cloud &amp; DevOps, cybersecurity, and AI/ML solutions — delivering scalable technology that drives digital transformation.
            </p>
          </div>

          {/* Animated Category Filter Dock */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/85 border border-slate-200/80 self-start lg:self-end shrink-0">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setShowAll(false);
                  }}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors duration-200 cursor-pointer ${
                    active ? 'text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeServiceCatPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm shadow-blue-600/20"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Bento Grid with Automatic Ambient Focus Highlight */}
        <motion.div
          layout
          onMouseEnter={() => setGridHovered(true)}
          onMouseLeave={() => setGridHovered(false)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
        >
          <AnimatePresence mode="popLayout">
            {displayedServices.map((service, idx) => (
              <InteractiveServiceCard
                key={service.id}
                service={service}
                isAutoHighlighted={!gridHovered && idx === autoIdx}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Expand / Collapse All Services */}
        {filteredServices.length > 6 && (
          <div className="text-center pt-1">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-extrabold text-blue-700 bg-white border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              {showAll ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Show More ({filteredServices.length - 6} more)</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesShowcaseSection;
