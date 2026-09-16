import React, { useState } from 'react';
import Thinking from '../components/Thinking.jsx';
import { coach } from '../lib/api.js';

const STARTERS = [
  'How is the overall band calculated if I get 6, 7, 6.5 and 5.5?',
  'Academic or General Training: which one do I need?',
  'How long are my results valid, and can I ask for a remark?',
  'I keep scoring 6.5 in Writing. What usually blocks people at that level?'
];

export default function Ask() {
  const [turns, setTurns] = useState([]);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const send = async (text) => {
    const question = (text ?? q).trim();
    if (!question) return;
    const history = [...turns, { role: 'user', content: question }];
    setTurns(history); setQ(''); setBusy(true); setErr('');
    try {
      const { text: answer } = await coach('tutor', history, 900);
      setTurns([...history, { role: 'assistant', content: answer }]);
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };

  return (
    <div className="page">
      <div className="page-head">
        <div className="page-kicker"><i />Ask the coach</div>
        <h1>Anything about the test, answered for the test.</h1>
        <p className="lede">
          Rules, timing, scoring, strategy, what to do the week before. Ask in whatever English you have:
          you are not being marked here.
        </p>
      </div>

      <div className="panel">
        {turns.length === 0 ? (
          <>
            <p>Start with one of these, or type your own.</p>
            <div className="opts">
              {STARTERS.map((s) => (
                <button key={s} className="opt" onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          </>
        ) : (
          <div className="chat">
            {turns.map((t, i) => (
              <div key={i} className={`bubble ${t.role === 'assistant' ? 'them' : 'me'}`}>
                <span className="bubble-who">{t.role === 'assistant' ? 'Coach' : 'You'}</span>
                {t.content}
              </div>
            ))}
            {busy && <Thinking label="Thinking" />}
          </div>
        )}

        <div className="composer">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask about the exam"
          />
          <button className="btn primary" onClick={() => send()} disabled={busy || !q.trim()}>Ask</button>
        </div>

        {err && <p className="alert" style={{ marginTop: '1rem' }}>{err}</p>}
      </div>
    </div>
  );
}
