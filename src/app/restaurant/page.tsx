"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import MenuButtons from "@/components/Restaurent/MenuButtons";
import RestaurantIntro from "@/components/Restaurent/RestaurantIntro";
import FoodSection from "@/components/Restaurent/FoodSection";
import DiningCard from "@/components/Restaurent/DiningCard";

const menuItems = [
  "BREAKFAST",
  "LUNCH & SNACKS",
  "DINNER",
  "OPENING HOURS",
  "SUSTAINABLE KITCHEN",
  "EAST HONEY",
];

const RestaurantPage = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const titleY = useTransform(scrollY, [0, 300], [0, -50]);
  const descriptionY = useTransform(scrollY, [0, 300], [0, 50]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const imageScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const springY = useSpring(y, { stiffness: 400, damping: 90 });
  const springImageScale = useSpring(imageScale, {
    stiffness: 400,
    damping: 90,
  });

  return (
    <div className="text-white min-h-screen">
      {/* SubHeader Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <motion.div
          style={{ y: springY, scale: springImageScale }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
            alt="Restaurant Interior"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-center text-center"
          style={{ scale }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 text-secondary-color"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: titleY }}
          >
            HOTEL AM BEATLES PLATZ
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ y: descriptionY }}
          >
            A Culinary Journey Through Flavors
          </motion.p>
        </motion.div>
        <MenuButtons menuItems={menuItems} />
      </section>

      <RestaurantIntro />
      <FoodSection />
      <DiningCard />
    </div>
  );
};

export default RestaurantPage;
