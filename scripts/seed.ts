import { PrismaClient,Prisma } from '@prisma/client';
import { initialContent } from '../lib/enhancement-data';
const db=new PrismaClient();
async function main(){try{const result=await db.contentRecord.createMany({data:Object.entries(initialContent).map(([key,data])=>({key,data:data as Prisma.InputJsonValue})),skipDuplicates:true});console.log(`Created ${result.count} missing content collections. Existing content and registrations were preserved.`);}finally{await db.$disconnect();}

}
main().catch(()=>{console.error('Content seed failed.');process.exitCode=1;});
