import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'students.json');

// GET - Fetch all students
export async function GET() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        const students = JSON.parse(data);
        return NextResponse.json(students);
    } catch (error) {
        console.error('Error reading students:', error);
        return NextResponse.json([]);
    }
}

// POST - Add new student
export async function POST(request: NextRequest) {
    try {
        const newStudent = await request.json();

        // Read existing students
        let students = [];
        try {
            const data = await fs.readFile(DATA_FILE, 'utf-8');
            students = JSON.parse(data);
        } catch (error) {
            // File doesn't exist or is empty
            students = [];
        }

        // Add new student with ID and timestamp
        const student = {
            id: Date.now().toString(),
            ...newStudent,
            registrationDate: new Date().toISOString(),
        };

        students.push(student);

        // Write back to file
        await fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2));

        return NextResponse.json({ success: true, student });
    } catch (error) {
        console.error('Error adding student:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to add student' },
            { status: 500 }
        );
    }
}

// PUT - Update student
export async function PUT(request: NextRequest) {
    try {
        const updatedStudent = await request.json();

        const data = await fs.readFile(DATA_FILE, 'utf-8');
        let students = JSON.parse(data);

        const index = students.findIndex((s: any) => s.id === updatedStudent.id);
        if (index !== -1) {
            students[index] = { ...students[index], ...updatedStudent };
            await fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2));
            return NextResponse.json({ success: true, student: students[index] });
        }

        return NextResponse.json(
            { success: false, message: 'Student not found' },
            { status: 404 }
        );
    } catch (error) {
        console.error('Error updating student:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update student' },
            { status: 500 }
        );
    }
}

// DELETE - Remove student
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'Student ID is required' },
                { status: 400 }
            );
        }

        const data = await fs.readFile(DATA_FILE, 'utf-8');
        let students = JSON.parse(data);

        students = students.filter((s: any) => s.id !== id);
        await fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting student:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete student' },
            { status: 500 }
        );
    }
}
