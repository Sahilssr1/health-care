import sharp from 'sharp';
import {mkdir} from 'node:fs/promises';
await mkdir('assets/pass',{recursive:true});
const source=sharp('public/logos/conclave.png');const meta=await source.metadata();
await source.extract({left:Math.round(meta.width*.05),top:Math.round(meta.height*.31875),width:Math.round(meta.width*.9125),height:Math.round(meta.height*.340625)}).resize({width:1100}).png().toFile('assets/pass/conclave.png');
for(const [name,file] of [['qualinova','qualinova.jpg'],['spark','spark.png'],['novastay','novastay.png']])await sharp('public/logos/'+file).resize({width:500,height:180,fit:'inside',withoutEnlargement:true}).png().toFile('assets/pass/'+name+'.png');
console.log('Private pass logo derivatives prepared. Original assets remain unchanged.');
