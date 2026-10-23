"use client";

import Image, { type StaticImageData } from "next/image";
import { type FocusEvent, useEffect, useState, useSyncExternalStore } from "react";
import { twMerge } from "tailwind-merge";

// Screens of a mobile app as a stack of phones. On each turn the phone behind the
// front one swings out to the side and takes its place, and the front one goes to
// the back (styles in globals.css). It stops while the pointer or keyboard focus is
// on it and has a pause button. With reduced motion it starts paused and the dots
// switch screens without animation.

type Screen = { src: StaticImageData; alt: string };

const INTERVAL_MS = 4000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const subscribeToReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

// 0 is the front phone, 1 and 2 peek out behind it, and the rest wait hidden at the back.
const stackPosition = (offset: number) => (offset < 3 ? String(offset) : "hidden");

export const PhoneCarousel = ({ screens, label }: { screens: Screen[]; label: string }) => {
  // previous is the screen that was in front before, so only a step to the next
  // screen animates; a jump through the dots just moves the phones into place.
  const [{ active, previous }, setStack] = useState<{ active: number; previous: number | null }>({
    active: 0,
    previous: null,
  });
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

  const show = (index: number) =>
    setStack((stack) => (index === stack.active ? stack : { active: index, previous: stack.active }));

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(
      () => setStack((stack) => ({ active: (stack.active + 1) % screens.length, previous: stack.active })),
      INTERVAL_MS
    );
    return () => window.clearInterval(timer);
  }, [running, screens.length]);

  const release = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false);
  };

  const steppedForward = previous !== null && (previous + 1) % screens.length === active;

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
      {/* The phones share one grid cell; the ones behind are shifted with transforms,
          so the right padding keeps them inside the column. */}
      <div className="grid pr-16 lg:pr-20">
        {screens.map((screen, index) => {
          const offset = (index - active + screens.length) % screens.length;
          const motion = steppedForward ? (index === active ? "enter" : index === previous ? "leave" : undefined) : undefined;
          return (
            <div
              key={screen.src.src}
              aria-hidden={offset !== 0}
              data-position={stackPosition(offset)}
              data-motion={motion}
              className="phone-stack-card w-[180px] rounded-[2.25rem] border border-white/15 bg-[#121515] p-2 shadow-2xl shadow-black/50 md:w-[210px] md:rounded-[2.5rem] md:p-2.5 lg:w-[220px]"
            >
              <div className="relative aspect-[390/844] overflow-hidden rounded-[1.75rem] bg-[#0c0b0a] md:rounded-[2rem]">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  sizes="(min-width: 1200px) 200px, (min-width: 768px) 190px, 164px"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-1">
        {screens.map((screen, index) => (
          <button
            key={screen.src.src}
            type="button"
            onClick={() => show(index)}
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
