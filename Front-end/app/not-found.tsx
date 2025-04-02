"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="relative w-64 h-64 mb-8">
          <Image src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg" alt="404" fill className="object-contain" />
        </div>
        <h1 className="text-4xl font-bold text-[#002F6C] font-serif mb-4 text-center">{t("pageNotFound")}</h1>
        <p className="text-gray-600 mb-8 text-center max-w-md">{t("pageNotFoundDesc")}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-[#002F6C] hover:bg-[#001F4C] text-white">
            <Link href="/">{t("backToHome")}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#002F6C] text-[#002F6C] hover:bg-[#002F6C] hover:text-white"
          >
            <Link href="/contact">{t("contactUs")}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

