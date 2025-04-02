"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DonateModal } from "@/components/donate-modal"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/i18n/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Logo } from "@/components/logo"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  const mainNav = [
    { name: t("home"), href: "/" },
    {
      name: t("about"),
      href: "/about",
      children: [
        { name: "Overview", href: "/about" },
        { name: "Our Chorals", href: "/about/our-chorals" },
        { name: "Catholic Actions", href: "/about/catholic-actions" },
        { name: "Community", href: "/about/community" },
        { name: "Parish Council", href: "/about/parish-committee" },
      ],
    },
    {
      name: t("services"),
      href: "/services",
      children: [
        { name: t("services"), href: "/services" },
        { name: t("massSchedule"), href: "/services/mass-schedule" },
        { name: t("sacraments"), href: "/services/sacraments" },
        { name: t("ministries"), href: "/services/ministries" },
      ],
    },
    { name: t("announcements"), href: "/announcements" },
    { name: t("contact"), href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
            <span className="font-serif font-bold text-xl text-[#002F6C]">Saint Michel Cathedral</span>
          </Link>
        </div>

        <div className="hidden md:flex md:flex-1 md:justify-center">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {mainNav.map((item) =>
              item.children ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-1 text-[#002F6C] hover:text-[#D4AF37]">
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="bg-white border-[#002F6C]/10">
                    {item.children.map((child) => (
                      <DropdownMenuItem
                        key={child.name}
                        asChild
                        className="text-[#002F6C] hover:text-[#D4AF37] hover:bg-gray-100 focus:bg-gray-100 focus:text-[#D4AF37]"
                      >
                        <Link href={child.href} className="w-full cursor-pointer">
                          {child.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-[#002F6C] hover:text-[#D4AF37] transition-colors",
                    pathname === item.href && "text-[#D4AF37] font-semibold",
                  )}
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-4 md:justify-end">
          <LanguageSwitcher />
          <DonateModal />
        </div>

        <div className="flex md:hidden ml-auto">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#002F6C]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/50">
            <div className="fixed inset-0 flex">
              <div className="relative flex w-full max-w-sm flex-1 flex-col bg-[#002F6C] text-white">
                <div className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-white/10">
                  <Link href="/" className="font-serif font-bold text-xl text-white">
                    Saint Michel Cathedral
                  </Link>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-6 flow-root">
                  <div className="divide-y divide-white/10">
                    <div className="space-y-2 py-6 px-6">
                      {mainNav.map((item) => (
                        <div key={item.name}>
                          {item.children ? (
                            <div className="space-y-2">
                              <div className="font-medium text-white">{item.name}</div>
                              <div className="pl-4 space-y-2 border-l-2 border-white/20">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.name}
                                    href={child.href}
                                    className="block text-white/80 hover:text-[#D4AF37]"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              className={cn(
                                "block font-medium text-white hover:text-[#D4AF37]",
                                pathname === item.href && "text-[#D4AF37]",
                              )}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="py-6 px-6">
                      <LanguageSwitcher variant="mobile" />

                      <DonateModal
                        trigger={
                          <Button className="w-full bg-[#D4AF37] hover:bg-[#C09C2C] text-white">{t("donate")}</Button>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

