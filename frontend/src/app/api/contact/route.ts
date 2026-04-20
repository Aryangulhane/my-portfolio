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
    const { name, email, message, mode, project, budget } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Dynamic subject based on contact mode
    const subjectMap: Record<string, string> = {
      student: `[Student collab] from ${name}`,
      business: `[Business enquiry] from ${name}`,
    };
    const subject = subjectMap[mode] || `[Contact] from ${name}`;

    const data = await resend.emails.send({
      from: 'Aryan Portfolio <onboarding@resend.dev>',
      to: process.env.EMAIL_RECIPIENT || 'aryangulhane6@gmail.com',
      subject,
      replyTo: email,
      html: `
        <h2>${subject}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mode:</strong> ${mode || 'general'}</p>
        ${project ? `<p><strong>Project:</strong> ${project}</p>` : ''}
        ${budget ? `<p><strong>Budget / Timeline:</strong> ${budget}</p>` : ''}
        ${message ? `<p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>` : ''}
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
