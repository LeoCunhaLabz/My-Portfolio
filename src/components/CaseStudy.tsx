import { ReactNode } from "react";

// Building blocks for the case study MDX files.

// "At a glance": a short list of label and value pairs.
export const Facts = ({ children }: { children: ReactNode }) => (
  <dl className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-gray-800/60 px-5 md:px-6">{children}</dl>
);

export const Fact = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="py-4 md:grid md:grid-cols-[120px_minmax(0,1fr)] md:gap-6">
    <dt className="text-sm font-semibold uppercase tracking-widest text-emerald-300">{label}</dt>
    <dd className="mt-1 leading-relaxed text-white/80 md:mt-0">{children}</dd>
  </div>
);

export const Quote = ({ author, role, children }: { author: string; role: string; children: ReactNode }) => (
  <figure className="mt-6 rounded-2xl border border-white/10 bg-gray-800/60 p-6">
    <blockquote className="leading-relaxed text-white/80">“{children}”</blockquote>
    <figcaption className="mt-4 text-sm">
      <span className="font-semibold text-white">{author}</span>
      <span className="text-white/60">, {role}</span>
    </figcaption>
  </figure>
);
