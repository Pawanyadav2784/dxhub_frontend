/**
 * Trolley3DIcon.jsx - [COMPONENT]
 * Ultra-clean 3D Shopping Trolley / Cart Icon.
 * Pure vector SVG with metallic gradients and red ergonomic handle.
 */

import React from 'react';

const Trolley3DIcon = ({ className = "w-5 h-5", animated = true }) => {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${animated ? 'group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300' : ''}`}>
      <svg 
        viewBox="0 0 36 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
      >
        <defs>
          <linearGradient id="trolleyHandleGrad" x1="2" y1="4" x2="8" y2="12" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff4d4f" />
            <stop offset="50%" stopColor="#f5222d" />
            <stop offset="100%" stopColor="#cf1322" />
          </linearGradient>

          <linearGradient id="trolleyChromeGrad" x1="6" y1="6" x2="30" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#e2e8f0" />
            <stop offset="70%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          <linearGradient id="trolleySideGrad" x1="8" y1="10" x2="28" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="trolleyChassisGrad" x1="10" y1="20" x2="26" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <radialGradient id="trolleyTireGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="70%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
        </defs>

        {/* Ground Contact Shadow */}
        <ellipse cx="20" cy="32" rx="10" ry="2" fill="#000000" fillOpacity="0.25" />

        {/* Undercarriage Frame */}
        <path 
          d="M9 22L12 28.5L27 28.5" 
          stroke="url(#trolleyChassisGrad)" 
          strokeWidth="2.4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M13 22L16 28" 
          stroke="#475569" 
          strokeWidth="1.8" 
          strokeLinecap="round" 
        />

        {/* 3D Basket Rear Wall & Floor */}
        <path 
          d="M9 11L12.5 22L27 21L30.5 10L9 11Z" 
          fill="url(#trolleySideGrad)" 
          stroke="url(#trolleyChromeGrad)" 
          strokeWidth="1.2" 
          strokeLinejoin="round" 
        />

        {/* Wire Mesh Strands */}
        <path d="M10 14.5L29.5 13.5" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="1" strokeLinecap="round" />
        <path d="M11 18L28 17.2" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="1" strokeLinecap="round" />
        <path d="M14 11.5L15.5 21.5" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
        <path d="M18.5 11L19.5 21.3" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
        <path d="M23 10.7L23.8 21.1" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
        <path d="M27.5 10.3L27.8 20.9" stroke="#475569" strokeWidth="1" strokeLinecap="round" />

        {/* Top Rim */}
        <path 
          d="M8.5 10.5L31 9.5L27.5 21.5L12 22.5L8.5 10.5Z" 
          stroke="url(#trolleyChromeGrad)" 
          strokeWidth="1.8" 
          strokeLinejoin="round" 
        />
        <path 
          d="M9.5 10.5L30 9.7" 
          stroke="#ffffff" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
        />

        {/* Handle Struts */}
        <path 
          d="M5 8.5L8.5 14" 
          stroke="url(#trolleyChassisGrad)" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
        />

        {/* Red Ergonomic Handle Grip */}
        <rect 
          x="3.2" 
          y="5.2" 
          width="5" 
          height="5" 
          rx="2.5" 
          fill="url(#trolleyHandleGrad)" 
          stroke="#b91c1c" 
          strokeWidth="0.8" 
        />
        <ellipse cx="5.2" cy="6.6" rx="1.6" ry="0.8" fill="#ffffff" fillOpacity="0.85" />

        {/* Rear Wheel */}
        <path d="M12 27.5L12 29" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="30" r="3" fill="url(#trolleyTireGrad)" stroke="#0f172a" strokeWidth="0.8" />
        <circle cx="12" cy="30" r="1.4" fill="#cbd5e1" />
        <circle cx="12" cy="30" r="0.6" fill="#0f172a" />

        {/* Front Wheel */}
        <path d="M26.5 27.5L26.5 29" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <circle cx="26.5" cy="30" r="3" fill="url(#trolleyTireGrad)" stroke="#0f172a" strokeWidth="0.8" />
        <circle cx="26.5" cy="30" r="1.4" fill="#cbd5e1" />
        <circle cx="26.5" cy="30" r="0.6" fill="#0f172a" />
      </svg>
    </span>
  );
};

export default Trolley3DIcon;
