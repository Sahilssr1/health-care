'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface ConfirmationData {
  reference: string;
  emailQueued: boolean;
  amountPaid?: number;
  paymentId?: string;
  workshop?: string;
  category?: string;
  fullName?: string;
  email?: string;
  mobile?: string;
  institution?: string;
  participantType?: string;
  interest?: string;
  specialisation?: string;
}

export default function ConfirmationPage() {
  const [data, setData] = useState<ConfirmationData | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('bhc_confirmation');
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        // Fallback preview data so testing/direct visits immediately show the official pass
        setData({
          reference: 'BHC2026-NOV-0001',
          fullName: 'Dr. Sahil Singh Rajput',
          institution: 'Patna Medical College & Hospital (PMCH)',
          category: 'Hospital Management',
          participantType: 'STUDENT',
          mobile: '+91 99113 50649',
          email: 'sahilsinghrajput760@gmail.com',
          workshop: 'Creative Poster Presentation',
          emailQueued: true,
        });
        setIsPreview(true);
      }
    } catch (e) {
      console.error('Could not parse confirmation payload', e);
      setIsPreview(true);
    } finally {
      setLoaded(true);
    }
  }, []);

  if (!loaded || !data) {
    return (
      <div className="confirmation-screen-wrapper">
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#475569' }}>
          <p>Loading your registration confirmation...</p>
        </div>
      </div>
    );
  }

  const isPaid = typeof data.amountPaid === 'number' && data.amountPaid > 0;
  const participantName = data.fullName || 'Registered Participant';
  const participantInst = data.institution || 'Healthcare Institution, Bihar';
  const participantCat = data.category || data.participantType || 'Delegate';
  const participantMobile = data.mobile || 'Provided upon registration';

  return (
    <div className="confirmation-screen-wrapper">
      {/* On-Screen Action Bar (Hidden automatically when printing) */}
      <div className="confirmation-action-bar print-hide">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span className="confirmation-status-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {isPreview ? 'Pass Preview (1-Page A4 Print Ready)' : isPaid ? `Payment Received (₹${data.amountPaid?.toLocaleString('en-IN')})` : 'Registration Confirmed'}
          </span>
          <span style={{ fontSize: '13px', color: '#475569' }}>
            {isPreview
              ? 'Preview mode with sample data. To register yourself, click "Register Now".'
              : data.emailQueued
                ? 'Digital pass PDF queued to your email.'
                : 'Please print or save this official pass for entry.'}
          </span>
        </div>

        <div className="confirmation-actions-group">
          <button
            type="button"
            className="btn-print-pass"
            onClick={() => window.print()}
            aria-label="Print official digital pass"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Print confirmation
          </button>
          {isPreview && (
            <Link href="/register" className="btn-print-pass" style={{ background: '#059669', textDecoration: 'none' }}>
              Register Now →
            </Link>
          )}
          <Link href="/" className="btn-home-link">
            Return to Homepage
          </Link>
        </div>
      </div>

      {/* The Official Digital Registration Pass (Exact Match to Official PDF) */}
      <div className="official-digital-pass" id="official-digital-pass">

        {/* Top Accent Strip */}
        <div className="pass-top-accent" />

        <div className="pass-inner-body">
          {/* Header Row: Conclave Logo on Left, Date Lockup on Right */}
          <div className="pass-header-row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/conclave.png"
              alt="Bihar Healthcare Conclave 2026"
              className="pass-conclave-logo-img"
            />
            <div className="pass-header-date-badge">
              <div className="pass-date-badge-day">11 DEC</div>
              <div className="pass-date-badge-year">2026</div>
            </div>
          </div>

          {/* Title Banner */}
          <div className="pass-title-banner">
            <h2 className="pass-title-banner-text">DIGITAL REGISTRATION PASS</h2>
          </div>

          {/* Event Date & Venue Box */}
          <div className="pass-box-date-venue">
            <div className="pass-label-small">FRIDAY, 11 DECEMBER 2026</div>
            <div className="pass-value-venue">Urja Auditorium, Patna, Bihar</div>
          </div>

          {/* Registered Participant Box */}
          <div className="pass-box-participant">
            <div className="pass-label-small">REGISTERED PARTICIPANT</div>
            <div className="pass-value-participant">{participantName}</div>
          </div>

          {/* Registration Reference Box */}
          <div className="pass-box-reference">
            <div className="pass-label-small">REGISTRATION REFERENCE</div>
            <div className="pass-value-reference">{data.reference}</div>
          </div>

          {/* Company / Organisation / Institution Box */}
          <div className="pass-box-institution">
            <div className="pass-label-small">COMPANY / ORGANISATION / INSTITUTION</div>
            <div className="pass-value-institution">{participantInst}</div>
          </div>

          {/* Mobile Number & Participant Category Row Split */}
          <div className="pass-row-split">
            <div className="pass-box-half">
              <div className="pass-label-small">MOBILE NUMBER</div>
              <div className="pass-value-split">{participantMobile}</div>
            </div>
            <div className="pass-box-half pass-box-half-large">
              <div className="pass-label-small">PARTICIPANT CATEGORY</div>
              <div className="pass-value-split">
                {participantCat}
                {data.workshop && !data.workshop.toLowerCase().includes('conclave')
                  ? ` · ${data.workshop}`
                  : ''}
              </div>
            </div>
          </div>

          {/* Important Instructions Box */}
          <div className="pass-box-instructions">
            <div className="pass-instructions-title">IMPORTANT INSTRUCTIONS</div>
            <p className="pass-instructions-text">
              Please carry a printed copy of this registration confirmation along with a valid government-issued photo ID. Present it at the registration desk for verification and entry.
            </p>
          </div>

          {/* Official Organisers & Partners Grid: 9 Partners in 3x3 Layout */}
          <div className="pass-partners-grid-9">
            {/* Row 1 */}
            <div className="pass-partner-item">
              <div className="pass-partner-label">ORGANISED BY</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/qualinova.jpg"
                alt="QualiNova Solutions"
                className="pass-partner-logo-img"
              />
              <div className="pass-partner-name">QualiNova Solutions</div>
            </div>

            <div className="pass-partner-item">
              <div className="pass-partner-label">ORGANISING PARTNER</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/ima-bihar.jpg"
                alt="IMA Bihar"
                className="pass-partner-logo-img"
              />
              <div className="pass-partner-name">IMA Bihar</div>
            </div>

            <div className="pass-partner-item">
              <div className="pass-partner-label">ORGANISING PARTNER</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/tnai-bihar-state-branch.jpg"
                alt="TNAI Bihar State Branch"
                className="pass-partner-logo-img"
              />
              <div className="pass-partner-name">TNAI Bihar State Branch</div>
            </div>

            {/* Row 2 */}
            <div className="pass-partner-item">
              <div className="pass-partner-label">INNOVATION PARTNER</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/AICBV.png"
                alt="AIC-Bihar Vidyapith"
                className="pass-partner-logo-img"
              />
              <div className="pass-partner-name">AIC-Bihar Vidyapith</div>
            </div>

            <div className="pass-partner-item">
              <div className="pass-partner-label">SOCIAL RESPONSIBILITY</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/dr-cp-thakur.png"
                alt="Dr. C.P. Thakur Foundation"
                className="pass-partner-logo-img"
              />
              <div className="pass-partner-name">Dr. C.P. Thakur Foundation</div>
            </div>

            <div className="pass-partner-item">
              <div className="pass-partner-label">INNOVATION PARTNER</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/startly-innovations.png"
                alt="Startly Innovations"
                className="pass-partner-logo-img"
              />
              <div className="pass-partner-name">Startly Innovations</div>
            </div>

            {/* Row 3 */}
            <div className="pass-partner-item">
              <div className="pass-partner-label">BRANDING &amp; MARKETING</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/spark.png"
                alt="Spark Fusion"
                className="pass-partner-logo-img"
              />
              <div className="pass-partner-name">Spark Fusion</div>
            </div>

            <div className="pass-partner-item">
              <div className="pass-partner-label">HOSPITALITY PARTNER</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/novastay.png"
                alt="NovaStay"
                className="pass-partner-logo-img"
              />
              <div className="pass-partner-name">NovaStay</div>
            </div>

            <div className="pass-partner-item">
              <div className="pass-partner-label">TECHNOLOGY PARTNER</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/sutravya-logo.png"
                alt="SUTRAVYA"
                className="pass-partner-logo-img"
              />
              <div className="pass-partner-name">SUTRAVYA</div>
            </div>
          </div>
        </div>

        {/* Deep Blue Footer */}
        <div className="pass-bottom-footer">
          <div className="pass-footer-site">biharhealthcareconclave.com</div>
          <div className="pass-footer-disclaimer">
            Registration acknowledgement. Separate programme eligibility applies.
          </div>
        </div>

      </div>
    </div>
  );
}
