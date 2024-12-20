"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { MoveRight, MoveLeft } from "lucide-react";
import { useTranslations } from "next-intl";

// const slides = [
//   {
//     title: "SUSHI-RESTAURANT",
//     subtitle: "IM HERZEN ST. PAULIS",
//     image: "/images/wideView2.jpg",
//   },
//   {
//     title: "COCKTAIL BAR",
//     subtitle: "EINZIGARTIGE MIXOLOGIE",
//     image: "/images/wideView.jpg",
//   },
//   {
//     title: "GEMÜTLICHE LOUNGE",
//     subtitle: "FÜR ENTSPANNTE ABENDE",
//     image: "/images/chairs.jpg",
//   },
// ];

const slides = [
  {
    titleKey: "sushiRestaurantTitle",
    subtitleKey: "sushiRestaurantSubtitle",
    image: "/images/wideView2.jpg",
  },
  {
    titleKey: "cocktailBarTitle",
    subtitleKey: "cocktailBarSubtitle",
    image: "/images/wideView.jpg",
  },
  {
    titleKey: "loungeTitle",
    subtitleKey: "loungeSubtitle",
    image: "/images/chairs.jpg",
  },
];

export default function RestaurantShowcase() {
  const t = useTranslations("restaurantBar");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const controls = useAnimation();
  const textRef = useRef(null);

  const changeSlide = useCallback((direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay) {
      interval = setInterval(() => {
        changeSlide("next");
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, changeSlide]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = textRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls]);

  const nextSlide = () => changeSlide("next");
  const prevSlide = () => changeSlide("prev");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black justify-center items-center">
      <motion.div
        ref={textRef}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
          },
        }}
        className="w-full lg:w-[45%] flex flex-col justify-center items-center lg:items-end p-4 sm:p-6 md:p-8 lg:p-16 lg:pr-0 relative z-10"
      >
        <div className="bg-gray-900 bg-opacity-90 text-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg w-full max-w-2xl lg:max-w-3xl xl:max-w-5xl lg:absolute lg:right-[-40px] xl:right-[-80px]">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-primary-color mb-4">
            HOTEL AM BEATLES-PLATZ RESTAURANT & BAR
            {t("restaurantBarTitle")}
          </h2>
          <p className="text-xs sm:text-sm lg:text-base mb-4 sm:mb-6">
            {t("restaurantDescription")}
            {/* Das zukünftige HOTEL AM BEATLES-PLATZ Restaurant wird zu den
            angesagten Locations in Hamburg zählen und sowohl Hotelgäste als
            auch Hamburger*innen gleichermaßen begeistern. Es wird in den
            Gemäuern einer ehemaligen Eisengießerei entstehen. Hinweise auf
            seine historische Vergangenheit werden im Restaurant an zahlreichen
            Orten, in den Wänden und in den erhaltenen baulichen Strukturen zu
            finden sein. */}
          </p>
          <p className="text-xs sm:text-sm lg:text-base mb-6 sm:mb-8">
            {/* Das zukünftige Küchenteam wird Sie mit ausgefallenem Sushi und
            Sashimi, Salaten, Fisch- und Fleischgerichten und Süßem aus der
            eigenen Pâtisserie verwöhnen. */}
            {t("kitchenTeamDescription")}
          </p>
          {/* <button className="bg-primary-color text-gray-900 px-4 sm:px-6 py-2 rounded-full self-start hover:bg-secondary-color transition duration-300 text-sm sm:text-base">
            COMING SOON
          </button> */}
        </div>
      </motion.div>
      <div className="w-full lg:w-[55%] flex flex-col justify-end relative mt-8 lg:mt-0">
        <div
          className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[75vh] w-full"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <div className="absolute -top-8 sm:-top-12 md:-top-16 left-0 right-0 z-10 flex flex-col justify-center items-center text-white py-2 sm:py-4">
            <AnimatePresence mode="wait">
              <motion.h2
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-light mb-1 sm:mb-2 text-center"
              >
                {t(slides[currentSlide].titleKey)}
              </motion.h2>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={`subtitle-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl font-light text-center"
              >
                {t(slides[currentSlide].subtitleKey)}
              </motion.p>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={slides[currentSlide].image}
                alt={t(slides[currentSlide].titleKey)}
                fill
                style={{ objectFit: "cover" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 sm:px-8 md:px-12 lg:px-16">
          <motion.button
            onClick={prevSlide}
            className="p-1 sm:p-2 rounded-full hover:scale-105 transition duration-300"
            aria-label="Previous slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MoveLeft className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="p-1 sm:p-2 hover:scale-105 transition duration-300"
            aria-label="Next slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MoveRight className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
