import { ArrowMarker, DiagramFigure, diagramStyles as s } from "./DiagramFigure";

const W = 340;
const H = 60;
const cx = 340;
const x0 = cx - W / 2;
const step = 96;

const stages = [
  { label: "Scenario", detail: "River, tributaries and effluents, as JSON files" },
  { label: "Water-quality model", detail: "Tributaries first, then the main river, by segment" },
  { label: "Genetic algorithm", detail: "Sets discharge points and treatment levels", main: true },
  { label: "Results", detail: "Charts, Pareto front, CSV and Excel export" },
];

// Vertical position of each stage's box.
const top = (i: number) => 16 + i * step;
const middle = (i: number) => top(i) + H / 2;

export const RiverSimulatorDiagram = () => {
  return (
    <DiagramFigure
      minWidth={560}
      caption="An optimized run simulates the river once for every candidate. Normal runs go straight from the model to the results."
    >
      <svg viewBox="0 0 680 376" className="h-auto w-full" fontSize="13" role="img" aria-label="River Effluent Simulator flow: scenario, water-quality model, genetic algorithm, results. The genetic algorithm runs the model once per candidate; normal runs skip it.">
        <ArrowMarker id="river-arrow" />
        <g className={s.connectors} strokeWidth="1.25">
          {stages.slice(0, -1).map((stage, i) => (
            <path key={stage.label} d={`M${cx} ${top(i) + H}V${top(i + 1) - 1}`} markerEnd="url(#river-arrow)" />
          ))}
          {/* Optimizer loop: every candidate goes back through the model. */}
          <path d={`M${x0 + W} ${middle(2)}H570V${middle(1)}H${x0 + W + 2}`} markerEnd="url(#river-arrow)" />
          {/* Normal runs skip the optimizer. */}
          <path d={`M${x0} ${middle(1)}H110V${middle(3)}H${x0 - 2}`} strokeDasharray="5 4" markerEnd="url(#river-arrow)" />
        </g>
        {stages.map((stage, i) => (
          <g key={stage.label}>
            <rect x={x0} y={top(i)} width={W} height={H} rx="8" className={stage.main ? s.boxMain : s.box} strokeWidth={stage.main ? 2 : 1.25} />
            <text x={cx} y={top(i) + 25} textAnchor="middle" className={s.label}>{stage.label}</text>
            <text x={cx} y={top(i) + 44} textAnchor="middle" fontSize="11.5" className={s.detail}>{stage.detail}</text>
          </g>
        ))}
        <g fontSize="11.5" className={s.quiet}>
          <text x="580" y={middle(1) + 42}>every candidate</text>
          <text x="580" y={middle(1) + 58}>is one full run</text>
          <text x="100" y={middle(2) - 8} textAnchor="end">normal runs</text>
          <text x="100" y={middle(2) + 8} textAnchor="end">skip the optimizer</text>
        </g>
      </svg>
    </DiagramFigure>
  );
};
