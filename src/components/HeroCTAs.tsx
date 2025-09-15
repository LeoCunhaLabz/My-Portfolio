import ArrowDown from "@/assets/icons/arrow-down.svg"
import React from "react"

// Small, focused component for the Hero call-to-action buttons.
// Uses anchor links to match the behaviour/style in Header.tsx.
export const HeroCTAs: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={className + " flex flex-col items-center gap-4 md:flex-row justify-center"}>
      <a
        href="#projects"
        aria-label="Explore my work - jump to projects"
        className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl"
      >
        <span className="font-semibold">Explore My Works</span>
        <ArrowDown className="size-4" />
      </a>

      <a
        href="#contact"
        aria-label="Let\'s connect - jump to contact"
        className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl"
      >
        <span className="">👋</span>
        <span className="font-semibold">Let&apos;s Connect</span>
      </a>
    </div>
  )
}

export default HeroCTAs
