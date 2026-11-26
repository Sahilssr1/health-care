import {createCipheriv,createDecipheriv,createHash,createHmac,randomBytes} from 'node:crypto';
function key(){const s=process.env.COMPETITION_AUTH_SECRET;if(!s||s.length<64)throw new Error('Competition authentication is not configured');return createHash('sha256').update(s).digest();}
export function codeDigest(id:string,code:string){return createHmac('sha256',key()).update(id+':'+code).digest('hex');}
export function encryptCode(code:string){const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',key(),iv);const data=Buffer.concat([cipher.update(code,'utf8'),cipher.final()]);return Buffer.concat([iv,cipher.getAuthTag(),data]).toString('base64');}
export function decryptCode(value:string){const b=Buffer.from(value,'base64'),decipher=createDecipheriv('aes-256-gcm',key(),b.subarray(0,12));decipher.setAuthTag(b.subarray(12,28));return Buffer.concat([decipher.update(b.subarray(28)),decipher.final()]).toString('utf8');}
