"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/utils/use-media-query";
import MiniNav from "./MiniNav";
import { BiBed, BiRestaurant } from "react-icons/bi";
import BookingPopUp from "../BookingPopUp"; // Add this import

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
  className?: string;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  mobile,
  className,
  onClick,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${
        mobile ? "block py-3 text-lg" : "px-3 py-2 rounded-md"
      } hover:bg-white/25 transition-all duration-300 ease-in-out ${
        isActive
          ? "bg-white/25 text-secondary-color font-bold"
          : "text-white/90"
      } ${mobile && isActive ? "border-l-4 border-secondary-color pl-2" : ""} ${
        className || ""
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const BookButton: React.FC<{
  href: string;
  icon: React.ReactNode;
  color: string;
}> = ({ href, icon, color }) => (
  <Link href={href} className="group">
    <div
      className={`w-20 h-20 ${color} transform rotate-6 transition-transform duration-300 group-hover:translate-y-1 flex flex-col items-center justify-center`}
    >
      <div className="text-white mb-1">{icon}</div>
      <div className="text-white text-xs font-semibold"></div>
    </div>
  </Link>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false); // Add this state
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const openBooking = () => {
    setIsBookingOpen(true);
    closeMenu();
  };

  const navItems = [
    { name: "STARTSEITE", href: "/" },
    { name: "ZIMMER", href: "/zimmer" },
    { name: "RESTAURANT", href: "/restaurant" },
    { name: "GALERIE", href: "/galerie" },
    { name: "PARTNER", href: "/partner" },
    { name: "KONTAKT", href: "/kontakt" },
  ];

  return (
    <>
      <MiniNav />
      <nav
        ref={navRef}
        className="w-full z-50 py-5 bg-black/80 backdrop-blur-md relative"
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Hotel name link - visible only below 1024px */}
          <div className="lg:hidden">
            <Link
              href="/"
              className="text-base font-bold text-primary-color uppercase"
              onClick={closeMenu}
            >
              <span>Hotel am Beatles-Platz</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center lg:justify-start xl:justify-center flex-grow">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="mx-1"
              >
                <NavLink
                  href={item.href}
                  className="text-base font-medium hover:text-white"
                  onClick={closeMenu}
                >
                  {item.name}
                </NavLink>
              </motion.div>
            ))}
          </div>

          {/* Book buttons */}
          <div className="hidden lg:flex space-x-1 absolute right-10 bottom-0 translate-y-1/2 gap-3">
            <BookButton
              href="/restaurant"
              icon={<BiRestaurant size={24} />}
              color="bg-gray-700"
            />
            <div onClick={openBooking} className="cursor-pointer">
              <BookButton
                href="#"
                icon={<BiBed size={24} />}
                color="bg-primary-color"
              />
            </div>
          </div>

          {/* Hamburger Menu */}
          <div className="lg:hidden">
            <motion.button
              onClick={toggleMenu}
              className="text-white focus:outline-none w-8 h-8 relative z-50"
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">Open main menu</span>
              <div className="absolute -left-4 top-1/2 w-8 h-0.5 -mt-0.5 transition duration-300 ease-in-out">
                <motion.span
                  className="absolute h-0.5 w-8 bg-primary-color transform"
                  animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                ></motion.span>
                <motion.span
                  className="absolute h-0.5 w-8 bg-primary-color transform"
                  animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                ></motion.span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-black/95 backdrop-blur-lg text-center absolute left-0 right-0 z-20"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <NavLink href={item.href} mobile onClick={closeMenu}>
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <button
                    className="bg-primary-color text-white px-4 py-3 rounded-full inline-block text-center font-semibold shadow-lg mb-4 cursor-pointer"
                    onClick={openBooking}
                  >
                    BUCHEN
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <BookingPopUp
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
};

export default Navbar;
