import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import Intro from './components/Intro.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Studio from './components/Studio.jsx';
import Library from './components/Library.jsx';
import Dictionary from './components/Dictionary.jsx';
import Review from './components/Review.jsx';
import Quiz from './components/Quiz.jsx';
import Progress from './components/Progress.jsx';
import ExtensionGuide from './components/ExtensionGuide.jsx';

const PAGES = {
  home: Hero,
  studio: Studio,
  library: Library,
  dictionary: Dictionary,
  review: Review,
  quiz: Quiz,
  progress: Progress,
  extension: ExtensionGuide,
};

function currentPage() {
  const name = window.location.hash.replace(/^#\/?/, '');
  return PAGES[name] ? name : 'home';
}

/* The opening plays every time the home page is loaded or refreshed. Moving
   between pages inside the app does not reload, so it does not replay there, and
   a direct link to another page (#/studio, #/dictionary) goes straight in. */
function shouldPlayIntro() {
  return currentPage() === 'home';
}

export default function App() {
  const [page, setPage] = useState(currentPage);
  const [intro, setIntro] = useState(shouldPlayIntro);

  useEffect(() => {
    const onChange = () => {
      setPage(currentPage());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  function endIntro() {
    setIntro(false);
  }

  const Page = PAGES[page];

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain" aria-hidden="true" />
      <a className="skip" href="#main">Skip to content</a>

      {intro && <Intro onDone={endIntro} />}

      {/* the app itself rises into place as the clouds part */}
      <motion.div
        initial={intro ? { opacity: 0, scale: 1.05 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: intro ? 3.75 : 0, ease: [0.4, 0, 0.2, 1] }}
      >
        <Nav page={page} />
        <main id="main" className={`page page-${page}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            >
              <Page />
            </motion.div>
          </AnimatePresence>
        </main>
        <footer className="footer">
          <p>
            Bridgeword never hosts song lyrics. Paste the words you want to study, or use the
            browser extension on lyrics sites you already read. Your words stay in this browser.
          </p>
        </footer>
      </motion.div>
    </MotionConfig>
  );
}