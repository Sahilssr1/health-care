import React from 'react';
import Image from 'next/image';

interface PartnerShowcaseItem {
  id: string;
  category: string;
  name: string;
  logo: string;
  url?: string;
  badgeAccent?: string;
}

const FIVE_KEY_PARTNERS: PartnerShowcaseItem[] = [
  {
    id: 'qualinova',
    category: 'Organised by',
    name: 'QualiNova Solutions Pvt. Ltd.',
    logo: '/logos/qualinova.jpg',
    url: 'https://qualinovahub.com',
    badgeAccent: '#0d9488',
  },
  {
    id: 'ima-bihar',
    category: 'Organising Partner',
    name: 'Indian Medical Association — Bihar State Branch',
    logo: '/logos/ima-bihar.jpg',
    url: 'https://imabihar.org',
    badgeAccent: '#0d9488',
  },
  {
    id: 'tnai',
    category: 'Organising Partner',
    name: 'TNAI — Trained Nurses Association of India, Bihar State Branch',
    logo: '/logos/tnai-bihar-state-branch.jpg',
    url: 'https://www.tnaionline.org/',
    badgeAccent: '#0d9488',
  },
  {
    id: 'aicbv',
    category: 'Innovation Partner',
    name: 'AIC Bihar Vidyapith',
    logo: '/logos/AICBV.png',
    url: 'https://www.aicbvf.edu.in/',
    badgeAccent: '#0d9488',
  },
  {
    id: 'dr-cp-thakur',
    category: 'Social Responsibility Partner',
    name: 'Dr. C.P. Thakur Foundation',
    logo: '/logos/dr-cp-thakur.png',
    url: 'https://biharhealthcareconclave.com/about',
    badgeAccent: '#0d9488',
  },
];

export function HeroPartnersShowcase() {
  return (
    <section
      id="organisers-partners"
      className="hero-partners-section"
      aria-label="Our Organisers and Official Partners"
    >
      <div className="hero-partners-container">
        {/* Section Header */}
        <div className="hero-partners-header">
          <p className="hero-partners-eyebrow">OUR ORGANISERS &amp; PARTNERS</p>
          <h2 className="hero-partners-title">Connected by a shared purpose.</h2>
          <p className="hero-partners-desc">
            Bringing healthcare professionals, clinical leadership, academic excellence, innovation, and community responsibility together for Bihar.
          </p>
        </div>

        {/* 5-Card Grid directly inspired by Reference Image */}
        <div className="hero-partners-grid">
          {FIVE_KEY_PARTNERS.map((partner) => {
            const cardBody = (
              <div className="hero-partner-card-body">
                {/* Top Category Tag */}
                <div className="partner-category-tag">
                  <span>{partner.category}</span>
                </div>

                {/* Centered Logo Frame */}
                <div className="partner-logo-container">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={400}
                    height={160}
                    className="partner-logo-img"
                    unoptimized
                    loading="eager"
                  />
                </div>

                {/* Partner Name */}
                <h3 className="partner-title-name">{partner.name}</h3>

                {/* Clickable Link Indicator */}
                <div className="partner-link-action">
                  <span>Visit Website</span>
                  <span className="partner-link-arrow" aria-hidden="true">↗</span>
                </div>
              </div>
            );

            return (
              <article key={partner.id} className={`hero-partner-card partner-card-${partner.id}`}>
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-partner-card-link"
                    aria-label={`Visit official website of ${partner.name}`}
                  >
                    {cardBody}
                  </a>
                ) : (
                  <div className="hero-partner-card-static">{cardBody}</div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
