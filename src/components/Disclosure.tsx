import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg";

// Extra detail kept one click away, on a native <details>: it works without
// JavaScript, the browser announces whether it is open, and find in page opens it.
// `context` is read only by screen readers, so each toggle has a distinct name.
export const Disclosure = ({
  showLabel,
  hideLabel,
  context,
  className,
  children,
}: {
  showLabel: string;
  hideLabel: string;
  context?: string;
  className?: string;
  children: ReactNode;
}) => (
  <details className={twMerge("group/disclosure", className)}>
    <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded font-semibold text-emerald-300 transition-colors hover:text-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 [&::-webkit-details-marker]:hidden">
      <span className="group-open/disclosure:hidden">{showLabel}</span>
      <span className="hidden group-open/disclosure:inline">{hideLabel}</span>
      {context && <span className="sr-only">: {context}</span>}
      <ChevronDownIcon
        className="size-4 shrink-0 transition-transform group-open/disclosure:rotate-180 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </summary>
    {children}
  </details>
);
