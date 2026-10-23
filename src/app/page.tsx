import type { Metadata } from "next";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ExperienceSection } from "@/sections/Experience";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";
import { AboutSection } from "@/sections/About";
import { BlogSection } from "@/sections/Blog";
import { ContactSection } from "@/sections/Contact"
import { Footer } from "@/sections/Footer";
import { siteUrl } from "@/content/site";

// Title, description and social image come from the root layout.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Structured data for search engines (schema.org Person)
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Leonardo Cunha",
  jobTitle: "Software Engineer",
  url: siteUrl,
  sameAs: [
    "https://github.com/LeoCunhaLabz",
    "https://www.linkedin.com/in/leonardovcunha/",
  ],
};

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main id="main">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <TapeSection />
        <AboutSection />
        <BlogSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
