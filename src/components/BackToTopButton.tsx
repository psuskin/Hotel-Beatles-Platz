"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useMediaQuery } from "@/utils/use-media-query";

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isLargeScreen) {
    return null; // Don't render the button on mobile devices
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary-color text-black w-14 h-14 rounded-full shadow-lg hover:shadow-2xl focus:outline-none transform hover:scale-110 transition-all duration-300 group z-50"
          aria-label="Back to top"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-full h-full overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-br from-[#BF8970] to-[#8C6954] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ArrowUp
                size={24}
                className="transform group-hover:translate-y-[-2px] transition-transform duration-300"
              />
            </div>
          </div>
          <motion.div
            className="absolute inset-0 bg-white rounded-full"
            style={{ mixBlendMode: 'soft-light' }}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: [1.5, 1], opacity: [0, 0.15, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
