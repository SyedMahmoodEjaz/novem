import React, { useEffect, useRef, useState } from 'react';

// A panel that opens and closes with a measured height animation, so a page can start
// as a short list of headings and expand only where the reader asks.
export default function Disclose({ title, note, children, open: openProp, onToggle, tone = '' }) {
  const [openState, setOpenState] = useState(false);
  const controlled = typeof openProp === 'boolean';
  const open = controlled ? openProp : openState;

  const inner = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!inner.current) return undefined;
    const measure = () => setHeight(inner.current ? inner.current.scrollHeight : 0);
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(inner.current);
    return () => ro.disconnect();
  }, [children, open]);

  const toggle = () => {
    if (onToggle) onToggle(!open);
    if (!controlled) setOpenState(!open);
  };

  return (
    <div className={`disc ${open ? 'open' : ''} ${tone}`}>
      <button className="disc-head" onClick={toggle} aria-expanded={open}>
        <span className="disc-title">{title}</span>
        {note && <span className="disc-note">{note}</span>}
        <span className="disc-mark" aria-hidden="true"><i /><i /></span>
      </button>

      <div className="disc-body" style={{ height: open ? height : 0 }}>
        <div ref={inner} className="disc-inner">{children}</div>
      </div>
    </div>
  );
}
