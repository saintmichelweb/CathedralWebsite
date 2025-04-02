"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"


export default function AnnouncementsPage() {
  const { t } = useLanguage()

  const announcements = [
    {
      id: 1,
      title: "Parish Feast Day Celebration",
      date: "September 29, 2023",
      category: "Events",
      isPinned: true,
      excerpt:
        "Join us for our annual parish feast day celebration honoring Saint Michel. The day will include special Masses, food, music, and activities for all ages.",
    },
    {
      id: 2,
      title: "Volunteer Appreciation Dinner",
      date: "August 15, 2023",
      category: "Community",
      isPinned: true,
      excerpt:
        "We invite all parish volunteers to a special appreciation dinner to thank you for your dedicated service to our community.",
    },
    {
      id: 3,
      title: "Religious Education Registration",
      date: "August 1, 2023",
      category: "Education",
      isPinned: false,
      excerpt:
        "Registration for the 2023-2024 Religious Education program is now open. Classes begin in September for children in grades K-12.",
    },
    {
      id: 4,
      title: "Parish Council Meeting",
      date: "July 20, 2023",
      category: "Administration",
      isPinned: false,
      excerpt:
        "The Parish Council will meet on Thursday, July 20 at 7:00 PM in the parish hall. All parishioners are welcome to attend.",
    },
    {
      id: 5,
      title: "Youth Group Summer Retreat",
      date: "July 15, 2023",
      category: "Youth",
      isPinned: false,
      excerpt:
        "Our parish youth group will be hosting a summer retreat for high school students. Registration is required by July 1.",
    },
    {
      id: 6,
      title: "New Mass Schedule",
      date: "July 1, 2023",
      category: "Liturgy",
      isPinned: false,
      excerpt:
        "Beginning July 1, we will be implementing a new Mass schedule. Please check the updated times for weekday and weekend Masses.",
    },
  ]

  const pinnedAnnouncements = announcements.filter((a) => a.isPinned)
  const regularAnnouncements = announcements.filter((a) => !a.isPinned)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/_K4C9500.jpg?height=300&width=1200&text=Announcements"
            alt="Parish Announcements"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-white mb-4 font-serif">{t("cathedralAnnouncements")}</h1>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Pinned Announcements */}
          {pinnedAnnouncements.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#002F6C] font-serif mb-6">Important Announcements</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {pinnedAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="bg-[#FFF8E1] border-l-4 border-[#D4AF37] rounded-lg shadow-md p-6"
                  >
                    <div className="flex items-center mb-2">
                      <span className="bg-[#D4AF37] text-white text-xs font-medium px-2 py-1 rounded">
                        {announcement.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#002F6C] mb-2">{announcement.title}</h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-sm">{announcement.date}</span>
                    </div>
                    <p className="text-gray-700 mb-4">{announcement.excerpt}</p>
                    <Link
                      href={`/announcements/${announcement.id}`}
                      className="inline-flex items-center text-[#002F6C] font-medium hover:text-[#D4AF37]"
                    >
                      Read more <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Announcements */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#002F6C] font-serif">Recent Announcements</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Filter by:</span>
                <select className="text-sm border rounded-md px-2 py-1">
                  <option value="all">All Categories</option>
                  <option value="events">Events</option>
                  <option value="community">Community</option>
                  <option value="education">Education</option>
                  <option value="liturgy">Liturgy</option>
                  <option value="youth">Youth</option>
                  <option value="administration">Administration</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {regularAnnouncements.map((announcement) => (
                <div key={announcement.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#002F6C] mb-2 md:mb-0">{announcement.title}</h3>
                    <div className="flex items-center space-x-4">
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                        {announcement.category}
                      </span>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-sm">{announcement.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{announcement.excerpt}</p>
                  <Link
                    href={`/announcements/${announcement.id}`}
                    className="inline-flex items-center text-[#002F6C] font-medium hover:text-[#D4AF37]"
                  >
                    Read more <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="outline" className="border-[#002F6C] text-[#002F6C] hover:bg-[#002F6C] hover:text-white">
                Load More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-[#002F6C] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-serif">Stay Updated</h2>
            <p className="text-white/80 mb-8">
              Subscribe to our parish newsletter to receive the latest announcements, events, and updates directly in
              your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md flex-1 text-gray-900"
              />
              <Button className="bg-[#D4AF37] hover:bg-[#C09C2C] text-white">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

