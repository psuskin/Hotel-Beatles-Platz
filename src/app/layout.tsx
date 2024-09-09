import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Home/Nabvar";
import Footer from "@/components/Home/Footer";
import BackToTopButton from "@/components/BackToTopButton";

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
      <body className="font-sans">
        <Navbar />
        {children}
        <Footer />
        <BackToTopButton />
      </body>
    </html>
  );
}
