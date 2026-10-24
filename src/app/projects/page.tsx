import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";
import { defaultSocialImage } from "@/content/site";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";

const description =
  "Case studies of three projects: the problem, what I built, the decisions behind it and what I learned.";

export const metadata: Metadata = {
  title: "Projects · Leonardo Cunha",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects · Leonardo Cunha",
    description,
    url: "/projects",
    siteName: "Leonardo Cunha",
    images: [defaultSocialImage],
    locale: "en_US",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <div>
      <Header page="projects" />
      <main id="main" className="pb-24 pt-32 md:pt-40">
        <div className="container">
          <div className="text-center">
            <p className="font-semibold uppercase tracking-widest text-emerald-300">
              Case studies
            </p>
            <h1 className="mt-6 font-serif text-3xl md:text-5xl">Projects</h1>
            <p className="mx-auto mt-4 max-w-md text-white/60 md:text-lg">{description}</p>
          </div>

          <ul className="mt-12 flex flex-col gap-8 md:mt-16">
            {projects.map((project, index) => (
              <li key={project.slug}>
                <ProjectCard project={project} headingLevel="h2" imagePriority={index === 0} />
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
