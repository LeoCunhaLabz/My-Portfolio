import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/blog";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";

// Where the link in Brevo's confirmation email leads (#6). Only people who just
// confirmed see it, so it stays out of the sitemap and of search results.
export const metadata: Metadata = {
  title: "Subscribed · Leonardo Cunha",
  robots: { index: false, follow: false },
};

export default function NewsletterConfirmedPage() {
  return (
    <div>
      <Header page="newsletter" />
      <main id="main" className="min-h-[70vh] pb-24 pt-32 md:pt-40">
        <div className="container text-center">
          <p className="font-semibold uppercase tracking-widest text-emerald-300">Newsletter</p>
          <h1 className="mt-6 font-serif text-3xl md:text-5xl">You&apos;re subscribed</h1>
          <p className="mx-auto mt-4 max-w-md text-white/70 md:text-lg">
            Thanks for confirming. You&apos;ll get an email when I publish a new post, and every email has a link to
            unsubscribe.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 md:flex-row">
            <Link
              href={posts.length > 0 ? "/blog" : "/#blog"}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-gray-900 transition-colors hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              Read the blog
            </Link>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-6 font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              Back to the home page
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
