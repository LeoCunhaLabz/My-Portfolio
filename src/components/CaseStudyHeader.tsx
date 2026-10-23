import type { Ref } from "react";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { ProjectEyebrow, StackList } from "@/components/ProjectEyebrow";
import type { Project } from "@/content/projects";

// The top of a case study: name, headline, stack and links. Shared by the case
// study page and the case study modal on the home page.
export const CaseStudyHeader = ({
  project,
  className,
  titleId,
  titleRef,
}: {
  project: Project;
  className?: string;
  titleId?: string;
  titleRef?: Ref<HTMLHeadingElement>;
}) => (
  <header className={className}>
    <ProjectEyebrow project={project} />
    {/* tabIndex lets the modal move focus here when it switches to another case study. */}
    <h1
      id={titleId}
      ref={titleRef}
      tabIndex={titleRef ? -1 : undefined}
      className="mt-3 font-serif text-4xl focus:outline-none md:text-6xl"
    >
      {project.name}
    </h1>
    <p className="mt-4 text-lg leading-relaxed text-white/80 md:text-xl">{project.headline}</p>
    <div className="mt-6">
      <StackList stack={project.stack} label="Main stack" />
    </div>
    {(project.links.length > 0 || project.linksNote) && (
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 font-semibold transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <span>{link.label}</span>
            <ArrowUpRightIcon className="size-4" aria-hidden="true" />
          </a>
        ))}
        {project.linksNote && <p className="text-sm text-white/50">{project.linksNote}</p>}
      </div>
    )}
  </header>
);
