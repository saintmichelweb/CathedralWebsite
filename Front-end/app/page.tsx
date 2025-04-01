"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroCarousel } from "@/components/hero-carousel"
import { useLanguage } from "@/lib/i18n/language-context"

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Mass Timings Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">{t("massScheduleTitle")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Main Church */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-[#002F6C] text-white p-4">
                  <h3 className="text-lg font-bold text-center">{t("mainChurch")}</h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    <li className="text-sm">
                      <span className="font-medium">{t("mondayToFriday")}:</span> 6:30 AM, 12:15 PM
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">{t("saturday")}:</span> 6:30 AM
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">
                        {t("sunday")} ({t("kinyarwanda")}
                        ):
                      </span>{" "}
                      7:00 AM, 11:00 AM
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">
                        {t("sunday")} ({t("english")}
                        ):
                      </span>{" "}
                      9:00 AM 
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">
                        {t("sunday")} ({t("french")}
                        ):
                      </span>{" "}
                      5:00 PM
                    </li>
                  </ul>
                </div>
              </div>

              {/* Saint Paul Chapel */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-[#002F6C] text-white p-4">
                  <h3 className="text-lg font-bold text-center">{t("saintJosephChapel")}</h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {/* <li className="text-sm">
                      <span className="font-medium">{t("mondayToFriday")}:</span> 6:30 AM
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">{t("saturday")}:</span> 6:30 AM
                    </li> */}
                    <li className="text-sm">
                      <span className="font-medium">
                        {t("sunday")} ({t("french")}
                        ):
                      </span>{"Dimanche en Famille avec Jésus "}
                      10:30 AM
                    </li>
                    {/* <li className="text-sm">
                      <span className="font-medium">
                        {t("sunday")} ({t("kinyarwanda")}
                        ):
                      </span>{" "}
                      11:00 AM
                    </li> */}
                  </ul>
                </div>
              </div>

              {/* Saint Maria Outstation */}
              {/* <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-[#002F6C] text-white p-4">
                  <h3 className="text-lg font-bold text-center">{t("saintMariaOutstation")}</h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    <li className="text-sm">
                      <span className="font-medium">{t("wednesday")}:</span> 5:00 PM ({t("kinyarwanda")})
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">
                        {t("sunday")} ({t("kinyarwanda")}
                        ):
                      </span>{" "}
                      9:00 AM
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">
                        {t("sunday")} ({t("french")}
                        ):
                      </span>{" "}
                      11:00 AM
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>

            <div className="bg-[#F5F5F5] p-4 text-center mt-6">
              <p className="text-[#002F6C] font-medium">{t("confessions")}</p>
              <Link href="/services/mass-schedule" className="text-[#D4AF37] hover:underline mt-2 inline-block">
                {t("viewFullSchedule")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Events Section */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">{t("recentEvents")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("recentEventsDesc")}</p>
          </div>

          <div className="flex overflow-x-auto pb-6 space-x-6 snap-x">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="min-w-[300px] max-w-[300px] bg-white rounded-lg shadow-md overflow-hidden snap-start"
              >
                <div className="h-48 relative">
                  <Image
                    src={`/_K4C9489.jpg?height=200&width=300&text=Event+${item}`}
                    alt={`Event ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="text-sm text-[#D4AF37] font-medium mb-2">June 1{item}, 2023</div>
                  <h3 className="text-lg font-bold text-[#002F6C] mb-2">Parish Community Event</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Join us for a wonderful community gathering with music, food, and fellowship.
                  </p>
                  <Link
                    href="/announcements"
                    className="inline-flex items-center text-[#002F6C] font-medium hover:text-[#D4AF37]"
                  >
                    {t("readMore")} <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-[#002F6C] text-[#002F6C] hover:bg-[#002F6C] hover:text-white">
              {t("viewAllEvents")}
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/icon.png?height=400&width=600&text=Our+Parish"
                alt="About Saint Michel Parish"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-6">{t("aboutParish")}</h2>
              <div className="w-20 h-1 bg-[#D4AF37] mb-6"></div>
              <p className="text-gray-700 mb-6">{t("aboutParishDesc1")}</p>
              <p className="text-gray-700 mb-8">{t("aboutParishDesc2")}</p>
              <Button className="bg-[#002F6C] hover:bg-[#001F4C] text-white">{t("learnMore")}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-[#002F6C] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <MapPin className="w-10 h-10 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t("visitUs")}</h3>
              <p className="text-white/80">St Michel's Cathedral, KN 67 St</p> 
              <p className="text-white/80">Kigali, Rwanda</p>
            </div>

            <div className="text-center">
              <Clock className="w-10 h-10 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t("officeHours")}</h3>
              <p className="text-white/80">Tuesday - Sunday</p>
              <p className="text-white/80">9:00 AM - 5:00 PM</p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center mx-auto mb-4">
                <span className="text-[#002F6C] font-bold">@</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{t("contactUs")}</h3>
              <p className="text-white/80">info@saintmichel.rw</p>
              <p className="text-white/80">+250 788 300 646</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

