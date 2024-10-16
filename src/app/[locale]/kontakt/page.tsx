"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import SubHeader from "@/components/SubHeader";
import ContactForm from "@/components/Contact/ContactForm";
import { useTranslations } from 'next-intl';

const ContactPage: React.FC = () => {
  const t = useTranslations('contact');

  return (
    <div className="relative">
      <div className="sticky top-0 z-0">
        <SubHeader
          title={t('title')}
          description={t('description')}
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
                  {t('hotelName')}
                </h2>
                <div className="space-y-4 text-lg">
                  <p className="flex items-center">
                    <MapPin className="mr-4 text-primary-color" size={24} />
                    {t('address')}
                  </p>
                  <p className="flex items-center">
                    <Mail className="mr-4 text-primary-color" size={24} />
                    {t('email')}
                  </p>
                  <p className="flex items-center">
                    <Phone className="mr-4 text-primary-color" size={24} />
                    {t('phone')}
                  </p>
                </div>
              </div>

              <div className="text-white">
                <h3 className="text-2xl font-semibold mb-4 text-primary-color">
                  {t('companyAddressTitle')}
                </h3>
                <p className="text-lg">{t('companyName')}</p>
                <p className="text-lg">{t('companyAddress')}</p>
              </div>

              <div className="border-t border-gray-700 pt-8">
                <p className="text-gray-400 italic">
                  {t('experienceDescription')}
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
