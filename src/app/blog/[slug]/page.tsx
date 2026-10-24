import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PostEyebrow, PostTags } from "@/components/PostCard";
import { getPost, posts, type Post } from "@/content/blog";
import { defaultSocialImage, siteUrl } from "@/content/site";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";

type Props = { params: Promise<{ slug: string }> };

// Only the posts in src/content/blog/index.ts that this build shows exist; anything
// else, including a draft in production, is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

const socialImage = (post: Post) =>
  post.socialImage ?? { src: defaultSocialImage.url, alt: defaultSocialImage.alt };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const title = `${post.title} · Leonardo Cunha`;
  const url = `/blog/${post.slug}`;
  const image = socialImage(post);
  return {
    title,
    description: post.summary,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": "/blog/feed.xml" },
    },
    openGraph: {
      title,
      description: post.summary,
      url,
      siteName: "Leonardo Cunha",
      images: [{ url: image.src, width: 1200, height: 630, alt: image.alt }],
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [siteUrl],
      tags: post.tags,
    },
    // Drafts only exist on previews, but keep them out of search results anyway.
    ...(post.status === "draft" ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: PostBody } = await import(`@/content/blog/${slug}.mdx`);
  const url = `${siteUrl}/blog/${post.slug}`;

  // Structured data for search engines (schema.org BlogPosting)
  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: "Leonardo Cunha", url: siteUrl },
    image: new URL(socialImage(post).src, siteUrl).href,
    url,
    mainEntityOfPage: url,
    keywords: post.tags,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(postJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header page="blog" />
      <main id="main" className="pb-24 pt-28 md:pt-36">
        <article className="container">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded text-sm font-semibold text-white/60 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <span aria-hidden="true">&larr;</span>
              <span>All posts</span>
            </Link>

            <header className="mt-8">
              <PostEyebrow post={post} />
              <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{post.title}</h1>
              <p className="mt-4 text-lg leading-relaxed text-white/80 md:text-xl">{post.summary}</p>
              <div className="mt-6">
                <PostTags post={post} />
              </div>
            </header>

            <div className="mt-10 [&>*:first-child]:mt-0">
              <PostBody />
            </div>

            <div className="mt-20">
              <NewsletterForm />
            </div>

            <nav aria-label="Keep reading" className="mt-20 flex flex-col gap-4 border-t border-white/15 pt-10 sm:flex-row sm:gap-8">
              <Link
                href="/blog"
                className="inline-flex rounded font-semibold text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <span aria-hidden="true">&larr;</span>&nbsp;All posts
              </Link>
              <Link
                href="/projects"
                className="inline-flex rounded font-semibold text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                See the case studies&nbsp;<span aria-hidden="true">&rarr;</span>
              </Link>
            </nav>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
