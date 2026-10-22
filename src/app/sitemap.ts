import type { MetadataRoute } from "next";
import { publishedPosts } from "@/content/blog";
import { projects } from "@/content/projects";
import { siteUrl } from "@/content/site";

// Every public page. Blog drafts never appear here, even on previews.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastPostChange = publishedPosts.map((post) => post.updatedAt ?? post.publishedAt).sort().at(-1);

  return [
    { url: siteUrl },
    { url: `${siteUrl}/projects` },
    ...projects.map((project) => ({ url: `${siteUrl}/projects/${project.slug}` })),
    ...(lastPostChange ? [{ url: `${siteUrl}/blog`, lastModified: lastPostChange }] : []),
    ...publishedPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.publishedAt,
    })),
  ];
}
