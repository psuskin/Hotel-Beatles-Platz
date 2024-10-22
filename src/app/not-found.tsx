"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHotel, FaConciergeBell, FaBed, FaUtensils } from "react-icons/fa";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-primary-color">404</h1>
        <h2 className="text-3xl mb-4">Seite nicht gefunden</h2>
        <p className="text-xl mb-8 max-w-md mx-auto">
          Entschuldigung, wir konnten die Seite{" "}
          <span className="text-primary-color font-semibold">{pathname}</span>{" "}
          nicht finden. Vielleicht können wir Ihnen mit etwas anderem behilflich
          sein?
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
          <Link
            href="/zimmer"
            className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <FaBed className="text-3xl mb-2 text-primary-color" />
            <span>Unsere Zimmer</span>
          </Link>
          <Link
            href="/restaurant"
            className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <FaUtensils className="text-3xl mb-2 text-primary-color" />
            <span>Restaurant</span>
          </Link>
          <Link
            href="/services"
            className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <FaConciergeBell className="text-3xl mb-2 text-primary-color" />
            <span>Unsere Services</span>
          </Link>
          <Link
            href="/kontakt"
            className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <FaHotel className="text-3xl mb-2 text-primary-color" />
            <span>Kontakt</span>
          </Link>
        </div>
        <Link
          href="/"
          className="bg-primary-color text-white px-6 py-3 rounded-full hover:bg-primary-color-dark transition-colors duration-300"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
