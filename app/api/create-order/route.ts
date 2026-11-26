import { clientKey, rateLimit, trustedOrigin } from '@/lib/security';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  if (!trustedOrigin(req)) {
    return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  try {
    if (!(await rateLimit('create-order:' + clientKey(req), 30, 600))) {
      return Response.json({ error: 'Too many requests. Please wait a few minutes.' }, { status: 429 });
    }

    const body = await req.json();
    const { amount, receipt, notes } = body;

    const numAmount = Number(amount);
    if (!numAmount || isNaN(numAmount) || numAmount <= 0) {
      return Response.json({ error: 'Invalid order amount.' }, { status: 400 });
    }

    // Verify email is not already registered before accepting payment
    const userEmail = (notes?.email || body.email || '').toString().trim().toLowerCase();
    if (userEmail) {
      try {
        const existing = await db.registration.findUnique({
          where: { email: userEmail },
          select: { id: true, reference: true },
        });
        if (existing) {
          return Response.json(
            { error: 'This email is already registered. Contact info@biharhealthcareconclave.com if you need your reference or a correction.' },
            { status: 409 }
          );
        }
      } catch (dbErr) {
        console.warn('Could not check existing email in DB (proceeding with order):', dbErr);
      }
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error('Razorpay API keys are not configured in environment.');
      return Response.json({ error: 'Payment gateway configuration is missing on server.' }, { status: 500 });
    }

    // Convert amount in Rupees to Paise (e.g. 250 -> 25000)
    const amountInPaise = Math.round(numAmount * 100);

    const authHeader = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    // Clean notes for Razorpay (max 15 keys, max 255 chars per value)
    const cleanNotes: Record<string, string> = {};
    if (notes && typeof notes === 'object') {
      for (const [k, v] of Object.entries(notes).slice(0, 15)) {
        if (typeof v === 'string' || typeof v === 'number') {
          cleanNotes[String(k).slice(0, 40)] = String(v).slice(0, 255);
        }
      }
    }

    const safeReceipt = (receipt ? String(receipt) : `rec_${Date.now()}`).slice(0, 40);

    const razorpayRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'User-Agent': 'BHC2026-Payment/1.0',
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        receipt: safeReceipt,
        notes: cleanNotes,
      }),
    });

    const rawResponse = await razorpayRes.text();
    let orderData: any = {};
    try {
      orderData = JSON.parse(rawResponse);
    } catch {
      orderData = { error: { description: rawResponse.slice(0, 200) } };
    }

    if (!razorpayRes.ok) {
      console.error('Razorpay order creation error:', orderData);
      return Response.json(
        { error: orderData.error?.description || orderData.error?.reason || 'Could not initiate payment with Razorpay. Please retry.' },
        { status: 502 }
      );
    }

    return Response.json({
      orderId: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
      keyId,
    });
  } catch (err: any) {
    console.error('Order creation unexpected error:', err);
    return Response.json({ error: err?.message || 'Failed to create payment order. Please retry.' }, { status: 500 });
  }
}
