import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (!lat || !lng) {
        return NextResponse.json(
            { error: 'Missing latitude or longitude' },
            { status: 400 }
        );
    }

    try {
        const today = new Date();
        const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

        // Using Aladhan API with Islamic World League calculation method (method=2)
        const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=2`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.code === 200) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json(
                { error: 'Failed to fetch prayer times' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Prayer times API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
