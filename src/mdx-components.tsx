import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

// Styles for the markdown in the case studies and blog posts (src/content/**/*.mdx).
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

// rehype-pretty-code (see next.config.mjs) marks code blocks with data-language;
// code without it is inline code inside a sentence.
const Code = (props: ComponentPropsWithoutRef<"code"> & { "data-language"?: string }) =>
  props["data-language"] ? (
    <code {...props} />
  ) : (
    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-white" {...props} />
  );

// A markdown image, ![alt](/blog/slug/file.png "Optional caption"). It sits inside
// a paragraph, so the wrapper and caption are spans. Without known dimensions,
// next/image picks the file size from `sizes` and the image keeps its proportions.
const MarkdownImage = ({ src, alt = "", title }: ComponentPropsWithoutRef<"img">) => {
  if (typeof src !== "string") return null;
  return (
    <span className="mt-8 block">
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="(min-width: 768px) 768px, 100vw"
        className="h-auto w-full rounded-xl border border-white/10"
      />
      {title && <span className="mt-3 block text-center text-sm text-white/50">{title}</span>}
    </span>
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
  hr: (props) => <hr className="mt-12 border-white/15" {...props} />,
  img: MarkdownImage,
  code: Code,
  // Long lines scroll sideways on phones; tabIndex lets keyboard users scroll too.
  pre: (props) => (
    <pre
      tabIndex={0}
      className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-gray-800/60 py-4 font-mono text-sm leading-relaxed focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 [&_[data-highlighted-line]]:bg-emerald-300/10 [&_[data-highlighted-line]]:shadow-[inset_2px_0_0] [&_[data-highlighted-line]]:shadow-emerald-300 [&_[data-line]]:px-4"
      {...props}
    />
  ),
  // The file name above a code block (```ts title="file.ts").
  figcaption: (props) => (
    <figcaption
      className="mt-6 rounded-t-xl border border-b-0 border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/60 [&+pre]:mt-0 [&+pre]:rounded-t-none"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
