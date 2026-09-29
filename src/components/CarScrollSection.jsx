import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroBanner from './HeroBanner';
import Stats from './Stats';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function CarScrollSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    // Accessibility check: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Use GSAP context for safe React 19 lifecycle cleanup
    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current;
      const trackEl = trackRef.current;
      const carEl = carRef.current;
      const trailEl = trailRef.current;
      const roadEl = roadRef.current;
      const letters = lettersRef.current.filter(Boolean);

      if (!sectionEl || !trackEl || !carEl || !trailEl || !roadEl) return;

      // Setup initial visual states
      gsap.set(trailEl, { width: 0 });
      letters.forEach((letter) => {
        gsap.set(letter, { opacity: 0, y: 3 });
      });

      // Stat cards initial state (hidden and subtly offset)
      const boxes = [
        { id: '#box1', isTop: true },
        { id: '#box2', isTop: false },
        { id: '#box3', isTop: true },
        { id: '#box4', isTop: false }
      ];

      boxes.forEach(({ id, isTop }) => {
        gsap.set(id, {
          opacity: 0,
          y: isTop ? -20 : 20,
          scale: 0.95
        });
      });

      // Compute dynamic geometry based on current viewport
      const computeMetrics = () => {
        const roadWidth = roadEl.offsetWidth || window.innerWidth;
        const carImg = carEl.querySelector('img');
        const carWidth = carImg?.offsetWidth || 360;
        
        // Car starts at the left edge of the road
        const startX = 0;
        // Car drives all the way towards the right edge
        const endX = roadWidth - (carWidth * 0.25);

        // Precompute threshold for each letter
        const roadRect = roadEl.getBoundingClientRect();
        const letterThresholds = letters.map((letter) => {
          const lRect = letter.getBoundingClientRect();
          return (lRect.left - roadRect.left) + (lRect.width * 0.25);
        });

        return { startX, endX, carWidth, letterThresholds };
      };

      let metrics = computeMetrics();

      // Initial placement
      gsap.set(carEl, { x: metrics.startX, force3D: true });

      // Update letters and trail on animation step
      const updateTrailAndLetters = (currentX) => {
        const carMid = currentX + metrics.carWidth * 0.52; // Trail follows the mid-section
        
        // Expand bright green trail
        gsap.set(trailEl, { width: Math.max(0, carMid) });

        // Reveal letters as car drives past them
        metrics.letterThresholds.forEach((threshold, index) => {
          const letter = letters[index];
          if (!letter) return;

          if (carMid >= threshold) {
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0) scale(1)';
          } else {
            letter.style.opacity = '0';
            letter.style.transform = 'translateY(3px) scale(0.96)';
          }
        });
      };

      if (prefersReducedMotion) {
        // Reduced motion mode: static, high contrast presentation
        gsap.set(carEl, { x: metrics.endX * 0.5 });
        gsap.set(trailEl, { width: '100%' });
        letters.forEach((l) => gsap.set(l, { opacity: 1, y: 0 }));
        boxes.forEach(({ id }) => gsap.set(id, { opacity: 1, y: 0, scale: 1 }));
        return;
      }

      // Initial subtle stage reveal
      gsap.fromTo(
        trackEl,
        { opacity: 0.6 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
      gsap.fromTo(
        carEl,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            updateTrailAndLetters(gsap.getProperty(carEl, 'x'));
          }
        }
      );

      // MAIN SCROLLTRIGGER TIMELINE
      // Pinning the stage for a smooth vertical scroll travel of 2200px
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: '+=2400',
          pin: trackEl,
          pinSpacing: true,
          scrub: 1.1, // Fluid 60fps scrub
          invalidateOnRefresh: true
        }
      });

      // 1. Move car horizontally (Duration: 1.0 to span entire timeline)
      // Scroll DOWN: car moves LEFT -> RIGHT
      // Scroll UP: car moves RIGHT -> LEFT
      mainTl.to(
        carEl,
        {
          x: () => metrics.endX,
          duration: 1.0,
          ease: 'none',
          force3D: true,
          onUpdate: () => {
            const currentX = gsap.getProperty(carEl, 'x');
            updateTrailAndLetters(currentX);
          }
        },
        0
      );

      // 2. Animate 4 Statistic Cards sequentially along the scroll progress
      // Card 1: 58% (lime top-left) reveals at ~15%-30%
      mainTl.to(
        '#box1',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.15,
          ease: 'power2.out'
        },
        0.15
      );

      // Card 2: 23% (blue bottom-left) reveals at ~35%-50%
      mainTl.to(
        '#box2',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.15,
          ease: 'power2.out'
        },
        0.35
      );

      // Card 3: 27% (charcoal top-right) reveals at ~58%-73%
      mainTl.to(
        '#box3',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.15,
          ease: 'power2.out'
        },
        0.58
      );

      // Card 4: 40% (orange bottom-right) reveals at ~78%-93%
      mainTl.to(
        '#box4',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.15,
          ease: 'power2.out'
        },
        0.78
      );

      // Window resize handler: recalculate metrics and sync
      const handleResize = () => {
        metrics = computeMetrics();
        const currentProgress = mainTl.scrollTrigger ? mainTl.scrollTrigger.progress : 0;
        const currentX = metrics.startX + (metrics.endX - metrics.startX) * currentProgress;
        updateTrailAndLetters(currentX);
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, sectionRef.current);

    return () => {
      ctx.revert(); // Complete GSAP cleanup
    };
  }, []);

  return (
    <section className="car-scroll-section" ref={sectionRef} id="experience">
      {/* Sticky/Pinned Visual Stage */}
      <div className="track-stage" ref={trackRef}>
        {/* 4 Surrounding Metric Cards */}
        <Stats />

        {/* Center Road Banner with dynamic green trail, headline letters & McLaren */}
        <HeroBanner
          ref={roadRef}
          carRef={carRef}
          trailRef={trailRef}
          lettersRef={lettersRef}
        />
      </div>
    </section>
  );
}
