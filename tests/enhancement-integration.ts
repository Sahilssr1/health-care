import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import { passwordHash } from '../lib/security';
import { initialContent } from '../lib/enhancement-data';
if(!process.env.DATABASE_URL?.includes('/bhc_test?'))throw new Error('Only the isolated bhc_test database is allowed.');
const db=new PrismaClient(),base='http://localhost:3000',tag=randomBytes(8).toString('hex');
const email=`enhancement-${tag}@example.invalid`;const adminIds:string[]=[];
const jsonHeaders={'Content-Type':'application/json',Origin:base};

async function login(role:string){const password=randomBytes(24).toString('hex');const admin=await db.admin.create({data:{email:`${role}-${tag}@example.invalid`,passwordHash:passwordHash(password),role}});adminIds.push(admin.id);const response=await fetch(base+'/api/admin/login',{method:'POST',headers:jsonHeaders,body:JSON.stringify({email:admin.email,password})});assert.equal(response.status,200);return response.headers.get('set-cookie')!.split(';')[0];}
async function main(){const original=await db.contentRecord.findUnique({where:{key:'programmes'}});try{
 await db.rateLimit.deleteMany();
 const participant={fullName:'Enhancement Test',email,mobile:'+91 9999999999',city:'Patna',participantType:'Students & Academic Institutions',category:'Engineering Students',specialisation:'Biomedical AI',department:'Engineering',state:'Bihar',country:'India',experience:'Second year',preferredProgrammes:['innovation-hackathon'],communicationsConsent:true,consent:true};
 const response=await fetch(base+'/api/register',{method:'POST',headers:jsonHeaders,body:JSON.stringify(participant)});assert.equal(response.status,201);const saved=await db.registration.findUniqueOrThrow({where:{email}});assert.equal(saved.specialisation,'Biomedical AI');assert.equal(saved.institution,'');assert.deepEqual(saved.preferredProgrammes,['innovation-hackathon']);assert.equal(saved.communicationsConsent,true);assert.equal(saved.consentVersion,'2026-10-15');
 assert.equal((await fetch(base+'/api/register',{method:'POST',headers:jsonHeaders,body:JSON.stringify(participant)})).status,409);
 console.log('PASS expanded registration persists fields, consent and programme interests; duplicate rejected');
 const adminCookie=await login('admin'),editorCookie=await login('editor'),viewerCookie=await login('viewer');
 const payload={key:'programmes',revision:original?.revision||0,data:initialContent.programmes.map(p=>({...p,published:p.id!=='motivational-lecture'}))};
 const mutate=(cookie:string,body:unknown,origin=base)=>fetch(base+'/api/admin/content',{method:'POST',headers:{...jsonHeaders,Origin:origin,Cookie:cookie},body:JSON.stringify(body)});
 assert.equal((await mutate('',payload)).status,401);assert.equal((await mutate(viewerCookie,payload)).status,403);assert.equal((await mutate(adminCookie,payload,'https://evil.invalid')).status,403);assert.equal((await mutate(editorCookie,{...payload,data:[{title:'bad'}]})).status,400);
 const save=await mutate(editorCookie,payload);assert.equal(save.status,200);assert.equal((await mutate(adminCookie,payload)).status,409);
 const programmeHtml=await (await fetch(base+'/programme')).text();assert.ok(!programmeHtml.includes('<h2>Motivational Lecture</h2>'));assert.ok(programmeHtml.includes('Felicitation of Renowned and Experienced Senior Medical Professionals from Bihar'));
 assert.equal((await fetch(base+'/api/register',{method:'POST',headers:jsonHeaders,body:JSON.stringify({...participant,email:`draft-${tag}@example.invalid`,preferredProgrammes:['motivational-lecture']})})).status,400);
 console.log('PASS CMS authentication, role checks, origin validation, schema validation, concurrency and draft exclusion');
 const dashboard=await (await fetch(base+'/admin?city=Patna&programme=innovation-hackathon&category=Engineering%20Students',{headers:{Cookie:adminCookie}})).text();assert.ok(dashboard.includes(email));
 const exported=await fetch(base+'/api/admin/export',{method:'POST',headers:{Origin:base,Cookie:adminCookie},body:new URLSearchParams({q:email,programme:'innovation-hackathon'})});assert.equal(exported.status,200);const csv=await exported.text();assert.ok(csv.includes('Biomedical AI'));assert.ok(csv.includes('Event communications consent'));assert.ok(csv.includes('Second year'));
 assert.equal((await fetch(base+'/api/admin/export',{method:'POST',headers:{Origin:base,Cookie:viewerCookie},body:new URLSearchParams()})).status,403);
 const status=await fetch(base+'/api/admin/status',{method:'POST',headers:{Origin:base,Cookie:adminCookie},body:new URLSearchParams({id:saved.id,status:'waitlisted'}),redirect:'manual'});assert.equal(status.status,303);assert.equal(status.headers.get('location'),'/admin/participants/'+saved.id);assert.equal((await fetch(base+'/api/admin/attendance',{method:'POST',headers:{Origin:base,Cookie:viewerCookie},body:new URLSearchParams({id:saved.id})})).status,403);assert.equal((await fetch(base+'/api/admin/status',{method:'POST',headers:{Origin:base,Cookie:viewerCookie},body:new URLSearchParams({id:saved.id,status:'cancelled'})})).status,403);assert.equal((await db.registration.findUniqueOrThrow({where:{email}})).registrationStatus,'waitlisted');assert.equal(await db.audit.count({where:{adminId:adminIds[0],action:'registration_status'}}),1);
 console.log('PASS expanded report filters, CSV data, viewer restrictions and audited registration status');
}finally{
 await db.registration.deleteMany({where:{email:{in:[email,`draft-${tag}@example.invalid`]}}});
 await db.audit.deleteMany({where:{adminId:{in:adminIds}}});await db.admin.deleteMany({where:{id:{in:adminIds}}});
 if(original)await db.contentRecord.update({where:{key:'programmes'},data:{data:original.data!,revision:original.revision}});else await db.contentRecord.deleteMany({where:{key:'programmes'}});
 await db.rateLimit.deleteMany();await db.$disconnect();
}

}
main().catch((error)=>{console.error('Enhancement check failed:',error instanceof Error?error.message:'unknown error');process.exitCode=1;});
