import React from 'react';
import { RESOURCES } from '../data/resources.js';

export default function Library() {
  return (
    <div className="page">
      <div className="page-head">
        <div className="page-kicker"><i />Study library</div>
        <h1>Practise here. Take the real papers from the people who write them.</h1>
        <p className="lede">
          NOVEM gives you feedback. It cannot give you authentic questions, and no unofficial site can
          either. Everything below is free unless marked otherwise, and the official material comes first
          because it is the only material that matches the real test.
        </p>
      </div>

      {RESOURCES.map((group) => (
        <div key={group.group} style={{ marginBottom: '2.4rem' }}>
          <h2>{group.group}</h2>
          <div className="grid two">
            {group.items.map((r) => (
              <a className="res" key={r.url} href={r.url} target="_blank" rel="noreferrer">
                <div className="res-name">{r.name}</div>
                <div className="res-host">{r.host}</div>
                <p>{r.note}</p>
              </a>
            ))}
          </div>
        </div>
      ))}

      <div className="panel navy">
        <h3 className="panel-title">A four-week plan that fits around a job</h3>
        <ul className="plain">
          <li><strong>Week 1.</strong> One official full practice test under timed conditions, start to finish, to find out where you actually are.</li>
          <li><strong>Week 2.</strong> Your two weakest sections only. One NOVEM practice each day plus one official paper at the weekend.</li>
          <li><strong>Week 3.</strong> Writing every other day, marked here. Speaking mock test twice. Keep reading timed.</li>
          <li><strong>Week 4.</strong> Two full official papers. Stop learning new vocabulary and fix the errors that keep repeating in your feedback.</li>
        </ul>
      </div>
    </div>
  );
}
