import { ArrowMarker, DiagramFigure, diagramStyles as s } from "./DiagramFigure";

const Box = ({ x, y, w, h, main = false }: { x: number; y: number; w: number; h: number; main?: boolean }) => (
  <rect x={x} y={y} width={w} height={h} rx="8" className={main ? s.boxMain : s.box} strokeWidth={main ? 2 : 1.25} />
);

export const OnyxArchitectureDiagram = () => {
  return (
    <DiagramFigure
      minWidth={640}
      caption="The app saves on the device first, and the API reconciles devices. The landing site and the app share the same formulas, so a result on the public calculator matches the app."
    >
      <svg viewBox="0 0 760 252" className="h-auto w-full" fontSize="13" role="img" aria-label="ONYX architecture: an Astro landing site and a React PWA share TypeScript code; the PWA syncs with a Fastify API backed by PostgreSQL.">
        <ArrowMarker id="onyx-arrow" />
        <g className={s.connectors} strokeWidth="1.25">
          <path d="M220 60H286" markerEnd="url(#onyx-arrow)" />
          <path d="M474 60H538" markerStart="url(#onyx-arrow)" markerEnd="url(#onyx-arrow)" />
          <path d="M128 156V106" markerEnd="url(#onyx-arrow)" />
          <path d="M380 156V106" markerEnd="url(#onyx-arrow)" />
          <path d="M472 192H506V84H538" markerEnd="url(#onyx-arrow)" />
          <path d="M632 104V154" markerEnd="url(#onyx-arrow)" />
        </g>

        <Box x={36} y={16} w={184} h={88} />
        <text x="128" y="40" textAnchor="middle" className={s.label}>Landing (Astro)</text>
        <text x="128" y="56" textAnchor="middle" fontSize="11.5" className={s.quiet}>onyxtreino.com.br</text>
        <text x="128" y="72" textAnchor="middle" fontSize="11.5" className={s.detail}>Free calculators,</text>
        <text x="128" y="88" textAnchor="middle" fontSize="11.5" className={s.detail}>no account needed</text>

        <Box x={288} y={16} w={184} h={88} main />
        <text x="380" y="40" textAnchor="middle" className={s.label}>App (React PWA)</text>
        <text x="380" y="56" textAnchor="middle" fontSize="11.5" className={s.quiet}>app.onyxtreino.com.br</text>
        <text x="380" y="72" textAnchor="middle" fontSize="11.5" className={s.detail}>Saves to localStorage</text>
        <text x="380" y="88" textAnchor="middle" fontSize="11.5" className={s.detail}>first, works offline</text>

        <Box x={540} y={16} w={184} h={88} />
        <text x="632" y="40" textAnchor="middle" className={s.label}>API (Fastify)</text>
        <text x="632" y="56" textAnchor="middle" fontSize="11.5" className={s.detail}>JWT and Google sign-in</text>
        <text x="632" y="72" textAnchor="middle" fontSize="11.5" className={s.detail}>Sync: last-write-wins</text>
        <text x="632" y="88" textAnchor="middle" fontSize="11.5" className={s.detail}>Zod-validated contracts</text>

        <Box x={36} y={156} w={436} h={72} />
        <text x="254" y="180" textAnchor="middle" className={s.label}>Shared TypeScript code</text>
        <text x="254" y="196" textAnchor="middle" fontSize="11.5" className={s.detail}>Domain types and pure formulas: e1RM, DOTS, Wilks, IPF GL</text>
        <text x="254" y="212" textAnchor="middle" fontSize="11.5" className={s.detail}>Percentile table precomputed from OpenPowerlifting data</text>

        <Box x={540} y={156} w={184} h={72} />
        <text x="632" y="180" textAnchor="middle" className={s.label}>PostgreSQL 16</text>
        <text x="632" y="196" textAnchor="middle" fontSize="11.5" className={s.detail}>Drizzle ORM migrations</text>
        <text x="632" y="212" textAnchor="middle" fontSize="11.5" className={s.detail}>Soft deletes, tombstones</text>

        <text x="254" y="50" textAnchor="middle" fontSize="11.5" className={s.quiet}>sign-up</text>
        <text x="506" y="50" textAnchor="middle" fontSize="11.5" className={s.quiet}>sync</text>
        <text x="514" y="140" fontSize="11.5" className={s.quiet}>shared types</text>
      </svg>
    </DiagramFigure>
  );
};
