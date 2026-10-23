import { Disclosure } from "@/components/Disclosure";
import { SectionHeader } from "@/components/sectionHeader";

const experiences = [
  {
    role: "Software Engineer",
    company: "Flatiron Software",
    location: "Remote, United States",
    period: "Apr 2026 – Present",
    context: "US consultancy. I work on a three-person engineering team serving a US media group.",
    highlights: [
      "Own the UI end to end: migrated it from a legacy Vue app to React and TanStack, then wired it to the backend as endpoints shipped.",
      "Designed the shared data contract that ingestion pipelines use to hand records to the API and UI.",
      "Work directly with US product stakeholders to turn newsroom needs into scoped, sequenced tickets.",
    ],
    technologies: ["React", "TanStack", "Node.js", "PostgreSQL", "Google Cloud"],
  },
  {
    role: "Software Engineer",
    company: "Novva Solutions",
    location: "Remote, Brazil",
    period: "Feb 2024 – Apr 2026",
    context: "Built B2B SaaS MVPs end to end for clients, owning architecture, data model and delivery.",
    highlights: [
      "Designed production backends with idempotent webhooks, queues, retries and structured logging.",
      "Implemented subscription and billing flows with Stripe and Asaas, from checkout to webhook-driven lifecycle events.",
      "Consulting engagements included AIrticles (Jan – Aug 2025), an AI content SaaS where I built the MVP's frontend and backend as part of a five-person team.",
    ],
    technologies: ["TypeScript", "Node.js", "React", "Next.js", "PostgreSQL"],
  },
  {
    role: "Venture Capital Analyst, Portfolio Analytics & Automation",
    company: "Citrino Ventures",
    location: "São Paulo, Brazil",
    period: "Aug 2022 – Feb 2024",
    context: "Used Python daily to automate KPI collection and reporting, moving portfolio reporting from a monthly to a weekly cadence.",
    highlights: [],
    technologies: ["Python"],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Experience"
          title="Where I've Worked"
          description="From my current role on a US product team back to the automation work that led me to engineering."
        />
        <ol className="mx-auto mt-12 max-w-3xl md:mt-16">
          {experiences.map((experience) => (
            <li
              key={experience.company}
              className="grid gap-x-10 gap-y-2 border-t border-white/10 py-8 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[170px_minmax(0,1fr)]"
            >
              <p className="text-sm font-semibold text-emerald-300 md:pt-1">{experience.period}</p>
              <div>
                <h3 className="text-lg font-semibold md:text-xl">{experience.role}</h3>
                <p className="mt-1 text-sm text-white/60 md:text-base">
                  {experience.company} · {experience.location}
                </p>
                <p className="mt-4 leading-relaxed text-white/70">{experience.context}</p>
                <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-2">
                  {experience.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-full border border-white/15 px-3 py-1 text-[13px] font-medium text-white/80"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
                {/* The first read is the role, the context and the stack; the highlights wait behind a toggle. */}
                {experience.highlights.length > 0 && (
                  <Disclosure
                    showLabel="Show highlights"
                    hideLabel="Hide highlights"
                    context={experience.company}
                    className="mt-2"
                  >
                    <ul className="mt-1 flex flex-col gap-3">
                      {experience.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 leading-relaxed text-white/70">
                          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-emerald-300" aria-hidden="true"></span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </Disclosure>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
