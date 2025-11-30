import type React from "react"
import type { Metadata } from "next"
import { Dancing_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CartProvider } from "@/components/cart-provider"
import { Navigation } from "@/components/navigation"

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "MASTER DOUGHNUT - 精緻甜點客製化訂購",
  description: "高質感甜點品牌，提供客製化訂購服務",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW">
      <body className={`font-sans antialiased ${dancingScript.variable}`}>
        <CartProvider>
          <Navigation />
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
