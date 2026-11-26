import { posterProgrammes } from './poster-programmes';

import { z } from 'zod';

import { pages } from './content';

export const officialContact={email:'info@biharhealthcareconclave.com',phone:'+91 9911350649',whatsApp:'919911350649'};

export const participantGroups=[
 {name:'STUDENT',categories:[
   'Nursing (M.Sc.)',
   'Nursing (B.Sc.)',
   'Nursing (ANM)',
   'Nursing (GNM)',
   'Nursing (Post Basic B.Sc.)',
   'Nursing (MSc)',
   'Nursing (BSc)',
   'Nursing (Post Basic BSc)',
   'Pharmacy',
   'Paramedical',
   'Medical (UG)',
   'Medical (PG)',
   'Hospital Management',
   'Engineering',
   'Biomedical Engineering',
   'Bioinformatics',
   'Others'
 ]},
 {name:'EMPLOYEE',categories:['Government Employee (Hospital)','Government Employee (Others)','Private Employee (Hospital)','Private Employee (Others)','Medical Professionals (Doctor)','Nursing Educator','Nursing Staff','Nursing Administrator (Matron / Nursing Superintendent / Assistant Nursing Superintendent)','Hospital Administrator (Medical Superintendent / Deputy Medical Superintendent / Hospital Manager)','Others']},
 {name:'COMPANIES',categories:['HealthTech Companies (HMIS)','HealthTech Companies (Manufacturer)','HealthTech Companies (Supply Chain)','Lab Tech Companies (Pathology)','Lab Tech Companies (Radiology)','Pharmaceutical Company','Surgical Manufacturers','Diagnostics Labs','Patholabs','Banks (Government)','Banks (Private)','Finance Companies','Civil Construction','Architect','Construction Material','Hotels and Hospitality','Travel Agency']}
];

export const studentInterestOptions = [
  'Conclave (As Attendee Only)',
  'Common Workshop',
  'Students Project Exhibition',
  'Cultural Event (As Guest)',
  'Creative Poster Presentation',
  'Quiz Competition (Pre-Event)',
  'Healthcare AI Hackathon (Pre-Event)',
  'Other',
] as const;

export const employeeInterestOptions = [
  'Conclave (As Attendee Only)',
  'Common Workshop',
  'Award & Recognition',
  'Health Magazine Volume 1 (As Author)',
  'Presentation',
  'Other',
] as const;

export const companyInterestOptions = [
  'Conclave (As Attendee Only)',
  'Award & Recognition',
  'Product Promotion – Exhibition Stall',
  'Product Promotion – Canopy',
  'Product Promotion – Standee (Solo)',
  'Product Promotion – Standee (Group)',
  'Presentation',
  'Health Magazine (For Product Promotion)',
  'Health Magazine (As an Author)',
  'Other',
] as const;

export const areaOfInterestOptions = [
  'Conclave Attendance',
  'Workshop – Nursing Student',
  'Workshop – Pharmacy Student',
  'Workshop – Paramedical Student',
  'Nursing Workshop',
  'Pharmacy Workshop',
  'Paramedical Workshop',
  'Conclave (As Attendee Only)',
  'Common Workshop',
  'Students Project Exhibition',
  'Cultural Event (As Guest)',
  'Creative Poster Presentation',
  'Quiz Competition (Pre-Event)',
  'Healthcare AI Hackathon (Pre-Event)',
  'Award & Recognition',
  'Health Magazine Volume 1 (As Author)',
  'Presentation',
  'Product Promotion – Exhibition Stall',
  'Product Promotion – Canopy',
  'Product Promotion – Standee (Solo)',
  'Product Promotion – Standee (Group)',
  'Health Magazine (For Product Promotion)',
  'Health Magazine (As an Author)',
  'Other',
  // Backward compatibility
  'Conference',
  'Workshop',
  'Exhibition',
  'Quiz Competition',
  'Healthcare AI Hackathon',
  'Awards and Recognition',
  'Product Showcasing (Exhibition)',
  'Product Promotion (Canopy)',
  'Product Promotion (Solo Standee)',
  'Product Promotion (Group Standee)',
  'BHC Event Magazine',
  'BHC Magazine (Post Event Coverage)',
] as const;

