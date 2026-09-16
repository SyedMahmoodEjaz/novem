import React, { useState } from 'react';
import { BANDS } from '../data/bands.js';

// The hero. Nine is the top of the scale, so the scale itself is the first thing you see.
export default function BandRuler() {
  const [sel, setSel] = useState(7);
  const band = BANDS.find((b) => b.n === sel);

  return (
    <div className="ruler-wrap">
      <div className="ruler" role="group" aria-label="IELTS band scale">
        {BANDS.slice().reverse().map((b, i) => (
          <button
            key={b.n}
            className={`tick ${sel === b.n ? 'on' : ''}`}
            onClick={() => setSel(b.n)}
            onMouseEnter={() => setSel(b.n)}
            aria-label={`Band ${b.n}, ${b.name}`}
            aria-pressed={sel === b.n}
          >
            <span
              className="tick-bar"
              style={{ height: `${26 + b.n * 8}%`, animationDelay: `${i * 45}ms` }}
            />
            <span className="tick-label">{b.n}</span>
          </button>
        ))}
      </div>

      <div className="ruler-read">
        <div className="ruler-band">{band.n}</div>
        <div>
          <div className="ruler-name">{band.name}</div>
          <p className="ruler-desc">{band.desc}</p>
        </div>
      </div>
    </div>
  );
}
