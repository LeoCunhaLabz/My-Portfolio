import airticlesProject from "@/assets/images/airticles-note.png";
import flashProject from "@/assets/images/flash-note.png";
import softwareProject from "@/assets/images/software-note.png";
import Image from "next/image";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { SectionHeader } from "@/components/sectionHeader";
import { Card } from "@/components/Card";

const portfolioProjects = [
  {
    company: "AIrticles",
    year: "2025",
    title: "AI‑Powered Article Generation SaaS",
    results: [
      { title: "Ships SEO-ready posts for blogs." },
      { title: "Full-stack delivery + deploy on AWS." },
      { title: "WordPress, OAuth, and Stripe integrations." },
    ],
    link: "https://www.airticles.ai/",
    image: airticlesProject,
  },
  {
    company: "Desktop Software",
    year: "2024",
    title: " AI-Optimized River Modeling",
    results: [
      { title: "Simulates effluent dispersion in rivers." },
      { title: "Proprietary AI optimization engine." },
      { title: "Python GUI + model + AI optimization." },
    ],
    link: "",
    image: softwareProject,
  },
  {
    company: "Flash Offers",
    year: "2024",
    title: "Location-Based Deals SaaS",
    results: [
      { title: "Geo-filtered, time-limited offers." },
      { title: "MVP delivery under 6 weeks." },
      { title: "Maps, PagSeguro and OAuth integrations." },
    ],
    link: "",
    image: flashProject,
  },
];

export const ProjectsSection = () => {
  return(
  <section id="projects" className="pb-16 lg:py-24">
    <div className = "container">
      <SectionHeader 
        eyebrow="Real-world Results" 
        title="Featured Projects" 
        description="Some projects I have worked on:" 
      />
      <div className="flex flex-col mt-10 gap-20 md:mt-20">
        {portfolioProjects.map((project, projectIndex) => {
        const hasLink = project.link && project.link.trim().length > 0;
        return (
        <Card 
        key={project.title} 
        className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky"
        style={{
          top: `calc(64px + ${projectIndex * 40}px)`
        }}
        >
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="lg:pb-16">
            <div className="bg-gradient-to-r from-emerald-300 to-sky-400 p-2 
            rounded-t-3xl gap-2 inline-flex font-bold uppercase tracking-widest 
            text-sm text-transparent bg-clip-text">
              <span>{project.company}</span>
              <span>&bull;</span>
              <span>{project.year}</span>
            </div>
            <h3 className="font-serif text-2xl mt-2 md:mt-5 md:text-4xl">{project.title}</h3>
            <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
            <ul className="flex flex-col gap-4 mt-4">
              {project.results.map(result => (
              <li key={result.title} className="flex gap-2 text-sm text-white/50 md:text-base">
                <CheckCircleIcon className="size-5 md:size-6" />
                <span>{result.title}</span>
              </li>
              ))}
            </ul>
            <a
              href={hasLink ? project.link : '#contact'}
              {...(hasLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <button
                className="bg-white text-gray-950 h-12 w-full rounded-xl font-semibold
              inline-flex items-center justify-center gap-2 mt-8 md:w-auto px-6"
              >
                <span>{hasLink ? 'View Live Site' : 'Request a demo'}</span>
                {hasLink && <ArrowUpRightIcon className="size-4" />}
              </button>
            </a>
            </div>
            <div className="relative">
              <Image src={project.image} alt={project.title} className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"/>
            </div>
          </div>
  </Card>
  );
  })}
      </div>
    </div>
  </section>
  );
};
