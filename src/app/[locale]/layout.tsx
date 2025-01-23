import type { Metadata } from "next";
import "../globals.css";

import Footer from "@/components/Home/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Home/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  };
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title:
      locale === "de"
        ? "Hotel Am Beatles Platz - Hamburg"
        : "Hotel Am Beatles Platz - Hamburg",
    description:
      locale === "de"
        ? "Luxuriöser Aufenthalt im Herzen von Hamburg"
        : "Luxurious stay in the heart of Hamburg",
    keywords:
      locale === "de"
        ? "hotel hamburg, beatlesplatz, luxushotel, st. pauli, reeperbahn"
        : "hotel hamburg, beatlesplatz, luxury hotel, st. pauli, reeperbahn",
    authors: [{ name: "Hotel Am Beatles Platz" }],
    creator: "Hotel Am Beatles Platz",
    publisher: "Hotel Am Beatles Platz",
    robots: "index, follow",
    alternates: {
      canonical: "https://www.hotelambeatlesplatz.de",
      languages: {
        en: "/en",
        de: "/de",
      },
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: "https://www.hotelambeatlesplatz.de",
      siteName: "Hotel Am Beatles Platz",
      title:
        locale === "de"
          ? "Hotel Am Beatles Platz - Hamburg"
          : "Hotel Am Beatles Platz - Hamburg",
      description:
        locale === "de"
          ? "Luxuriöser Aufenthalt im Herzen von Hamburg"
          : "Luxurious stay in the heart of Hamburg",
      images: [
        {
          url: "https://www.hotelambeatlesplatz.de/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Hotel Am Beatles Platz",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        locale === "de"
          ? "Hotel Am Beatles Platz - Hamburg"
          : "Hotel Am Beatles Platz - Hamburg",
      description:
        locale === "de"
          ? "Luxuriöser Aufenthalt im Herzen von Hamburg"
          : "Luxurious stay in the heart of Hamburg",
      images: ["https://www.hotelambeatlesplatz.de/twitter-image.jpg"],
      creator: "@hotelamatbeatlesplatz",
    },
    icons: {
      icon: [
        {
          url: "/images/favicon.ico",
          type: "image/x-icon",
        },
      ],
      apple: [
        { url: "/apple-icon.png" },
        { url: "/apple-icon-72x72.png", sizes: "72x72" },
        { url: "/apple-icon-144x144.png", sizes: "144x144" },
      ],
    },
  };
}

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
  unstable_setRequestLocale(locale);

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
