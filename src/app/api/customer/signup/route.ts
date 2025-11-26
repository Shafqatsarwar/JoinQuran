import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

const dataFilePath = path.join(process.cwd(), 'data', 'customers.json');

// Helper to read customers
const getCustomers = () => {
    if (!fs.existsSync(dataFilePath)) {
        // Create data directory if it doesn't exist
        const dataDir = path.dirname(dataFilePath);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        return [];
    }
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    try {
        return JSON.parse(fileContent);
    } catch (parseError) {
        console.error('Failed to parse customers JSON:', parseError);
        return [];
    }
};

interface Customer {
    id: string;
    studentName: string;
    guardianName: string;
    email: string;
    mobile: string;
    city: string;
    country: string;
    gender: string;
    studentAge: number;
    password: string;
    createdAt: string;
    status: string;
    // Learning preferences
    level?: string;
    daysPerWeek?: number;
    preferredTime?: string;
    timezone?: string;
}

// Helper to save customers
const saveCustomers = (customers: Customer[]) => {
    const dataDir = path.dirname(dataFilePath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(customers, null, 2));
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            studentName, guardianName, email, mobile, city, country, gender, studentAge, password,
            level, daysPerWeek, preferredTime, timezone
        } = body;

        // Validate required fields
        if (!studentName || !guardianName || !email || !mobile || !city || !country || !gender || !studentAge || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        // Check if email already exists
        const customers = getCustomers();
        const existingCustomer = customers.find((c: Customer) => c.email.toLowerCase() === email.toLowerCase());
        if (existingCustomer) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new customer
        const newCustomer: Customer = {
            id: Date.now().toString(),
            studentName,
            guardianName,
            email: email.toLowerCase(),
            mobile,
            city,
            country,
            gender,
            studentAge: Number(studentAge),
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            status: 'active',
            // Learning preferences (optional)
            level: level || undefined,
            daysPerWeek: daysPerWeek ? Number(daysPerWeek) : undefined,
            preferredTime: preferredTime || undefined,
            timezone: timezone || undefined,
        };

        customers.push(newCustomer);
        saveCustomers(customers);

        // Send Email Notification to Admin
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;
        const adminEmail = process.env.NEXT_PUBLIC_EMAIL;

        if (emailUser && emailPass && adminEmail) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: emailUser,
                    pass: emailPass,
                },
            });

            const mailOptions = {
                from: emailUser,
                to: adminEmail,
                subject: `New Student Registration - ${studentName}`,
                text: `
New Student Registration!

Student Name: ${studentName}
Guardian Name: ${guardianName}
Email: ${email}
Mobile: ${mobile}
City: ${city}
Country: ${country}
Gender: ${gender}
Age: ${studentAge}

Registered at: ${new Date().toLocaleString()}
                `,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log('Registration notification email sent.');
            } catch (emailError) {
                console.error('Failed to send email notification:', emailError);
            }
        }

        // Return success (don't send password back)
        const { password: _, ...customerData } = newCustomer;
        return NextResponse.json({
            success: true,
            message: 'Registration successful!',
            customer: customerData
        }, { status: 201 });

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
