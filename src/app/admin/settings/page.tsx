'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EmailSettings() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [testEmail, setTestEmail] = useState('');
    const [testMessage, setTestMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/admin/login');
            return;
        }
        setIsAuthenticated(true);
        setIsLoading(false);
    }, [router]);

    const handleSendTestEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        setTestMessage('');

        try {
            const response = await fetch('/api/admin/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: testEmail,
                    subject: 'Test Email from JoinQuran Admin',
                    text: 'This is a test email from your JoinQuran admin panel. If you received this, your email configuration is working correctly!',
                }),
            });

            const data = await response.json();

            if (data.success) {
                setTestMessage('✅ Test email sent successfully!');
                setTestEmail('');
            } else {
                setTestMessage(`❌ Failed to send email: ${data.message}`);
            }
        } catch (error) {
            setTestMessage('❌ An error occurred while sending the email');
            console.error('Email error:', error);
        } finally {
            setIsSending(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Email Settings</h1>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Current Configuration */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Current Email Configuration</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600 font-medium">SMTP Host:</span>
                            <span className="text-gray-900">smtp.gmail.com</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600 font-medium">SMTP Port:</span>
                            <span className="text-gray-900">587</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600 font-medium">From Email:</span>
                            <span className="text-gray-900">{process.env.NEXT_PUBLIC_EMAIL || 'onlinequran50@gmail.com'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600 font-medium">Status:</span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                                Configured
                            </span>
                        </div>
                    </div>
                </div>

                {/* Test Email */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Send Test Email</h2>
                    <p className="text-gray-600 mb-4">
                        Send a test email to verify your email configuration is working correctly.
                    </p>

                    <form onSubmit={handleSendTestEmail} className="space-y-4">
                        <div>
                            <label htmlFor="testEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                Recipient Email Address
                            </label>
                            <input
                                id="testEmail"
                                type="email"
                                value={testEmail}
                                onChange={(e) => setTestEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="Enter email address"
                                disabled={isSending}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSending}
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSending ? 'Sending...' : 'Send Test Email'}
                        </button>

                        {testMessage && (
                            <div className={`p-4 rounded-lg ${testMessage.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                                }`}>
                                {testMessage}
                            </div>
                        )}
                    </form>
                </div>

                {/* Configuration Instructions */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">Configuration Instructions</h3>
                    <p className="text-blue-800 mb-4">
                        Email settings are configured through environment variables in your <code className="bg-blue-100 px-2 py-1 rounded">.env.local</code> file.
                    </p>
                    <div className="bg-white p-4 rounded font-mono text-sm text-gray-800">
                        <div># Admin Credentials</div>
                        <div>ADMIN_USERNAME=admin</div>
                        <div>ADMIN_PASSWORD=Abcd!234</div>
                        <div className="mt-2"># Email Configuration</div>
                        <div>SMTP_HOST=smtp.gmail.com</div>
                        <div>SMTP_PORT=587</div>
                        <div>SMTP_USER=your-email@gmail.com</div>
                        <div>SMTP_PASSWORD=your-app-password</div>
                        <div>EMAIL_FROM=onlinequran50@gmail.com</div>
                    </div>
                    <p className="text-blue-800 mt-4 text-sm">
                        <strong>Note:</strong> After updating environment variables, restart your development server for changes to take effect.
                    </p>
                </div>
            </div>
        </div>
    );
}
