import React, { useEffect, useRef, useState } from 'react';
import QuestionSet, { grade } from '../components/QuestionSet.jsx';
import Wave from '../components/Wave.jsx';
import Thinking from '../components/Thinking.jsx';
import { LISTENING } from '../data/listening.js';
import { rawToBand } from '../data/bands.js';
import { canSpeak, speakScript, stopSpeaking } from '../lib/speech.js';
import { coach } from '../lib/api.js';

export default function Listening() {
  const [setIdx, setSetIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [line, setLine] = useState(-1);
  const [played, setPlayed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showScript, setShowScript] = useState(false);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const stopRef = useRef(null);

  const test = LISTENING[setIdx];

  useEffect(() => () => stopSpeaking(), []);

  const reset = (i) => {
    stopSpeaking();
    setSetIdx(i); setPlaying(false); setLine(-1); setPlayed(false);
    setAnswers({}); setChecked(false); setShowScript(false); setNote('');
  };

  const play = () => {
    setPlaying(true); setPlayed(true); setLine(-1);
    stopRef.current = speakScript(test.lines, {
      onLine: setLine,
      onEnd: () => { setPlaying(false); setLine(-1); }
    });
  };

  const stop = () => { stopSpeaking(); setPlaying(false); setLine(-1); };

  const results = checked ? grade(test.questions, answers) : [];
  const correct = results.filter(Boolean).length;
  const equivalent = Math.round((correct / test.questions.length) * 40);

  const explain = async () => {
    setBusy(true); setNote('');
    const missed = test.questions
      .map((q, i) => (results[i] ? null : `Q${i + 1}: ${q.q} (correct answer: ${q.a})`))
      .filter(Boolean).join('\n');
    try {
      const { text } = await coach('explain', [{
        role: 'user',
        content: `IELTS Listening, ${test.part}: ${test.title}.\nTranscript:\n${test.lines.map((l) => l.s + ': ' + l.t).join('\n')}\n\nThe candidate got these wrong:\n${missed}\n\nExplain the listening habit behind these mistakes.`
      }], 600);
      setNote(text);
    } catch (e) { setNote(e.message); }
    setBusy(false);
  };

  return (
    <div className="page">
      <div className="page-head">
        <div className="page-kicker"><i />Section 01 · Listening</div>
        <h1>You hear it once. Everything depends on reading ahead.</h1>
        <p className="lede">
          These recordings are spoken by your browser, so the accent and speed are close to the test but
          not identical. Read the questions first, play once, and only then check.
        </p>
      </div>

      {!canSpeak && (
        <p className="alert">
          This browser cannot speak the recording. Open NOVEM in Chrome, Edge or Safari, or read the
          transcript instead.
        </p>
      )}

      <div className="row" style={{ marginBottom: '1.25rem' }}>
        {LISTENING.map((t, i) => (
          <button key={t.id} className={`opt ${setIdx === i ? 'picked' : ''}`} onClick={() => reset(i)}>
            {t.part} — {t.title}
          </button>
        ))}
      </div>

      <div className="split">
        <div className="stack">
          <div className="panel">
            <div className="spread" style={{ marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0 }}>{test.title}</h3>
                <p className="note" style={{ margin: '0.4rem 0 0' }}>{test.context}</p>
              </div>
              <Wave active={playing} />
            </div>

            <div className="row">
              {!playing ? (
                <button className="btn primary" onClick={play} disabled={!canSpeak}>
                  {played ? 'Play again' : 'Play the recording'}
                </button>
              ) : (
                <button className="btn" onClick={stop}>Stop</button>
              )}
              {played && !playing && (
                <span className="note">In the real test there is no second play. Use it sparingly.</span>
              )}
            </div>

            {playing && line >= 0 && (
              <p className="note" style={{ marginTop: '1rem' }}>
                Speaking now: {test.lines[line].s}
              </p>
            )}
          </div>

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
                <button className="btn primary" onClick={() => setChecked(true)}>Check my answers</button>
              ) : (
                <>
                  <button className="btn" onClick={() => { setChecked(false); setAnswers({}); setNote(''); }}>
                    Try again
                  </button>
                  <button className="btn" onClick={() => setShowScript(!showScript)}>
                    {showScript ? 'Hide transcript' : 'Show transcript'}
                  </button>
                  {correct < test.questions.length && (
                    <button className="btn" onClick={explain} disabled={busy}>
                      Explain what I missed
                    </button>
                  )}
                </>
              )}
            </div>

            {busy && <div style={{ marginTop: '1rem' }}><Thinking label="Working through your answers" /></div>}
            {note && <p className="note" style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>{note}</p>}
          </div>

          {showScript && (
            <div className="panel">
              <h3 className="panel-title">Transcript</h3>
              <div className="passage">
                {test.lines.map((l, i) => (
                  <p key={i}><strong>{l.s}:</strong> {l.t}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="stack">
          {checked && (
            <div className="panel navy">
              <div className="overall">
                <span className="overall-num">{correct}/{test.questions.length}</span>
                <span className="overall-txt">this set</span>
              </div>
              <p style={{ marginBottom: '0.6rem' }}>
                At the same rate across a full 40-question paper that is roughly {equivalent} correct,
                which converts to <strong>band {rawToBand('listening', equivalent)}</strong>.
              </p>
              <p className="note" style={{ marginBottom: 0 }}>
                Six questions is too small a sample to trust. Treat it as a direction, not a score.
              </p>
            </div>
          )}

          <div className="panel">
            <h3 className="panel-title">While you listen</h3>
            <ul className="plain">
              <li>Underline the question word first: who, how many, what kind. That is what you are hunting.</li>
              <li>Write the answer the moment you hear it. Do not wait to be sure.</li>
              <li>If you miss one, let it go immediately. Chasing it costs you the next two.</li>
              <li>Numbers and spellings are said slowly on purpose. That slowness is the signal.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
