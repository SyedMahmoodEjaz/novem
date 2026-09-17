import React, { useEffect, useRef, useState } from 'react';
import Rail from './components/Rail.jsx';
import Overview from './pages/Overview.jsx';
import Listening from './pages/Listening.jsx';
import Reading from './pages/Reading.jsx';
import Writing from './pages/Writing.jsx';
import Speaking from './pages/Speaking.jsx';
import Library from './pages/Library.jsx';
import Ask from './pages/Ask.jsx';
import { stopSpeaking } from './lib/speech.js';

const PAGES = {
  overview: Overview,
  listening: Listening,
  reading: Reading,
  writing: Writing,
  speaking: Speaking,
  library: Library,
  ask: Ask
};

// An empty hash, or #start, shows the opening screen. Any known page id skips it,
// so a shared deep link lands straight on that page.
const fromHash = () => {
  const id = window.location.hash.replace('#', '');
  return PAGES[id] ? id : null;
};

/* ------------------------------------------------------------------ *
 *  Opening screen
 * ------------------------------------------------------------------ */

// NOVEM drawn as five monoline paths. pathLength="100" normalises every path to the
// same dash length, so one shared animation draws them all at the same visual speed
// regardless of how long each letter actually is.
const LETTERS = [
  { d: 'M6,106 L6,14 L62,106 L62,14', red: false },
  { d: 'M84,60 C84,32 96,14 112,14 C128,14 140,32 140,60 C140,88 128,106 112,106 C96,106 84,88 84,60 Z', red: false },
  { d: 'M162,14 L190,106 L218,14', red: false },
  { d: 'M296,14 L240,14 L240,106 L296,106 M240,60 L282,60', red: false },
  { d: 'M320,106 L320,14 L348,64 L376,14 L376,106', red: true }
];

const DOORS = [
  { id: 'overview', n: '00', name: 'How the exam works', line: 'Bands, timing, scoring' },
  { id: 'listening', n: '01', name: 'Listening', line: 'You hear it once' },
  { id: 'reading', n: '02', name: 'Reading', line: 'Forty answers in an hour' },
  { id: 'writing', n: '03', name: 'Writing', line: 'Two tasks, marked' },
  { id: 'speaking', n: '04', name: 'Speaking', line: 'Talk, get a band' },
  { id: 'ask', n: '·', name: 'Ask the coach', line: 'Any question about the test' }
];

