"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, ChevronLeft } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function MinistriesPage() {
  const { t } = useLanguage()

  const ministryCategories = [
    {
      id: "liturgical",
      name: t("liturgicalMinistries"),
      description: t("liturgicalMinistriesDesc"),
      ministries: [
        {
          name: t("lectors"),
          description: t("lectorsDesc"),
          coordinator: "Thomas Wilson",
          meetingTime: t("sundaysBefore"),
          image: "lectors",
        },
        {
          name: t("eucharisticMinisters"),
          description: t("eucharisticMinistersDesc"),
          coordinator: "Maria Johnson",
          meetingTime: t("monthlyTraining"),
          image: "eucharistic-ministers",
        },
        {
          name: t("altarServers"),
          description: t("altarServersDesc"),
          coordinator: "Fr. Michael Smith",
          meetingTime: t("saturdayTraining"),
          image: "altar-servers",
        },
        {
          name: t("musicMinistry"),
          description: t("musicMinistryDesc"),
          coordinator: "Sarah Thompson",
          meetingTime: t("weeklyRehearsal"),
          image: "music-ministry",
        },
        {
          name: t("sacristans"),
          description: t("sacristansDesc"),
          coordinator: "Robert Johnson",
          meetingTime: t("asNeeded"),
          image: "sacristans",
        },
      ],
    },
    {
      id: "education",
      name: t("educationMinistries"),
      description: t("educationMinistriesDesc"),
      ministries: [
        {
          name: t("religiousEducation"),
          description: t("religiousEducationDesc"),
          coordinator: "Elizabeth Davis",
          meetingTime: t("sundayMornings"),
          image: "religious-education",
        },
        {
          name: t("rcia"),
          description: t("rciaDesc"),
          coordinator: "Fr. John Doe",
          meetingTime: t("thursdayEvenings"),
          image: "rcia",
        },
        {
          name: t("bibleStudy"),
          description: t("bibleStudyDesc"),
          coordinator: "James Wilson",
          meetingTime: t("tuesdayEvenings"),
          image: "bible-study",
        },
        {
          name: t("youthMinistry"),
          description: t("youthMinistryDesc"),
          coordinator: "Michael Brown",
          meetingTime: t("fridayEvenings"),
          image: "youth-ministry",
        },
      ],
    },
    {
      id: "outreach",
      name: t("outreachMinistries"),
      description: t("outreachMinistriesDesc"),
      ministries: [
        {
          name: t("socialJustice"),
          description: t("socialJusticeDesc"),
          coordinator: "Patricia Moore",
          meetingTime: t("monthlyMeetings"),
          image: "social-justice",
        },
        {
          name: t("foodPantry"),
          description: t("foodPantryDesc"),
          coordinator: "Mary Johnson",
          meetingTime: t("distributionDays"),
          image: "food-pantry",
        },
        {
          name: t("visitationMinistry"),
          description: t("visitationMinistryDesc"),
          coordinator: "Sarah Williams",
          meetingTime: t("coordinatedVisits"),
          image: "visitation-ministry",
        },
        {
          name: t("communityOutreach"),
          description: t("communityOutreachDesc"),
          coordinator: "Daniel Mugisha",
          meetingTime: t("variousEvents"),
          image: "community-outreach",
        },
      ],
    },
    {
      id: "parish",
      name: t("parishLife"),
      description: t("parishLifeDesc"),
      ministries: [
        {
          name: t("hospitalityCommittee"),
          description: t("hospitalityCommitteeDesc"),
          coordinator: "Elizabeth Carter",
          meetingTime: t("sundayHospitality"),
          image: "hospitality",
        },
        {
          name: t("parishEvents"),
          description: t("parishEventsDesc"),
          coordinator: "Thomas Anderson",
          meetingTime: t("eventPlanning"),
          image: "parish-events",
        },
        {
          name: t("prayerGroups"),
          description: t("prayerGroupsDesc"),
          coordinator: "Margaret Wilson",
          meetingTime: t("weeklyPrayer"),
          image: "prayer-groups",
        },
        {
          name: t("maintenanceCommittee"),
          description: t("maintenanceCommitteeDesc"),
          coordinator: "Robert Johnson",
          meetingTime: t("workDays"),
          image: "maintenance",
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/_K4C9703.jpg?height=300&width=1200&text=Parish+Ministries"
            alt={t("ministries")}
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-white mb-4 font-serif">{t("ministries")}</h1>
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
              className="bg-white text-[#002F6C] px-4 py-2 rounded-md hover:bg-[#D4AF37] hover:text-white transition-colors"
            >
              {t("sacraments")}
            </Link>
            <Link
              href="/services/ministries"
              className="bg-[#002F6C] text-white px-4 py-2 rounded-md hover:bg-[#001F4C] transition-colors"
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
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-6">{t("getInvolved")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
            <p className="text-gray-700 mb-4">{t("ministriesIntroDesc1")}</p>
            <p className="text-gray-700 mb-6">{t("ministriesIntroDesc2")}</p>
            <Button className="bg-[#D4AF37] hover:bg-[#C09C2C] text-white">{t("volunteerSignUp")}</Button>
          </div>
        </div>
      </section>

      {/* Ministry Categories */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">{t("ministryOpportunities")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("ministryOpportunitiesDesc")}</p>
          </div>

          <Tabs defaultValue="liturgical" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-4 mb-8">
              {ministryCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {ministryCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-xl font-bold text-[#002F6C] mb-3">{category.name}</h3>
                  <p className="text-gray-700 mb-6">{category.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {category.ministries.map((ministry, idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3 h-48 md:h-auto relative">
                          <Image
                            src={`/placeholder.svg?height=200&width=200&text=${ministry.image}`}
                            alt={ministry.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6 md:w-2/3">
                          <h4 className="text-lg font-bold text-[#002F6C] mb-2">{ministry.name}</h4>
                          <p className="text-gray-600 text-sm mb-4">{ministry.description}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 text-[#D4AF37] mr-2" />
                              <span className="text-gray-700">
                                {t("coordinator")}: {ministry.coordinator}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-[#D4AF37] mr-2" />
                              <span className="text-gray-700">{ministry.meetingTime}</span>
                            </div>
                          </div>
                          <Button className="mt-4 bg-[#002F6C] hover:bg-[#001F4C] text-white text-sm">
                            {t("joinMinistry")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-6 text-center">{t("volunteerSignUp")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"></div>

            <div className="bg-[#F5F5F5] rounded-lg p-8">
              <p className="text-gray-700 mb-6 text-center">{t("volunteerFormDesc")}</p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("firstName")}</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("lastName")}</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("emailAddress")}</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("phoneNumber")}</label>
                  <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("interestedMinistries")}</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-md" required>
                    <option value="">{t("selectMinistry")}</option>
                    {ministryCategories.flatMap((category) =>
                      category.ministries.map((ministry) => (
                        <option key={ministry.name} value={ministry.name}>
                          {ministry.name}
                        </option>
                      )),
                    )}
                    <option value="multiple">{t("multipleMinistries")}</option>
                    <option value="not-sure">{t("notSureYet")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("availability")}</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>{t("weekdayMornings")}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>{t("weekdayAfternoons")}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>{t("weekdayEvenings")}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>{t("weekends")}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("additionalInfo")}</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-md h-32"
                    placeholder={t("skillsInterests")}
                  ></textarea>
                </div>

                <Button className="w-full bg-[#D4AF37] hover:bg-[#C09C2C] text-white">
                  {t("submitVolunteerForm")}
                </Button>
              </form>
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

