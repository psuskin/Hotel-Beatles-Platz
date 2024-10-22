"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { Building2, Users } from "lucide-react";
import CardGallery from "../CardGallery";
import Button from "../Buttons/Button";
import BookingPopUp from "../BookingPopUp";
import WhiteSection from "../WhiteSection";
import { useTranslations } from "next-intl";

interface RoomType {
  id: number;
  title: string;
  description: string;
  images: string[];
  size: string;
  occupancy: string;
  amenities: string[];
  price: string;
}

const FeaturesSection: React.FC = () => {
  const t = useTranslations("featuresSection");
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [showStickyMenu, setShowStickyMenu] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top } = containerRef.current.getBoundingClientRect();
        const cards = document.querySelectorAll(".room-card");

        if (cards.length >= 3) {
          const thirdLastCard = cards[cards.length - 3].getBoundingClientRect();
          setShowStickyMenu(
            top < 0 && thirdLastCard.bottom > window.innerHeight
          );
        } else {
          setShowStickyMenu(top < 0);
        }

        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveCard(index);
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  return (
    <section ref={containerRef} className="text-black relative">
      <WhiteSection />
      <div className="py-6 md:py-10 px-1 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        {/* Sticky menu */}
        <motion.div
          className="sticky hidden md:block lg:top-[6rem] customSticky-top z-50 rounded-lg transition-all duration-300 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: showStickyMenu ? 1 : 0,
            y: showStickyMenu ? 0 : -20,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex justify-center items-center space-x-8 py-4">
              {roomTypes.map((room, index) => (
                <li
                  key={room.id}
                  className={`
                    cursor-pointer
                    transition-all duration-300 ease-in-out
                    text-lg font-semibold
                    relative
                    px-2 py-1
                    ${
                      index === activeCard
                        ? "text-primary-color"
                        : "text-gray-400 hover:text-gray-200"
                    }
                  `}
                  onClick={() =>
                    document
                      .querySelector(`.room-card-${index}`)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {room.title === "COMFORT PLUS"
                    ? t("roomTypes.comfortplus.title")
                    : t(`roomTypes.${room.title.toLowerCase()}.title`)}
                  <span
                    className={`
                    absolute bottom-0 left-1/2 transform -translate-x-1/2
                    w-0 h-0.5 bg-primary-color
                    transition-all duration-300 ease-in-out
                    ${
                      index === activeCard
                        ? "w-full opacity-100"
                        : "w-0 opacity-0"
                    }
                  `}
                  ></span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Room cards */}
        <div className="w-full">
          {roomTypes.map((room, i) => (
            <RoomCard
              key={room.id}
              room={room}
              i={i}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={1 - (roomTypes.length - i) * 0.05}
              onBookNow={handleBookNow}
              t={t}
            />
          ))}
        </div>
      </div>
      <BookingPopUp
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </section>
  );
};

const RoomCard: React.FC<{
  room: RoomType;
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onBookNow: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}> = ({ room, i, progress, range, targetScale, onBookNow, t }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className={`room-card room-card-${i} min-h-screen flex items-center justify-center sticky top-0 lg:top-[5rem] custom-top`}
    >
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
        className="flex flex-col relative bg-black border border-gray-800 rounded-xl shadow-xl overflow-hidden w-[100vw] max-w-[1200px] h-auto md:h-[500px] origin-top"
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full md:w-1/2 h-[300px] md:h-full flex items-center justify-center">
            <div className="w-full h-full md:h-[80%]">
              <CardGallery images={room.images} />
            </div>
          </div>
          <div className="p-4 md:p-8 w-full md:w-1/2 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-primary-color">
              {room.title === "COMFORT PLUS"
                ? t("roomTypes.comfortplus.title")
                : t(`roomTypes.${room.title.toLowerCase()}.title`)}
            </h3>
            <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
              {room.title === "COMFORT PLUS"
                ? t("roomTypes.comfortplus.description")
                : t(`roomTypes.${room.title.toLowerCase()}.description`)}
            </p>
            <div className="flex justify-between mb-4 md:mb-6">
              <div className="flex items-center text-gray-300">
                <Building2 className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 text-primary-color" />
                <span className="text-sm md:text-base">{room.size}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Users className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 text-primary-color" />
                <span className="text-sm md:text-base">{t(`occupancy.${room.occupancy}`)}</span>
              </div>
            </div>
            <div className="mb-4 md:mb-6">
              <h4 className="font-semibold mb-2 text-gray-200 text-sm md:text-base">
                {t("amenitiesTitle")}
              </h4>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-gray-200 px-2 py-1 rounded-full text-xs md:text-sm"
                  >
                    {t(`amenities.${amenity.toLowerCase().replace(' ', '_')}`)}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xl md:text-2xl font-bold text-gray-200">
                {t('price', { price: room.price.split(' ')[0] })}
              </p>
              <Button text={t('bookNow')} onClick={onBookNow} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const roomTypes: RoomType[] = [
  {
    id: 1,
    title: "CLASSIC",
    description: "classic.description",
    images: [
      "/images/Classic.jpg",
      "/images/Classic-2.jpg",
      "/images/Classic.jpg",
    ],
    size: "14 m²",
    occupancy: "2 Guests",
    amenities: ["Free Wi-Fi", "Air conditioning", "Safe", "Mini-bar"],
    price: "€99 / night",
  },
  {
    id: 2,
    title: "COMFORT",
    description: "comfort.description",
    images: [
      "/images/Comfort.jpg",
      "/images/Comfort-2.jpg",
      "/images/Comfort.jpg",
    ],
    size: "16 m²",
    occupancy: "2 Guests",
    amenities: ["Free Wi-Fi", "Air conditioning", "Safe", "Mini-bar"],
    price: "€149 / night",
  },
  {
    id: 3,
    title: "COMFORT PLUS",
    description: "comfortplus.description",
    images: [
      "/images/ComfortPlus.jpg",
      "/images/ComfortPlus-2.jpg",
      "/images/ComfortPlus.jpg",
    ],
    size: "18 m²",
    occupancy: "3 Guests",
    amenities: ["Free Wi-Fi", "Air conditioning", "Safe", "Mini-bar"],
    price: "€129 / night",
  },
  {
    id: 4,
    title: "PREMIUM",
    description: "premium.description",
    images: [
      "/images/Premium.jpg",
      "/images/Premium-2.jpg",
      "/images/Premium.jpg",
    ],
    size: "22 m²",
    occupancy: "3 Guests",
    amenities: ["Free Wi-Fi", "Air conditioning", "Safe", "Mini-bar"],
    price: "€199 / night",
  },
];

export default FeaturesSection;
