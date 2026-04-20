// /app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Aryan Portfolio <onboarding@resend.dev>',
      to: process.env.EMAIL_RECIPIENT || 'aryangulhane6@gmail.com',
      subject: `New Contact: ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (data.error) {
      throw new Error(data.error.message);
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Resend error:', errorMessage);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
