import React from "react";
import JobClient from "./JobClient";
import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title:
      locale === "de"
        ? "Jobs - Hotel am Beatlesplatz Hamburg"
        : "Jobs - Hotel am Beatlesplatz Hamburg",
    description:
      locale === "de"
        ? "Entdecken Sie spannende Karrieremöglichkeiten im Hotel am Beatlesplatz. Werden Sie Teil unseres engagierten Teams in Hamburg"
        : "Discover exciting career opportunities at Hotel am Beatlesplatz. Join our dedicated team in Hamburg",
    keywords:
      locale === "de"
        ? "jobs hamburg, hotelkarriere, hoteljobs, stellenangebote hotel"
        : "hotel jobs hamburg, hotel career, job opportunities, hospitality jobs",
    openGraph: {
      title:
        locale === "de"
          ? "Jobs - Hotel am Beatlesplatz Hamburg"
          : "Jobs - Hotel am Beatlesplatz Hamburg",
      description:
        locale === "de"
          ? "Entdecken Sie spannende Karrieremöglichkeiten im Hotel am Beatlesplatz"
          : "Discover exciting career opportunities at Hotel am Beatlesplatz",
      images: [
        {
          url: "https://www.hotelambeatlesplatz.de/images/wideView2.jpg",
          width: 1200,
          height: 630,
          alt: "Jobs at Hotel am Beatlesplatz",
        },
      ],
    },
  };
}

const Jobs = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return <JobClient />;
};

export default Jobs;
