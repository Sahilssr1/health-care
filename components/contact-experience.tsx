'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { whatsAppLink } from '@/lib/enhancement-data';
import { competitionRegistrationUrl } from '@/lib/event-links';

interface ContactExperienceProps {
  whatsApp: string;
  enquiryMessage: string;
}

type GalleryCategory = 'all' | 'exterior' | 'atrium' | 'auditorium';
type MapLayer = 'm' | 'k';

interface VenuePhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: Exclude<GalleryCategory, 'all'>;
  categoryLabel: string;
}

const VENUE_PHOTOS: VenuePhoto[] = [
  {
    id: 'facade',
    src: '/logos/urja/img7.jpg',
    title: 'Main Glass & Steel Facade',
    caption: 'Symmetrical glazed entrance pavilion framing the approach steps at Urja Auditorium, New Punaichak',
    category: 'exterior',
    categoryLabel: 'Exterior & plaza',
  },
  {
    id: 'stage',
    src: '/logos/urja/aud.jpg',
    title: 'Main Auditorium Stage',
    caption: 'Acoustic timber-panelled main hall looking toward the plenary stage, lectern, and stage lighting rig',
    category: 'auditorium',
    categoryLabel: 'Auditorium hall',
  },
  {
    id: 'seating',
    src: '/logos/urja/img8.jpg',
    title: 'Two-Tier Acoustic Seating',
    caption: 'Sightline-engineered cushioned seating across the main floor and upper balcony gallery',
    category: 'auditorium',
    categoryLabel: 'Auditorium hall',
  },
  {
    id: 'atrium',
    src: '/logos/urja/img12.jpg',
    title: 'Grand Entrance Atrium & Foyer',
    caption: 'Polished granite reception concourse, sweeping staircase, and upper delegate gallery',
    category: 'atrium',
    categoryLabel: 'Atrium & foyer',
  },
  {
    id: 'plaza-west',
    src: '/logos/urja/img3.jpg',
    title: 'West Plaza Approach',
    caption: 'Folded metallic roof profile rising above the landscaped stone-paved pedestrian plaza',
    category: 'exterior',
    categoryLabel: 'Exterior & plaza',
  },
  {
    id: 'canopy',
    src: '/logos/urja/img5.jpg',
    title: 'Cantilevered Entrance Canopy',
    caption: 'Sheltered drop-off forecourt and stepped access leading directly into the registration lobby',
    category: 'exterior',
    categoryLabel: 'Exterior & plaza',
  },
  {
    id: 'courtyard',
    src: '/logos/urja/img4.jpg',
    title: 'Front Courtyard & Reflecting Courts',
    caption: 'Open lawn forecourt and broad entry steps welcoming delegates arriving from Bailey Road',
    category: 'exterior',
    categoryLabel: 'Exterior & plaza',
  },
  {
    id: 'elevation',
    src: '/logos/urja/img6.jpg',
    title: 'Campus Grounds & Parking Perimeter',
    caption: 'Full side elevation of the auditorium shell alongside the paved campus parking bays',
    category: 'exterior',
    categoryLabel: 'Exterior & plaza',
  },
  {
    id: 'profile',
    src: '/logos/urja/ad.jpg',
    title: 'Architectural Roof Geometry',
    caption: 'Angular standing-seam aluminium shell engineered for thermal and acoustic insulation',
    category: 'exterior',
    categoryLabel: 'Exterior & plaza',
  },
];

const GALLERY_FILTERS: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All views' },
  { id: 'exterior', label: 'Exterior & plaza' },
  { id: 'atrium', label: 'Atrium & foyer' },
  { id: 'auditorium', label: 'Auditorium hall' },
];

const ENQUIRY_TOPICS = [
  {
    id: 'general',
    label: 'General enquiry',
    subject: 'Bihar Healthcare Conclave 2026 — General Enquiry',
    message: '',
  },
  {
    id: 'delegate',
    label: 'Delegate registration',
    subject: 'Delegate Registration Support — BHC 2026',
    message: 'Hello, I have an enquiry regarding delegate registration for Bihar Healthcare Conclave 2026.',
  },
  {
    id: 'workshops',
    label: 'CME & CNE workshops',
    subject: 'Workshop & Academic Credits Enquiry — BHC 2026',
    message: 'Hello, I would like details about the CME, CNE, Paramedical, or Pharmacy workshops at Bihar Healthcare Conclave 2026.',
  },
  {
    id: 'partnerships',
    label: 'Partnerships & stalls',
    subject: 'Partnership & Exhibition Stall Enquiry — BHC 2026',
    message: 'Hello, we would like to explore partnership or exhibition opportunities at Bihar Healthcare Conclave 2026.',
  },
] as const;

