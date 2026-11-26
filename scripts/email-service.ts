import {spawn} from 'node:child_process';
const delay=(ms:number)=>new Promise(resolve=>setTimeout(resolve,ms));
const jobs=['scripts/email-worker.ts','scripts/competition-email-worker.ts'];
let jobIndex=0;
let stopping=false;let child:ReturnType<typeof spawn>|undefined;
for(const signal of ['SIGTERM','SIGINT'] as const)process.on(signal,()=>{stopping=true;child?.kill(signal);});
async function run(){let failures=0;while(!stopping){const code=await new Promise<number>(resolve=>{child=spawn(process.execPath,['--import','tsx',jobs[jobIndex++%jobs.length]],{stdio:'inherit',env:process.env});child.on('error',()=>resolve(1));child.on('exit',code=>resolve(code??1));});failures=code===0?0:failures+1;if(!stopping)await delay(code===0?5000:Math.min(300000,30000*2**Math.min(failures-1,4)));}}
run().catch(()=>{console.error('Email service unavailable');process.exitCode=1;});