export function getStudentInterestOptions(category: string): readonly string[] {
  const cat = (category || '').toLowerCase();
  const options: string[] = ['Conclave Attendance'];

  if (cat.includes('nursing')) {
    options.push('Workshop – Nursing Student');
  } else if (cat.includes('pharmacy')) {
    options.push('Workshop – Pharmacy Student');
  } else if (cat.includes('paramedical')) {
    options.push('Workshop – Paramedical Student');
  }

  options.push(
    'Students Project Exhibition',
    'Cultural Event (As Guest)',
    'Creative Poster Presentation',
    'Quiz Competition (Pre-Event)',
    'Healthcare AI Hackathon (Pre-Event)',
    'Other'
  );

  return options;
}

export interface WorkshopSubCategory {
  id: string;
  name: string;
  desc?: string;
}

export interface WorkshopCategory {
  id: string;
  name: string;
  desc?: string;
  subCategories?: WorkshopSubCategory[];
}

export interface WorkshopOption {
  id: string;
  title: string;
  desc: string;
  name: string;
  shortName: string;
  categories?: WorkshopCategory[];
}

export interface WorkshopPricingOption {
  id: string;
  title: string;
  desc: string;
  fee: number;
}

export interface UnifiedWorkshopOption {
  id: string;
  title: string;
  workshop: string;
  category: string;
  specialisation: string;
  fee: number;
  track: 'CME' | 'CNE' | 'Paramedical' | 'Pharmacy' | 'Hospital Management';
}

export const unifiedWorkshopOptions: UnifiedWorkshopOption[] = [
  { id: 'cme-sr', title: 'Senior Resident (CME)', workshop: 'CME – Continuing Medical Education', category: 'Senior Resident', specialisation: 'CME: Senior Resident', fee: 1000, track: 'CME' },
  { id: 'cme-jr', title: 'Junior Resident (CME)', workshop: 'CME – Continuing Medical Education', category: 'Junior Resident', specialisation: 'CME: Junior Resident', fee: 1000, track: 'CME' },
  { id: 'cme-jd', title: 'Junior Doctor (CME)', workshop: 'CME – Continuing Medical Education', category: 'Junior Doctor', specialisation: 'CME: Junior Doctor', fee: 1000, track: 'CME' },
  { id: 'cme-pg', title: 'Medical Student PG (CME)', workshop: 'CME – Continuing Medical Education', category: 'Medical Student PG', specialisation: 'CME: Medical Student PG', fee: 1000, track: 'CME' },
  { id: 'cme-ug', title: 'Medical Student UG (CME)', workshop: 'CME – Continuing Medical Education', category: 'Medical Student UG', specialisation: 'CME: Medical Student UG', fee: 500, track: 'CME' },
  { id: 'hm-student', title: 'Hospital Management Student', workshop: 'Workshop for Hospital Management', category: 'Hospital Management Student', specialisation: 'Hospital Management: Student', fee: 100, track: 'Hospital Management' },
  { id: 'hm-manager', title: 'Hospital Manager', workshop: 'Workshop for Hospital Management', category: 'Hospital Manager', specialisation: 'Hospital Management: Hospital Manager', fee: 250, track: 'Hospital Management' },
  { id: 'hm-faculty', title: 'Hospital Management Faculty', workshop: 'Workshop for Hospital Management', category: 'Hospital Management Faculty', specialisation: 'Hospital Management: Faculty', fee: 250, track: 'Hospital Management' },
  { id: 'pharmacy-faculty', title: 'Pharmacy Faculty – Academic', workshop: 'Workshop for Pharmacy', category: 'Pharmacy Faculty – Academic', specialisation: 'Pharmacy: Pharmacy Faculty – Academic', fee: 250, track: 'Pharmacy' },
  { id: 'pharmacy-student', title: 'Pharmacy Student', workshop: 'Workshop for Pharmacy', category: 'Pharmacy Student', specialisation: 'Pharmacy: Pharmacy Student', fee: 100, track: 'Pharmacy' },
  { id: 'cne-nursing-staff', title: 'Nursing Staff – Clinical (CNE)', workshop: 'CNE – Continuing Nursing Education', category: 'Nursing Staff – Clinical', specialisation: 'CNE: Nursing Staff – Clinical', fee: 250, track: 'CNE' },
  { id: 'cne-nursing-faculty', title: 'Nursing Faculty – Academic (CNE)', workshop: 'CNE – Continuing Nursing Education', category: 'Nursing Faculty – Academic', specialisation: 'CNE: Nursing Faculty – Academic', fee: 250, track: 'CNE' },
  { id: 'cne-nursing-student', title: 'Nursing Student', workshop: 'CNE – Continuing Nursing Education', category: 'Nursing Student', specialisation: 'CNE: Nursing Student', fee: 100, track: 'CNE' },
  { id: 'paramedical-faculty', title: 'Paramedical Faculty', workshop: 'Workshop for Paramedical', category: 'Paramedical Faculty', specialisation: 'Paramedical: Paramedical Faculty', fee: 500, track: 'Paramedical' },
  { id: 'paramedical-student', title: 'Paramedical Student', workshop: 'Workshop for Paramedical', category: 'Paramedical Student', specialisation: 'Paramedical: Paramedical Student', fee: 250, track: 'Paramedical' },
];

