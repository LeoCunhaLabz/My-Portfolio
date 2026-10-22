# Leonardo Cunha — Portfolio

Source code of [leonardo-cunha.com](https://www.leonardo-cunha.com), my personal portfolio. It has a home page with my experience, selected projects, an about section, recommendations and contact options, a case study page for each featured project under `/projects`, and a blog under `/blog`, which goes live with the first published post.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) and React 19
- TypeScript
- Tailwind CSS 3 with `tailwind-merge`
- `framer-motion` for the draggable hobby chips
- SVGR, so SVG icons are imported as React components
- MDX (`@next/mdx` with `remark-gfm`) for the case studies and blog posts, with code highlighted at build time by `rehype-pretty-code` and Shiki
- Vercel for hosting, Web Analytics and Speed Insights

## Running locally

Requirements: Node.js 24 (the version pinned in `engines` in `package.json`) and npm.

```bash
npm ci
npm run dev
```

Then open http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint, configured in `eslint.config.mjs` |
| `npm run typecheck` | Generates the Next.js types (`next typegen`) and runs `tsc --noEmit` |

## Project structure

```text
src/
  app/          layout (metadata, fonts, analytics), home page (section order, JSON-LD), sitemap, robots.txt and global styles
    projects/   /projects (list of case studies) and /projects/[slug] (one case study)
    blog/       /blog (list of posts), /blog/[slug] (one post) and /blog/feed.xml (RSS feed)
  sections/     one component per page section: Header, Hero, Experience, Projects, Tape, About, Blog, Testimonials, Contact, Footer
  components/   shared pieces such as Card, SectionHeader, ContactModal, HeroCTAs, PostCard, SiteAnalytics and the case study blocks
    diagrams/   the SVG diagrams used in the case studies
  content/
    projects/   index.ts (each project's card data) and one <slug>.mdx case study per project
    blog/       index.ts (each post's data and status) and one <slug>.mdx per post
    resume.ts   the path of the public CV
    site.ts     the production URL, used for absolute links
  mdx-components.tsx   styles for the markdown in the MDX files (required by Next.js)
  assets/
    icons/      SVG icons, imported as React components
    images/     images (most rendered through next/image)
public/         files served as they are, such as the Open Graph image and the CV
```

## Analytics

Vercel Web Analytics and Speed Insights, both on the free Hobby plan. The numbers are only visible in the Vercel dashboard; the site has no public counter or metrics endpoint. `src/components/SiteAnalytics.tsx` wraps the analytics component ([#7](https://github.com/LeoCunhaLabz/My-Portfolio/issues/7)):

- **Own visits:** a browser opened once with `?notrack=1` on any page stops sending page views; `?notrack=0` turns it back on. The flag lives in that browser's local storage, so set it on each browser and device, and again after clearing site data. Private windows are counted.
- **CV:** the PDF is a static file, which the analytics script never sees. Every click on a link to it is counted as a page view of `/resume`.
- **Routes:** page views carry the route (for example `/projects/[slug]`) besides the path.

Hobby keeps the details for the last 31 days, with no custom events or UTM parameters.

## Environment variables

The site has none of its own. It reads `VERCEL_ENV`, which Vercel sets on every deployment, to show blog drafts on preview deployments only (see [Writing a blog post](#writing-a-blog-post)). If one is added, document its name and purpose here (never its value) and set it in the Vercel project settings.

## Updating content

All content lives in the components, so an update is a code change reviewed in a pull request.

- **Experience:** the `experiences` array in `src/sections/Experience.tsx`, newest role first.
- **Projects and case studies:** add the project to the `projects` array in `src/content/projects/index.ts`. Its fields feed the card on the home page and on `/projects` (same order as the array) and the top of its case study. A screenshot is optional: add it to `src/assets/images/` and import it at the top of that file; without one, the card has no image. For a mobile app, `phoneScreens` takes several screenshots instead and shows them one after another in a phone frame (`src/components/PhoneCarousel.tsx`). Then write `src/content/projects/<slug>.mdx` with the same `slug`. The page `/projects/<slug>` is generated at build time; a slug without an entry in the array is a 404. Use `Facts`, `Fact` and `Quote` from `src/components/CaseStudy.tsx` for the "At a glance" list and testimonials, and `DiagramFigure` from `src/components/diagrams/` for diagrams.
- **Testimonials:** the `testimonials` array in `src/sections/Testimonials.tsx`.
- **About:** the text, plus the `toolboxItems` and `hobbies` arrays, in `src/sections/About.tsx`. Icons go in `src/assets/icons/`.
- **Hero and contact text, and contact links:** `src/sections/Hero.tsx`, `src/sections/Contact.tsx`, `src/components/ContactModal.tsx` and `src/sections/Footer.tsx`.
- **SEO:** `metadata` in `src/app/layout.tsx`, the Open Graph image (`public/og-image.jpg`, 1200×630) and the structured data (`personJsonLd`) in `src/app/page.tsx`. `src/app/sitemap.ts` lists the public pages from the project and post data; a new kind of page has to be added there.
- **Blog posts:** see [Writing a blog post](#writing-a-blog-post).
- **CV:** `public/Leonardo_Cunha_CV.pdf`, linked from the hero, the contact section and the footer through `resumeHref` in `src/content/resume.ts`. To update it, export the new version in English as a PDF with selectable text and working links, check that it uses the public email (dev@leonardo-cunha.com), and replace the file keeping the same name, so links shared earlier keep working. If the roles or the numbers change, update `src/sections/Experience.tsx` and the case studies in the same pull request. The cover letter is not published.

Keep source images at about twice their largest displayed size. `next/image` serves 1x and 2x versions based on the source width, so oversized files are served oversized.

## Writing a blog post

Posts are MDX files reviewed in a pull request, like any other change. Merging publishes a post; a deploy never sends email.

1. **Create.** On a new branch, add the post to `allPosts` in `src/content/blog/index.ts` with `status: "draft"`, then write `src/content/blog/<slug>.mdx` with the same `slug`. The title, summary, dates and topics come from `index.ts`, so the MDX file holds only the text, with headings starting at `##`. `placeholder-post.mdx` shows every format a post can use; it is published for now, so the layout can be checked in production, and goes back to `"draft"` with the first real post.
   - **Code:** name the language after the opening fence (` ```ts `). Add `title="retry.ts"` to show a file name and `{6-7}` to highlight lines.
   - **Images:** put them in `public/blog/<slug>/`, about 1600 px wide, and write `![Alt text](/blog/<slug>/file.png "Optional caption")`.
   - **Link preview image (optional):** a 1200×630 file in `public/blog/<slug>/`, set in `socialImage`. Without one, previews use `public/og-image.jpg`.
2. **Review.** `npm run dev` shows drafts at `/blog/<slug>`, and so does the pull request's Vercel preview, with a Draft label and a `noindex` tag. Check every fact and number against a source, keep anonymous whatever must stay anonymous, and read the page on a phone.
3. **Publish.** In the same pull request, set `status: "published"` and `publishedAt` to the publication date, then merge. The production deploy adds the post to `/blog`, the home page, the RSS feed (`/blog/feed.xml`) and the sitemap. Then post the short LinkedIn version with a link to it. Announcing a post by email ([#6](https://github.com/LeoCunhaLabz/My-Portfolio/issues/6)) is a separate, manual step after checking the live page.
4. **Update.** Edit the MDX in a pull request. For changes readers should know about, set `updatedAt`, which shows on the page and goes to the sitemap and the structured data. Never change the slug of a published post, since its URL has been shared; if it can't be avoided, add a redirect in `next.config.mjs`.
5. **Unpublish.** Set `status` back to `"draft"`, and the page becomes a 404 in production.

Drafts never reach production: `src/content/blog/index.ts` includes them only in `next dev` and when `VERCEL_ENV` is `preview`, so production, CI and a local `npm run build` leave them out. The RSS feed and the sitemap skip drafts everywhere. While no post is published, `/blog` is a 404, the Writing link points to the home page section, and that section keeps its "Coming soon" block.

## Checks

GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck and build on every pull request and on every push to `main`. To run the same checks locally before opening a pull request:

```bash
npm run lint && npm run typecheck && npm run build
```

## Deployment

Vercel deploys `main` to production and creates a preview deployment for every pull request. To roll back, revert the commit on `main`, or use Instant Rollback in the Vercel dashboard while the revert is on its way.

## Dependency updates

Dependabot opens grouped update pull requests once a month for npm packages and GitHub Actions (`.github/dependabot.yml`). Nothing is merged automatically: each pull request runs the checks and gets a Vercel preview.

Major versions of Tailwind CSS, `tailwind-merge`, TypeScript, `framer-motion` and the Vercel packages are ignored there, because each one needs its own planned migration. Follow the [Next.js support policy](https://nextjs.org/support-policy) to know when the framework itself needs a major upgrade.

`next dev` regenerates `AGENTS.md`; keep it committed.
