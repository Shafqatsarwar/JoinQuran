import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const dataFilePath = path.join(process.cwd(), 'data', 'reviews.json');

// Helper to read reviews
const getReviews = () => {
    if (!fs.existsSync(dataFilePath)) {
        return [];
    }
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    try {
        return JSON.parse(fileContent);
    } catch (parseError) {
        console.error('Failed to parse reviews JSON:', parseError);
        return [];
    }
};

interface Review {
    id: string;
    name: string;
    rating: number;
    comment: string;
    date: string;
}

// Helper to save reviews
const saveReviews = (reviews: Review[]) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(reviews, null, 2));
};

export async function GET() {
    const reviews = getReviews();
    return NextResponse.json(reviews);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, rating, comment } = body;

        if (!name || !rating || !comment) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newReview = {
            id: Date.now().toString(),
            name,
            rating: Number(rating),
            comment,
            date: new Date().toISOString(),
        };

        const reviews = getReviews();
        reviews.unshift(newReview); // Add to top
        saveReviews(reviews);

        // Send Email Notification
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;
        const adminEmail = process.env.NEXT_PUBLIC_EMAIL;

        if (emailUser && emailPass && adminEmail) {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Or use host/port for other providers
                auth: {
                    user: emailUser,
                    pass: emailPass,
                },
            });

            const mailOptions = {
                from: emailUser,
                to: adminEmail,
                subject: `New Review from ${name}`,
                text: `
          New Review Received!
          
          Name: ${name}
          Rating: ${rating}/5
          Comment: ${comment}
          
          Check the reviews page to see it live.
        `,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log('Review notification email sent.');
            } catch (emailError) {
                console.error('Failed to send email notification:', emailError);
                // Don't fail the request if email fails, just log it
            }
        } else {
            console.log('Email credentials missing, skipping notification.');
        }

        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        console.error('Error saving review:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