export const CONCLAVE_ATTENDEE_FEE = 250;
export const STANDARD_INTEREST_FEE = 250;

/**
 * Checks if a given Area of Interest option requires a payment.
 * Strictly: Only "Conclave (As Attendee Only)" and "Common Workshop" (or "Workshop") are paid.
 * All other options (competitions, presentations, exhibitions, cultural, other) remain 100% Free.
 */
export function isPaidInterest(interest: string, participantType?: string): boolean {
  if (!interest || typeof interest !== 'string') return false;
  const trimmed = interest.trim();
  const base = trimmed.startsWith('Other (') ? 'Other' : trimmed;
  return (
    base === 'Conclave (As Attendee Only)' ||
    base === 'Conclave Attendance' ||
    base === 'Common Workshop' ||
    base === 'Workshop' ||
    base === 'Workshop – Nursing Student' ||
    base === 'Nursing Workshop' ||
    base === 'Workshop – Pharmacy Student' ||
    base === 'Pharmacy Workshop' ||
    base === 'Workshop – Paramedical Student' ||
    base === 'Paramedical Workshop'
  );
}

export interface PriceBreakdownItem {
  name: string;
  fee: number;
  isPaid?: boolean;
}

/**
 * Calculates the fee for the single selected Area of Interest.
 * Only ONE selection is allowed per registration.
 * - For Students: Conclave Attendance & specific workshops are ₹100 flat fee.
 * - For Non-Students: Conclave = ₹250, Workshop = ₹250 - ₹1,000.
 * - All other options = ₹0 (Free).
 */
export function isSpecialStudentCategory(category?: string): boolean {
  if (!category) return false;
  const lower = category.toLowerCase();
  return (
    lower.includes('nursing') ||
    lower.includes('pharmacy') ||
    lower.includes('paramedical')
  );
}

export function isSpecialStudentWorkshop(workshopId?: string): boolean {
  return (
    workshopId === 'cne-nursing-student' ||
    workshopId === 'paramedical-student' ||
    workshopId === 'pharmacy-student' ||
    workshopId === 'hm-student'
  );
}

