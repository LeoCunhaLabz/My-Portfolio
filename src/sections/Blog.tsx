import Link from "next/link";
import { SectionHeader } from "@/components/sectionHeader";
import { Card } from "@/components/Card";
import { PostCard } from "@/components/PostCard";
import { posts } from "@/content/blog";

// The three most recent posts. Until the first one is published, a placeholder.
export const BlogSection = () => {
  const latestPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Writing"
          title="Blog"
          description={
            latestPosts.length > 0
              ? "Long-form notes on engineering problems I have worked on and what I learned from them."
              : "I'm preparing long-form posts about design, frontend architecture and product — coming soon."
          }
        />
        {latestPosts.length > 0 ? (
          <>
            <ul className="mx-auto mt-10 flex max-w-3xl flex-col gap-8 md:mt-16">
              {latestPosts.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
            <div className="mt-10 flex justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded font-semibold text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <span>All posts</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-12 flex justify-center">
            <Card className="max-w-xl text-center px-8 py-12">
              <h3 className="font-serif text-2xl md:text-3xl">Coming soon</h3>
              <p className="mt-4 text-white/70">I’m preparing posts about design, frontend architecture and product.</p>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};
