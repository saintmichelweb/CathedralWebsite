"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, ChevronLeft } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function MassSchedulePage() {
  const { t } = useLanguage()

  const locations = [
    {
      id: "main",
      name: t("mainChurch"),
      address: "KN 67 St, Kigali, Rwanda",
      image: "_K4C9489.jpg",
      schedule: [
        { day: t("mondayToFriday"), times: ["6:30 AM", "12:15 PM"], language: t("kinyarwanda") },
        { day: t("saturday"), times: ["6:30 AM"], language: t("kinyarwanda") },
        // { day: t("saturdayVigil"), times: ["5:00 PM"], language: t("english") },
        { day: t("sunday"), times: ["7:00 AM", "11:00 AM"], language: t("kinyarwanda") },
        { day: t("sunday"), times: ["9:00 AM"], language: t("english") },
        { day: t("sunday"), times: ["05:00 PM"], language: t("french") },
      ],
      confession: t("confessions"),
      adoration: t("adorationTimes"),
    },
    {
      id: "chapel",
      name: t("saintJosephChapel"),
      address: "Centre Saint-Paul, KN 32 St, Kigali",
      image: "stpaul.jpeg",
      schedule: [
        // { day: t("mondayToFriday"), times: ["7:00 AM"], language: t("english") },
        // { day: t("saturday"), times: ["9:00 AM"], language: t("english") },
        // { day: t("sunday"), times: ["8:00 AM"], language: t("english") },
        { day: t("sunday"), times: ["10:30 AM"], language: t("french") },
      ],
      // confession: t("confessions"),
      // adoration: t("adorationTimesChapel"),
    },
    // {
    //   id: "outstation",
    //   name: t("saintMariaOutstation"),
    //   address: "78 Outstation Avenue, Kigali, Rwanda",
    //   image: "outstation",
    //   schedule: [
    //     { day: t("wednesday"), times: ["5:30 PM"], language: t("kinyarwanda") },
    //     { day: t("sunday"), times: ["9:30 AM"], language: t("kinyarwanda") },
    //     { day: t("sunday"), times: ["11:30 AM"], language: t("french") },
    //   ],
    //   confession: t("confessionTimesOutstation"),
    //   adoration: t("adorationTimesOutstation"),
    // },
  ]


  

  const specialMasses = [
    {
      title: t("holyDaysObligation"),
      description: t("holyDaysObligationDesc"),
      dates: [
        { name: t("solemnityMary"), date: t("january1") },
        { name: t("ascension"), date: t("fortyDaysEaster") },
        { name: t("assumption"), date: t("august15") },
        { name: t("allSaints"), date: t("november1") },
        { name: t("immaculateConception"), date: t("december8") },
        { name: t("christmas"), date: t("december25") },
      ],
    },
    {
      title: t("specialLiturgies"),
      description: t("specialLiturgiesDesc"),
      dates: [
        { name: t("ashWednesday"), date: t("beginningLent") },
        { name: t("palmSunday"), date: t("sundayBeforeEaster") },
        { name: t("holyThursday"), date: t("thursdayBeforeEaster") },
        { name: t("goodFriday"), date: t("fridayBeforeEaster") },
        { name: t("easterVigil"), date: t("saturdayBeforeEaster") },
        { name: t("easterSunday"), date: t("easterDay") },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/_K4C9558.jpg?height=300&width=1200&text=Mass+Schedule"
            alt={t("massSchedule")}
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-white mb-4 font-serif">{t("massSchedule")}</h1>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>
      </section>

      {/* Services Navigation */}
      <section className="bg-[#F5F5F5] py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/services"
              className="bg-white text-[#002F6C] px-4 py-2 rounded-md hover:bg-[#D4AF37] hover:text-white transition-colors"
            >
              {t("services")}
            </Link>
            <Link
              href="/services/mass-schedule"
              className="bg-[#002F6C] text-white px-4 py-2 rounded-md hover:bg-[#001F4C] transition-colors"
            >
              {t("massSchedule")}
            </Link>
            <Link
              href="/services/sacraments"
              className="bg-white text-[#002F6C] px-4 py-2 rounded-md hover:bg-[#D4AF37] hover:text-white transition-colors"
            >
              {t("sacraments")}
            </Link>
            <Link
              href="/services/ministries"
              className="bg-white text-[#002F6C] px-4 py-2 rounded-md hover:bg-[#D4AF37] hover:text-white transition-colors"
            >
              {t("ministries")}
            </Link>
          </div>
        </div>
      </section>

      {/* Mass Schedule by Location */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">{t("massScheduleByLocation")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("massScheduleDesc")}</p>
          </div>

          <Tabs defaultValue="main" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              {locations.map((location) => (
                <TabsTrigger key={location.id} value={location.id}>
                  {location.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {locations.map((location) => (
              <TabsContent
                key={location.id}
                value={location.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/3 h-64 md:h-auto relative">
                    <Image
                      src={`/placeholder.svg?height=400&width=300&text=${location.image}`}
                      alt={location.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-xl font-bold text-[#002F6C] mb-3">{location.name}</h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 text-[#D4AF37] mr-2" />
                      <span>{location.address}</span>
                    </div>

                    <h4 className="font-bold text-[#002F6C] mb-3">{t("massTimings")}</h4>
                    <div className="space-y-4 mb-6">
                      {location.schedule.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="font-medium">{item.day}</div>
                          <div className="flex items-center gap-2">
                            <span>{item.times.join(", ")}</span>
                            <span className="text-sm text-[#D4AF37]">({item.language})</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 text-gray-700">
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 text-[#D4AF37] mt-1 mr-2" />
                        <div>
                          <span className="font-medium">{t("confession")}:</span> {location.confession}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 text-[#D4AF37] mt-1 mr-2" />
                        <div>
                          <span className="font-medium">{t("adoration")}:</span> {location.adoration}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Special Masses */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">{t("specialMasses")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("specialMassesDesc")}</p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {specialMasses.map((category, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-[#002F6C] mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.dates.map((item, i) => (
                    <li key={i} className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-600">{item.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mass Etiquette */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-6 text-center">{t("massEtiquette")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"></div>

            <div className="bg-[#F5F5F5] rounded-lg p-6 mb-8">
              <p className="text-gray-700 mb-4">{t("massEtiquetteDesc")}</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>{t("massEtiquette1")}</li>
                <li>{t("massEtiquette2")}</li>
                <li>{t("massEtiquette3")}</li>
                <li>{t("massEtiquette4")}</li>
                <li>{t("massEtiquette5")}</li>
                <li>{t("massEtiquette6")}</li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-gray-700 mb-4">{t("massInvitation")}</p>
              <Button className="bg-[#002F6C] hover:bg-[#001F4C] text-white">{t("contactForMoreInfo")}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Services */}
      <section className="py-8 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-center">
            <Link href="/services">
              <Button
                variant="outline"
                className="flex items-center border-[#002F6C] text-[#002F6C] hover:bg-[#002F6C] hover:text-white"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> {t("backToServices")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

