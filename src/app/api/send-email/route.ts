import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateEmailHTML } from '@/utils/emailTemplate';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, subject, message } = body;

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Hotel am Beatles-Platz" <${process.env.EMAIL_USER}>`,
            to: "tayebhossain88@gmail.com",
            subject: `New Contact Form Submission: ${subject}`,
            html: generateEmailHTML({ firstName, lastName, email, phone, subject, message }),
        });

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error: unknown) {
        console.error('Detailed error:', error);
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: 'Failed to send email', error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}