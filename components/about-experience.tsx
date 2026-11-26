import Image from 'next/image';
import Link from 'next/link';
import { ThemeIcon } from '@/components/theme-icon';
import { competitionRegistrationUrl } from '@/lib/event-links';

const focusAreas = [
  ['quality', 'Healthcare Quality & Patient Safety', 'Strengthening dependable care through quality standards, safety awareness and continuous improvement.'],
  ['technology', 'Digital Health & Emerging Technologies', 'Exploring practical digital health, AI and technology-enabled healthcare solutions.'],
  ['skills', 'Healthcare Education & Skill Development', 'Supporting learning, clinical confidence and professional development across healthcare.'],
  ['innovation', 'Innovation, Research & Entrepreneurship', 'Creating space for ideas, research and responsible innovation that can improve care.'],
  ['people', 'Institutional Collaboration & Partnerships', 'Bringing institutions and leaders together for meaningful, lasting collaboration.'],
  ['excellence', 'Recognition & Professional Excellence', 'Celebrating commitment, leadership and excellence across the healthcare ecosystem.'],
] as const;

const audiences = [
  ['Healthcare Professionals', 'Doctors, nurses, administrators and allied healthcare professionals.', '/images/programmes/programme-01-hd.png'],
  ['Students & Academic Institutions', 'Medical, nursing, paramedical, engineering and academic communities.', '/images/programmes/programme-05-hd.png'],
  ['Hospitals & Healthcare Organisations', 'Healthcare providers, quality teams and institutional leaders.', '/images/programmes/programme-06-hd.png'],
  ['Healthcare Technology Companies', 'HealthTech, LabTech, digital health and solution innovators.', '/images/programmes/programme-08-hd.png'],
  ['Industry & Business Leaders', 'Industry partners committed to stronger healthcare delivery.', '/images/programmes/programme-14-hd.png'],
  ['Policymakers & Institutional Representatives', 'Public-health stakeholders, representatives and change makers.', '/images/programmes/programme-15-hd.png'],
] as const;

const highlights = [
  ['Expert Discussions', 'Programme', '/programme', 'people'],
  ['Healthcare Excellence Workshops', 'Programme', '/programme#nursing-quality-workshop', 'quality'],
  ['Student Competitions', 'Competitions', competitionRegistrationUrl, 'skills'],
  ['Healthcare AI Hackathon', 'Competitions', competitionRegistrationUrl, 'technology'],
  ['Awards & Recognition', 'Programme', '/awards', 'excellence'],
  ['Industry Networking & Collaboration', 'Programme', '/programme#group-lunch-networking', 'innovation'],
] as const;

function AboutImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return <div className={className ? `about-image ${className}` : 'about-image'}><Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>;
}

