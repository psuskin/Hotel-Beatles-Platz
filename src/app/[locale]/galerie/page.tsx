import { unstable_setRequestLocale } from "next-intl/server";
import GalerieClient from "./GalerieClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title:
      locale === "de"
        ? "Galerie - Hotel Am Beatles Platz Hamburg"
        : "Gallery - Hotel Am Beatles Platz Hamburg",
    description:
      locale === "de"
        ? "Entdecken Sie unser luxuriöses Hotel durch unsere Bildergalerie. Sehen Sie unsere eleganten Zimmer, moderne Einrichtung und erstklassige Ausstattung"
        : "Explore our luxurious hotel through our photo gallery. View our elegant rooms, modern facilities, and premium amenities",
    openGraph: {
      title:
        locale === "de"
          ? "Galerie - Hotel Am Beatles Platz Hamburg"
          : "Gallery - Hotel Am Beatles Platz Hamburg",
      description:
        locale === "de"
          ? "Entdecken Sie unser luxuriöses Hotel durch unsere Bildergalerie"
          : "Explore our luxurious hotel through our photo gallery",
      images: [
        {
          url: "https://www.hotelambeatlesplatz.de/images/Premium-2.jpg",
          width: 1200,
          height: 630,
          alt: "Hotel Am Beatles Platz Gallery",
        },
      ],
    },
  };
}

export default function GaleriePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <GalerieClient />;
}
