import React from 'react';
import Disclose from './Disclose.jsx';
import {
  LISTENING_PARTS, LISTENING_TYPES, LISTENING_RULES,
  READING_PASSAGES, READING_PLAN, READING_TYPES, READING_ORDER, READING_RULES,
  WRITING_WEIGHT, TASK1_TYPES, TASK2_TYPES, TASK2_CLOCK, TASK2_STEPS, PEEL, WRITING_WARNING
} from '../data/playbook.js';

function Rules({ items }) {
  return (
    <div>
      {items.map((r, i) => (
        <div className="rule-item" key={i}>
          <div className="rule-name">{i + 1}. {r.rule}</div>
          <p style={{ marginBottom: 0 }}>{r.body}</p>
          {r.example && <p className="rule-eg">{r.example}</p>}
        </div>
      ))}
    </div>
  );
}

export function ListeningPlaybook() {
  return (
    <div>
      <Disclose title="What each of the four parts contains" note="Format">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Part</th><th>Context</th><th>Speakers</th><th>Level</th><th>What it tests</th></tr>
            </thead>
            <tbody>
              {LISTENING_PARTS.map((p) => (
                <tr key={p.part}>
                  <td><strong>{p.part}</strong></td>
                  <td>{p.context}</td>
                  <td>{p.speakers}</td>
                  <td>{p.level}</td>
                  <td>{p.tests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note" style={{ marginTop: '1rem', marginBottom: 0 }}>
          Around 30 minutes, 40 questions. Paper test adds 10 minutes to transfer answers; the
          computer-delivered test gives you 2 minutes to review instead.
        </p>
      </Disclose>

      <Disclose title="The six question types" note="What you will be asked">
        <div className="tbl-wrap">
          <table className="tbl">
            <tbody>
              {LISTENING_TYPES.map((t, i) => (
                <tr key={t.name}>
                  <td style={{ width: '32px', color: 'var(--red)', fontFamily: 'var(--display)' }}>{i + 1}</td>
                  <td><strong>{t.name}</strong></td>
                  <td>{t.where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Disclose>

      <Disclose title="Five rules that move you off band 5.5" note="Technique" tone="navy">
        <Rules items={LISTENING_RULES} />
      </Disclose>
    </div>
  );
}

export function ReadingPlaybook() {
  return (
    <div>
      <Disclose title="The three passages, and how long each deserves" note="Format">
        <div style={{ marginBottom: '1.3rem' }}>
          {READING_PASSAGES.map((p) => (
            <p key={p.n}><strong>{p.n}.</strong> {p.desc}</p>
          ))}
        </div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Passage</th><th>Clock</th><th>Questions</th><th>Target for band 7.5–8</th></tr>
            </thead>
            <tbody>
              {READING_PLAN.map((r) => (
                <tr key={r.part}>
                  <td><strong>{r.part}</strong></td>
                  <td>{r.time}</td>
                  <td>{r.count}</td>
                  <td>{r.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note" style={{ marginTop: '1rem', marginBottom: 0 }}>
          60 minutes, 40 questions, 2,150 to 2,750 words of text. There is no extra transfer time:
          every answer must be on the answer sheet inside the hour.
        </p>
      </Disclose>

      <Disclose title="The seven question types" note="What you will be asked">
        <div className="tbl-wrap">
          <table className="tbl">
            <tbody>
              {READING_TYPES.map((t, i) => (
                <tr key={t.name}>
                  <td style={{ width: '32px', color: 'var(--red)', fontFamily: 'var(--display)' }}>{i + 1}</td>
                  <td><strong>{t.name}</strong></td>
                  <td>{t.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Disclose>

      <Disclose title="Which question types follow the order of the text" note="Saves minutes">
        <div className="two-col">
          <div>
            <div className="col-head yes">Always follow text order</div>
            <ul className="plain">{READING_ORDER.follows.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
          <div>
            <div className="col-head no">Do not follow text order</div>
            <ul className="plain">{READING_ORDER.scattered.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
        </div>
        <p className="note" style={{ marginTop: '1.1rem', marginBottom: 0 }}>{READING_ORDER.tip}</p>
      </Disclose>

      <Disclose title="Five rules that move you off band 5.5" note="Technique" tone="navy">
        <Rules items={READING_RULES} />
      </Disclose>
    </div>
  );
}

export function WritingPlaybook() {
  return (
    <div>
      <Disclose title="How the hour splits, and what each task is worth" note="Format">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Task</th><th>Time</th><th>Words</th><th>Weight</th></tr>
            </thead>
            <tbody>
              {WRITING_WEIGHT.map((w) => (
                <tr key={w.task}>
                  <td><strong>{w.task}</strong></td>
                  <td>{w.time}</td>
                  <td>{w.words}</td>
                  <td>{w.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note" style={{ marginTop: '1rem', marginBottom: 0 }}>
          Task 2 carries twice the weight of Task 1. If you are running out of time, protect Task 2.
        </p>
      </Disclose>

      <Disclose title="Every visual you might be given in Task 1" note="7 types">
        <div className="tbl-wrap">
          <table className="tbl">
            <tbody>
              {TASK1_TYPES.map((t, i) => (
                <tr key={t.name}>
                  <td style={{ width: '32px', color: 'var(--red)', fontFamily: 'var(--display)' }}>{i + 1}</td>
                  <td><strong>{t.name}</strong></td>
                  <td>{t.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Disclose>

      <Disclose title="Every question shape in Task 2" note="5 types">
        <div className="tbl-wrap">
          <table className="tbl">
            <tbody>
              {TASK2_TYPES.map((t, i) => (
                <tr key={t.name}>
                  <td style={{ width: '32px', color: 'var(--red)', fontFamily: 'var(--display)' }}>{i + 1}</td>
                  <td><strong>{t.name}</strong></td>
                  <td>{t.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Disclose>

      <Disclose title="What to do with the 40 minutes of Task 2" note="Timing" tone="navy">
        <p className="alert" style={{ marginBottom: '1.2rem' }}>{WRITING_WARNING}</p>
        <div className="clock">
          {TASK2_CLOCK.map((c) => (
            <div className="clock-row" key={c.stage}>
              <span className="clock-mins">{c.mins}</span>
              <span>
                <strong>{c.stage}.</strong> <span className="clock-what">{c.what}</span>
              </span>
            </div>
          ))}
        </div>
      </Disclose>

      <Disclose title="The first five minutes, step by step" note="Before you write a word">
        {TASK2_STEPS.map((s, i) => (
          <div className="rule-item" key={s.step}>
            <div className="rule-name">Step {i + 1}: {s.step} <span style={{ color: 'var(--chalk-dim)', fontWeight: 400 }}>· {s.time}</span></div>
            <p style={{ marginBottom: 0 }}>{s.body}</p>
          </div>
        ))}
      </Disclose>

      <Disclose title="PEEL: the shape of every body paragraph" note="Structure">
        <div className="peel">
          {PEEL.map((p, i) => (
            <div className="peel-card" key={i}>
              <div className="peel-l">{p.letter}</div>
              <div className="peel-w">{p.word}</div>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </Disclose>
    </div>
  );
}
