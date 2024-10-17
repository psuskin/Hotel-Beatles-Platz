"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLocale = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, "");
    router.push(`/${newLocale}${currentPath}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative group z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-primary-color hover:text-gray-300 transition-colors duration-300"
      >
        <Globe size={16} className="mr-1" />
        <span className="uppercase hidden sm:inline">{locale}</span>
        <span className="sm:hidden">
          {languages.find(lang => lang.code === locale)?.name}
        </span>
      </button>
      <div 
        className={`absolute left-0 sm:left-auto sm:right-0 mt-2 w-32 bg-black bg-opacity-90 rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-50 ${
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        } origin-top`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLocale(lang.code)}
            className={`block w-full text-left px-4 py-2 text-sm ${
              locale === lang.code
                ? "bg-primary-color text-white"
                : "text-primary-color hover:bg-gray-800"
            } transition-colors duration-200`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}
