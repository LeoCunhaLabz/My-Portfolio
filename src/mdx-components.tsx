import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

// Styles for the markdown in the case studies (src/content/**/*.mdx).
// Next.js requires this file for MDX in the App Router.

const Anchor = ({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) => {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-emerald-300 underline decoration-emerald-300/40 underline-offset-4 transition-colors hover:decoration-emerald-300"
      {...props}
    >
      {children}
    </a>
  );
};

const components: MDXComponents = {
  h2: (props) => <h2 className="mt-14 scroll-mt-24 font-serif text-2xl md:text-3xl" {...props} />,
  h3: (props) => <h3 className="mt-8 text-lg font-semibold" {...props} />,
  p: (props) => <p className="mt-4 leading-relaxed text-white/70" {...props} />,
  strong: (props) => <strong className="font-semibold text-white" {...props} />,
  a: Anchor,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-white/70 marker:text-emerald-300" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed text-white/70 marker:text-emerald-300" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  blockquote: (props) => <blockquote className="mt-6 border-l-2 border-emerald-300 pl-4 text-white/80" {...props} />,
  table: (props) => (
    // On phones the table scrolls sideways; tabIndex lets keyboard users scroll it too.
    <div tabIndex={0} className="mt-6 overflow-x-auto rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props) => <th className="border-b border-white/15 py-3 pr-4 font-semibold text-white" {...props} />,
  td: (props) => <td className="border-b border-white/10 py-3 pr-4 align-top leading-relaxed text-white/70" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
