import React from 'react';
const HEIGHTS = [0.4, 0.75, 1, 0.55, 0.9, 0.35, 0.8, 1, 0.6, 0.45, 0.85, 0.5];

export default function Wave({ active }) {
  return (
    <span className={`wave ${active ? '' : 'idle'}`} aria-hidden="true">
      {HEIGHTS.map((h, i) => (
        <i key={i} style={{ animationDelay: `${i * 70}ms`, transform: `scaleY(${h})` }} />
      ))}
    </span>
  );
}
