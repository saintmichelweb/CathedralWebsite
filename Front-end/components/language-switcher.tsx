"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageSwitcher({ variant = "default" }: { variant?: "default" | "mobile" | "footer" }) {
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "rw", name: "Kinyarwanda" },
  ]

  if (variant === "mobile") {
    return (
      <div className="flex items-center space-x-4 mb-4">
        <Globe className="h-5 w-5 text-white" />
        <div className="flex space-x-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`text-sm ${lang.code === language ? "font-medium text-[#D4AF37]" : "text-white/80"}`}
              onClick={() => setLanguage(lang.code as "en" | "fr" | "rw")}
            >
              {lang.code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (variant === "footer") {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-white/60 text-sm">{t("language")}:</span>
        <div className="flex space-x-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`text-sm ${
                lang.code === language ? "text-[#D4AF37] font-medium" : "text-white/60 hover:text-[#D4AF37]"
              }`}
              onClick={() => setLanguage(lang.code as "en" | "fr" | "rw")}
            >
              {lang.code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-1 text-[#002F6C] hover:text-[#D4AF37] hover:bg-gray-100"
        >
          <Globe className="h-4 w-4" />
          <span>{language.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border-[#002F6C]/10">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as "en" | "fr" | "rw")}
            className={`text-[#002F6C] hover:text-[#D4AF37] hover:bg-gray-100 ${lang.code === language ? "bg-gray-100 font-medium" : ""}`}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

