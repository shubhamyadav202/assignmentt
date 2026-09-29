import React, { forwardRef } from 'react';
import Car from './Car';

const HEADLINE_TEXT = "WELCOME ITZFIZZ";

const HeroBanner = forwardRef(function HeroBanner(
  { carRef, trailRef, lettersRef },
  ref
) {
  const letters = HEADLINE_TEXT.split("");

  return (
    <div className="road-container" ref={ref} id="road">
      {/* Dynamic green trail painted behind the car */}
      <div className="road-trail" ref={trailRef} id="trail" />

      {/* Typography: WELCOME ITZFIZZ revealed dynamically letter-by-letter */}
      <h1 className="road-headline font-heading" aria-label="WELCOME ITZFIZZ">
        {letters.map((char, index) => (
          <span
            key={index}
            ref={(el) => {
              if (lettersRef && lettersRef.current) {
                lettersRef.current[index] = el;
              }
            }}
            className="value-letter"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* Sports Car */}
      <Car ref={carRef} />
    </div>
  );
});

export default HeroBanner;