export function calculateTotalFee(
  interests: readonly string[] | string[] | string,
  selectedWorkshopId?: string,
  participantType?: string,
  category?: string
): { totalFee: number; breakdown: PriceBreakdownItem[] } {
  // Extract single interest
  const single = Array.isArray(interests) ? interests[0] || '' : String(interests || '');
  const trimmed = single.trim();
  if (!trimmed) {
    return { totalFee: 0, breakdown: [] };
  }

  const isStudent = (participantType || '').trim().toUpperCase() === 'STUDENT';
  const isSpecialCat = !category || isSpecialStudentCategory(category);

  // 1. Conclave (As Attendee Only) or Conclave Attendance
  if (trimmed === 'Conclave (As Attendee Only)' || trimmed === 'Conclave Attendance') {
    if (isStudent && isSpecialCat) {
      return {
        totalFee: 100,
        breakdown: [{ name: 'Conclave (As Attendee Only)', fee: 100, isPaid: true }],
      };
    }
    return {
      totalFee: CONCLAVE_ATTENDEE_FEE,
      breakdown: [{ name: 'Conclave (As Attendee Only)', fee: CONCLAVE_ATTENDEE_FEE, isPaid: true }],
    };
  }

  // 2. Specific student workshop options
  if (
    trimmed === 'Workshop – Nursing Student' ||
    trimmed === 'Nursing Workshop' ||
    trimmed === 'Workshop – Pharmacy Student' ||
    trimmed === 'Pharmacy Workshop' ||
    trimmed === 'Workshop – Paramedical Student' ||
    trimmed === 'Paramedical Workshop'
  ) {
    return {
      totalFee: 100,
      breakdown: [{ name: trimmed, fee: 100, isPaid: true }],
    };
  }

  // 3. Common Workshop: In workshop, ONLY Nursing Student, Paramedical Student, and Pharmacy Student are ₹100 for student.
  // Other workshop categories remain their original same price!
  if (trimmed === 'Common Workshop' || trimmed === 'Workshop') {
    const workshop = (unifiedWorkshopOptions || []).find((w) => w.id === selectedWorkshopId);
    if (!workshop) {
      return { totalFee: 0, breakdown: [] };
    }
    let workshopFee = workshop.fee;
    
    if (isStudent && isSpecialStudentWorkshop(selectedWorkshopId)) {
      workshopFee = 100;
    }

    return {
      totalFee: workshopFee,
      breakdown: [
        {
          name: `${workshop.workshop} (${workshop.category})`,
          fee: workshopFee,
          isPaid: true,
        },
      ],
    };
  }

  // 4. All other options are Free (₹0)
  return {
    totalFee: 0,
    breakdown: [{ name: trimmed, fee: 0, isPaid: false }],
  };
}

export const cmeCategoryOptions: WorkshopPricingOption[] = [
  { id: 'sr', title: 'Senior Resident', desc: 'Senior Resident (CME)', fee: 1000 },
  { id: 'jr', title: 'Junior Resident', desc: 'Junior Resident (CME)', fee: 1000 },
  { id: 'jd', title: 'Junior Doctor', desc: 'Junior Doctor (CME)', fee: 1000 },
  { id: 'pg', title: 'Medical Student PG', desc: 'Medical Student PG (CME)', fee: 1000 },
  { id: 'ug', title: 'Medical Student UG', desc: 'Medical Student UG (CME)', fee: 500 },
];

export const cneCategoryOptions: WorkshopPricingOption[] = [
  { id: 'nursing-student', title: 'Nursing Student', desc: 'Nursing Student', fee: 100 },
  { id: 'nursing-staff', title: 'Nursing Staff – Clinical', desc: 'Nursing Staff – Clinical (CNE)', fee: 250 },
  { id: 'nursing-faculty', title: 'Nursing Faculty – Academic', desc: 'Nursing Faculty – Academic (CNE)', fee: 250 },
];

export const paramedicalCategoryOptions: WorkshopPricingOption[] = [
  { id: 'paramedical-student', title: 'Paramedical Student', desc: 'Paramedical Student', fee: 250 },
  { id: 'paramedical-faculty', title: 'Paramedical Faculty', desc: 'Paramedical Faculty', fee: 500 },
];

