"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DonateModal } from "@/components/donate-modal"
import { useLanguage } from "@/lib/i18n/language-context"

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useLanguage()

  const slides = [
    {
      image: "/_K4C9590.jpg?height=600&width=1200&text=Welcome",
      title: t("welcomeTitle"),
      description: t("welcomeDesc"),
      buttonText: t("donate"),
      buttonLink: "#",
    },
    {
      image: "/_K4C9553.jpg?height=600&width=1200&text=Join+Us",
      title: t("joinMassTitle"),
      description: t("joinMassDesc"),
      buttonText: t("massSchedule"),
      buttonLink: "/services",
    },
    {
      image: "/_K4C9562.jpg?height=600&width=1200&text=Community",
      title: t("communityTitle"),
      description: t("communityDesc"),
      buttonText: t("getInvolved"),
      buttonLink: "/about/community",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full h-[600px]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover brightness-[0.7]"
              priority={index === 0}
            />
          </div>
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center px-4 sm:px-6 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif">{slide.title}</h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{slide.description}</p>
              {index === 0 ? (
                <DonateModal
                  trigger={
                    <Button className="bg-[#D4AF37] hover:bg-[#C09C2C] text-white text-lg px-8 py-6">
                      {slide.buttonText}
                    </Button>
                  }
                />
              ) : (
                <Button className="bg-[#D4AF37] hover:bg-[#C09C2C] text-white text-lg px-8 py-6" asChild>
                  <a href={slide.buttonLink}>{slide.buttonText}</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-[#D4AF37]" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

