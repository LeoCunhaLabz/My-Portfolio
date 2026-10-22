import type { StaticImageData } from "next/image";
import airticlesScreenshot from "@/assets/images/airticles-note.png";
import riverSimulatorScreenshot from "@/assets/images/software-note.png";

// The same fields feed the project cards (home page and /projects) and the top
// of each case study page. The case study body lives in `<slug>.mdx` next to this file.

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
  // Used as the page description for search engines and link previews.
  oneLiner: string;
  // The card: one sentence each, taken from the case study.
  problem: string;
  contribution: string;
  result: {
    value: string;
    label: string;
    // Period and context, so the number isn't read out of place.
    context: string;
  };
  // A real screenshot; projects without one get a card without an image.
  image?: { src: StaticImageData; alt: string };
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
    problem:
      "Businesses that rely on search traffic need a steady flow of SEO content, and writing, illustrating and publishing each article by hand is slow and expensive.",
    contribution:
      "Built the first version of the product, frontend and backend, as a consultant through Novva Solutions: the generation pipeline, sign-in, billing, a CTA generator and a conversion-tracking pixel. Then ran the pipeline in production.",
    result: {
      value: "100+",
      label: "paying customers",
      context: "Jan to Aug 2025, while I was on the project · 7.5K+ articles and 99%+ uptime",
    },
    image: { src: airticlesScreenshot, alt: "The AIrticles dashboard, listing generated articles and their publishing status" },
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
    problem:
      "Lifters log their training in spreadsheets and do the math between sets by hand, and generic apps are in English and don't speak the sport's language.",
    contribution:
      "Built it alone, from the product definition to production: an offline-first React PWA, a Fastify and PostgreSQL API with cross-device sync, and the deployment.",
    result: {
      value: "500+",
      label: "automated tests",
      context: "Pre-launch, so no usage numbers yet · 180+ merged pull requests since June 2026",
    },
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
    problem:
      "Deciding where effluents may be discharged into a river, and how much they must be treated, means running many water-quality scenarios, which is impractical by hand.",
    contribution:
      "Sole developer for a PhD researcher: the QUAL-UFMG model in Python, a multi-objective genetic algorithm, the desktop interface, tests and a Windows executable.",
    result: {
      value: "~30,000",
      label: "river simulations in one optimized run",
      context: "Default settings · Dec 2024 to Feb 2025 · the study's findings are the researcher's",
    },
    image: {
      src: riverSimulatorScreenshot,
      alt: "The simulator's results screen, with dissolved oxygen, BOD and flow profiles along the river",
    },
    stack: ["Python", "PyQt5", "Matplotlib", "pandas", "PyInstaller"],
    links: [],
    linksNote: "A desktop app delivered to the client; the code isn't public.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
