import { programmeArtwork } from '@/lib/programme-artwork';
import { getContent, publicProgrammes } from '@/lib/managed-content';
import { db } from '@/lib/db';
import { AudienceBenefits } from '@/components/audience-benefits';
import { Countdown, AnimatedCount } from '@/components/event-interactions';
import { pageMetadata, eventStructuredData } from '@/lib/seo';
const baseMetadata = pageMetadata('Bihar Healthcare Conclave 2026 | Registration', 'Join Bihar Healthcare Conclave 2026 on 11 December at Urja Auditorium, Patna. Registration for healthcare professionals, students and innovators.', '/');
export const metadata = { ...baseMetadata, title: { absolute: 'Bihar Healthcare Conclave 2026 | Registration' } };
import Link from 'next/link';
import Image from 'next/image';
import { Partners } from '@/components/partners';
import { ThemeIcon } from '@/components/theme-icon';
import { competitionRegistrationUrl } from '@/lib/event-links';
import { ProgrammeCarousel } from '@/components/programme-carousel';
import { MENTORS_DATA } from '@/lib/mentors';
import { officialContact, unifiedWorkshopOptions } from '@/lib/enhancement-data';
import { PartnerMarquee } from '@/components/home/partner-marquee';
import { HeroDecor } from '@/components/home/hero-decor';
import { HomeStats, type HomeStat } from '@/components/home/home-stats';
import './home-redesign.css';

const pillars = [
  ['quality', 'Quality', 'Patient safety & quality in healthcare'],
  ['innovation', 'Innovation', 'Research, ideas & startups'],
  ['skills', 'Skills', 'Education & professional development'],
  ['technology', 'Technology', 'AI, digital health & medical devices'],
  ['excellence', 'Excellence', 'Recognition & celebration'],
] as const;

// Headline words, staggered in the hero. Line 2 is the italic accent.
const headlineLines: { text: string; em?: boolean }[][] = [
  [{ text: 'Where' }, { text: 'care' }, { text: 'meets' }],
  [{ text: 'what’s', em: true }, { text: 'next.', em: true }],
];

// Six programme highlights, one per theme — real data from the poster
// programme list (see lib/poster-programmes.ts), in the order shown.
const highlightIds = [
  'healthcare-awards',
  'clinical-procedures',
  'ai-enabled-demonstrations',
  'innovation-hackathon',
  'cultural-programme',
  'group-lunch-networking',
];

// Venue photographs and facts, as used on the /contact page.
const venuePhotos = [
  { src: '/logos/urja/aud.jpg', alt: 'Main Auditorium Stage — acoustic timber-panelled main hall looking toward the plenary stage', caption: 'Main Auditorium Stage — acoustic timber-panelled main hall, looking toward the plenary stage.', width: 1280, height: 721 },
  { src: '/logos/urja/img7.jpg', alt: 'Main Glass & Steel Facade — glazed entrance pavilion at Urja Auditorium, New Punaichak', caption: 'Main Glass & Steel Facade — glazed entrance pavilion framing the approach steps.', width: 1280, height: 720 },
  { src: '/logos/urja/img8.jpg', alt: 'Two-Tier Acoustic Seating — cushioned seating across the main floor and upper balcony gallery', caption: 'Two-Tier Acoustic Seating — sightline-engineered seating across the main floor and balcony.', width: 1280, height: 721 },
];
const venueAddress = 'Urja Auditorium, BSPHCL Colony, New Punaichak, Patna, Bihar 800023';
const venueDirectionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Urja+Auditorium,+BSPHCL+Colony,+New+Punaichak,+Patna,+Bihar+800023';
const venueMapSearchUrl = 'https://www.google.com/maps/search/?api=1&query=Urja+Auditorium,+BSPHCL+Colony,+New+Punaichak,+Patna,+Bihar+800023';
const venueMapEmbedUrl = 'https://maps.google.com/maps?q=Urja+Auditorium,+BSPHCL+Colony,+New+Punaichak,+Patna,+Bihar+800023&t=m&z=16&ie=UTF8&iwloc=&output=embed';

