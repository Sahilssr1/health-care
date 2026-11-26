// Homepage-only scrolling outline-text band — a CSS port of Somya
// Translators' language strip / Services marquee (42s linear infinite,
// -webkit-text-stroke outline, transparent fill). The words are the
// five real conclave pillars, nothing invented. The track holds two
// identical sets so translateX(0 -> -50%) loops seamlessly; the
// duplicate is aria-hidden. Pauses on hover; static under
// prefers-reduced-motion (see home-redesign.css).

const PILLARS = ['HEALTHCARE', 'QUALITY', 'INNOVATION', 'TECHNOLOGY', 'EXCELLENCE'];

function OutlineSet({ hidden }: { hidden?: boolean }) {
  return (
    <span className="bhc25-outline-set" aria-hidden={hidden || undefined}>
      {PILLARS.map((word) => (
        <span key={word}>
          {word}
          <span className="bhc25-outline-dot" aria-hidden="true">
            {' · '}
          </span>
        </span>
      ))}
    </span>
  );
}

export function OutlineMarquee() {
  return (
    <section className="bhc25-outline-marquee" aria-label="Conclave pillars">
      <div className="bhc25-outline-viewport">
        <div className="bhc25-outline-track">
          <OutlineSet />
          <OutlineSet hidden />
        </div>
      </div>
    </section>
  );
}
