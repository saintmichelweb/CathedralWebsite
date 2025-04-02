import type React from "react"
import "@/app/globals.css"
import { Inter, Merriweather, Open_Sans, Poppins } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n/language-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-serif",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
})

export const metadata = {
  title: "Saint Michel Parish",
  description: "A place of worship, community, and spiritual growth",
    generator: 'Developed By Mugabo Andre',
    icons: {
      icon: "/icon.png",
    },
}




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="rw">
      <body className={`${inter.variable} ${merriweather.variable} ${openSans.variable} ${poppins.variable} font-body`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'