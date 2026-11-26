import Link from 'next/link';
import { redirect } from 'next/navigation';
import { adminSession } from '@/lib/security';
import { getContent } from '@/lib/managed-content';
import { initialContent,type ContentKey } from '@/lib/enhancement-data';
import { ContentEditor } from '@/components/content-editor';
export const dynamic='force-dynamic';
export const metadata={title:'Website management',robots:{index:false,follow:false}};
export default async function ContentPage(){const session=await adminSession();if(!session)redirect('/admin');if(!['admin','editor'].includes(session.admin.role))redirect('/admin');const records=Object.fromEntries(await Promise.all((Object.keys(initialContent) as ContentKey[]).map(async key=>[key,await getContent(key)]))) as Record<ContentKey,{data:unknown;revision:number}>;return <section className="admin"><Link href="/admin" className="text-link">← Registration dashboard</Link><p className="eyebrow">CONTENT MANAGEMENT</p><h1>Manage your Conclave</h1><ContentEditor records={records}/></section>;}
