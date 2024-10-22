import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface AtmosphereProps {
  currentTime: Date;
  weather: string;
}

const Atmosphere: React.FC<AtmosphereProps> = ({ currentTime, weather }) => {
  const t = useTranslations("atmosphere");
  return (
    <div className="flex flex-col lg:flex-row items-start gap-12">
      {/* Quick Info Section */}
      <div className="w-full lg:w-1/3">
        <motion.div
          className="border border-gray-700 p-6 rounded-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* <div className="space-y-4 text-sm">
            <InfoItem label="Lage" value="20359 Hamburg – Germany" />
            <InfoItem label="Telefon" value="+49 40 181 283 811" />
            <InfoItem
              label="Ortszeit"
              value={currentTime.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
            <InfoItem label="Aktuelles Wetter" value={weather} />
            <InfoItem label="Email" value="info@hotelambeatlesplatz.de" />
            <InfoItem label="PDF" value="Gästemappe" isLink /> */}
          {/* <InfoItem label="Link" value="Nachhaltigkeitszertifikat" isLink /> */}
          {/* <InfoItem label="Link" value="Sehenswürdigkeiten" isLink /> */}
          {/* </div> */}
          <div className="space-y-4 text-sm">
            <InfoItem label={t("location")} value={t("locationValue")} />
            <InfoItem label={t("phone")} value={t("phoneValue")} />
            <InfoItem
              label={t("localTime")}
              value={currentTime.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
            <InfoItem label={t("currentWeather")} value={weather} />
            <InfoItem label={t("email")} value={t("emailValue")} />
            <InfoItem label={t("pdf")} value={t("guestFolder")} isLink />
            <InfoItem label={t("link")} value={t("attractions")} isLink />
          </div>
        </motion.div>
      </div>

      {/* Atmosphere Description and Bento Grid */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-primary-color">
          {t("elegantAndWarm")}
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
          {t("atmosphere")}
        </h3>
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          <p className="text-base md:text-lg mb-6 lg:mb-0 leading-relaxed flex-1">
            {/* Nach einem ereignisreichen Tag in der pulsierenden Stadt begrüßen
            wir Sie in einer lichtdurchfluteten, geräumigen Lobby. Die warmen
            und modernen Farben laden zum Verweilen ein und bieten Ihnen die
            Möglichkeit, sich zu entspannen und den Tag Revue passieren zu
            lassen. Unsere Zimmer sind modern und stilvoll eingerichtet und
            bieten Ihnen den perfekten Rückzugsort, um neue Energie zu tanken. */}
            {t("atmosphereDescription")}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 grid-rows-2 sm:grid-rows-4 gap-2 sm:gap-4 w-full lg:w-1/2 max-w-md mx-auto lg:mx-0 overflow-hidden rounded-lg">
            <Image
              src="/images/wideView.jpg"
              alt={t('hotelLobby')}
              width={300}
              height={300}
              className="rounded-lg object-cover col-span-2 row-span-2 transition-transform duration-300 hover:scale-110"
            />
            <Image
              src="/images/chairs.jpg"
              alt={t('barCharlotte')}
              width={150}
              height={150}
              className="rounded-lg object-cover col-span-2 sm:col-span-2 row-span-1 transition-transform duration-300 hover:scale-110"
            />
            <Image
              src="/images/room2.jpg"
              alt={t('befineSportsSpa')}
              width={150}
              height={150}
              className="rounded-lg object-cover col-span-1 row-span-1 sm:row-span-2 transition-transform duration-300 hover:scale-110"
            />
            <Image
              src="/images/room3.jpg"
              alt={t('luxuriousRoom')}
              width={150}
              height={150}
              className="rounded-lg object-cover col-span-1 row-span-1 sm:row-span-2 transition-transform duration-300 hover:scale-110 "
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const InfoItem: React.FC<{
  label?: string;
  value?: string;
  isLink?: boolean;
  icon?: React.ReactNode;
  text?: string;
}> = ({ label, value, isLink = false, icon, text }) => (
  <div className="flex justify-between items-center border-b border-gray-700 pb-2">
    {icon && <span className="mr-2">{icon}</span>}
    <span className="text-gray-400">{label || text}</span>
    {isLink ? (
      <a href="#" className="text-primary-color hover:underline">
        {value}
      </a>
    ) : (
      <span>{value}</span>
    )}
  </div>
);

export default Atmosphere;
