/**
 * WebAboutView.jsx - [PAGE VIEW]
 * Full-bleed Illustrated About Hero Banner at top (directly under Navbar),
 * followed by spacious light architectural Pillars, Metrics, Tech Stack, Standards,
 * and full-bleed Gradient CTA Band above the Matte Black Footer.
 */

import React from 'react';
import AboutHeader from './about/AboutHeader';
import AboutPillars from './about/AboutPillars';
import AboutMetrics from './about/AboutMetrics';
import TechStackSection from '../components/TechStackSection';
import AboutStandards from './about/AboutStandards';
import ReadyCtaSection from '../components/ReadyCtaSection';

const WebAboutView = () => {
  return (
    <div className="pb-0">
      <AboutHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 space-y-12">
        <AboutPillars />
        <AboutMetrics />
        <TechStackSection />
        <AboutStandards />
      </div>
      <ReadyCtaSection />
    </div>
  );
};

export default WebAboutView;
