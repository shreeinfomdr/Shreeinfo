import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, phone, email, subject, message } = await req.json();

    // Create a transporter using basic SMTP details (or you can use a service like Gmail/SendGrid)
    // For Gmail, use an App Password if 2FA is enabled.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shreeinfo.mdr@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password-here', // Ideally stored in .env.local
      },
    });

    const mailOptions = {
      from: email || 'shreeinfo.mdr@gmail.com',
      to: 'shreeinfo.mdr@gmail.com',
      subject: `New Inquiry from Website: ${subject || 'No Subject'}`,
      text: `
        Name: ${name}
        Phone: ${phone}
        Email: ${email || 'N/A'}
        Subject: ${subject || 'N/A'}
        
        Message:
        ${message || 'No message provided.'}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email.' }, { status: 500 });
  }
}
