// Homepage-only stats band. Numbers count up only once the band
// scrolls into view (IntersectionObserver), and only via the existing
// AnimatedCount component. With prefers-reduced-motion, AnimatedCount
// renders the final value immediately with no animation.

'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatedCount } from '@/components/event-interactions';

export type HomeStat = {
  value: number;
  label: string;
  note?: string;
};

export function HomeStats({ items }: { items: HomeStat[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bhc25-stats-grid" ref={ref}>
      {items.map((item) => (
        <div className="bhc25-stat" key={item.label}>
          <span className="bhc25-stat-num">{inView ? <AnimatedCount value={item.value} /> : '0'}</span>
          <span className="bhc25-stat-label">{item.label}</span>
          {item.note && <span className="bhc25-stat-note">{item.note}</span>}
        </div>
      ))}
    </div>
  );
}
