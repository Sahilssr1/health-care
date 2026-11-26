import { db } from '@/lib/db';
import { clientKey, rateLimit, trustedOrigin } from '@/lib/security';

export async function GET(req: Request) {
  const origin = req.headers.get('origin');
  if (origin && !trustedOrigin(req)) {
    return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  try {
    if (!(await rateLimit('check-email:' + clientKey(req), 60, 600))) {
      return Response.json({ error: 'Too many requests.' }, { status: 429 });
    }

    const { searchParams } = new URL(req.url);
    const email = (searchParams.get('email') || '').trim().toLowerCase();

    if (!email || !email.includes('@')) {
      return Response.json({ exists: false });
    }

    const existing = await db.registration.findUnique({
      where: { email },
      select: { id: true },
    });

    return Response.json({ exists: !!existing });
  } catch (err) {
    console.error('Email verification error:', err);
    return Response.json({ exists: false });
  }
}
