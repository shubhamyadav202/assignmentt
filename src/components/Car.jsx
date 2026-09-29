import React, { forwardRef } from 'react';
import carImage from '../assets/car.png';

const Car = forwardRef(function Car({ className = '', style = {} }, ref) {
  return (
    <div
      ref={ref}
      className={`car-wrapper ${className}`}
      style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        zIndex: 15,
        willChange: 'transform',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        ...style
      }}
      aria-hidden="true"
    >
      <img
        src={carImage}
        alt="McLaren 720S orange sports car top-down view"
        className="car-image"
        draggable="false"
        style={{
          display: 'block',
          height: '190px',
          width: 'auto',
          maxWidth: 'none',
          filter: 'drop-shadow(0 14px 20px rgba(0, 0, 0, 0.45)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
          userSelect: 'none'
        }}
      />
    </div>
  );
});

export default Car;
