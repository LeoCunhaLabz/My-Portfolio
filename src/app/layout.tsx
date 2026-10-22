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
  title: "Leonardo Cunha — Software Engineer",
  description:
    "Software Engineer building reliable SaaS products with TypeScript, Node.js, and React: product interfaces, APIs, integrations, and AI-powered workflows.",

  openGraph: {
    title: "Leonardo Cunha — Software Engineer",
    description:
      "Software Engineer building reliable SaaS products with TypeScript, Node.js, and React: product interfaces, APIs, integrations, and AI-powered workflows.",
    url: "/",
    siteName: "Leonardo Cunha",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Leonardo Cunha, Software Engineer building reliable SaaS products.",
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
