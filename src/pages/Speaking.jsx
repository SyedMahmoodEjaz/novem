import React, { useEffect, useRef, useState } from 'react';
import Wave from '../components/Wave.jsx';
import Timer from '../components/Timer.jsx';
import Thinking from '../components/Thinking.jsx';
import BandReport from '../components/BandReport.jsx';
import { SPEAKING } from '../data/tasks.js';
import { canListen, listen, say, stopSpeaking } from '../lib/speech.js';
import { coach, parseJSON } from '../lib/api.js';

function Recorder({ transcript, setTranscript, onError }) {
  const [on, setOn] = useState(false);
  const ctrl = useRef(null);

  useEffect(() => () => ctrl.current?.stop(), []);

  const toggle = () => {
    if (on) { ctrl.current?.stop(); setOn(false); return; }
    setOn(true);
    ctrl.current = listen({
      onText: setTranscript,
      onEnd: () => setOn(false),
      onError: (m) => { onError(m); setOn(false); }
    });
  };

  return (
    <>
      <div className="spread" style={{ marginBottom: '0.8rem' }}>
        <div className="row">
          <button className="btn primary" onClick={toggle} disabled={!canListen}>
            {on ? 'Stop recording' : 'Record your answer'}
          </button>
          <Wave active={on} />
        </div>
        <span className="counter">{transcript.trim().split(/\s+/).filter(Boolean).length} words</span>
      </div>

      {!canListen && (
        <p className="alert" style={{ marginBottom: '0.8rem' }}>
          This browser cannot transcribe speech. Chrome and Edge can. You can still type your answer below
          and be marked on it.
        </p>
      )}

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        style={{ minHeight: '180px' }}
        placeholder="Speak and your words appear here, or type your answer instead."
      />
    </>
  );
}

export default function Speaking() {
  const [mode, setMode] = useState('single');
  return (
    <div className="page">
      <div className="page-head">
        <div className="page-kicker"><i />Section 04 · Speaking</div>
        <h1>Eleven minutes of talking, marked on how you cope, not on being right.</h1>
        <p className="lede">
          There are no correct opinions in Speaking. You are marked on fluency, vocabulary, grammar and
          pronunciation, so a confident wrong opinion beats a hesitant clever one.
        </p>
      </div>

      <div className="row" style={{ marginBottom: '1.5rem' }}>
        <button className={`opt ${mode === 'single' ? 'picked' : ''}`} onClick={() => setMode('single')}>
          Practise one question
        </button>
        <button className={`opt ${mode === 'mock' ? 'picked' : ''}`} onClick={() => setMode('mock')}>
          Full mock test with an examiner
        </button>
      </div>

      {mode === 'single' ? <Single /> : <Mock />}
    </div>
  );
}

