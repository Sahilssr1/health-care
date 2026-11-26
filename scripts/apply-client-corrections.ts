import { PrismaClient,Prisma } from '@prisma/client';
import { contentSchemas,initialPartners,initialProgrammes,participantGroups } from '../lib/enhancement-data';

const db=new PrismaClient();
const priority=['qualinova','ima-bihar','tnai'];
const ending=['spark','novastay'];

function orderedPartners(current:typeof initialPartners){
 const updates=new Map(initialPartners.map(partner=>[partner.id,partner]));
 const unique=new Map<string,(typeof initialPartners)[number]>();
 for(const partner of current)if(!unique.has(partner.id))unique.set(partner.id,{...partner,...updates.get(partner.id)});
 for(const partner of initialPartners)if(!unique.has(partner.id))unique.set(partner.id,partner);
 const all=[...unique.values()];
 const institutional=all.filter(partner=>!priority.includes(partner.id)&&!ending.includes(partner.id)&&partner.id!=='startly-innovations'&&/(institutional|strategic)/i.test(partner.role));
 const other=all.filter(partner=>!priority.includes(partner.id)&&!ending.includes(partner.id)&&partner.id!=='startly-innovations'&&!institutional.includes(partner));
 return [...priority.map(id=>unique.get(id)),...institutional,unique.get('startly-innovations'),...other,...ending.map(id=>unique.get(id))].filter((partner):partner is (typeof initialPartners)[number]=>!!partner);
}

async function replace(key:'participants'|'programmes'|'partners',data:Prisma.InputJsonValue,tx:Prisma.TransactionClient){
 const previous=await tx.contentRecord.findUnique({where:{key}});
 if(previous)await tx.contentRecord.update({where:{key},data:{data,revision:{increment:1}}});
 else await tx.contentRecord.create({data:{key,data}});
}

async function main(){await db.$transaction(async tx=>{
 const programmesRecord=await tx.contentRecord.findUnique({where:{key:'programmes'}});
 const programmes=contentSchemas.programmes.parse(programmesRecord?.data??initialProgrammes).map(programme=>programme.id==='nursing-quality-workshop'?{...programme,title:'Workshop on Quality Standards in Healthcare Excellence',summary:'An interactive workshop focused on quality standards, best practices, patient safety and continuous improvement in healthcare excellence.',details:'An interactive workshop focused on quality standards, best practices, patient safety and continuous improvement in healthcare excellence.'}:programme);
 const partnersRecord=await tx.contentRecord.findUnique({where:{key:'partners'}});
 const rawPartners=partnersRecord?.data??initialPartners;
 // Task 05 stored two partner records with `website` and `description`.
 // Normalise that harmless legacy shape before the strict current schema is applied.
 const normalisedPartners=Array.isArray(rawPartners)?rawPartners.map(value=>{
  if(!value||typeof value!=='object'||Array.isArray(value))return value;
  const {website,description,...partner}=value as Record<string,unknown>;
  return {...partner,url:typeof partner.url==='string'?partner.url:typeof website==='string'?website:''};
 }):rawPartners;
 const existingPartners=contentSchemas.partners.parse(normalisedPartners);
 const partners=contentSchemas.partners.parse(orderedPartners(existingPartners));
 await replace('participants',participantGroups as Prisma.InputJsonValue,tx);
 await replace('programmes',programmes as Prisma.InputJsonValue,tx);
 await replace('partners',partners as Prisma.InputJsonValue,tx);
 await tx.audit.create({data:{adminId:'system:client-corrections',action:'apply_client_corrections',target:'Excel registration groups, healthcare quality workshop, organiser partners, TNAI Bihar logo, Startly and partner order'}});
});console.log('Client corrections applied.');}
main().catch(error=>{console.error(error);process.exitCode=1;}).finally(()=>db.$disconnect());
