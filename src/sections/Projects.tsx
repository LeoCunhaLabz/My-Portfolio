import Link from "next/link";
import { SectionHeader } from "@/components/sectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export const ProjectsSection = () => {
  return (
    <section id="projects" className="pb-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured Projects"
          description="The problem, my part and the result of each one, with a full case study behind every card."
        />
        <ul className="mt-10 flex flex-col gap-8 md:mt-16">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded font-semibold text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <span>All case studies</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
