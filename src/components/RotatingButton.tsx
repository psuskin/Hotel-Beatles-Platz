import React from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const MoveRightIcon: LucideIcon = MoveRight;

interface RotatingButtonProps {
  onClick: () => void;
}

const RotatingButton: React.FC<RotatingButtonProps> = ({ onClick }) => {
  return (
    <motion.div
      className="relative w-36 h-36 group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-color to-primary-color-dark flex items-center justify-center">
        <div className="w-3/4 h-3/4 rounded-full bg-white flex items-center justify-center overflow-hidden">
          <motion.div
            className="text-primary-color"
            initial={{ rotate: -45 }}
            animate={{ rotate: -45 }}
            whileHover={{ rotate: 0, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <MoveRightIcon size={30} />
          </motion.div>
        </div>
      </div>
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
        <text fontSize="7.5">
          <textPath
            xlinkHref="#circle"
            className="text-white text-[10px] font-medium uppercase tracking-widest"
          >
            Book Now • Book Now • Book Now •
          </textPath>
        </text>
      </svg>
    </motion.div>
  );
};

export default RotatingButton;
