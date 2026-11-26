// Homepage-only hero decoration: ECG trace + gold particles.
// Pure CSS/SVG animation (no video, no JavaScript), adapted from the
// already-built "Heartbeat of Bihar" hero (Hero.tsx / hero-animation.css).
// Particle positions are fixed constants so server and client render
// identically — never Math.random() here.

const ECG_PATH =
  'M0 60 H150 L175 60 L190 30 L205 92 L218 48 L230 60 H420 ' +
  'L445 60 L460 30 L475 92 L488 48 L500 60 H700 ' +
  'L725 60 L740 30 L755 92 L768 48 L780 60 H960 ' +
  'L985 60 L1000 30 L1015 92 L1028 48 L1040 60 H1200';

const PARTICLES = [
  { left: 4, size: 4, delay: 0.0, duration: 12, drift: -24, peak: 0.9 },
  { left: 12, size: 3, delay: 2.4, duration: 14, drift: 18, peak: 0.7 },
  { left: 22, size: 5, delay: 5.1, duration: 11, drift: -14, peak: 0.8 },
  { left: 33, size: 3, delay: 1.2, duration: 15, drift: 26, peak: 0.6 },
  { left: 45, size: 4, delay: 7.8, duration: 12, drift: -30, peak: 0.9 },
  { left: 56, size: 3, delay: 3.6, duration: 13, drift: 12, peak: 0.7 },
  { left: 67, size: 5, delay: 0.8, duration: 11, drift: -18, peak: 0.8 },
  { left: 78, size: 3, delay: 6.3, duration: 14, drift: 22, peak: 0.6 },
  { left: 88, size: 4, delay: 2.0, duration: 12, drift: -26, peak: 0.9 },
  { left: 95, size: 3, delay: 4.5, duration: 13, drift: 16, peak: 0.7 },
];

export function HeroDecor() {
  return (
    <div className="bhc25-decor" aria-hidden="true">
      <svg className="bhc25-ecg" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none">
        <path className="bhc25-ecg-base" pathLength={1000} d={ECG_PATH} />
        <path className="bhc25-ecg-glow" pathLength={1000} d={ECG_PATH} />
      </svg>
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="bhc25-particle"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--drift': `${p.drift}px`,
              '--peak': p.peak,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
