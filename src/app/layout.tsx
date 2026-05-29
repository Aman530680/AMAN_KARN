import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "@/../utils/ScrollToTopButton";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Aman Karn | Full-Stack Web Developer Portfolio",
  description:
    "Explore the portfolio of Aman Karn, a passionate Full-Stack Web Developer specializing in React, Node.js, and competitive programming with a focus on clean, scalable code.",
  keywords: [
    "Aman Karn",
    "Portfolio",
    "Full-Stack Developer",
    "Web Developer",
    "Software Engineer",
    "React",
    "Node.js",
    "Competitive Programmer",
    "LeetCode",
    "SkillRack",
    "India",
  ],
  authors: [{ name: "Aman Karn" }],
  openGraph: {
    title: "Aman Karn | Personal Portfolio",
    description:
      "Full-Stack Web Developer & Competitive Programmer — Building the future of the web.",
    url: "https://aman-karn-portfolio.vercel.app",
    siteName: "Aman Karn Portfolio",
    images: [
      {
        url: "/Website-overview.png",
        width: 1200,
        height: 630,
        alt: "Aman Karn Portfolio Overview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Karn | Full-Stack Developer",
    description: "Building modern web applications and solving complex problems.",
    images: ["/Website-overview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="text-white">
          <div className="container">{children}</div>
        </main>
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
