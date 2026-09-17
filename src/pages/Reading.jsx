import React, { useState } from 'react';
import QuestionSet, { grade } from '../components/QuestionSet.jsx';
import Timer from '../components/Timer.jsx';
import Thinking from '../components/Thinking.jsx';
import { READING } from '../data/reading.js';
import { rawToBand } from '../data/bands.js';
import { coach } from '../lib/api.js';
import { ReadingPlaybook } from '../components/Playbook.jsx';
import Reveal, { RevealOnView } from '../components/Reveal.jsx';

export default function Reading() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [running, setRunning] = useState(false);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);

  const test = READING[idx];
  const results = checked ? grade(test.questions, answers) : [];
  const correct = results.filter(Boolean).length;
  const equivalent = Math.round((correct / test.questions.length) * 40);

  const reset = (i) => {
    setIdx(i); setAnswers({}); setChecked(false); setRunning(false); setNote('');
  };

  const check = () => { setChecked(true); setRunning(false); };

  const explain = async () => {
    setBusy(true); setNote('');
    const missed = test.questions
      .map((q, i) => (results[i] ? null : `Q${i + 1}: ${q.q} (correct: ${q.a})`))
      .filter(Boolean).join('\n');
    try {
      const { text } = await coach('explain', [{
        role: 'user',
        content: `IELTS ${test.kind} Reading passage "${test.title}".\n\n${test.body.join('\n\n')}\n\nThe candidate got these wrong:\n${missed}\n\nName the reading habit behind these mistakes and what to do differently.`
      }], 600);
      setNote(text);
    } catch (e) { setNote(e.message); }
    setBusy(false);
  };

  return (
    <div className="page">
      <Reveal step={110} className="page-head">
        <div className="page-kicker"><i />Section 02 · Reading</div>
        <h1>Sixty minutes, forty answers, no time to read properly.</h1>
        <p className="lede">
          Reading is a search task, not a comprehension task. Work out what the question is asking for,
          find the paraphrase in the passage, take the answer, move on.
        </p>
      </Reveal>

      <RevealOnView>
        <div style={{ marginBottom: '2rem' }}>
          <ReadingPlaybook />
        </div>
      </RevealOnView>

      <div className="gate-q" style={{ fontSize: 'var(--t-lg)', marginBottom: '0.8rem' }}>Choose a passage</div>
      <div className="row" style={{ marginBottom: '1.25rem' }}>
        {READING.map((t, i) => (
          <button key={t.id} className={`opt ${idx === i ? 'picked' : ''}`} onClick={() => reset(i)}>
            {t.kind} — {t.title}
          </button>
        ))}
      </div>

      <div className="panel" style={{ marginBottom: '1.25rem' }}>
        <div className="spread">
          <div className="row">
            <Timer minutes={20} running={running} onDone={check} />
            <span className="note">Twenty minutes is the share of the hour one passage deserves.</span>
          </div>
          <div className="row">
            {!running && !checked && <button className="btn primary" onClick={() => setRunning(true)}>Start the clock</button>}
            {running && <button className="btn" onClick={() => setRunning(false)}>Pause</button>}
          </div>
        </div>
      </div>

      <div className="split">
        <div className="panel">
          <h3 className="panel-title">{test.title}</h3>
          <div className="passage">
            {test.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>

        <div className="stack">
          <div className="panel">
            <h3 className="panel-title">Questions 1–{test.questions.length}</h3>
            <QuestionSet
              questions={test.questions}
              answers={answers}
              setAnswers={setAnswers}
              checked={checked}
            />

            <div className="row" style={{ marginTop: '1.4rem' }}>
              {!checked ? (
                <button className="btn primary" onClick={check}>Check my answers</button>
              ) : (
                <>
                  <button className="btn" onClick={() => reset(idx)}>Try again</button>
                  {correct < test.questions.length && (
                    <button className="btn" onClick={explain} disabled={busy}>Explain what I missed</button>
                  )}
                </>
              )}
            </div>

            {busy && <div style={{ marginTop: '1rem' }}><Thinking label="Re-reading the passage" /></div>}
            {note && <p className="note" style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>{note}</p>}
          </div>

          {checked && (
            <div className="panel navy">
              <div className="overall">
                <span className="overall-num">{correct}/{test.questions.length}</span>
                <span className="overall-txt">this passage</span>
              </div>
              <p style={{ marginBottom: 0 }}>
                At the same rate over a full paper that is about {equivalent} out of 40, which converts to{' '}
                <strong>band {rawToBand('reading', equivalent)}</strong> on the {test.kind} scale.
              </p>
            </div>
          )}

          <div className="panel">
            <h3 className="panel-title">The three traps</h3>
            <ul className="plain">
              <li><strong>Word matching.</strong> The option that repeats a word from the passage is usually wrong. The right one paraphrases.</li>
              <li><strong>Not Given.</strong> If the passage neither states it nor contradicts it, that is Not Given, however obvious it seems.</li>
              <li><strong>Overrun.</strong> Two minutes per question is the budget. Guess and move, then come back only if time allows.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
