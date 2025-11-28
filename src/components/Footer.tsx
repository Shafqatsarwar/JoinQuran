'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { usePWA } from '@/context/PWAContext';

const Footer = () => {
  const { handleInstallClick } = usePWA();

  const footerLinks = {
    ABOUT: [
      { href: '/about', label: 'About Us' },
      { href: '/our-mission', label: 'Our Mission' },
    ],
    COURSES: [
      { href: '/courses', label: 'All Courses' },
      { href: '/fees', label: 'Fees', isFees: true },
      { href: '/prayer-times', label: 'Prayer Times' },
    ],
    SUPPORT: [
      { href: '/faq', label: 'FAQ' },
      { href: '/reviews', label: 'Reviews' },
    ],
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^\d+]/g, '');
  const iconClass = 'w-5 h-5 fill-current';

  const socialLinks: { href: string; label: string; icon: ReactNode }[] = [
    {
      href: process.env.NEXT_PUBLIC_FACEBOOK_URL || '#',
      label: 'Facebook',
      icon: (
        <svg viewBox="0 0 24 24" className={iconClass}>
          <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.3-3.2 3.1-3.2.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12" />
        </svg>
      ),
    },
    {
      href: process.env.NEXT_PUBLIC_LINKEDIN_URL || '#',
      label: 'LinkedIn',
      icon: (
        <svg viewBox="0 0 24 24" className={iconClass}>
          <path d="M5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h4v12H3zM10 9h3.7v2h.1c.5-.9 1.7-2.1 3.6-2.1 3.8 0 4.5 2.5 4.5 5.7V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" />
        </svg>
      ),
    },
    {
      href: whatsappNumber ? `https://wa.me/${whatsappNumber}` : '#',
      label: 'WhatsApp',
      icon: (
        <svg viewBox="0 0 24 24" className={iconClass}>
          <path d="M12.04 2a9.99 9.99 0 0 0-8.63 15L2.2 21.2l4.32-1.13A10 10 0 1 0 12.04 2" />
        </svg>
      ),
    },
    {
      href: process.env.NEXT_PUBLIC_EMAIL ? `mailto:${process.env.NEXT_PUBLIC_EMAIL}` : '#',
      label: 'Email',
      icon: (
        <svg viewBox="0 0 24 24" className={iconClass}>
          <path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2" />
        </svg>
      ),
    },
  ];

  const quickLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/courses', label: 'Courses' },
    { href: '/how-we-teach', label: 'How We Teach' },
    { href: '/start-learning', label: 'Start Learning' },
  ];

  const supportLinks = [
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQs' },
    { href: '/prayer-times', label: 'Prayer Times' },
    { href: '/reviews', label: 'Reviews' },
  ];

  return (
    <footer className="bg-dark-surface border-t border-gray-700 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Brand Section */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-golden shadow-sm">
                <Image
                  src="/logo_JoinQuran.jpg"
                  alt="JoinQuran Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-bold text-white">
                JoinQuran
              </span>
            </Link>
            <p className="text-xs text-text-muted leading-relaxed max-w-xs">
              Learn Quran online with qualified tutors. Flexible timings, one-on-one sessions.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-700 text-gray-300 hover:bg-emerald-primary hover:text-white transition text-xs"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-xs font-bold tracking-widest text-golden uppercase">Quick Links</h3>
            <ul className="space-y-1.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-text-secondary hover:text-golden transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-primary/50"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 text-xs font-bold tracking-widest text-golden uppercase">Support</h3>
            <ul className="space-y-1.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-white hover:text-golden transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-primary/50"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div>
            <h3 className="mb-3 text-xs font-bold tracking-widest text-golden uppercase">Actions</h3>
            <div className="flex flex-col gap-2 items-start">
              <Link
                href="/fees"
                className="inline-flex items-center bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold py-1 px-3 rounded text-xs transition border border-emerald-200"
              >
                💰 Fees
              </Link>
              <button
                onClick={handleInstallClick}
                className="inline-flex items-center gap-1 bg-gray-50 border border-gray-200 text-gray-600 hover:bg-emerald-primary hover:text-white hover:border-emerald-primary font-semibold py-1 px-3 rounded text-xs transition"
              >
                ⬇ Install App
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 bg-golden text-white hover:bg-golden-dark font-semibold py-1 px-3 rounded text-xs transition shadow-sm"
              >
                📩 Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-gray-700 text-center">
          <p className="text-[10px] text-text-muted">
            © {new Date().getFullYear()} JoinQuran. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
