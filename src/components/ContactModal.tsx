
"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  open: boolean
  onClose: () => void
}

export default function ContactModal({ open, onClose }: Props) {
  const [visible, setVisible] = useState(open)
  const [closing, setClosing] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)
  const ANIM_MS = 220

  // sync visible state with prop to allow exit animation
  useEffect(() => {
    if (open) {
      setVisible(true)
      setClosing(false)
    } else if (visible) {
      // start closing animation
      setClosing(true)
      const t = setTimeout(() => {
        setVisible(false)
        setClosing(false)
      }, ANIM_MS)
      return () => clearTimeout(t)
    }
  }, [open, visible])

  // focus management and ESC handling
  useEffect(() => {
    if (!visible) return

    const prevActive = document.activeElement as HTMLElement | null
    // focus first actionable link
    setTimeout(() => firstLinkRef.current?.focus(), 50)

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      prevActive?.focus()
    }
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-50 flex items-center justify-center px-4`}
    >
      {/* overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${closing ? "opacity-0" : "opacity-100"}`}
        onClick={onClose}
      />

      {/* modal panel */}
      <div
        className={`relative w-full max-w-lg bg-white text-gray-900 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-200 ${closing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">How would you like to contact me?</h3>
              <p className="text-sm mt-1 text-gray-600">Choose one of the options — they&apos;ll open in a new tab.</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="ml-auto text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              ×
            </button>
          </div>

          {/* options: row on md+, column on small */}
          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-stretch md:justify-between">
            <a
              ref={firstLinkRef}
              href="https://wa.me/0000000000"
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center gap-3 justify-center px-4 py-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 md:flex-col md:gap-2 md:py-6"
            >
              {/* WhatsApp SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-700 w-5 h-5 md:w-12 md:h-12">
                <path d="M21 15a4 4 0 0 1-4 4h-1l-3 1 1-3v-1a4 4 0 0 1 4-4h3z"/>
                <path d="M3 21l1-4a9 9 0 1 1 4 4l-4 1z"/>
              </svg>
              <span className="font-medium">WhatsApp</span>
            </a>

            <a
              href="mailto:your.email@example.com"
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center gap-3 justify-center px-4 py-4 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 md:flex-col md:gap-2 md:py-6"
            >
              {/* Email SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-sky-700 w-5 h-5 md:w-12 md:h-12">
                <path d="M4 4h16v16H4z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span className="font-medium">Email</span>
            </a>

            <a
              href="https://www.linkedin.com/in/your-profile"
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center gap-3 justify-center px-4 py-4 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 md:flex-col md:gap-2 md:py-6"
            >
              {/* LinkedIn SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 w-5 h-5 md:w-12 md:h-12">
                <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
                <path d="M16 11.5a2 2 0 0 1 4 0v6h-4v-6zM6 9h4v9H6zM8 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
              </svg>
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
