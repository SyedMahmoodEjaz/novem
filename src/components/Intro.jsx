import { useEffect, useRef, useState } from 'react';

/* Bridgeword opening sequence: a descent through cloud, like an aircraft landing.

   Beat 1 (0.0-2.0s)  inside the cloud. A white veil thins out while four cloud
                      decks swell and drift up past the camera.
   Beat 2 (1.5-3.7s)  the name prints itself onto a music staff, over a spinning
                      record, with floating notes and a pulsing equaliser.
   Beat 3 (3.7-5.2s)  the decks slide apart, left and right, under their own
                      weight. The horizon warms, land appears, and the app is below.

   It runs on one fixed CSS timeline, so nothing is computed per frame in
   JavaScript. A single timer removes the overlay at the end. */

const TOTAL = 5700; // ms, matches the CSS timeline at the bottom of this file
const NAME = 'Bridgeword';

/* Each deck: its noise shape, how much it swells, its drift, and which way it parts. */
const DECKS = [
  { freq: '0.0042 0.011', seed: 7, octaves: 6, curve: '0 0 0 .18 .62 .95 1', s0: 1.5, s1: 2.9, y0: '10%', y1: '-20%', dx: '-135%', tint: '#fdfbff', op: 1 },
  { freq: '0.0075 0.017', seed: 21, octaves: 6, curve: '0 0 0 0 .3 .85 1', s0: 1.15, s1: 2.2, y0: '4%', y1: '-13%', dx: '140%', tint: '#f6effd', op: 0.95 },
  { freq: '0.013 0.026', seed: 44, octaves: 5, curve: '0 0 0 0 0 .5 1', s0: 1, s1: 1.55, y0: '0%', y1: '-7%', dx: '-155%', tint: '#ecdff9', op: 0.82 },
  { freq: '0.02 0.038', seed: 63, octaves: 4, curve: '0 0 0 0 0 0 .7 1', s0: 1, s1: 1.25, y0: '2%', y1: '-2%', dx: '165%', tint: '#dbcdf2', op: 0.6 },
];

const NOTES = ['♪', '♫', '♩', '♬', '♪', '♩'];

function Deck({ index, deck }) {
  const id = `bw-cloud-${index}`;
  return (
    <div
      className="bw-deck"
      style={{
        '--s0': deck.s0,
        '--s1': deck.s1,
        '--y0': deck.y0,
        '--y1': deck.y1,
        '--dx': deck.dx,
        '--op': deck.op,
        '--part-delay': `${3.65 + index * 0.11}s`,
      }}
    >
      <svg className="bw-cloud" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <filter id={id} x="-12%" y="-12%" width="124%" height="124%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency={deck.freq} numOctaves={deck.octaves} seed={deck.seed} stitchTiles="stitch" result="noise" />
            {/* flatten the noise to white, then shape its alpha channel into cloud density */}
            <feComponentTransfer in="noise">
              <feFuncR type="linear" slope="0" intercept="1" />
              <feFuncG type="linear" slope="0" intercept="1" />
              <feFuncB type="linear" slope="0" intercept="1" />
              <feFuncA type="table" tableValues={deck.curve} />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="1200" height="800" fill={deck.tint} filter={`url(#${id})`} />
      </svg>
    </div>
  );
}

export default function Intro({ onDone }) {
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  const finish = useRef(() => {});
  finish.current = () => {
    if (done.current) return;
    done.current = true;
    onDone();
  };

  const skip = () => {
    setLeaving(true);
    setTimeout(() => finish.current(), 420);
  };

  useEffect(() => {
    const timer = setTimeout(() => finish.current(), TOTAL);
    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        setLeaving(true);
        setTimeout(() => finish.current(), 420);
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={`bw-intro${leaving ? ' is-skipping' : ''}`} role="presentation">
      <style>{CSS}</style>

      <div className="bw-sky" />
      <div className="bw-horizon" />
      <div className="bw-ground" />

      <div className="bw-decks">
        {DECKS.map((deck, i) => <Deck key={i} index={i} deck={deck} />)}
      </div>

      <div className="bw-veil" />
      <div className="bw-rays" />

      <div className="bw-title-wrap">
        {/* the record and staff are anchored to the name, so they stay centred on it */}
        <div className="bw-mark">
          <div className="bw-vinyl" aria-hidden="true"><span /></div>

          <div className="bw-staff" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((n) => <i key={n} style={{ '--n': n }} />)}
          </div>

          <h1 className="bw-name" aria-label={NAME}>
            {NAME.split('').map((letter, i) => (
              <span className="bw-letter" key={i} data-l={letter} style={{ '--i': i }}>{letter}</span>
            ))}
          </h1>
        </div>

        <div className="bw-eq" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => <i key={n} style={{ '--n': n }} />)}
        </div>

        <p className="bw-tagline">Every song is a word list in disguise.</p>

        <div className="bw-notes" aria-hidden="true">
          {NOTES.map((note, i) => <span key={i} style={{ '--i': i }}>{note}</span>)}
        </div>
      </div>

      <button type="button" className="bw-skip" onClick={skip}>Skip</button>
    </div>
  );
}

