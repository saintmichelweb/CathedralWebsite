"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Mail, ChevronLeft, Phone } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function ParishCouncilPage() {
  const { t } = useLanguage()

  // Parish Council members data
  const councilMembers = [
    {
      name: "⁠A. Innocent CONSOLATEUR",
      position: t("committeePresident"),
      bio: t("committeeMemberBio1"),
      image: "president",
      email: "innocent.consolateur@saintmichel.rw",
      phone: "+250 789 123 456",
    },
    {
      name: "Mary Johnson",
      position: t("committeeVicePresident"),
      bio: t("committeeMemberBio2"),
      image: "vice-president",
      email: "mary.johnson@example.com",
      phone: "+250 789 234 567",
    },
    {
      name: "Robert Smith",
      position: t("committeeSecretary"),
      bio: t("committeeMemberBio3"),
      image: "secretary",
      email: "robert.smith@example.com",
      phone: "+250 789 345 678",
    },
    {
      name: "Sarah Williams",
      position: t("committeeTreasurer"),
      bio: t("committeeMemberBio4"),
      image: "treasurer",
      email: "sarah.williams@example.com",
      phone: "+250 789 456 789",
    },
    {
      name: "Michael Brown",
      position: t("committeeMember"),
      bio: t("committeeMemberBio5"),
      image: "liturgy-chair",
      email: "michael.brown@example.com",
      phone: "+250 789 567 890",
    },
    {
      name: "Elizabeth Davis",
      position: t("committeeMember"),
      bio: t("committeeMemberBio6"),
      image: "education-chair",
      email: "elizabeth.davis@example.com",
      phone: "+250 789 678 901",
    },
    {
      name: "James Wilson",
      position: t("committeeMember"),
      bio: t("committeeMemberBio7"),
      image: "youth-rep",
      email: "james.wilson@example.com",
      phone: "+250 789 789 012",
    },
    {
      name: "Patricia Moore",
      position: t("committeeMember"),
      bio: t("committeeMemberBio8"),
      image: "outreach-chair",
      email: "patricia.moore@example.com",
      phone: "+250 789 890 123",
    },
  ]

  // Council committees
  const committees = [
    {
      name: t("executiveCommittee"),
      description: "Oversees the general operation of the Parish Council and makes emergency decisions when necessary.",
      members:
        t("committeePresident") +
        ", " +
        t("committeeVicePresident") +
        ", " +
        t("committeeSecretary") +
        ", " +
        t("committeeTreasurer"),
      meetingFrequency: t("everyTuesday"),
    },
    {
      name: t("liturgyCommittee"),
      description:
        "Plans and coordinates liturgical celebrations throughout the year, including special feast days and sacramental celebrations.",
      members: "5 members",
      meetingFrequency: t("monthlyMeetings"),
    },
    {
      name: t("financeCommittee"),
      description: "Manages parish finances, prepares the annual budget, and ensures financial transparency.",
      members: "6 members",
      meetingFrequency: t("monthlyMeetings"),
    },
    {
      name: t("buildingCommittee"),
      description: "Oversees the maintenance and improvement of parish facilities and grounds.",
      members: "4 members",
      meetingFrequency: t("biMonthlyMeetings"),
    },
    {
      name: t("educationCommittee"),
      description: "Coordinates faith formation programs for children, youth, and adults.",
      members: "7 members",
      meetingFrequency: t("monthlyMeetings"),
    },
    {
      name: t("outreachCommittee"),
      description: "Plans and implements community service initiatives and advocates for social justice.",
      members: "8 members",
      meetingFrequency: t("monthlyMeetings"),
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=300&width=1200&text=Parish+Council"
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
              href="/about/parish-council"
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

      {/* Council Members */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">{t("meetCommitteeMembers")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("committeeIntro")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {councilMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src={`/placeholder.svg?height=300&width=300&text=${member.image}`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#002F6C] mb-1">{member.name}</h3>
                  <p className="text-[#D4AF37] font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Mail className="h-4 w-4 text-[#D4AF37] mr-2" />
                      <a href={`mailto:${member.email}`} className="hover:text-[#D4AF37]">
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Phone className="h-4 w-4 text-[#D4AF37] mr-2" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committees */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">{t("committeeStructure")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("committeeStructureDesc")}</p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {committees.map((committee, index) => (
              <div key={index} className="bg-[#F5F5F5] rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#002F6C] mb-3">{committee.name}</h3>
                <p className="text-gray-700 mb-4">{committee.description}</p>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Users className="h-4 w-4 text-[#D4AF37] mr-2" />
                  <span>{committee.members}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 text-[#D4AF37] mr-2" />
                  <span>
                    {t("meetingFrequency")}: {committee.meetingFrequency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meeting Schedule */}
      <section className="py-16 bg-[#F5F5F5]">
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

      {/* Annual Planning */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-6">{t("annualPlanning")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
            <p className="text-gray-700 mb-6">{t("annualPlanningDesc")}</p>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-[#F5F5F5] p-6 rounded-lg">
                <div className="w-12 h-12 bg-[#002F6C] text-white rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold text-[#002F6C] mb-2">{t("assessmentPhase")}</h3>
                <p className="text-gray-600">{t("assessmentPhaseDesc")}</p>
              </div>

              <div className="bg-[#F5F5F5] p-6 rounded-lg">
                <div className="w-12 h-12 bg-[#002F6C] text-white rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold text-[#002F6C] mb-2">{t("discernmentPhase")}</h3>
                <p className="text-gray-600">{t("discernmentPhaseDesc")}</p>
              </div>

              <div className="bg-[#F5F5F5] p-6 rounded-lg">
                <div className="w-12 h-12 bg-[#002F6C] text-white rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold text-[#002F6C] mb-2">{t("goalSettingPhase")}</h3>
                <p className="text-gray-600">{t("goalSettingPhaseDesc")}</p>
              </div>
            </div>

            <div className="mt-8">
              <Button className="bg-[#D4AF37] hover:bg-[#C09C2C] text-white">{t("viewParishPlan")}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Council */}
      <section className="py-16 bg-[#002F6C] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-serif">{t("joinCommittee")}</h2>
            <p className="text-white/80 mb-8">{t("joinCommitteeDesc")}</p>
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-xl font-bold text-[#002F6C] mb-4">{t("committeeApplication")}</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t("firstName")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    placeholder={t("lastName")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <input
                  type="email"
                  placeholder={t("emailAddress")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="tel"
                  placeholder={t("phoneNumber")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md" required>
                  <option value="">{t("committeeInterest")}</option>
                  <option value="executive">{t("executiveCommittee")}</option>
                  <option value="liturgy">{t("liturgyCommittee")}</option>
                  <option value="finance">{t("financeCommittee")}</option>
                  <option value="building">{t("buildingCommittee")}</option>
                  <option value="education">{t("educationCommittee")}</option>
                  <option value="outreach">{t("outreachCommittee")}</option>
                  <option value="any">{t("anyCommittee")}</option>
                </select>
                <textarea
                  placeholder={t("applicationMessage")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md h-32"
                  required
                ></textarea>
                <Button className="w-full bg-[#D4AF37] hover:bg-[#C09C2C] text-white">{t("submitApplication")}</Button>
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
                <ChevronLeft className="mr-2 h-4 w-4" /> {t("backToAbout")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

