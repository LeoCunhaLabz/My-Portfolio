import { ReactNode } from "react";

// Frame and caption for the case study diagrams. Wide diagrams keep a minimum
// width and scroll sideways on phones, so their labels stay readable; narrow
// ones get a maximum width, so their text doesn't grow on large screens.
export const DiagramFigure = ({
  caption,
  minWidth,
  maxWidth,
  children,
}: {
  caption: string;
  minWidth?: number;
  maxWidth?: number;
  children: ReactNode;
}) => {
  return (
    <figure className="my-10">
      <div
        className="overflow-x-auto rounded-2xl border border-white/10 bg-gray-800/60 p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 md:p-6"
        {...(minWidth ? { tabIndex: 0, role: "region", "aria-label": caption } : {})}
      >
        <div className="mx-auto" style={{ minWidth, maxWidth }}>
          {children}
        </div>
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-white/60">{caption}</figcaption>
    </figure>
  );
};

// Shared drawing pieces, so the three diagrams look like one set.
export const diagramStyles = {
  box: "fill-none stroke-white/25",
  boxMain: "fill-emerald-300/10 stroke-emerald-300",
  label: "fill-white font-semibold",
  detail: "fill-white/70",
  quiet: "fill-white/50",
  connectors: "fill-none stroke-white/40",
  arrowHead: "fill-white/40",
};

export const ArrowMarker = ({ id }: { id: string }) => (
  <defs>
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" className={diagramStyles.arrowHead} />
    </marker>
  </defs>
);
