import fs from 'node:fs';import path from 'node:path';
const root=process.argv[2];
for(const file of ['app/page.tsx','app/layout.tsx','app/[slug]/page.tsx','app/register/page.tsx','components/register-form.tsx']){
 const target=path.join(root,file);let s=fs.readFileSync(target,'utf8');
 s=s.replaceAll('Free registration is open ↗','Registration Open ↗').replaceAll('Register for free <span>','Register Here <span>').replaceAll('>Register free ↗<','>Register Here ↗<').replaceAll('<strong>Registration is free</strong>','<strong>Registration Open</strong>').replaceAll('Free registration.<br/>','Registration Open.<br/>').replaceAll('Complete free registration ↗','Complete Registration ↗');
 fs.writeFileSync(target,s);
}
console.log('Registration labels updated');

