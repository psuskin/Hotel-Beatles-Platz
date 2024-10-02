"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface SubHeaderProps {
  title: string;
  description: string;
  imageSrc: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  title,
  description,
  imageSrc,
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const titleY = useTransform(scrollY, [0, 300], [0, -50]);
  const descriptionY = useTransform(scrollY, [0, 300], [0, 50]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex flex-col justify-center items-center text-white"
        style={{ scale }}
      >
        <motion.h1
          className="text-4xl sm:text-6xl font-bold mb-6 uppercase text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ y: titleY }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-xl max-w-2xl text-center px-1"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ y: descriptionY }}
        >
          {description}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SubHeader;
