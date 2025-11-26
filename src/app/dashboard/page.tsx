'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface CustomerData {
    id: string;
    studentName: string;
    guardianName: string;
    email: string;
    mobile: string;
    city: string;
    country: string;
    gender: string;
    studentAge: number;
    status: string;
    level?: string;
    daysPerWeek?: number;
    preferredTime?: string;
    timezone?: string;
}

export default function StudentDashboard() {
    const [customer, setCustomer] = useState<CustomerData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('customer_token');
        const customerData = localStorage.getItem('customer_data');

        if (!token || !customerData) {
            router.push('/login');
            return;
        }

        try {
            const parsedData = JSON.parse(customerData);
            setCustomer(parsedData);
        } catch (error) {
            console.error('Error parsing customer data:', error);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('customer_token');
        localStorage.removeItem('customer_data');
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#1e293b] flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!customer) {
        return null;
    }

    // Generate registration number from ID
    const registrationNumber = `JQ-${customer.id.slice(-8).toUpperCase()}`;

    // Mock progress data (in production, this would come from an API)
    const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const classesCompleted = 12;
    const totalClasses = customer.daysPerWeek ? customer.daysPerWeek * 4 : 20;
    const attendancePercentage = Math.round((classesCompleted / totalClasses) * 100);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#1e293b]">
            {/* Header */}
            <div className="bg-[#1e293b] shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src="/logo_JoinQuran.jpg" alt="JoinQuran Logo" width={40} height={40} className="rounded-full" />
                        <span className="text-xl font-bold text-white">JoinQuran Portal</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition-all"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Welcome, {customer.studentName}! 👋
                    </h1>
                    <p className="text-gray-300">Here&apos;s your learning dashboard</p>
                </div>

                {/* Notification Bar */}
                <div className="mb-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 shadow-lg">
                    <div className="flex items-start space-x-3">
                        <svg className="w-6 h-6 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <div>
                            <h3 className="text-white font-bold mb-1">📢 Important Announcement</h3>
                            <p className="text-white text-sm">
                                Your next class is scheduled for tomorrow at {customer.preferredTime} {customer.timezone}.
                                Please ensure you&apos;re ready 5 minutes before the session starts.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Enrollment Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Enrollment Information Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">Enrollment Information</h2>
                                <span className={`px-4 py-2 rounded-full text-sm font-bold ${customer.status === 'active'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {customer.status === 'active' ? '✓ Active' : 'Pending'}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Registration Number</p>
                                    <p className="text-lg font-bold text-teal-700">{registrationNumber}</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Learning Level</p>
                                    <p className="text-lg font-bold text-blue-700">{customer.level || 'Not Set'}</p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Days per Week</p>
                                    <p className="text-lg font-bold text-purple-700">{customer.daysPerWeek || 'Not Set'} Days</p>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Class Time</p>
                                    <p className="text-lg font-bold text-orange-700">{customer.preferredTime} {customer.timezone}</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h3 className="font-semibold text-gray-800 mb-3">Student Details</h3>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <p className="text-gray-600">Guardian</p>
                                        <p className="font-medium text-gray-800">{customer.guardianName}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Age</p>
                                        <p className="font-medium text-gray-800">{customer.studentAge} years</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Location</p>
                                        <p className="font-medium text-gray-800">{customer.city}, {customer.country}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Contact</p>
                                        <p className="font-medium text-gray-800">{customer.mobile}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Monthly Progress Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Monthly Progress</h2>
                            <p className="text-gray-600 mb-6">{currentMonth}</p>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Classes Completed</span>
                                        <span className="text-sm font-bold text-teal-600">{classesCompleted} / {totalClasses}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-teal-500 to-teal-600 h-3 rounded-full transition-all duration-500"
                                            style={{ width: `${attendancePercentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    <div className="bg-green-50 p-4 rounded-lg text-center">
                                        <p className="text-2xl font-bold text-green-700">{attendancePercentage}%</p>
                                        <p className="text-xs text-gray-600 mt-1">Attendance</p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                                        <p className="text-2xl font-bold text-blue-700">{classesCompleted}</p>
                                        <p className="text-xs text-gray-600 mt-1">Completed</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                                        <p className="text-2xl font-bold text-purple-700">{totalClasses - classesCompleted}</p>
                                        <p className="text-xs text-gray-600 mt-1">Remaining</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Quick Links */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h2>
                            <div className="space-y-3">
                                <Link
                                    href="/contact"
                                    className="block w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-all text-center"
                                >
                                    📧 Contact Teacher
                                </Link>
                                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all">
                                    📅 View Schedule
                                </button>
                                <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all">
                                    ⚙️ Update Preferences
                                </button>
                                <Link
                                    href="/"
                                    className="block w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all text-center"
                                >
                                    🏠 Back to Home
                                </Link>
                            </div>
                        </div>

                        {/* Tips Card */}
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white">
                            <h3 className="text-lg font-bold mb-3">💡 Learning Tip</h3>
                            <p className="text-sm">
                                Practice recitation daily for at least 15 minutes. Consistency is key to mastering Quran reading!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
