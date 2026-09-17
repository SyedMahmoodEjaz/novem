import React, { useEffect, useState } from 'react';
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

const fromHash = () => {
  const id = window.location.hash.replace('#', '');
  return PAGES[id] ? id : 'overview';
};

export default function App() {
  const [page, setPage] = useState(fromHash);
  const [open, setOpen] = useState(false);

  useEffect(() => {
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

  const Current = PAGES[page];

  return (
    <div className="shell">
      <div className="ambient" aria-hidden="true" />
      <Rail page={page} go={go} open={open} setOpen={setOpen} />
      <main className="stage">
        <Current key={page} go={go} />
      </main>
    </div>
  );
}