function Welcome({ go }) {
  // 0 draws the wordmark, 1 holds it with one line of text, 2 dims it and opens the doors.
  const [phase, setPhase] = useState(0);
  const timers = useRef([]);

  useEffect(() => {
    const quiet = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (quiet) { setPhase(2); return undefined; }

    timers.current = [
      setTimeout(() => setPhase(1), 2700),
      setTimeout(() => setPhase(2), 4600)
    ];
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const skip = () => {
    timers.current.forEach(clearTimeout);
    setPhase(2);
  };

  return (
    <div className={`welcome p${phase}`}>
      <style>{WELCOME_CSS}</style>
      <div className="w-bg" aria-hidden="true">
        <span className="w-glow a" />
        <span className="w-glow b" />
        <span className="w-grain" />
      </div>

      <div className="w-inner">
        <div className="w-mark" onClick={phase < 2 ? skip : undefined}>
          <svg viewBox="0 0 382 120" role="img" aria-label="NOVEM">
            {LETTERS.map((l, i) => (
              <path
                key={i}
                d={l.d}
                pathLength="100"
                className={`w-letter ${l.red ? 'red' : ''}`}
                style={{ animationDelay: `${180 + i * 300}ms` }}
              />
            ))}
          </svg>
          <span className="w-underline" />
        </div>

        <p className="w-tag">Your IELTS band, one step at a time.</p>

        <div className="w-doors">
          <p className="w-ask">What do you want to work on?</p>

          <div className="w-grid">
            {DOORS.map((d, i) => (
              <button
                key={d.id}
                className="w-door"
                style={{ transitionDelay: `${120 + i * 70}ms` }}
                onClick={() => go(d.id)}
              >
                <span className="w-n">{d.n}</span>
                <span className="w-name">{d.name}</span>
                <span className="w-line">{d.line}</span>
              </button>
            ))}
          </div>

          <button className="w-quiet" onClick={() => go('library')}>
            Or browse the study library
          </button>
        </div>

        {phase < 2 && (
          <button className="w-skip" onClick={skip}>Skip</button>
        )}
      </div>
    </div>
  );
}

const WELCOME_CSS = `
.welcome {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  padding: 2rem 1.25rem;
  overflow-y: auto;
  background: var(--black);
}

/* ---- gradient ground ---- */
.w-bg { position: absolute; inset: 0; overflow: hidden; pointer-events: none;
  background:
    radial-gradient(120% 90% at 50% 120%, #142149 0%, transparent 58%),
    radial-gradient(90% 70% at 50% -10%, #2a0710 0%, transparent 60%),
    linear-gradient(180deg, #000 0%, #07070c 45%, #000 100%);
}
.w-glow { position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0; }
.w-glow.a {
  width: 58vw; height: 58vw; left: 14%; top: 8%;
  background: radial-gradient(circle, rgba(224,30,55,.55), transparent 65%);
  animation: w-fade 2.4s var(--ease) .3s forwards, w-drift 19s var(--ease) 2.4s infinite;
}
.w-glow.b {
  width: 50vw; height: 50vw; right: 8%; bottom: 2%;
  background: radial-gradient(circle, rgba(20,33,73,.95), transparent 66%);
  animation: w-fade 2.4s var(--ease) .6s forwards, w-drift 25s var(--ease) 3s infinite reverse;
}
@keyframes w-fade { to { opacity: 1; } }
@keyframes w-drift {
  0%,100% { transform: translate3d(0,0,0) scale(1); }
  50% { transform: translate3d(4%, -5%, 0) scale(1.14); }
}
.w-grain {
  position: absolute; inset: -50%;
  background-image: radial-gradient(rgba(255,255,255,.055) 1px, transparent 1px);
  background-size: 3px 3px;
  opacity: .5;
}

.w-inner { position: relative; width: 100%; max-width: 760px; text-align: center; }

/* ---- the wordmark writing itself ---- */
.w-mark { position: relative; display: inline-block; width: min(430px, 82vw); cursor: pointer; }
.welcome.p2 .w-mark { cursor: default; }
.w-mark svg { width: 100%; height: auto; display: block; overflow: visible; }

.w-letter {
  fill: none;
  stroke: var(--white);
  stroke-width: 8;
  stroke-linecap: square;
  stroke-linejoin: miter;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: w-write 1.5s cubic-bezier(.62,.03,.29,1) both;
}
.w-letter.red { stroke: var(--red); }
@keyframes w-write {
  0%   { stroke-dashoffset: 100; filter: drop-shadow(0 0 10px var(--red-glow)); }
  85%  { filter: drop-shadow(0 0 14px var(--red-glow)); }
  100% { stroke-dashoffset: 0; filter: drop-shadow(0 0 0 transparent); }
}

.w-underline {
  position: absolute; left: 3px; right: 3px; bottom: -14px; height: 2px;
  background: var(--red);
  transform: scaleX(0); transform-origin: left;
  animation: w-rule .8s var(--ease) 2.05s both;
}
@keyframes w-rule { to { transform: scaleX(1); } }

/* ---- the one line ---- */
.w-tag {
  margin: 2.5rem auto 0;
  max-width: 34ch;
  font-size: clamp(1.05rem, 2.5vw, 1.36rem);
  color: var(--chalk);
  opacity: 0;
  transform: translateY(12px);
  transition: opacity .8s var(--ease), transform .8s var(--ease);
}
.welcome.p1 .w-tag, .welcome.p2 .w-tag { opacity: 1; transform: none; }

/* ---- phase 2: the mark recedes, the doors arrive ---- */
.welcome.p2 .w-mark {
  width: min(210px, 46vw);
  transition: width .9s var(--ease);
}
.welcome.p2 .w-letter {
  stroke: var(--chalk-dim);
  stroke-width: 9;
  transition: stroke .9s var(--ease), stroke-width .9s var(--ease);
}
.welcome.p2 .w-letter.red { stroke: var(--red); }
.welcome.p2 .w-tag {
  margin-top: 1.1rem;
  font-size: var(--t-sm);
  color: var(--chalk-dim);
  transition: all .7s var(--ease);
}

.w-doors {
  margin-top: 0;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transform: translateY(24px);
  transition: max-height .85s var(--ease), margin-top .85s var(--ease),
              opacity .7s var(--ease) .12s, transform .7s var(--ease) .12s;
}
.welcome.p2 .w-doors {
  margin-top: 2.6rem;
  max-height: 900px;
  opacity: 1;
  pointer-events: auto;
  transform: none;
}

.w-ask {
  font-family: var(--display);
  font-size: clamp(1.4rem, 3.4vw, 2rem);
  font-weight: 600;
  letter-spacing: -.02em;
  color: var(--white);
  margin: 0 0 1.5rem;
  max-width: none;
}

.w-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: .7rem; text-align: left; }

.w-door {
  position: relative;
  display: block;
  padding: 1rem 1.05rem 1.15rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: rgba(255,255,255,.028);
  backdrop-filter: blur(3px);
  color: var(--white);
  overflow: hidden;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity .55s var(--ease), transform .55s var(--ease),
              border-color .25s var(--ease), background .25s var(--ease);
}
.welcome.p2 .w-door { opacity: 1; transform: none; }
.w-door::before {
  content: ''; position: absolute; inset: auto 0 0 0; height: 2px;
  background: var(--red); transform: scaleX(0); transform-origin: left;
  transition: transform .38s var(--ease);
}
.w-door:hover { border-color: var(--line-strong); background: rgba(255,255,255,.06); }
.w-door:hover::before { transform: scaleX(1); }

.w-n {
  display: block; font-family: var(--display); font-size: var(--t-xs);
  color: var(--chalk-dim); font-variant-numeric: tabular-nums; margin-bottom: .3rem;
}
.w-door:hover .w-n { color: var(--red); }
.w-name { display: block; font-family: var(--display); font-size: 1.04rem; font-weight: 600; }
.w-line { display: block; font-size: var(--t-xs); color: var(--chalk-dim); margin-top: .12rem; }

.w-quiet {
  margin-top: 1.4rem; background: none; border: 0;
  color: var(--chalk-dim); font-size: var(--t-sm);
  text-decoration: underline; text-underline-offset: 4px; text-decoration-color: var(--line-strong);
}
.w-quiet:hover { color: var(--red); text-decoration-color: var(--red); }

.w-skip {
  position: fixed; right: 1.4rem; bottom: 1.4rem;
  background: none; border: 0; color: var(--chalk-dim); font-size: var(--t-sm);
  letter-spacing: .02em;
}
.w-skip:hover { color: var(--white); }

/* ---- the home chip inside the app ---- */
.home-chip {
  position: fixed; top: 1rem; right: 1.15rem; z-index: 40;
  width: 34px; height: 34px; border-radius: 50%;
  display: grid; place-items: center;
  border: 1px solid var(--line); background: rgba(10,10,14,.75);
  backdrop-filter: blur(6px);
  font-family: var(--display); font-weight: 800; font-size: .95rem;
  color: var(--chalk);
  transition: border-color .22s var(--ease), color .22s var(--ease), transform .22s var(--ease);
}
.home-chip:hover { border-color: var(--red); color: var(--red); transform: scale(1.08); }

@media (max-width: 820px) {
  .w-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .w-grid { grid-template-columns: 1fr; gap: .55rem; }
  .w-door { padding: .8rem .95rem .9rem; }
  .w-tag { margin-top: 1.9rem; }
  .w-doors { margin-top: 2rem; }
}

@media (prefers-reduced-motion: reduce) {
  .w-letter { stroke-dashoffset: 0; animation: none; }
  .w-underline { transform: scaleX(1); animation: none; }
  .w-glow { opacity: 1; animation: none; }
}
`;

/* ------------------------------------------------------------------ */
export default function App() {
  // Every fresh load opens with the intro, whatever page the hash points at, so a
  // refresh always replays the animation. Navigation within the session is unaffected.
  const [page, setPage] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Drop a leftover hash on load so refreshing from inside the app starts clean.
    // replaceState is used rather than assigning the hash, which would add a history entry.
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    const onHash = () => setPage(fromHash());

    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = (id) => {
    stopSpeaking();
    window.location.hash = id;
    setPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const home = () => {
    stopSpeaking();
    window.location.hash = '';
    setPage(null);
    window.scrollTo({ top: 0 });
  };

  if (!page) return <Welcome go={go} />;

  const Current = PAGES[page];

  return (
    <div className="shell">
      <style>{WELCOME_CSS}</style>
      <div className="ambient" aria-hidden="true" />
      <Rail page={page} go={go} open={open} setOpen={setOpen} />
      <button className="home-chip" onClick={home} title="Back to the start" aria-label="Back to the start">
        N
      </button>
      <main className="stage">
        <Current key={page} go={go} />
      </main>
    </div>
  );
}