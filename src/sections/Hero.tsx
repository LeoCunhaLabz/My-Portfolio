import Image from "next/image"
import HeroCTAs from "@/components/HeroCTAs"
import profilePhoto from "@/assets/images/profile-photo.jpg"
import MapPinIcon from "@/assets/icons/map-pin.svg"
import GitHubIcon from "@/assets/icons/github.svg"
import LinkedInIcon from "@/assets/icons/linkedin-mark.svg"
import MailIcon from "@/assets/icons/mail.svg"

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

export const HeroSection = () => {
  return (
    <section id="home" className="relative z-0 overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
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
            I work with TypeScript, Node.js, and React across product interfaces, APIs, and integrations. My experience includes AI-powered workflows, production reliability, and collaboration with US product teams.
          </p>

          <p className="col-start-2 row-start-2 mt-1.5 flex items-center gap-1.5 self-start text-sm text-white/60 lg:col-start-1 lg:row-start-4 lg:mt-5 lg:gap-2 lg:text-[15px]">
            <MapPinIcon className="size-4 shrink-0" aria-hidden="true" />
            <span>Based in São Paulo, Brazil.</span>
          </p>

          <HeroCTAs className="col-span-2 col-start-1 row-start-5 mt-7 lg:col-span-1 lg:mt-8" />

          <ul className="col-span-2 col-start-1 row-start-6 mt-3 flex flex-wrap items-center justify-center gap-x-6 md:justify-start lg:col-span-1 lg:mt-4">
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

          <div className="relative col-start-1 row-span-2 row-start-1 self-center lg:col-start-2 lg:row-span-6 lg:rounded-[32px] lg:border lg:border-white/15 lg:bg-gray-800 lg:p-2.5">
            {/* Static rings around the portrait, kept from the previous hero without the motion. */}
            <div className="pointer-events-none" aria-hidden="true">
              <div className="hero-ring -z-10 size-[220px] lg:size-[520px]"></div>
              <div className="hero-ring -z-10 size-[340px] lg:size-[700px]"></div>
              <div className="hero-ring -z-10 size-[460px] lg:size-[880px]"></div>
              <div className="hero-ring -z-10 hidden size-[1060px] lg:block"></div>
            </div>
            <Image
              src={profilePhoto}
              alt="Portrait of Leonardo Cunha"
              preload
              sizes="(min-width: 1200px) 338px, (min-width: 768px) 112px, 88px"
              className="size-[88px] rounded-[22px] border border-white/15 object-cover md:size-28 md:rounded-3xl lg:size-[338px] lg:border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
