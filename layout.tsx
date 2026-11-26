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
import { Partners } from '@/components/partners';
import { ConclaveBrand } from '@/components/conclave-brand';
import { competitionRegistrationUrl } from '@/lib/event-links';
export const metadata:Metadata={metadataBase:new URL(process.env.APP_ORIGIN||'http://localhost:3000'),title:{default:'Bihar Healthcare Conclave 2026 | Registration',template:'%s | Bihar Healthcare Conclave 2026'},icons:{icon:'/logos/conclave.png',apple:'/logos/conclave.png'},description:'Join Bihar Healthcare Conclave on Friday, 11 December 2026 at Urja Auditorium, Patna. Registration for healthcare professionals, students and innovators.',openGraph:{title:'Bihar Healthcare Conclave 2026',description:'11 December 2026 · Urja Auditorium, Patna · Registration',images:[{url:'/logos/conclave.png',width:3919,height:3919,alt:'Bihar Healthcare Conclave 2026 · Registration'}]}};
export default async function Layout({children}:{children:React.ReactNode}){const {data:settings}=await getContent('settings');return <html lang="en"><body><a href="#main" className="skip">Skip to content</a><header><Link href="/" className="wordmark"><ConclaveBrand/></Link><nav aria-label="Main navigation"><Link href="/about">About</Link><Link href="/programme">Programme</Link><a href={competitionRegistrationUrl} target="_blank" rel="noopener noreferrer">Quiz & Hackathon ↗</a><Link href="/partners">Partners</Link><Link href="/contact">Contact</Link><Link className="button small" href="/register">Register Here ↗</Link></nav></header><EventInteractions number={settings.whatsApp} message={settings.enquiryMessage}/>{settings.announcementPublished&&settings.announcement&&<div className="announcement dynamic-announcement">{settings.announcement}</div>}<main id="main">{children}</main><SocialLinks/><footer><Link href="/" className="footer-brand"><ConclaveBrand/></Link><div className="footer-top"><div><h2>A healthier Bihar starts<br/>with all of us.</h2><p>Healthy Bihar | Healthier People | A Stronger India</p></div><Link className="button" href="/register">Join the Conclave ↗</Link></div><Partners compact/><div className="footer-bottom"><span>© 2026 QualiNova Solutions Pvt. Ltd.</span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/faq">FAQs</Link><a href="mailto:info@biharhealthcareconclave.com">info@biharhealthcareconclave.com</a></div></footer></body></html>}


