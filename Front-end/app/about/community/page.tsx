"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Users, Calendar, MapPin, ChevronLeft, ChevronRight, Home, Phone } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CommunityPage() {
  const { t, language } = useLanguage()

  // Translations for Basic Christian Communities
  const bccTranslations = {
    en: "Basic Christian Communities (BCCs)",
    fr: "Communautés Ecclésiales de Base (CEB)",
    rw: "Imiryango Remezo",
  }

  // Get the appropriate translation based on current language
  const bccName = bccTranslations[language]

  // Communities (Impuza Miryango Remezo)
  const communities = [
    {
      name: "Saint Esprit",
      description:"Impuza Miryango Remezo ni ihuriro ry’ Imiryango remezo rikorera muri paruwasi, rigamije kwimakaza ukwemera, ubumwe, no gufashanya. Ni umusingi w’ubuzima bwa paruwasi.",
      leader: "Jocelyne Kaneza",
      phone:"+250788528585",
      bccs: 2,
      families: 150,
      meetingDay: ".....",
      image: "st-joseph-community",
    },
    {
      name: "Saint Nicodème",
      description:"Impuza Miryango Remezo ni ihuriro ry’ Imiryango remezo rikorera muri paruwasi, rigamije kwimakaza ukwemera, ubumwe, no gufashanya. Ni umusingi w’ubuzima bwa paruwasi.",
      leader: "......",
      phone:"000000000",
      bccs: 6,
      families: 250,
      meetingDay: "......",
      image: "holy-family-community",
    },
    {
      name: "English Community",
      description:"Impuza Miryango Remezo ni ihuriro ry’ Imiryango remezo rikorera muri paruwasi, rigamije kwimakaza ukwemera, ubumwe, no gufashanya. Ni umusingi w’ubuzima bwa paruwasi.",
      leader: ".......",
      phone:"000000000",
      bccs: 13,
      families: 180,
      meetingDay: "......",
      image: "st-peter-community",
    },
    {
      name: "St Thérèse de l'Enfant Jésus",
      description:"Impuza Miryango Remezo ni ihuriro ry’ Imiryango remezo rikorera muri paruwasi, rigamije kwimakaza ukwemera, ubumwe, no gufashanya. Ni umusingi w’ubuzima bwa paruwasi.",
      leader: ".......",
      phone:"000000000",
      bccs: 6,
      families: 220,
      meetingDay: ".......",
      image: "st-mary-community",
    },
    {
      name: "Saint Joseph",
      description:"Impuza Miryango Remezo ni ihuriro ry’ Imiryango remezo rikorera muri paruwasi, rigamije kwimakaza ukwemera, ubumwe, no gufashanya. Ni umusingi w’ubuzima bwa paruwasi.",
      leader: ".......",
      phone:"000000000",
      bccs: 6,
      families: 220,
      meetingDay: ".......",
      image: "st-mary-community",
    },
  ]

  // Basic Christian Communities (BCCs) for each community
  const bccs = {
    "Saint Esprit": [
      { name: "CEB St. Joseph ", families: 25, leader: "Emmanuel Kanamugire", location: "Diocese yose" },
      { name: "CEB St. Sauveur", families: 80, leader: "Dativa Ntacyonzaba", location: "Diocese yose" },
    ],
    "Saint Nicodème": [
      { name: "St Augustin ", families: 26, leader: "Raphaël Ntamuhanga", location: "Mpuzamiryangoremezo Kinyange" },
      { name: "St Joseph ", families: 26, leader: "Marie Goretti Ndayisasirire", location: "Mpuzamiryangoremezo Kinyange" },
      { name: "St Kizito ", families: 26, leader: "Françoise Mugoyire", location: "Mpuzamiryangoremezo Kinyange" },
      { name: "Mubyeyi w'Imana", families: 26, leader: "Justine Uwimana", location: "Mpuzamiryangoremezo Kinyange" },
      { name: "Nyina wa Jambo", families: 26, leader: "Jeannette Nyirashumbusha", location: "Mpuzamiryangoremezo Kinyange" },
      { name: "Mwamikazi wa Rosari:", families: 26, leader: "Fulgence Hitayezu", location: "Mpuzamiryangoremezo Kinyange" },
      
    ],
    "English Community": [
      { name: "St. Jude BCC", families: 26, leader: "Angela Zeleza", location: "Diocese yose" },
  { name: "St. Therese of the Child Jesus BCC", families: 30, leader: "Alexis Muhaya", location: "Diocese yose" },
  { name: "St. Peter BCC", families: 22, leader: "Immaculee Mukasinayobye", location: "Diocese yose" },
  { name: "St. Immaculate BCC", families: 28, leader: "Aline Semasaka", location: "Diocese yose" },
  { name: "St. Isaiah BCC", families: 24, leader: "Dominique Nshimiyimana", location: "Diocese yose" },
  { name: "St. Joseph BCC", families: 32, leader: "Michelle Mucyo", location: "Diocese yose" },
  { name: "St. Anne BCC", families: 27, leader: "Chantal Murebwa", location: "Diocese yose" },
  { name: "St. Kizito BCC", families: 29, leader: "Bonny Rutembesa", location: "Diocese yose" },
  { name: "St. Antony BCC", families: 21, leader: "Innocent Kwizera", location: "Diocese yose" },
  { name: "St. Rita BCC", families: 25, leader: "Consolate Tumusime", location: "Diocese yose" },
  { name: "St. Aloysius BCC", families: 23, leader: "Lewis Rologhwa", location: "Diocese yose" },
  { name: "St. Valentine BCC", families: 20, leader: "Corneille Vrallant Ntwari", location: "Diocese yose" },
  { name: "International Community BCC", families: 18, leader: "Josephine M. Ulimwengu", location: "Diocese yose" }
      
    ],
    "St Thérèse de l'Enfant Jésus": [
      { name: "Ste Famille BCC", families: 26, leader: "Judith Musindikazi", location: "Rugunga" },
  { name: "St. Paul BCC", families: 28, leader: "Laurent Nsengiyumva", location: "Rugunga" },
  { name: "St. Pierre BCC", families: 24, leader: "Emmanuel Musonera", location: "Rugunga" },
  { name: "Bikira Mariya Utabara Abakristu BCC", families: 22, leader: "Lidivine Mukantagara", location: "Rugunga" }
      
    ],

    "Saint Joseph": [
      { name: "Ste Thérèse de l'Enfant Jésus BCC", families: 27, leader: "Protogène Uwamahoro", location: "Nyarugenge" },
  { name: "Ste Véronique BCC", families: 23, leader: "Epiphane Uwizeye", location: "Nyarugenge" },
  { name: "Ste Rita BCC", families: 26, leader: "Christophe Mpirimbanyi", location: "Nyarugenge" },
  { name: "St. François BCC", families: 25, leader: "Emmérence Mukamwiza", location: "Nyarugenge" },
  { name: "St. Etienne BCC", families: 22, leader: "Yvette Ndengeyingoma", location: "Nyarugenge" },
  { name: "Umuhire Annuarita BCC", families: 21, leader: "Kizito Munyarugerero", location: "Nyarugenge" }
      
    ],
  }

  const initiatives = [
    {
      name: "Food Pantry",
      description:
        "Our parish food pantry provides nutritious food to individuals and families in need. We distribute food packages twice a month and serve hundreds of families annually.",
      impact: "Served over 500 families in 2022",
      coordinator: "Maria Rodriguez",
      image: "food-pantry",
    },
    {
      name: "Homeless Outreach",
      description:
        "Our homeless outreach team provides meals, clothing, and hygiene items to people experiencing homelessness in our community. We also connect them with resources for housing and healthcare.",
      impact: "Distributed 2,000+ meals last year",
      coordinator: "James Wilson",
      image: "homeless-outreach",
    },
    {
      name: "Refugee Support Program",
      description:
        "We assist refugee families as they settle into our community by providing household items, language assistance, employment guidance, and friendship.",
      impact: "Supported 15 refugee families since 2020",
      coordinator: "Jean-Paul Mugisha",
      image: "refugee-support",
    },
    {
      name: "Senior Companion Program",
      description:
        "Volunteers visit homebound seniors to provide companionship, assistance with errands, and spiritual support. This program helps combat isolation among elderly members of our community.",
      impact: "Regular visits to 30+ seniors",
      coordinator: "Elizabeth Thompson",
      image: "senior-companion",
    },
    {
      name: "Youth Mentoring",
      description:
        "Our mentoring program pairs adult volunteers with at-risk youth for guidance, tutoring, and positive role modeling. We focus on academic success, character development, and life skills.",
      impact: "25 active mentor-mentee relationships",
      coordinator: "Michael Roberts",
      image: "youth-mentoring",
    },
    {
      name: "Community Garden",
      description:
        "Our parish maintains a community garden that provides fresh produce for our food pantry and teaches sustainable gardening practices. Parishioners of all ages participate in planting, maintaining, and harvesting.",
      impact: "Grew 1,200 pounds of produce in 2022",
      coordinator: "Sarah Johnson",
      image: "community-garden",
    },
  ]

  // Function to get the appropriate text based on language
  const getLocalizedText = (en, fr, rw) => {
    if (language === "fr") return fr
    if (language === "rw") return rw
    return en
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/_K4C9562.jpg?height=300&width=1200&text=Community+Initiatives"
            alt="Community Initiatives"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-white mb-4 font-serif">{t("community")}</h1>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>
      </section>

      {/* About Navigation */}
      <section className="bg-[#F5F5F5] py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-4">
          <Link
              href="/about"
              className="bg-white text-[#002F6C] px-4 py-2 rounded-md hover:bg-[#D4AF37] hover:text-white transition-colors"
            >
              {t("overview")}
            </Link>
            <Link
              href="/about/our-chorals"
              className="bg-white text-[#002F6C] px-4 py-2 rounded-md hover:bg-[#D4AF37] hover:text-white transition-colors"
            >
              {t("ourChorals")}
            </Link>
            <Link
              href="/about/catholic-actions"
              className="bg-white text-[#002F6C] px-4 py-2 rounded-md hover:bg-[#D4AF37] hover:text-white transition-colors"
            >
              {t("catholicActions")}
            </Link>
            <Link
              href="/about/community"
              className="bg-[#002F6C] text-white px-4 py-2 rounded-md   hover:bg-[#001F4C] transition-colors"
            >
              {t("community")}
            </Link>
            <Link
              href="/about/parish-committee"
              className="bg-white text-[#002F6C] px-4 py-2 rounded-md hover:bg-[#D4AF37] hover:text-white transition-colors"
            >
              {t("parishCommittee")}
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-6">{t("community")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
            <p className="text-gray-700 mb-4">
            {t("communityDesc1")}
            </p>
            <p className="text-gray-700 mb-6">
            {t("communityDesc2")}
            </p>
            <div className="flex justify-center">
              <Button className="bg-[#D4AF37] hover:bg-[#C09C2C] text-white">{t("getInvolved")}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Communities (Impuza Miryango Remezo) */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">
              {t("community")} (Impuza Miryango Remezo)
            </h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
            {t("communityDesc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {communities.map((community, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto relative">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=${community.image}`}
                      alt={community.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-xl font-bold text-[#002F6C] mb-2">
                      {community.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {community.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-[#D4AF37] mr-2" />
                        <span className="text-gray-700">
                          {bccs[community.name].length} {bccName} • {community.families} Families
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-[#D4AF37] mr-2" />
                        <span className="text-gray-700">
                          Meets:{" "}
                          {community.meetingDay}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 text-[#D4AF37] mr-2" />
                        <span className="text-gray-700">Leader: {community.leader}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-[#D4AF37] mr-2" />
                        <span className="text-gray-700">
                        {community.phone}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="bccs">{bccName.split(" ")[0]}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="pt-4">
                          {/* <p className="text-sm text-gray-600">
                            This community meets on{" "}
                            {community.meetingDay} of
                            each month for prayer, fellowship, and planning community activities. All {bccName} leaders
                            gather to coordinate efforts and share updates.
                          </p> */}
                        </TabsContent>
                        <TabsContent value="bccs" className="pt-4">
                          <div className="max-h-40 overflow-y-auto pr-2">
                            <ul className="space-y-2 text-sm">
                              {bccs[community.name].map((bcc, idx) => (
                                <li
                                  key={idx}
                                  className="flex justify-between items-center border-b border-gray-100 pb-1"
                                >
                                  <span className="font-medium text-[#002F6C]">{bcc.name}</span>
                                  <span className="text-gray-600">{bcc.families} families</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button className="bg-[#002F6C] hover:bg-[#001F4C] text-white flex items-center">
                        View Details <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                      <Button
                        className="bg-[#D4AF37] hover:bg-[#C09C2C] text-white flex items-center"
                        onClick={() => {
                          document.getElementById("bcc-leaders")?.scrollIntoView({ behavior: "smooth" })
                        }}
                      >
                        View Leaders <Users className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BCC Cards Section */}
      <section id="bcc-leaders" className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">Our {bccName} Leaders</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated leaders who guide our {bccName} and help build our faith community.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="st-joseph" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                {communities.map((community) => (
                  <TabsTrigger key={community.name} value={community.name.toLowerCase().replace(/\s+/g, "-")}>
                    {community.name.replace(" Community", "")}
                  </TabsTrigger>
                ))}
              </TabsList>

              {communities.map((community) => (
                <TabsContent
                  key={community.name}
                  value={community.name.toLowerCase().replace(/\s+/g, "-")}
                  className="pt-6"
                >
                  <h3 className="text-xl font-bold text-[#002F6C] mb-4 text-center">
                    {community.name} {bccName}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {bccs[community.name].map((bcc, idx) => (
                      <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-[#002F6C] text-white p-3">
                          <h4 className="font-bold text-center">{bcc.name}</h4>
                        </div>
                        <div className="p-4">
                          <div className="w-20 h-20 rounded-full bg-[#F5F5F5] mx-auto mb-3 flex items-center justify-center">
                            <Users className="h-8 w-8 text-[#D4AF37]" />
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-[#002F6C]">{bcc.leader}</p>
                            <p className="text-sm text-[#D4AF37] mb-2">BCC Leader</p>
                            <p className="text-sm text-gray-600">{bcc.location}</p>
                            <p className="text-sm text-gray-600">{bcc.families} families</p>
                          </div>
                          <Button className="w-full mt-4 bg-[#D4AF37] hover:bg-[#C09C2C] text-white text-sm">
                            Contact Leader
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
      {/* Volunteer */}
      <section className="py-16 bg-[#002F6C] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-serif">Volunteer With Us</h2>
            <p className="text-white/80 mb-8">
              Our community initiatives depend on dedicated volunteers. Whether you can give a few hours a month or
              several hours a week, your contribution makes a difference. Fill out the form below to express your
              interest in volunteering.
            </p>
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-xl font-bold text-[#002F6C] mb-4">Volunteer Interest Form</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md" required>
                  <option value="">I'm interested in volunteering with...</option>
                  {initiatives.map((initiative, index) => (
                    <option key={index} value={initiative.name.toLowerCase().replace(/\s+/g, "-")}>
                      {initiative.name}
                    </option>
                  ))}
                  <option value="bcc">Basic Christian Communities (BCCs)</option>
                  <option value="multiple">Multiple Initiatives</option>
                  <option value="not-sure">Not Sure Yet</option>
                </select>
                <div className="space-y-2">
                  <p className="font-medium text-[#002F6C]">Availability:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>Weekday Mornings</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>Weekday Afternoons</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>Weekday Evenings</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>Weekends</span>
                    </label>
                  </div>
                </div>
                <textarea
                  placeholder="Tell us about your skills, interests, or any questions you have"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md h-32"
                ></textarea>
                <Button className="w-full bg-[#D4AF37] hover:bg-[#C09C2C] text-white">Submit</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Back to About */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-center">
            <Link href="/about">
              <Button
                variant="outline"
                className="flex items-center border-[#002F6C] text-[#002F6C] hover:bg-[#002F6C] hover:text-white"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to About
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

