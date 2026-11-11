/**
 * WebErrorBoundary.jsx - [COMPONENT]
 * Resilient Error Boundary that prevents blank screens.
 */

import React from 'react';

class WebErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("WebErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center text-white bg-slate-900/90 rounded-2xl border border-rose-500/50 m-6">
          <h2 className="text-xl font-black text-rose-400">Rendering Issue Detected</h2>
          <p className="text-xs text-slate-300 mt-2 font-mono">{this.state.error?.message || "Unknown error"}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-5 py-2 rounded-full text-xs font-bold bg-cyan-400 text-slate-950 cursor-pointer"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default WebErrorBoundary;

