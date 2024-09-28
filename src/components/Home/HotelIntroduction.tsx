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
import Atmosphere from "../Atmosphere";

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
    }, 5000);

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
    "/images/outsideView.jpg",
    "/images/frontView.jpg",
    "/images/wideView.jpg",
    "/images/chocolate.jpg",
    "/images/roomWhite.jpg",
  ];

  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        {/* Updated carousel and hotel information */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="w-full relative">
            <h1
              className="absolute top-0 left-[2vw] transform -translate-y-1/2 z-10 text-white uppercase font-light leading-none tracking-wide whitespace-nowrap overflow-hidden text-ellipsis"
              style={{
                fontSize: "calc(1rem + 2.5vw)",
                textShadow: "2px 2px 2px rgba(0,0,0,0.5)",
              }}
            >
              HOTEL AM BEATLES-PLATZ
            </h1>

            <div className="overflow-hidden rounded-lg" ref={emblaRef}>
              <div className="flex">
                {images.map((src, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <Image
                      src={src}
                      alt={`Hotel am Beatles-Platz ${index + 1}`}
                      width={1200}
                      height={1000}
                      className="w-full h-[500px] lg:h-[600px] object-cover opacity-85"
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
            <h2 className="text-4xl font-semibold mb-8 text-primary-color">
              Willkommen im Hotel am Beatles-Platz
            </h2>
            <p className="text-lg mb-8 leading-relaxed">
              Das Hotel am Beatles-Platz liegt im Herzen Hamburgs, nur wenige
              Gehminuten von der berühmten Reeperbahn und dem Hafen entfernt.
              Unser Haus bietet eine perfekte Mischung aus modernem Komfort und
              hanseatischem Charme.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10 text-primary-color">
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
            <Button
              text="Jetzt buchen"
              className="text-base md:text-lg"
              onClick={() => setIsBookingOpen(true)}
            />
          </motion.div>
        </div>

        {/* New Atmosphere Section */}
        <Atmosphere currentTime={currentTime} weather={weather} />
      </div>
      <BookingPopUp
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
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
