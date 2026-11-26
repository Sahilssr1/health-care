'use client';
import { programmeArtwork } from '@/lib/programme-artwork';
import { ThemeIcon } from '@/components/theme-icon';
import { useState } from 'react';
import Link from 'next/link';
import { type Programme,whatsAppLink } from '@/lib/enhancement-data';
import { competitionRegistrationUrl } from '@/lib/event-links';

const competitionProgrammes=['innovation-hackathon','quiz-innovation-awards','nursing-quest'];

export function ProgrammeBrowser({programmes,number}:{programmes:Programme[];number:string}){
 const [category,setCategory]=useState('All');
 const categories=['All',...new Set(programmes.map(p=>p.category))];
 const selected=programmes.filter(p=>category==='All'||p.category===category);
 const iconFor=(category:string)=>category==='Technology'?'technology':category==='Quality'?'quality':category==='Excellence'?'excellence':category==='Education & Skills'?'skills':'innovation';
 return <div>
  <div className="programme-filters" role="group" aria-label="Filter programme areas">{categories.map(c=><button type="button" key={c} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div>
  <p className="programme-artwork-note">Programme illustrations from the official event poster.</p><p className="muted" role="status">{selected.length} programme areas</p>
  <div className="programme-grid">{selected.map(p=>{const order=programmes.indexOf(p)+1;const isCompetition=competitionProgrammes.includes(p.id);return <article className="programme-card" id={p.id} key={p.id}>
   {programmeArtwork[p.id]&&<div className="programme-photo" role="img" aria-label={p.title+' — official programme illustration'} style={{backgroundImage:'url(/images/programmes/official-programme-poster.webp)',backgroundPosition:programmeArtwork[p.id].position,backgroundSize:programmeArtwork[p.id].size}}><span className="programme-photo-number" aria-hidden="true">{String(order).padStart(2,'0')}</span></div>}
   <div className="programme-card-body"><div className="programme-card-label"><p className="eyebrow">{String(order).padStart(2,'0')} / {p.category}</p><span className="programme-area-icon" aria-hidden="true"><ThemeIcon kind={iconFor(p.category)}/></span></div><h2>{p.title}</h2><p>{p.summary}</p><span className="status-pill">{p.status}</span><details><summary>Explore programme details</summary><p>{p.details}</p>{p.audience&&<><h3>Who it is for</h3><p>{p.audience}</p></>}{p.benefits&&<><h3>What to expect</h3><p>{p.benefits}</p></>}{p.speaker&&<p><strong>Speaker:</strong> {p.speaker}</p>}{p.schedule&&<p><strong>Schedule:</strong> {p.schedule}</p>}{p.venue&&<p><strong>Venue:</strong> {p.venue}</p>}<div className="actions">{isCompetition?<a className="button small" href={competitionRegistrationUrl} target="_blank" rel="noopener noreferrer">Continue to competition registration ↗</a>:<Link className="button small" href={'/register?programme='+encodeURIComponent(p.id)}>Register Here ↗</Link>}<a className="text-link" href={whatsAppLink(number,`Hello, I would like to enquire about ${p.title} at Bihar Healthcare Conclave 2026.`)} target="_blank" rel="noopener noreferrer">Programme enquiry ↗</a></div></details></div>
  </article>})}</div>
 </div>;
}
