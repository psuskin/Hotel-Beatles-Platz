import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/Home/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Home/Navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hotel am Beatlesplatz",
  description: "Luxurious stay in the heart of Hamburg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} font-sans`}>
        <Navbar />
        {children}
        <Footer />
        <BackToTopButton />
      </body>
    </html>
  );
}
