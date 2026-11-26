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
