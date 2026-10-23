import HeroCTAs from "@/components/HeroCTAs"
import { ProfileFlip } from "@/components/ProfileFlip"
import MapPinIcon from "@/assets/icons/map-pin.svg"
import GitHubIcon from "@/assets/icons/github.svg"
import LinkedInIcon from "@/assets/icons/linkedin-mark.svg"
import MailIcon from "@/assets/icons/mail.svg"
import TypescriptIcon from "@/assets/icons/typescript.svg"
import NodeIcon from "@/assets/icons/nodejs.svg"
import ReactIcon from "@/assets/icons/react.svg"
import PythonIcon from "@/assets/icons/python.svg"

const heroLinks = [
  {
    title: "GitHub",
    href: "https://github.com/LeoCunhaLabz",
    icon: GitHubIcon,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/leonardovcunha/",
    icon: LinkedInIcon,
  },
  {
    title: "Email",
    href: "mailto:dev@leonardo-cunha.com",
    icon: MailIcon,
  },
]

const technologies = [
  { title: "TypeScript", icon: TypescriptIcon },
  { title: "Node.js", icon: NodeIcon },
  { title: "React", icon: ReactIcon },
  { title: "Python", icon: PythonIcon },
]

// Each ring starts its pulse a little later, so it travels outward from the portrait.
const rings = [
  { size: "size-[220px] lg:size-[520px]", delay: "[animation-delay:0ms]" },
  { size: "size-[340px] lg:size-[700px]", delay: "[animation-delay:350ms]" },
  { size: "size-[460px] lg:size-[880px]", delay: "[animation-delay:700ms]" },
  { size: "hidden size-[1060px] lg:block", delay: "[animation-delay:1050ms]" },
]

export const HeroSection = () => {
  return (
    <section id="home" className="overflow-x-clip pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
      <div className="container">
        {/* Phones and tablets: small portrait next to the name. Desktop: text on the left, portrait on the right. */}
        <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-x-4 md:grid-cols-[112px_minmax(0,1fr)] md:gap-x-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-x-16">
          <h1 className="col-start-2 row-start-1 self-end text-lg font-semibold md:text-xl lg:col-start-1 lg:self-auto">
            Leonardo Cunha
          </h1>

          <p className="col-span-2 col-start-1 row-start-3 mt-6 font-serif text-[34px] leading-[1.15] md:text-5xl md:leading-[1.1] lg:col-span-1 lg:row-start-2 lg:mt-4 lg:text-[56px]">
            Software Engineer building <span className="text-emerald-300">reliable SaaS products.</span>
          </p>

          <p className="col-span-2 col-start-1 row-start-4 mt-4 leading-relaxed text-white/70 md:max-w-xl md:text-lg lg:col-span-1 lg:row-start-3 lg:mt-6">
            I build interfaces, APIs, integrations, and AI-powered workflows alongside US product teams.
          </p>

          <ul aria-label="Main technologies" className="col-span-2 col-start-1 row-start-5 mt-4 flex flex-wrap gap-2 lg:col-span-1 lg:row-start-4 lg:mt-5">
            {technologies.map((technology) => (
              <li
                key={technology.title}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 py-1 pl-2.5 pr-3 text-[13px] font-medium text-white/80 md:gap-2 md:text-sm"
              >
                <technology.icon className="size-3.5 fill-emerald-300" aria-hidden="true" />
                <span>{technology.title}</span>
              </li>
            ))}
          </ul>

          <p className="col-start-2 row-start-2 mt-1.5 flex items-center gap-1.5 self-start text-sm text-white/60 lg:col-start-1 lg:row-start-5 lg:mt-5 lg:gap-2 lg:text-[15px]">
            <MapPinIcon className="size-4 shrink-0" aria-hidden="true" />
            <span>Based in São Paulo, Brazil.</span>
          </p>

          <HeroCTAs className="col-span-2 col-start-1 row-start-6 mt-7 lg:col-span-1 lg:mt-8" />

          <ul className="col-span-2 col-start-1 row-start-7 mt-3 flex flex-wrap items-center justify-center gap-x-6 md:justify-start lg:col-span-1 lg:mt-4">
            {heroLinks.map((link) => (
              <li key={link.title}>
                <a
                  href={link.href}
                  {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex min-h-11 items-center gap-2 rounded text-[15px] font-medium text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  <link.icon className="size-[18px]" aria-hidden="true" />
                  <span>{link.title}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="relative col-start-1 row-span-2 row-start-1 self-center lg:col-start-2 lg:row-span-7">
            {/* Rings around the portrait that pulse slowly, and stay still for visitors who ask for reduced
                motion. They may run past the bottom of the hero, behind the next section; the section only clips the sides. */}
            <div className="pointer-events-none" aria-hidden="true">
              {rings.map((ring) => (
                <div
                  key={ring.size}
                  className={`hero-ring -z-10 animate-ring-pulse motion-reduce:animate-none ${ring.size} ${ring.delay}`}
                ></div>
              ))}
            </div>
            <ProfileFlip />
          </div>
        </div>
      </div>
    </section>
  );
};
