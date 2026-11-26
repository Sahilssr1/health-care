import { getContent } from '@/lib/managed-content';
import { EventInteractions } from '@/components/event-interactions';
import { SocialLinks } from '@/components/social-links';

export const dynamic='force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import './conclave-theme.css';
import './enhancements.css';
import './premium.css';
import './hero-reset.css';
import './photo-crop.css';
import './hero-final.css';
import './hd-programmes.css';
import './experience-polish.css';
import { ConclaveBrand } from '@/components/conclave-brand';
import { competitionRegistrationUrl } from '@/lib/event-links';
import { ScrollReveal } from '@/components/scroll-reveal';
import { PageSurface } from '@/components/page-surface';
import './launch-ready.css';
import './candidate-redesign.css';
import './about-repair.css';
import './about-experience.css';
import './about-hero-crop.css';
import './workshop-selection.css';
import './programme-carousel.css';
import './footer-modern.css';
import './partners-modern.css';
import './register-modern.css';
import './confirmation-print.css';
import './mentors-modern.css';
import './contact-modern.css';
import { SiteFooter } from '@/components/site-footer';
export const metadata:Metadata={metadataBase:new URL(process.env.APP_ORIGIN||'http://localhost:3000'),title:{default:'Bihar Healthcare Conclave 2026 | Registration',template:'%s | Bihar Healthcare Conclave 2026'},icons:{icon:'/logos/conclave.png',apple:'/logos/conclave.png'},description:'Join Bihar Healthcare Conclave on Friday, 11 December 2026 at Urja Auditorium, Patna. Registration for healthcare professionals, students and innovators.',openGraph:{title:'Bihar Healthcare Conclave 2026',description:'11 December 2026 · Urja Auditorium, Patna · Registration',images:[{url:'/logos/conclave.png',width:3919,height:3919,alt:'Bihar Healthcare Conclave 2026 · Registration'}]}};
export default async function Layout({children}:{children:React.ReactNode}){const {data:settings}=await getContent('settings');return <html lang="en"><body><script src="https://checkout.razorpay.com/v1/checkout.js" async></script><PageSurface/><ScrollReveal/><a href="#main" className="skip">Skip to content</a><header className="site-header"><Link href="/" className="wordmark"><ConclaveBrand/></Link><nav aria-label="Main navigation"><Link href="/about">About</Link><Link href="/chief-mentors">Chief Mentors &amp; Patrons</Link><Link href="/programme">Programme</Link><a href={competitionRegistrationUrl} target="_blank" rel="noopener noreferrer">Registration for Quiz and Hackathon ↗</a><Link href="/partners">Partners</Link><Link href="/contact">Contact</Link><Link className="button small" href="/register">Register Here ↗</Link></nav><EventInteractions number={settings.whatsApp} message={settings.enquiryMessage}/></header>{settings.announcementPublished&&settings.announcement&&<div className="announcement dynamic-announcement">{settings.announcement}</div>}<main id="main">{children}</main><SocialLinks/><SiteFooter whatsApp={settings.whatsApp} enquiryMessage={settings.enquiryMessage}/></body></html>}


