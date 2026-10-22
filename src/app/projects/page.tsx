import type { Metadata } from "next";
import Link from "next/link";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import { Card } from "@/components/Card";
import { ProjectEyebrow, StackList } from "@/components/ProjectEyebrow";
import { projects } from "@/content/projects";
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
    images: ["/og-image.jpg"],
    locale: "en_US",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <div>
      <Header page="projects" />
      <main className="pb-24 pt-32 md:pt-40">
        <div className="container">
          <div className="text-center">
            <p className="bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text font-semibold uppercase tracking-widest text-transparent">
              Case studies
            </p>
            <h1 className="mt-6 font-serif text-3xl md:text-5xl">Projects</h1>
            <p className="mx-auto mt-4 max-w-md text-white/60 md:text-lg">{description}</p>
          </div>

          <ul className="mx-auto mt-12 flex max-w-3xl flex-col gap-8 md:mt-16">
            {projects.map((project) => (
              <li key={project.slug}>
                <Card className="p-6 md:p-10">
                  <ProjectEyebrow project={project} showName />
                  <h2 className="mt-3 font-serif text-2xl md:text-3xl">{project.headline}</h2>
                  <p className="mt-4 leading-relaxed text-white/60">{project.oneLiner}</p>
                  <hr className="mt-6 border-t-2 border-white/5" />
                  <ul className="mt-6 flex flex-col gap-4">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2 text-sm text-white/70 md:text-base">
                        <CheckCircleIcon className="size-5 shrink-0 md:size-6" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <StackList stack={project.stack} label={`${project.name} stack`} />
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-gray-950 transition-colors hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 md:w-auto"
                  >
                    <span>
                      Read the case study<span className="sr-only">: {project.name}</span>
                    </span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
