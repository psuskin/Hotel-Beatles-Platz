"use client";
import React from "react";
import SubHeader from "@/components/SubHeader";
import { useTranslations } from "next-intl";

const Impressum: React.FC = () => {
  const t = useTranslations("impressum");

  return (
    <div className="relative">
      <div className="sticky top-0 z-0">
        <SubHeader title={t("title")} description="" imageSrc="" />
        <div className="container mx-auto px-3 md:px-8 py-12 text-center">
          <p>{t("hotelName")}</p>
          <p>{t("companyName")}</p>
          <p>{t("address")}</p>
          <p></p>
          <p>{t("manager")}</p>
          <p>{t("registrationCourt")}</p>
          <p>{t("registrationNumber")}</p>
          <p>{t("vatId")}</p>
          <p></p>

          {/* Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
            Haftung für die Inhalte und die Inhalte externer Links. Für den
            Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
            verantwortlich. Auch wenn wir davon ausgehen, dass die von uns
            gegebenen Informationen zutreffend sind, können sie dennoch Fehler
            oder Ungenauigkeiten enthalten. Der Inhalt dieser Website unterliegt
            dem Schutz des Urheberrechts. Jegliche Vervielfältigung, Verbreitung
            oder öffentliche Wiedergabe, auch von Teilen ist ohne unsere
            ausdrückliche Einwilligung ist verboten. Die inhaltliche Nennung von
            Marken- und Produktnamen sowie Logos dient ausschließlich
            Identifikationszwecken. Alle Rechte an den in diesen Seiten
            genannten Marken- und Produktnamen, gezeigten Logos und Bildern
            liegen bei deren Eigentümern. Wer mit der Nennung von Namen nicht
            einverstanden ist oder seiner Urheberrechte verletzt sieht, möge
            sich bitte zunächst bei uns per Email melden. Das Entsprechende wird
            dann umgehend entfernt. */}
          <p>{t("disclaimer.title")}</p>
          <p>{t("disclaimer.content")}</p>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
