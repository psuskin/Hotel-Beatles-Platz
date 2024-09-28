import React from "react";
import Link from "next/link";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-white py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2 relative inline-block">
              Hotel am Beatles-Platz
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary-color transform -skew-x-12"></span>
            </h2>
            <p className="text-sm text-gray-200 mt-4 max-w-md mx-auto">
              Where luxury meets the rhythm of Hamburg
            </p>
          </div>

          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center gap-6 text-sm">
              <li>
                <Link
                  href="/rooms"
                  className="hover:text-primary-color transition-colors"
                >
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/dining"
                  className="hover:text-primary-color transition-colors"
                >
                  Dining
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-primary-color transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-color transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex space-x-6 mb-8">
            <a
              href="#"
              className="text-gray-400 hover:text-primary-color transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-primary-color transition-colors"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-primary-color transition-colors"
            >
              <FaFacebookF size={24} />
            </a>
          </div>
        </div>

        <div className="text-center text-sm text-gray-200">
          <p>
            &copy; {new Date().getFullYear()} Hotel am Beatles-Platz. All rights
            reserved.
          </p>
          <div className="mt-2 space-x-4">
            <Link
              href="/imprint"
              className="hover:text-primary-color transition-colors"
            >
              Imprint
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary-color transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="hover:text-primary-color transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </footer>
  );
};

export default Footer;
