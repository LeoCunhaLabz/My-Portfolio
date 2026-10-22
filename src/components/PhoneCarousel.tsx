"use client";

import Image, { type StaticImageData } from "next/image";
import { type FocusEvent, useEffect, useState, useSyncExternalStore } from "react";
import { twMerge } from "tailwind-merge";

// Screens of a mobile app inside a phone frame, fading from one to the next.
// It stops while the pointer or keyboard focus is on it and has a pause button.
// With reduced motion it starts paused; the dots still switch screens.

type Screen = { src: StaticImageData; alt: string };

const INTERVAL_MS = 4000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const subscribeToReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

export const PhoneCarousel = ({ screens, label }: { screens: Screen[]; label: string }) => {
  const [active, setActive] = useState(0);
  // null until the visitor presses play or pause; until then reduced motion decides.
  const [playChoice, setPlayChoice] = useState<boolean | null>(null);
  const [held, setHeld] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true
  );

  const autoplay = playChoice ?? !reducedMotion;
  const running = autoplay && !held && screens.length > 1;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % screens.length), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [running, screens.length]);

  const release = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false);
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      className="flex flex-col items-center gap-4"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={release}
    >
      <div className="w-[200px] rounded-[2.5rem] border border-white/15 bg-[#121515] p-2.5 shadow-2xl shadow-black/40 md:w-[240px] lg:w-[260px]">
        <div className="relative aspect-[390/844] overflow-hidden rounded-[2rem] bg-[#0c0b0a]">
          {screens.map((screen, index) => (
            <Image
              key={screen.src.src}
              src={screen.src}
              alt={screen.alt}
              aria-hidden={index !== active}
              sizes="(min-width: 1200px) 240px, (min-width: 768px) 220px, 180px"
              className={twMerge(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none",
                index === active ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1">
        {screens.map((screen, index) => (
          <button
            key={screen.src.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Screen ${index + 1} of ${screens.length}`}
            aria-current={index === active ? "true" : undefined}
            className="grid size-6 place-items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <span
              className={twMerge(
                "size-2 rounded-full bg-white/30 transition-colors",
                index === active && "bg-emerald-300"
              )}
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPlayChoice(!autoplay)}
          aria-label={autoplay ? "Pause the slideshow" : "Play the slideshow"}
          className="ml-2 grid size-6 place-items-center rounded-full text-white/60 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          {autoplay ? (
            <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden="true">
              <rect x="3" y="2" width="3.5" height="12" rx="1" />
              <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden="true">
              <path d="M4 2.5v11a1 1 0 0 0 1.5.86l9-5.5a1 1 0 0 0 0-1.72l-9-5.5A1 1 0 0 0 4 2.5Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