const VENUE_ADDRESS = 'Urja Auditorium, BSPHCL Colony, New Punaichak, Patna, Bihar 800023';
const VENUE_REFERENCE_URL = 'https://bsphcl.co.in/auditorium/';
const GOOGLE_MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Urja+Auditorium,+BSPHCL+Colony,+New+Punaichak,+Patna,+Bihar+800023';
const GOOGLE_MAPS_SEARCH_URL =
  'https://www.google.com/maps/search/?api=1&query=Urja+Auditorium,+BSPHCL+Colony,+New+Punaichak,+Patna,+Bihar+800023';

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4" />
    </svg>
  );
}

function IconCopy() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconArrowLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function IconExpand() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function IconPlane() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function IconTrain() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="3" width="16" height="16" rx="2" />
      <path d="M4 11h16M12 3v8M8 19l-2 3M18 22l-2-3M8 15h.01M16 15h.01" />
    </svg>
  );
}

function IconCar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

export function ContactExperience({ whatsApp, enquiryMessage }: ContactExperienceProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<(typeof ENQUIRY_TOPICS)[number]['id']>('general');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mapLayer, setMapLayer] = useState<MapLayer>('m');
  const [mapLoaded, setMapLoaded] = useState(false);

  const filteredPhotos =
    activeCategory === 'all' ? VENUE_PHOTOS : VENUE_PHOTOS.filter((photo) => photo.category === activeCategory);
  const safeIndex = Math.min(activeIndex, Math.max(0, filteredPhotos.length - 1));
  const currentPhoto = filteredPhotos[safeIndex] ?? VENUE_PHOTOS[0];

  const selectedTopic = ENQUIRY_TOPICS.find((t) => t.id === selectedTopicId) ?? ENQUIRY_TOPICS[0];
  const activeWhatsAppHref = whatsAppLink(whatsApp, selectedTopic.message || enquiryMessage);
  const activeMailHref = `mailto:info@biharhealthcareconclave.com?subject=${encodeURIComponent(selectedTopic.subject)}`;

  const handleCopy = useCallback(async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(key);
      window.setTimeout(() => {
        setCopiedField((prev) => (prev === key ? null : prev));
      }, 2200);
    } catch {
      // Clipboard API unavailable in restricted contexts; fail silently.
    }
  }, []);

  const stepPhoto = useCallback(
    (delta: number) => {
      setActiveIndex((prev) => {
        const len = filteredPhotos.length;
        if (len === 0) return 0;
        return (prev + delta + len) % len;
      });
    },
    [filteredPhotos.length]
  );

  const selectCategory = (cat: GalleryCategory) => {
    setActiveCategory(cat);
    setActiveIndex(0);
  };

  // Progressive scroll-reveal observer for lower sections (only hides elements below fold while JS is active)
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-contact-reveal]'));
    if (!elements.length) return;

    const prefersReduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.remove('contact-will-reveal');
            el.classList.add('contact-is-revealed');
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -24px 0px' }
    );

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top >= window.innerHeight * 0.96) {
        el.classList.add('contact-will-reveal');
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
      elements.forEach((el) => el.classList.remove('contact-will-reveal'));
    };
  }, []);

  // Keyboard support for gallery and lightbox modal
  useEffect(() => {
    if (!lightboxOpen) return;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') stepPhoto(1);
      if (e.key === 'ArrowLeft') stepPhoto(-1);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxOpen, stepPhoto]);

  const mapEmbedSrc = `https://maps.google.com/maps?q=Urja+Auditorium,+BSPHCL+Colony,+New+Punaichak,+Patna,+Bihar+800023&t=${mapLayer}&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="contact-page-root">
      {/* ====================================================================
          01. EDITORIAL HERO — ORGANISER & VENUE ANCHOR
          ==================================================================== */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <div className="contact-hero-copy">
            <p className="contact-kicker contact-stagger" style={{ '--stagger': 0 } as React.CSSProperties}>
              <span className="contact-kicker-rule" aria-hidden="true" />
              Contact &amp; venue guide
            </p>

            <h1 className="contact-hero-title contact-stagger" style={{ '--stagger': 1 } as React.CSSProperties}>
              Reach the organiser.<br />
              <em>Visit Urja Auditorium.</em>
            </h1>

            <p className="contact-hero-lead contact-stagger" style={{ '--stagger': 2 } as React.CSSProperties}>
              Connect with QualiNova Solutions Pvt. Ltd. for delegate registration, CME and CNE workshops,
              institutional partnerships, or venue arrival details in Patna.
            </p>

            <div className="contact-hero-meta contact-stagger" style={{ '--stagger': 3 } as React.CSSProperties}>
              <div className="contact-meta-item">
                <span className="contact-meta-icon">
                  <IconCalendar />
                </span>
                <div>
                  <span className="contact-meta-label">Conclave date</span>
                  <strong>Friday, 11 December 2026</strong>
                </div>
              </div>
              <span className="contact-meta-divider" aria-hidden="true" />
              <div className="contact-meta-item">
                <span className="contact-meta-icon">
                  <IconPin />
                </span>
                <div>
                  <span className="contact-meta-label">Venue</span>
                  <strong>Urja Auditorium, New Punaichak, Patna</strong>
                </div>
              </div>
            </div>

            <div className="contact-hero-actions contact-stagger" style={{ '--stagger': 4 } as React.CSSProperties}>
              <a
                href={whatsAppLink(whatsApp, enquiryMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn-primary"
              >
                <span>Enquire on WhatsApp</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a href="#venue-location" className="contact-btn-secondary">
                <span>Map &amp; directions</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="contact-hero-visual contact-stagger" style={{ '--stagger': 2 } as React.CSSProperties}>
            <div className="contact-hero-photo-frame">
              <Image
                src="/logos/urja/img7.jpg"
                alt="Front glazed facade of Urja Auditorium in New Punaichak, Patna"
                fill
                priority
                sizes="(max-width: 960px) 100vw, 48vw"
                className="contact-hero-photo"
              />
              <div className="contact-hero-photo-scrim" aria-hidden="true" />
              <div className="contact-hero-photo-caption">
                <span>01 / Venue</span>
                <p>Urja Auditorium · BSPHCL Colony, New Punaichak, Patna – 800023</p>
              </div>
            </div>

            <div className="contact-urja-emblem-card">
              <div className="contact-urja-emblem-wrap">
                <Image
                  src="/logos/urja/logo.png"
                  alt="Urja Auditorium — BSPHCL Colony, New Punaichak, Patna-800023"
                  width={480}
                  height={92}
                  className="contact-urja-emblem-img"
                  priority
                />
              </div>
              <a
                href={VENUE_REFERENCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-urja-ref-link"
              >
                Official BSPHCL venue page ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          02. ORGANISER CONTACT DESK & ENQUIRY ROUTING
          ==================================================================== */}
      <section className="contact-section contact-desk-section" aria-labelledby="contact-desk-heading">
        <div className="contact-container">
          <div className="contact-section-header" data-contact-reveal="">
            <div className="contact-section-index">01</div>
            <div>
              <p className="contact-section-kicker">Organiser desk</p>
              <h2 id="contact-desk-heading">Direct channels for every enquiry</h2>
              <p className="contact-section-sub">
                Handled by the organising secretariat at QualiNova Solutions Pvt. Ltd. Select a topic below to
                pre-fill your WhatsApp or email message, or reach a desk directly.
              </p>
            </div>
          </div>

          <div className="contact-desk-grid">
            {/* Left Column: Organiser Contact Cards & Interactive Topic Router */}
            <div className="contact-channels-panel" data-contact-reveal="">
              <div className="contact-org-banner">
                <span className="contact-org-icon">
                  <IconBuilding />
                </span>
                <div>
                  <span className="contact-org-label">Organised by</span>
                  <h3>QualiNova Solutions Pvt. Ltd.</h3>
                  <p>Official Secretariat — Bihar Healthcare Conclave 2026</p>
                </div>
              </div>

              <div className="contact-cards-list">
                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <IconMail />
                  </div>
                  <div className="contact-info-body">
                    <span className="contact-info-label">Official email</span>
                    <a href="mailto:info@biharhealthcareconclave.com" className="contact-info-value">
                      info@biharhealthcareconclave.com
                    </a>
                    <p className="contact-info-note">For registrations, partnerships, awards, and formal correspondence</p>
                  </div>
                  <button
                    type="button"
                    className="contact-copy-btn"
                    onClick={() => handleCopy('email', 'info@biharhealthcareconclave.com')}
                    aria-label="Copy official email address"
                  >
                    {copiedField === 'email' ? <IconCheck /> : <IconCopy />}
                    <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <IconPhone />
                  </div>
                  <div className="contact-info-body">
                    <span className="contact-info-label">Delegate &amp; programme desk</span>
                    <a href="tel:+919911350649" className="contact-info-value contact-tabular">
                      +91 9911350649
                    </a>
                    <p className="contact-info-note">Primary helpline for delegates, speakers, and institutional teams</p>
                  </div>
                  <button
                    type="button"
                    className="contact-copy-btn"
                    onClick={() => handleCopy('phone1', '+91 9911350649')}
                    aria-label="Copy primary helpline number"
                  >
                    {copiedField === 'phone1' ? <IconCheck /> : <IconCopy />}
                    <span>{copiedField === 'phone1' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <IconPhone />
                  </div>
                  <div className="contact-info-body">
                    <span className="contact-info-label">Registration &amp; workshop support</span>
                    <a href="tel:+919955521842" className="contact-info-value contact-tabular">
                      +91 9955 521842
                    </a>
                    <p className="contact-info-note">Assistance with delegate passes, payment confirmation, and workshop slots</p>
                  </div>
                  <button
                    type="button"
                    className="contact-copy-btn"
                    onClick={() => handleCopy('phone2', '+91 9955 521842')}
                    aria-label="Copy secondary helpline number"
                  >
                    {copiedField === 'phone2' ? <IconCheck /> : <IconCopy />}
                    <span>{copiedField === 'phone2' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Interactive Topic Composer */}
              <div className="contact-composer">
                <div className="contact-composer-head">
                  <span className="contact-info-label">Start a tailored enquiry</span>
                  <p>Choose a subject to open WhatsApp or your email client with context ready</p>
                </div>

                <div className="contact-topic-pills" role="tablist" aria-label="Enquiry topic">
                  {ENQUIRY_TOPICS.map((topic) => (
                    <button
                      key={topic.id}
                      type="button"
                      role="tab"
                      aria-selected={selectedTopicId === topic.id}
                      className={`contact-topic-pill ${selectedTopicId === topic.id ? 'is-active' : ''}`}
                      onClick={() => setSelectedTopicId(topic.id)}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>

                <div key={selectedTopic.id} className="contact-composer-actions contact-topic-preview">
                  <a
                    href={activeWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-btn-primary"
                  >
                    <span>Message on WhatsApp</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                  <a href={activeMailHref} className="contact-btn-outline">
                    <span>Compose email</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Helpful Destinations & Fast Routing */}
            <aside className="contact-directory-panel" data-contact-reveal="">
              <div className="contact-directory-card">
                <span className="contact-info-label">Quick destinations</span>
                <h3>Looking for a specific desk</h3>
                <p className="contact-directory-intro">
                  Go straight to registration, programme details, or answers to common delegate questions.
                </p>

                <div className="contact-directory-links">
                  <Link href="/register" className="contact-dir-row">
                    <div>
                      <strong>Delegate &amp; Workshop Registration</strong>
                      <span>Complete registration and download your pass</span>
                    </div>
                    <span className="contact-dir-arrow" aria-hidden="true">↗</span>
                  </Link>

                  <a
                    href={competitionRegistrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-dir-row"
                  >
                    <div>
                      <strong>Quiz &amp; Hackathon Registration</strong>
                      <span>Nursing Knowledge Quest &amp; Healthcare AI Hackathon</span>
                    </div>
                    <span className="contact-dir-arrow" aria-hidden="true">↗</span>
                  </a>

                  <Link href="/programme" className="contact-dir-row">
                    <div>
                      <strong>Programme &amp; Tracks</strong>
                      <span>Sessions, workshops, awards, and exhibition overview</span>
                    </div>
                    <span className="contact-dir-arrow" aria-hidden="true">↗</span>
                  </Link>

                  <Link href="/partnerships" className="contact-dir-row">
                    <div>
                      <strong>Partnership Opportunities</strong>
                      <span>Institutional, clinical, technology, and exhibition support</span>
                    </div>
                    <span className="contact-dir-arrow" aria-hidden="true">↗</span>
                  </Link>

                  <Link href="/faq" className="contact-dir-row">
                    <div>
                      <strong>Help Center &amp; FAQs</strong>
                      <span>Eligibility, schedule, and registration policy answers</span>
                    </div>
                    <span className="contact-dir-arrow" aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ====================================================================
          03. URJA AUDITORIUM PHOTOGRAPHY GALLERY
          ==================================================================== */}
      <section className="contact-section contact-gallery-section" id="venue-gallery" aria-labelledby="venue-gallery-heading">
        <div className="contact-container">
          <div className="contact-gallery-top" data-contact-reveal="">
            <div className="contact-section-header">
              <div className="contact-section-index">02</div>
              <div>
                <p className="contact-section-kicker">Venue showcase</p>
                <h2 id="venue-gallery-heading">Inside Urja Auditorium, Patna</h2>
                <p className="contact-section-sub">
                  An architectural landmark in BSPHCL Colony, New Punaichak — featuring an 850-seat two-tier
                  acoustic hall, grand granite atrium, and dedicated campus plaza.
                </p>
              </div>
            </div>

            <div className="contact-gallery-filters" role="tablist" aria-label="Filter auditorium photographs">
              {GALLERY_FILTERS.map((filter) => {
                const count =
                  filter.id === 'all'
                    ? VENUE_PHOTOS.length
                    : VENUE_PHOTOS.filter((p) => p.category === filter.id).length;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === filter.id}
                    className={`contact-filter-btn ${activeCategory === filter.id ? 'is-active' : ''}`}
                    onClick={() => selectCategory(filter.id)}
                  >
                    <span>{filter.label}</span>
                    <span className="contact-filter-count contact-tabular">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Stage Viewer */}
          <div className="contact-gallery-stage-wrap" data-contact-reveal="">
            <div className="contact-gallery-stage">
              <div key={currentPhoto.id} className="contact-gallery-image-layer">
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.caption}
                  fill
                  sizes="(max-width: 760px) 100vw, 1200px"
                  className="contact-gallery-main-img"
                />
              </div>

              <div className="contact-gallery-gradient" aria-hidden="true" />

              <div className="contact-gallery-overlay-top">
                <span className="contact-gallery-tag">{currentPhoto.categoryLabel}</span>
                <button
                  type="button"
                  className="contact-expand-btn"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Open photograph in full screen"
                >
                  <IconExpand />
                  <span>Full view</span>
                </button>
              </div>

              <div className="contact-gallery-overlay-bottom">
                <div className="contact-gallery-caption">
                  <span className="contact-gallery-counter contact-tabular">
                    {String(safeIndex + 1).padStart(2, '0')} / {String(filteredPhotos.length).padStart(2, '0')}
                  </span>
                  <h3>{currentPhoto.title}</h3>
                  <p>{currentPhoto.caption}</p>
                </div>

                <div className="contact-gallery-controls">
                  <button
                    type="button"
                    className="contact-nav-circle"
                    onClick={() => stepPhoto(-1)}
                    aria-label="Previous venue photograph"
                  >
                    <IconArrowLeft />
                  </button>
                  <button
                    type="button"
                    className="contact-nav-circle"
                    onClick={() => stepPhoto(1)}
                    aria-label="Next venue photograph"
                  >
                    <IconArrowRight />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail Filmstrip */}
            <div className="contact-thumb-strip" role="listbox" aria-label="Auditorium photograph thumbnails">
              {filteredPhotos.map((photo, idx) => {
                const isSelected = idx === safeIndex;
                return (
                  <button
                    key={photo.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`contact-thumb-btn ${isSelected ? 'is-active' : ''}`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <div className="contact-thumb-img-box">
                      <Image
                        src={photo.src}
                        alt={photo.title}
                        fill
                        sizes="180px"
                        className="contact-thumb-img"
                      />
                    </div>
                    <span className="contact-thumb-title">{photo.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Venue Facts Strip */}
          <div className="contact-venue-facts" data-contact-reveal="">
            <div className="contact-venue-fact">
              <span className="contact-fact-label">Main auditorium</span>
              <strong>~850-seat two-tier hall</strong>
              <p>Air-conditioned plenary seating with acoustic timber panelling and stage AV</p>
            </div>
            <div className="contact-venue-fact">
              <span className="contact-fact-label">Campus &amp; parking</span>
              <strong>BSPHCL Colony, New Punaichak</strong>
              <p>Landscaped pedestrian plaza, grand reception atrium, and dedicated on-site parking</p>
            </div>
            <div className="contact-venue-fact">
              <span className="contact-fact-label">Official venue listing</span>
              <strong>Bihar State Power Holding Co. Ltd.</strong>
              <p>
                <a href={VENUE_REFERENCE_URL} target="_blank" rel="noopener noreferrer" className="contact-inline-link">
                  bsphcl.co.in/auditorium ↗
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          04. INTERACTIVE GOOGLE MAP, ADDRESS & DIRECTIONS
          ==================================================================== */}
      <section className="contact-section contact-location-section" id="venue-location" aria-labelledby="venue-location-heading">
        <div className="contact-container">
          <div className="contact-section-header" data-contact-reveal="">
            <div className="contact-section-index">03</div>
            <div>
              <p className="contact-section-kicker">Location &amp; directions</p>
              <h2 id="venue-location-heading">Getting to Urja Auditorium</h2>
              <p className="contact-section-sub">
                Situated in BSPHCL Colony, New Punaichak off Jawahar Lal Nehru Marg (Bailey Road), Patna —
                accessible from Patna Airport, Patna Junction, and nearby medical institutions.
              </p>
            </div>
          </div>

          <div className="contact-location-grid">
            {/* Interactive Google Map Panel */}
            <div className="contact-map-panel" data-contact-reveal="">
              <div className="contact-map-toolbar">
                <div className="contact-map-pin-label">
                  <IconPin />
                  <span>Urja Auditorium, New Punaichak, Patna</span>
                </div>
                <div className="contact-map-switcher" role="group" aria-label="Map view type">
                  <button
                    type="button"
                    className={`contact-map-mode-btn ${mapLayer === 'm' ? 'is-active' : ''}`}
                    onClick={() => {
                      setMapLoaded(false);
                      setMapLayer('m');
                    }}
                  >
                    Map
                  </button>
                  <button
                    type="button"
                    className={`contact-map-mode-btn ${mapLayer === 'k' ? 'is-active' : ''}`}
                    onClick={() => {
                      setMapLoaded(false);
                      setMapLayer('k');
                    }}
                  >
                    Satellite
                  </button>
                </div>
              </div>

              <div className="contact-map-frame-wrap">
                {!mapLoaded && (
                  <div className="contact-map-skeleton" aria-hidden="true">
                    <span>Loading interactive map for Urja Auditorium, Patna…</span>
                  </div>
                )}
                <iframe
                  key={mapLayer}
                  title="Interactive Google Map showing Urja Auditorium, BSPHCL Colony, New Punaichak, Patna"
                  src={mapEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className={`contact-map-iframe ${mapLoaded ? 'is-ready' : ''}`}
                  onLoad={() => setMapLoaded(true)}
                />
              </div>

              <div className="contact-map-footer">
                <span className="contact-tabular">Coordinates: 25.6125° N, 85.0992° E</span>
                <a href={GOOGLE_MAPS_SEARCH_URL} target="_blank" rel="noopener noreferrer">
                  Open full map in Google Maps ↗
                </a>
              </div>
            </div>

            {/* Address, Official Emblem & Arrival Guide */}
            <div className="contact-address-panel" data-contact-reveal="">
              <div className="contact-address-card">
                <div className="contact-address-emblem">
                  <Image
                    src="/logos/urja/logo.png"
                    alt="Urja Auditorium — BSPHCL Colony, New Punaichak, Patna-800023"
                    width={460}
                    height={88}
                    className="contact-address-emblem-img"
                  />
                </div>

                <div className="contact-address-block">
                  <span className="contact-info-label">Official venue address</span>
                  <address className="contact-postal-address">
                    <strong>Urja Auditorium</strong>
                    <span>BSPHCL Colony, New Punaichak</span>
                    <span>Patna, Bihar – 800023, India</span>
                  </address>

                  <div className="contact-address-actions">
                    <a
                      href={GOOGLE_MAPS_DIRECTIONS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-btn-primary"
                    >
                      <IconCompass />
                      <span>Get directions</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                    <button
                      type="button"
                      className="contact-copy-btn contact-copy-address"
                      onClick={() => handleCopy('address', VENUE_ADDRESS)}
                    >
                      {copiedField === 'address' ? <IconCheck /> : <IconCopy />}
                      <span>{copiedField === 'address' ? 'Address copied' : 'Copy address'}</span>
                    </button>
                  </div>
                </div>

                <div className="contact-directions-list">
                  <div className="contact-direction-row">
                    <span className="contact-dir-icon">
                      <IconPlane />
                    </span>
                    <div>
                      <strong>From Jay Prakash Narayan International Airport</strong>
                      <p>Approx. 15–20 minutes by cab via Sheikhpura and Bailey Road toward Shastri Nagar / New Punaichak.</p>
                    </div>
                  </div>

                  <div className="contact-direction-row">
                    <span className="contact-dir-icon">
                      <IconTrain />
                    </span>
                    <div>
                      <strong>From Patna Junction Railway Station</strong>
                      <p>Approx. 20–25 minutes west along Jawahar Lal Nehru Marg (Bailey Road), turning into BSPHCL Colony, New Punaichak.</p>
                    </div>
                  </div>

                  <div className="contact-direction-row">
                    <span className="contact-dir-icon">
                      <IconPin />
                    </span>
                    <div>
                      <strong>Nearby landmarks</strong>
                      <p>Located within the BSPHCL residential and institutional campus near Shastri Nagar, Board Colony, and IGIMS.</p>
                    </div>
                  </div>

                  <div className="contact-direction-row">
                    <span className="contact-dir-icon">
                      <IconCar />
                    </span>
                    <div>
                      <strong>Campus entry &amp; parking</strong>
                      <p>Dedicated four-wheeler and two-wheeler parking bays are available inside the Urja Auditorium complex.</p>
                    </div>
                  </div>
                </div>

                <div className="contact-bsphcl-ref">
                  <span>Location reference</span>
                  <a href={VENUE_REFERENCE_URL} target="_blank" rel="noopener noreferrer">
                    https://bsphcl.co.in/auditorium/ ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          05. FULLSCREEN GALLERY LIGHTBOX MODAL
          ==================================================================== */}
      {lightboxOpen && (
        <div
          className="contact-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${currentPhoto.title} — Urja Auditorium gallery`}
          onClick={() => setLightboxOpen(false)}
        >
          <div className="contact-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="contact-lightbox-header">
              <div>
                <span className="contact-lightbox-count contact-tabular">
                  {String(safeIndex + 1).padStart(2, '0')} / {String(filteredPhotos.length).padStart(2, '0')} · {currentPhoto.categoryLabel}
                </span>
                <h3>{currentPhoto.title}</h3>
              </div>
              <button
                type="button"
                className="contact-lightbox-close"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close photograph viewer"
              >
                <IconClose />
              </button>
            </div>

            <div className="contact-lightbox-media">
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.caption}
                fill
                sizes="95vw"
                className="contact-lightbox-img"
              />
            </div>

            <div className="contact-lightbox-footer">
              <p>{currentPhoto.caption}</p>
              <div className="contact-gallery-controls">
                <button
                  type="button"
                  className="contact-nav-circle"
                  onClick={() => stepPhoto(-1)}
                  aria-label="Previous photograph"
                >
                  <IconArrowLeft />
                </button>
                <button
                  type="button"
                  className="contact-nav-circle"
                  onClick={() => stepPhoto(1)}
                  aria-label="Next photograph"
                >
                  <IconArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
