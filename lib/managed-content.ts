import { cache } from 'react';
import { db } from './db';
import { contentSchemas,initialContent,type ContentKey } from './enhancement-data';
export const getContent=cache(async <K extends ContentKey>(key:K):Promise<{data:typeof initialContent[K];revision:number}>=>{
 try{const record=await db.contentRecord.findUnique({where:{key}});if(record){const parsed=contentSchemas[key].safeParse(record.data);if(parsed.success)return {data:parsed.data as typeof initialContent[K],revision:record.revision};}}
 catch{console.error('Managed content unavailable:',key);}
 return {data:initialContent[key],revision:0};
});
export async function publicProgrammes(){return (await getContent('programmes')).data.filter(p=>p.published);}
