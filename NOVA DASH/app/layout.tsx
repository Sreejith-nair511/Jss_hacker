import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { StartupAnimation } from "@/components/startup-animation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nova Dash | Learn Procedural Universe Simulation",
  description: "Learn AI-Driven Procedural Universe Simulation in Python",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <StartupAnimation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'