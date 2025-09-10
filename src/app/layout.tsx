// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Calistoga } from 'next/font/google'
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const calistoga = Calistoga({ subsets: ['latin'], variable: '--font-serif', weight: '400' })

export const metadata: Metadata = {
  // Define sua base para resolver URLs relativas das metas
  metadataBase: new URL("https://www.leonardo-cunha.com"),
  title: "Leonardo Cunha's Portfolio",
  description:
    "From idea to MVP: SaaS, APIs, and automations with clear scope, milestone delivery, and documented hand-off.",

  openGraph: {
    title: "Leonardo Cunha Portfolio - Full-Stack Dev",
    description: "From idea to MVP: SaaS, APIs, and automations with clear scope, milestone delivery, and documented hand-off.",
    url: "/",
    siteName: "Leonardo Cunha",
    images: [
      {
        url: "https://www.leonardo-cunha.com/portfolio-og.png",
        width: 1812,
        height: 996,
        alt: "Portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.variable,
          calistoga.variable,
          "bg-gray-900 text-white antialiased font-sans"
        )}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
