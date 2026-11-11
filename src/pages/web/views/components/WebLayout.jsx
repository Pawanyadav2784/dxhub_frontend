/**
 * WebLayout.jsx - [VIEW COMPONENT]
 * Clean Executive Light Layout Container for DXHUB Web & Corporate Pages.
 * Features a crisp pearl-white canvas with refined architectural daylight wash,
 * smooth route transition choreography across pages, and matte black footer anchor.
 */

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import WebNavbar from './WebNavbar';
import WebFooter from './WebFooter';
import WebErrorBoundary from './WebErrorBoundary';

const WebLayout = () => {
  const location = useLocation();

  return (
    <WebErrorBoundary>
      <div className="flex flex-col min-h-screen bg-[#fafbfd] text-slate-900 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
        {/* Subtle Architectural Daylight Wash */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_90%_45%_at_50%_-10%,rgba(37,99,235,0.06),transparent)]" />

        <WebNavbar />

        <main className="flex-grow relative z-10 pt-[76px]">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </main>

        <WebFooter />
      </div>
    </WebErrorBoundary>
  );
};

export default WebLayout;
