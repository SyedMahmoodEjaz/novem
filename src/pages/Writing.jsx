import React, { useMemo, useState } from 'react';
import Timer from '../components/Timer.jsx';
import Thinking from '../components/Thinking.jsx';
import BandReport from '../components/BandReport.jsx';
import { WRITING_TASKS } from '../data/tasks.js';
import { coach, parseJSON } from '../lib/api.js';

export default function Writing() {
  const [taskId, setTaskId] = useState(WRITING_TASKS[2].id);
  const [text, setText] = useState('');
  const [running, setRunning] = useState(false);
  const [report, setReport] = useState(null);
  const [fixes, setFixes] = useState(null);
  const [busy, setBusy] = useState('');
  const [err, setErr] = useState('');

  const task = WRITING_TASKS.find((t) => t.id === taskId);
  const words = useMemo(() => text.trim().split(/\s+/).filter(Boolean).length, [text]);
  const short = words < task.words;

  const pick = (id) => {
    setTaskId(id); setText(''); setReport(null); setFixes(null); setErr(''); setRunning(false);
  };

  const mark = async () => {
    setBusy('mark'); setErr(''); setReport(null); setFixes(null); setRunning(false);
    try {
      const { text: raw } = await coach('writing', [{
        role: 'user',
        content: `Task type: ${task.label}. Minimum ${task.words} words.\n\nTASK:\n${task.prompt}\n\n---\nCANDIDATE ANSWER (${words} words):\n${text}`
      }], 2600);
      setReport(parseJSON(raw));
    } catch (e) { setErr(e.message); }
    setBusy('');
  };

  const fix = async () => {
    setBusy('fix'); setErr(''); setFixes(null);
    try {
      const { text: raw } = await coach('grammar', [{ role: 'user', content: text }], 1800);
      setFixes(parseJSON(raw));
    } catch (e) { setErr(e.message); }
    setBusy('');
  };

  return (
    <div className="page">
      <div className="page-head">
        <div className="page-kicker"><i />Section 03 · Writing</div>
        <h1>Two tasks, four criteria, and one hour that disappears.</h1>
        <p className="lede">
          Write against the clock, then get the same four marks a real examiner gives, with every error
          named. Task 2 is worth twice Task 1, so if you are short of time, sacrifice Task 1.
        </p>
      </div>

      <div className="row" style={{ marginBottom: '1.25rem' }}>
        {WRITING_TASKS.map((t) => (
          <button key={t.id} className={`opt ${taskId === t.id ? 'picked' : ''}`} onClick={() => pick(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="split">
        <div className="stack">
          <div className="panel navy">
            <div className="spread" style={{ marginBottom: '0.9rem' }}>
              <h3 style={{ margin: 0 }}>Your task</h3>
              <Timer minutes={task.minutes} running={running} onDone={() => setRunning(false)} />
            </div>
            <p style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>{task.prompt}</p>
            <div className="row">
              {!running
                ? <button className="btn" onClick={() => setRunning(true)}>Start the {task.minutes}-minute clock</button>
                : <button className="btn" onClick={() => setRunning(false)}>Pause</button>}
            </div>
          </div>

          <div className="panel">
            <div className="spread" style={{ marginBottom: '0.6rem' }}>
              <label className="field" htmlFor="essay" style={{ margin: 0 }}>Your answer</label>
              <span className={`counter ${short ? 'short' : 'good'}`}>
                {words} words · minimum {task.words}
              </span>
            </div>
            <textarea
              id="essay"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Plan for five minutes, then write without stopping. You can fix the wording afterwards."
            />

            <div className="row" style={{ marginTop: '1rem' }}>
              <button className="btn primary" onClick={mark} disabled={busy !== '' || words < 40}>
                Mark this like an examiner
              </button>
              <button className="btn" onClick={fix} disabled={busy !== '' || words < 10}>
                Just fix my English
              </button>
              {words < 40 && <span className="note">Write at least 40 words before marking.</span>}
            </div>

            {busy === 'mark' && <div style={{ marginTop: '1rem' }}><Thinking label="Marking against the band descriptors" /></div>}
            {busy === 'fix' && <div style={{ marginTop: '1rem' }}><Thinking label="Correcting your English" /></div>}
            {err && <p className="alert" style={{ marginTop: '1rem' }}>{err}</p>}
          </div>

          {fixes && (
            <div className="panel">
              <h3 className="panel-title">Corrected version</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{fixes.corrected}</p>
              <div className="fixes">
                {(fixes.corrections || []).map((f, i) => (
                  <div className="fix" key={i}>
                    <div className="fix-line">
                      <span className="fix-old">{f.original}</span>
                      <span style={{ color: 'var(--red)' }}>&rarr;</span>
                      <span className="fix-new">{f.fixed}</span>
                      <span className="tag">{f.type}</span>
                    </div>
                    <p className="fix-why">{f.why}</p>
                  </div>
                ))}
              </div>
              {fixes.note && <p className="note" style={{ marginTop: '1rem' }}>{fixes.note}</p>}
            </div>
          )}
        </div>

        <div className="stack">
          {report ? <BandReport report={report} /> : (
            <>
              <div className="panel">
                <h3 className="panel-title">What the four criteria actually reward</h3>
                <ul className="plain">
                  <li><strong>Task Response.</strong> Did you answer this question, fully, with a clear position held to the end?</li>
                  <li><strong>Coherence and Cohesion.</strong> One idea per paragraph, in an order a reader can predict. Linking words are not enough.</li>
                  <li><strong>Lexical Resource.</strong> Precise, natural word choice. Rare words used wrongly score lower than common words used well.</li>
                  <li><strong>Grammatical Range and Accuracy.</strong> A mix of sentence shapes, most of them error free.</li>
                </ul>
              </div>
              <div className="panel">
                <h3 className="panel-title">A structure that never fails Task 2</h3>
                <ul className="plain">
                  <li>Introduction: rewrite the question in your own words, then state your position in one sentence.</li>
                  <li>Body one: your strongest reason, explained, then one concrete example.</li>
                  <li>Body two: the second reason, or the other side answered.</li>
                  <li>Conclusion: restate the position. Add nothing new.</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
