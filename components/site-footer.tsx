import React from 'react';
import Link from 'next/link';
import { ConclaveBrand } from '@/components/conclave-brand';
import { NewsletterCard } from '@/components/newsletter-card';
import { competitionRegistrationUrl } from '@/lib/event-links';
import { officialContact, whatsAppLink } from '@/lib/enhancement-data';

interface SiteFooterProps {
  whatsApp?: string;
  enquiryMessage?: string;
}

export function SiteFooter({
  whatsApp = officialContact.whatsApp,
  enquiryMessage = 'Hello, I would like to know more about Bihar Healthcare Conclave 2026.',
}: SiteFooterProps) {
  const waUrl = whatsAppLink(whatsApp, enquiryMessage);

  return (
    <footer className="modern-footer-root" role="contentinfo">
      {/* 1. Top Section: Floating Newsletter Card inspired by reference */}
      <div className="modern-footer-newsletter-wrap">
        <NewsletterCard />
      </div>

      {/* 2. Main Footer Body: Multi-column modern layout */}
      <div className="modern-footer-main">
        <div className="modern-footer-container">
          <div className="modern-footer-grid">
            {/* Column 1: Brand & About & Socials */}
            <div className="footer-col footer-col-brand">
              <Link href="/" className="footer-brand-link" aria-label="Bihar Healthcare Conclave 2026 Home">
                <ConclaveBrand className="footer-conclave-logo" />
              </Link>
              <p className="footer-brand-desc">
                Bihar Healthcare Conclave 2026 connects healthcare leaders, medical professionals, researchers, students, and innovators to build a quality-driven, tech-enabled healthcare ecosystem.
              </p>

              {/* Social Media Links Row with SVG icons */}
              <div className="footer-social-row" aria-label="Official Social Media Handles">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/1UJw4jqN7t/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn social-fb"
                  aria-label="Bihar Healthcare Conclave on Facebook"
                  title="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://x.com/BiharHCC26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn social-x"
                  aria-label="Bihar Healthcare Conclave on X"
                  title="X (Twitter)"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/biharhealthcareconclave/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn social-ig"
                  aria-label="Bihar Healthcare Conclave on Instagram"
                  title="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/qualinova/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn social-in"
                  aria-label="QualiNova Solutions on LinkedIn"
                  title="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn social-wa"
                  aria-label="Chat with Organisers on WhatsApp"
                  title="WhatsApp Enquiry"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.301-.15-1.782-.88-2.058-.98-.277-.1-.478-.15-.68.15-.201.301-.78 1.01-.956 1.22-.176.2-.351.23-.652.08-.301-.15-1.27-.47-2.42-1.49-.894-.8-1.5-1.78-1.68-2.08-.175-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.24-.24-.58-.49-.5-.68-.51-.18-.01-.38-.01-.58-.01-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35zM12 2a10 10 0 0 0-8.6 15.1L2 22l5.06-1.33A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.02-.2-.31A8.2 8.2 0 1 1 12 20.2z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links / Conclave */}
            <div className="footer-col">
              <h4 className="footer-col-title">Conclave</h4>
              <ul className="footer-nav-list">
                <li>
                  <Link href="/about" className="footer-nav-link">About Conclave</Link>
                </li>
                <li>
                  <Link href="/programme" className="footer-nav-link">Programme Schedule</Link>
                </li>
                <li>
                  <Link href="/partners" className="footer-nav-link">Official Partners</Link>
                </li>
                <li>
                  <a
                    href={competitionRegistrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-nav-link"
                  >
                    Quiz & Hackathon ↗
                  </a>
                </li>
                <li>
                  <Link href="/register" className="footer-nav-link highlight-link">
                    Register Delegate Pass ↗
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Workshops & Tracks */}
            <div className="footer-col">
              <h4 className="footer-col-title">Workshops</h4>
              <ul className="footer-nav-list">
                <li>
                  <Link href="/register" className="footer-nav-link">CME Workshop (Doctors)</Link>
                </li>
                <li>
                  <Link href="/register" className="footer-nav-link">CNE Workshop (Nursing)</Link>
                </li>
                <li>
                  <Link href="/register" className="footer-nav-link">Paramedical Workshop</Link>
                </li>
                <li>
                  <Link href="/register" className="footer-nav-link">Pharmacy Workshop</Link>
                </li>
                <li>
                  <Link href="/register" className="footer-nav-link">Student Project Expo</Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Support & Compliance */}
            <div className="footer-col">
              <h4 className="footer-col-title">Support</h4>
              <ul className="footer-nav-list">
                <li>
                  <Link href="/faq" className="footer-nav-link">Help Center & FAQs</Link>
                </li>
                <li>
                  <Link href="/refund" className="footer-nav-link">Cancellation & Refund</Link>
                </li>
                <li>
                  <Link href="/terms" className="footer-nav-link">Registration Terms</Link>
                </li>
                <li>
                  <Link href="/privacy" className="footer-nav-link">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/contact" className="footer-nav-link">Contact Organiser</Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Contact Us */}
            <div className="footer-col footer-col-contact">
              <h4 className="footer-col-title">Contact Us</h4>
              <ul className="footer-contact-list">
                <li>
                  <a href="tel:+919955521842" className="footer-contact-item">
                    <span className="footer-contact-icon" aria-hidden="true">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </span>
                    <span>(91) 9955 521842</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+919911350649" className="footer-contact-item">
                    <span className="footer-contact-icon" aria-hidden="true">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </span>
                    <span>(91) 9911 350649</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@biharhealthcareconclave.com" className="footer-contact-item">
                    <span className="footer-contact-icon" aria-hidden="true">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="3"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    </span>
                    <span>info@biharhealthcareconclave.com</span>
                  </a>
                </li>
                <li className="footer-venue-meta">
                  <span className="footer-contact-icon" aria-hidden="true">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <span>Urja Auditorium, Patna, Bihar · 11 Dec 2026</span>
                </li>
              </ul>

              {/* Direct WhatsApp Action Pill */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-wa-action-pill"
              >
                <span className="wa-pulse-dot" />
                <span>Chat on WhatsApp ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Sub-Footer Bottom Bar */}
      <div className="modern-footer-bottom">
        <div className="modern-footer-container footer-bottom-flex">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Bihar Healthcare Conclave. Organised by{' '}
            <strong className="footer-org-name">QualiNova Solutions Pvt. Ltd.</strong> All rights reserved.
          </div>
          <nav className="footer-legal-links" aria-label="Legal and Compliance">
            <Link href="/privacy" className="footer-legal-link">Privacy Policy</Link>
            <span className="footer-divider-dot" aria-hidden="true">•</span>
            <Link href="/terms" className="footer-legal-link">Terms of Use</Link>
            <span className="footer-divider-dot" aria-hidden="true">•</span>
            <Link href="/refund" className="footer-legal-link">Cancellation & Refund</Link>
            <span className="footer-divider-dot" aria-hidden="true">•</span>
            <Link href="/faq" className="footer-legal-link">Help & FAQs</Link>
            <span className="footer-divider-dot" aria-hidden="true">•</span>
            <Link href="/contact" className="footer-legal-link">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
