'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface MentorProfile {
  id: string;
  name: string;
  role: string;
  roleType: 'chief-mentor' | 'chief-mentor-patron' | 'mentor-quality';
  headline: string;
  photoUrl: string;
  credentials: string[];
  briefNote: string;
  badgeStyle: 'mentor-badge-gold' | 'mentor-badge-blue' | 'mentor-badge-teal';
  badgeIcon: string;
}

export const MENTORS_DATA: MentorProfile[] = [
  {
    id: 'dr-cp-thakur',
    name: 'Padma Shri Dr. C. P. Thakur',
    role: 'Chief Mentor',
    roleType: 'chief-mentor',
    headline: 'Former Union Minister of Health & Family Welfare, Govt. of India | Renowned Physician & Kala-azar Research Pioneer',
    photoUrl: '/mentors/dr-cp-thakur.jpeg',
    credentials: [
      'Former Union Minister of Health & Family Welfare, Government of India',
      'Former Member of Parliament (Lok Sabha & Rajya Sabha)',
      'Globally Renowned Physician & Kala-azar Research Pioneer',
      'Recipient of the Padma Shri and Dr. B. C. Roy National Award',
    ],
    briefNote: 'A legendary physician, medical scientist, and public health policymaker internationally acclaimed for his groundbreaking research on Kala-azar eradication and lifelong dedication to healthcare reform in India.',
    badgeStyle: 'mentor-badge-gold',
    badgeIcon: '🏅',
  },
  {
    id: 'dr-sahajanand-singh',
    name: 'Dr. Sahajanand Prasad Singh',
    role: 'Chief Mentor & Patron',
    roleType: 'chief-mentor-patron',
    headline: 'Registrar & Secretary, BCMR | Former National President, IMA | Former Member, NMC',
    photoUrl: '/mentors/dr-sahajanand.jpeg',
    credentials: [
      'Registrar and Secretary, Bihar Council of Medical Registration (BCMR)',
      'Former National President, Indian Medical Association (IMA)',
      'Former Member, National Medical Commission (NMC)',
      'Former President, IMA, Bihar State Branch',
    ],
    briefNote: 'A distinguished surgeon and veteran medical leader recognized for his enduring contributions to medical education, professional collaboration, and community healthcare advancement.',
    badgeStyle: 'mentor-badge-blue',
    badgeIcon: '🩺',
  },
  {
    id: 'sister-usha-saldanha',
    name: 'Sister Usha Saldanha',
    role: 'Mentor (Healthcare Quality)',
    roleType: 'mentor-quality',
    headline: 'President, TNAI (Bihar) | Former Principal, College of Nursing, Kurji Holy Family Hospital, Patna',
    photoUrl: '/mentors/sister-usha-saldanha.jpeg',
    credentials: [
      "President, Trained Nurses' Association of India (TNAI), Bihar",
      'Former Principal, College of Nursing, Kurji Holy Family Hospital, Patna',
      'Mentor (Healthcare Quality), QualiNova Solutions Pvt. Ltd.',
    ],
    briefNote: 'A veteran nursing leader and healthcare quality advocate dedicated to advancing clinical competence, patient safety standards, and nursing education across Bihar.',
    badgeStyle: 'mentor-badge-teal',
    badgeIcon: '🛡️',
  },
];

