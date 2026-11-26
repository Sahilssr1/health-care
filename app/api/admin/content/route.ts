import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { adminSession,trustedOrigin } from '@/lib/security';
import { db } from '@/lib/db';
import { contentSchemas,type ContentKey } from '@/lib/enhancement-data';
const requestSchema=z.object({key:z.enum(['pages','programmes','participants','partners','socials','settings','speakers']),revision:z.number().int().min(0),data:z.unknown()}).strict();
export async function POST(req:Request){
 if(!trustedOrigin(req))return Response.json({error:'Invalid origin.'},{status:403});
 const session=await adminSession();if(!session)return Response.json({error:'Sign in again.'},{status:401});
 if(!['admin','editor'].includes(session.admin.role))return Response.json({error:'Content editing is not permitted for this role.'},{status:403});
 const raw=await req.text();if(raw.length>150000)return Response.json({error:'Content is too large.'},{status:413});
 let value;try{value=JSON.parse(raw);}catch{return Response.json({error:'Invalid submission.'},{status:400});}
 const input=requestSchema.safeParse(value);if(!input.success)return Response.json({error:'Invalid content request.'},{status:400});
 const {key,revision}=input.data;const parsed=contentSchemas[key as ContentKey].safeParse(input.data.data);
 if(!parsed.success)return Response.json({error:parsed.error.issues.map(i=>`${i.path.join('.')}: ${i.message}`).join('; ').slice(0,1200)},{status:400});
 try{await db.$transaction(async tx=>{
  const data=parsed.data as Prisma.InputJsonValue;
  if(revision===0)await tx.contentRecord.create({data:{key,data}});
  else {const update=await tx.contentRecord.updateMany({where:{key,revision},data:{data,revision:{increment:1},updatedAt:new Date()}});if(update.count!==1)throw new Error('conflict');}
  await tx.audit.create({data:{adminId:session.adminId,action:'content_update',target:`${key}:revision:${revision+1}`}});
 });return Response.json({revision:revision+1},{headers:{'Cache-Control':'no-store'}});
 }catch(error){if(error instanceof Error&&error.message==='conflict'||error instanceof Prisma.PrismaClientKnownRequestError&&error.code==='P2002')return Response.json({error:'Someone else saved changes. Reload this page before editing again.'},{status:409});console.error('Content update failed');return Response.json({error:'Changes were not saved. Please retry.'},{status:503});}
}
