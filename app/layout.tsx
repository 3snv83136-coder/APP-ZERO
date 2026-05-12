import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import { PwaScript } from "@/components/PwaScript"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "APP-ZERO",
  description: "Application métier — template Next.js 14",
  robots: "noindex, nofollow",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "APP-ZERO",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1e3a5f",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
        <PwaScript />
      </body>
    </html>
  )
}
