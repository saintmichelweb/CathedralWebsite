"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronLeft } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function SacramentsPage() {
  const { t } = useLanguage()

  


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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/_K4C9590.jpg?height=300&width=1200&text=Sacraments"
            alt={t("sacraments")}
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-white mb-4 font-serif">{t("sacraments")}</h1>
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
              className="bg-white text-[#002F6C] px-4 py-2 rounded-md hover:bg-[#D4AF37] hover:text-white transition-colors"
            >
              {t("massSchedule")}
            </Link>
            <Link
              href="/services/sacraments"
              className="bg-[#002F6C] text-white px-4 py-2 rounded-md hover:bg-[#001F4C] transition-colors"
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

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-6">{t("sacramentsIntro")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
            <p className="text-gray-700 mb-4">{t("sacramentsIntroDesc1")}</p>
            <p className="text-gray-700 mb-6">{t("sacramentsIntroDesc2")}</p>
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

      {/* Sacramental Preparation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-6 text-center">
              {t("sacramentalPreparation")}
            </h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"></div>

            <p className="text-gray-700 mb-6">{t("sacramentalPreparationDesc")}</p>

            <div className="bg-[#F5F5F5] rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-[#002F6C] mb-4">{t("upcomingClasses")}</h3>
              <ul className="space-y-4">
                <li className="border-b border-gray-200 pb-4">
                  <h4 className="font-bold text-[#002F6C]">{t("baptismPrep")}</h4>
                  <p className="text-gray-700">{t("firstSaturdayMonth")}, 10:00 AM - 12:00 PM</p>
                  <p className="text-gray-600 text-sm">{t("baptismPrepDesc")}</p>
                </li>
                <li className="border-b border-gray-200 pb-4">
                  <h4 className="font-bold text-[#002F6C]">{t("firstCommunionPrep")}</h4>
                  <p className="text-gray-700">{t("sundaysAfterMass")}, 12:00 PM - 1:30 PM</p>
                  <p className="text-gray-600 text-sm">{t("firstCommunionPrepDesc")}</p>
                </li>
                <li className="border-b border-gray-200 pb-4">
                  <h4 className="font-bold text-[#002F6C]">{t("confirmationPrep")}</h4>
                  <p className="text-gray-700">{t("wednesdayEvenings")}, 6:30 PM - 8:00 PM</p>
                  <p className="text-gray-600 text-sm">{t("confirmationPrepDesc")}</p>
                </li>
                <li>
                  <h4 className="font-bold text-[#002F6C]">{t("marriagePrep")}</h4>
                  <p className="text-gray-700">{t("byAppointment")}</p>
                  <p className="text-gray-600 text-sm">{t("marriagePrepDesc")}</p>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-gray-700 mb-4">{t("sacramentalPrepContact")}</p>
              <Button className="bg-[#002F6C] hover:bg-[#001F4C] text-white">{t("contactReligiousEd")}</Button>
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

