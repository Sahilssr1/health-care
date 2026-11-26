// Homepage-only partner marquee for the hero's lower portion.
// Shows EVERY published partner from the managed content (falling back
// to initialPartners in lib/enhancement-data.ts). Logos sit on white
// chips so they stay fully legible on the dark hero — no heavy
// grayscale or opacity. The track is duplicated once for a seamless
// infinite loop; the duplicate is aria-hidden and lazy-loaded.

export type MarqueePartner = {
  id: string;
  name: string;
  role: string;
  logo: string;
  url: string;
};

function LogoSet({ partners, hidden }: { partners: MarqueePartner[]; hidden?: boolean }) {
  return (
    <div className="bhc25-track-set" aria-hidden={hidden || undefined}>
      {partners.map((partner) => (
        <span className="bhc25-logo-chip" key={partner.id} title={`${partner.name} — ${partner.role}`}>
          <img
            src={partner.logo}
            alt={partner.name}
            height={40}
            loading={hidden ? 'lazy' : 'eager'}
            decoding="async"
          />
        </span>
      ))}
    </div>
  );
}

export function PartnerMarquee({ partners }: { partners: MarqueePartner[] }) {
  if (!partners.length) return null;
  return (
    <div className="bhc25-marquee" role="region" aria-label="Official partners of Bihar Healthcare Conclave 2026">
      <div className="bhc25-marquee-inner">
        <p className="bhc25-marquee-label">
          In partnership with <strong>Organiser · Official &amp; Strategic Partners</strong>
        </p>
        <div className="bhc25-marquee-viewport">
          <div className="bhc25-track">
            <LogoSet partners={partners} />
            <LogoSet partners={partners} hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
