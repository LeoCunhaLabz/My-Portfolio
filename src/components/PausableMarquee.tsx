"use client";

import { type ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

// A row that scrolls sideways on a loop. It stops under the pointer and has a
// pause button, so touch and keyboard users can stop it too (WCAG 2.2.2).
// With reduced motion it doesn't move: the items wrap into rows and the button
// is hidden. The copy that closes the loop is the caller's to hide (aria-hidden
// and motion-reduce:hidden), since only the caller knows which items repeat.

export const PausableMarquee = ({
  children,
  label,
  className,
}: {
  children: ReactNode;
  // What scrolls, for the button: "Pause the testimonials".
  label: string;
  className?: string;
}) => {
  const [paused, setPaused] = useState(false);

  return (
    <div className={className}>
      <div className="-my-4 flex overflow-x-clip py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] motion-reduce:[mask-image:none]">
        <div
          className={twMerge(
            "flex flex-none animate-move-left gap-8 pr-8 [animation-duration:60s] hover:[animation-play-state:paused]",
            paused && "[animation-play-state:paused]",
            "motion-reduce:flex-1 motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0"
          )}
        >
          {children}
        </div>
      </div>

      <div className="mt-8 flex justify-center motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? `Play the ${label}` : `Pause the ${label}`}
          className="grid size-6 place-items-center rounded-full text-white/60 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          {paused ? (
            <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden="true">
              <path d="M4 2.5v11a1 1 0 0 0 1.5.86l9-5.5a1 1 0 0 0 0-1.72l-9-5.5A1 1 0 0 0 4 2.5Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden="true">
              <rect x="3" y="2" width="3.5" height="12" rx="1" />
              <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
