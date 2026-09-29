import React from 'react';

export default function ScrollIndicator({ scrollProgress = 0, onQuickScroll }) {
  const isScrolled = scrollProgress > 0.05;

  return (
    <div
      className={`scroll-indicator-container ${isScrolled ? 'scrolled-dim' : ''}`}
      aria-hidden="true"
    >
      <div className="scroll-pill" onClick={onQuickScroll}>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span className="scroll-text font-mono">
          {scrollProgress >= 0.95 ? 'REVERSE SCROLL TO DRIVE BACK' : 'SCROLL DOWN TO DRIVE'}
        </span>
      </div>
    </div>
  );
}
