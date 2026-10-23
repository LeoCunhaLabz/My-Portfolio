import { Fragment, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

// The About card sentence as a small diagram: user need -> API -> interface.
// It repeats the sentence above it, so screen readers skip it. A dot runs along
// each arrow in turn; with reduced motion the arrows stay still.

const Icon = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5 lg:size-6">
    {children}
  </svg>
);

const steps = [
  {
    label: "User need",
    icon: (
      <Icon>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" />
      </Icon>
    ),
  },
  {
    label: "API",
    icon: (
      <Icon>
        <path d="M8 4c-2 0-3 1-3 3v2c0 1.6-.9 3-2 3 1.1 0 2 1.4 2 3v2c0 2 1 3 3 3" />
        <path d="M16 4c2 0 3 1 3 3v2c0 1.6.9 3 2 3-1.1 0-2 1.4-2 3v2c0 2-1 3-3 3" />
      </Icon>
    ),
  },
  {
    label: "Interface",
    icon: (
      <Icon>
        <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
        <path d="M3 9h18" />
        <path d="M7 13h6M7 16h4" />
      </Icon>
    ),
  },
];

// The dot animation lasts 3.6s and moves during its first half, so the second
// arrow starts when the first one ends.
const arrowDelays = ["0s", "1.8s"];

const Arrow = ({ delay }: { delay: string }) => (
  <div className="relative mx-2 mt-[22px] h-px flex-1 lg:mx-3 lg:mt-[28px] bg-gradient-to-r from-emerald-300/50 to-sky-400/50">
    <svg viewBox="0 0 6 10" fill="none" stroke="currentColor" strokeWidth="1.4" className="absolute -right-px top-1/2 h-2.5 w-1.5 -translate-y-1/2 text-sky-400/70">
      <path d="M1 1l4 4-4 4" />
    </svg>
    <span className="absolute inset-0 animate-flow-dot opacity-0 motion-reduce:hidden" style={{ animationDelay: delay }}>
      <span className="absolute left-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-emerald-200 shadow-[0_0_8px_2px] shadow-emerald-300/60"></span>
    </span>
  </div>
);

export const ProductFlow = ({ className }: { className?: string }) => {
  return (
    <div aria-hidden="true" className={twMerge("flex items-start", className)}>
      {steps.map((step, idx) => (
        <Fragment key={step.label}>
          {idx > 0 && <Arrow delay={arrowDelays[idx - 1]} />}
          <div className="flex flex-none flex-col items-center gap-2 lg:gap-3">
            <span
              className={twMerge(
                "grid size-11 place-items-center lg:size-14 rounded-full border border-white/15 bg-gray-900/40 text-emerald-300",
                idx === 0 && "border-emerald-300/60 bg-emerald-300/10 shadow-[0_0_24px] shadow-emerald-300/20"
              )}
            >
              {step.icon}
            </span>
            <span className="text-xs font-medium text-white/70 md:text-sm lg:text-base">{step.label}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
};
