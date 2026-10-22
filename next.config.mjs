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

// Case studies are MDX files in src/content, imported by the /projects pages.
// Plugins are passed by name so Turbopack can load them; remark-gfm adds tables.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
