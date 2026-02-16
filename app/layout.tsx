import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar1";
import Footer from "./components/Footer";
import { GlobalShortcutsProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clairvil X Construction | Building The Future",
  description: "Luxury residential and commercial renovation services. Where legacy meets modern living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased 
        min-h-screen flex flex-col overflow-x-hidden`}
      >
        {/* Navigation is placed at the top. 
          If you want it fixed, add 'fixed top-0 w-full z-50' to the Navbar component 
          and 'pt-20' to the main tag below.
        */}
        <Navbar />

        {/* The 'flex-grow' ensures the content fills the space and pushes the footer down.
          'w-full' and 'overflow-x-hidden' keep the mobile screen from wobbling.
        */}
        <main className="flex-grow w-full overflow-x-hidden relative">
          <GlobalShortcutsProvider>
            {children}
          </GlobalShortcutsProvider>
        </main>

        <Footer />
      </body>
    </html>
  );
}