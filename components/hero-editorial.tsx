import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroEditorialProps {
  heroKicker?: string;
  heroTagline?: string;
  heroAudience?: string;
}

interface PartnerItem {
  id: string;
  category: string;
  name: string;
  logo: string;
  url: string;
}

const FIVE_HERO_PARTNERS: PartnerItem[] = [
  {
    id: 'qualinova',
    category: 'Organised by',
    name: 'QualiNova Solutions Pvt. Ltd.',
    logo: '/logos/qualinova.jpg',
    url: 'https://qualinovahub.com',
  },
  {
    id: 'ima-bihar',
    category: 'Organising Partner',
    name: 'Indian Medical Association — Bihar State Branch',
    logo: '/logos/ima-bihar.jpg',
    url: 'https://imabihar.org',
  },
  {
    id: 'tnai',
    category: 'Organising Partner',
    name: 'TNAI — Trained Nurses Association of India, Bihar',
    logo: '/logos/tnai-bihar-state-branch.jpg',
    url: 'https://www.tnaionline.org/',
  },
  {
    id: 'aicbv',
    category: 'Innovation Partner',
    name: 'AIC Bihar Vidyapith',
    logo: '/logos/AICBV.png',
    url: 'https://www.aicbvf.edu.in/',
  },
  {
    id: 'dr-cp-thakur',
    category: 'Social Responsibility Partner',
    name: 'Dr. C.P. Thakur Foundation',
    logo: '/logos/dr-cp-thakur.png',
    url: 'https://biharhealthcareconclave.com/about',
  },
];

export function HeroEditorial({
  heroKicker = 'HEALTHY BIHAR | HEALTHIER PEOPLE | A STRONGER INDIA.',
  heroTagline = 'Building a quality-driven, technology-enabled and future-ready healthcare ecosystem.',
  heroAudience = 'For healthcare professionals, medical & engineering students, educators, institutions and innovators.',
}: HeroEditorialProps) {
  return (
    <section className="merged-hero-section" aria-label="Bihar Healthcare Conclave 2026 Hero">
      {/* Ambient Mesh Glows (Tuned exactly to Logo Colors: Royal Blue, Emerald Green & Saffron Amber) */}
      <div className="hero-logo-glow-blue" aria-hidden="true" />
      <div className="hero-logo-glow-green" aria-hidden="true" />
      <div className="hero-logo-glow-saffron" aria-hidden="true" />
      <div className="hero-mesh-grid-pattern" aria-hidden="true" />

      <div className="merged-hero-container">
        {/* 1. Top Script Eyebrow inspired by Reference 1 ("Graphic |") using Logo Medical Green */}
        <div className="merged-hero-script-wrap">
          <span className="merged-hero-script-tag">
            Healthcare <span className="script-pipe" aria-hidden="true">|</span>
          </span>
        </div>

        {/* 2. Oversized Headline with Embedded Inline Pill (Inspired by Reference 1) */}
        <h1 className="merged-hero-headline">
          <span className="headline-text-row">
            Ideas Designed{' '}
            <span className="headline-inline-pill" aria-label="Conclave Visual Artwork">
              <Image
                src="/images/conclave-reference.jpg"
                alt="Bihar Healthcare Conclave Artwork"
                width={200}
                height={80}
                className="headline-pill-img"
                priority
              />
              <span className="headline-pill-badge" aria-hidden="true">
                <span className="pill-dot" />
              </span>
            </span>{' '}
            for
          </span>
          <span className="headline-text-row logo-accent-gradient">
            What&apos;s Next in Healthcare.
          </span>
        </h1>

        {/* 3. Subtext & Mission Statement */}
        <p className="merged-hero-lede">
          A meeting of minds. A movement towards better healthcare. Bringing healthcare leaders, doctors, researchers, nursing professionals, students, and innovators together on Friday, 11 December 2026 at Urja Auditorium, Patna.
        </p>

        {/* 4. Action Buttons & Quick Event Badges */}
        <div className="merged-hero-actions">
          <Link href="/register" className="merged-hero-btn-primary">
            <span>Register Delegate Pass</span>
            <span className="btn-arrow" aria-hidden="true">↗</span>
          </Link>

          <Link href="/programme" className="merged-hero-btn-secondary">
            <span>Explore Programmes ↗</span>
          </Link>
        </div>

        {/* Event Quick Chips Accented by Logo Tricolour (Blue, Green, Saffron) */}
        <div className="merged-hero-event-chips">
          <span className="hero-chip chip-blue">
            <span className="chip-icon">📅</span>
            <span>11 December 2026</span>
          </span>
          <span className="hero-chip chip-green">
            <span className="chip-icon">📍</span>
            <span>Urja Auditorium, Patna</span>
          </span>
          <span className="hero-chip chip-saffron">
            <span className="chip-dot" />
            <span>Registration Open</span>
          </span>
        </div>

        {/* 5. Our Organisers & Partners Section (Directly inside the Hero Section) */}
        <div className="merged-hero-partners-block" aria-label="Our Organisers and Official Partners">
          <p className="hero-partners-caption">
            Trusted &amp; Organised by Premier Healthcare, Academic &amp; Innovation Bodies
          </p>

          <div className="merged-hero-partners-grid">
            {FIVE_HERO_PARTNERS.map((partner) => (
              <article key={partner.id} className="merged-partner-card">
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="merged-partner-link"
                  aria-label={`Visit official website of ${partner.name}`}
                >
                  <span className="partner-role-tag">{partner.category}</span>
                  <div className="partner-logo-box">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={320}
                      height={120}
                      className="partner-logo-asset"
                      unoptimized
                      loading="eager"
                    />
                  </div>
                  <strong className="partner-card-title">{partner.name}</strong>
                  <span className="partner-visit-link">
                    <span>Visit Website</span>
                    <span className="visit-arrow" aria-hidden="true">↗</span>
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
