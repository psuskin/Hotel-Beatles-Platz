"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { MoveRight, MoveLeft } from "lucide-react";

const slides = [
  {
    title: "SUSHI-RESTAURANT",
    subtitle: "IM HERZEN ST. PAULIS",
    image: "/images/hotel1.jpg",
  },
  {
    title: "COCKTAIL BAR",
    subtitle: "EINZIGARTIGE MIXOLOGIE",
    image: "/images/hotel2.jpg",
  },
  {
    title: "GEMÜTLICHE LOUNGE",
    subtitle: "FÜR ENTSPANNTE ABENDE",
    image: "/images/hotel3.jpg",
  },
];

export default function RestaurantShowcase() {
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

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
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
          </h2>
          <p className="text-xs sm:text-sm lg:text-base mb-4 sm:mb-6">
            Das hoteleigene HOTEL AM BEATLES-PLATZ Restaurant zählt zu den
            angesagten Ausgeh-Adressen in Hamburg und ist bei Hotelgästen und
            Hamburger*innen gleichermaßen beliebt. Es befindet sich in den
            Gemäuern einer ehemaligen Eisengießerei. Hinweise auf seine
            historische Vergangenheit findet man im Restaurant an zahlreichen
            Orten, in den Wänden und in den erhaltenen baulichen Strukturen.
          </p>
          <p className="text-xs sm:text-sm lg:text-base mb-6 sm:mb-8">
            Das Küchenteam um Eric Kröber und Sushichef Ngima Sherpa versorgt
            Sie mit ausgefallenem Sushi und Sashimi, Salaten, Fisch- und
            Fleischgerichten und Süßem aus der eigenen Pâtisserie.
          </p>
          <button className="bg-primary-color text-gray-900 px-4 sm:px-6 py-2 rounded-full self-start hover:bg-secondary-color transition duration-300 text-sm sm:text-base">
            MEHR ERFAHREN
          </button>
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
                {slides[currentSlide].title}
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
                {slides[currentSlide].subtitle}
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
                alt={slides[currentSlide].title}
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