export function AboutExperience() {
  return <>
    <section className="about-hero-v2">
      <div className="about-hero-copy"><p className="about-kicker">ABOUT BIHAR HEALTHCARE CONCLAVE 2026</p><h1>Advancing Healthcare.<br/><em>Inspiring Innovation.</em><br/>Building a Healthier Bihar.</h1><p>Bihar Healthcare Conclave 2026 is a collaborative platform bringing together healthcare professionals, policymakers, institutions, educators, innovators and industry leaders to advance healthcare quality, innovation, accessibility and excellence.</p><div className="about-hero-event"><span><ThemeIcon kind="calendar"/></span><div><small>11 DECEMBER 2026</small><strong>Urja Auditorium, Patna, Bihar</strong></div></div><div className="about-hero-actions"><Link href="/register" className="button">Register for the Conclave <span>↗</span></Link><Link href="/programme" className="about-outline">Explore the Programme <span>↗</span></Link></div></div>
      <AboutImage className="about-hero-image" src="/images/programmes/programme-11-hd.png" alt="Healthcare leader addressing a professional conference" />
    </section>

    <section className="about-editorial section"><AboutImage className="about-editorial-image" src="/images/about/healthcare-collaboration.png" alt="Healthcare team collaborating on quality improvement"/><div className="about-editorial-copy"><p className="eyebrow">THE CONCLAVE</p><h2>A Shared Platform for Healthcare Excellence</h2><p>Bihar Healthcare Conclave 2026 is envisioned as a platform for meaningful dialogue, professional collaboration and forward-looking healthcare solutions.</p><p>The conclave brings together stakeholders from healthcare delivery, education, technology, quality management, research and industry to exchange knowledge, explore emerging opportunities and strengthen the healthcare ecosystem.</p><p>Through focused discussions, workshops, competitions, recognition initiatives and collaborative engagement, the event seeks to encourage innovation, promote quality standards and support a more resilient, accessible and future-ready healthcare landscape.</p></div></section>

    <section className="about-principles"><div className="about-principle about-vision"><AboutImage src="/images/programmes/programme-04-hd.png" alt="Healthcare professional leading a quality standards workshop"/><div><p className="eyebrow">OUR VISION</p><h2>A Healthier Bihar Through Quality, Innovation and Collaboration</h2><p>To encourage a healthcare ecosystem where quality services, responsible innovation, professional excellence and meaningful collaboration contribute to better health outcomes.</p></div></div><div className="about-principle about-mission"><AboutImage src="/images/programmes/programme-10-hd.png" alt="Healthcare students collaborating in a learning session"/><div><p className="eyebrow">OUR MISSION</p><h2>Connecting Ideas, Institutions and Healthcare Leaders</h2><p>To facilitate knowledge exchange, strengthen institutional partnerships, encourage healthcare innovation and create opportunities for professional learning and recognition.</p></div></div></section>

    <section className="about-focus section"><div className="about-section-intro"><p className="eyebrow">KEY FOCUS AREAS</p><h2>What moves the conversation forward.</h2><p>Six connected areas that guide a quality-driven, technology-enabled healthcare future.</p></div><div className="about-focus-grid">{focusAreas.map(([icon, title, copy], index) => <article className="about-focus-card" key={title}><span className="about-focus-number">0{index + 1}</span><span className="about-focus-icon"><ThemeIcon kind={icon}/></span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="about-audience-v2"><div className="about-audience-heading"><p className="eyebrow">WHO SHOULD PARTICIPATE?</p><h2>Every perspective<br/>has a role to play.</h2><p>One meeting place for the people and institutions shaping healthcare across Bihar and beyond.</p><Link href="/participate" className="about-outline">Explore participation <span>↗</span></Link></div><div className="about-audience-grid">{audiences.map(([title, copy, image]) => <article key={title}><AboutImage src={image} alt={title}/><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>

    <section className="about-highlights section"><div className="about-section-intro"><p className="eyebrow">EVENT HIGHLIGHTS</p><h2>A day designed for exchange, discovery and impact.</h2></div><div className="about-highlight-grid">{highlights.map(([title, label, href, icon]) => <Link key={title} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="about-highlight-card"><span><ThemeIcon kind={icon}/></span><small>{label}</small><h3>{title}</h3><b>Explore <i>↗</i></b></Link>)}</div></section>

    <section className="about-event-info"><div><p className="eyebrow">EVENT INFORMATION</p><h2>Bihar Healthcare Conclave 2026</h2></div><dl><div><dt>Date</dt><dd>Friday, 11 December 2026</dd></div><div><dt>Venue</dt><dd>Urja Auditorium, Patna, Bihar</dd></div><div><dt>Organised by</dt><dd>QualiNova Solutions Pvt. Ltd.</dd></div></dl></section>

    <section className="about-final-cta"><p className="eyebrow">JOIN THE CONVERSATION</p><h2>Be Part of Bihar&apos;s Healthcare Transformation</h2><p>Join healthcare professionals, institutions, innovators and industry leaders for a day of ideas, collaboration and opportunities.</p><div><Link href="/register" className="button">Register Now <span>↗</span></Link><Link href="/programme" className="about-outline">Explore Programme <span>↗</span></Link></div></section>
  </>;
}
