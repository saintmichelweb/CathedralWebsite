"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { DonateModal } from "@/components/donate-modal"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/i18n/language-context"

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#002F6C] text-white">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Saint Michel Cathedral</h3>
            <p className="text-white/80 mb-4">{t("welcomeDesc")}</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-[#D4AF37]">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white hover:text-[#D4AF37]">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white hover:text-[#D4AF37]">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white hover:text-[#D4AF37]">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("learnMore")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/80 hover:text-[#D4AF37]">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/services/mass-schedule" className="text-white/80 hover:text-[#D4AF37]">
                  {t("massSchedule")}
                </Link>
              </li>
              <li>
                <Link href="/services/sacraments" className="text-white/80 hover:text-[#D4AF37]">
                  {t("sacraments")}
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="text-white/80 hover:text-[#D4AF37]">
                  {t("announcements")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-[#D4AF37]">
                  {t("contact")}
                </Link>
              </li>
              <li>
                <DonateModal
                  trigger={<button className="text-white/80 hover:text-[#D4AF37] text-left">{t("donate")}</button>}
                />
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("contactUs")}</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 text-[#D4AF37] mr-2 flex-shrink-0" />
                <span className="text-white/80">St Michel's Cathedral, KN 67 St, Kigali, Rwanda</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-[#D4AF37] mr-2 flex-shrink-0" />
                <span className="text-white/80">+250 788 300 646</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-[#D4AF37] mr-2 flex-shrink-0" />
                <span className="text-white/80">info@saintmichel.rw</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("massScheduleTitle")}</h3>
            <ul className="space-y-2">
              <li className="text-white/80">
                <span className="font-medium">{t("weekdayMasses")}:</span> 6:30 AM, 12:15 PM
              </li>
              <li className="text-white/80">
                <span className="font-medium">Saturday:</span> 6:30 AM
              </li>
              <li className="text-white/80">
                <span className="font-medium">Sunday:</span>
                <ul className="pl-4 mt-1 space-y-1">
                  <li>7:00 AM - English</li>
                  <li>9:00 AM -  English</li>
                  <li>11:00 AM - Kinyarwanda</li>
                  <li>05:00 PM - French</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Saint Michel Cathedral. {t("allRightsReserved")}
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-white/60 text-sm hover:text-[#D4AF37]">
              {t("privacyPolicy")}
            </Link>
            <Link href="/terms-of-service" className="text-white/60 text-sm hover:text-[#D4AF37]">
              {t("termsOfService")}
            </Link>
          </div>

          <LanguageSwitcher variant="footer" />
        </div>
      </div>
    </footer>
  )
}

