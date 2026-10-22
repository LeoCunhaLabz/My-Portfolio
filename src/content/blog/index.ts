// The same fields feed the list on /blog, the latest posts on the home page, the
// top of each post, its metadata, the RSS feed and the sitemap. The text of each
// post lives in `<slug>.mdx` next to this file.

export type Post = {
  // The URL, /blog/<slug>. Never change it once the post is published.
  slug: string;
  title: string;
  // One or two sentences, used in the lists and as the page description for
  // search engines and link previews.
  summary: string;
  // Dates as YYYY-MM-DD. Set updatedAt only for changes readers should know about.
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  // A 1200×630 image in public/ for link previews. Without one, the site's image is used.
  socialImage?: { src: string; alt: string };
  status: "draft" | "published";
};

const allPosts: Post[] = [
  // Published for now so the layout can be checked in production. Set it back to
  // "draft" when the first real post is published.
  {
    slug: "placeholder-post",
    title: "Placeholder: how a post looks on this site",
    summary:
      "A placeholder that shows every format a post can use: headings, lists, code, tables, quotes and images. The first real post will replace it.",
    publishedAt: "2026-10-22",
    tags: ["Placeholder", "Formatting"],
    status: "published",
  },
];

// Fail the build on a malformed entry instead of publishing a broken page.
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const seen = new Set<string>();
for (const post of allPosts) {
  if (!slugPattern.test(post.slug)) throw new Error(`Blog post "${post.slug}": use lowercase words and hyphens in the slug.`);
  if (seen.has(post.slug)) throw new Error(`Blog post "${post.slug}": the slug is used twice.`);
  seen.add(post.slug);
  for (const date of [post.publishedAt, post.updatedAt]) {
    if (date !== undefined && (!datePattern.test(date) || Number.isNaN(Date.parse(date)))) {
      throw new Error(`Blog post "${post.slug}": "${date}" is not a YYYY-MM-DD date.`);
    }
  }
}

// Drafts show up while writing (`next dev`) and on Vercel preview deployments, so a
// pull request's preview shows the post before it is published. Production, CI and
// a local `next build` leave them out.
const showDrafts = process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";

// Posts that have a page in this build, newest first.
export const posts = allPosts
  .filter((post) => post.status === "published" || showDrafts)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

// The RSS feed and the sitemap only list published posts, even on previews.
export const publishedPosts = posts.filter((post) => post.status === "published");

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