export const pharmacyCategoryOptions: WorkshopPricingOption[] = [
  { id: 'pharmacy-student', title: 'Pharmacy Student', desc: 'Pharmacy Student', fee: 100 },
  { id: 'pharmacy-faculty', title: 'Pharmacy Faculty – Academic', desc: 'Pharmacy Faculty – Academic', fee: 250 },
];

export const workshopOptions: WorkshopOption[] = [
  {
    id: 'cme',
    title: 'CME',
    desc: 'Continuing Medical Education',
    name: 'CME – Continuing Medical Education',
    shortName: 'CME',
  },
  {
    id: 'cne',
    title: 'CNE',
    desc: 'Continuing Nursing Education',
    name: 'CNE – Continuing Nursing Education',
    shortName: 'CNE',
  },
  {
    id: 'paramedical',
    title: 'Paramedical',
    desc: 'Workshop for Paramedical',
    name: 'Workshop for Paramedical',
    shortName: 'Paramedical',
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy',
    desc: 'Workshop for Pharmacy',
    name: 'Workshop for Pharmacy',
    shortName: 'Pharmacy',
  },
];

const text=(n:number)=>z.string().trim().max(n);

const publicUrl=z.string().max(1000).refine(v=>!v||(()=>{try{const u=new URL(v);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}})(),'Use an HTTPS URL without credentials.');

export const programmeSchema=z.object({id:z.string().regex(/^[a-z0-9-]{1,80}$/),title:text(150).min(2),category:text(80).min(2),summary:text(400),details:text(3000),audience:text(600),benefits:text(1000),status:text(120),published:z.boolean(),speaker:text(200),schedule:text(200),venue:text(200)}).strict();

export type Programme=z.infer<typeof programmeSchema>;


export const initialProgrammes:Programme[]=posterProgrammes;

// Preserve the retired path only while existing partner content is migrated.
export const partnerSchema=z.object({id:text(60).min(1),name:text(150).min(2),role:text(150),logo:z.string().trim().max(200).regex(/^\/logos\/[a-zA-Z0-9._-]+$/,'Use an approved /logos/ path.'),url:publicUrl,published:z.boolean()}).strict();

export const initialPartners=[{id:'qualinova',name:'QualiNova Solutions Pvt. Ltd.',role:'Organised by',logo:'/logos/qualinova.jpg',url:'https://qualinovahub.com',published:true},{id:'ima-bihar',name:'Indian Medical Association — Bihar State Branch',role:'Organising Partner',logo:'/logos/ima-bihar.jpg',url:'https://imabihar.org',published:true},{id:'tnai',name:'TNAI — Trained Nurses Association of India, Bihar State Branch',role:'Organising Partner',logo:'/logos/tnai-bihar-state-branch.jpg',url:'https://www.tnaionline.org/',published:true},{id:'aicbv',name:'AIC Bihar Vidyapith',role:'Innovation Partner',logo:'/logos/AICBV.png',url:'https://www.aicbvf.edu.in/',published:true},{id:'dr-cp-thakur',name:'Dr. C.P. Thakur',role:'Social Responsibility Partner',logo:'/logos/dr-cp-thakur.png',url:'',published:true},{id:'startly-innovations',name:'Startly Innovations',role:'Innovation Partner',logo:'/logos/startly-innovations.png',url:'https://startlyinnovations.com/',published:true},{id:'spark',name:'Spark Fusion Technologies Pvt. Ltd.',role:'Branding & Marketing Partner',logo:'/logos/spark.png',url:'https://www.sparkfusion.co.in',published:true},{id:'novastay',name:'NovaStay Hotels',role:'Hospitality Partner',logo:'/logos/novastay.png',url:'https://novastayhotels.com',published:true},{id:'sutravya',name:'SUTRAVYA',role:'Technology Partner',logo:'/logos/sutravya-logo.png',url:'https://sutravya.in/',published:true}];

export const socialSchema=z.object({brand:z.enum(['Bihar Healthcare Conclave','QualiNova Solutions']),platform:z.enum(['Facebook','Instagram','LinkedIn','YouTube','X','WhatsApp']),url:publicUrl,verified:z.boolean()}).strict();

