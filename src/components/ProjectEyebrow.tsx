import type { Project } from "@/content/projects";

// The small line above a project's title: name (optional), kind, period and status.
export const ProjectEyebrow = ({ project, showName = false }: { project: Project; showName?: boolean }) => {
  const items = [showName ? project.name : null, project.kind, project.period, project.status].filter(
    (item): item is string => Boolean(item)
  );

  return (
    <p className="flex flex-wrap gap-x-2 text-sm font-bold uppercase tracking-widest text-emerald-300">
      {items.map((item, index) => (
        <span key={item} className="inline-flex gap-2">
          <span>{item}</span>
          {index < items.length - 1 && <span aria-hidden="true">&bull;</span>}
        </span>
      ))}
    </p>
  );
};

export const StackList = ({ stack, label }: { stack: string[]; label: string }) => (
  <ul aria-label={label} className="flex flex-wrap gap-2">
    {stack.map((item) => (
      <li key={item} className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/70">
        {item}
      </li>
    ))}
  </ul>
);
