"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Users, Calendar, Mail } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function ParishCommitteePage() {
  const { t } = useLanguage()

  const committeeMembers = [
    {
      name: "⁠A. Innocent CONSOLATEUR",
      position: t("committeePresident"),
      bio: t("committeeMemberBio1"),
      image: "_K4C9707.jpg",
      email: "innocent.consolateur@saintmichel.rw",
    },
    {
      name: "Mr Seraphin Ntagwabira",
      position: t("committeeVicePresident"),
      bio: t("committeeMemberBio2"),
      image: "_K4C9657.jpg",
      email: "example@example.com",
    },
    {
      name: "Mrs Marie Basebanyakwinshi",
      position: t("committeeSecretary"),
      bio: t("committeeMemberBio3"),
      image: "_K4C9663.jpg",
      email: "examplee@example.com",
    },
    {
      name: "Mrs Rose Baguma",
      position: t("committeeMember"),
      bio: t("committeeMemberBio4"),
      image: "_K4C9671.jpg",
      email: "example@example.com",
    },
    {
      name: "Mrs Carol Karema",
      position: t("committeeMember"),
      bio: t("committeeMemberBio5"),
      image: "carole.jpg",
      email: "example@example.com",
    },
    {
      name: "Mrs Wivine Kabuto",
      position: t("adminPublicRelations"),
      bio: t("committeeMemberBio6"),
      image: "_K4C9642.jpg",
      email: "example@example.com",
    },
    // {
    //   name: "James Wilson",
    //   position: t("committeeMember"),
    //   bio: t("committeeMemberBio7"),
    //   image: "member-3",
    //   email: "james.wilson@example.com",
    // },
    // {
    //   name: "Patricia Moore",
    //   position: t("committeeMember"),
    //   bio: t("committeeMemberBio8"),
    //   image: "member-4",
    //   email: "patricia.moore@example.com",
    // },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/_K4C9703.jpg?height=300&width=1200&text=Parish+Committee+Council"
            alt={t("parishCommitteeCouncil")}
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-white mb-4 font-serif">{t("parishCommitteeCouncil")}</h1>
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
              className="bg-white text-[#002F6C] px-4 py-2 rounded-md hover:bg-[#D4AF37] hover:text-white transition-colors"
            >
              {t("community")}
            </Link>
            <Link
              href="/about/parish-committee"
              className="bg-[#002F6C] text-white px-4 py-2 rounded-md hover:bg-[#001F4C] transition-colors"
            >
              {t("parishCommittee")}
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-6">{t("aboutParishCommittee")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mb-6"></div>
            <p className="text-gray-700 mb-4">{t("parishCommitteeDesc1")}</p>
            <p className="text-gray-700 mb-4">{t("parishCommitteeDesc2")}</p>
            <p className="text-gray-700 mb-6">{t("parishCommitteeDesc3")}</p>

            <div className="bg-[#F5F5F5] p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#002F6C] mb-4">{t("committeeResponsibilities")}</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>{t("committeeResp1")}</li>
                <li>{t("committeeResp2")}</li>
                <li>{t("committeeResp3")}</li>
                <li>{t("committeeResp4")}</li>
                <li>{t("committeeResp5")}</li>
                <li>{t("committeeResp6")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Committee Members */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">{t("meetCommitteeMembers")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("committeeIntro")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {committeeMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src={`/${member.image}?height=300&width=300&text=${member.email}`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#002F6C] mb-1">{member.name}</h3>
                  <p className="text-[#D4AF37] font-medium mb-3">{member.position}</p>
                  {/* <p className="text-gray-600 text-sm mb-4">{member.bio}</p> */}
                  <div className="flex items-center text-gray-600 text-sm">
                    <Mail className="h-4 w-4 text-[#D4AF37] mr-2" />
                    <a href={`mailto:${member.email}`} className="hover:text-[#D4AF37]">
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meeting Schedule */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-6 text-center">{t("committeeMeetings")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"></div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-[#D4AF37] mr-2" />
                  <h3 className="text-xl font-bold text-[#002F6C]">{t("regularMeetings")}</h3>
                </div>
                <p className="text-gray-700 mb-4">{t("regularMeetingsDesc")}</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between">
                    <span>{t("generalAssembly")}</span>
                    <span className="font-medium">{t("firstSundayMonth")}, 2:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t("executiveCommittee")}</span>
                    <span className="font-medium">{t("everyTuesday")}, 7:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t("financeCommittee")}</span>
                    <span className="font-medium">{t("secondThursday")}, 6:30 PM</span>
                  </li>
                </ul>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="w-5 h-5 text-[#D4AF37] mr-2" />
                  <h3 className="text-xl font-bold text-[#002F6C]">{t("parishionerParticipation")}</h3>
                </div>
                <p className="text-gray-700 mb-4">{t("parishionerParticipationDesc")}</p>
                <Button className="bg-[#002F6C] hover:bg-[#001F4C] text-white">{t("contactCommittee")}</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to About */}
      <section className="py-8 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-center">
            <Link href="/about">
              <Button
                variant="outline"
                className="flex items-center border-[#002F6C] text-[#002F6C] hover:bg-[#002F6C] hover:text-white"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> {t("backToAbout")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

