import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { MentorsExperience } from '@/components/mentors-experience';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = pageMetadata(
  'Chief Mentors & Patrons | Bihar Healthcare Conclave 2026',
  'Meet the distinguished Chief Mentors & Patrons of Bihar Healthcare Conclave 2026: Padma Shri Dr. C. P. Thakur, Dr. Sahajanand Prasad Singh, and Sister Usha Saldanha.',
  '/chief-mentors'
);

export default function ChiefMentorsPage() {
  return <MentorsExperience />;
}
