import React from 'react';

export default function Header({ scrollProgress = 0 }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <span className="brand-badge">ITZFIZZ</span>
        <span className="brand-subtitle">Interactive Showcase</span>
      </div>

      <div className="header-right">
        <div className="telemetry-pill">
          <span className="pulse-dot" />
          <span className="telemetry-text font-mono">
            PROGRESS: {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </header>
  );
}
