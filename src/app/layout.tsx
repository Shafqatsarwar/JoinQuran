import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatButton from "@/components/ChatButton";
import Footer from "@/components/Footer";
import { PWAProvider } from "@/context/PWAContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JoinQuran - Learn Quran Online",
  description: "Learn to read Quran online with our qualified tutors. We offer a variety of courses for all ages and levels.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <PWAProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <ChatButton />
          <Footer />
        </PWAProvider>
      </body>
    </html>
  );
}
