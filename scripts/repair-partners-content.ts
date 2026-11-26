import { PrismaClient, Prisma } from '@prisma/client';
import { contentSchemas, initialPartners } from '@/lib/enhancement-data';

const db = new PrismaClient();

async function main(){
  await db.$transaction(async tx=>{
    const previous=await tx.contentRecord.findUnique({where:{key:'partners'}});
    const current=previous?contentSchemas.partners.parse(previous.data):initialPartners;
    const wanted=new Map([
      ['ima-bihar',{id:'ima-bihar',name:'Indian Medical Association — Bihar State Branch',role:'Organising Partner',logo:'/logos/ima-bihar.jpg',url:'https://imabihar.org',published:true}],
      ['tnai',{id:'tnai',name:'TNAI — Trained Nurses Association of India, Bihar State Branch',role:'Organising Partner',logo:'/logos/tnai-bihar-state-branch.jpg',url:'https://www.tnaionline.org/',published:true}],
      ['startly-innovations',{id:'startly-innovations',name:'Startly Innovations',role:'Innovation Partner',logo:'/logos/startly-innovations.png',url:'https://startlyinnovations.com/',published:true}],
      ['aicbv',{id:'aicbv',name:'AIC Bihar Vidyapith',role:'Innovation Partner',logo:'/logos/AICBV.png',url:'https://www.aicbvf.edu.in/',published:true}],
    ]);
    const seen=new Set<string>();
    const data=current.map(partner=>{
      const replacement=wanted.get(partner.id);
      if(!replacement)return partner;
      seen.add(partner.id);
      return replacement;
    });
    for(const [id,partner] of wanted)if(!seen.has(id))data.push(partner);
    const validated=contentSchemas.partners.parse(data);
    if(previous){
      const updated=await tx.contentRecord.updateMany({where:{key:'partners',revision:previous.revision},data:{data:validated as Prisma.InputJsonValue,revision:{increment:1}}});
      if(updated.count!==1)throw new Error('Partner content changed concurrently; retry the repair.');
    }else await tx.contentRecord.create({data:{key:'partners',data:validated as Prisma.InputJsonValue}});
    await tx.audit.create({data:{adminId:'system:brand-repair',action:'repair_partners',target:'IMA Bihar and TNAI Bihar Organising Partners, with Startly Innovations Innovation Partner verified'}});
  });
  console.log('Partner content repaired.');
}

main().finally(()=>db.$disconnect());
