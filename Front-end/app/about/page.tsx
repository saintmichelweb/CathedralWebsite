"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/_K4C9496.jpg?height=300&width=1200&text=About+Us"
            alt={t("about")}
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-white mb-4 font-serif">{t("aboutParish")}</h1>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>
      </section>

      {/* About Navigation */}
      <section className="bg-[#F5F5F5] py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="bg-[#002F6C] text-white px-4 py-2 rounded-md hover:bg-[#001F4C] transition-colors"
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
              className="bg-white text-[#002F6C] px-4 py-2 rounded-md hover:bg-[#D4AF37] hover:text-white transition-colors"
            >
              {t("parishCommittee")}
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#002F6C] font-serif mb-6">{t("ourHistory")}</h2>
              <p className="text-gray-700 mb-4">{t("historyDesc1")}</p>
              <p className="text-gray-700 mb-4">{t("historyDesc2")}</p>
              <p className="text-gray-700 mb-4">{t("historyDesc3")}</p>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/_K4C9562.jpg?height=400&width=600&text=Parish+History"
                alt={t("ourHistory")}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">{t("ourMission")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("missionStatement")}</p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#002F6C] flex items-center justify-center">
                <span className="text-4xl text-[#D4AF37] font-serif">✝</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#002F6C] mb-2">{t("faithValue")}</h3>
                <p className="text-gray-700">{t("faithDesc")}</p>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200 my-8"></div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#002F6C] flex items-center justify-center">
                <span className="text-4xl text-[#D4AF37] font-serif">❤</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#002F6C] mb-2">{t("communityValue")}</h3>
                <p className="text-gray-700">{t("communityDesc")}</p>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200 my-8"></div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#002F6C] flex items-center justify-center">
                <span className="text-4xl text-[#D4AF37] font-serif">🤲</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#002F6C] mb-2">{t("serviceValue")}</h3>
                <p className="text-gray-700">{t("serviceDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Priests */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">{t("ourPriests")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("priestsDesc")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: " ⁠A. Innocent CONSOLATEUR ", title: t("pastor"), image: "/_K4C9707.jpg?height=500&width=300" },
              { name: "A. Eugène MUHIRE RWIGILIRA", title: t("associatePastor"), image: "/_K4C9680.jpg?height=300&width=300" },
              { name: "A. Jean-Claude NTAKIYIMANA ", title: t("associatePastor"), image: "/_K4C9685.jpg?height=300&width=300" },
            ].map((priest) => (
              <div key={priest.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src={priest.image}
                    alt={priest.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#002F6C] mb-1">{priest.name}</h3>
                  <p className="text-[#D4AF37] font-medium mb-4">{priest.title}</p>
                  <p className="text-gray-600 mb-4">{t("priestBio")}</p>
                  <Button
                    variant="outline"
                    className="border-[#002F6C] text-[#002F6C] hover:bg-[#002F6C] hover:text-white"
                  >
                    {t("readBio")}
                  </Button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* About Subpages Section */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">{t("exploreMoreAbout")}</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("exploreMoreDesc")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/_K4C9558.jpg?height=200&width=400&text=Our+Chorals"
                  alt={t("ourChorals")}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#002F6C] mb-3">{t("ourChorals")}</h3>
                <p className="text-gray-600 mb-4">{t("choralsDesc")}</p>
                <Link href="/about/our-chorals">
                  <Button className="w-full bg-[#002F6C] hover:bg-[#001F4C] text-white">
                    {t("learnMore")} <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/_K4C9496.jpg?height=200&width=400&text=Catholic+Actions"
                  alt={t("catholicActions")}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#002F6C] mb-3">{t("catholicActions")}</h3>
                <p className="text-gray-600 mb-4">{t("catholicActionsDesc")}</p>
                <Link href="/about/catholic-actions">
                  <Button className="w-full bg-[#002F6C] hover:bg-[#001F4C] text-white">
                    {t("learnMore")} <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/_K4C9517.jpg?height=200&width=400&text=Community"
                  alt={t("community")}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#002F6C] mb-3">{t("community")}</h3>
                <p className="text-gray-600 mb-4">{t("communityAboutDesc")}</p>
                <Link href="/about/community">
                  <Button className="w-full bg-[#002F6C] hover:bg-[#001F4C] text-white">
                    {t("learnMore")} <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/_K4C9703.jpg?height=200&width=400&text=Parish+Council"
                  alt={t("parishCommittee")}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#002F6C] mb-3">{t("parishCommittee")}</h3>
                <p className="text-gray-600 mb-4">{t("parishCommitteeAboutDesc")}</p>
                <Link href="/about/parish-committee">
                  <Button className="w-full bg-[#002F6C] hover:bg-[#001F4C] text-white">
                    {t("learnMore")} <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#002F6C] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 font-serif">{t("joinParish")}</h2>
            <p className="text-white/80 mb-8">{t("joinParishDesc")}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-[#D4AF37] hover:bg-[#C09C2C] text-white">{t("registerParishioner")}</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#002F6C]">
                {t("contactUs")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

