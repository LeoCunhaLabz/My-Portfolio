
"use client"

import { useEffect, useId, useRef, useState } from "react"
import WhatsAppSvg from '@/assets/icons/whatsapp.svg'
import EmailSvg from '@/assets/icons/email.svg'
import LinkedinSvg from '@/assets/icons/linkedin.svg'

type Props = {
  open: boolean
  onClose: () => void
}

export default function ContactModal({ open, onClose }: Props) {
  const [visible, setVisible] = useState(open)
  const [closing, setClosing] = useState(false)
  const [prevOpen, setPrevOpen] = useState(open)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const titleId = useId()
  const ANIM_MS = 220

  // Sync with the `open` prop during render instead of in an effect
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setVisible(true)
      setClosing(false)
    } else if (visible) {
      setClosing(true)
    }
  }

  // Unmount once the closing animation has finished
  useEffect(() => {
    if (!closing) return
    const t = setTimeout(() => {
      setVisible(false)
      setClosing(false)
    }, ANIM_MS)
    return () => clearTimeout(t)
  }, [closing])

  useEffect(() => {
    if (!visible) return

    const prevActive = document.activeElement as HTMLElement | null
    setTimeout(() => firstLinkRef.current?.focus(), 50)

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key !== "Tab" || !panelRef.current) return

      // Keep Tab and Shift+Tab inside the dialog: from the last control back to
      // the first one, and the other way round.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button")
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const inside = panelRef.current.contains(document.activeElement)
      if (e.shiftKey && (document.activeElement === first || !inside)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
        e.preventDefault()
        first.focus()
      }
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
      aria-labelledby={titleId}
      className={`fixed inset-0 z-50 flex items-center justify-center px-4`}
    >
      {/* overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${closing ? "opacity-0" : "opacity-100"}`}
        onClick={onClose}
      />

      {/* modal panel */}
      <div
        ref={panelRef}
        className={`relative w-full max-w-lg bg-white text-gray-900 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-200 ${closing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="text-lg font-semibold">How would you like to contact me?</h2>
              <p className="text-sm mt-1 text-gray-600">Choose one of the options — they&apos;ll open in a new tab.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="ml-auto rounded text-gray-500 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            >
              ×
            </button>
          </div>

          {/* options: row on md+, column on small */}
          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-stretch md:justify-between">
            <a
              ref={firstLinkRef}
              href="https://wa.me/5511972181112"
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center gap-3 justify-center px-4 py-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 md:flex-col md:gap-2 md:py-6"
            >
              <WhatsAppSvg className="text-emerald-700 w-5 h-5 md:w-12 md:h-12" aria-hidden="true" />
              <span className="font-medium">WhatsApp</span>
            </a>

            <a
              href="mailto:dev@leonardo-cunha.com"
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center gap-3 justify-center px-4 py-4 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 md:flex-col md:gap-2 md:py-6"
            >
              <EmailSvg className="text-emerald-700 w-5 h-5 md:w-12 md:h-12" aria-hidden="true" />
              <span className="font-medium">Email</span>
            </a>

            <a
              href="https://www.linkedin.com/in/leonardovcunha"
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center gap-3 justify-center px-4 py-4 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 md:flex-col md:gap-2 md:py-6"
            >
              <LinkedinSvg className="text-emerald-700 w-5 h-5 md:w-12 md:h-12" aria-hidden="true" />
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
