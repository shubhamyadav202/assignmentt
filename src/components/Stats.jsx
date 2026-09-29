import React from 'react';
import StatCard from './StatCard';

const STATS_DATA = [
  {
    id: 'box1',
    number: '58%',
    label: 'Increase in pick up point use',
    bgColor: '#def54f',
    textColor: '#111111',
    className: 'pos-top-left'
  },
  {
    id: 'box2',
    number: '23%',
    label: 'Decreased in customer phone calls',
    bgColor: '#6ac9ff',
    textColor: '#111111',
    className: 'pos-bottom-left'
  },
  {
    id: 'box3',
    number: '27%',
    label: 'Increase in pick up point use',
    bgColor: '#333333',
    textColor: '#ffffff',
    className: 'pos-top-right'
  },
  {
    id: 'box4',
    number: '40%',
    label: 'Decreased in customer phone calls',
    bgColor: '#fa7328',
    textColor: '#111111',
    className: 'pos-bottom-right'
  }
];

export default function Stats() {
  return (
    <div className="stats-container" aria-label="Key Performance Indicators">
      {STATS_DATA.map((stat) => (
        <StatCard
          key={stat.id}
          id={stat.id}
          number={stat.number}
          label={stat.label}
          bgColor={stat.bgColor}
          textColor={stat.textColor}
          style={{}}
        />
      ))}
    </div>
  );
}
