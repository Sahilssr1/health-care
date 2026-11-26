import { PrismaClient } from '@prisma/client';
import { existsSync, readFileSync } from 'node:fs';
import nodemailer from 'nodemailer';
import { decryptCode } from '../lib/competition-crypto';
import { competitionConfigSchema, defaultCompetitionSettings } from '../lib/competition-rules';

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

async function run() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_FROM) throw new Error('SMTP unavailable');
  const password = getSmtpPassword();
  const isSecure = process.env.SMTP_PORT === '465';
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: isSecure,
    requireTLS: !isSecure,
    auth: { user: process.env.SMTP_USER, pass: password },
  });
  await transport.verify();
  await db.participantChallenge.updateMany({
    where: { expiresAt: { lte: new Date() }, codeCiphertext: { not: null } },
    data: { codeCiphertext: null, mailStatus: 'expired' },
  });
  await db.participantSession.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  await db.participantChallenge.updateMany({
    where: { mailStatus: 'sending', mailNextAttempt: { lt: new Date() }, usedAt: null, expiresAt: { gt: new Date() } },
    data: { mailStatus: 'retry' },
  });
  for (let i = 0; i < 20; i++) {
    const c = await db.$transaction(async (tx) => {
      const rows = await tx.$queryRaw<{ id: string }[]>`
        SELECT id FROM "ParticipantChallenge"
        WHERE "mailStatus" IN ('pending','retry')
          AND "mailNextAttempt"<=NOW()
          AND "expiresAt">NOW()
          AND "usedAt" IS NULL
          AND "mailAttempts"<5
        ORDER BY "createdAt"
        LIMIT 1
        FOR UPDATE SKIP LOCKED
      `;
      if (!rows.length) return null;
      return tx.participantChallenge.update({
        where: { id: rows[0].id },
        data: { mailStatus: 'sending', mailAttempts: { increment: 1 }, mailNextAttempt: new Date(Date.now() + 60000) },
      });
    });
    if (!c) break;
    try {
      const r = await db.registration.findUnique({ where: { id: c.registrationId } });
      if (r?.registrationStatus !== 'confirmed' || !c.codeCiphertext) throw new Error('Not eligible');
      const result = await transport.sendMail({
        from: process.env.SMTP_FROM,
        to: r.email,
        subject: 'Bihar Healthcare Conclave — your competition verification code',
        messageId: `<otp-${c.id}@biharhealthcareconclave.com>`,
        text: `Your verification code is ${decryptCode(c.codeCiphertext)}.\n\nIt expires 10 minutes after the request. Use it only at https://biharhealthcareconclave.com/competitions. Do not share this code. If you did not request it, ignore this message.\n\nBihar Healthcare Conclave 2026`,
      });
      if (!result.accepted?.length) throw new Error('Not accepted');
      await db.participantChallenge.updateMany({
        where: { id: c.id, mailStatus: 'sending' },
        data: { mailStatus: 'sent', codeCiphertext: null },
      });
    } catch {
      await db.participantChallenge.updateMany({
        where: { id: c.id, mailStatus: 'sending' },
        data: { mailStatus: c.mailAttempts >= 5 ? 'failed' : 'retry', mailNextAttempt: new Date(Date.now() + 30000 * c.mailAttempts) },
      });
      console.error('Competition code email failed without logging its contents.');
    }
  }
  const config = await db.competitionConfig.findUnique({ where: { id: 'main' } });
  const s = config ? competitionConfigSchema.parse(config.data) : defaultCompetitionSettings;
  await db.competitionEntry.updateMany({ where: { emailStatus: 'sending', emailNextAttempt: { lt: new Date() } }, data: { emailStatus: 'retry' } });
  for (let i = 0; i < 20; i++) {
    const e = await db.$transaction(async (tx) => {
      const rows = await tx.$queryRaw<{ id: string }[]>`
        SELECT id FROM "CompetitionEntry"
        WHERE "emailStatus" IN ('pending','retry')
          AND "emailNextAttempt"<=NOW()
          AND "emailAttempts"<5
        ORDER BY "createdAt"
        LIMIT 1
        FOR UPDATE SKIP LOCKED
      `;
      if (!rows.length) return null;
      return tx.competitionEntry.update({
        where: { id: rows[0].id },
        data: { emailStatus: 'sending', emailAttempts: { increment: 1 }, emailNextAttempt: new Date(Date.now() + 15 * 60000) },
      });
    });
    if (!e) break;
    try {
      const r = await db.registration.findUniqueOrThrow({ where: { id: e.registrationId } });
      const name = e.kind === 'quiz' ? 'Nursing Knowledge Quest 2026' : 'Healthcare Innovation Hackathon 2026';
      const date = e.kind === 'quiz' ? s.quizDate : s.hackDate;
      const result = await transport.sendMail({
        from: process.env.SMTP_FROM,
        to: r.email,
        subject: name + ' — registration saved',
        messageId: `<competition-${e.id}@biharhealthcareconclave.com>`,
        text: `Hello ${r.fullName},\n\nYour ${name} registration is saved.\nCompetition reference: ${e.reference}\n${s.datesProposed ? 'Proposed date (subject to confirmation)' : 'Date'}: ${date}\n${e.teamName ? 'Team: ' + e.teamName + '\n' : ''}\nSign in with this same registered email at https://biharhealthcareconclave.com/competitions to access your quiz or project submission. Final schedules, ranking and award arrangements follow organiser announcements.\n\nContact: info@biharhealthcareconclave.com`,
      });
      if (!result.accepted?.length) throw new Error('Not accepted');
      await db.competitionEntry.update({ where: { id: e.id }, data: { emailStatus: 'sent' } });
    } catch {
      await db.competitionEntry.update({
        where: { id: e.id },
        data: { emailStatus: e.emailAttempts >= 5 ? 'failed' : 'retry', emailNextAttempt: new Date(Date.now() + 60000 * 2 ** e.emailAttempts) },
      });
      console.error('Competition confirmation email failed without logging participant data.');
    }
  }
}
run().catch((err) => {
  console.error('Competition mail worker unavailable:', err?.message || err);
  process.exitCode = 1;
}).finally(() => db.$disconnect());