// Real mentor photo dimensions (public/mentors/*).
const mentorPhotoSize: Record<string, { width: number; height: number }> = {
  'dr-cp-thakur': { width: 554, height: 554 },
  'dr-sahajanand-singh': { width: 360, height: 360 },
  'sister-usha-saldanha': { width: 476, height: 555 },
};

export default async function Home() {
  const allProgrammesRaw = await publicProgrammes();
  const programmes = allProgrammesRaw.map((p, i) => {
    const kind = p.category === 'Technology' ? 'technology' : ['Education & Skills', 'Clinical Skills', 'Quality', 'Learning'].includes(p.category) ? 'skills' : ['Excellence', 'Culture', 'Networking'].includes(p.category) ? 'excellence' : 'innovation';
    return { id: p.id, number: String(i + 1).padStart(2, '0'), title: p.title, summary: p.summary, category: p.category, kind, artwork: programmeArtwork[p.id] || null };
  });
  const { data: settings } = await getContent('settings');
  const { data: speakers } = await getContent('speakers');
  const { data: partnersData } = await getContent('partners');
  const verifiedSpeakers = speakers.filter((s) => s.verified && s.published);
  const publishedPartners = partnersData
    .filter((p) => p.published)
    .map((p) => ({ id: p.id, name: p.name, role: p.role, logo: p.logo, url: p.url }));
  let total: number | null = null;
  if (settings.showRegistrationCount) {
    try { total = await db.registration.count({ where: { registrationStatus: 'confirmed' } }); } catch {}
  }

  const highlights = highlightIds
    .map((id) => programmes.find((p) => p.id === id))
    .filter((p): p is (typeof programmes)[number] => !!p);

  // Workshop tracks with fee ranges computed from the real fee table
  // (lib/enhancement-data.ts — unifiedWorkshopOptions). Five tracks:
  // CME, CNE, Paramedical, Pharmacy, Hospital Management.
  const trackOrder = ['CME', 'CNE', 'Paramedical', 'Pharmacy', 'Hospital Management'] as const;
  const workshopTracks = trackOrder.map((track) => {
    const trackOptions = unifiedWorkshopOptions.filter((w) => w.track === track);
    const fees = trackOptions.map((w) => w.fee);
    return {
      id: track.toLowerCase().replace(/ /g, '-'),
      track,
      name: trackOptions[0]?.workshop ?? track,
      // Category list is taken verbatim from the fee table.
      desc: trackOptions.map((w) => w.category).join(' · '),
      count: trackOptions.length,
      minFee: fees.length ? Math.min(...fees) : 0,
      maxFee: fees.length ? Math.max(...fees) : 0,
    };
  });

  // Statistics use only numbers derived from real project data — no
  // attendance or speaker figures are invented.
  const stats: HomeStat[] = [
    { value: programmes.length, label: 'Programme highlights', note: 'Across awards, workshops, live demos & exhibitions' },
    { value: publishedPartners.length, label: 'Official partners', note: 'Organiser, organising & strategic partners' },
    { value: pillars.length, label: 'Conclave pillars', note: 'Quality · Innovation · Skills · Technology · Excellence' },
    { value: workshopTracks.length, label: 'Workshop tracks', note: 'CME · CNE · Paramedical · Pharmacy · Hospital Management' },
  ];
  if (total !== null) stats.push({ value: total, label: 'Confirmed registrations', note: 'Live count from registrations' });

  const featuredMentor = MENTORS_DATA[0];
  const otherMentors = MENTORS_DATA.slice(1);

  let wordIndex = 0;

  return (
    <div className="home-redesign">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData()).replace(/</g, '\\u003c') }} />
      <div className="announcement"><span>INNOVATION · QUALITY · SKILLS · TECHNOLOGY · EXCELLENCE</span><Link href="/register">Registration Open ↗</Link></div>

      {/* 1 — Integrated navbar + hero (the header turns navy via
          html:has(.home-redesign) in home-redesign.css, so header and
          hero read as one continuous dark block). */}
      <section className="bhc25-hero" aria-label="Bihar Healthcare Conclave 2026">
        <div className="bhc25-hero-media" aria-hidden="true">
          <Image src="/images/healthcare-team-hero.png" alt="" fill priority sizes="100vw" quality={90} />
        </div>
        <HeroDecor />
        <div className="bhc25-hero-inner">
          <p className="bhc25-index">BHC / 2026 <span>—</span> PATNA, BIHAR</p>
          <p className="bhc25-kicker">{settings.heroKicker && (settings.heroKicker.includes('HEALTHIER PEOPLE') || settings.heroKicker.includes('Healthier People')) ? settings.heroKicker : 'HEALTHY BIHAR | HEALTHIER PEOPLE | A STRONGER INDIA.'}</p>
          <h1>
            {headlineLines.map((line, li) => (
              <span className="bhc25-line" key={li}>
                {line.map((word) => {
                  const i = wordIndex++;
                  const inner = <span className="bhc25-word" style={{ '--i': i } as React.CSSProperties}>{word.text}</span>;
                  return <span key={word.text}>{word.em ? <em>{inner}</em> : inner}{' '}</span>;
                })}
              </span>
            ))}
          </h1>
          <p className="bhc25-lede">{settings.heroTagline}</p>
          <p className="bhc25-audience">{settings.heroAudience}</p>
          <div className="bhc25-chips" aria-label="Event date and venue">
            <span className="bhc25-chip"><ThemeIcon kind="calendar" /><span><small>DATE</small>Friday, 11 December 2026</span></span>
            <span className="bhc25-chip"><ThemeIcon kind="pin" /><span><small>VENUE</small>Urja Auditorium, Patna</span></span>
          </div>
          <div className="bhc25-actions">
            <Link href="/register" className="button">Register Here <span>↗</span></Link>
            <Link href="/programme" className="bhc25-ghost">Explore Programme <span>↗</span></Link>
            <a href="#programme-highlights" className="bhc25-hero-anchor">Programme highlights ↓</a>
          </div>
        </div>
        <PartnerMarquee partners={publishedPartners} />
      </section>

      <section className="event-strip-shell" aria-label="Conclave information">
        <div className="event-strip">
          <div><span className="strip-icon"><ThemeIcon kind="calendar" /></span><div><span>WHEN</span><strong>11 December 2026</strong><p>Friday</p></div></div>
          <div><span className="strip-icon"><ThemeIcon kind="pin" /></span><div><span>WHERE</span><strong>Urja Auditorium</strong><p>Patna, Bihar</p></div></div>
          <div><span className="strip-icon"><ThemeIcon kind="people" /></span><div><span>BE PART OF IT</span><strong>Registration Open</strong><p>One shared future. Every perspective.</p></div></div>
        </div>
      </section>

      <section className="competition-band"><div className="competition-home-link"><div className="competition-copy"><p className="eyebrow">STUDENT COMPETITIONS</p><h2>Quiz knowledge. Build Healthcare solutions.</h2><p>Nursing Knowledge Quest & Healthcare Innovation Hackathon 2026</p></div><div className="competition-side"><a className="button" href={competitionRegistrationUrl} target="_blank" rel="noopener noreferrer">Quiz & Hackathon Registration ↗</a></div></div></section>
      <Countdown />
      {total !== null && <p className="countdown registration-count"><AnimatedCount value={total} /> confirmed registrations</p>}

      {/* 2 — Event overview */}
      <section className="section bhc25-section bhc25-overview" aria-label="About the Conclave">
        <figure className="bhc25-overview-figure">
          <img src="/images/about/healthcare-collaboration.png" alt="Healthcare professionals collaborating — doctors, nurses and innovators working together" width={1672} height={941} loading="lazy" decoding="async" />
          <figcaption>Doctors, nurses, educators &amp; innovators — one shared conversation.</figcaption>
        </figure>
        <div className="bhc25-overview-copy">
          <p className="bhc25-eyebrow">THE BIHAR HEALTHCARE CONCLAVE</p>
          <h2>Better care.<br />Bolder ideas.<br /><em>Stronger connections.</em></h2>
          <p className="large">{settings.headline}</p>
          <p>{settings.introduction}</p>
          <p>From clinical quality to AI, from nursing knowledge to engineering innovation — discover the connections that can move healthcare forward.</p>
          <div className="bhc25-tricolour" aria-hidden="true"><i /><i /><i /></div>
          <Link href="/about" className="text-link">Discover the Conclave →</Link>
        </div>
      </section>

      {/* 3 — Event highlights (one real programme per theme) */}
      <section className="section bhc25-section bhc25-highlights" aria-label="Event highlights">
        <div className="bhc25-section-head">
          <div>
            <p className="bhc25-eyebrow">EVENT HIGHLIGHTS · ONE DAY, MANY STAGES</p>
            <h2>What happens on the day.</h2>
          </div>
          <Link href="/programme" className="text-link">Explore All Programmes →</Link>
        </div>
        <div className="bhc25-highlight-list">
          {highlights.map((p, i) => (
            <Link href="/programme" className="bhc25-highlight-row" key={p.id}>
              <span className="bhc25-highlight-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}<span className="bhc25-highlight-cat">{p.category}</span></h3>
              <p>{p.summary}</p>
              <span className="bhc25-highlight-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4 — Statistics (only real, derived numbers) */}
      <section className="bhc25-stats-band" aria-label="Conclave in numbers">
        <div className="bhc25-band-inner">
          <p className="bhc25-eyebrow">THE CONCLAVE IN NUMBERS</p>
          <h2>One day. <em>Counted honestly.</em></h2>
          <HomeStats items={stats} />
        </div>
      </section>

      {/* 5 — Five pillars */}
      <section className="section pillars bhc25-section">
        <div className="bhc25-section-head">
          <div>
            <p className="bhc25-eyebrow">FIVE PILLARS · ONE SHARED PURPOSE</p>
            <h2>A foundation for a healthier future.</h2>
          </div>
          <Link href="/vision" className="text-link">Our vision →</Link>
        </div>
        <div className="pillar-grid">{pillars.map(([kind, name, description], i) => <Link href="/vision" className={'pillar-card pillar-' + kind} key={kind}><span className="pillar-number">0{i + 1}</span><div className="pillar-icon"><ThemeIcon kind={kind} /></div><h3>{name}</h3><p>{description}</p><span className="arrow">↗</span></Link>)}</div>
      </section>

      {/* 6 — Programme highlights carousel */}
      <section className="section programmes home-programme-highlights bhc25-section" id="programme-highlights">
        <div className="bhc25-section-head">
          <div>
            <p className="bhc25-eyebrow">PROGRAMME HIGHLIGHTS</p>
            <h2>Learn. Build. Discover.<br /><em>Make your mark.</em></h2>
          </div>
          <Link href="/programme" className="text-link">Explore All Programmes →</Link>
        </div>
        <ProgrammeCarousel programmes={programmes} />
        <p className="bhc25-programme-note">Programme areas are open for exploration. Final session formats, speakers, schedules and eligibility will be announced after organiser approval.</p>
      </section>

      {/* 7 — Who can participate */}
      <section className="section audience bhc25-section">
        <div className="audience-copy">
          <p className="eyebrow">WHO CAN PARTICIPATE</p>
          <h2>Healthcare’s next chapter<br />needs <em>your perspective.</em></h2>
          <p>From the clinic to the classroom. From engineering to entrepreneurship. Find your place in the conversation.</p>
          <Link href="/participate" className="button">Explore participation categories ↗</Link>
        </div>
        <div className="audience-grid">{[['quality', 'Doctors & Healthcare Professionals'], ['skills', 'Medical & Nursing Students'], ['technology', 'Engineering & HealthTech'], ['innovation', 'Researchers & Startups'], ['people', 'Educators & Institutions'], ['excellence', 'NGOs, Industry & CSR']].map(([kind, name]) => <Link href="/participate" key={name}><ThemeIcon kind={kind} /><span>{name}</span><span>↗</span></Link>)}</div>
      </section>
      <AudienceBenefits />

      {/* 8 — Confirmed speakers, only if the organisers have published any */}
      {verifiedSpeakers.length > 0 && (
        <section className="section bhc25-section">
          <p className="bhc25-eyebrow">CONFIRMED SPEAKERS</p>
          <h2>Meet the voices shaping the conversation.</h2>
          <div className="speaker-grid">{verifiedSpeakers.map((s) => <article className="benefit-card" key={s.name}><h3>{s.name}</h3><p>{s.designation}</p><p>{s.bio}</p></article>)}</div>
        </section>
      )}

      {/* 9 — Chief Mentors & Patrons (real profiles from /chief-mentors) */}
      <section className="bhc25-mentors" aria-label="Chief Mentors and Patrons">
        <div className="bhc25-mentors-inner">
          <div>
            <p className="bhc25-eyebrow">CHIEF MENTORS &amp; PATRONS</p>
            <h2>Guided by the people who built Bihar’s healthcare.</h2>
            <p className="bhc25-lead">Revered medical pioneers, public health architects and quality leaders provide overarching mentorship and guidance to the Conclave.</p>
            <blockquote className="bhc25-mentors-quote">
              “The future of Bihar’s healthcare won’t be defined by infrastructure alone. It will be remembered for the pioneers who led, healed, and transformed lives across generations.”
              <span>BIHAR HEALTHCARE CONCLAVE 2026</span>
            </blockquote>
            <p className="bhc25-mentors-more"><Link href="/chief-mentors" className="text-link">Meet all Chief Mentors &amp; Patrons →</Link></p>
          </div>
          <div>
            {featuredMentor && (
              <article className="bhc25-mentor-featured">
                <img src={featuredMentor.photoUrl} alt={`${featuredMentor.name} — ${featuredMentor.role}`} width={mentorPhotoSize[featuredMentor.id]?.width || 554} height={mentorPhotoSize[featuredMentor.id]?.height || 554} loading="lazy" decoding="async" />
                <div className="bhc25-mentor-featured-body">
                  <span className="bhc25-mentor-role">{featuredMentor.role}</span>
                  <h3>{featuredMentor.name}</h3>
                  <p className="bhc25-mentor-headline">{featuredMentor.headline}</p>
                  <p className="bhc25-mentor-note">“{featuredMentor.briefNote}”</p>
                </div>
              </article>
            )}
            {otherMentors.map((mentor) => (
              <article className="bhc25-mentor-row" key={mentor.id}>
                <img src={mentor.photoUrl} alt={`${mentor.name} — ${mentor.role}`} width={mentorPhotoSize[mentor.id]?.width || 360} height={mentorPhotoSize[mentor.id]?.height || 360} loading="lazy" decoding="async" />
                <div>
                  <span className="bhc25-mentor-role">{mentor.role}</span>
                  <h3>{mentor.name}</h3>
                  <p>{mentor.headline}</p>
                </div>
                <Link href="/chief-mentors" className="text-link" aria-label={`View full profile of ${mentor.name}`}>Profile ↗</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Workshops & areas of interest (real tracks & fees) */}
      <section className="section bhc25-section" aria-label="Workshops and areas of interest">
        <div className="bhc25-section-head">
          <div>
            <p className="bhc25-eyebrow">WORKSHOPS &amp; AREAS OF INTEREST</p>
            <h2>Learn hands-on, <em>from the people who do it.</em></h2>
          </div>
          <Link href="/register" className="text-link">Register for a workshop →</Link>
        </div>
        <div className="bhc25-workshops-grid">
          {workshopTracks.map((track) => (
            <Link href="/register" className="bhc25-workshop-card" key={track.id}>
              <span className="bhc25-workshop-track">{track.track}</span>
              <h3>{track.name}</h3>
              <p>{track.desc}</p>
              <span className="bhc25-workshop-fee">
                <strong>₹{track.minFee}{track.maxFee !== track.minFee ? ` – ₹${track.maxFee}` : ''}</strong>
                <span>{track.count} categories · per participant</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="bhc25-workshops-foot">
          <p>General Conference &amp; Exhibition attendance is complimentary. Competitions — the Nursing Knowledge Quest and Healthcare AI Hackathon — are free to enter via the dedicated competition registration.</p>
          <Link href="/register" className="button">Register Here ↗</Link>
        </div>
      </section>

      {/* 11 — Partners & collaborators (full detailed showcase) */}
      <Partners />

      {/* 12 — Venue */}
      <section className="section bhc25-section" aria-label="Venue — Urja Auditorium, Patna">
        <div className="bhc25-venue">
          <div className="bhc25-venue-photos">
            {venuePhotos.map((photo, i) => (
              <figure key={photo.src}>
                <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
                {i === 0 && <figcaption>{photo.caption}</figcaption>}
              </figure>
            ))}
          </div>
          <div>
            <p className="bhc25-eyebrow">VENUE · PATNA, BIHAR</p>
            <h2>Urja Auditorium, <em>New Punaichak.</em></h2>
            <p className="bhc25-lead">An architectural landmark in BSPHCL Colony — an 850-seat two-tier acoustic hall with a grand granite atrium and dedicated campus plaza.</p>
            <ul className="bhc25-venue-facts">
              <li><span>Address</span>{venueAddress}</li>
              <li><span>Date</span>Friday, 11 December 2026</li>
              <li><span>Hall</span>850-seat two-tier acoustic auditorium</li>
              <li><span>Getting there</span>Off Jawahar Lal Nehru Marg (Bailey Road), Patna</li>
              <li><span>Contact</span><span><a href={`mailto:${officialContact.email}`}>{officialContact.email}</a><br /><a href={`tel:${officialContact.phone}`}>{officialContact.phone}</a></span></li>
            </ul>
            <div className="bhc25-venue-actions">
              <a className="button" href={venueDirectionsUrl} target="_blank" rel="noopener noreferrer">Get Directions ↗</a>
              <a className="bhc25-outline-btn" href={venueMapSearchUrl} target="_blank" rel="noopener noreferrer">View on Google Maps ↗</a>
              <Link href="/contact" className="bhc25-outline-btn">Venue details &amp; photos →</Link>
            </div>
          </div>
        </div>
        <div className="bhc25-venue-map">
          <iframe title="Map — Urja Auditorium, BSPHCL Colony, New Punaichak, Patna" src={venueMapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>
      </section>

      {/* 13 — Final registration CTA */}
      <section className="bhc25-register-cta" aria-label="Register for the Conclave">
        <p className="bhc25-eyebrow">REGISTRATION OPEN</p>
        <h2>Be there when Bihar’s healthcare <em>turns the page.</em></h2>
        <p>Friday, 11 December 2026 · Urja Auditorium, Patna. For healthcare professionals, medical &amp; engineering students, educators, institutions and innovators.</p>
        <p className="bhc25-fee-note">General Conference &amp; Exhibition attendance is complimentary · Workshops ₹100 – ₹1,000</p>
        <div className="bhc25-actions">
          <Link href="/register" className="button">Register Here ↗</Link>
          <a href={`mailto:${officialContact.email}?subject=Enquiry%20-%20Bihar%20Healthcare%20Conclave`} className="bhc25-ghost">Enquire by email ↗</a>
        </div>
      </section>

      {/* 14 — Partnerships (existing functionality preserved) */}
      <section className="section collaboration">
        <div>
          <p className="eyebrow">PARTNERSHIP OPPORTUNITIES</p>
          <h2>Together, we can<br />create lasting impact.</h2>
          <p>Explore collaborations in healthcare, technology, education and community impact.</p>
        </div>
        <a className="button" href="mailto:info@biharhealthcareconclave.com?subject=Partnership%20Enquiry%20-%20Bihar%20Healthcare%20Conclave">Enquire About Partnerships ↗</a>
      </section>
    </div>
  );
}
