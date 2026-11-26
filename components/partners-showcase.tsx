'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DETAILED_PARTNERS, type DetailedPartner } from '@/lib/partners-directory';

interface PartnersShowcaseProps {
  isPage?: boolean;
  whatsAppNumber?: string;
}

export function PartnersShowcase({ isPage = false, whatsAppNumber = '919911350649' }: PartnersShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'organiser-official' | 'strategic'>('all');

  const organiserPartner = DETAILED_PARTNERS.find((p) => p.id === 'qualinova');
  const officialPartners = DETAILED_PARTNERS.filter(
    (p) => p.group === 'organiser-official' && p.id !== 'qualinova'
  );
  const strategicPartners = DETAILED_PARTNERS.filter((p) => p.group === 'strategic');

  const showOrganiserGroup = activeFilter === 'all' || activeFilter === 'organiser-official';
  const showStrategicGroup = activeFilter === 'all' || activeFilter === 'strategic';

  const waEnquiryUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
    'Hello, I would like to enquire about partnership opportunities at Bihar Healthcare Conclave 2026.'
  )}`;

  return (
    <div className="partners-modern-experience">
      {/* Page Hero Header (rendered when on /partners page) */}
      {isPage && (
        <section className="partners-hero-header">
          <div className="partners-hero-kicker">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            OFFICIAL CONCLAVE PARTNERS &amp; ECOSYSTEM
          </div>

          <h1 className="partners-hero-title">
            Organiser and <em>Official Partners</em>
          </h1>

          <p className="partners-hero-subtitle">
            Connecting clinical leadership, medical practice, nursing education, grassroots innovation, 
            cutting-edge technology, and social responsibility for a healthier, future-ready Bihar.
          </p>

          <div className="partners-metrics-bar">
            <div className="partners-metric-item">
              <span className="partners-metric-value">01</span>
              <span className="partners-metric-label">Leading Organiser</span>
            </div>
            <div className="partners-metric-item">
              <span className="partners-metric-value">02</span>
              <span className="partners-metric-label">Apex State Bodies</span>
            </div>
            <div className="partners-metric-item">
              <span className="partners-metric-value">02</span>
              <span className="partners-metric-label">Innovation &amp; CSR</span>
            </div>
            <div className="partners-metric-item">
              <span className="partners-metric-value">04</span>
              <span className="partners-metric-label">Strategic Partners</span>
            </div>
          </div>
        </section>
      )}

      {/* Embedded Section Header (rendered on homepage or secondary sections) */}
      {!isPage && (
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p className="partners-group-eyebrow" style={{ letterSpacing: '2px', color: '#1b6c34' }}>
            ORGANISER &amp; OFFICIAL PARTNERS
          </p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 800, color: '#072142', margin: '8px 0 12px' }}>
            Connected by a shared purpose.
          </h2>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#475569', fontSize: '15.5px', lineHeight: 1.6 }}>
            Bringing healthcare professionals, clinical leadership, academic excellence, innovation, and community responsibility together for Bihar.
          </p>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="partners-filter-wrapper" role="tablist" aria-label="Filter partners by category">
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === 'all'}
          className={`partners-filter-tab ${activeFilter === 'all' ? 'is-active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          <span>All Partners</span>
          <span className="partners-filter-badge">{DETAILED_PARTNERS.length}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === 'organiser-official'}
          className={`partners-filter-tab ${activeFilter === 'organiser-official' ? 'is-active' : ''}`}
          onClick={() => setActiveFilter('organiser-official')}
        >
          <span>Organiser &amp; Organising</span>
          <span className="partners-filter-badge">5</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === 'strategic'}
          className={`partners-filter-tab ${activeFilter === 'strategic' ? 'is-active' : ''}`}
          onClick={() => setActiveFilter('strategic')}
        >
          <span>Strategic Partners</span>
          <span className="partners-filter-badge">4</span>
        </button>
      </div>

      {/* GROUP 1: ORGANISER & ORGANISING PARTNERS */}
      {showOrganiserGroup && (
        <section className="partners-group-section" aria-labelledby="heading-organiser-official">
          <div className="partners-group-header">
            <div>
              <p className="partners-group-eyebrow">CONCLAVE LEADERSHIP</p>
              <h2 id="heading-organiser-official" className="partners-group-title">
                ORGANISER &amp; ORGANISING PARTNERS
              </h2>
              <p className="partners-group-subtitle">
                Apex healthcare bodies, professional associations, incubation centres, and pioneering health foundations leading the Conclave.
              </p>
            </div>
          </div>

          {/* Featured Spotlight: QualiNova Solutions (Organiser) */}
          {organiserPartner && (
            <article className="partner-card-featured">
              <div className="partner-card-featured-inner">
                {/* Left Column: Logo Chamber & Quick Meta */}
                <div style={{ textAlign: 'center' }}>
                  <div className="partner-logo-frame">
                    <Image
                      src={organiserPartner.logo}
                      alt={organiserPartner.name}
                      width={440}
                      height={180}
                      className="partner-logo-image"
                      unoptimized
                      priority
                    />
                  </div>
                  <div style={{ marginTop: '16px' }}>
                    <span
                      className="partner-category-badge"
                      style={{
                        background: organiserPartner.themeColor.badgeBg,
                        color: organiserPartner.themeColor.badgeText,
                        borderColor: organiserPartner.themeColor.badgeBorder,
                      }}
                    >
                      ★ {organiserPartner.badge}
                    </span>
                  </div>
                </div>

                {/* Right Column: Narrative, Contributions & Action */}
                <div>
                  <div className="partner-card-topbar">
                    <span className="partner-achievement-pill">
                      🏆 {organiserPartner.achievement}
                    </span>
                    <span className="partner-status-tag">Event Organiser &amp; PMU</span>
                  </div>

                  <h3 className="partner-title-heading" style={{ fontSize: '26px' }}>
                    {organiserPartner.name}
                  </h3>
                  <p className="partner-role-descriptor" style={{ color: '#047857', marginBottom: '14px' }}>
                    {organiserPartner.role}
                  </p>

                  <p className="partner-description-text" style={{ fontSize: '14.5px' }}>
                    {organiserPartner.description}
                  </p>

                  <ul className="partner-contributions-list">
                    {organiserPartner.contributions.map((point, idx) => (
                      <li key={idx} className="partner-contribution-item">
                        <span className="partner-contribution-bullet" aria-hidden="true">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="partner-card-footer">
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                      Quality · Innovation · Transformation
                    </span>
                    <a
                      href={organiserPartner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="partner-visit-btn"
                      aria-label={`Visit official website of ${organiserPartner.name}`}
                    >
                      <span>Visit Official Website</span>
                      <span className="partner-btn-arrow" aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Grid of Other Organising Partners */}
          <div className="partners-grid-responsive">
            {officialPartners.map((partner) => (
              <PartnerItemCard key={partner.id} partner={partner} />
            ))}
          </div>
        </section>
      )}

      {/* GROUP 2: STRATEGIC PARTNERS (Explicitly replacing "INSTITUTIONAL & STRATEGIC PARTNERS") */}
      {showStrategicGroup && (
        <section className="partners-group-section" aria-labelledby="heading-strategic-partners">
          <div className="partners-group-header">
            <div>
              <p className="partners-group-eyebrow">INNOVATION &amp; GROWTH ECOSYSTEM</p>
              <h2 id="heading-strategic-partners" className="partners-group-title">
                STRATEGIC PARTNERS
              </h2>
              <p className="partners-group-subtitle">
                Specialised technology, branding &amp; marketing, hospitality, and startup incubation partners powering Bihar Healthcare Conclave 2026.
              </p>
            </div>
          </div>

          <div className="partners-grid-responsive">
            {strategicPartners.map((partner) => (
              <PartnerItemCard key={partner.id} partner={partner} />
            ))}
          </div>
        </section>
      )}

      {/* Partnership Opportunities Banner */}
      <section className="partners-collab-banner">
        <div className="partners-collab-copy">
          <p className="partners-collab-kicker">COLLABORATE FOR HEALTHCARE IMPACT</p>
          <h2 className="partners-collab-title">
            Partner with Bihar Healthcare Conclave 2026
          </h2>
          <p className="partners-collab-text">
            Join visionary institutions, healthcare organisations, technology innovators, and corporate leaders.
            Explore exhibition stalls, academic sponsorships, CME/CNE accreditations, and high-visibility partnerships.
          </p>
        </div>

        <div className="partners-collab-actions">
          <a
            href="mailto:info@biharhealthcareconclave.com?subject=Partnership%20Enquiry%20-%20Bihar%20Healthcare%20Conclave%202026"
            className="button"
          >
            Email the Organiser ↗
          </a>
          <a
            href={waEnquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="partners-collab-whatsapp"
          >
            <span>Enquire on WhatsApp ↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}

function PartnerItemCard({ partner }: { partner: DetailedPartner }) {
  return (
    <article className={`partner-modern-card partner-card-${partner.id}`}>
      <div>
        {/* Top Bar with Category Badge and Achievement */}
        <div className="partner-card-topbar">
          <span
            className="partner-category-badge"
            style={{
              background: partner.themeColor.badgeBg,
              color: partner.themeColor.badgeText,
              borderColor: partner.themeColor.badgeBorder,
            }}
          >
            {partner.badge}
          </span>
          {partner.achievement && (
            <span className="partner-achievement-pill" title={partner.achievement}>
              {partner.achievement}
            </span>
          )}
        </div>

        {/* Identity Chamber (Logo Frame + Name & Role) */}
        <div className="partner-identity-chamber">
          <div className="partner-logo-frame">
            <Image
              src={partner.logo}
              alt={partner.name}
              width={260}
              height={120}
              className="partner-logo-image"
              unoptimized
              loading="lazy"
            />
          </div>

          <div className="partner-identity-text">
            <h3 className="partner-title-heading">{partner.name}</h3>
            <p className="partner-role-descriptor" style={{ color: partner.themeColor.accent }}>
              {partner.role}
            </p>
          </div>
        </div>

        {/* Card Body: Narrative & Key Contribution Bullets */}
        <div className="partner-card-content">
          <p className="partner-description-text">{partner.description}</p>

          <ul className="partner-contributions-list">
            {partner.contributions.map((point, index) => (
              <li key={index} className="partner-contribution-item">
                <span className="partner-contribution-bullet" style={{ color: partner.themeColor.accent }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="partner-card-footer">
        <span className="partner-status-tag">Official Conclave Partner</span>
        {partner.url && (
          <a
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="partner-visit-btn"
            aria-label={`Visit official website of ${partner.name}`}
          >
            <span>Visit Official Website</span>
            <span className="partner-btn-arrow" aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
