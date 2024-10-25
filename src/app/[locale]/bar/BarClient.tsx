"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";

const BarClient = () => {
  const t = useTranslations("bar");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const titleY = useTransform(scrollY, [0, 300], [0, -50]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const imageScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const springY = useSpring(y, { stiffness: 400, damping: 90 });
  const springImageScale = useSpring(imageScale, {
    stiffness: 400,
    damping: 90,
  });
  return (
    <div className="text-white min-h-screen">
      <section className="relative h-[90vh] overflow-hidden">
        <motion.div
          style={{ y: springY, scale: springImageScale }}
          className="absolute inset-0"
        >
          <Image
            src="/images/wideView2.jpg"
            alt="Bar Interior"
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
            {t("title")}
          </motion.h1>
        </motion.div>
      </section>
    </div>
  );
};

export default BarClient;
