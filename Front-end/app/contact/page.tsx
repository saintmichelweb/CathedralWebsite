"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import GoogleMapCanvas from "@/components/GoogleMapEmbed" 

export default function ContactPage() {
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/_K4C9489.jpg?height=800&width=1200&text=Contact+Us"
            alt={t("contactUs")}
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-white mb-4 font-serif">
            {t("contactUs")}
          </h1>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[#002F6C] font-serif mb-6">
                {t("getInTouch")}
              </h2>
              <p className="text-gray-700 mb-8">{t("contactDesc")}</p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#D4AF37] mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold text-[#002F6C] mb-1">
                      {t("address")}
                    </h3>
                    <p className="text-gray-700">KN 67 St</p>
                    <p className="text-gray-700">Kigali, Rwanda</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-[#D4AF37] mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold text-[#002F6C] mb-1">
                      {t("phone")}
                    </h3>
                    <p className="text-gray-700">+250 788 300 646</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-[#D4AF37] mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold text-[#002F6C] mb-1">
                      {t("email")}
                    </h3>
                    <p className="text-gray-700">info@saintmichel.rw</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-[#D4AF37] mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold text-[#002F6C] mb-1">
                      {t("officeHours")}
                    </h3>
                    <p className="text-gray-700">
                      {t("tuesdayToSunday")}: 9:00 AM - 5:00 PM
                    </p>
                    <p className="text-gray-700">
                      {t("saturday")}: 9:00 AM - 12:00 PM
                    </p>
                    <p className="text-gray-700">
                      {t("monday")}: {t("closed")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-bold text-[#002F6C] mb-3">
                  {t("connectWithUs")}
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#002F6C] flex items-center justify-center text-white hover:bg-[#D4AF37] transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#002F6C] flex items-center justify-center text-white hover:bg-[#D4AF37] transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#002F6C] flex items-center justify-center text-white hover:bg-[#D4AF37] transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#002F6C] flex items-center justify-center text-white hover:bg-[#D4AF37] transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                    <span className="sr-only">YouTube</span>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-[#002F6C] font-serif mb-6">
                  {t("sendMessage")}
                </h2>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      {t("messageSent")}
                    </h3>
                    <p className="text-green-700">{t("messageSentDesc")}</p>
                    <Button
                      className="mt-4 bg-[#002F6C] hover:bg-[#001F4C] text-white"
                      onClick={() => setIsSubmitted(false)}
                    >
                      {t("sendAnotherMessage")}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t("fullName")} *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {t("emailAddress")} *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {t("phoneNumber")}
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t("subject")} *
                      </label>
                      <Select
                        value={formData.subject}
                        onValueChange={handleSelectChange}
                        required
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t("selectSubject")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            {t("generalInquiry")}
                          </SelectItem>
                          <SelectItem value="mass">
                            {t("massIntentions")}
                          </SelectItem>
                          <SelectItem value="sacraments">
                            {t("sacraments")}
                          </SelectItem>
                          <SelectItem value="events">
                            {t("parishEvents")}
                          </SelectItem>
                          <SelectItem value="volunteer">
                            {t("volunteering")}
                          </SelectItem>
                          <SelectItem value="other">
                            {t("other")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t("message")} *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full min-h-[150px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#D4AF37] hover:bg-[#C09C2C] text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t("sending") : t("sendMessage")}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">
              {t("findUs")}
            </h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("visitUsDesc")}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-[400px] relative">
              <GoogleMapCanvas />
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-700 mb-4">{t("mapDesc")}</p>
              <Button className="bg-[#002F6C] hover:bg-[#001F4C] text-white">
                {t("getDirections")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
