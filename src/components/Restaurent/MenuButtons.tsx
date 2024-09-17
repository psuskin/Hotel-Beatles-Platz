import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const MenuButtons = ({ menuItems }: { menuItems: string[] }) => {
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        setIsOverflowing(
          scrollContainerRef.current.offsetWidth <
            scrollContainerRef.current.scrollWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="absolute bottom-20 left-0 right-0 flex justify-center"
    >
      <div
        ref={scrollContainerRef}
        className={`flex flex-nowrap overflow-x-auto pb-4 ${
          isOverflowing ? "justify-start" : "justify-center"
        } max-w-full md:flex-wrap md:justify-center`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            className="bg-gray-800 text-white px-5 py-4 m-1 text-sm rounded-sm transition-colors hover:bg-secondary-color flex-shrink-0 whitespace-nowrap"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.button>
        ))}
      </div>
      {isOverflowing && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-color to-transparent opacity-70" />
      )}
    </motion.div>
  );
};

export default MenuButtons;