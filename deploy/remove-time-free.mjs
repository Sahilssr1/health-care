import fs from 'node:fs';import path from 'node:path';
const root=process.argv[2];
for(const file of ['app/page.tsx','app/layout.tsx','app/[slug]/page.tsx','app/register/page.tsx','app/confirmation/page.tsx','lib/content.ts','lib/seo.ts','scripts/email-worker.ts']){
 const p=path.join(root,file);let s=fs.readFileSync(p,'utf8');
 s=s.replace("['Is registration free?','Yes. Conclave registration is completely free.']","['How do I register?','Use the Register Here button and complete the registration form.']");
 s=s.replace('Registration for Bihar Healthcare Conclave 2026 is free.','Registration for Bihar Healthcare Conclave 2026 is open.');
 s=s.replace(/\bfree\s+/gi,'');
 s=s.replace('<p>Friday · 9:00 AM – 9:00 PM IST</p>','<p>Friday</p>').replace('<p>9:00 AM – 9:00 PM IST</p>','');
 s=s.replaceAll(' · 9:00 AM – 9:00 PM IST','').replaceAll('9:00 AM – 9:00 PM IST · ','').replaceAll(', 9:00 AM – 9:00 PM IST','');
 s=s.replaceAll('11 December, 9 AM–9 PM at','11 December at').replaceAll('9:00 AM – 9:00 PM IST\\n','');
 s=s.replace(" time: '9:00 AM – 9:00 PM IST',",'');
 s=s.replace("startDate:'2026-12-11T09:00:00+05:30',endDate:'2026-12-11T21:00:00+05:30',","startDate:'2026-12-11',");
 s=s.replace('isAccessibleForFree:true,','').replace(",offers:{'@type':'Offer',url:origin+'/register',price:'0',priceCurrency:'INR',availability:'https://schema.org/InStock'}",'');
 fs.writeFileSync(p,s);
}
console.log('Event time and free wording removed');

