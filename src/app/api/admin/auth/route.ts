import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        // Get admin credentials from environment variables
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Abcd!234';

        // Validate credentials
        if (username === adminUsername && password === adminPassword) {
            // Create a simple session token (in production, use JWT or proper session management)
            const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString('base64');

            // Return success with session token
            const response = NextResponse.json({
                success: true,
                message: 'Login successful',
                token: sessionToken,
            });

            // Set HTTP-only cookie for session
            response.cookies.set('admin_session', sessionToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });

            return response;
        } else {
            return NextResponse.json(
                { success: false, message: 'Invalid username or password' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, message: 'An error occurred during login' },
            { status: 500 }
        );
    }
}

// Logout endpoint
export async function DELETE(request: NextRequest) {
    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });

    // Clear the session cookie
    response.cookies.delete('admin_session');

    return response;
}
