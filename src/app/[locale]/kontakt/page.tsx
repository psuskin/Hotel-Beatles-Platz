import { unstable_setRequestLocale } from "next-intl/server";
import ContactClient from "./ContactClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === "de" 
      ? "Kontakt - Hotel Am Beatles Platz Hamburg" 
      : "Contact - Hotel Am Beatles Platz Hamburg",
    description: locale === "de"
      ? "Kontaktieren Sie das Hotel Am Beatles Platz in Hamburg. Unser Team steht Ihnen für Fragen und Reservierungen zur Verfügung"
      : "Contact Hotel Am Beatles Platz in Hamburg. Our team is available for inquiries and reservations",
    keywords: locale === "de"
      ? "hotel kontakt, hamburg hotel kontakt, hotel reservierung, hotel beatlesplatz kontakt"
      : "hotel contact, hamburg hotel contact, hotel reservation, hotel beatlesplatz contact",
    openGraph: {
      title: locale === "de" 
        ? "Kontakt - Hotel Am Beatles Platz Hamburg" 
        : "Contact - Hotel Am Beatles Platz Hamburg",
      description: locale === "de"
        ? "Kontaktieren Sie das Hotel Am Beatles Platz in Hamburg"
        : "Contact Hotel Am Beatles Platz in Hamburg",
      images: [
        {
          url: "https://www.hotelambeatlesplatz.de/images/contact.jpg",
          width: 1200,
          height: 630,
          alt: "Contact Hotel Am Beatles Platz",
        },
      ],
    },
  };
}

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <ContactClient />;
}
