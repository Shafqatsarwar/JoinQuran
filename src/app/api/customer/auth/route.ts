import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const dataFilePath = path.join(process.cwd(), 'data', 'customers.json');

// Helper to read customers
const getCustomers = () => {
    if (!fs.existsSync(dataFilePath)) {
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
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        // Validate required fields
        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Get customers
        const customers = getCustomers();

        // Find customer by email
        const customer = customers.find((c: Customer) => c.email.toLowerCase() === email.toLowerCase());

        if (!customer) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Check if account is active
        if (customer.status !== 'active') {
            return NextResponse.json({ error: 'Account is not active' }, { status: 401 });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, customer.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Generate a simple token (in production, use JWT)
        const token = Buffer.from(`${customer.id}:${Date.now()}`).toString('base64');

        // Return success with customer data (without password)
        const { password: _, ...customerData } = customer;

        return NextResponse.json({
            success: true,
            message: 'Login successful',
            token,
            customer: customerData
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
