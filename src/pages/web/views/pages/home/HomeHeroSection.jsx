/**
 * HomeHeroSection.jsx - [SECTION VIEW]
 * Open Edge-to-Edge DXHUB Daylight Executive Hero with Animated Light 3D Banner Stage.
 * Features:
 * - Seamless luminous daylight aurora canvas beneath the frosted white Navbar
 * - Bright Light-Mode 3D Isometric Artwork (/banners/hero_light_1..3.jpg) styled cleanly to blend into ice-white
 * - 3D Layered Depth Stack with continuous smooth levitation + Ken Burns drift + interactive mouse 3D tilt
 * - Subtle bobbing light glass telemetry chips around frame perimeter + thumbnail preview switcher
 * - Auto-cycling 100% Pure IT Domain slides every 5.2s (pauses smoothly on hover)
 * - Continuous infinite horizontal engineering marquee + 3 animated Light Bento Feature Cards below
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Smartphone,
  Layers,
  ShieldCheck,
  Cloud,
  Lock,
  Server,
  Code2,
  Cpu,
  GitBranch
} from 'lucide-react';

const SLIDES = [
  {
    id: 'mobile-web',
    tabLabel: '01 · Web & Mobile',
    image: '/banners/hero_light_1.jpg',
    lead: 'Scalable Web & Mobile Platforms That',
    highlight: 'Grow With You',
    subtitle:
      'Building powerful, intuitive mobile apps for iOS & Android and cutting-edge web platforms with cloud-native architectures.',
    primaryBtn: { label: 'Get Started', link: '/contact-mdm' },
    secondaryBtn: { label: 'Explore Services', link: '/services-mdm' },
    features: [
      {
        icon: Smartphone,
        title: 'Cross-Platform',
        desc: 'Developing for both iOS and Android with React Native & Flutter.'
      },
      {
        icon: Layers,
        title: 'User-Friendly UI/UX',
        desc: 'Designing clean, easy-to-use interfaces that engage users.'
      },
      {
        icon: ShieldCheck,
        title: 'Secure & Scalable',
        desc: 'Creating secure, scalable apps that grow with your business.'
      }
    ]
  },
  {
    id: 'cloud-security',
    tabLabel: '02 · Cloud & DPC',
    image: '/banners/hero_light_2.jpg',
    lead: 'Resilient AWS Cloud & Enterprise',
    highlight: 'Device Security',
    subtitle:
      'Automated CI/CD cloud infrastructures, high-availability microservices, and advanced Sentinel DPC mobile fleet control.',
    primaryBtn: { label: 'Consult Architects', link: '/contact-mdm' },
    secondaryBtn: { label: 'View Tech Stack', link: '/services-mdm' },
    features: [
      {
        icon: Cloud,
        title: 'AWS Multi-AZ Cloud',
        desc: 'Auto-scaling EC2, RDS clusters, and CloudFront CDN acceleration.'
      },
      {
        icon: Lock,
        title: 'Sentinel DPC / MDM',
        desc: 'Sub-1.2s remote management & tamper protection for corporate fleets.'
      },
      {
        icon: Server,
        title: '99.99% Uptime SLA',
        desc: 'TLS 1.3 encrypted communications and continuous cluster monitoring.'
      }
    ]
  },
  {
    id: 'custom-enterprise-it',
    tabLabel: '03 · ERP & AI',
    image: '/banners/hero_light_3.jpg',
    lead: 'Custom Enterprise Software &',
    highlight: 'AI Automation',
    subtitle:
      'Engineering tailored ERP & CRM platforms, real-time analytics pipelines, and scalable API ecosystems built for modern organizations.',
    primaryBtn: { label: 'Start Your Project', link: '/contact-mdm' },
    secondaryBtn: { label: 'View Our Work', link: '/services-mdm' },
    features: [
      {
        icon: Code2,
        title: 'Custom ERP & SaaS',
        desc: 'Bespoke enterprise portals, dashboards, and role-based workflows.'
      },
      {
        icon: Cpu,
        title: 'AI & Data Automation',
        desc: 'Intelligent analytics pipelines and automated system operations.'
      },
      {
        icon: GitBranch,
        title: 'API & System Integration',
        desc: 'Seamless REST/GraphQL microservices and payment gateway bridges.'
      }
    ]
  }
];

const TICKER_STACK = [
  'React 19',
  'Next.js SSR',
  'React Native',
  'Flutter Multi-OS',
  'AWS Multi-AZ',
  'Sentinel DPC',
  'Kubernetes',
  'Node.js Microservices',
  'PostgreSQL ACID',
  'TLS 1.3 · ISO 27001'
];

const SLIDE_DURATION_MS = 5200;

/* ── CLEAN ANIMATED LIGHT IT ARTWORK DECK WITH INTEGRATED ARROWS ── */
const AnimatedHeroBannerDeck = ({ activeSlide, onPrev, onNext }) => {
  const stageRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: Number((-y * 5).toFixed(2)),
      rotateY: Number((x * 6).toFixed(2))
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-2 sm:px-2"
      style={{ perspective: '1100px' }}
    >
      {/* Gently Levitating + 3D Tiltable Clean IT Illustration Card */}
      <motion.div
        animate={{ y: [-5, 5, -5], rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        transition={{
          y: { duration: 6.2, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { type: 'spring', stiffness: 180, damping: 20 },
          rotateY: { type: 'spring', stiffness: 180, damping: 20 }
        }}
        className="relative rounded-[26px] bg-white p-2 sm:p-2.5 border border-blue-100/90 shadow-[0_26px_65px_-16px_rgba(37,99,235,0.18)]"
      >
        <div className="relative rounded-[20px] overflow-hidden bg-[#f4f8ff] aspect-[16/10] group">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.image}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <motion.img
                src={activeSlide.image}
                alt={activeSlide.lead + ' ' + activeSlide.highlight}
                animate={{ scale: [1, 1.05, 1], x: [0, -5, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full object-cover object-center will-change-transform"
              />
            </motion.div>
          </AnimatePresence>

          {/* Clean Integrated Left & Right Navigation Arrows */}
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/85 text-slate-600 shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/85 text-slate-600 shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const HomeHeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  const handleNext = () => setCurrent((prev) => (prev + 1) % SLIDES.length);

  const activeSlide = SLIDES[current];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#f2f7ff] via-[#f9fbff] to-[#fafbfd] border-b border-slate-200/65"
    >
      {/* Atmospheric Luminous Aurora Gradient Fields */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none -top-24 left-[15%] w-[30rem] h-[30rem] rounded-full bg-sky-200/35 blur-3xl absolute"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none top-10 right-[10%] w-[26rem] h-[26rem] rounded-full bg-indigo-200/30 blur-3xl absolute"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-10 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT: Executive Typography & Auto-Shining Action Buttons */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id + '-copy'}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-slate-900 leading-[1.1] tracking-tight">
                  {activeSlide.lead}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
                    {activeSlide.highlight}
                  </span>
                </h1>

                <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
                  {activeSlide.subtitle}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <Link
                    to={activeSlide.primaryBtn.link}
                    className="relative group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
                  >
                    <motion.span
                      aria-hidden="true"
                      animate={{ x: ['-130%', '220%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.4, ease: 'easeInOut' }}
                      className="pointer-events-none absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                    />
                    <span className="relative z-10">{activeSlide.primaryBtn.label}</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>

                  <Link
                    to={activeSlide.secondaryBtn.link}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-800 bg-white border border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                  >
                    <span>{activeSlide.secondaryBtn.label}</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Clean Interactive Light-Mode Animated Artwork with Quick Carousel Arrows */}
          <div className="lg:col-span-6">
            <AnimatedHeroBannerDeck
              activeSlide={activeSlide}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </div>
        </div>

        {/* Continuous Automatic Infinite Engineering Marquee Strip */}
        <div className="mt-8 sm:mt-10 relative overflow-hidden py-3 border-y border-slate-200/70">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#f8faff] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#f8faff] to-transparent z-10" />
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-7 whitespace-nowrap w-max"
          >
            {[...TICKER_STACK, ...TICKER_STACK].map((item, idx) => (
              <div key={idx} className="inline-flex items-center gap-2 text-xs font-bold text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom 3-Column Clean Feature Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id + '-pillars'}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {activeSlide.features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <motion.div
                  key={feat.title + idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="group relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_6px_22px_rgba(15,23,42,0.03)] hover:border-blue-300 hover:shadow-[0_16px_38px_-12px_rgba(37,99,235,0.16)] hover:-translate-y-1 transition-all duration-300 flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:border-transparent group-hover:scale-105 group-hover:shadow-md group-hover:shadow-blue-600/25 transition-all duration-300">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HomeHeroSection;
