import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Phone, Mail } from "lucide-react";
import LanguageSwitcher from "../LanguageSwitcher";

const MiniNav: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-black to-slate-800 text-primary-color py-[10px]">
      <div className="container mx-auto px-6 flex justify-end items-center">
        <div className="sm:hidden mr-10">
          <LanguageSwitcher />
        </div>
        <div className="flex items-center gap-2 sm:space-x-6">
          <div className="flex space-x-4 items-center">
            <SocialLink
              href="tel:+4940181283811"
              icon={<Phone size={16} />}
              text="+49 40 181 283 811"
            />
            <SocialLink
              href="mailto:info@hotelambeatlesplatz.de"
              icon={<Mail size={16} />}
              text="info@hotelambeatlesplatz.de"
            />
          </div>
          <div className="flex space-x-4">
            <SocialLink
              href="https://www.instagram.com/hotelambeatlesplatz/"
              icon={<Instagram size={16} />}
            />
          </div>
          <div className="hidden sm:block mr-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  text?: string;
}> = ({ href, icon, text }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center hover:text-gray-300 transition-colors duration-300"
  >
    <span className="bg-white bg-opacity-10 p-2 rounded-full">{icon}</span>
    {text && <span className="hidden sm:inline ml-2 text-sm">{text}</span>}
  </Link>
);

export default MiniNav;
