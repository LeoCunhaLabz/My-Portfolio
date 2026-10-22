import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { Card } from "@/components/Card";
import { PhoneCarousel } from "@/components/PhoneCarousel";
import { ProjectEyebrow, StackList } from "@/components/ProjectEyebrow";
import type { Project } from "@/content/projects";

// One project on the home page and on /projects: the problem, my part and the
// result, with links to the case study and to the live product.

const CardFact = ({ label, children }: { label: string; children: ReactNode }) => (
  <div>
    <dt className="text-xs font-semibold uppercase tracking-wider text-white/60">{label}</dt>
    <dd className="mt-1.5 leading-relaxed text-white/80">{children}</dd>
  </div>
);

export const ProjectCard = ({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) => {
  const Heading = headingLevel;
  const { image, phoneScreens, result } = project;
  const hasMedia = Boolean(image || phoneScreens?.length);
  const liveLink = project.links[0];

  return (
    <Card className="p-6 md:p-10">
      <div className={twMerge("flex flex-col gap-8", hasMedia && "lg:grid lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-10")}>
        <div>
          <ProjectEyebrow project={project} showName />
          <Heading className="mt-3 font-serif text-2xl md:text-3xl">{project.headline}</Heading>

          <dl className={twMerge("mt-6 grid gap-5", !hasMedia && "lg:grid-cols-3 lg:gap-8")}>
            <CardFact label="Problem">{project.problem}</CardFact>
            <CardFact label="My contribution">{project.contribution}</CardFact>
            <CardFact label="Result">
              <span className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-serif text-3xl text-emerald-300">{result.value}</span>
                <span className="text-white/80">{result.label}</span>
              </span>
              <span className="mt-1 block text-sm text-white/60">{result.context}</span>
            </CardFact>
          </dl>

          <div className="mt-6">
            <StackList stack={project.stack} label={`${project.name} stack`} />
          </div>

          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-gray-950 transition-colors hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
            >
              <span>
                Read the case study<span className="sr-only">: {project.name}</span>
              </span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
            {liveLink && (
              <a
                href={liveLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 font-semibold transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <span>
                  {liveLink.label}
                  <span className="sr-only">: {project.name}</span>
                </span>
                <ArrowUpRightIcon className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {image && (
          // Above the text on phones; on large screens it fills the right
          // column and the card crops its right edge.
          <div className="relative order-first lg:order-none">
            <Image
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 1200px) 620px, 100vw"
              className="w-full rounded-xl border border-white/10 lg:absolute lg:left-0 lg:top-1/2 lg:w-[620px] lg:max-w-none lg:-translate-y-1/2"
            />
          </div>
        )}

        {!image && phoneScreens && phoneScreens.length > 0 && (
          // Above the text on phones; centred in the right column on large screens.
          <div className="order-first flex justify-center lg:order-none lg:items-center">
            <PhoneCarousel screens={phoneScreens} label={`${project.name} app screens, with demo data`} />
          </div>
        )}
      </div>
    </Card>
  );
};
