import React from "react";
import Link from "next/link";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="text-white py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2 relative inline-block">
              {t("hotelName")}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary-color transform -skew-x-12"></span>
            </h2>
            <p className="text-sm text-gray-200 mt-4 max-w-md mx-auto">
              {t("slogan")}
            </p>
          </div>

          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center gap-6 text-sm">
              <li>
                <Link
                  href={`/${locale}/zimmer`}
                  className="hover:text-primary-color transition-colors"
                >
                  {t("rooms")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/restaurant`}
                  className="hover:text-primary-color transition-colors"
                >
                  {t("dining")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/bar`}
                  className="hover:text-primary-color transition-colors"
                >
                  {t("bar")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/kontakt`}
                  className="hover:text-primary-color transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/jobs`}
                  className="hover:text-primary-color transition-colors"
                >
                  {t("jobs")}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex space-x-6 mb-8">
            <a
              href="https://www.instagram.com/hotelambeatlesplatz/"
              className="text-gray-400 hover:text-primary-color transition-colors"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        <div className="text-center text-sm text-gray-200">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <div className="mt-2 space-x-4">
            <Link
              href={`/${locale}/impressum`}
              className="hover:text-primary-color transition-colors"
            >
              {t("impressum")}
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
