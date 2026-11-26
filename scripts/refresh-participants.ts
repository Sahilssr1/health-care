import { PrismaClient } from '@prisma/client';
import { participantGroups } from '../lib/enhancement-data';

const db=new PrismaClient();

async function main(){
  await db.$transaction(async tx=>{
    const existing=await tx.contentRecord.findUnique({where:{key:'participants'}});
    if(existing){
      await tx.contentRecord.update({where:{key:'participants'},data:{data:participantGroups,revision:{increment:1}}});
    }else{
      await tx.contentRecord.create({data:{key:'participants',data:participantGroups}});
    }
    await tx.audit.create({data:{adminId:'system:content-audit',action:'refresh_participant_categories',target:'Replaced Additional Allied Sectors with Allied and retained approved registration categories.'}});
  });
  console.log('Participant categories refreshed.');
}

main().catch(error=>{console.error(error);process.exitCode=1;}).finally(()=>db.$disconnect());
