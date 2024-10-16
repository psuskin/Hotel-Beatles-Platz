import type { Metadata } from "next";
import "../globals.css";

import Footer from "@/components/Home/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Home/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hotel am Beatlesplatz",
  description: "Luxurious stay in the heart of Hamburg",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${montserrat.className} font-sans`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          {children}
          <Footer />
          <BackToTopButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
