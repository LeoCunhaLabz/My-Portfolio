import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { ProjectEyebrow, StackList } from "@/components/ProjectEyebrow";
import { getProject, projects } from "@/content/projects";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";

type Props = { params: Promise<{ slug: string }> };

// Only the slugs in src/content/projects/index.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.name} case study · Leonardo Cunha`;
  const url = `/projects/${project.slug}`;
  return {
    title,
    description: project.oneLiner,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: project.oneLiner,
      url,
      siteName: "Leonardo Cunha",
      images: ["/og-image.jpg"],
      locale: "en_US",
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { default: CaseStudy } = await import(`@/content/projects/${slug}.mdx`);
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <div>
      <Header page="projects" />
      <main id="main" className="pb-24 pt-28 md:pt-36">
        <article className="container">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded text-sm font-semibold text-white/60 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <span aria-hidden="true">&larr;</span>
              <span>All projects</span>
            </Link>

            <header className="mt-8">
              <ProjectEyebrow project={project} />
              <h1 className="mt-3 font-serif text-4xl md:text-6xl">{project.name}</h1>
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

            <CaseStudy />

            <nav aria-label="More case studies" className="mt-20 border-t border-white/15 pt-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/50">Next case study</p>
              <Link
                href={`/projects/${next.slug}`}
                className="group mt-3 block rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <span className="font-serif text-2xl transition-colors group-hover:text-emerald-300 md:text-3xl">
                  {next.name} <span aria-hidden="true">&rarr;</span>
                </span>
                <span className="mt-2 block text-white/60">{next.headline}</span>
              </Link>
              <Link
                href="/projects"
                className="mt-8 inline-flex rounded text-sm font-semibold text-white/60 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                All projects
              </Link>
            </nav>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
