import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PostCard } from "@/components/PostCard";
import { posts } from "@/content/blog";
import { defaultSocialImage } from "@/content/site";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";

const description = "Long-form notes on engineering problems I have worked on and what I learned from them.";

export const metadata: Metadata = {
  title: "Blog · Leonardo Cunha",
  description,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/feed.xml" },
  },
  openGraph: {
    title: "Blog · Leonardo Cunha",
    description,
    url: "/blog",
    siteName: "Leonardo Cunha",
    images: [defaultSocialImage],
    locale: "en_US",
    type: "website",
  },
};

export default function BlogPage() {
  // Until the first post is published, /blog doesn't exist in production.
  if (posts.length === 0) notFound();

  return (
    <div>
      <Header page="blog" />
      <main id="main" className="pb-24 pt-32 md:pt-40">
        <div className="container">
          <div className="text-center">
            <p className="font-semibold uppercase tracking-widest text-emerald-300">Writing</p>
            <h1 className="mt-6 font-serif text-3xl md:text-5xl">Blog</h1>
            <p className="mx-auto mt-4 max-w-md text-white/60 md:text-lg">{description}</p>
          </div>

          <ul className="mx-auto mt-12 flex max-w-3xl flex-col gap-8 md:mt-16">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} headingLevel="h2" />
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-16 max-w-3xl">
            <NewsletterForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
