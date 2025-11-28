'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePWA } from '@/context/PWAContext';

/* Force Rebuild */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleInstallClick } = usePWA();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/courses', label: 'Courses' },
    { href: '/how-we-teach', label: 'How we Teach' },
    { href: '/prayer-times', label: 'Prayer Times' },
    { href: '/fees', label: 'Fees' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-dark-surface shadow-md border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-golden shadow-sm group-hover:shadow-md transition-all">
              <Image
                src="/logo_JoinQuran.jpg"
                alt="JoinQuran Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              JoinQuran
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-text-secondary hover:text-golden transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            {/* Install App Button */}
            <button
              onClick={handleInstallClick}
              className="flex items-center space-x-1 text-emerald-primary hover:text-emerald-dark transition-all px-3 py-1.5 rounded-full border border-emerald-primary/30 hover:border-emerald-primary hover:bg-emerald-50 text-xs font-bold"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span>Install App</span>
            </button>

            {/* Login Button */}
            <Link
              href="/login"
              className="bg-golden hover:bg-golden-dark text-white font-bold py-2.5 px-6 rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-secondary hover:text-golden transition-colors p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-dark-surface border-b border-gray-700 shadow-lg py-4 px-4 flex flex-col space-y-4 animate-in slide-in-from-top-5 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium py-2 border-b border-gray-700 text-text-secondary hover:text-golden"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={() => {
                  handleInstallClick();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center space-x-2 text-emerald-primary border border-emerald-primary/30 py-2 rounded-lg hover:bg-emerald-50 font-semibold"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>Install App</span>
              </button>
              <Link
                href="/login"
                className="bg-golden text-white text-center font-bold py-3 rounded-lg shadow-sm hover:bg-golden-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
