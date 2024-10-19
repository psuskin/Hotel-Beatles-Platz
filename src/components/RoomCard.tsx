"use client";

import React from "react";
import Image from "next/image";
import { FaWifi, FaSnowflake, FaShower, FaTv, FaLeaf } from "react-icons/fa";
import { FaHelmetSafety } from "react-icons/fa6";
import Button from "@/components/Buttons/Button";
import { motion } from "framer-motion";
import RoomGallery from "./RoomGallery";
import { Camera } from "lucide-react"; // Import the camera icon

const roomImages: { [key: string]: string } = {
  CLASSIC: "/images/Classic.jpg",
  COMFORT: "/images/Comfort.jpg",
  "COMFORT PLUS": "/images/ComfortPlus.jpg",
  PREMIUM: "/images/Premium.jpg",
};

const featureIcons: { [key: string]: React.ReactElement } = {
  SPIND: <FaHelmetSafety />,
  KLIMAANLAGE: <FaSnowflake />,
  REGENDUSCHE: <FaShower />,
  // "43″ TV": <FaTv />,
  "MINI-BAR": <FaLeaf />,
};

interface RoomCardProps {
  name: string;
  description: string;
  features: string[];
  color: string;
  size: string;
  capacity: string;
  onBookNow: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  name,
  description,
  features,
  color,
  size,
  capacity,
  onBookNow,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative group h-full flex flex-col"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} rounded-lg opacity-30`}
      ></div>
      <div className="relative bg-gray-900 rounded-lg p-4 md:p-8 transition-all duration-300 group-hover:bg-gray-800 flex flex-col h-full">
        <div className="relative w-full h-96 mb-6 overflow-hidden group">
          <Image
            src={roomImages[name]}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
            <RoomGallery
              roomName={name}
              trigger={
                <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 duration-200">
                  <Camera className="w-4 h-4 mr-2" />
                  View Gallery
                </button>
              }
            />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <h2 className="text-3xl font-bold text-[#E68945] transition-colors duration-300 group-hover:text-white">
            {name}
          </h2>
        </div>
        <p className="text-gray-100 mb-6 flex-grow">{description}</p>
        <div className="flex flex-col gap-4 mb-6">
          {features.map((feature) => (
            <div key={feature} className="flex items-center">
              <span className="text-primary-color mr-2 text-lg transition-colors duration-300 group-hover:text-white">
                {featureIcons[feature] || <FaWifi />}
              </span>
              <span className="text-sm text-gray-100">{feature}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-auto">
          <div>
            <p className="text-lg font-semibold text-gray-100">{size}</p>
            <p className="text-sm text-gray-500">{capacity}</p>
          </div>
          <Button
            text="Book Now"
            onClick={onBookNow}
            className="transition-transform duration-300 group-hover:translate-x-2"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;
