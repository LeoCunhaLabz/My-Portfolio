import memojiAvatar1 from "@/assets/images/tatiana_memoji.png";
import memojiAvatar2 from "@/assets/images/gustavo_memoji.png";
import memojiAvatar3 from "@/assets/images/romulo_memoji.png";
import { SectionHeader } from "@/components/sectionHeader";
import Image from "next/image";
import { Card } from "@/components/Card";
import { Fragment } from "react";

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

export const TestimonialsSection = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Happy Clients"
          title="Clients Testimonials"
          description="Don't just take my word for it. See what my clients have to say about my work."
        />
        <div
          className="mt-16 flex overflow-x-clip lg:mt-24 py-4 -my-4"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex flex-none gap-8 animate-move-left [animation-duration:60s] hover:[animation-play-state:paused] pr-8">
            {[...new Array(2)].fill(0).map((_,idx) => (
              <Fragment key={idx}>
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="max-w-xs md:max-w-md p-6 md:p-8 hover:-rotate-3 transition duration-400">
                    <div className="flex gap-4 items-center">
                      <div className="size-14 bg-gray-700 inline-flex items-center justify-center rounded-full flex-shrink-0 overflow-hidden">
                        <Image src={testimonial.avatar} alt={testimonial.name} className="max-h-full" />
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-white/40">{testimonial.position}</div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm md:text-base md:mt-6">{testimonial.text}</p>
                  </Card>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
