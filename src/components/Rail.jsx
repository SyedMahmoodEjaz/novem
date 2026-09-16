import React, { useEffect, useState } from 'react';
import { health } from '../lib/api.js';

const NAV = [
  { id: 'overview', label: 'How the exam works', sub: 'Format, bands, scoring', n: '00' },
  { id: 'listening', label: 'Listening', sub: '30 min · 40 questions', n: '01' },
  { id: 'reading', label: 'Reading', sub: '60 min · 40 questions', n: '02' },
  { id: 'writing', label: 'Writing', sub: '60 min · 2 tasks', n: '03' },
  { id: 'speaking', label: 'Speaking', sub: '11-14 min · 3 parts', n: '04' }
];

const EXTRA = [
  { id: 'library', label: 'Study library', sub: 'Official and free material' },
  { id: 'ask', label: 'Ask the coach', sub: 'Anything about the test' }
];

export default function Rail({ page, go, open, setOpen }) {
  const [engine, setEngine] = useState(null);

  useEffect(() => { health().then(setEngine); }, []);

  const pick = (id) => { go(id); setOpen(false); };

  return (
    <>
      <button className="rail-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
        {open ? 'Close' : 'Menu'}
      </button>

      <nav className={`rail ${open ? 'open' : ''}`} aria-label="Sections">
        <div className="brand">
          <div className="brand-mark">NOVE<span>M</span></div>
          <div className="brand-tag">band 9, or as near as you can get</div>
        </div>

        <div className="rail-nav">
          {NAV.map((item) => (
            <button
              key={item.id}
              className={`rail-link ${page === item.id ? 'on' : ''}`}
              onClick={() => pick(item.id)}
              aria-current={page === item.id ? 'page' : undefined}
            >
              <span className="rail-num">{item.n}</span>
              <span>
                <span className="rail-label">{item.label}</span>
                <span className="rail-sub">{item.sub}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="rail-group">Beyond practice</div>
        <div className="rail-nav">
          {EXTRA.map((item) => (
            <button
              key={item.id}
              className={`rail-link ${page === item.id ? 'on' : ''}`}
              onClick={() => pick(item.id)}
            >
              <span className="rail-num">·</span>
              <span>
                <span className="rail-label">{item.label}</span>
                <span className="rail-sub">{item.sub}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="rail-foot">
          <span className={`status-dot ${engine?.live ? 'live' : ''}`} />
          {engine === null
            ? 'Checking the marking engine'
            : engine.live
              ? `Marking engine: ${engine.provider}`
              : 'Offline mode — add an API key for real marking'}
        </div>
      </nav>
    </>
  );
}
