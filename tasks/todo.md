# Halite & Ember Foundation website: plan

Status: confirmed by the founder on 28 July 2026. Workstream 1 is built and awaiting review on a pull request. Workstreams 2 and 3 are not started.

## Workstream 1: holding page (ships independently, first)

* [x] Delete `about/` (legacy company About/Contact page currently live on the Foundation domain)
* [x] Delete template assets: Swiper bundle, template CSS/JS/SCSS, `logo_black.png`, `logo_white.png`
* [x] Build a new single `index.html`: Foundation name set as type, the mission line, two or three sentences on purpose across education, enterprise, the arts and youth development, one line stating the Foundation is being established, contact via hello@haliteandemberfoundation.org, footer with name and current year
* [x] Self host a subset serif as woff2 with sizing safeguards against layout shift, no CDN requests, zero JavaScript
* [x] Accurate metadata only: title, description, canonical; no structured data claiming charitable status; remove the broken favicon reference
* [x] Verify locally: semantic HTML, keyboard navigation, visible focus, WCAG AA contrast, reduced motion respected, no layout shift, Lighthouse 95+ in all four categories
* [x] Commit in logical units; push to `main` only on explicit founder approval, since GitHub Pages serves `main`

## Workstream 2: design system (documented, not yet applied to public pages)

* [ ] Design tokens: colour, type scale, spacing, radii, motion
* [ ] Typographic system: editorial serif plus interface sans, self hosted, subset, no layout shift
* [ ] Base components: buttons, links, cards, layout primitives, navigation, footer
* [ ] Image and story components that enforce dignity patterns: required alt text, named subjects, no anonymous beneficiary captions
* [ ] Component gallery at an unlinked route with noindex
* [ ] Light theme first; token structure ready for dark if warranted later

## Workstream 3: architecture and pipeline

* [ ] Astro scaffold with TypeScript and MDX, fully static output
* [ ] Content collections with typed (zod) frontmatter: programmes, stories, trustees, reports, policies
* [ ] Route stubs, unpublished and unlinked: About, What we do (Education, Enterprise, Arts, Youth Development), Programmes, Governance, Stories, Support, Contact
* [ ] GitHub Actions workflow building Astro and deploying to Pages; keep CNAME; switch Pages source from legacy branch serving to Actions
* [ ] Branch preview path for review before production

## Review: workstream 1

Measured with Lighthouse 12.8.2, mobile form factor, against the page served locally: Performance 100, Accessibility 100, Best Practices 96, SEO 100. Cumulative Layout Shift 0, Total Blocking Time 0ms, First Contentful Paint 0.6s, Largest Contentful Paint 1.1s.

The single Best Practices deduction is a console 404 for `/favicon.ico`, which follows directly from the decision to ship no favicon until the design system produces a typographic mark. Adding a mark is the only route to 100 in that category.

Two Performance diagnostics flag missing text compression and short cache lifetimes. Both are artefacts of the bare local test server. GitHub Pages compresses responses and sets cache headers, so neither applies in production, and neither cost any score.

Verified by hand as well: the webfont loads and the variable weight axis applies, prose sits at 62 characters per line, prose and footer and colophon rule all align to a single 576px measure, keyboard focus shows a 2px accent ring at 4px offset, and there is no horizontal overflow at 375px or 1280px. Light and dark both render.

Known follow ups, deliberately left:

* The footer year is hardcoded to 2026 because the page ships zero JavaScript. Workstream 3 generates it at build time. It needs a manual edit before 1 January 2027 if the Astro migration has not landed by then.
* No favicon, pending a mark from the design system.
* `404.html` duplicates the shared CSS foundation because there is no build step to share it yet. Workstream 3 removes the duplication via templates.
