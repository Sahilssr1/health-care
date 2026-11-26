import { randomBytes, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import { cookies } from 'next/headers';
import { db } from './db';
export const hash = (s:string) => createHash('sha256').update(s).digest('hex');
export function passwordHash(password:string){const salt=randomBytes(32).toString('hex');return salt+':'+scryptSync(password,salt,64).toString('hex');}
export function verifyPassword(password:string,stored:string){try{const [salt,key]=stored.split(':');const a=Buffer.from(key,'hex'), b=scryptSync(password,salt,64);return a.length===b.length&&timingSafeEqual(a,b);}catch{return false;}}
export async function adminSession(){const token=(await cookies()).get('bhc_session')?.value;if(!token)return null;const session=await db.session.findUnique({where:{tokenHash:hash(token)},include:{admin:true}});return session&&session.expiresAt>new Date()?session:null;}
function isAllowedOrigin(testOrigin: string): boolean {
  try {
    const url = new URL(testOrigin);
    const host = url.hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1') return true;
    if (host === 'biharhealthcareconclave.com' || host.endsWith('.biharhealthcareconclave.com')) return true;
    const appOrigin = process.env.APP_ORIGIN;
    if (appOrigin) {
      const cfgUrl = new URL(appOrigin);
      if (url.origin === cfgUrl.origin) return true;
      if (host.replace(/^www\./, '') === cfgUrl.hostname.replace(/^www\./, '')) return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function trustedOrigin(req: Request) {
  const reqOrigin = req.headers.get('origin');
  if (reqOrigin) {
    return isAllowedOrigin(reqOrigin);
  }
  const referer = req.headers.get('referer');
  if (referer) {
    try {
      return isAllowedOrigin(new URL(referer).origin);
    } catch {
      return false;
    }
  }
  return false;
}
export function clientKey(req:Request){const ip=process.env.TRUST_PROXY==='true'?req.headers.get('x-real-ip')??'unknown':'local';return hash(ip);}
export async function rateLimit(key:string,limit:number,seconds:number){
 try{
  const rows = await db.$queryRaw<{count:number}[]>`INSERT INTO "RateLimit" ("key","count","resetAt") VALUES (${key},1,NOW()+${seconds}*INTERVAL '1 second') ON CONFLICT ("key") DO UPDATE SET "count"=CASE WHEN "RateLimit"."resetAt" < NOW() THEN 1 ELSE "RateLimit"."count"+1 END,"resetAt"=CASE WHEN "RateLimit"."resetAt" < NOW() THEN NOW()+${seconds}*INTERVAL '1 second' ELSE "RateLimit"."resetAt" END RETURNING "count"`;
  return rows[0].count<=limit;
 }catch(err){
  console.warn('Rate limit bypass notice:', err);
  return true;
 }
}
