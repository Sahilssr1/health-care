// Homepage-only word-by-word heading reveal — a pure-CSS port of
// Somya Translators' WordReveal (framer-motion whileInView).
// Each word sits in its own overflow-hidden wrapper; the inner span
// starts at translateY(110%) and rises to 0 with the Somya ease
// cubic-bezier(0.22, 1, 0.36, 1), duration 0.9s, 0.08s stagger.
// The rise is triggered by the existing ScrollReveal mechanism:
// .is-revealed is added to the section when it scrolls into view
// (see components/scroll-reveal.tsx). No JavaScript animation here.
// Accent words render italic + emerald, like Somya's accent words.

import type { CSSProperties } from 'react';

export function WordReveal({
  text,
  accentWords = [],
  className,
}: {
  text: string;
  accentWords?: string[];
  className?: string;
}) {
  const words = text.split(' ');
  return (
    <span className={className ? `bhc25-wr ${className}` : 'bhc25-wr'} aria-label={text}>
      {words.map((word, i) => {
        const accent = accentWords.includes(word.replace(/[.,]/g, ''));
        return (
          <span key={`${word}-${i}`} className="bhc25-wr-wrap" aria-hidden="true">
            <span
              className={`bhc25-wr-word${accent ? ' bhc25-wr-accent' : ''}`}
              style={{ '--i': i } as CSSProperties}
            >
              {word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </span>
          </span>
        );
      })}
    </span>
  );
}
