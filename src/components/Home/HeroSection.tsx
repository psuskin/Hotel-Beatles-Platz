"use client";
import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RotatingButton from "../RotatingButton";
import BookingPopUp from "../BookingPopUp";

const HeroSection: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100vh-5rem)] w-full overflow-hidden pt-16"
    >
      {/* Video Background */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/videos/hotelbg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-between text-white px-6 py-12 md:px-12 md:py-16"
        style={{ y: contentY, opacity }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full mt-2">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 md:mb-0 uppercase">
            Hotel am
            <br />
            Beatles-Platz
          </h1>
          <div className="text-right">
            <p className="text-xl md:text-2xl mb-2">Hamburg, Germany</p>
            <p className="text-lg md:text-xl text-primary-color">
              Luxury Redefined
            </p>
          </div>
        </div>

        <div className="self-center md:self-end mb-12">
          <RotatingButton onClick={handleOpenBooking} />
        </div>
      </motion.div>
      {/* BookingPopUp */}
      <BookingPopUp isOpen={isBookingOpen} onClose={handleCloseBooking} />
    </div>
  );
};

export default HeroSection;
