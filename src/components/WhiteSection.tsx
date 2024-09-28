"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";

const images1 = [
  "/images/outSitting.jpg",
  "/images/vasin.jpg",
  "/images/reading.jpg",
];

const images2 = ["/images/drinks.jpg", "/images/room.jpg", "/images/room2.jpg"];

const ImageColumn: React.FC<{ images: string[]; direction: "up" | "down" }> = ({
  images,
  direction,
}) => {
  return (
    <div className="w-full sm:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg relative">
      <motion.div
        animate={{
          y: direction === "up" ? [0, -1200, 0] : [-1200, 0, -1200],
        }}
        transition={{
          y: { duration: 40, ease: "linear", repeat: Infinity },
        }}
        className="flex flex-col"
      >
        {[...images, ...images, ...images].map((src, index) => (
          <div key={index} className="mb-4 relative h-[300px] sm:h-[400px]">
            <Image
              src={src}
              alt={`Hotel image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </div>
  );
};

export default function WhiteSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section className="bg-white text-black py-12 sm:py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-stretch">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0"
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
            variants={itemVariants}
          >
            <span className="text-primary-color">MODERN.</span> <br /> NEW.
            TIMELESS.
          </motion.h2>
          <motion.h3
            className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8"
            variants={itemVariants}
          >
            WILLKOMMEN AN DER YAKSHIS BAR
          </motion.h3>
          <motion.p
            className="text-gray-700 mb-6 sm:mb-8 leading-relaxed max-w-xl text-sm sm:text-base"
            variants={itemVariants}
          >
            Nach einer 5 jährigen Bauphase haben wir unsere Türen als 4-Sterne
            Superior Hotel in der lebendigsten Umgebung Hamburg´s: St. Pauli
            eröffnet. Mit insgesamt 53 Zimmern und drei verschiedenen
            Zimmerkategorien, bieten wir unseren Gästen eine zeitlose
            Unterkunft. Genießen Sie hochklassigen Komfort während Ihrer
            Städtereise und machen Sie Ihren Aufenthalt in der schönen
            Hansestadt Hamburg unvergesslich sowie einzigartig.
          </motion.p>
          <button className="bg-primary-color text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-secondary-color transition duration-300 transform text-sm sm:text-base">
            MEHR ERFAHREN
          </button>
        </motion.div>
        <div className="lg:w-1/2 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 relative mt-8 lg:mt-0">
          <motion.div
            className="absolute -top-8 left-0 right-0 z-10 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2
              className="font-normal text-black uppercase inline-block transition-all duration-300 ease-in-out"
              style={{
                fontSize: "clamp(1.875rem, 4.5vw, 4.5rem)",
                lineHeight: "0.5",
                whiteSpace: "nowrap",
              }}
            >
              BEATLES-PLATZ
            </h2>
          </motion.div>
          <ImageColumn images={images1} direction="up" />
          <ImageColumn images={images2} direction="down" />
        </div>
      </div>
    </section>
  );
}
