"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { motion } from "framer-motion";
import Image from "next/image";
import { Bed, UtensilsCrossed, GlassWater, Car } from "lucide-react";
import { fetchWeather } from "@/utils/fetchWeather";
import Button from "../Buttons/Button";
import BookingPopUp from "../BookingPopUp";

const HotelIntroduction: React.FC = () => {
  const options: EmblaOptionsType = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState<string>("Loading...");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);

    // Auto-play functionality
    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000); // Change slide every 5 seconds

    return () => {
      clearInterval(autoplay);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    const getWeather = async () => {
      try {
        const weatherData = await fetchWeather();
        setWeather(weatherData);
      } catch (error) {
        console.error("Error setting weather:", error);
        setWeather("Weather data unavailable");
      }
    };

    getWeather();

    return () => clearInterval(timer);
  }, []);

  const images = [
    "/images/hotel1.jpg",
    "/images/hotel2.jpg",
    "/images/hotel3.jpg",
    "/images/hotel3.jpg",
  ];

  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        {/* Existing carousel and hotel information */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          {/* Carousel */}
          <div className="w-full lg:w-1/2">
            <div
              className="overflow-hidden rounded-lg shadow-lg"
              ref={emblaRef}
            >
              <div className="flex">
                {images.map((src, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <Image
                      src={src}
                      alt={`Hotel am Beatles-Platz ${index + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-[500px] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full mx-1 transition-all duration-500 ${
                    currentSlide === index
                      ? "bg-primary-color w-8"
                      : "bg-neutral-200"
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>
          </div>

          {/* Hotel Information */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-primary-color">
              Willkommen im Hotel am Beatles-Platz
            </h2>
            <p className="text-lg mb-8 leading-relaxed">
              Das Hotel am Beatles-Platz liegt im Herzen Hamburgs, nur wenige
              Gehminuten von der berühmten Reeperbahn und dem Hafen entfernt.
              Unser Haus bietet eine perfekte Mischung aus modernem Komfort und
              hanseatischem Charme.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              <InfoItem
                icon={<Bed className="w-6 h-6" />}
                text="60 luxuriöse Zimmer"
              />
              <InfoItem
                icon={<UtensilsCrossed className="w-6 h-6" />}
                text="Gourmet-Restaurant"
              />
              <InfoItem
                icon={<GlassWater className="w-6 h-6" />}
                text="Rooftop-Bar mit Ausblick"
              />
              <InfoItem
                icon={<Car className="w-6 h-6" />}
                text="Tiefgarage verfügbar"
              />
            </div>
            {/* <motion.button
              className="bg-primary-color text-black px-8 py-3 rounded-full font-semibold text-lg tracking-wider hover:bg-opacity-90 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Jetzt buchen
            </motion.button> */}

            <Button
              text="Jetzt buchen"
              className="text-base md:text-lg"
              onClick={() => setIsBookingOpen(true)}
            />

            <BookingPopUp
              isOpen={isBookingOpen}
              onClose={() => setIsBookingOpen(false)}
            />
          </motion.div>
        </div>

        {/* New Atmosphere Section */}
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
              <div className="space-y-4 text-sm">
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
                <InfoItem label="PDF" value="Gästemappe" isLink />
                <InfoItem
                  label="Link"
                  value="Nachhaltigkeitszertifikat"
                  isLink
                />
                <InfoItem label="Link" value="Sehenswürdigkeiten" isLink />
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
              Elegant und Warm
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
              ATMOSPHÄRE
            </h3>
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
              <p className="text-base md:text-lg mb-6 lg:mb-0 leading-relaxed flex-1">
                Nach einem ereignisreichen Tag in der pulsierenden Stadt
                begrüßen wir Sie in einer lichtdurchfluteten, großzügigen Lobby.
                In unserer Bar Charlotte können Sie sich zurücklehnen und
                durchatmen, bevor Sie in den großen Indoorpool in unserem 3.000
                m² großen Befine Sports & Spa eintauchen.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 grid-rows-2 sm:grid-rows-4 gap-2 sm:gap-4 w-full lg:w-1/2 max-w-md mx-auto lg:mx-0">
                <Image
                  src="/images/hotel1.jpg"
                  alt="Hotel Lobby 1"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover col-span-2 row-span-2"
                />
                <Image
                  src="/images/hotel2.jpg"
                  alt="Bar Charlotte"
                  width={150}
                  height={150}
                  className="rounded-lg object-cover col-span-2 sm:col-span-2 row-span-1"
                />
                <Image
                  src="/images/hotel3.jpg"
                  alt="Befine Sports & Spa"
                  width={150}
                  height={150}
                  className="rounded-lg object-cover col-span-1 row-span-1 sm:row-span-2"
                />
                <Image
                  src="/images/hotel1.jpg"
                  alt="Luxurious Room"
                  width={150}
                  height={150}
                  className="rounded-lg object-cover col-span-1 row-span-1 sm:row-span-2"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
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

export default HotelIntroduction;
