'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ConclaveBrand } from '@/components/conclave-brand';
import { competitionRegistrationUrl } from '@/lib/event-links';
import { officialContact, whatsAppLink } from '@/lib/enhancement-data';

interface SiteNavbarProps {
  whatsApp?: string;
  enquiryMessage?: string;
}

export function SiteNavbar({
  whatsApp = officialContact.whatsApp,
  enquiryMessage = 'Hello, I would like to know more about Bihar Healthcare Conclave 2026.',
}: SiteNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when sidebar drawer is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [sidebarOpen]);

  const waUrl = whatsAppLink(whatsApp, enquiryMessage);

  return (
    <>
      <header className={`site-header-navbar ${isScrolled ? 'is-scrolled' : 'is-at-top'}`}>
        <div className="navbar-inner-container">
          {/* Left: Brand Logo (Transparent, natural crop, no rectangle box) */}
          <Link
            href="/"
            className="navbar-brand-wrapper"
            aria-label="Bihar Healthcare Conclave 2026 Home"
            onClick={() => setSidebarOpen(false)}
          >
            <ConclaveBrand className="navbar-brand-logo" />
          </Link>

          {/* Center: Horizontal Navigation Links (Desktop view) */}
          <nav className="navbar-desktop-nav" aria-label="Main Navigation">
            <Link href="/about" className="nav-desktop-item">
              About
            </Link>
            <Link href="/programme" className="nav-desktop-item">
              Programme
            </Link>
            <a
              href={competitionRegistrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-desktop-item highlight-nav-item"
              title="Registration for Quiz and Hackathon (Opens in new tab)"
            >
              Registration for Quiz and Hackathon <span className="nav-ext-arrow" aria-hidden="true">↗</span>
            </a>
            <Link href="/participate" className="nav-desktop-item">
              Who should attend
            </Link>
            <Link href="/partners" className="nav-desktop-item">
              Partners
            </Link>
            <Link href="/contact" className="nav-desktop-item">
              Contact
            </Link>
          </nav>

          {/* Right Section: Pill Register CTA (Desktop) & Hamburger Toggle (Mobile) */}
          <div className="navbar-right-controls">
            {/* Desktop Pill CTA Button */}
            <Link href="/register" className="navbar-desktop-cta-btn">
              <span>Register Here</span>
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              className={`navbar-hamburger-btn ${sidebarOpen ? 'is-active' : ''}`}
              aria-expanded={sidebarOpen}
              aria-label={sidebarOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="hamburger-bars" aria-hidden="true">
                <span className="hbar bar-1" />
                <span className="hbar bar-2" />
                <span className="hbar bar-3" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Clean Animated Mobile Sidebar Drawer (Rendered as Top-Level Sibling to Header) */}
      <div
        className={`navbar-sidebar-overlay ${sidebarOpen ? 'sidebar-open' : ''}`}
        aria-hidden={!sidebarOpen}
      >
        {/* Backdrop overlay */}
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />

        {/* Sidebar panel sliding from right */}
        <aside className="navbar-sidebar-panel" aria-label="Mobile Navigation Sidebar">
          {/* Sidebar Header: Logo & Close Button */}
          <div className="sidebar-header">
            <Link
              href="/"
              className="sidebar-logo-link"
              onClick={() => setSidebarOpen(false)}
              aria-label="Conclave Home"
            >
              <ConclaveBrand className="sidebar-logo" />
            </Link>
            <button
              type="button"
              className="sidebar-close-btn"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation sidebar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Sidebar Nav Links (Exactly matching Image 2 list) */}
          <nav className="sidebar-nav-links" aria-label="Mobile Navigation Links">
            <Link
              href="/about"
              className="sidebar-link"
              onClick={() => setSidebarOpen(false)}
            >
              <span>About</span>
            </Link>

            <Link
              href="/programme"
              className="sidebar-link"
              onClick={() => setSidebarOpen(false)}
            >
              <span>Programme</span>
            </Link>

            <a
              href={competitionRegistrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-link"
              onClick={() => setSidebarOpen(false)}
            >
              <span>Registration for Quiz and Hackathon <span className="ext-icon" aria-hidden="true">↗</span></span>
            </a>

            <Link
              href="/participate"
              className="sidebar-link"
              onClick={() => setSidebarOpen(false)}
            >
              <span>Who should attend</span>
            </Link>

            <Link
              href="/partners"
              className="sidebar-link"
              onClick={() => setSidebarOpen(false)}
            >
              <span>Official partners</span>
            </Link>

            <Link
              href="/partnerships"
              className="sidebar-link"
              onClick={() => setSidebarOpen(false)}
            >
              <span>Partnership opportunities</span>
            </Link>

            <Link
              href="/contact"
              className="sidebar-link"
              onClick={() => setSidebarOpen(false)}
            >
              <span>Contact</span>
            </Link>
          </nav>

          {/* Bottom Green Pill Button matching Image 2 Reference */}
          <div className="sidebar-footer-cta-wrap">
            <Link
              href="/register"
              className="sidebar-green-pill-btn"
              onClick={() => setSidebarOpen(false)}
            >
              Register Here
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-whatsapp-link"
              onClick={() => setSidebarOpen(false)}
            >
              <span>WhatsApp Enquiry</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
