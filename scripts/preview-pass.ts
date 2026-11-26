import {mkdir,writeFile} from 'node:fs/promises';
import {createDigitalPass} from '../lib/digital-pass';
async function main(){await mkdir('docs/pass-preview',{recursive:true});await writeFile('docs/pass-preview/digital-pass-sample.pdf',await createDigitalPass({reference:'BHC26-SAMPLE-0000-0000-000000000000',fullName:'Akshay Kumar',mobile:'+91 99999 00000',institution:'Sample Healthcare Institution',category:'Hospital Administrators'}));console.log('Sample PDF created using fictional preview details.');}
main().catch(error=>{console.error(error);process.exitCode=1;});
