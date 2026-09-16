// Speech is handled entirely by the browser: no audio files, no transcription service.
// Chrome and Edge support both directions. Safari speaks but does not listen.

export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

const SR = typeof window !== 'undefined'
  ? window.SpeechRecognition || window.webkitSpeechRecognition
  : null;

export const canListen = Boolean(SR);

function pickVoices() {
  const all = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'));
  const gb = all.filter((v) => v.lang === 'en-GB');
  const pool = gb.length >= 2 ? gb : all;
  return pool.length ? pool : [null];
}

// Speaks an array of { s, t } turns, alternating voices so speakers are distinguishable.
export function speakScript(lines, { rate = 0.95, onLine, onEnd } = {}) {
  if (!canSpeak) return () => {};
  window.speechSynthesis.cancel();
  const voices = pickVoices();
  const speakers = [...new Set(lines.map((l) => l.s))];

  lines.forEach((line, i) => {
    const u = new SpeechSynthesisUtterance(line.t);
    const v = voices[speakers.indexOf(line.s) % voices.length];
    if (v) u.voice = v;
    u.rate = rate;
    u.pitch = speakers.indexOf(line.s) === 0 ? 1 : 0.88;
    u.onstart = () => onLine && onLine(i);
    if (i === lines.length - 1) u.onend = () => onEnd && onEnd();
    window.speechSynthesis.speak(u);
  });

  return () => window.speechSynthesis.cancel();
}

export function say(text, { rate = 1 } = {}) {
  if (!canSpeak) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const v = pickVoices()[0];
  if (v) u.voice = v;
  u.rate = rate;
  window.speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if (canSpeak) window.speechSynthesis.cancel();
}

// Returns a controller: { stop() }. onText receives the running transcript.
export function listen({ onText, onEnd, onError } = {}) {
  if (!SR) {
    onError && onError('This browser cannot transcribe speech. Use Chrome or Edge, or type your answer.');
    return { stop() {} };
  }
  const rec = new SR();
  rec.lang = 'en-GB';
  rec.continuous = true;
  rec.interimResults = true;

  let settled = '';
  rec.onresult = (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const chunk = e.results[i][0].transcript;
      if (e.results[i].isFinal) settled += chunk + ' ';
      else interim += chunk;
    }
    onText && onText((settled + interim).trim());
  };
  rec.onerror = (e) => onError && onError(
    e.error === 'not-allowed'
      ? 'Microphone access was blocked. Allow it in your browser settings and try again.'
      : 'Speech recognition stopped: ' + e.error + '.'
  );
  rec.onend = () => onEnd && onEnd(settled.trim());

  rec.start();
  return { stop: () => rec.stop() };
}
