import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const { to, subject, text, html } = await request.json();

        // Get email configuration from environment variables
        const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
        const smtpPort = parseInt(process.env.SMTP_PORT || '587');
        const smtpUser = process.env.SMTP_USER;
        const smtpPassword = process.env.SMTP_PASSWORD;
        const emailFrom = process.env.EMAIL_FROM || process.env.NEXT_PUBLIC_EMAIL || 'onlinequran50@gmail.com';

        // Check if SMTP credentials are configured
        if (!smtpUser || !smtpPassword) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Email configuration is incomplete. Please set SMTP_USER and SMTP_PASSWORD in your environment variables.'
                },
                { status: 500 }
            );
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465, // true for 465, false for other ports
            auth: {
                user: smtpUser,
                pass: smtpPassword,
            },
        });

        // Send email
        const info = await transporter.sendMail({
            from: `"JoinQuran" <${emailFrom}>`,
            to,
            subject,
            text,
            html: html || text,
        });

        console.log('Email sent:', info.messageId);

        return NextResponse.json({
            success: true,
            message: 'Email sent successfully',
            messageId: info.messageId,
        });
    } catch (error: any) {
        console.error('Email sending error:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || 'Failed to send email'
            },
            { status: 500 }
        );
    }
}
