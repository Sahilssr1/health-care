export interface DetailedPartner {
  id: string;
  name: string;
  shortName: string;
  category: string;
  badge: string;
  role: string;
  group: 'organiser-official' | 'strategic';
  logo: string;
  url: string;
  achievement: string;
  description: string;
  contributions: string[];
  themeColor: {
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    accent: string;
    softBg: string;
  };
}

export const DETAILED_PARTNERS: DetailedPartner[] = [
  // 1. Organiser
  {
    id: 'qualinova',
    name: 'QualiNova Solutions Pvt. Ltd.',
    shortName: 'QualiNova Solutions',
    category: 'ORGANISER',
    badge: 'Organiser',
    role: 'Organiser & Project Management Unit (PMU)',
    group: 'organiser-official',
    logo: '/logos/qualinova.jpg',
    url: 'https://qualinovahub.com',
    achievement: 'Recognised as "Best Startup of the Year" at Bihar Education Conclave & Startup Summit 2026',
    description:
      'Recognised as the "Best Startup of the Year" at the Bihar Education Conclave & Startup Summit 2026, QualiNova Solutions Pvt. Ltd. is Guided by its core pillars of Quality, Innovation, and Transformation and a mission toward sustainable development, QualiNova Solutions Pvt. Ltd. is a leading new-age consulting and end-to-end Project Management Unit (PMU) for Higher Education, Nursing & Allied Healthcare Sciences, and Medical Education. Supporting institutions from initial vision and feasibility to regulatory compliance, accreditation readiness, Total Quality Management (TQM), AI-enabled digital/HIMS integration, and UN SDG-aligned green practices, QualiNova works with the goal of building future-ready healthcare and educational institutions that deliver lasting societal impact.',
    contributions: [
      'Leading new-age consulting and end-to-end PMU for Higher Education, Nursing & Allied Healthcare Sciences, and Medical Education',
      'Supports institutions from initial vision and feasibility to regulatory compliance and accreditation readiness',
      'Drives Total Quality Management (TQM), AI-enabled digital/HIMS integration, and UN SDG-aligned green practices',
      'Guided by core pillars of Quality, Innovation, and Transformation toward sustainable development',
    ],
    themeColor: {
      badgeBg: '#ecfdf5',
      badgeText: '#047857',
      badgeBorder: '#a7f3d0',
      accent: '#059669',
      softBg: 'linear-gradient(145deg, #f0fdf4 0%, #ffffff 100%)',
    },
  },

  // 2. Organising Partner - IMA Bihar
  {
    id: 'ima-bihar',
    name: 'IMA Bihar (Indian Medical Association, Bihar)',
    shortName: 'IMA Bihar',
    category: 'ORGANISING PARTNER',
    badge: 'Organising Partner',
    role: 'Organising Partner',
    group: 'organiser-official',
    logo: '/logos/ima-bihar.jpg',
    url: 'https://imabihar.org',
    achievement: 'Originating 1st August 1939 · Apex Representative Body in Bihar · Patna State HQ',
    description:
      'Originating on 1st August 1939 as the Bihar Provincial branch of the Indian Medical Association with its headquarters in Patna, IMA Bihar has served for decades as the apex representative body of medical practitioners across the state. Operating from its Patna state headquarters and engaging in medical leadership, academic publications, member welfare, and public health initiatives, IMA Bihar works with the goal of advancing medical standards, supporting healthcare professionals, and strengthening quality healthcare delivery across Bihar.',
    contributions: [
      'Originating on 1st August 1939 as the Bihar Provincial branch of the Indian Medical Association',
      'Serves for decades as the apex representative body of medical practitioners across Bihar',
      'Engages in medical leadership, academic publications, and healthcare professional welfare',
      'Leads public health initiatives to advance medical standards and quality healthcare delivery',
    ],
    themeColor: {
      badgeBg: '#eff6ff',
      badgeText: '#1d4ed8',
      badgeBorder: '#bfdbfe',
      accent: '#2563eb',
      softBg: 'linear-gradient(145deg, #eff6ff 0%, #ffffff 100%)',
    },
  },

  // 3. Organising Partner - TNAI Bihar
  {
    id: 'tnai',
    name: "TNAI Bihar (Trained Nurses' Association of India, Bihar)",
    shortName: 'TNAI Bihar',
    category: 'ORGANISING PARTNER',
    badge: 'Organising Partner',
    role: 'Organising Partner',
    group: 'organiser-official',
    logo: '/logos/tnai-bihar-state-branch.jpg',
    url: 'https://www.tnaionline.org/',
    achievement: 'Established in 1954 · Apex Nursing Body · National Foundation 1908',
    description:
      "Established in 1954 as the Bihar branch of the Trained Nurses' Association of India (originally founded nationally in 1908), TNAI Bihar represents nursing professionals across the state. Working through professional development, nursing education standards, member welfare, SNAI student initiatives, and public health programmes, TNAI Bihar operates with the goal of upholding the dignity of the nursing profession, advancing quality nursing practice and education, and supporting the general health and welfare of society.",
    contributions: [
      "Established in 1954 as the Bihar branch of the Trained Nurses' Association of India (founded nationally in 1908)",
      'Apex body representing nursing professionals and educators across the state of Bihar',
      'Champions professional development, nursing education standards, and member welfare',
      'Conducts Student Nurses’ Association of India (SNAI) student initiatives and public health programmes',
    ],
    themeColor: {
      badgeBg: '#f0fdf4',
      badgeText: '#15803d',
      badgeBorder: '#bbf7d0',
      accent: '#16a34a',
      softBg: 'linear-gradient(145deg, #f0fdf4 0%, #ffffff 100%)',
    },
  },

  // 4. Innovation Partner - AIC Bihar Vidyapith
  {
    id: 'aicbv',
    name: 'AIC Bihar Vidyapith (Atal Incubation Centre – Bihar Vidyapith)',
    shortName: 'AIC Bihar Vidyapith',
    category: 'INNOVATION PARTNER',
    badge: 'Innovation Partner',
    role: 'Innovation Partner',
    group: 'organiser-official',
    logo: '/logos/AICBV.png',
    url: 'https://www.aicbvf.edu.in/',
    achievement: 'Supported by Atal Innovation Mission (AIM), NITI Aayog, GoI & Bihar Vidyapith',
    description:
      'Registered as a Section 8 entity (AIC-BV Foundation) and established with support from the Atal Innovation Mission (AIM), NITI Aayog, Government of India, and Bihar Vidyapith at Sadaquat Ashram, Patna, AIC Bihar Vidyapith nurtures startups and grassroots innovation across sectors. Providing incubation, acceleration, training, mentorship, business planning, market linkages, and infrastructure support to entrepreneurs, it works with the goal of turning early-stage ideas into scalable, sustainable enterprises and driving innovation-led growth in Bihar and India.',
    contributions: [
      'Registered as a Section 8 entity (AIC-BV Foundation) at historic Sadaquat Ashram, Patna',
      'Established with support from Atal Innovation Mission (AIM), NITI Aayog, Government of India, and Bihar Vidyapith',
      'Provides incubation, acceleration, mentorship, business planning, market linkages, and infrastructure',
      'Turns early-stage ideas into scalable, sustainable enterprises to drive innovation-led growth',
    ],
    themeColor: {
      badgeBg: '#f5f3ff',
      badgeText: '#6d28d9',
      badgeBorder: '#ddd6fe',
      accent: '#7c3aed',
      softBg: 'linear-gradient(145deg, #f5f3ff 0%, #ffffff 100%)',
    },
  },

  // 5. Social Responsibility Partner - Dr. C.P. Thakur Foundation
  {
    id: 'dr-cp-thakur',
    name: 'Dr. C.P. Thakur Foundation',
    shortName: 'Dr. C.P. Thakur Foundation',
    category: 'SOCIAL RESPONSIBILITY PARTNER',
    badge: 'Social Responsibility Partner',
    role: 'Social Responsibility Partner',
    group: 'organiser-official',
    logo: '/logos/dr-cp-thakur.png',
    url: '',
    achievement: 'Founded by Padma Shri Dr. C.P. Thakur · Former Union Health Minister',
    description:
      'Founded in Patna by Padma Shri awardee, renowned physician-researcher, and former Union Health Minister Dr. C.P. Thakur, the Dr. C.P. Thakur Foundation builds upon decades of pioneering public health service, medical research, and social welfare in Bihar. Actively conducting free medical camps, disease-eradication awareness drives, and community health initiatives, the foundation operates with the goal of bridging healthcare disparities and ensuring accessible, equitable medical care reaches underserved communities.',
    contributions: [
      'Founded in Patna by Padma Shri awardee, physician-researcher, and former Union Health Minister Dr. C.P. Thakur',
      'Builds upon decades of pioneering public health service, medical research, and social welfare in Bihar',
      'Actively conducts free medical camps and disease-eradication awareness drives',
      'Operates with the mission of bridging healthcare disparities and delivering equitable care to underserved communities',
    ],
    themeColor: {
      badgeBg: '#fdf2f8',
      badgeText: '#be185d',
      badgeBorder: '#fbcfe8',
      accent: '#db2777',
      softBg: 'linear-gradient(145deg, #fdf2f8 0%, #ffffff 100%)',
    },
  },

  // 6. Strategic Partner - Spark Fusion Technologies
  {
    id: 'spark',
    name: 'Spark Fusion Technologies Pvt. Ltd.',
    shortName: 'Spark Fusion Technologies',
    category: 'BRANDING & MARKETING PARTNER',
    badge: 'Branding & Marketing Partner',
    role: 'Branding & Marketing Partner',
    group: 'strategic',
    logo: '/logos/spark.png',
    url: 'https://www.sparkfusion.co.in',
    achievement: 'Over 11 Years Legacy · "The High Fliers of Bihar – 2021" (Best Startup)',
    description:
      'Backed by over 11 years of industry legacy that began with Prem Technologies—where leadership was honoured with "The High Fliers of Bihar – 2021" recognition in category of Best Startup in Bihar—Spark Fusion Technologies Pvt. Ltd. is a multidisciplinary technology, digital marketing, and creative consulting company guided by its vision of connecting Brand, Content, and Technology to drive sustainable growth across India. Offering end-to-end capabilities across web and application development, digital platforms, brand strategy, media communications, and communication technology for businesses, institutions, and public-sector organisations, Spark Fusion is also expanding its forward-looking vision into the hospitality sector through its flagship venture NovaStay Hotels—working with the goal of engineering scalable digital systems, cohesive brand experiences, and transformative ventures that create lasting business and institutional impact.',
    contributions: [
      'Backed by over 11 years of industry legacy, honoured with "The High Fliers of Bihar – 2021" (Best Startup)',
      'Multidisciplinary technology, digital marketing, and creative consulting firm connecting Brand, Content, and Technology',
      'Provides end-to-end web & application development, digital platforms, brand strategy, and media communications',
      'Pioneering hospitality technology innovation through its flagship venture NovaStay Hotels',
    ],
    themeColor: {
      badgeBg: '#fff7ed',
      badgeText: '#c2410c',
      badgeBorder: '#fed7aa',
      accent: '#ea580c',
      softBg: 'linear-gradient(145deg, #fff7ed 0%, #ffffff 100%)',
    },
  },

  // 7. Strategic Partner - NovaStay Hotels
  {
    id: 'novastay',
    name: 'NovaStay Hotels',
    shortName: 'NovaStay Hotels',
    category: 'HOSPITALITY PARTNER',
    badge: 'Hospitality Partner',
    role: 'Hospitality Partner',
    group: 'strategic',
    logo: '/logos/novastay.png',
    url: 'https://novastayhotels.com',
    achievement: 'Modern Hospitality Tech & Hotel-Booking Ecosystem · Operated by Spark Fusion',
    description:
      'Operated by Spark Fusion Technologies Pvt. Ltd., NovaStay Hotels is a modern hospitality technology and hotel-booking ecosystem connecting travellers and accommodation partners across India. Offering curated, operations-approved stays, transparent pricing, secure digital bookings, and an intuitive partner extranet for property management, NovaStay operates with the goal of delivering seamless, trustworthy travel experiences while empowering hotels and hospitality partners to grow.',
    contributions: [
      'Operated by Spark Fusion Technologies Pvt. Ltd. as a modern hospitality technology and booking ecosystem',
      'Connects travellers and accommodation partners across India with curated, operations-approved stays',
      'Provides transparent pricing and secure digital booking journeys for conclave delegates and guests',
      'Features an intuitive partner extranet empowering hotels and accommodation partners to grow',
    ],
    themeColor: {
      badgeBg: '#f0fdfa',
      badgeText: '#0f766e',
      badgeBorder: '#99f6e4',
      accent: '#0d9488',
      softBg: 'linear-gradient(145deg, #f0fdfa 0%, #ffffff 100%)',
    },
  },

  // 8. Strategic Partner - Startly Innovations
  {
    id: 'startly-innovations',
    name: 'Startly Innovations',
    shortName: 'Startly Innovations',
    category: 'INNOVATION PARTNER',
    badge: 'Innovation Partner',
    role: 'Innovation Partner',
    group: 'strategic',
    logo: '/logos/startly-innovations.png',
    url: 'https://startlyinnovations.com/',
    achievement: 'Startup & Innovation Ecosystem Enabler · Strategic Mentorship & Tech Adoption',
    description:
      'As a forward-looking startup and innovation ecosystem enabler, Startly Innovations empowers emerging entrepreneurs, early-stage ventures, and institutions to turn disruptive ideas into scalable, market-ready solutions. Through strategic mentorship, product innovation support, technology adoption, and ecosystem collaborations, Startly Innovations works with the goal of accelerating entrepreneurial growth, fostering practical problem-solving, and driving sustainable innovation across sectors.',
    contributions: [
      'Forward-looking startup and innovation ecosystem enabler empowering entrepreneurs and institutions',
      'Transforms disruptive ideas into scalable, market-ready solutions for healthcare and industry',
      'Delivers strategic mentorship, product innovation support, and technology adoption',
      'Drives ecosystem collaborations and practical problem-solving for sustainable innovation',
    ],
    themeColor: {
      badgeBg: '#faf5ff',
      badgeText: '#7e22ce',
      badgeBorder: '#e9d5ff',
      accent: '#9333ea',
      softBg: 'linear-gradient(145deg, #faf5ff 0%, #ffffff 100%)',
    },
  },

  // 9. Strategic Partner - SUTRAVYA
  {
    id: 'sutravya',
    name: 'SUTRAVYA',
    shortName: 'SUTRAVYA',
    category: 'TECHNOLOGY PARTNER',
    badge: 'Technology Partner',
    role: 'Technology Partner',
    group: 'strategic',
    logo: '/logos/sutravya-logo.png',
    url: 'https://sutravya.in/',
    achievement: '"The Digital Thread of Healthcare" · Healthcare Digital Growth Partner',
    description:
      'Known as "The Digital Thread of Healthcare," SUTRAVYA is a specialised healthcare-focused digital marketing, technology, and growth partner helping doctors, clinics, and hospitals build clear, trusted digital foundations. From responsive practice websites, local search visibility, and Google Business Profile management to practice-approved clinical content and streamlined patient enquiry journeys, SUTRAVYA works with the goal of bridging the gap between online discovery and patient care—making healthcare practices easier to find, easier to contact, and better connected.',
    contributions: [
      'Recognised as "The Digital Thread of Healthcare", specialised in doctor and hospital digital foundations',
      'Designs responsive medical practice websites and optimises local search & Google Business Profiles',
      'Creates practice-approved clinical content and streamlines patient enquiry journeys',
      'Bridges the gap between online discovery and patient care, making practices easier to find and connect',
    ],
    themeColor: {
      badgeBg: '#eef2ff',
      badgeText: '#4338ca',
      badgeBorder: '#c7d2fe',
      accent: '#4f46e5',
      softBg: 'linear-gradient(145deg, #eef2ff 0%, #ffffff 100%)',
    },
  },
];
