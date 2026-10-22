import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      // Convert *.svg imports to React components
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

// Case studies and blog posts are MDX files in src/content, imported by the
// /projects and /blog pages. Plugins are passed by name so Turbopack can load
// them; remark-gfm adds tables, and rehype-pretty-code highlights code blocks at
// build time, so no highlighter runs in the browser.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          theme: "github-dark-dimmed",
          // The block background comes from mdx-components.tsx.
          keepBackground: false,
          // Blocks without a language are still marked, so they get the block styles.
          defaultLang: { block: "plaintext" },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
