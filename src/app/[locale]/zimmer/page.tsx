import { unstable_setRequestLocale } from "next-intl/server";
import ZimmerClient from "./ZimmerClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title:
      locale === "de"
        ? "Zimmer - Hotel Am Beatles Platz Hamburg"
        : "Rooms - Hotel Am Beatles Platz Hamburg",
    description:
      locale === "de"
        ? "Entdecken Sie unsere 53 modernen Zimmer und Suiten mit Klimaanlage, kostenlosem WLAN und erstklassigem Komfort im Herzen von Hamburg"
        : "Discover our 53 modern rooms and suites with air conditioning, free WiFi and first-class comfort in the heart of Hamburg",
    keywords:
      locale === "de"
        ? "hotelzimmer hamburg, suiten, komfortzimmer, premium zimmer, st. pauli hotel, klimaanlage, minibar"
        : "hotel rooms hamburg, suites, comfort rooms, premium rooms, st. pauli hotel, air conditioning, minibar",
    openGraph: {
      title:
        locale === "de"
          ? "Zimmer - Hotel Am Beatles Platz Hamburg"
          : "Rooms - Hotel Am Beatles Platz Hamburg",
      description:
        locale === "de"
          ? "Luxuriöse Zimmer mit modernem Komfort im Herzen von Hamburg"
          : "Luxurious rooms with modern comfort in the heart of Hamburg",
      images: [
        {
          url: "https://www.hotelambeatlesplatz.de/images/room.jpg",
          width: 1200,
          height: 630,
          alt: "Rooms at Hotel Am Beatles Platz",
        },
      ],
    },
  };
}

export default function ZimmerPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <ZimmerClient />;
}
