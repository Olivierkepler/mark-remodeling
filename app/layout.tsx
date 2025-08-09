import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mark Remodeling - Professional Home Remodeling Services",
  description: "Transform your space with Mark Remodeling. Professional kitchen, bathroom, and home remodeling services in the Washington, D.C. metro area. Free consultations and estimates.",
  keywords: "remodeling, kitchen remodeling, bathroom remodeling, home renovation, Washington DC, Maryland, Virginia",
  icons: {
    icon: "/images/mark.png",
  },
  openGraph: {
    title: "Mark Remodeling - Professional Home Remodeling Services",
    description: "Transform your space with Mark Remodeling. Professional kitchen, bathroom, and home remodeling services in the Washington, D.C. metro area.",
    type: "website",
    locale: "en_US",
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
      >
        {children}
      </body>
    </html>
  );
}
