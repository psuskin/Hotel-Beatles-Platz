"use client";

import React, { useState } from "react";
import SubHeader from "@/components/SubHeader";
import RoomCard from "@/components/RoomCard";
import BookingPopUp from "@/components/BookingPopUp";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaFire, FaCocktail, FaSnowflake, FaKey } from "react-icons/fa";
import { roomTypes } from "@/components/constant/roomTypes";
import { useTranslations } from "next-intl";

interface RoomBenefit {
  name: string;
  description: string;
  icon: React.ReactElement;
}

// const roomBenefits: RoomBenefit[] = [
//   {
//     // name: "UNDERFLOOR HEATING",
//     name: "Kostenloses WLAN",
//     // description: "with display control",
//     description: "freies Surfen",
//     icon: <FaFire />,
//   },
//   { name: "MINI-BAR", description: "eiskalte Getränke", icon: <FaCocktail /> },
//   {
//     // name: "AIR CONDITIONING",
//     name: "KLIMAANLAGE",
//     // description: "individually controllable",
//     description: "individuell steuerbar",
//     icon: <FaSnowflake />,
//   },
//   { name: "SPIND", description: "für Ihre Wertsachen", icon: <FaKey /> },
// ];

const ZimmerClient = () => {
  const t = useTranslations("rooms");

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const roomBenefits: RoomBenefit[] = [
    {
      name: t("wifiName"),
      description: t("wifiDescription"),
      icon: <FaFire />,
    },
    {
      name: t("minibarName"),
      description: t("minibarDescription"),
      icon: <FaCocktail />,
    },
    {
      name: t("acName"),
      description: t("acDescription"),
      icon: <FaSnowflake />,
    },
    {
      name: t("lockerName"),
      description: t("lockerDescription"),
      icon: <FaKey />,
    },
  ];

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="bg-black text-gray-300 min-h-screen">
      <div className="relative">
        <div className="sticky top-0 z-0">
          <SubHeader
            title={t("title")}
            description={t("description")}
            imageSrc="/images/zimmer_sub.jpg"
          />
        </div>
        <motion.div className="relative z-10 bg-black" style={{ y }}>
          <div className="container mx-auto py-16 px-4">
            <div className="mb-16 border-b border-gray-800 pb-8">
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: t("rooms"), value: "53" },
                  { label: t("beds"), value: "58" },
                  { label: t("guests"), value: "120" },
                  { label: t("categories"), value: "3" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="border border-gray-800 p-4 rounded-lg">
                      <h3 className="text-3xl sm:text-4xl font-semibold text-primary-color mb-2">
                        {item.value}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.h2
              className="text-4xl font-light text-center mb-12 text-gray-100"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t("roomSelection")}
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-7xl mx-auto">
              {roomTypes.map((room) => (
                <RoomCard
                  key={room.name}
                  name={room.name}
                  description={t(room.descriptionKey)}
                  features={room.featuresKeys.map((key) => t(key))}
                  color={room.color}
                  size={room.size}
                  capacity={t(room.capacityKey)}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="mt-24 bg-white py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-light text-center mb-12 text-black">
            {t("roomBenefits")}
          </h2>
          <p className="text-center text-black mb-16 max-w-2xl mx-auto font-light text-lg leading-relaxed">
            {t("roomBenefitsDescription")}
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {roomBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.name}
                className="w-64 h-64 bg-gray-100 rounded-2xl overflow-hidden relative group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-primary-color/10 transform -skew-y-6 group-hover:skew-y-0 transition-transform duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-primary-color text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </span>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {benefit.name}
                  </h3>
                  <p className="text-sm text-gray-600 transition-opacity duration-300">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <BookingPopUp isOpen={isBookingOpen} onClose={handleCloseBooking} />
    </div>
  );
};

export default ZimmerClient;
