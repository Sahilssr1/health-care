import fs from 'node:fs';
import path from 'node:path';
const root=process.argv[2]; if(!root)throw Error('Source root required');
const put=(file,text)=>fs.writeFileSync(path.join(root,file),text);
const edit=(file,fn)=>put(file,fn(fs.readFileSync(path.join(root,file),'utf8')));
put('lib/seo.ts',`import type { Metadata } from 'next';
export function pageMetadata(title:string,description:string,pathname:string):Metadata {
const origin=process.env.APP_ORIGIN||'https://biharhealthcareconclave.com';
const url=new URL(pathname,origin).toString();
const image=new URL('/logos/conclave.png',origin).toString();
return {title,description,alternates:{canonical:url},openGraph:{title,description,url,type:'website',locale:'en_IN',siteName:'Bihar Healthcare Conclave 2026',images:[{url:image,width:3919,height:3919,alt:'Bihar Healthcare Conclave 2026'}]},twitter:{card:'summary_large_image',title,description,images:[image]}};
}
export function eventStructuredData(){const origin=process.env.APP_ORIGIN||'https://biharhealthcareconclave.com';return {'@context':'https://schema.org','@type':'Event','@id':origin+'/#event',name:'Bihar Healthcare Conclave 2026',description:'Building a quality-driven, technology-enabled and future-ready healthcare ecosystem. Free participation for healthcare professionals, students, educators and innovators.',startDate:'2026-12-11T09:00:00+05:30',endDate:'2026-12-11T21:00:00+05:30',eventStatus:'https://schema.org/EventScheduled',eventAttendanceMode:'https://schema.org/OfflineEventAttendanceMode',url:origin+'/',image:[origin+'/logos/conclave.png'],isAccessibleForFree:true,location:{'@type':'Place',name:'Urja Auditorium',address:{'@type':'PostalAddress',addressLocality:'Patna',addressRegion:'Bihar',addressCountry:'IN'}},organizer:{'@type':'Organization',name:'QualiNova Solutions Pvt. Ltd.',url:'https://qualinovahub.com'},offers:{'@type':'Offer',url:origin+'/register',price:'0',priceCurrency:'INR',availability:'https://schema.org/InStock'}};}
`);
edit('app/page.tsx',s=>"import {pageMetadata,eventStructuredData} from '@/lib/seo';\nconst baseMetadata=pageMetadata('Bihar Healthcare Conclave 2026 | Free Registration','Join Bihar Healthcare Conclave 2026 on 11 December, 9 AM–9 PM at Urja Auditorium, Patna. FREE registration for healthcare professionals, students and innovators.','/');export const metadata={...baseMetadata,title:{absolute:'Bihar Healthcare Conclave 2026 | Free Registration'}};\n"+s.replace('export default function Home(){return <>','export default function Home(){return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(eventStructuredData()).replace(/</g,\'\\\\u003c\')}}/>'));
edit('app/[slug]/page.tsx',s=>"import {pageMetadata} from '@/lib/seo';\n"+s.replace("return {title:pages[slug]?.eyebrow||slug.charAt(0).toUpperCase()+slug.slice(1)};",`const extra:Record<string,string>={partners:'Meet organiser QualiNova, branding and marketing partner Spark Fusion, and hospitality partner NovaStay for Bihar Healthcare Conclave 2026.',faq:'Answers about FREE registration, eligibility, event date, Urja Auditorium venue and participation at Bihar Healthcare Conclave 2026.',privacy:'Read how Bihar Healthcare Conclave handles registration information, privacy consent and participant data.',terms:'Read the FREE registration terms and event participation information for Bihar Healthcare Conclave 2026.'};return pageMetadata(pages[slug]?.eyebrow||slug.charAt(0).toUpperCase()+slug.slice(1),pages[slug]?.intro||extra[slug]||'Bihar Healthcare Conclave 2026 in Patna.', '/'+slug);`).replace("if(slug==='partners')return <Partners/>;","if(slug==='partners')return <><section className=\"page-hero\"><p className=\"eyebrow\">OFFICIAL PARTNERS</p><h1>Organiser and official partners</h1><p className=\"large\">Working together for Bihar Healthcare Conclave 2026.</p></section><Partners/></>;"));
edit('app/register/page.tsx',s=>"import {pageMetadata} from '@/lib/seo';\n"+s.replace("export const metadata={title:'Free Registration'};","export const metadata=pageMetadata('Free Registration','Register FREE for Bihar Healthcare Conclave 2026 on 11 December at Urja Auditorium, Patna. Healthcare professionals, students and innovators are welcome.','/register');"));
put('app/confirmation/layout.tsx',`import type {Metadata} from 'next';
export const metadata:Metadata={title:'Registration confirmation',robots:{index:false,follow:false}};
export default function ConfirmationLayout({children}:{children:React.ReactNode}){return children;}
`);
put('app/sitemap.ts',`import type {MetadataRoute} from 'next';import {pages} from '@/lib/content';
export default function sitemap():MetadataRoute.Sitemap{const origin=process.env.APP_ORIGIN||'https://biharhealthcareconclave.com';return [...new Set(['',...Object.keys(pages),'register','partners','faq','privacy','terms'])].map(slug=>({url:new URL('/'+slug,origin).toString()}));}
`);
console.log('SEO source updated');

