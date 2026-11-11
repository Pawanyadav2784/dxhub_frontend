/**
 * WebServicesView.jsx - [PAGE VIEW]
 * Full-bleed Illustrated Services Hero Banner flush under Navbar (matching About page style),
 * followed by light spotlight Service Cards, Tech Stack, FAQ, and full-bleed CTA Band.
 */

import React, { useState } from 'react';
import ServicesHeader from './services/ServicesHeader';
import ServicesList from './services/ServicesList';
import TechStackSection from '../components/TechStackSection';
import FaqSection from '../components/FaqSection';
import ReadyCtaSection from '../components/ReadyCtaSection';

const WebServicesView = () => {
  const [activeTab, setActiveTab] = useState('it'); // 'it' | 'non-it'

  return (
    <div className="pb-0">
      <ServicesHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 space-y-12">
        <ServicesList activeTab={activeTab} />
        <TechStackSection />
        <FaqSection />
      </div>
      <ReadyCtaSection />
    </div>
  );
};

export default WebServicesView;
