"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import SubHeader from "@/components/SubHeader";
import ContactForm from "@/components/Contact/ContactForm";

const ContactPage: React.FC = () => {
  return (
    <div className="relative">
      <div className="sticky top-0 z-0">
        <SubHeader
          // title="Get in Touch"
          title="Kontaktieren Sie Uns"
          // description="Do you have questions about your upcoming booking or general questions about our hotel and restaurant? Please contact us using the contact form below or via the email address provided"
          description="Haben Sie Fragen zu Ihrer bevorstehenden Buchung oder allgemeine Fragen zu unserem Hotel und Restaurant? Bitte kontaktieren Sie uns über das untenstehende Kontaktformular oder über die angegebene E-Mail-Adresse"
          imageSrc="/images/contact.jpg"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative z-10 bg-black min-h-screen"
      >
        <div className="container mx-auto px-3 md:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-12"
            >
              <div className="text-white">
                <h2 className="text-3xl font-semibold mb-6 text-primary-color">
                  HOTEL AM BEATLES-PLATZ
                </h2>
                <div className="space-y-4 text-lg">
                  <p className="flex items-center">
                    <MapPin className="mr-4 text-primary-color" size={24} />
                    Nobistor 8, 22767 Hamburg, Germany
                  </p>
                  <p className="flex items-center">
                    <Mail className="mr-4 text-primary-color" size={24} />
                    info@hotelambeatlesplatz.de
                  </p>
                  <p className="flex items-center">
                    <Phone className="mr-4 text-primary-color" size={24} />
                    +49 40 181 283 811
                  </p>
                </div>
              </div>

              <div className="text-white">
                <h3 className="text-2xl font-semibold mb-4 text-primary-color">
                  {/* COMPANY ADDRESS */}
                  UNTERNEHMENSADRESSE
                </h3>
                <p className="text-lg">Polat Hotelbetriebsgesellschaft mbH</p>
                <p className="text-lg">
                  Reeperbahn 117, 20359 Hamburg, Germany
                </p>
              </div>

              <div className="border-t border-gray-700 pt-8">
                <p className="text-gray-400 italic">
                  {/* Experience the magic of Hamburg from the heart of St. Pauli.
                  Your stay at Hotel am Beatles-Platz is more than just
                  accommodation; it&apos;s an immersion into the vibrant culture
                  and rich history of this iconic neighborhood. */}
                  Erleben Sie die Magie von Hamburg im Herzen von St. Pauli. Ihr
                  Aufenthalt im Hotel am Beatles-Platz ist mehr als nur eine
                  Unterkunft; es ist ein Eintauchen in die lebendige Kultur und
                  die reiche Geschichte dieses ikonischen Viertels.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
