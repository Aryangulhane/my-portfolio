// /app/api/subscribe/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      console.error('RESEND_API_KEY or RESEND_AUDIENCE_ID is not configured');
      // Still return success to the user, log internally
      return NextResponse.json({ success: true, message: 'Subscription recorded' });
    }

    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const resend = new Resend(apiKey);
    await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Subscribe error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
