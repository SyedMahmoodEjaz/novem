import React from 'react';
import { BANDS } from '../data/bands.js';

function Fix({ f }) {
  return (
    <div className="fix">
      <div className="fix-line">
        <span className="fix-old">{f.original}</span>
        <span style={{ color: 'var(--red)' }}>&rarr;</span>
        <span className="fix-new">{f.fixed}</span>
        {f.type && <span className="tag">{f.type}</span>}
      </div>
      {f.why && <p className="fix-why">{f.why}</p>}
    </div>
  );
}

export default function BandReport({ report }) {
  if (!report) return null;
  const name = BANDS.find((b) => b.n === Math.floor(report.overall))?.name || '';

  return (
    <div className="stack">
      <div className="panel">
        <div className="overall">
          <span className="overall-num">{report.overall}</span>
          <span className="overall-txt">estimated band · {name}</span>
        </div>

        <div className="meter">
          {(report.criteria || []).map((c, i) => (
            <div className="meter-row" key={c.name}>
              <span className="meter-name">{c.name}</span>
              <span className="meter-track">
                <span
                  className="meter-fill"
                  style={{ width: `${(c.band / 9) * 100}%`, animationDelay: `${i * 110}ms` }}
                />
              </span>
              <span className="meter-val">{c.band}</span>
            </div>
          ))}
        </div>

        <div className="stack" style={{ marginTop: '1.4rem', gap: '0.8rem' }}>
          {(report.criteria || []).map((c) => (
            <p key={c.name} style={{ margin: 0, fontSize: '0.96rem' }}>
              <strong>{c.name}.</strong> {c.comment}
            </p>
          ))}
        </div>
      </div>

      {report.priorities?.length > 0 && (
        <div className="panel navy">
          <h3 className="panel-title">Change these three things first</h3>
          <ul className="plain">
            {report.priorities.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      )}

      {report.corrections?.length > 0 && (
        <div className="panel">
          <h3 className="panel-title">Line-by-line corrections</h3>
          <div className="fixes">
            {report.corrections.map((f, i) => <Fix key={i} f={f} />)}
          </div>
        </div>
      )}

      {report.upgrades?.length > 0 && (
        <div className="panel">
          <h3 className="panel-title">Say it at a higher band</h3>
          <div className="fixes">
            {report.upgrades.map((u, i) => (
              <div className="fix" key={i}>
                <div className="fix-line">
                  <span className="fix-old">{u.plain}</span>
                  <span style={{ color: 'var(--red)' }}>&rarr;</span>
                  <span className="fix-new">{u.better}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {report.strengths?.length > 0 && (
        <div className="panel">
          <h3 className="panel-title">What already works</h3>
          <ul className="plain">
            {report.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}

      {report.improvedParagraph && (
        <div className="panel">
          <h3 className="panel-title">One of your paragraphs, rewritten at band 8</h3>
          <p>{report.improvedParagraph}</p>
          {report.wordCountNote && <p className="note">{report.wordCountNote}</p>}
        </div>
      )}

      {report.modelAnswer && (
        <div className="panel">
          <h3 className="panel-title">How a band 9 candidate would answer</h3>
          <p>{report.modelAnswer}</p>
        </div>
      )}
    </div>
  );
}
