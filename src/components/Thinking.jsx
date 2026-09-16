import React from 'react';
export default function Thinking({ label = 'Marking' }) {
  return (
    <span className="row" style={{ gap: '0.6rem', color: 'var(--chalk-dim)', fontSize: 'var(--t-sm)' }}>
      <span className="thinking" aria-hidden="true">
        <i style={{ animationDelay: '0ms' }} />
        <i style={{ animationDelay: '140ms' }} />
        <i style={{ animationDelay: '280ms' }} />
        <i style={{ animationDelay: '420ms' }} />
      </span>
      {label}
    </span>
  );
}
