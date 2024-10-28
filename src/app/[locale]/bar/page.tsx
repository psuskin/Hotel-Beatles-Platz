import React from "react";
import BarClient from "./BarClient";
import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === "de" 
      ? "Bar - Hotel am Beatlesplatz Hamburg" 
      : "Bar - Hotel am Beatlesplatz Hamburg",
    description: locale === "de"
      ? "Genießen Sie erlesene Cocktails und eine einzigartige Atmosphäre in unserer Bar mit Blick auf den Beatlesplatz"
      : "Enjoy exquisite cocktails and a unique atmosphere in our bar overlooking Beatlesplatz",
    openGraph: {
      title: locale === "de" 
        ? "Bar - Hotel am Beatlesplatz Hamburg" 
        : "Bar - Hotel am Beatlesplatz Hamburg",
      description: locale === "de"
        ? "Genießen Sie erlesene Cocktails und eine einzigartige Atmosphäre in unserer Bar mit Blick auf den Beatlesplatz"
        : "Enjoy exquisite cocktails and a unique atmosphere in our bar overlooking Beatlesplatz",
      images: [
        {
          url: "https://www.hotelambeatlesplatz.de/images/wideView2.jpg",
          width: 1200,
          height: 630,
          alt: "Hotel am Beatlesplatz Bar",
        },
      ],
    },
  };
}

const Bar = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
  return <BarClient />;
};

export default Bar;
