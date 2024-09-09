"use client";
import React, { useState } from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative h-12 rounded-full bg-white px-5 text-black ${className}`}
    >
      <span className="relative inline-flex overflow-hidden">
        <div
          className={`transition duration-500 uppercase ${
            isHovered
              ? "-translate-y-[125%] skew-y-12"
              : "translate-y-0 skew-y-0"
          }`}
        >
          {text}
        </div>
        <div
          className={`absolute transition duration-500 uppercase ${
            isHovered
              ? "translate-y-0 skew-y-0"
              : "translate-y-[125%] skew-y-12"
          }`}
        >
          {text}
        </div>
      </span>
    </button>
  );
};

export default Button;
