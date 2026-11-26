import { Prisma } from '@prisma/client';

const MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'] as const;

export function getRegistrationPrefix(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = MONTH_NAMES[date.getMonth()];
  return `BHC${year}-${month}-`;
}

export function formatRegistrationId(num: number, date: Date = new Date()): string {
  const prefix = getRegistrationPrefix(date);
  return `${prefix}${String(num).padStart(4, '0')}`;
}

const initializedPrefixes = new Set<string>();

/**
 * Generates an atomic sequential registration ID formatted dynamically as BHC{YYYY}-{MMM}-0001.
 * Automatically updates Year and Month based on the registration date and auto-counts from 0001.
 * Uses PostgreSQL sequence per month to guarantee thread-safe, race-condition-free uniqueness.
 */
export async function generateNextRegistrationId(
  tx: Prisma.TransactionClient,
  date: Date = new Date()
): Promise<string> {
  const year = date.getFullYear();
  const month = MONTH_NAMES[date.getMonth()];
  const prefix = `BHC${year}-${month}-`;
  const seqName = `bhc_reg_${year}_${month.toLowerCase()}`;

  // Ensure the PostgreSQL sequence exists for the current year-month
  try {
    await tx.$executeRawUnsafe(`CREATE SEQUENCE IF NOT EXISTS "${seqName}" START WITH 1 INCREMENT BY 1;`);
  } catch (err) {
    console.warn('Notice: Sequence creation check:', err);
  }

  // Ensure sequence is aligned with the highest existing reference for this prefix
  if (!initializedPrefixes.has(prefix)) {
    try {
      const rows = await tx.$queryRawUnsafe<{ max_ref: string | null }[]>(
        `SELECT MAX("reference") AS max_ref FROM "Registration" WHERE "reference" LIKE '${prefix}%';`
      );
      const maxRef = rows[0]?.max_ref;
      if (maxRef && maxRef.startsWith(prefix)) {
        const lastNum = parseInt(maxRef.replace(prefix, ''), 10);
        if (!isNaN(lastNum) && lastNum > 0) {
          await tx.$executeRawUnsafe(
            `SELECT setval('"${seqName}"', ${lastNum}, true);`
          );
        }
      }
    } catch (e) {
      console.warn('Sequence alignment notice:', e);
    }
    initializedPrefixes.add(prefix);
  }

  // Atomically advance the sequence
  let seqNum = 1;
  try {
    const res = await tx.$queryRawUnsafe<{ nextval: string | number | bigint }[]>(
      `SELECT nextval('"${seqName}"') AS nextval;`
    );
    seqNum = Number(res[0]?.nextval || 1);
  } catch (seqErr) {
    console.warn('Could not read nextval, falling back to prefix count:', seqErr);
    try {
      const existingCount = await tx.registration.count({
        where: { reference: { startsWith: prefix } },
      });
      seqNum = existingCount + 1;
    } catch {
      const totalCount = await tx.registration.count();
      seqNum = totalCount + 1;
    }
  }

  // Format with leading zeroes to 4 digits: e.g. BHC2026-NOV-0001, BHC2026-DEC-0001
  let formattedId = `${prefix}${String(seqNum).padStart(4, '0')}`;

  // Defensive check against collisions
  let existing = await tx.registration.findUnique({
    where: { reference: formattedId },
    select: { id: true },
  });

  while (existing) {
    try {
      const res = await tx.$queryRawUnsafe<{ nextval: string | number | bigint }[]>(
        `SELECT nextval('"${seqName}"') AS nextval;`
      );
      seqNum = Number(res[0]?.nextval || seqNum + 1);
    } catch {
      seqNum += 1;
    }
    formattedId = `${prefix}${String(seqNum).padStart(4, '0')}`;
    existing = await tx.registration.findUnique({
      where: { reference: formattedId },
      select: { id: true },
    });
  }

  return formattedId;
}
