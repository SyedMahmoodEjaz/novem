import React, { useEffect, useRef, useState } from 'react';

// Reveals its children one after another instead of dropping the whole page at once.
// `step` is the gap between children in milliseconds; `delay` holds the whole group back.
export default function Reveal({ children, step = 90, delay = 0, as: Tag = 'div', className = '', style }) {
  const items = React.Children.toArray(children);
  return (
    <Tag className={className} style={style}>
      {items.map((child, i) => (
        <div key={i} className="reveal-item" style={{ animationDelay: `${delay + i * step}ms` }}>
          {child}
        </div>
      ))}
    </Tag>
  );
}

// Reveals once the element scrolls into view, so long pages unfold as you read them.
export function RevealOnView({ children, className = '', style }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return undefined; }

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSeen(true); io.disconnect(); } },
      { rootMargin: '0px 0px -60px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`on-view ${seen ? 'seen' : ''} ${className}`} style={style}>
      {children}
    </div>
  );
}
