import React from 'react';
import BandRuler from '../components/BandRuler.jsx';
import { SECTIONS, OVERALL_RULE } from '../data/bands.js';

export default function Overview({ go }) {
  return (
    <div className="page">
      <div className="page-head">
        <div className="page-kicker"><i />Start here</div>
        <h1>Everything about IELTS is a scale, so learn to read the scale first.</h1>
        <p className="lede">
          Four sections, one number each, averaged into an overall band between 0 and 9. Nothing here is
          pass or fail. Move the marker below to see what each band actually means to the university or
          visa office reading it.
        </p>
      </div>

      <BandRuler />

      <div className="panel navy" style={{ marginTop: '1.25rem' }}>
        <h3 className="panel-title">How your overall band is worked out</h3>
        <p style={{ marginBottom: 0 }}>{OVERALL_RULE}</p>
      </div>

      <hr className="rule" />

      <h2>The four sections</h2>
      <p style={{ marginBottom: '1.6rem' }}>
        Listening, Reading and Writing run back to back on the same day with no break. Speaking may be
        the same day or up to a week either side.
      </p>

      <div className="stack">
        {SECTIONS.map((s) => (
          <div className="panel" key={s.id}>
            <div className="spread" style={{ marginBottom: '0.9rem' }}>
              <h3 style={{ margin: 0 }}>{s.label}</h3>
              <button className="btn small" onClick={() => go(s.id)}>Practise {s.label.toLowerCase()}</button>
            </div>

            <div className="facts" style={{ marginBottom: '1.1rem' }}>
              <div className="fact"><div className="fact-k">Time</div><div className="fact-v">{s.time}</div></div>
              <div className="fact"><div className="fact-k">Shape</div><div className="fact-v">{s.parts}</div></div>
            </div>

            <p>{s.how}</p>
            <p className="note" style={{ marginBottom: '1rem' }}>{s.marking}</p>

            <h4 style={{ fontSize: 'var(--t-sm)', color: 'var(--chalk-dim)', fontFamily: 'var(--body)', fontWeight: 400, marginBottom: '0.6rem' }}>
              Where candidates lose marks
            </h4>
            <ul className="plain">
              {s.watch.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <hr className="rule" />

      <h2>How to use NOVEM</h2>
      <div className="grid three">
        <div className="panel">
          <h3 className="panel-title">Practise one section at a time</h3>
          <p style={{ marginBottom: 0 }}>
            Each section has its own page with its own clock and its own marking. Do not mix them: the
            skills fail for different reasons.
          </p>
        </div>
        <div className="panel">
          <h3 className="panel-title">Get marked, not praised</h3>
          <p style={{ marginBottom: 0 }}>
            Everything you write or say comes back with a band for each criterion and a list of exact
            corrections. Read the corrections before the band.
          </p>
        </div>
        <div className="panel">
          <h3 className="panel-title">Then go to the real papers</h3>
          <p style={{ marginBottom: 0 }}>
            The study library points you at official British Council and Cambridge material. Use NOVEM for
            feedback, and official papers for question realism.
          </p>
        </div>
      </div>
    </div>
  );
}
