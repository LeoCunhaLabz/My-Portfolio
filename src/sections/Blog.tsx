import { SectionHeader } from "@/components/sectionHeader";
import { Card } from "@/components/Card";

export const BlogSection = () => {
  return (
    <section id="blog" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Writing"
          title="Blog"
          description="I'm preparing long-form posts about design, frontend architecture and product — coming soon."
        />
        <div className="mt-12 flex justify-center">
          <Card className="max-w-xl text-center px-8 py-12">
            <h3 className="font-serif text-2xl md:text-3xl">Coming soon</h3>
            <p className="mt-4 text-white/70">I’m preparing posts about design, frontend architecture and product.</p>
          </Card>
        </div>
      </div>
    </section>
  )
}
