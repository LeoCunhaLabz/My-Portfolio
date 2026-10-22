# Leonardo Cunha — Portfolio

Source code of [leonardo-cunha.com](https://www.leonardo-cunha.com), my personal portfolio. It has a home page with my experience, selected projects, an about section, recommendations and contact options, and a case study page for each featured project under `/projects`.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) and React 19
- TypeScript
- Tailwind CSS 3 with `tailwind-merge`
- `framer-motion` for the draggable hobby chips
- SVGR, so SVG icons are imported as React components
- MDX (`@next/mdx` with `remark-gfm`) for the case studies
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
  app/          layout (metadata, fonts, analytics), home page (section order, JSON-LD) and global styles
    projects/   /projects (list of case studies) and /projects/[slug] (one case study)
  sections/     one component per page section: Header, Hero, Experience, Projects, Tape, About, Blog, Testimonials, Contact, Footer
  components/   shared pieces such as Card, SectionHeader, ContactModal, HeroCTAs and the case study blocks
    diagrams/   the SVG diagrams used in the case studies
  content/
    projects/   index.ts (each project's card data) and one <slug>.mdx case study per project
  mdx-components.tsx   styles for the markdown in the MDX files (required by Next.js)
  assets/
    icons/      SVG icons, imported as React components
    images/     images (most rendered through next/image)
public/         files served as they are, such as the Open Graph image
```

## Environment variables

None. The site does not read any environment variable today. If one is added, document its name and purpose here (never its value) and set it in the Vercel project settings.

## Updating content

All content lives in the components, so an update is a code change reviewed in a pull request.

- **Experience:** the `experiences` array in `src/sections/Experience.tsx`, newest role first.
- **Projects and case studies:** add the project to the `projects` array in `src/content/projects/index.ts`. Its fields feed the card on the home page and on `/projects` (same order as the array) and the top of its case study. A screenshot is optional: add it to `src/assets/images/` and import it at the top of that file; without one, the card has no image. Then write `src/content/projects/<slug>.mdx` with the same `slug`. The page `/projects/<slug>` is generated at build time; a slug without an entry in the array is a 404. Use `Facts`, `Fact` and `Quote` from `src/components/CaseStudy.tsx` for the "At a glance" list and testimonials, and `DiagramFigure` from `src/components/diagrams/` for diagrams.
- **Testimonials:** the `testimonials` array in `src/sections/Testimonials.tsx`.
- **Toolbox and hobbies:** the `toolboxItems` and `hobbies` arrays in `src/sections/About.tsx`. Icons go in `src/assets/icons/`.
- **Hero text and contact links:** `src/sections/Hero.tsx`, `src/components/ContactModal.tsx` and `src/sections/Footer.tsx`.
- **SEO:** `metadata` in `src/app/layout.tsx`, the Open Graph image (`public/og-image.jpg`, 1200×630) and the structured data (`personJsonLd`) in `src/app/page.tsx`.
- **Blog posts:** not published yet; the Blog section is a placeholder. Posts will be MDX files in this repository ([#5](https://github.com/LeoCunhaLabz/My-Portfolio/issues/5)).
- **CV:** not on the site yet ([#8](https://github.com/LeoCunhaLabz/My-Portfolio/issues/8)).

Keep source images at about twice their largest displayed size. `next/image` serves 1x and 2x versions based on the source width, so oversized files are served oversized.

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
