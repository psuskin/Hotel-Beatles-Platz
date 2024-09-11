import React from "react";
import { motion } from "framer-motion";

interface RotatingButtonProps {
  onClick: () => void;
}

export default function RotatingButton({ onClick }: RotatingButtonProps) {
  return (
    <motion.div
      className="relative w-40 h-40 group cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-color to-primary-color-dark flex items-center justify-center"
        whileHover={{ rotate: 180 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <div className="w-3/4 h-3/4 rounded-full bg-white flex items-center justify-center overflow-hidden">
          <motion.svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary-color"
            initial={{ rotate: 45 }}
            whileHover={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <motion.path
              d="M5 27L27 5M27 5H10M27 5V22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.svg>
        </div>
      </motion.div>
      <svg
        className="absolute inset-0 w-full h-full animate-spin-slow"
        viewBox="0 0 100 100"
      >
        <defs>
          <path
            id="circle"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text>
          <textPath
            xlinkHref="#circle"
            className="text-white text-[10px] font-medium uppercase tracking-wider fill-current"
            startOffset="0%"
          >
             BOOK NOW • BOOK NOW • BOOK NOW •
          </textPath>
        </text>
      </svg>
      <motion.div
        className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      />
    </motion.div>
  );
}
