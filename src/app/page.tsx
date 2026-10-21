import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";
import { AboutSection } from "@/sections/About";
import { BlogSection } from "@/sections/Blog";
import { ContactSection } from "@/sections/Contact"
import { Footer } from "@/sections/Footer";

// Structured data for search engines (schema.org Person)
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Leonardo Cunha",
  jobTitle: "Software Engineer",
  url: "https://www.leonardo-cunha.com",
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
      <HeroSection />
      <ProjectsSection />
      <TapeSection />
      <TestimonialsSection />
      <AboutSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
