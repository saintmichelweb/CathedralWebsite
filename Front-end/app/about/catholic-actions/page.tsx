"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Calendar, MapPin, ChevronLeft, Phone } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"


export default function CatholicActionsPage() {
  const { t } = useLanguage()

  const groups = [
    {
      name: "Légio de Marie",
      description:
        "Umuryango w'abakirisitu w'abalayiki ugizwe n'abanyamuryango bakorera Kiliziya binyuze mu masengesho n'imirimo y'ubwiza. Abanyamuryango batanga umusanzu mu buzima bwa paruwasi binyuze mu gusura imiryango, abarwayi, no gufatanya mu bikorwa byo kwamamaza ijambo ry'Imana.",
      meeting: "Tuesdays, 6:00 PM",
      leader: "Pascal  Karangwa",
      phone:"+250788482825",
      image: "Légio.jpg",
    },
    {
      name: "Impuhwe z'Imana",
      description:
        "Intego y'umuryango w'Impuhwe z'Imana ni ugushyiraho ahantu h'urukundo, imbabazi, n'ubuntu hagati y'abanyamuryango. Ugamije gukora ahantu abantu bashobora gushyigikirana, gukira ibikomere byashize, no gukura hamwe mu kwizera. Mu gukorana impuhwe mu bikorwa bya buri munsi, umuryango ugaragaza urukundo rw'Imana, bigatuma habaho ubumwe, amahoro, no gukura mu kwemera kwa buri wese.",
      meeting: "First Thursday of each month, 7:30 PM",
      leader: "Consolata Mukandimanyi",
      phone:"+250788513472",
      image: "Miséricorde.jpg",
    },
    {
      name: "Aba Karisimatike",
      description:
        "Umuryango w’Abakirisitu ukora ibikorwa by’ivugurura ry’umwuka, gusenga, no guteza imbere umubano wimbitse n’Umwuka Wera. Abanyamuryango bitabira gusenga, gukira, no gukora ibikorwa by’ubuvugizi mu gutera imbaraga ukwemera kwabo no gusangiza urukundo rw’Imana.",
      meeting: "Second Wednesday of each month, 7:00 PM",
      leader: "Fulgence Nzabonimpa",
      phone:"+250783235877",
      image: "charismatic.png",
    },
    {
      name: "Mouvent Marial Sacérodotal",
      description:
        "Umuryango Gatolika ugamije gushyigikira abapadiri n’abakirisitu binyuze mu kwiyegurira Bikira Mariya. Abanyamuryango biyemeza gusenga, kongera imbaraga mu kwemera, no gushishikariza ubumwe mu Itorero. Bahamagarirwa gukurikira uburere bwa Mariya, kugira ukwemera gukomeye, kumvira Kiliziya no kwamamaza Inkuru Nziza.",
      meeting: "Mondays, 5:30 PM",
      leader: "Immaculée Mukamana",
      phone:"+250788754441",
      image: "MarianMovement.jpg",
    },
    {
      name: "Mouvement Xaveri",
      description:
        "Umuryango w’urubyiruko Gatolika wibanda ku burere bw’imyemerere, imibereho myiza, n’indangagaciro, wubakiye ku ndangagaciro za Mutagatifu Fransisiko Xavier. Abanyamuryango bagira uruhare mu buyobozi, ibikorwa by’ubwitange, no gukomeza ukwemera kwabo binyuze mu bikorwa by’iyogezabutumwa.",
      meeting: "Third Monday of each month, 7:00 PM",
      leader: "Habumuremyi Jean Jacques Hyacenthe",
      phone:"+250729495248",
      image: "Xaveri.jpeg",
    },
    {
      name: "Abanyamutima",
      description:
        "Umuryango w’Abakirisitu wiyeguriye Mutima Mutagatifu wa Yezu, ugamije gushimangira ukwemera binyuze mu isengesho, gusingiza Imana, no gukora ibikorwa by’urukundo. Abanyamuryango biyemeza kwigana umutima w’impuhwe wa Kristu, bakorera abandi, bashyira hamwe, kandi bakwirakwiza ukwizera Mutima Mutagatifu wa Yezu mu muryango wabo no muri paruwasi.",
      meeting: "Last Friday of each month, 6:30 PM",
      leader: "Richard  Sebahire",
      phone:"+250788449815",
      image: "Abanyamutima.jpg",
    },
    {
      name: "Indabo za Maria",
      description:
        "Itsinda ry’abakristu basenga no gukorera Umubyeyi Bikiramariya, bakamwubaha binyuze mu isengesho, ibikorwa by’urukundo, n’ubwitange. Abanyamuryango bagamije kubaho bakurikije urugero rwa Bikira Mariya mu kwicisha bugufi, kumvira, no kugira impuhwe, bakagira uruhare mu buzima bw’itorero no mu iyogezabutumwa.",
      meeting: "Last Friday of each month, 6:30 PM",
      leader: "Rutembesa  Epimaque",
      phone:"+250788594136",
      image: "bikira-maria.jpg",
    },
    {
      name: "Chemin Néo-Catéchuménat",
      description:
        "Umuryango w’Abakristu ugamije gukomeza ukwemera no kwigisha Ivanjili binyuze mu rugendo rw’ubwigishwa bw’imbitse. Abanyamuryango bakorera mu matsinda mato mu muryangoremezo, basoma Bibiliya, bahimbaza Ukaristiya, kandi bagaragaza ukwemera kwabo binyuze mu butumwa, kongera imbaraga mu miryango, no gukorera abandi.",
      meeting: "Last Friday of each month, 6:30 PM",
      leader: "Jean de Dieu Maniraguha",
      phone:"+250788513472",
      image: "Chemin-Neocatechumenal.jpg",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/_K4C9588.jpg?height=300&width=1200&text=Catholic+Actions"
            alt="Catholic Actions"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-white mb-4 font-serif">{t("catholicActions")}</h1>
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
              className="bg-[#002F6C] text-white px-4 py-2 rounded-md   hover:bg-[#001F4C] transition-colors"
            >
              {t("catholicActions")}
            </Link>
            <Link
              href="/about/community"
              className="bg-white text-[#002F6C] px-4 py-2 rounded-md hover:bg-[#D4AF37] hover:text-white transition-colors"
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
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-6">{t("faithInAction")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
            <p className="text-gray-700 mb-4">
            {t("faithInActionDesc1")}
            </p>
            <p className="text-gray-700 mb-6">
            {t("faithInActionDesc2")}
            </p>
            <div className="flex justify-center">
              <Button className="bg-[#D4AF37] hover:bg-[#C09C2C] text-white">{t("getInvolved")}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Catholic Action Groups */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">{t("ourCatholicActionGroups")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
            {t("ourCatholicActionGroupsDesc")}
            </p>
          </div>

          <div className="space-y-8">
            {groups.map((group, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 h-64 md:h-auto relative">
                    <Image
                      src={`/${group.image}?height=300&width=300&text=${group.name}`}
                      alt={group.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-xl font-bold text-[#002F6C] mb-3">{group.name}</h3>
                    <p className="text-gray-600 mb-4">{group.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-[#D4AF37] mr-2" />
                        <span className="text-gray-700">Meeting: {group.meeting}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-[#D4AF37] mr-2" />
                        <span className="text-gray-700">Leader: {group.leader}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-[#D4AF37] mr-2" />
                        <span className="text-gray-700">Phone: {group.phone}</span>
                      </div>
                    </div>
                    <Button className="mt-4 bg-[#002F6C] hover:bg-[#001F4C] text-white">Learn More</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">{t("upcomingEvents")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
            {t("upcomingEventsDesc")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Food Drive",
                date: "June 15, 2023",
                time: "9:00 AM - 2:00 PM",
                location: "Parish Hall",
                group: "St. Vincent de Paul Society",
                description: "Help collect non-perishable food items for local families in need.",
              },
              {
                title: "Pro-Life Prayer Vigil",
                date: "June 20, 2023",
                time: "7:00 PM - 8:30 PM",
                location: "Church",
                group: "Pro-Life Committee",
                description: "Join us for a peaceful prayer vigil for the protection of human life.",
              },
              {
                title: "Environmental Stewardship Workshop",
                date: "June 25, 2023",
                time: "10:00 AM - 12:00 PM",
                location: "Parish Center",
                group: "Justice and Peace Commission",
                description: "Learn practical ways to care for our common home.",
              },
              {
                title: "Nursing Home Visitation",
                date: "July 1, 2023",
                time: "2:00 PM - 4:00 PM",
                location: "Sunshine Nursing Home",
                group: "Legion of Mary",
                description: "Visit and pray with residents at the local nursing home.",
              },
            ].map((event, index) => (
              <div key={index} className="bg-[#F5F5F5] rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#002F6C] mb-2">{event.title}</h3>
                <p className="text-[#D4AF37] font-medium text-sm mb-3">{event.group}</p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-[#D4AF37] mr-2" />
                    <span className="text-gray-700">
                      {event.date}, {event.time}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-[#D4AF37] mr-2" />
                    <span className="text-gray-700">{event.location}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                <Button
                  variant="outline"
                  className="text-sm border-[#002F6C] text-[#002F6C] hover:bg-[#002F6C] hover:text-white"
                >
                  Add to Calendar
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16 bg-[#002F6C] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-serif">{t("getInvolved")}</h2>
            <p className="text-white/80 mb-8">
            {t("joinCatholicAction")}
            </p>
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-xl font-bold text-[#002F6C] mb-4">Interest Form</h3>
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
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 bg-white" required>
                  <option value="">I'm interested in...</option>
                  {groups.map((group, index) => (
                    <option key={index} value={group.name.toLowerCase().replace(/\s+/g, "-")}>
                      {group.name}
                    </option>
                  ))}
                  <option value="multiple">Multiple Groups</option>
                  <option value="not-sure">Not Sure Yet</option>
                </select>
                <textarea
                  placeholder="Additional comments or questions"
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

