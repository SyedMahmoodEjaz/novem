import React, { useState } from 'react';
import BandRuler from '../components/BandRuler.jsx';
import Reveal, { RevealOnView } from '../components/Reveal.jsx';
import Disclose from '../components/Disclose.jsx';
import { SECTIONS, OVERALL_RULE } from '../data/bands.js';

const STARTS = [
  {
    id: 'new',
    label: 'I have never taken IELTS',
    body: 'Start with the band scale below so the numbers mean something, then read one section at a time. Do not take a full practice test yet.',
    go: null
  },
  {
    id: 'stuck',
    label: 'I keep scoring the same band',
    body: 'Your problem is usually technique, not English. Open the section you are stuck on and read its five rules before doing any more practice.',
    go: null
  },
  {
    id: 'soon',
    label: 'My test is in a few weeks',
    body: 'Work on timing. Every practice page here has a clock. Use it every time, and mark your writing after each attempt.',
    go: 'writing'
  }
];

export default function Overview({ go }) {
  const [who, setWho] = useState(null);
  const [open, setOpen] = useState(null);

  const chosen = STARTS.find((s) => s.id === who);

  return (
    <div className="page">
      <Reveal step={110}>
        <div className="page-kicker"><i />Start here</div>

        <h1>Everything about IELTS is a scale, so learn to read the scale first.</h1>

        <p className="lede" style={{ marginBottom: '2.2rem' }}>
          Four sections, one number each, averaged into an overall band between 0 and 9. Nothing here
          is pass or fail. Move along the scale to see what each band actually means to the university
          or visa office reading it.
        </p>

        <BandRuler />
      </Reveal>

      <RevealOnView>
        <div className="stage-gate">
          <div className="gate-q">Where are you starting from?</div>

          <div className="pick-grid">
            {STARTS.map((s, i) => (
              <button
                key={s.id}
                className={`pick ${who === s.id ? 'on' : ''}`}
                onClick={() => setWho(who === s.id ? null : s.id)}
              >
                <span className="pick-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="pick-name">{s.label}</span>
              </button>
            ))}
          </div>

          {chosen ? (
            <div className="panel navy" style={{ marginTop: '1rem', animation: 'reveal-up 0.4s var(--ease) both' }}>
              <p style={{ marginBottom: chosen.go ? '1rem' : 0 }}>{chosen.body}</p>
              {chosen.go && (
                <button className="btn primary" onClick={() => go(chosen.go)}>
                  Go to Writing practice
                </button>
              )}
            </div>
          ) : (
            <div className="gate-hint"><i />Pick one and the rest of this page adjusts to it.</div>
          )}
        </div>
      </RevealOnView>

      <RevealOnView>
        <div className="panel">
          <h3 className="panel-title">How your overall band is worked out</h3>
          <p style={{ marginBottom: 0 }}>{OVERALL_RULE}</p>
        </div>
      </RevealOnView>

      <hr className="rule" />

      <RevealOnView>
        <h2>The four sections</h2>
        <p style={{ marginBottom: '1.6rem' }}>
          Listening, Reading and Writing run back to back on the same day with no break. Speaking may
          be the same day, or up to a week either side. Open one to see how it works.
        </p>

        <div>
          {SECTIONS.map((s, i) => (
            <Disclose
              key={s.id}
              title={`${String(i + 1).padStart(2, '0')}  ${s.label}`}
              note={`${s.time} · ${s.parts}`}
              open={open === s.id}
              onToggle={(v) => setOpen(v ? s.id : null)}
            >
              <div className="facts" style={{ marginBottom: '1.1rem' }}>
                <div className="fact"><div className="fact-k">Time</div><div className="fact-v">{s.time}</div></div>
                <div className="fact"><div className="fact-k">Shape</div><div className="fact-v">{s.parts}</div></div>
              </div>

              <p>{s.how}</p>
              <p className="note" style={{ marginBottom: '1.2rem' }}>{s.marking}</p>

              <div className="col-head no">Where candidates lose marks</div>
              <ul className="plain" style={{ marginBottom: '1.4rem' }}>
                {s.watch.map((w, k) => <li key={k}>{w}</li>)}
              </ul>

              <button className="btn primary" onClick={() => go(s.id)}>
                Practise {s.label.toLowerCase()}
              </button>
            </Disclose>
          ))}
        </div>
      </RevealOnView>

      <hr className="rule" />

      <RevealOnView>
        <h2>How to use NOVEM</h2>
        <div className="grid three">
          <div className="panel">
            <h3 className="panel-title">One section at a time</h3>
            <p style={{ marginBottom: 0 }}>
              Each section has its own page, its own clock and its own marking. Do not mix them: the
              four skills fail for different reasons.
            </p>
          </div>
          <div className="panel">
            <h3 className="panel-title">Get marked, not praised</h3>
            <p style={{ marginBottom: 0 }}>
              Everything you write or say comes back with a band for each criterion and a list of
              exact corrections. Read the corrections before the band.
            </p>
          </div>
          <div className="panel">
            <h3 className="panel-title">Then go to the real papers</h3>
            <p style={{ marginBottom: 0 }}>
              The study library points you at official British Council and Cambridge material. Use
              NOVEM for feedback, and official papers for question realism.
            </p>
          </div>
        </div>
      </RevealOnView>
    </div>
  );
}
