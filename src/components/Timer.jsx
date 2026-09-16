import React, { useEffect, useRef, useState } from 'react';

export default function Timer({ minutes, running, onDone }) {
  const [left, setLeft] = useState(minutes * 60);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => { setLeft(minutes * 60); }, [minutes]);

  useEffect(() => {
    if (!running) return undefined;
    const id = setInterval(() => {
      setLeft((v) => {
        if (v <= 1) { clearInterval(id); done.current && done.current(); return 0; }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');

  return (
    <span className="timer">
      <span className={`ring ${running ? 'spin' : ''}`} aria-hidden="true" />
      <span className={`timer-face ${left < 120 ? 'low' : ''}`}>{mm}:{ss}</span>
    </span>
  );
}
