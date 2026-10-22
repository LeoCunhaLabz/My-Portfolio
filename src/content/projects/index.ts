// The same fields feed the project cards and the top of each case study page.
// The case study body lives in `<slug>.mdx` next to this file.

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  kind: "Consulting project" | "Personal product" | "Client project";
  period: string;
  status?: string;
  headline: string;
  oneLiner: string;
  highlights: [string, string, string];
  stack: string[];
  links: ProjectLink[];
  // Shown next to the links, e.g. why there is no code or demo link.
  linksNote?: string;
};

// Order matters: it is the order of the listing and of the featured projects.
export const projects: Project[] = [
  {
    slug: "airticles",
    name: "AIrticles",
    kind: "Consulting project",
    period: "Jan to Aug 2025",
    headline: "An AI pipeline that writes, illustrates and publishes SEO articles",
    oneLiner:
      "A B2B SaaS that turns a keyword into an illustrated SEO article on the customer's WordPress site. I built the first version of the product, frontend and backend, and ran its generation pipeline in production.",
    highlights: [
      "100+ paying customers and 7.5K+ articles while I was on the project.",
      "99%+ uptime from retries, idempotent workflows and structured monitoring.",
      "Beyond the pipeline: OAuth sign-in, Stripe billing, a CTA generator and a conversion-tracking pixel.",
    ],
    stack: ["TypeScript", "Node.js", "React", "AWS", "OpenAI"],
    links: [{ label: "Live site", href: "https://www.airticles.ai/" }],
    linksNote: "The source code belongs to the client and is private.",
  },
  {
    slug: "onyx",
    name: "ONYX",
    kind: "Personal product",
    period: "Jun 2026 to present",
    status: "Pre-launch",
    headline: "An offline-first powerlifting log that does the math between sets",
    oneLiner:
      "A free, Portuguese-language training app for lifters who track their training in spreadsheets. Built solo, from product to production.",
    highlights: [
      "Offline-first PWA with cross-device sync, rebuilt and tested after a data-loss bug.",
      "Fastify and PostgreSQL API with JWT, Google sign-in and password recovery.",
      "500+ automated tests and a CI gate before every deploy.",
    ],
    stack: ["React", "TypeScript", "Fastify", "PostgreSQL", "Astro"],
    links: [
      { label: "Live app", href: "https://app.onyxtreino.com.br" },
      { label: "Landing site", href: "https://onyxtreino.com.br" },
    ],
    linksNote: "The source code is private.",
  },
  {
    slug: "river-effluent-simulator",
    name: "River Effluent Simulator",
    kind: "Client project",
    period: "Dec 2024 to Feb 2025",
    headline:
      "A desktop app that simulates river water quality and optimizes where effluents are discharged",
    oneLiner:
      "Built for an environmental engineering PhD researcher. It simulates how effluents change a river's oxygen and organic load, and a genetic algorithm searches for discharge points and treatment levels that balance treatment effort against the river's legal limits.",
    highlights: [
      "Implements the QUAL-UFMG water-quality model for a river and its tributaries, segment by segment.",
      "Multi-objective genetic algorithm with a Pareto front, scored against Brazil's CONAMA limits for dissolved oxygen and BOD.",
      "Shipped as a single Windows executable, with charts, CSV and Excel export, 22 automated tests and a 30-page manual.",
    ],
    stack: ["Python", "PyQt5", "Matplotlib", "pandas", "PyInstaller"],
    links: [],
    linksNote: "A desktop app delivered to the client; the code isn't public.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