export function MentorsExperience() {
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMentor(null);
      }
    };
    if (selectedMentor) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMentor]);

  return (
    <div className="mentors-modern-experience">
      {/* ====================================================================
          PAGE HERO SECTION
          ==================================================================== */}
      <section className="mentors-hero-card">
        <div className="mentors-hero-top">
          <div className="mentors-hero-kicker">
            <span className="pulse-dot" aria-hidden="true" />
            <span>Patronage &amp; Leadership</span>
          </div>
          <div className="mentors-event-pill">
            <span>📅 11 December 2026 · Urja Auditorium, Patna</span>
          </div>
        </div>

        <h1 className="mentors-hero-title">
          Chief Mentors &amp; Patrons
          <em>Meet the Visionaries</em>
        </h1>

        <div className="mentors-hero-quote-box">
          <p className="mentors-quote-text">
            &ldquo;The future of Bihar’s healthcare won’t be defined by infrastructure alone.
            It will be remembered for the pioneers who led, healed, and transformed lives across generations.&rdquo;
          </p>
          <span className="mentors-quote-author">Bihar Healthcare Conclave 2026</span>
        </div>

        <div className="mentors-hero-actions">
          <Link href="/register" className="button">
            Register for the Conclave <span>↗</span>
          </Link>
          <Link href="/programme" className="about-outline">
            Explore Programme Highlights <span>↗</span>
          </Link>
        </div>
      </section>

      {/* ====================================================================
          SECTION INTRO
          ==================================================================== */}
      <div className="mentors-section-heading">
        <span className="mentors-section-eyebrow">DISTINGUISHED HEALTHCARE LEADERSHIP</span>
        <h2 className="mentors-section-title">Guiding the Transformation of Healthcare in Bihar</h2>
        <p className="mentors-section-subtitle">
          Meet the revered medical pioneers, public health architects, and quality leaders providing overarching
          mentorship and guidance to the Bihar Healthcare Conclave 2026.
        </p>
      </div>

      {/* ====================================================================
          MENTORS & PATRONS CARDS GRID (3-COLUMN RESPONSIVE)
          ==================================================================== */}
      <div className="mentors-cards-grid">
        {MENTORS_DATA.map((mentor) => (
          <article className="mentor-profile-card" key={mentor.id}>
            {/* Photograph Container */}
            <div className="mentor-photo-container">
              <Image
                src={mentor.photoUrl}
                alt={`${mentor.name} — ${mentor.role}`}
                width={550}
                height={550}
                className="mentor-photo-img"
                loading="lazy"
              />
              <div className={`mentor-photo-badge ${mentor.badgeStyle}`}>
                <span>{mentor.role}</span>
                <span className="mentor-badge-icon" aria-hidden="true">{mentor.badgeIcon}</span>
              </div>
            </div>

            {/* Profile Content Body */}
            <div className="mentor-card-body">
              <h3 className="mentor-name">{mentor.name}</h3>
              <p className="mentor-headline">{mentor.headline}</p>

              {/* Key Credentials */}
              <div className="mentor-credentials-wrap">
                <span className="mentor-credentials-label">Key Credentials &amp; Appointments</span>
                <ul className="mentor-credentials-list">
                  {mentor.credentials.map((cred, idx) => (
                    <li key={idx}>
                      <span className="credential-check">✓</span>
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brief Note Box */}
              <div className="mentor-note-box">
                <p className="mentor-note-text">&ldquo;{mentor.briefNote}&rdquo;</p>
              </div>

              {/* Action Button */}
              <button
                type="button"
                className="mentor-explore-btn"
                onClick={() => setSelectedMentor(mentor)}
                aria-haspopup="dialog"
              >
                <span>View Complete Profile &amp; Credentials</span>
                <span>↗</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* ====================================================================
          PILLARS OF MENTORSHIP SECTION
          ==================================================================== */}
      <section className="mentors-pillars-banner">
        <div className="mentors-pillars-header">
          <span className="mentors-section-eyebrow">OUR GUIDING PRINCIPLES</span>
          <h2 className="mentors-section-title">The Foundation of Our Mentorship</h2>
          <p className="mentors-section-subtitle">
            Under the visionary stewardship of our Chief Mentors and Patrons, Bihar Healthcare Conclave 2026
            champions excellence across clinical care, nursing standards, and public health innovation.
          </p>
        </div>

        <div className="mentors-pillars-grid">
          <div className="mentors-pillar-item">
            <span className="mentors-pillar-icon" aria-hidden="true">🔬</span>
            <h3 className="mentors-pillar-title">Pioneering Medical Research</h3>
            <p className="mentors-pillar-desc">
              Championing scientific inquiry, evidence-based clinical protocols, and breakthrough tropical disease research
              that puts Bihar on the global health map.
            </p>
          </div>

          <div className="mentors-pillar-item">
            <span className="mentors-pillar-icon" aria-hidden="true">🏛️</span>
            <h3 className="mentors-pillar-title">Professional Collaboration &amp; Ethics</h3>
            <p className="mentors-pillar-desc">
              Fostering inter-professional solidarity among doctors, surgeons, administrators, and allied health staff
              governed by the highest ethical standards.
            </p>
          </div>

          <div className="mentors-pillar-item">
            <span className="mentors-pillar-icon" aria-hidden="true">🛡️</span>
            <h3 className="mentors-pillar-title">Patient Safety &amp; Quality Care</h3>
            <p className="mentors-pillar-desc">
              Advancing clinical competencies, patient-centered nursing practices, and quality accreditation across
              rural, district, and apex healthcare facilities.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FINAL CALL TO ACTION
          ==================================================================== */}
      <section className="mentors-final-cta">
        <p className="eyebrow">JOIN THE VISIONARIES</p>
        <h2>Be Part of Bihar&apos;s Healthcare Transformation</h2>
        <p>
          Connect with our esteemed mentors, healthcare leaders, doctors, nurses, researchers, and innovators
          on Friday, 11 December 2026 at Urja Auditorium, Patna.
        </p>
        <div className="cta-actions">
          <Link href="/register" className="button-gold">
            Register for the Conclave ↗
          </Link>
          <Link href="/programme" className="button-outline-white">
            Explore Programme Highlights ↗
          </Link>
        </div>
      </section>

      {/* ====================================================================
          INTERACTIVE PROFILE MODAL DIALOG
          ==================================================================== */}
      {selectedMentor && (
        <div
          className="mentor-modal-backdrop"
          onClick={() => setSelectedMentor(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-mentor-name"
        >
          <div
            className="mentor-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="mentor-modal-close"
              onClick={() => setSelectedMentor(null)}
              aria-label="Close profile modal"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="mentor-modal-header">
              <div className="mentor-modal-thumb">
                <Image
                  src={selectedMentor.photoUrl}
                  alt={selectedMentor.name}
                  width={220}
                  height={220}
                />
              </div>
              <div className="mentor-modal-info">
                <span className="mentor-modal-badge">
                  {selectedMentor.badgeIcon} {selectedMentor.role}
                </span>
                <h3 id="modal-mentor-name" className="mentor-modal-name">
                  {selectedMentor.name}
                </h3>
                <p className="mentor-modal-headline">
                  {selectedMentor.headline}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="mentor-modal-body">
              <h4 className="mentor-modal-section-title">Key Credentials &amp; Positions</h4>
              <ul className="mentor-modal-credentials">
                {selectedMentor.credentials.map((cred, idx) => (
                  <li key={idx}>
                    <span className="credential-check">✓</span>
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>

              <h4 className="mentor-modal-section-title">Professional Tribute &amp; Background</h4>
              <div className="mentor-modal-bio-box">
                <p className="mentor-modal-bio-text">
                  &ldquo;{selectedMentor.briefNote}&rdquo;
                </p>
              </div>

              <div className="mentor-modal-footer-cta">
                <button
                  type="button"
                  className="button small"
                  onClick={() => setSelectedMentor(null)}
                >
                  Close Profile
                </button>
                <Link href="/register" className="button small" onClick={() => setSelectedMentor(null)}>
                  Register Now ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
