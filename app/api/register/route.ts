import { getContent, publicProgrammes } from '@/lib/managed-content';
import { randomUUID } from 'node:crypto';
import crypto from 'node:crypto';
import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { registrationSchema, enhancedRegistrationSchema } from '@/lib/validation';
import { clientKey, rateLimit, trustedOrigin } from '@/lib/security';
import { generateNextRegistrationId } from '@/lib/registration-id';
import { isPaidInterest } from '@/lib/enhancement-data';

export async function GET() {
  return Response.json({ error: 'Method Not Allowed. Please use POST to submit registration.' }, { status: 405 });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Allow': 'POST, OPTIONS',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req: Request) {
  if (!trustedOrigin(req)) {
    return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  try {
    if (!(await rateLimit('register:' + clientKey(req), 25, 600))) {
      return Response.json({ error: 'Too many attempts. Please try again in ten minutes.' }, { status: 429 });
    }

    const raw = await req.text();
    if (raw.length > 15000) {
      return Response.json({ error: 'Submission is too large.' }, { status: 413 });
    }

    let body: any;
    try {
      body = JSON.parse(raw);
    } catch {
      return Response.json({ error: 'Invalid submission.' }, { status: 400 });
    }

    const [participants, programmes] = await Promise.all([getContent('participants'), publicProgrammes()]);
    const parsed = (body && Object.prototype.hasOwnProperty.call(body, 'participantType')
      ? enhancedRegistrationSchema(participants.data, programmes)
      : registrationSchema
    ).safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: 'Please check all fields, your category and privacy consent.' }, { status: 400 });
    }

    const { consent, website, ...fields } = parsed.data;

    const userInterest = String(fields.interest || '').trim();
    if (userInterest.includes(',') && !userInterest.startsWith('Other (')) {
      return Response.json(
        { error: 'Only ONE Area of Interest selection is permitted per registration. Please submit a separate registration for each activity.' },
        { status: 400 }
      );
    }

    const baseInterest = userInterest.startsWith('Other (') ? 'Other' : userInterest;
    const isPaid = isPaidInterest(baseInterest);

    // Razorpay payment verification
    const razorpayPaymentId = body.razorpay_payment_id;
    const razorpayOrderId = body.razorpay_order_id;
    const razorpaySignature = body.razorpay_signature;
    const paymentFee = typeof body.paymentFee === 'number' ? body.paymentFee : 0;

    let isPaymentVerified = false;
    if (razorpayPaymentId) {
      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      if (!keySecret || !razorpayOrderId || !razorpaySignature) {
        console.error('Payment verification data missing.');
        return Response.json({ error: 'Payment verification failed. Missing transaction signature.' }, { status: 400 });
      }

      const expectedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');

      if (expectedSignature !== razorpaySignature) {
        console.error('Razorpay signature verification failed.');
        return Response.json({ error: 'Payment verification failed. Invalid transaction signature.' }, { status: 400 });
      }

      isPaymentVerified = true;
    }

    // If selected option is paid, require verified payment
    if (isPaid && !isPaymentVerified) {
      return Response.json(
        { error: 'Payment is required to complete registration for this activity.' },
        { status: 402 }
      );
    }

    // Append payment details into specialisation if applicable
    const paymentNote = isPaymentVerified
      ? ` | Fee: ₹${paymentFee} | Txn: ${razorpayPaymentId}`
      : (paymentFee > 0 ? ` | Fee: ₹${paymentFee}` : '');

    const baseSpecialisation = ('specialisation' in fields && typeof (fields as any).specialisation === 'string')
      ? (fields as any).specialisation
      : '';
    const updatedSpecialisation = (baseSpecialisation + paymentNote).slice(0, 150);

    const emailQueued = !!(process.env.SMTP_HOST && process.env.SMTP_FROM);
    const registration = await db.$transaction(async (tx) => {
      // Check if user with this email already registered (idempotency check)
      const existing = await tx.registration.findUnique({
        where: { email: fields.email },
      });
      if (existing) {
        return existing;
      }

      // Generate atomic sequential registration ID: BHC2026-NOV-0001, BHC2026-NOV-0002...
      const reference = await generateNextRegistrationId(tx);

      return tx.registration.create({
        data: {
          ...(fields as any),
          specialisation: updatedSpecialisation,
          registrationStatus: isPaymentVerified ? 'paid' : (paymentFee > 0 ? 'pending_payment' : 'confirmed'),
          reference,
          consentAt: new Date(),
          consentVersion: '2026-10-15',
          emailStatus: emailQueued ? 'pending' : 'not_configured',
        },
      });
    });

    return Response.json(
      {
        reference: registration.reference,
        emailQueued,
        paymentId: razorpayPaymentId || null,
        amountPaid: paymentFee,
        fullName: registration.fullName,
        email: registration.email,
        mobile: registration.mobile,
        institution: registration.institution,
        category: registration.category,
        participantType: registration.participantType,
        interest: registration.interest,
        specialisation: registration.specialisation,
      },
      { status: 201, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return Response.json(
        { error: 'This email is already registered. Contact info@biharhealthcareconclave.com if you need your reference or a correction.' },
        { status: 409 }
      );
    }
    console.error('Registration failed', e instanceof Prisma.PrismaClientKnownRequestError ? e.code : 'service_error');
    return Response.json({ error: 'Registration could not be saved. Please try again later.' }, { status: 503 });
  }
}
