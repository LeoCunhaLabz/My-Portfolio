'use client'

import Image from "next/image"
import { useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import profilePhoto from "@/assets/images/profile-photo.jpg"
import avatarImage from "@/assets/images/avatar-memoji.png"

const sizes = "(min-width: 1200px) 338px, (min-width: 768px) 112px, 88px"

// Both faces share the frame: a bordered tile on phones and tablets, a padded card on desktop.
const faceClassName =
  "absolute inset-0 overflow-hidden rounded-[22px] border border-white/15 [backface-visibility:hidden] md:rounded-3xl lg:rounded-[32px] lg:bg-gray-800 lg:p-2.5"

// The hero portrait turns into the avatar while the mouse is over it. On touch
// screens and from the keyboard, the button below toggles it instead. With reduced
// motion the faces swap without the turn.
export const ProfileFlip = ({ className }: { className?: string }) => {
  const [flipped, setFlipped] = useState(false)
  const pointerType = useRef("")

  return (
    <div className={twMerge("relative size-[88px] [perspective:1200px] md:size-28 lg:size-[360px]", className)}>
      <div
        className={twMerge(
          "relative size-full transition-transform duration-700 ease-out [transform-style:preserve-3d] motion-reduce:transition-none",
          flipped && "[transform:rotateY(180deg)]"
        )}
      >
        <div className={faceClassName}>
          <Image
            src={profilePhoto}
            alt="Portrait of Leonardo Cunha"
            preload
            sizes={sizes}
            className="size-full object-cover lg:rounded-3xl"
          />
        </div>
        <div className={twMerge(faceClassName, "[transform:rotateY(180deg)]")}>
          <div className="size-full overflow-hidden bg-[radial-gradient(circle_at_50%_40%,rgba(110,231,183,0.38),rgba(110,231,183,0.08)_55%,#111827_80%)] lg:rounded-3xl">
            <Image src={avatarImage} alt="" sizes={sizes} className="size-full" />
          </div>
        </div>
      </div>
      <button
        type="button"
        aria-label="Show my avatar"
        aria-pressed={flipped}
        onPointerDown={(event) => (pointerType.current = event.pointerType)}
        onPointerEnter={(event) => event.pointerType === "mouse" && setFlipped(true)}
        onPointerLeave={(event) => event.pointerType === "mouse" && setFlipped(false)}
        onClick={(event) => {
          // A mouse already turns it on hover; keyboard clicks have no pointer (detail 0).
          if (event.detail > 0 && pointerType.current === "mouse") return
          setFlipped((value) => !value)
        }}
        className="absolute inset-0 rounded-[22px] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 md:rounded-3xl lg:rounded-[32px]"
      />
    </div>
  )
}
