import type { Metadata } from "next";
import { Inter, Calistoga } from 'next/font/google'
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const calistoga = Calistoga({ 
  subsets: ['latin'], 
  variable: '--font-serif',
  weight: '400',
})

export const metadata: Metadata = {
  title: "Leonardo Cunha's Portfolio",
  description: "From idea to MVP: SaaS, APIs, and automations with clear scope, milestone delivery, and documented hand-off.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(
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
