import { ArrowMarker, DiagramFigure, diagramStyles as s } from "./DiagramFigure";

const W = 360;
const H = 56;
const cx = 200;
const x0 = cx - W / 2;
const step = 80;

const stages = [
  { label: "Keywords", detail: "Main keyword first, then secondary keywords" },
  { label: "Outline", detail: "Titles, subtitles and sections" },
  { label: "Writing", detail: "Introduction first, then body and conclusion" },
  { label: "Reviewer agent", detail: "Checks coherence and reading level", main: true },
  { label: "Publishing", detail: "Sent to the customer's WordPress site" },
];

export const AirticlesPipelineDiagram = () => {
  return (
    <DiagramFigure
      maxWidth={480}
      caption="Each article is written in stages and reviewed before it goes out. Each stage builds on the one before it, and a reviewer agent checks the whole article before it reaches the customer's site."
    >
      <svg viewBox="0 0 400 408" className="h-auto w-full" fontSize="13" role="img" aria-label="AIrticles generation pipeline: keywords, outline, writing, reviewer agent, publishing.">
        <ArrowMarker id="airticles-arrow" />
        <g className={s.connectors} strokeWidth="1.25">
          {stages.slice(0, -1).map((stage, i) => {
            const y = 16 + i * step;
            return <path key={stage.label} d={`M${cx} ${y + H}V${y + step - 1}`} markerEnd="url(#airticles-arrow)" />;
          })}
        </g>
        {stages.map((stage, i) => {
          const y = 16 + i * step;
          return (
            <g key={stage.label}>
              <rect x={x0} y={y} width={W} height={H} rx="8" className={stage.main ? s.boxMain : s.box} strokeWidth={stage.main ? 2 : 1.25} />
              <text x={cx} y={y + 24} textAnchor="middle" className={s.label}>{stage.label}</text>
              <text x={cx} y={y + 42} textAnchor="middle" fontSize="11.5" className={s.detail}>{stage.detail}</text>
            </g>
          );
        })}
      </svg>
    </DiagramFigure>
  );
};
