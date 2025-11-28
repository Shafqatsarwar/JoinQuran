import type { Metadata, Viewport } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import { PWAProvider } from "@/context/PWAContext";

/* =========================
   ✅ SEO + SOCIAL
========================= */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.joinquran.com"),
  title: {
    default: "JoinQuran - Learn Quran Online",
    template: "%s | JoinQuran",
  },
  description:
    "Learn Quran online with qualified tutors. Flexible timings, one-on-one sessions, affordable plans.",
  keywords: [
    "Learn Quran online",
    "Online Quran classes",
    "Quran teacher",
    "Islamic education",
    "Tajweed course",
    "Hifz Quran",
  ],
  authors: [{ name: "JoinQuran" }],
  creator: "JoinQuran",
  publisher: "JoinQuran",
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  openGraph: {
    title: "JoinQuran - Learn Quran Online",
    description: "Learn Quran online with expert teachers from anywhere in the world.",
    url: "https://www.joinquran.com",
    siteName: "JoinQuran",
    images: [
      { url: "/logo_JoinQuran.jpg", width: 512, height: 512, alt: "JoinQuran Logo" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JoinQuran - Learn Quran Online",
    description: "Join online Quran classes with certified teachers at your home.",
    images: ["/logo_JoinQuran.jpg"],
  },
  icons: { icon: "/logo_JoinQuran.png", apple: "/logo_JoinQuran.png" },
};

/* =========================
   ✅ VIEWPORT / MOBILE
========================= */
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

/* =========================
   ✅ ROOT LAYOUT
========================= */
/* Force Rebuild */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preload" as="image" href="/logo_JoinQuran.jpg" />
      </head>

      {/* Dark theme with navy background for proper contrast */}
      <body className="flex flex-col min-h-screen bg-dark-bg text-white selection:bg-golden selection:text-white">
        <PWAProvider>
          {/* NAVBAR */}
          <Navbar />

          {/* MAIN CONTENT */}
          <main className="flex-grow">{children}</main>

          {/* CHAT + FOOTER */}
          <ChatButton />
          <Footer />
        </PWAProvider>
      </body>
    </html>
  );
}