const CSS = `
.bw-intro {
  position: fixed;
  inset: 0;
  z-index: 200;
  overflow: hidden;
  animation: bw-clear .3s linear 5.35s both;
}
.bw-intro.is-skipping { animation: bw-clear .4s ease both; }

@keyframes bw-clear {
  from { opacity: 1; }
  to { opacity: 0; visibility: hidden; }
}

/* ---- sky, horizon, land ---- */
.bw-sky {
  position: absolute;
  inset: -10%;
  background: linear-gradient(180deg, #2a1f52 0%, #33276b 16%, #4b3fae 38%, #7d6fd8 58%, #b3a4e8 78%, #efeaf9 100%);
  animation: bw-sky 4.2s cubic-bezier(.3,0,.3,1) both, bw-bg-out 1.1s ease 3.8s both;
}
@keyframes bw-sky {
  from { transform: scale(1.18) translateY(-6%); filter: brightness(1.45) saturate(.5); }
  to { transform: none; filter: none; }
}
.bw-horizon {
  position: absolute;
  left: -10%;
  right: -10%;
  bottom: 0;
  height: 42%;
  background: radial-gradient(120% 100% at 50% 100%, rgba(255,194,26,.78) 0%, rgba(255,79,163,.55) 34%, rgba(255,79,163,.16) 58%, transparent 76%);
  opacity: 0;
  animation: bw-horizon 2.6s ease-out 2.5s both, bw-bg-out 1.1s ease 3.8s both;
}
@keyframes bw-horizon {
  from { opacity: 0; transform: translateY(26%); }
  to { opacity: .9; transform: none; }
}
.bw-ground {
  position: absolute;
  left: -20%;
  right: -20%;
  bottom: -14%;
  height: 26%;
  border-radius: 50% 50% 0 0;
  background: linear-gradient(180deg, #00a38c 0%, #0b8478 58%, #1c5f7a 100%);
  box-shadow: 0 -18px 60px rgba(255,194,26,.45);
  transform: translateY(100%);
  animation: bw-ground 2.4s cubic-bezier(.2,.7,.2,1) 2.9s both, bw-bg-out 1.1s ease 3.8s both;
}
@keyframes bw-ground { to { transform: translateY(42%); } }
@keyframes bw-bg-out { to { opacity: 0; } }

/* ---- cloud decks ---- */
.bw-decks { position: absolute; inset: 0; }
.bw-deck {
  position: absolute;
  inset: -25%;
  opacity: var(--op);
  will-change: transform, opacity;
  animation:
    bw-swell 2.1s cubic-bezier(.24,.62,.2,1) both,
    bw-part 1.85s cubic-bezier(.52,.03,.36,1) var(--part-delay) both;
}
.bw-cloud { width: 100%; height: 100%; display: block; }

@keyframes bw-swell {
  from { transform: translate(0, var(--y0)) scale(var(--s0)); }
  to { transform: translate(0, var(--y1)) scale(var(--s1)); }
}
@keyframes bw-part {
  from { transform: translate(0, var(--y1)) scale(var(--s1)); opacity: var(--op); }
  82% { opacity: var(--op); }
  to {
    transform: translate(var(--dx), calc(var(--y1) - 7%)) scale(calc(var(--s1) * 1.14));
    opacity: 0;
  }
}

/* the inside-the-cloud whiteout, then shafts of light once we are through */
.bw-veil {
  position: absolute;
  inset: -20%;
  background: radial-gradient(60% 55% at 50% 42%, #fdfbff 0%, #f1ebfa 55%, #d5c9ef 100%);
  animation: bw-veil 1.9s cubic-bezier(.3,0,.4,1) both;
}
@keyframes bw-veil {
  0% { opacity: 1; transform: scale(1.35); }
  55% { opacity: .5; }
  100% { opacity: 0; transform: scale(1.9); }
}
.bw-rays {
  position: absolute;
  left: 50%;
  top: -30%;
  width: 150vmax;
  height: 150vmax;
  margin-left: -75vmax;
  background: conic-gradient(from 195deg at 50% 0,
    transparent 0 6deg, rgba(255,240,250,.32) 8deg 10deg, transparent 12deg 20deg,
    rgba(255,226,243,.26) 22deg 25deg, transparent 27deg 38deg,
    rgba(255,247,252,.3) 40deg 43deg, transparent 45deg 56deg,
    rgba(255,232,246,.22) 58deg 61deg, transparent 63deg 360deg);
  opacity: 0;
  animation: bw-rays 3.4s ease-out 1.35s both;
}
@keyframes bw-rays {
  0% { opacity: 0; transform: rotate(-7deg); }
  35% { opacity: .85; }
  100% { opacity: 0; transform: rotate(6deg); }
}

/* ---- title block ---- */
.bw-title-wrap {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  justify-items: center;
  padding: 24px;
  text-align: center;
  animation: bw-lift 1.05s cubic-bezier(.4,0,.2,1) 3.55s both;
}
@keyframes bw-lift {
  from { transform: none; opacity: 1; }
  to { transform: scale(1.14) translateY(-3%); opacity: 0; }
}

.bw-mark {
  position: relative;
  display: grid;
  place-items: center;
}

.bw-vinyl {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: calc(min(74vmin, 460px) / -2);
  width: min(74vmin, 460px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 36% 30%, rgba(255,255,255,.22), transparent 40%),
    repeating-radial-gradient(circle, rgba(42,31,82,.94) 0 2px, rgba(58,44,110,.94) 2px 5px);
  box-shadow: 0 30px 80px rgba(20,16,52,.45);
  opacity: 0;
  animation: bw-vinyl-in 1.3s cubic-bezier(.2,.9,.3,1) 1.45s both, bw-spin 5.5s linear 1.45s infinite;
}
.bw-vinyl span {
  position: absolute;
  inset: 34%;
  border-radius: 50%;
  background: #ffc21a;
  border: 3px dashed #2a1f52;
  box-shadow: inset 0 0 0 6px rgba(42,31,82,.12);
}
.bw-vinyl span::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 14px;
  height: 14px;
  margin: -7px;
  border-radius: 50%;
  background: #efeaf9;
  border: 2px solid #2a1f52;
}
@keyframes bw-vinyl-in {
  from { opacity: 0; transform: scale(.55) rotate(-40deg); }
  to { opacity: .55; transform: scale(1) rotate(0); }
}
@keyframes bw-spin { to { transform: rotate(360deg); } }

.bw-staff {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(86vw, 900px);
  height: 132px;
  margin: -66px 0 0 calc(min(86vw, 900px) / -2);
  display: grid;
  align-content: space-between;
}
.bw-staff i {
  display: block;
  height: 2px;
  background: rgba(42,31,82,.5);
  transform: scaleX(0);
  transform-origin: left center;
  animation: bw-rule .8s cubic-bezier(.2,.8,.2,1) calc(1.3s + var(--n) * .07s) both;
}
@keyframes bw-rule { to { transform: scaleX(1); } }

.bw-name {
  position: relative;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-family: 'Bricolage Grotesque', 'Segoe UI', system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(2.7rem, 11.5vw, 7.5rem);
  letter-spacing: -0.045em;
  line-height: 1;
  color: #2a1f52;
}
.bw-letter {
  position: relative;
  display: inline-block;
  isolation: isolate;
  animation: bw-drop .95s cubic-bezier(.16,1.3,.3,1) calc(1.55s + var(--i) * .075s) both;
}
/* the two off-register ink layers slide into place, like a riso print */
.bw-letter::before,
.bw-letter::after {
  content: attr(data-l);
  position: absolute;
  inset: 0;
  z-index: -1;
  mix-blend-mode: multiply;
}
.bw-letter::before {
  color: #ff4fa3;
  animation: bw-ink-a 1.1s cubic-bezier(.2,.9,.25,1) calc(1.75s + var(--i) * .075s) both;
}
.bw-letter::after {
  color: #ffc21a;
  animation: bw-ink-b 1.1s cubic-bezier(.2,.9,.25,1) calc(1.82s + var(--i) * .075s) both;
}
@keyframes bw-drop {
  0% { transform: translateY(-140%) rotate(-14deg); opacity: 0; }
  55% { opacity: 1; }
  70% { transform: translateY(6%) rotate(2deg); }
  100% { transform: none; opacity: 1; }
}
@keyframes bw-ink-a {
  from { transform: translate(-26px, 16px); opacity: 0; }
  to { transform: translate(5px, 3px); opacity: 1; }
}
@keyframes bw-ink-b {
  from { transform: translate(24px, -18px); opacity: 0; }
  to { transform: translate(-4px, 5px); opacity: 1; }
}

.bw-eq {
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 34px;
  margin-top: 18px;
}
.bw-eq i {
  display: block;
  width: 7px;
  height: 100%;
  border-radius: 3px;
  background: #2a1f52;
  transform-origin: bottom center;
  transform: scaleY(.12);
  opacity: 0;
  animation:
    bw-eq-in .3s ease calc(2.45s + var(--n) * .04s) both,
    bw-eq-beat .62s ease-in-out calc(2.5s + var(--n) * .11s) infinite alternate;
}
.bw-eq i:nth-child(3n) { background: #ff4fa3; }
.bw-eq i:nth-child(3n + 1) { background: #00a38c; }
@keyframes bw-eq-in { to { opacity: 1; } }
@keyframes bw-eq-beat {
  from { transform: scaleY(.16); }
  to { transform: scaleY(1); }
}

.bw-tagline {
  margin: 16px 0 0;
  font-family: 'Young Serif', Georgia, serif;
  font-size: clamp(.95rem, 2.4vw, 1.3rem);
  color: #2a1f52;
  opacity: 0;
  animation: bw-fade-up 1s ease 2.65s both;
}
@keyframes bw-fade-up {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: .85; transform: none; }
}

.bw-notes { position: absolute; inset: 0; pointer-events: none; }
.bw-notes span {
  position: absolute;
  bottom: 22%;
  font-size: clamp(1.4rem, 3.4vw, 2.3rem);
  color: #2a1f52;
  opacity: 0;
  animation: bw-float 2.9s ease-out calc(2.1s + var(--i) * .26s) both;
}
.bw-notes span:nth-child(1) { left: 12%; }
.bw-notes span:nth-child(2) { left: 26%; color: #ff4fa3; }
.bw-notes span:nth-child(3) { left: 43%; }
.bw-notes span:nth-child(4) { left: 61%; color: #00a38c; }
.bw-notes span:nth-child(5) { left: 76%; }
.bw-notes span:nth-child(6) { left: 89%; color: #ff4fa3; }
@keyframes bw-float {
  0% { opacity: 0; transform: translateY(40px) rotate(-8deg) scale(.7); }
  25% { opacity: .75; }
  70% { opacity: .5; }
  100% { opacity: 0; transform: translateY(-170px) rotate(12deg) scale(1.1); }
}

.bw-skip {
  position: absolute;
  right: 18px;
  bottom: 18px;
  z-index: 3;
  min-height: 38px;
  padding: 7px 18px;
  border: 2px solid #2a1f52;
  border-radius: 999px;
  background: rgba(251,249,255,.82);
  color: #2a1f52;
  font-family: 'Bricolage Grotesque', 'Segoe UI', system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  opacity: 0;
  animation: bw-fade-up .5s ease .9s both;
}
.bw-skip:hover { background: #ffc21a; }
.bw-skip:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }

@media (max-width: 600px) {
  .bw-staff { height: 96px; margin-top: -48px; }
  .bw-vinyl { width: 78vmin; margin: calc(78vmin / -2); }
}

@media (prefers-reduced-motion: reduce) {
  .bw-intro,
  .bw-intro * {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
  }
}
`;