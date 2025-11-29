'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function CustomerLogin() {
    const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
    const [signupStep, setSignupStep] = useState<1 | 2>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    // Sign In Form State
    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
    });

    // Sign Up Form State - Step 1
    const [signUpData, setSignUpData] = useState({
        studentName: '',
        guardianName: '',
        email: '',
        mobile: '',
        city: '',
        country: '',
        gender: 'Male',
        studentAge: '',
        password: '',
        confirmPassword: '',
    });

    // Sign Up Form State - Step 2
    const [learningPreferences, setLearningPreferences] = useState({
        level: 'Beginner',
        daysPerWeek: 3,
        preferredTime: '16:00',
        timezone: 'GMT',
    });

    // -------------------------
    // SIGN IN HANDLER
    // -------------------------
    const handleSignIn = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/customer/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signInData),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('customer_token', data.token);
                localStorage.setItem('customer_data', JSON.stringify(data.customer));
                setSuccess('Login successful! Redirecting...');
                setTimeout(() => router.push('/dashboard'), 1500);
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // -------------------------
    // SIGNUP STEP 1 HANDLER
    // -------------------------
    const handleSignUpStep1 = (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (signUpData.password !== signUpData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (signUpData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setSignupStep(2);
    };

    // -------------------------
    // SIGNUP STEP 2 HANDLER
    // -------------------------
    const handleSignUpStep2 = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/customer/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...signUpData, ...learningPreferences }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Registration successful! Please sign in.');
                setSignupStep(1);
                setTimeout(() => setActiveTab('signin'), 2000);
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const timezones = [
        'GMT', 'UTC', 'EST', 'CST', 'MST', 'PST',
        'CET', 'EET', 'IST', 'JST', 'AEST', 'NZST'
    ];

    // ✅ NOW the function RETURNS JSX correctly
    return (
        <>
            <style>{`
                input, select, textarea {
                    color: #000 !important;
                }
            `}</style>

            <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg flex items-center justify-center px-4 py-8">
                <div className="max-w-2xl w-full">

                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block">
                            <div className="flex justify-center mb-4">
                                <Image
                                    src="/logo_JoinQuran.jpg"
                                    alt="JoinQuran Logo"
                                    width={80}
                                    height={80}
                                    className="rounded-full shadow-lg"
                                />
                            </div>
                        </Link>
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome to JoinQuran</h1>
                        <p className="text-gray-300">Start your Quran learning journey today</p>
                    </div>

                    {/* Tabs */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => {
                                    setActiveTab('signin');
                                    setSignupStep(1);
                                    setError('');
                                    setSuccess('');
                                }}
                                className={`flex-1 py-4 px-6 font-semibold text-center ${activeTab === 'signin'
                                    ? 'text-emerald-primary border-b-2 border-emerald-primary bg-emerald-primary/10'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Sign In
                            </button>

                            <button
                                onClick={() => {
                                    setActiveTab('signup');
                                    setSignupStep(1);
                                    setError('');
                                    setSuccess('');
                                }}
                                className={`flex-1 py-4 px-6 font-semibold text-center ${activeTab === 'signup'
                                    ? 'text-emerald-primary border-b-2 border-emerald-primary bg-emerald-primary/10'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Sign Up {activeTab === 'signup' && `(Step ${signupStep}/2)`}
                            </button>
                        </div>

                        <div className="p-8">

                            {/* Error */}
                            {error && (
                                <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            )}

                            {/* Success */}
                            {success && (
                                <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                                    <p className="text-sm text-green-700">{success}</p>
                                </div>
                            )}

                            {/* SIGN IN */}
                            {activeTab === 'signin' && (
                                <form onSubmit={handleSignIn} className="space-y-4">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={signInData.email}
                                            onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            required
                                            value={signInData.password}
                                            onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                            placeholder="Enter your password"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-emerald-primary to-emerald-dark text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition"
                                    >
                                        {isLoading ? 'Signing in...' : 'Sign In'}
                                    </button>
                                </form>
                            )}

                            {/* SIGN UP STEP 1 */}
                            {activeTab === 'signup' && signupStep === 1 && (
                                <form onSubmit={handleSignUpStep1} className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        Personal Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Student Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={signUpData.studentName}
                                                onChange={(e) => setSignUpData({ ...signUpData, studentName: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                placeholder="Student's full name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Guardian Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={signUpData.guardianName}
                                                onChange={(e) => setSignUpData({ ...signUpData, guardianName: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                placeholder="Parent/Guardian name"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={signUpData.email}
                                            onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Mobile *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={signUpData.mobile}
                                                onChange={(e) => setSignUpData({ ...signUpData, mobile: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                placeholder="+1234567890"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={signUpData.city}
                                                onChange={(e) => setSignUpData({ ...signUpData, city: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                placeholder="Your city"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Country *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={signUpData.country}
                                                onChange={(e) => setSignUpData({ ...signUpData, country: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                placeholder="Your country"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Gender *
                                            </label>
                                            <select
                                                required
                                                value={signUpData.gender}
                                                onChange={(e) => setSignUpData({ ...signUpData, gender: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Student Age *
                                        </label>
                                        <input
                                            type="number"
                                            min="3"
                                            max="100"
                                            required
                                            value={signUpData.studentAge}
                                            onChange={(e) => setSignUpData({ ...signUpData, studentAge: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                            placeholder="Age"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Password *
                                            </label>
                                            <input
                                                type="password"
                                                required
                                                minLength={6}
                                                value={signUpData.password}
                                                onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                placeholder="Min. 6 characters"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Confirm Password *
                                            </label>
                                            <input
                                                type="password"
                                                required
                                                minLength={6}
                                                value={signUpData.confirmPassword}
                                                onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                placeholder="Confirm password"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-golden to-golden-dark text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition"
                                    >
                                        Next: Learning Preferences →
                                    </button>
                                </form>
                            )}

                            {/* SIGN UP STEP 2 */}
                            {activeTab === 'signup' && signupStep === 2 && (
                                <form onSubmit={handleSignUpStep2} className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        Learning Preferences
                                    </h3>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Learning Level *
                                        </label>
                                        <select
                                            required
                                            value={learningPreferences.level}
                                            onChange={(e) => setLearningPreferences({ ...learningPreferences, level: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        >
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Days per Week *
                                        </label>
                                        <select
                                            required
                                            value={learningPreferences.daysPerWeek}
                                            onChange={(e) => setLearningPreferences({ ...learningPreferences, daysPerWeek: Number(e.target.value) })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        >
                                            <option value={3}>3 Days</option>
                                            <option value={5}>5 Days</option>
                                            <option value={6}>6 Days</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Preferred Time *
                                            </label>
                                            <input
                                                type="time"
                                                required
                                                value={learningPreferences.preferredTime}
                                                onChange={(e) => setLearningPreferences({ ...learningPreferences, preferredTime: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Timezone *
                                            </label>
                                            <select
                                                required
                                                value={learningPreferences.timezone}
                                                onChange={(e) => setLearningPreferences({ ...learningPreferences, timezone: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                            >
                                                {timezones.map((tz) => (
                                                    <option key={tz} value={tz}>{tz}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setSignupStep(1)}
                                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg transition"
                                        >
                                            ← Back
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex-1 bg-gradient-to-r from-golden to-golden-dark text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition"
                                        >
                                            {isLoading ? 'Creating Account...' : 'Complete Registration'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                            <p className="text-xs text-gray-500 text-center">
                                © {new Date().getFullYear()} JoinQuran. All rights reserved.
                            </p>
                        </div>
                    </div>

                    {/* Back to Home */}
                    <div className="text-center mt-6">
                        <Link href="/" className="text-white hover:text-gray-300 text-sm">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
