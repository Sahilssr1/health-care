import { existsSync, readFileSync } from 'node:fs';
import nodemailer from 'nodemailer';

function getSmtpPassword(): string {
  if (process.env.SMTP_PASSWORD_FILE) {
    try {
      if (existsSync(process.env.SMTP_PASSWORD_FILE)) {
        const fileContent = readFileSync(process.env.SMTP_PASSWORD_FILE, 'utf8').trim();
        if (fileContent) return fileContent;
      }
    } catch {}
  }
  return process.env.SMTP_PASSWORD || '';
}

async function testSmtp() {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER || 'info@biharhealthcareconclave.com';
  const pass = getSmtpPassword();
  const from = process.env.SMTP_FROM || `Bihar Healthcare Conclave <${user}>`;

  console.log('=== BHC2026 SMTP DIAGNOSTIC ===');
  console.log('Host:', host);
  console.log('Port:', port);
  console.log('User:', user);
  console.log('From:', from);
  console.log('Password length:', pass ? `${pass.length} chars` : '0 (MISSING/EMPTY)');

  if (!pass) {
    console.error('\n❌ ERROR: SMTP Password is empty!');
    console.error('Please either:');
    console.error('  1. Add SMTP_PASSWORD="your-email-password" in /opt/bhc2026/source/.env');
    console.error('  2. OR write it into /opt/bhc2026/secrets/smtp-password');
    process.exit(1);
  }

  const isSecure = port === 465;
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    requireTLS: !isSecure,
    auth: { user, pass },
  });

  try {
    console.log('\nConnecting to Hostinger mail server and verifying credentials...');
    await transport.verify();
    console.log('✅ SUCCESS: SMTP server accepted credentials! Connection verified.');
  } catch (err: any) {
    console.error('\n❌ FAILURE: Could not connect or authenticate with SMTP server!');
    console.error('Error Code:', err.code);
    console.error('Response:', err.response || err.message);
  }
}

testSmtp();
