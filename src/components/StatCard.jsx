import React from 'react';

export default function StatCard({ id, number, label, bgColor, textColor = '#111111', style = {} }) {
  return (
    <div
      id={id}
      className="stat-card"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        ...style
      }}
      aria-label={`${number} ${label}`}
    >
      <div className="stat-number font-heading">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
