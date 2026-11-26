import { confirmationMessage } from '../lib/confirmation-message';
import { existsSync, readFileSync } from 'node:fs';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const db = new PrismaClient();

function getSmtpPassword(): string {
  if (process.env.SMTP_PASSWORD_FILE) {
    try {
      if (existsSync(process.env.SMTP_PASSWORD_FILE)) {
        const fileContent = readFileSync(process.env.SMTP_PASSWORD_FILE, 'utf8').trim();
        if (fileContent) return fileContent;
      }
    } catch {
      console.warn('Could not read SMTP_PASSWORD_FILE, falling back to SMTP_PASSWORD');
    }
  }
  return process.env.SMTP_PASSWORD || '';
}

async function main() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_FROM) {
    throw new Error('SMTP configuration required (SMTP_HOST and SMTP_FROM must be set)');
  }

  const password = getSmtpPassword();
  if (!password && process.env.SMTP_USER) {
    console.error('WARNING: SMTP password is not set in SMTP_PASSWORD or SMTP_PASSWORD_FILE');
  }

  const isSecure = process.env.SMTP_PORT === '465';
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: isSecure,
    requireTLS: !isSecure,
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: password,
        }
      : undefined,
  });

  await transport.verify();
  console.log('[Email Worker] SMTP connection verified successfully with host:', process.env.SMTP_HOST);

  // Automatically reset any stuck 'sending', 'not_configured', or delayed 'retry' items so they dispatch immediately
  await db.registration.updateMany({
    where: { emailStatus: { in: ['sending', 'not_configured'] } },
    data: { emailStatus: 'pending', emailNextAttempt: new Date() },
  });
  await db.registration.updateMany({
    where: { emailStatus: 'retry' },
    data: { emailNextAttempt: new Date() },
  });

  let sentCount = 0;
  for (let processed = 0; processed < 20; processed++) {
    const claimed = await db.$transaction(async (tx) => {
      const records = await tx.$queryRaw<{ id: string }[]>`
        SELECT id FROM "Registration"
        WHERE "emailStatus" IN ('pending', 'retry')
          AND "emailAttempts" < 5
        ORDER BY "createdAt"
        LIMIT 1
        FOR UPDATE SKIP LOCKED
      `;
      if (!records.length) return null;
      return tx.registration.update({
        where: { id: records[0].id },
        data: {
          emailStatus: 'sending',
          emailAttempts: { increment: 1 },
          emailNextAttempt: new Date(Date.now() + 15 * 60000),
        },
      });
    });

    if (!claimed) break;

    console.log(`[Email Worker] Processing pass generation & delivery for ${claimed.reference} (${claimed.email})...`);

    try {
      const { passVersion, ...message } = await confirmationMessage({
        ...claimed,
        interest: claimed.interest ?? undefined,
      });

      const result = await transport.sendMail({
        from: process.env.SMTP_FROM,
        to: claimed.email,
        replyTo: process.env.SMTP_USER,
        ...message,
      });

      if (!result.accepted?.length) {
        throw new Error('SMTP did not accept the confirmation');
      }

      await db.registration.update({
        where: { id: claimed.id },
        data: {
          emailStatus: 'sent',
          googleVersion: { increment: 1 },
          googleStatus: 'pending',
          googleNextAttempt: new Date(),
        },
      });

      sentCount++;
      console.log(`[Email Worker] ✅ Successfully sent digital pass to: ${claimed.email} (${claimed.reference})`);
    } catch (err) {
      await db.registration.update({
        where: { id: claimed.id },
        data: {
          googleVersion: { increment: 1 },
          googleStatus: 'pending',
          googleNextAttempt: new Date(),
          emailStatus: claimed.emailAttempts >= 5 ? 'failed' : 'retry',
          emailNextAttempt: new Date(Date.now() + Math.min(3600000, 60000 * 2 ** claimed.emailAttempts)),
        },
      });
      console.error(`[Email Worker] ❌ Delivery failed for ${claimed.email}:`, err instanceof Error ? err.message : err);
    }
  }

  if (sentCount === 0) {
    console.log('[Email Worker] No pending registrations waiting in the queue. All registrations have been processed.');
  }
}

main()
  .catch((err) => {
    console.error('[Email Worker] Service error:', err?.message || err);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