export const settingsSchema=z.object({whatsApp:z.string().regex(/^\d{10,15}$/),enquiryMessage:text(400).min(2),announcement:text(300),announcementPublished:z.boolean(),headline:text(200).min(2),introduction:text(1000).min(2),heroKicker:text(160).min(2),heroTagline:text(300).min(2),heroAudience:text(300).min(2),showRegistrationCount:z.boolean()}).strict();

export const initialSettings={whatsApp:officialContact.whatsApp,enquiryMessage:'Hello, I would like to know more about Bihar Healthcare Conclave 2026.',announcement:'',announcementPublished:false,headline:'A meeting of minds. A movement towards better healthcare.',introduction:'Bihar Healthcare Conclave brings healthcare professionals, educators, students, institutions and innovators together for a quality-driven, technology-enabled and future-ready healthcare ecosystem.',heroKicker:'HEALTHY BIHAR | HEALTHIER PEOPLE | A STRONGER INDIA.',heroTagline:'Building a quality-driven, technology-enabled and future-ready healthcare ecosystem.',heroAudience:'For healthcare professionals, medical & engineering students, educators, institutions and innovators.',showRegistrationCount:false};

export const contentSchemas={pages:z.array(z.object({id:z.enum(['about','vision','awards','nursing-quest','hackathon','exhibition']),title:text(200).min(2),eyebrow:text(100).min(2),intro:text(1500),items:z.array(text(1000).min(1)).max(30)}).strict()).max(6).refine(a=>new Set(a.map(p=>p.id)).size===a.length,'Page IDs must be unique.'),programmes:z.array(programmeSchema).max(100).refine(a=>new Set(a.map(p=>p.id)).size===a.length,'Programme IDs must be unique.'),participants:z.array(z.object({name:text(100).min(2),categories:z.array(text(150).min(2)).min(1).max(100)}).strict()).min(1).max(20).refine(a=>new Set(a.map(g=>g.name)).size===a.length&&new Set(a.flatMap(g=>g.categories)).size===a.flatMap(g=>g.categories).length,'Participant types and categories must be unique.'),partners:z.array(partnerSchema).max(30).refine(a=>new Set(a.map(p=>p.id)).size===a.length,'Partner IDs must be unique.'),socials:z.array(socialSchema).max(12).refine(a=>new Set(a.map(s=>s.brand+'|'+s.platform)).size===a.length,'Use one official URL per organisation and platform.'),settings:settingsSchema,speakers:z.array(z.object({name:text(150).min(2),designation:text(200),bio:text(1000),verified:z.boolean(),published:z.boolean()}).strict()).max(100)};

export type ContentKey=keyof typeof contentSchemas;

export const initialContent={pages:Object.entries(pages).filter(([id])=>['about','vision','awards','nursing-quest','hackathon','exhibition'].includes(id)).map(([id,page])=>({id,...page})),programmes:initialProgrammes,participants:participantGroups,partners:initialPartners,socials:[{brand:'Bihar Healthcare Conclave',platform:'Facebook',url:'https://www.facebook.com/share/1UJw4jqN7t/',verified:true},{brand:'Bihar Healthcare Conclave',platform:'Instagram',url:'https://www.instagram.com/biharhealthcareconclave/',verified:true},{brand:'Bihar Healthcare Conclave',platform:'X',url:'https://x.com/BiharHCC26',verified:true}] as z.infer<typeof socialSchema>[],settings:initialSettings,speakers:[] as {name:string;designation:string;bio:string;verified:boolean;published:boolean}[]};

export function whatsAppLink(number:string,message:string){return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;}

export const partnershipOpportunities=['Institutional Partner','Knowledge Partner','Healthcare Partner','Quality & Accreditation Partner','Technology Partner','AI & Digital Health Partner','Clinical Skills Partner','Education Partner','Innovation Partner','CSR Partner','Exhibition Partner'];

