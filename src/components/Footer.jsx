import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <h2 className="footer-title">ITZFIZZ Interactive Car Experience</h2>
        <p className="footer-desc">
          Engineered with GSAP ScrollTrigger, dynamic SVG/Canvas matrix transforms, and real-time scrubbing. Built with React and Vite for optimal 60 FPS fluid rendering.
        </p>
        <div className="footer-badges">
          <span className="tech-badge">React 19</span>
          <span className="tech-badge">GSAP 3.12</span>
          <span className="tech-badge">ScrollTrigger</span>
          <span className="tech-badge">60 FPS Scrubbing</span>
          <span className="tech-badge">Responsive CSS</span>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="scroll-pill"
        style={{ marginTop: '1rem', border: '1px solid #444' }}
        aria-label="Scroll back to top to experience drive again"
      >
        <span className="scroll-text font-mono">↑ DRIVE AGAIN (TOP)</span>
      </button>
    </footer>
  );
}
