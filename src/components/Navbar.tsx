'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePWA } from '@/context/PWAContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleInstallClick } = usePWA();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/courses', label: 'Courses' },
    { href: '/how-we-teach', label: 'How we Teach' },
    { href: '/prayer-times', label: 'Prayer Times' },
    { href: '/start-learning', label: 'Start Learning' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#1e293b] shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo_JoinQuran.jpg" alt="JoinQuran Logo" width={40} height={40} className="rounded-full" />
              <span className="text-xl font-bold text-white">JoinQuran</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {/* Install App Button (Left of Home) */}
            <button
              onClick={handleInstallClick}
              className="flex items-center space-x-1 text-teal-400 hover:text-teal-300 transition-all px-3 py-1.5 rounded-full border border-teal-400/30 hover:border-teal-400/60 hover:bg-teal-400/10 text-xs font-bold backdrop-blur-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Install App</span>
            </button>

            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
                {link.label}
              </Link>
            ))}

            <Link href="/login" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-all">
              Login
            </Link>
          </div>
          <div className="md:hidden flex items-center space-x-4">
            {/* Install Button (Mobile Header) */}
            <button
              onClick={handleInstallClick}
              className="flex items-center space-x-1 text-teal-400 hover:text-teal-300 transition-all px-3 py-1.5 rounded-full border border-teal-400/30 hover:border-teal-400/60 hover:bg-teal-400/10 text-xs font-bold backdrop-blur-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Install</span>
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {/* Hamburger Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 py-4 bg-[#1e293b]">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-white hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Link href="/login" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-all text-center" onClick={() => setIsMenuOpen(false)}>
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
