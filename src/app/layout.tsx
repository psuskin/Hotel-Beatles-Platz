import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";



export const metadata: Metadata = {
  title: "Hotel am Beatlesplatz",
  description: "Luxurious stay in the heart of Hamburg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

