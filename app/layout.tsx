import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Portfolio de Jean Bénisse ADJAHOTO",
  description: "Portfolio d'un étudiant en Licence 3 à IFRI, passionné de développement web",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem themes={["light", "dark", "purple", "green"]}>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
