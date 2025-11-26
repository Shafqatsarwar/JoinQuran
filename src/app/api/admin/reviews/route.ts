import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'reviews.json');

// GET - Fetch all reviews
export async function GET() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        const reviews = JSON.parse(data);
        return NextResponse.json(reviews);
    } catch (error) {
        console.error('Error reading reviews:', error);
        return NextResponse.json([]);
    }
}

// POST - Add new review
export async function POST(request: NextRequest) {
    try {
        const newReview = await request.json();

        // Read existing reviews
        let reviews = [];
        try {
            const data = await fs.readFile(DATA_FILE, 'utf-8');
            reviews = JSON.parse(data);
        } catch (error) {
            reviews = [];
        }

        // Add new review with ID and timestamp
        const review = {
            id: Date.now().toString(),
            ...newReview,
            date: new Date().toISOString(),
            status: newReview.status || 'pending',
        };

        reviews.push(review);

        // Write back to file
        await fs.writeFile(DATA_FILE, JSON.stringify(reviews, null, 2));

        return NextResponse.json({ success: true, review });
    } catch (error) {
        console.error('Error adding review:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to add review' },
            { status: 500 }
        );
    }
}

// PUT - Update review (approve/reject)
export async function PUT(request: NextRequest) {
    try {
        const updatedReview = await request.json();

        const data = await fs.readFile(DATA_FILE, 'utf-8');
        let reviews = JSON.parse(data);

        const index = reviews.findIndex((r: any) => r.id === updatedReview.id);
        if (index !== -1) {
            reviews[index] = { ...reviews[index], ...updatedReview };
            await fs.writeFile(DATA_FILE, JSON.stringify(reviews, null, 2));
            return NextResponse.json({ success: true, review: reviews[index] });
        }

        return NextResponse.json(
            { success: false, message: 'Review not found' },
            { status: 404 }
        );
    } catch (error) {
        console.error('Error updating review:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update review' },
            { status: 500 }
        );
    }
}

// DELETE - Remove review
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'Review ID is required' },
                { status: 400 }
            );
        }

        const data = await fs.readFile(DATA_FILE, 'utf-8');
        let reviews = JSON.parse(data);

        reviews = reviews.filter((r: any) => r.id !== id);
        await fs.writeFile(DATA_FILE, JSON.stringify(reviews, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting review:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete review' },
            { status: 500 }
        );
    }
}
