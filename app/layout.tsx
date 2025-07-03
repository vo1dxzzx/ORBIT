import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ORBIT",
  description:
    "The ultimate Valorant community dedicated to perfecting Neon movement, advanced techniques, and lightning-fast gameplay.",
  icons: {
    icon: "https://i.imgur.com/gl3A7h3.png", // <-- Paste your direct Imgur link here
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}