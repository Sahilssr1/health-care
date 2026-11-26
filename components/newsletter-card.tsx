'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^\S+@\S+\.\S+$/.test(trimmed)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    // Simulate instantaneous, reliable subscription confirmation
    setTimeout(() => {
      setStatus('success');
      setMessage('✓ Thank you for subscribing! You will receive official conclave updates.');
      setEmail('');
    }, 450);
  };

  return (
    <div className="newsletter-floating-card" aria-label="Newsletter Subscription">
      {/* Background ambient lighting gradients */}
      <div className="newsletter-glow-orb-1" aria-hidden="true" />
      <div className="newsletter-glow-orb-2" aria-hidden="true" />

      <div className="newsletter-card-inner">
        {/* Left: 3D-styled Healthcare Graphic with Sparkles */}
        <div className="newsletter-visual-col" aria-hidden="true">
          <div className="newsletter-3d-scene">
            {/* Sparkles / Starlight elements matching reference */}
            <span className="sparkle-star sparkle-1">✦</span>
            <span className="sparkle-star sparkle-2">✧</span>
            <span className="sparkle-star sparkle-3">✦</span>
            <span className="sparkle-star sparkle-4">✧</span>

            {/* 3D Medical Device & Stethoscope SVG Illustration */}
            <svg
              className="newsletter-3d-svg"
              viewBox="0 0 320 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Metallic Tube Gradient (Conclave Silver-Teal) */}
                <linearGradient id="wandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f0fdfa" />
                  <stop offset="40%" stopColor="#99f6e4" />
                  <stop offset="72%" stopColor="#0b8e89" />
                  <stop offset="100%" stopColor="#084c54" />
                </linearGradient>

                {/* 3D Body Gradient (Conclave Clinical Teal & Deep Navy) */}
                <linearGradient id="bodyGrad" x1="15%" y1="10%" x2="90%" y2="90%">
                  <stop offset="0%" stopColor="#f0fdfa" />
                  <stop offset="28%" stopColor="#5eead4" />
                  <stop offset="62%" stopColor="#0b8e89" />
                  <stop offset="86%" stopColor="#0b4f5c" />
                  <stop offset="100%" stopColor="#061b37" />
                </linearGradient>

                {/* Glass Highlight Gradient */}
                <linearGradient id="highlightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.82" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>

                {/* Metallic Chrome Dial */}
                <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="30%" stopColor="#cbd5e1" />
                  <stop offset="70%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>

                {/* Green Pulse Accent (Conclave Emerald) */}
                <linearGradient id="greenPulse" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a7f3d0" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>

                {/* Soft Ground Shadow Filter */}
                <filter id="groundShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="9" />
                </filter>
                <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Ground Shadow */}
              <ellipse cx="170" cy="245" rx="100" ry="20" fill="#031124" fillOpacity="0.5" filter="url(#groundShadow)" />

              {/* Stethoscope Tubing (Wand-like curve echoing the reference vacuum hose) */}
              <path
                d="M 60 40 C 95 15, 155 35, 145 110 C 140 145, 105 165, 115 195 C 122 215, 145 220, 170 215"
                stroke="url(#wandGrad)"
                strokeWidth="11"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 60 40 C 95 15, 155 35, 145 110 C 140 145, 105 165, 115 195 C 122 215, 145 220, 170 215"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.65"
              />

              {/* Metallic Earpiece Head / Probe */}
              <g transform="translate(45, 25)">
                <circle cx="15" cy="15" r="14" fill="url(#chromeGrad)" />
                <circle cx="15" cy="15" r="8" fill="#1e293b" />
                <circle cx="13" cy="13" r="3" fill="#ffffff" opacity="0.8" />
              </g>

              {/* Central 3D Device / Medical Console Body (curved sleek shape) */}
              <g id="mainDeviceBody">
                {/* 3D Body Dome */}
                <path
                  d="M 130 195 C 120 150, 160 115, 215 110 C 265 105, 290 145, 285 195 C 282 225, 255 240, 205 240 C 150 240, 135 225, 130 195 Z"
                  fill="url(#bodyGrad)"
                />
                {/* Glossy Top Reflection */}
                <path
                  d="M 145 180 C 140 145, 175 125, 215 120 C 255 115, 275 135, 270 170 C 240 135, 180 145, 145 180 Z"
                  fill="url(#highlightGrad)"
                />

                {/* Front Control Screen / Heartbeat Display */}
                <rect x="175" y="145" width="70" height="42" rx="10" fill="#061b37" stroke="#5eead4" strokeWidth="2" />
                {/* ECG Heartbeat Line */}
                <path
                  d="M 180 166 L 195 166 L 200 154 L 205 178 L 210 160 L 214 166 L 240 166"
                  stroke="url(#greenPulse)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="205" cy="178" r="2.5" fill="#eeb84f" filter="url(#glowFilter)" />

                {/* Wheels / Metallic Pivot Base */}
                <g id="deviceWheel">
                  <ellipse cx="145" cy="225" rx="16" ry="24" fill="#061b37" stroke="#334155" strokeWidth="3" />
                  <ellipse cx="145" cy="225" rx="8" ry="12" fill="url(#chromeGrad)" />
                  <circle cx="145" cy="225" r="3" fill="#ffffff" />
                </g>
                <g id="deviceWheelRight">
                  <ellipse cx="265" cy="225" rx="16" ry="24" fill="#061b37" stroke="#334155" strokeWidth="3" />
                  <ellipse cx="265" cy="225" rx="8" ry="12" fill="url(#chromeGrad)" />
                  <circle cx="265" cy="225" r="3" fill="#ffffff" />
                </g>

                {/* Medical Cross Emblem */}
                <g transform="translate(202, 198)">
                  <circle cx="8" cy="8" r="14" fill="#ffffff" opacity="0.96" />
                  <path d="M 6 1 V 15 M 1 8 H 15" stroke="#13735a" strokeWidth="4" strokeLinecap="round" />
                </g>
              </g>

              {/* Floating Pill / Capsule in space with Conclave Green & Gold */}
              <g className="floating-capsule-anim" transform="translate(70, 115) rotate(-28)">
                <ellipse cx="30" cy="12" rx="28" ry="12" fill="#13735a" />
                <path d="M 16 12 C 16 5.5, 30 5.5, 30 12 C 30 18.5, 16 18.5, 16 12 Z" fill="#eeb84f" opacity="0.95" />
                <ellipse cx="25" cy="8" rx="15" ry="3" fill="#ffffff" opacity="0.55" />
              </g>
            </svg>
          </div>
        </div>

        {/* Right: Newsletter Content & Form matching reference */}
        <div className="newsletter-content-col">
          <h3 className="newsletter-heading">
            Subscribe to our newsletter to get updates to the latest conclave sessions
          </h3>
          <p className="newsletter-subheading">
            Join over 5,000+ medical professionals, students, and healthcare innovators. Receive keynote releases, CME/CNE workshops, and healthcare insights.
          </p>

          <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
            <div className="newsletter-input-wrapper">
              <span className="newsletter-mail-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="3" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                disabled={status === 'loading'}
                aria-label="Email address for conclave newsletter"
                required
              />
              <button
                type="submit"
                className="newsletter-submit-btn"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className="newsletter-btn-loading">
                    <span className="spinner-dot" /> Subscribing…
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>

            {/* Status Messages */}
            {status === 'error' && (
              <p className="newsletter-feedback error-feedback" role="alert">
                {message}
              </p>
            )}
            {status === 'success' && (
              <p className="newsletter-feedback success-feedback" role="status">
                {message}
              </p>
            )}

            <p className="newsletter-disclaimer">
              You will be able to unsubscribe at any time. Read our privacy policy{' '}
              <Link href="/privacy" className="newsletter-privacy-link">
                here
              </Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
