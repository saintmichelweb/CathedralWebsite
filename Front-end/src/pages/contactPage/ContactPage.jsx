"use client";

import { useTranslation } from "react-i18next";
import {ContactInfo, ContactForm, MapSection, AboutBanner } from "../../components";
import image from '../../assets/images/_K4C9558.jpg'

export const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <AboutBanner
      titleKey="contactUs"
      descriptionKey="contactDesc"
      backgroundImage={image} />
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <ContactInfo t={t} />
            <ContactForm t={t} />
          </div>
        </div>
      </div>
      <MapSection t={t} />
    </div>
  );
}