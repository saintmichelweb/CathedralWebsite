"use client"


import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Music, Calendar, Users, ChevronLeft } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import ChoirAudioSection from "@/components/ChoirAudioSection"


export default function OurChoralsPage() {
  const { t } = useLanguage()
  
  const recordings = [
    { title: "Ave Maria - Saint Michel Main Choir", date: "Easter Sunday 2023", audioSrc: "/ave-maria.mp3" },
    { title: "Amazing Grace - Youth Choir", date: "Youth Sunday 2023", audioSrc: "/amazing-grace-14230.mp3" },
    { title: "How Great Thou Art - Contemporary Ensemble", date: "Parish Festival 2023", audioSrc: "/how-great-thou-art-172272.mp3" },
    { title: "Sinogenda Ntashimye", date: "Christmas Eve 2022", audioSrc: "/Sinogenda-Ntashimye.mp3" },
    { title: "Inkingi Negamiye", date: "Parish Festival 2024", audioSrc: "/Inkingi-Negamiye.mp3" },
  ];
  
  
  

  const choirs = [
    {
      name: "Chorale Les Messagers du Christ",
      description:
        "Our primary choir that sings at the 10:30 AM Sunday Mass. This choir performs a wide range of traditional and contemporary Catholic hymns.",
      rehearsal: "Thursdays, 7:00 PM - 9:00 PM",
      members: "35 members",
      director: "Rosette Sebasoni",
      image: "main-choir",
    },
    {
      name: "Chorale Ubumwe bw’ Ubutatu Butagatifu ",
      description:
        "A vibrant choir composed of parish youth ages 13-18. They sing at the 9:00 AM Sunday Mass once a month and at special youth events.",
      rehearsal: "Wednesdays, 5:30 PM - 7:00 PM",
      members: "20 members",
      director: "Eugene NIZEYIMANA",
      image: "ubumwe.jpg",
    },
    {
      name: "Chorale Inyange za Mariya",
      description:
        "Our children's choir (ages 7-12) sings at family Masses and special celebrations throughout the liturgical year.",
      rehearsal: "Saturdays, 10:00 AM - 11:30 AM",
      members: "25 members",
      director: "Egide TUYISHIME",
      image: "Photoinyange.jpg",
    },
    {
      name: "Chorale Ste Cecile",
      description:
        "This choir leads music at our 12:00 PM Kinyarwanda Mass, featuring traditional Rwandan hymns and rhythms.",
      rehearsal: "Fridays, 6:00 PM - 8:00 PM",
      members: "30 members",
      director: "John Mukeshimana",
      image: "stcecile.jpg",
    },
    {
      name: "Chorale Lustitia",
      description: "Performs at the 9:00 AM French Mass, featuring hymns in French and from French-speaking countries.",
      rehearsal: "Tuesdays, 7:00 PM - 8:30 PM",
      members: "22 members",
      director: "Niyiragira Gerard",
      image: "Lustitia.jpg",
    },
    {
      name: "Christ the King Choir",
      description:
        "A small group of vocalists and instrumentalists who perform contemporary Catholic music at special events and youth Masses.",
      rehearsal: "Mondays, 6:30 PM - 8:30 PM",
      members: "12 members",
      director: "Cyubahiro Theotime",
      image: "CTKC.jpeg",
    },
    {
      name: "St Paul and Youth Choir   ",
      description:
        "A small group of vocalists and instrumentalists who perform contemporary Catholic music at special events and youth Masses.",
      rehearsal: "Mondays, 6:30 PM - 8:30 PM",
      members: "35 members",
      director: "Nsekanukunze Alain Michel ",
      image: "stpaulandyth.jpg",
    },
    {
      name: "Saints Peter & Paul Family Choir",
      description:
        "A small group of vocalists and instrumentalists who perform contemporary Catholic music at special events and youth Masses.",
      rehearsal: "Mondays, 6:30 PM - 8:30 PM",
      members: "35 members",
      director: "Ezechiel NIYONGAMIJE",
      image: "SaintsPeterandPaulFamilychoir.jpg",
    },
    {
      name: "Chorale la Fraternité Universelle",
      description:
        "A small group of vocalists and instrumentalists who perform contemporary Catholic music at special events and youth Masses.",
      rehearsal: "Wednesdays, 6:30 PM - 8:30 PM",
      members: "50 members",
      director: "Dr RUNYANGE Tharcisse",
      image: "Fraternité.jpg",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/_K4C9558.jpg?height=300&width=1200&text=Our+Chorals"
            alt="Our Chorals"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-white mb-4 font-serif">{t("our_chorals")}</h1>
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
              className="bg-[#002F6C] text-white px-4 py-2 rounded-md   hover:bg-[#001F4C] transition-colors"
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
          <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-6">
            {t("musicMinistryTitle")}
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-gray-700 mb-4">{t("musicMinistryDesc1")}</p>
          <p className="text-gray-700 mb-6">{t("musicMinistryDesc2")}</p>
          <div className="flex justify-center">
            <Button className="bg-[#D4AF37] hover:bg-[#C09C2C] text-white">
              {t("joinChoir")}
            </Button>
          </div>
        </div>
      </div>
    </section>

      {/* Choir Groups */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">{t("choirGroups")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
            {t("choirGroupsDesc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {choirs.map((choir, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto relative">
                    <Image
                      src={`/${choir.image}?height=300&width=300&text=${choir.name}`}
                      alt={choir.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-xl font-bold text-[#002F6C] mb-2">{choir.name}</h3>
                    <p className="text-gray-600 mb-4">{choir.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-[#D4AF37] mr-2" />
                        <span className="text-gray-700">Rehearsal: {choir.rehearsal}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-[#D4AF37] mr-2" />
                        <span className="text-gray-700">{choir.members}</span>
                      </div>
                      <div className="flex items-center">
                        <Music className="h-4 w-4 text-[#D4AF37] mr-2" />
                        <span className="text-gray-700">Director: {choir.director}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audio Samples */}
      <ChoirAudioSection recordings={recordings} />

      {/* Join a Choir */}
      <section className="py-16 bg-[#002F6C] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-serif">{t("joinMusicMinistry")}</h2>
            <p className="text-white/80 mb-8">
            {t("joinMusicMinistryDesc")}
            </p>
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-xl font-bold text-[#002F6C] mb-4">{t("choirInterestForm")}</h3>
              <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 bg-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 bg-white"
                        required
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 bg-white"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 bg-white"
                    />
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 bg-white"
                      required
                    >
                      <option value="" className="text-gray-500">Select a Choir</option>
                      {choirs.map((choir, index) => (
                        <option key={index} value={choir.name.toLowerCase().replace(/\s+/g, "-")}>
                          {choir.name}
                        </option>
                      ))}
                    </select>
                    <textarea
                      placeholder="Tell us about your musical experience (optional)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md h-32 text-gray-800 placeholder-gray-500 bg-white"
                    ></textarea>
                    <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#C09C2C] text-white py-2 rounded-md">
                      Submit
                    </button>
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

