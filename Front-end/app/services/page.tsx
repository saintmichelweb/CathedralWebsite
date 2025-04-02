"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLanguage } from "@/lib/i18n/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { Clock, MapPin } from "lucide-react"


export default function ServicesPage() {
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


  const sacraments = [
    {
      id: "baptism",
      title: t("baptism"),
      description: t("baptismDesc"),
      requirements: [t("baptismReq1"), t("baptismReq2"), t("baptismReq3")],
      image: "baptism.jpg",
      action: t("requestBaptism"),
    },
    {
      id: "eucharist",
      title: t("firstHolyCommunion"),
      description: t("firstHolyCommunionDesc"),
      requirements: [t("firstHolyCommunionReq1"), t("firstHolyCommunionReq2"), t("firstHolyCommunionReq3")],
      image: "communion.jpeg",
      action: t("learnMore"),
    },
    {
      id: "confirmation",
      title: t("confirmation"),
      description: t("confirmationDesc"),
      requirements: [t("confirmationReq1"), t("confirmationReq2"), t("confirmationReq3"), t("confirmationReq4")],
      image: "confirmation_2024.jpg",
      action: t("registerForConfirmation"),
    },
    {
      id: "reconciliation",
      title: t("reconciliation"),
      description: t("reconciliationDesc"),
      requirements: [t("reconciliationReq1"), t("reconciliationReq2")],
      image: "penitence.jpg",
      action: t("confessionSchedule"),
    },
    {
      id: "marriage",
      title: t("marriage"),
      description: t("marriageDesc"),
      requirements: [t("marriageReq1"), t("marriageReq2"), t("marriageReq3"), t("marriageReq4")],
      image: "mariage-bénédiction.jpg",
      action: t("weddingInquiry"),
    },
    {
      id: "anointing",
      title: t("anointingOfSick"),
      description: t("anointingOfSickDesc"),
      requirements: [t("anointingOfSickReq1"), t("anointingOfSickReq2")],
      image: "Anointing.jpg",
      action: t("requestAnointing"),
    },
    {
      id: "holyorders",
      title: t("holyOrders"),
      description: t("holyOrdersDesc"),
      requirements: [t("holyOrdersReq1"), t("holyOrdersReq2"), t("holyOrdersReq3")],
      image: "holy-orders1.jpg",
      action: t("vocationInquiry"),
    },
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
            src="/_K4C9507.jpg?height=300&width=1200&text=Our+Services"
            alt="Services at Saint Michel Parish"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-white mb-4 font-serif">{t("ourServices")}</h1>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>
      </section>

      {/* Mass Schedule */}
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
                      src={`/${location.image}?height=400&width=300&text=${location.name}`}
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

       {/* Sacraments */}
       <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">{t("sevenSacraments")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("sevenSacramentsDesc")}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {sacraments.map((sacrament) => (
                <AccordionItem key={sacrament.id} value={sacrament.id}>
                  <AccordionTrigger className="text-[#002F6C] font-medium text-lg">{sacrament.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid md:grid-cols-2 gap-6 items-start">
                      <div>
                        <p className="text-gray-700 mb-4">{sacrament.description}</p>
                        <h4 className="font-bold text-[#002F6C] mb-2">{t("requirements")}:</h4>
                        <ul className="list-disc pl-5 text-gray-700 mb-4">
                          {sacrament.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                        <Button className="bg-[#002F6C] hover:bg-[#001F4C] text-white">{sacrament.action}</Button>
                      </div>
                      <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                        <Image
                          src={`/${sacrament.image}?height=200&width=300&text=${sacrament.title}`}
                          alt={sacrament.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">Parish Ministries</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get involved in our parish community through various ministries and service opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Liturgical Ministry",
                description: "Serve as lectors, Eucharistic ministers, altar servers, or choir members during Mass.",
              },
              {
                name: "Religious Education",
                description: "Help teach the faith to children, youth, and adults through our catechetical programs.",
              },
              {
                name: "Youth Ministry",
                description: "Engage with our parish teens through spiritual, social, and service activities.",
              },
              {
                name: "Outreach & Social Justice",
                description: "Serve the poor and vulnerable in our community through various outreach programs.",
              },
              {
                name: "Prayer Groups",
                description: "Join fellow parishioners in regular prayer meetings and spiritual devotions.",
              },
              { name: "Hospitality", description: "Welcome visitors and new members to our parish community." },
            ].map((ministry) => (
              <div key={ministry.name} className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#D4AF37]">
                <h3 className="text-xl font-bold text-[#002F6C] mb-3">{ministry.name}</h3>
                <p className="text-gray-700 mb-4">{ministry.description}</p>
                <Link
                  href={`/services/ministries#${ministry.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[#002F6C] font-medium hover:text-[#D4AF37] inline-flex items-center"
                >
                  Learn more
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-[#002F6C] hover:bg-[#001F4C] text-white">Volunteer Sign-Up</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