function Single() {
  const [part, setPart] = useState(1);
  const [qi, setQi] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [report, setReport] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [prep, setPrep] = useState(false);

  const cue = SPEAKING.part2[qi % SPEAKING.part2.length];
  const question = part === 1
    ? SPEAKING.part1[qi % SPEAKING.part1.length]
    : part === 3
      ? SPEAKING.part3[qi % SPEAKING.part3.length]
      : `${cue.topic} You should say: ${cue.bullets.join('; ')}.`;

  const next = () => { setQi(qi + 1); setTranscript(''); setReport(null); setErr(''); setPrep(false); };

  const choose = (p) => { setPart(p); setQi(0); setTranscript(''); setReport(null); setErr(''); setPrep(false); };

  const mark = async () => {
    setBusy(true); setErr(''); setReport(null);
    try {
      const { text } = await coach('speaking', [{
        role: 'user',
        content: `Speaking Part ${part}.\nQUESTION: ${question}\n\n---\nCANDIDATE TRANSCRIPT:\n${transcript}`
      }], 2400);
      setReport(parseJSON(text));
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };

  return (
    <div className="split">
      <div className="stack">
        <div className="panel navy">
          <div className="row" style={{ marginBottom: '1rem' }}>
            {[1, 2, 3].map((p) => (
              <button key={p} className={`opt ${part === p ? 'picked' : ''}`} onClick={() => choose(p)}>
                Part {p}
              </button>
            ))}
          </div>

          <h3 style={{ marginBottom: '0.6rem' }}>
            {part === 2 ? cue.topic : question}
          </h3>

          {part === 2 && (
            <ul className="plain" style={{ marginBottom: '1rem' }}>
              {cue.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          )}

          <div className="row">
            <button className="btn" onClick={() => say(question)}>Hear the question</button>
            <button className="btn" onClick={next}>Different question</button>
            {part === 2 && (
              <>
                <button className="btn" onClick={() => setPrep(!prep)}>
                  {prep ? 'Stop preparation' : 'One minute to prepare'}
                </button>
                <Timer minutes={1} running={prep} onDone={() => setPrep(false)} />
              </>
            )}
          </div>

          {part === 2 && (
            <p className="note" style={{ marginTop: '1rem', marginBottom: 0 }}>
              Speak for one to two minutes without stopping. Running out of things to say at ninety seconds
              is the most common reason Part 2 loses marks.
            </p>
          )}
        </div>

        <div className="panel">
          <Recorder transcript={transcript} setTranscript={setTranscript} onError={setErr} />
          <div className="row" style={{ marginTop: '1rem' }}>
            <button className="btn primary" onClick={mark} disabled={busy || transcript.trim().length < 25}>
              Mark my answer
            </button>
            <button className="btn ghost" onClick={() => setTranscript('')}>Clear</button>
          </div>
          {busy && <div style={{ marginTop: '1rem' }}><Thinking label="Listening back to your answer" /></div>}
          {err && <p className="alert" style={{ marginTop: '1rem' }}>{err}</p>}
        </div>
      </div>

      <div className="stack">
        {report ? <BandReport report={report} /> : (
          <>
            <div className="panel">
              <h3 className="panel-title">What the examiner is listening for</h3>
              <ul className="plain">
                <li><strong>Fluency and Coherence.</strong> Can you keep going and stay on the point? Repeating yourself to fill time is penalised.</li>
                <li><strong>Lexical Resource.</strong> Topic-specific words and natural phrases, not memorised idioms dropped in.</li>
                <li><strong>Grammatical Range and Accuracy.</strong> Do conditionals and past forms appear naturally, and survive?</li>
                <li><strong>Pronunciation.</strong> Stress, rhythm and word endings. Accent is not penalised. Being unclear is.</li>
              </ul>
            </div>
            <div className="panel">
              <h3 className="panel-title">Three habits worth half a band each</h3>
              <ul className="plain">
                <li>Answer, then extend without being asked. Reason, example, small contrast.</li>
                <li>When stuck, narrate: "I have never thought about that, but I suppose..." That is fluency, not filler.</li>
                <li>Correct yourself once and move on. Repairing the same sentence three times reads as poor control.</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Mock() {
  const [turns, setTurns] = useState([]);
  const [part, setPart] = useState(1);
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);
  const [report, setReport] = useState(null);
  const [err, setErr] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => () => stopSpeaking(), []);

  const ask = async (history) => {
    setBusy(true); setErr('');
    try {
      // Keep strict user/assistant alternation: fold the instruction into the first turn.
      const msgs = history.map((m, i) => (
        i === 0
          ? { role: 'user', content: `Run Part ${part} of the IELTS Speaking test with me. Ask one question only. ${m.content}` }
          : m
      ));
      const { text } = await coach('interview', msgs, 400);
      setTurns([...history, { role: 'assistant', content: text }]);
      say(text, { rate: 0.98 });
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };

  const begin = () => { setStarted(true); setReport(null); ask([{ role: 'user', content: 'I am ready to begin.' }]); };

  const send = () => {
    if (!reply.trim()) return;
    const history = [...turns, { role: 'user', content: reply }];
    setReply('');
    ask(history);
  };

  const finish = async () => {
    setBusy(true); setErr('');
    stopSpeaking();
    const script = turns.map((t) => `${t.role === 'assistant' ? 'EXAMINER' : 'CANDIDATE'}: ${t.content}`).join('\n');
    try {
      const { text } = await coach('speaking', [{
        role: 'user',
        content: `Full Speaking Part ${part} transcript. Mark the candidate only.\n\n---\n${script}`
      }], 2400);
      setReport(parseJSON(text));
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };

  return (
    <div className="split">
      <div className="panel">
        <div className="spread" style={{ marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>Mock test</h3>
          <div className="row">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`opt ${part === p ? 'picked' : ''}`}
                onClick={() => { setPart(p); setTurns([]); setStarted(false); setReport(null); }}
              >
                Part {p}
              </button>
            ))}
          </div>
        </div>

        {!started ? (
          <>
            <p>
              The examiner asks one question at a time and speaks it aloud. Answer out loud using the
              recorder, or type. No corrections come during the test, exactly as on the day.
            </p>
            <button className="btn primary" onClick={begin} disabled={busy}>Begin Part {part}</button>
          </>
        ) : (
          <>
            <div className="chat">
              {turns.filter((t) => t.content !== 'I am ready to begin.').map((t, i) => (
                <div key={i} className={`bubble ${t.role === 'assistant' ? 'them' : 'me'}`}>
                  <span className="bubble-who">{t.role === 'assistant' ? 'Examiner' : 'You'}</span>
                  {t.content}
                </div>
              ))}
              {busy && <Thinking label="Examiner is speaking" />}
            </div>

            <div style={{ marginTop: '1.2rem' }}>
              <Recorder transcript={reply} setTranscript={setReply} onError={setErr} />
            </div>

            <div className="row" style={{ marginTop: '1rem' }}>
              <button className="btn primary" onClick={send} disabled={busy || !reply.trim()}>
                Send my answer
              </button>
              <button className="btn" onClick={finish} disabled={busy || turns.length < 3}>
                End test and mark me
              </button>
              <button className="btn ghost" onClick={() => { setStarted(false); setTurns([]); stopSpeaking(); }}>
                Restart
              </button>
            </div>
          </>
        )}

        {err && <p className="alert" style={{ marginTop: '1rem' }}>{err}</p>}
      </div>

      <div className="stack">
        {report ? <BandReport report={report} /> : (
          <div className="panel">
            <h3 className="panel-title">Before you start</h3>
            <ul className="plain">
              <li>Sit somewhere quiet. The transcriber drops words when there is background noise, and so does an examiner.</li>
              <li>Answer in full sentences from the first question. Part 1 sets the tone for the whole mark.</li>
              <li>Do not stop to think about grammar. Speak, then read the marking afterwards.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
