import { publishedPosts } from "@/content/blog";
import { siteUrl } from "@/content/site";

// RSS 2.0 feed of the published posts, generated at build time. A newsletter tool
// can read it to draft an announcement (#6); nothing here sends email.
export const dynamic = "force-static";

const escapeXml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function GET() {
  const items = publishedPosts.map((post) => {
    const url = `${siteUrl}/blog/${post.slug}`;
    return [
      "    <item>",
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>`,
      `      <description>${escapeXml(post.summary)}</description>`,
      ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
      "    </item>",
    ].join("\n");
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>Leonardo Cunha · Blog</title>",
    `    <link>${siteUrl}/blog</link>`,
    "    <description>Long-form notes on engineering problems I have worked on and what I learned from them.</description>",
    "    <language>en</language>",
    `    <atom:link href="${siteUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
