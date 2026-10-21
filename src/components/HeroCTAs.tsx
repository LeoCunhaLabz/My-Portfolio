import ArrowDown from "@/assets/icons/arrow-down.svg"
import React from "react"

// Small, focused component for the Hero call-to-action buttons.
// The "View résumé" button joins here once the public CV is ready (#8).
export const HeroCTAs: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={className + " flex flex-col gap-3 md:flex-row"}>
      <a
        href="#projects"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-gray-900 transition-colors hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
      >
        <span>View selected work</span>
        <ArrowDown className="size-4" aria-hidden="true" />
      </a>
    </div>
  )
}

export default HeroCTAs
