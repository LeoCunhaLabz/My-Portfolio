import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { Card } from "@/components/Card";
import { Disclosure } from "@/components/Disclosure";
import { PhoneCarousel } from "@/components/PhoneCarousel";
import { ProjectEyebrow, StackList } from "@/components/ProjectEyebrow";
import { caseStudyHash, type Project } from "@/content/projects";

// One project on the home page and on /projects: the result up front, the problem
// and my part one click away, and links to the case study and the live product.

const CardFact = ({ label, children }: { label: string; children: ReactNode }) => (
  <div>
    <dt className="text-xs font-semibold uppercase tracking-wider text-white/60">{label}</dt>
    <dd className="mt-1.5 leading-relaxed text-white/80">{children}</dd>
  </div>
);

// On /projects the first card's image is the largest thing on screen, so it loads
// right away instead of lazily (imagePriority). On the home page the case study
// opens in a modal (caseStudyIn="modal"); on /projects it opens its own page.
export const ProjectCard = ({
  project,
  headingLevel = "h3",
  imagePriority = false,
  caseStudyIn = "page",
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
  imagePriority?: boolean;
  caseStudyIn?: "page" | "modal";
}) => {
  const Heading = headingLevel;
  const { image, phoneScreens, result } = project;
  const hasMedia = Boolean(image || phoneScreens?.length);
  const liveLink = project.links[0];
  const caseStudyClassName =
    "inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-gray-950 transition-colors hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800";
  const caseStudyLabel = (
    <>
      <span>
        Read the case study<span className="sr-only">: {project.name}</span>
      </span>
      <span aria-hidden="true">&rarr;</span>
    </>
  );

  return (
    <Card className="p-6 md:p-10">
      {/* Three levels of detail: the card itself (title, result, stack), a quick look
          at the problem and my part, and the full case study. On large screens the
          title spans the card and the image sits beside the rest. */}
      <div className={twMerge("grid gap-8", hasMedia && "lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-x-10")}>
        <header className="lg:col-span-2">
          <ProjectEyebrow project={project} showName />
          <Heading className="mt-3 font-serif text-2xl md:text-3xl">{project.headline}</Heading>
        </header>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-center">
          <dl>
            <CardFact label="Result">
              <span className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-serif text-3xl text-emerald-300 md:text-4xl">{result.value}</span>
                <span className="text-white/80">{result.label}</span>
              </span>
              <span className="mt-1 block text-sm text-white/60">{result.context}</span>
            </CardFact>
          </dl>

          <div className="mt-6">
            <StackList stack={project.stack} label={`${project.name} stack`} />
          </div>

          <Disclosure
            showLabel="Quick look: problem and my part"
            hideLabel="Hide quick look"
            context={project.name}
            className="mt-4"
          >
            <dl className="mt-2 grid gap-5 rounded-2xl bg-gray-900/50 p-5">
              <CardFact label="Problem">{project.problem}</CardFact>
              <CardFact label="My contribution">{project.contribution}</CardFact>
            </dl>
          </Disclosure>

          <div className="mt-6 flex flex-col gap-3 md:flex-row">
            {caseStudyIn === "modal" ? (
              <a href={caseStudyHash(project.slug)} aria-haspopup="dialog" className={caseStudyClassName}>
                {caseStudyLabel}
              </a>
            ) : (
              <Link href={`/projects/${project.slug}`} className={caseStudyClassName}>
                {caseStudyLabel}
              </Link>
            )}
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
          // Above the title on phones; on large screens it fills the right
          // column next to the result and the card crops its right edge.
          <div className="relative order-first lg:order-none lg:col-start-2 lg:row-start-2 lg:min-h-[380px]">
            <Image
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 1200px) 580px, 100vw"
              loading={imagePriority ? "eager" : undefined}
              fetchPriority={imagePriority ? "high" : undefined}
              className="w-full rounded-xl border border-white/10 lg:absolute lg:left-0 lg:top-1/2 lg:w-[580px] lg:max-w-none lg:-translate-y-1/2"
            />
          </div>
        )}

        {!image && phoneScreens && phoneScreens.length > 0 && (
          // Above the title on phones; centred in the right column on large screens.
          <div className="order-first flex justify-center lg:order-none lg:col-start-2 lg:row-start-2 lg:items-center">
            <PhoneCarousel screens={phoneScreens} label={`${project.name} app screens, with demo data`} />
          </div>
        )}
      </div>
    </Card>
  );
};
