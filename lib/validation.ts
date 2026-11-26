import { z } from 'zod';
import { categories } from './content';
import { areaOfInterestOptions,participantGroups,type Programme } from './enhancement-data';
const text = (max:number) => z.string().trim().min(2).max(max);
export const registrationSchema = z.object({fullName:text(100),email:z.string().trim().email().max(254).transform(v=>v.toLowerCase()),mobile:z.string().trim().regex(/^\+?[0-9 ()-]{10,20}$/).transform(v=>v.replace(/[ ()-]/g,'')),city:text(100),category:z.enum(categories),institution:text(200),designation:text(150),interest:z.string().trim().max(500).optional(),consent:z.literal(true),website:z.string().max(0).optional()});
const optionalText=(max:number)=>z.string().trim().max(max).optional().default('');
export function isSingleValidInterest(val: string): boolean {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (!trimmed) return false;
  // Multiple comma-separated selections are strictly disallowed
  if (trimmed.includes(',') && !trimmed.startsWith('Other (')) {
    return false;
  }
  const base = trimmed.startsWith('Other (') ? 'Other' : trimmed;
  return (areaOfInterestOptions as readonly string[]).includes(base);
}

export function enhancedRegistrationSchema(groups:typeof participantGroups,programmes:Programme[]){return registrationSchema.extend({city:text(100),category:text(150),institution:text(200),designation:optionalText(150),interest:z.string().trim().min(1).max(500),participantType:text(100),specialisation:optionalText(150),whatsApp:z.union([registrationSchema.shape.mobile,z.literal('')]).optional().default(''),department:optionalText(150),organisationType:z.enum(['','College','Company','Hospital','Other']).optional().default(''),state:text(100),country:text(100).optional().default('India'),experience:optionalText(100),preferredProgrammes:z.array(z.string().max(80)).max(30).optional().default([]),communicationsConsent:z.boolean().optional().default(false)}).superRefine((r,ctx)=>{const group=groups.find(g=>g.name===r.participantType);if(!group?.categories.includes(r.category))ctx.addIssue({code:'custom',path:['category'],message:'Choose an active category for your participant type.'});if(!isSingleValidInterest(r.interest))ctx.addIssue({code:'custom',path:['interest'],message:'Only ONE Area of Interest selection is permitted per registration.'});if(r.preferredProgrammes.some(id=>!programmes.some(p=>p.id===id&&p.published))||new Set(r.preferredProgrammes).size!==r.preferredProgrammes.length)ctx.addIssue({code:'custom',path:['preferredProgrammes'],message:'Choose published programme areas.'});});}
export function csvCell(value:unknown){const s=String(value??'');return '"'+ (/^[\s]*[=+@-]/.test(s)?"'"+s:s).replace(/"/g,'""')+'"';}
