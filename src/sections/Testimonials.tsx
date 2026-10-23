import memojiAvatar1 from "@/assets/images/tatiana_memoji.png";
import memojiAvatar2 from "@/assets/images/gustavo_memoji.png";
import memojiAvatar3 from "@/assets/images/romulo_memoji.png";
import { SectionHeader } from "@/components/sectionHeader";
import Image from "next/image";
import { Card } from "@/components/Card";

const testimonials = [
  {
    name: "Tatiana C.",
    position: "PhD Candidate, Environmental Engineering",
    text: "Leonardo showed commitment and professionalism from the very first contact. He was very attentive and patient, going over the project information as many times as necessary. Excellent professional.",
    avatar: memojiAvatar1,
  },
  {
    name: "Gustavo A.",
    position: "UX/UI Designer @ Gustta Digital",
    text: "Throughout our work together, he consistently demonstrated a high level of commitment, professionalism, and technical expertise. I highly recommend him for any project that values integrity, quality, and dedication.",
    avatar: memojiAvatar2,
  },

  {
    name: "Romulo B.",
    position: "CEO @ E-commerce Jewelry Brand",
    text: "Very responsive and committed to delivering the project, and very honest and transparent with his work.",
    avatar: memojiAvatar3,
  },
];

// The three cards sit side by side and don't move, so they can be read at once
// and need no pause button.
export const TestimonialsSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Recommendations"
          title="In Their Words"
          description="Feedback from people I've worked with."
        />
        <ul className="mx-auto mt-12 grid max-w-md gap-8 md:mt-16 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={testimonial.name}>
              <Card className="h-full p-6 transition duration-400 hover:-rotate-3 motion-reduce:hover:rotate-0 md:p-8">
                <figure>
                  <figcaption className="flex items-center gap-4">
                    <div className="inline-flex size-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-700">
                      <Image src={testimonial.avatar} alt="" className="max-h-full" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-white/60">{testimonial.position}</div>
                    </div>
                  </figcaption>
                  <blockquote className="mt-4 text-sm md:mt-6 md:text-base">
                    <p>{testimonial.text}</p>
                  </blockquote>
                </figure>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
