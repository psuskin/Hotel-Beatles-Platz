import { unstable_setRequestLocale } from "next-intl/server";
import RestaurantClient from "./RestaurantClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === "de" 
      ? "Restaurant - Hotel Am Beatles Platz Hamburg" 
      : "Restaurant - Hotel Am Beatles Platz Hamburg",
    description: locale === "de"
      ? "Genießen Sie exquisite Küche in unserem Restaurant mit Blick auf den Beatlesplatz. Frühstück, Mittag- und Abendessen in eleganter Atmosphäre"
      : "Enjoy exquisite cuisine in our restaurant overlooking Beatlesplatz. Breakfast, lunch and dinner in an elegant atmosphere",
    keywords: locale === "de"
      ? "restaurant hamburg, hotelrestaurant, frühstück hamburg, fine dining, st. pauli restaurant"
      : "restaurant hamburg, hotel restaurant, breakfast hamburg, fine dining, st. pauli restaurant",
    openGraph: {
      title: locale === "de" 
        ? "Restaurant - Hotel Am Beatles Platz Hamburg" 
        : "Restaurant - Hotel Am Beatles Platz Hamburg",
      description: locale === "de"
        ? "Kulinarische Erlebnisse im Herzen von Hamburg"
        : "Culinary experiences in the heart of Hamburg",
      images: [
        {
          url: "https://www.hotelambeatlesplatz.de/images/wideView.jpg",
          width: 1200,
          height: 630,
          alt: "Restaurant at Hotel Am Beatles Platz",
        },
      ],
    },
  };
}

export default function RestaurantPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <RestaurantClient />;
}
