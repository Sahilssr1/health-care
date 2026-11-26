import type { Metadata } from 'next';
export function pageMetadata(title:string,description:string,pathname:string):Metadata {
const origin=process.env.APP_ORIGIN||'https://biharhealthcareconclave.com';
const url=new URL(pathname,origin).toString();
const image=new URL('/logos/conclave.png',origin).toString();
return {title,description,alternates:{canonical:url},openGraph:{title,description,url,type:'website',locale:'en_IN',siteName:'Bihar Healthcare Conclave 2026',images:[{url:image,width:3919,height:3919,alt:'Bihar Healthcare Conclave 2026'}]},twitter:{card:'summary_large_image',title,description,images:[image]}};
}
export function eventStructuredData(){const origin=process.env.APP_ORIGIN||'https://biharhealthcareconclave.com';return {'@context':'https://schema.org','@type':'Event','@id':origin+'/#event',name:'Bihar Healthcare Conclave 2026',description:'Building a quality-driven, technology-enabled and future-ready healthcare ecosystem. Participation for healthcare professionals, students, educators and innovators.',startDate:'2026-12-11',eventStatus:'https://schema.org/EventScheduled',eventAttendanceMode:'https://schema.org/OfflineEventAttendanceMode',url:origin+'/',image:[origin+'/logos/conclave.png'],location:{'@type':'Place',name:'Urja Auditorium',address:{'@type':'PostalAddress',addressLocality:'Patna',addressRegion:'Bihar',addressCountry:'IN'}},organizer:{'@type':'Organization',name:'QualiNova Solutions Pvt. Ltd.',url:'https://qualinovahub.com',email:'info@biharhealthcareconclave.com',telephone:'+919911350649'}};}
