"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import SubHeader from "@/components/SubHeader";
import { useTranslations } from "next-intl";

interface Partner {
  name: string;
  description: string;
  logo: string;
}

const partners: Partner[] = [
  {
    name: "Kiezjungs",
    // description: "Guided tours of St. Pauli, Hamburg's vibrant district.",
    description:
      "Geführte Touren durch St. Pauli, Hamburgs lebendigen Stadtteil.",
    logo: "/images/kiez.png",
  },
  {
    name: "Hamburg Card",
    description:
      // "Tourist discount card offering savings on Hamburg attractions and public transport.",
      "Touristenrabattkarte, die Ersparnisse bei Hamburger Attraktionen und öffentlichen Verkehrsmitteln bietet.",
    logo: "/images/Hamburg-CARD.png",
  },
  {
    name: "Rituals",
    description:
      // "Luxury home and body cosmetics inspired by ancient traditions.",
      "Luxuriöse Home- und Körperkosmetik, inspiriert von alten Traditionen.",
    logo: "/images/Rituals.png",
  },
  {
    name: "Beurer",
    description:
      // "Health and well-being products, including medical devices and personal care.",
      "Gesundheits- und Wohlfühlprodukte, einschließlich medizinischer Geräte und Körperpflege.",
    logo: "/images/beurer.jpeg",
  },
  {
    name: "Rojee Design",
    // description: "Innovative, high-quality digital and print design services.",
    description:
      "Innovative, hochwertige digitale und Druckdesign-Dienstleistungen.",
    logo: "/images/rojee.jpg",
  },
  {
    name: "Zur Ritze",
    description:
      // "Iconic bar and boxing gym in the heart of Hamburg's St. Pauli district.",
      "Ikone der Bar und des Boxgyms im Herzen des Hamburger Stadtteils St. Pauli.",
    logo: "/images/bar.jpg",
  },
];

const PartnerCard: React.FC<Partner & { index: number }> = ({
  name,
  description,
  logo,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 ${
      index % 3 === 0 ? "md:col-span-2 md:row-span-2" : "col-span-1 row-span-1"
    }`}
  >
    <div className="flex flex-col h-full">
      <Image
        src={logo}
        alt={`${name} logo`}
        width={index % 3 === 0 ? 120 : 60}
        height={index % 3 === 0 ? 120 : 60}
        className="mb-4 mx-auto"
      />
      <h3 className="text-base sm:text-lg font-semibold text-primary-color mb-2 text-center">
        {name}
      </h3>
      <p className="text-xs sm:text-sm text-gray-300 flex-grow text-center">
        {description}
      </p>
    </div>
  </motion.div>
);

const PartnerClient = () => {
  const t = useTranslations("partner");

  const partners: Partner[] = [
    {
      name: "Kiezjungs",
      description: t("kiezjungs"),
      logo: "/images/kiez.png",
    },
    {
      name: "Hamburg Card",
      description: t("hamburgCard"),
      logo: "/images/Hamburg-CARD.png",
    },
    {
      name: "Rituals",
      description: t("rituals"),
      logo: "/images/Rituals.png",
    },
    {
      name: "Beurer",
      description: t("beurer"),
      logo: "/images/beurer.jpeg",
    },
    {
      name: "Rojee Design",
      description: t("rojeeDesign"),
      logo: "/images/rojee.jpg",
    },
    {
      name: "Zur Ritze",
      description: t("zurRitze"),
      logo: "/images/bar.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="relative">
        <div className="sticky top-0 z-0">
          <SubHeader
            // title="Our Partners"
            title={t("title")}
            description={t("description")}
            imageSrc="/images/outsideView.jpg"
          />
        </div>
        <div className="relative z-10 bg-black">
          <div className="max-w-6xl mx-auto py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {partners.map((partner, index) => (
                <PartnerCard key={index} {...partner} index={index} />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 sm:mt-16 text-center"
            ></motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerClient;
