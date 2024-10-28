import { unstable_setRequestLocale } from "next-intl/server";
import PartnerClient from "./PartnerClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === "de" 
      ? "Partner - Hotel am Beatlesplatz Hamburg" 
      : "Partners - Hotel am Beatlesplatz Hamburg",
    description: locale === "de"
      ? "Entdecken Sie unsere geschätzten Partner, die den Aufenthalt in unserem Hotel noch besonderer machen. Von lokalen Touren bis zu Wellness-Angeboten"
      : "Discover our valued partners who make your stay at our hotel even more special. From local tours to wellness offerings",
    keywords: locale === "de"
      ? "hotelpartner hamburg, kiezjungs, hamburg card, rituals, beurer, rojee design, zur ritze"
      : "hotel partners hamburg, kiezjungs, hamburg card, rituals, beurer, rojee design, zur ritze",
    openGraph: {
      title: locale === "de" 
        ? "Partner - Hotel am Beatlesplatz Hamburg" 
        : "Partners - Hotel am Beatlesplatz Hamburg",
      description: locale === "de"
        ? "Unsere ausgewählten Partner für Ihren perfekten Aufenthalt in Hamburg"
        : "Our selected partners for your perfect stay in Hamburg",
      images: [
        {
          url: "https://www.hotelambeatlesplatz.de/images/outsideView.jpg",
          width: 1200,
          height: 630,
          alt: "Partners of Hotel am Beatlesplatz",
        },
      ],
    },
  };
}

export default function PartnerPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <PartnerClient />;
}
