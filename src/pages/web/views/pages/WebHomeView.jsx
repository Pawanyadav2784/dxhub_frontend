/**
 * WebHomeView.jsx - [PAGE VIEW]
 * Original DXHUB Light Executive Home Architecture:
 * 1. HomeHeroSection           - Open Edge-to-Edge Daylight Split Hero with Live Kinetic Light UI Stages
 * 2. ServicesShowcaseSection   - Airy Open Services Bento with Auto-Highlighting & Cursor Spotlight
 * 3. TechStackSection          - Interactive Auto-Cycling Live Tech Workbench
 * 4. FaqSection                - Sticky 2-Column Editorial Split FAQ Accordion & Consult Desk Card
 * 5. ReadyCtaSection           - Elevated Light Pastel Sapphire CTA Frame above Matte Black Footer
 */

import React from 'react';
import HomeHeroSection from './home/HomeHeroSection';
import ServicesShowcaseSection from '../components/ServicesShowcaseSection';
import TechStackSection from '../components/TechStackSection';
import FaqSection from '../components/FaqSection';
import ReadyCtaSection from '../components/ReadyCtaSection';

const WebHomeView = () => {
  return (
    <div className="space-y-6 sm:space-y-10 pb-0">
      <HomeHeroSection />
      <ServicesShowcaseSection />
      <TechStackSection />
      <FaqSection />
      <ReadyCtaSection />
    </div>
  );
};

export default WebHomeView;
