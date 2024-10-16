"use client";
import React from "react";
import { motion } from "framer-motion";
import SubHeader from "@/components/SubHeader";

const Impressum: React.FC = () => {
  return (
    <div className="relative">
      <div className="sticky top-0 z-0">
        <SubHeader
          title="Impressum"
            description=""
            imageSrc=""
        />
        <div className="container mx-auto px-3 md:px-8 py-12 text-center">
        <p>Hotel am Beatlesplatz</p>
        <p>Polat Hotelbetriebsgesellschaft mbH Reeperbahn 117</p>
        <p>20359 Hamburg</p>
        <p></p>
        <p>Geschäftsführer: Fatih Polat</p>
        <p>Registergericht: Amtsgericht Hamburg</p>
        <p>Registernummer: HRB</p>
        <p>USt-ID: DE</p>
        <p></p>
        <p>HAFTUNGSSCHLUSS:</p>
        <p>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte und die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich. Auch wenn wir davon ausgehen, dass die von uns gegebenen Informationen zutreffend sind, können sie dennoch Fehler oder Ungenauigkeiten enthalten. Der Inhalt dieser Website unterliegt dem Schutz des Urheberrechts. Jegliche Vervielfältigung, Verbreitung oder öffentliche Wiedergabe, auch von Teilen ist ohne unsere ausdrückliche Einwilligung ist verboten. Die inhaltliche Nennung von Marken- und Produktnamen sowie Logos dient ausschließlich Identifikationszwecken. Alle Rechte an den in diesen Seiten genannten Marken- und Produktnamen, gezeigten Logos und Bildern liegen bei deren Eigentümern. Wer mit der Nennung von Namen nicht einverstanden ist oder seiner Urheberrechte verletzt sieht, möge sich bitte zunächst bei uns per Email melden. Das Entsprechende wird dann umgehend entfernt.</p>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
