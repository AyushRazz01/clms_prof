import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CLMS | College Library Management System",
  description: "Official Library Management System for tracking and managing library resources, book issues, returns, and fines. A comprehensive solution for educational institutions.",
  keywords: ["library management", "book tracking", "college library", "student library", "faculty library", "book issue", "book return", "library fines", "CLMS"],
  authors: [{ name: "College Library Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "CLMS | College Library Management System",
    description: "Official Library Management System for educational institutions",
    url: "https://localhost:3000",
    siteName: "CLMS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
