'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

export function ScrollReveal(){
  const pathname=usePathname();
  useEffect(()=>{
    document.documentElement.dataset.page=pathname;
    const targets=[...document.querySelectorAll<HTMLElement>('main .section, main .partners, main .event-strip, main .competition-home-link, main .bhc25-mentors, main .bhc25-stats-band, main .bhc25-register-cta, main .bhc25-outline-marquee')];
    if(!targets.length)return;
    document.body.classList.add('reveal-ready');
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(entry.isIntersecting){
          (entry.target as HTMLElement).classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      }
    },{threshold:.12,rootMargin:'0px 0px -5%'});
    targets.forEach(target=>observer.observe(target));
    return ()=>{observer.disconnect();document.body.classList.remove('reveal-ready');};
  },[pathname]);
  return null;
}
