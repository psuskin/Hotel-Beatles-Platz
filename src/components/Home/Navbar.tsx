"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/utils/use-media-query";
import MiniNav from "./MiniNav";
import { BiBed, BiRestaurant } from "react-icons/bi";
import BookingPopUp from "../BookingPopUp";
import { useLocale, useTranslations } from "next-intl";

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
  const locale = useLocale();
  const pathname = usePathname();
  const isActive =
    href === `/${locale}`
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(href);

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
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  const locale = useLocale();
  const t = useTranslations("navbar");

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
    { name: t("home"), href: `/${locale}` },
    { name: t("rooms"), href: `/${locale}/zimmer` },
    { name: t("restaurant"), href: `/${locale}/restaurant` },
    { name: t("gallery"), href: `/${locale}/galerie` },
    { name: t("partners"), href: `/${locale}/partner` },
    { name: t("contact"), href: `/${locale}/kontakt` },
  ];

  return (
    <>
      <MiniNav />
      <nav
        ref={navRef}
        className="w-full z-40 py-5 bg-black/80 backdrop-blur-md relative"
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Hotel name link - visible only below 1024px */}
          <div className="lg:hidden">
            <Link
              href={`/${locale}`}
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
              href={`/${locale}/restaurant`}
              icon={
                <div className="w-24 h-24">
                  {" "}
                  {/* Set the size of the parent div */}
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 2000 2000"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g transform="matrix(1.3333333,0,0,-1.3333333,0,2000)">
                      <g transform="scale(0.1)">
                        <path
                          d="M 14997.7,-2.69922 H -2.30859 V 14997.3 H 14997.7 V -2.69922"
                          style={{
                            fill: "#000000",
                            fillOpacity: 1,
                            fillRule: "nonzero",
                            stroke: "none",
                          }}
                        />
                        <path
                          d="m 5424.58,7342.7 5.14,-1134.02 -1038.09,1144.31 v -154.2 l -15.42,-1277.91 h 71.95 l -5.14,1132.33 1038.1,-1144.31 v 114.78 l 15.41,1319.02 h -71.95"
                          style={{
                            fill: "#f99a95",
                            fillOpacity: 1,
                            fillRule: "nonzero",
                            stroke: "none",
                          }}
                        />
                        <path
                          d="M 6731.62,7382.1 6101.21,5920.88 h 82.25 l 483.06,1200.83 520.77,-1200.83 h 190.14 L 6731.62,7382.1"
                          style={{
                            fill: "#f99a95",
                            fillOpacity: 1,
                            fillRule: "nonzero",
                            stroke: "none",
                          }}
                        />
                        <path
                          d="m 8406.41,6592.39 c 121.61,6.84 215.82,44.54 282.65,109.64 68.5,66.81 102.78,154.16 102.78,263.81 0,118.19 -37.71,210.7 -113.07,277.49 -75.36,66.83 -179.88,99.37 -313.5,99.37 H 7956.88 V 5920.88 h 179.88 V 7291.3 h 233.66 c 114.78,0 203.86,-27.39 267.24,-85.65 61.67,-58.24 94.22,-137.03 94.22,-239.81 0,-99.37 -30.84,-178.16 -92.51,-236.42 -61.66,-58.21 -147.31,-87.36 -255.23,-87.36 h -159.3 l -37.78,0.75 476.3,-721.93 h 193.57 l -450.52,671.51"
                          style={{
                            fill: "#f99a95",
                            fillOpacity: 1,
                            fillRule: "nonzero",
                            stroke: "none",
                          }}
                        />
                        <path
                          d="M 9968.68,7382.1 9338.3,5920.88 h 82.22 L 9903.59,7121.71 10426,5920.88 h 188.5 L 9968.68,7382.1"
                          style={{
                            fill: "#f99a95",
                            fillOpacity: 1,
                            fillRule: "nonzero",
                            stroke: "none",
                          }}
                        />
                        <path
                          d="m 8360.89,8301.28 c -66.64,-40.85 -134.89,-76.32 -204.43,-106.2 -451.65,-194.12 -890.62,-112.75 -1304.32,242.16 254.63,221.2 535.48,336.43 835.04,342.66 5.59,0 11.29,0.11 16.77,0.11 283.43,0 562.03,-111.68 851.49,-341.05 -62.88,-51.05 -127.91,-97.06 -194.55,-137.68 z m -1979.53,701.11 c 105.23,-31.17 201.42,-97.38 272.69,-188.2 65.88,-85.13 108.56,-189.93 127.15,-311.49 -147.36,138.65 -285.05,310.63 -399.84,499.69 z m 396.62,-632 c -5.81,-42.14 -16.23,-84.81 -30.96,-127.16 l -0.11,-0.21 c -52.88,-162.41 -177.13,-296.01 -332.45,-357.82 -9.67,-3.97 -21.17,-8.38 -33.42,-12.03 115.54,188.42 252.26,359.32 396.94,497.22 z m 1899.45,101.03 c -156.07,125.33 -305.36,217.66 -455.95,282.04 -600.51,265.59 -1089.67,8.71 -1397.82,-259.25 -6.02,53.96 -17.52,107.16 -34.61,158 -66.75,223.57 -266.46,394.68 -497.01,425.74 l -17.41,2.37 27.73,-47.83 c 136.93,-237.86 291.28,-438.11 459.06,-595.25 -91.36,-83.94 -177.45,-180.25 -263.33,-294.5 -84.27,-109.64 -154.57,-218.2 -214.76,-331.81 l -8.06,-15.04 16.99,2.47 c 157.03,24.29 302.03,110.92 397.79,238.07 70.51,93.73 116.52,212.5 133.5,344.49 159.93,-138.01 331.16,-240.44 509.47,-304.5 119.2,-42.46 245.17,-63.85 374.58,-63.85 405.54,0 750.35,213.47 968.11,392.43 l 40.37,33.48 -38.65,32.94"
                          style={{
                            fill: "#f99a95",
                            fillOpacity: 1,
                            fillRule: "nonzero",
                            stroke: "none",
                          }}
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              }
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
