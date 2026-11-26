import type {MetadataRoute} from 'next';import {pages} from '@/lib/content';
export default function sitemap():MetadataRoute.Sitemap{const origin=process.env.APP_ORIGIN||'https://biharhealthcareconclave.com';return [...new Set(['',...Object.keys(pages),'register','competitions','partners','faq','privacy','terms'])].map(slug=>({url:new URL('/'+slug,origin).toString()}));}
