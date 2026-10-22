"use client"

import { useEffect } from "react"
import { pageview } from "@vercel/analytics"
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next"
import { resumeHref } from "@/content/resume"

// Vercel Web Analytics with the two additions agreed in #7. The Hobby plan has no custom events,
// so both work with plain page views.

// Browsers carrying this flag send nothing, so the owner's own visits stay out of the numbers
// (the opt-out from the Vercel docs). Opening any page with ?notrack=1 sets it and ?notrack=0 removes it.
const OPT_OUT_KEY = "va-disable"

// The switch is read here, right before an event is sent, so the visit that sets it is already skipped.
const beforeSend = (event: BeforeSendEvent) => {
  try {
    const optOut = new URLSearchParams(window.location.search).get("notrack")
    if (optOut === "1") localStorage.setItem(OPT_OUT_KEY, "1")
    if (optOut === "0") localStorage.removeItem(OPT_OUT_KEY)
    if (localStorage.getItem(OPT_OUT_KEY)) return null
  } catch {
    // Storage blocked (some private modes): count the visit as usual.
  }
  return event
}

// The CV is a static PDF, which the analytics script never sees. Each click on a link to it
// counts as a visit to /resume instead, wherever the link is on the site.
const RESUME_PATH = "/resume"

export const SiteAnalytics = () => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Primary clicks (mouse, touch, Enter key) and middle clicks, which open a new tab
      if (event.type === "auxclick" && event.button !== 1) return
      const link = event.target instanceof Element ? event.target.closest("a") : null
      if (link?.origin === window.location.origin && link.pathname === resumeHref) {
        pageview({ route: RESUME_PATH, path: RESUME_PATH })
      }
    }
    document.addEventListener("click", onClick)
    document.addEventListener("auxclick", onClick)
    return () => {
      document.removeEventListener("click", onClick)
      document.removeEventListener("auxclick", onClick)
    }
  }, [])

  return <Analytics beforeSend={beforeSend} />
}

export default SiteAnalytics
