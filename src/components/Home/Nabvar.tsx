"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/utils/use-media-query";

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
}) => (
  <Link
    href={href}
    className={`${
      mobile ? "block py-3 text-lg" : ""
    } hover:text-primary-color transition-colors duration-300 ${
      className || ""
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { name: "STARTSEITE", href: "/" },
    { name: "ZIMMER", href: "/zimmer" },
    { name: "RESTAURANT", href: "/restaurant" },
    { name: "GALERIE", href: "/galerie" },
    { name: "PARTNER", href: "/partner" },
    { name: "KONTAKT", href: "/kontakt" },
  ];

  return (
    <motion.nav
      ref={navRef}
      className={`w-full z-50 py-4 ${
        !isLargeScreen ? "fixed top-0 left-0 right-0" : ""
      } ${scrolled && isLargeScreen ? "bg-black/80 backdrop-blur-lg" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-primary-color"
          onClick={closeMenu}
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hotel am */}
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <NavLink
                href={item.href}
                className="text-lg font-medium"
                onClick={closeMenu}
              >
                {item.name}
              </NavLink>
            </motion.div>
          ))}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <NavLink
              href="/buchen"
              className="bg-primary-color text-black hover:text-white px-6 py-2 rounded-full font-semibold text-lg tracking-wider shadow-lg hover:shadow-xl transition-shadow duration-300"
              onClick={closeMenu}
            >
              BUCHEN
            </NavLink>
          </motion.div>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
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
            className="md:hidden bg-black/70 backdrop-blur-lg text-center absolute top-0 left-0 right-0 z-20"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <div className="flex justify-between items-center mb-4">
                <Link
                  href="/"
                  className="text-2xl font-bold text-primary-color"
                  onClick={closeMenu}
                >
                  Hotel am
                </Link>
              </div>
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
                <NavLink
                  href="/buchen"
                  mobile
                  className="bg-primary-color text-black px-4 py-2 rounded-full inline-block text-center font-semibold shadow-lg mb-4"
                  onClick={closeMenu}
                >
                  BUCHEN
                </NavLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
