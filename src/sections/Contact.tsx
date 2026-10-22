"use client"

import { useState } from "react"
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg"
import grainImage from "@/assets/images/grain.jpg"
import ContactModal from "@/components/ContactModal"
import { resumeHref } from "@/content/resume"

export const ContactSection = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div id="contact" className="py-16 pt-12 lg:py-24 lg:pt-20 z-20">
      <div className="container">
        <div className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 py-8 px-10 rounded-3xl text-center relative overflow-hidden z-0 md:text-left">
          <div 
            className="absolute inset-0 opacity-5 -z-10" 
            style={{
              backgroundImage: `url(${grainImage.src})`
            }}></div>

            <div className="flex flex-col gap-8 items-center md:flex-row md:gap-16">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl">Let&apos;s connect.</h2>
                <p className="text-sm mt-2 md:text-base">
                  If you&apos;re hiring a software engineer with experience in SaaS, integrations, and AI-powered workflows, I&apos;d be glad to learn about your team.
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="text-white bg-gray-900 inline-flex items-center justify-center px-6 h-12 rounded-xl gap-2 w-full border border-gray-900 cursor-pointer z-10"
                  aria-haspopup="dialog"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold">Contact Me</span>
                  <ArrowUpRightIcon className="size-4"/>
                </button>
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 inline-flex items-center justify-center px-6 h-12 rounded-xl gap-2 w-full border border-gray-900 transition-colors hover:bg-gray-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                >
                  <span className="font-semibold">View résumé</span>
                  <span className="sr-only">(PDF, opens in a new tab)</span>
                  <ArrowUpRightIcon className="size-4" aria-hidden="true"/>
                </a>
              </div>
            </div>
        </div>
      </div>

      <ContactModal open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}
