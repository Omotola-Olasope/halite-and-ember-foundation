# Halite & Ember Foundation website: plan

## Workstream 4: full multi page site, Ink & Mineral (27 September 2026)

Approved and built on `staging` (27 September 2026); founder review in progress on the pull request. This replaces workstream 2 (design system) in practice; workstream 3 (Astro) stays deferred.

Decisions taken with the founder: one typeface, Kulim Park, self hosted from the Google Fonts files. Plain static HTML, no build step. Curated Unsplash photography, downloaded and served as optimised WebP from the repo. The ALX Africa logo is used now, sourced from ALX's public site, and is replaceable if consent is not given. Pico CSS from the brief is dropped: it would fight the bespoke design and add weight for nothing. Responsiveness should equal or beat omotola-olasope.github.io.

Built on `staging`, previewed locally, pull request to `main`. Nothing reaches production without explicit approval.

### Structure
* [ ] `/` Home: hero "Potential should not be limited by opportunity.", exact mission, "Investing in people. Building for the long term.", four principles, two current programmes, closing band
* [ ] `/about/`: mission, the two objects only, principles, "Christian in origin. Universal in service.", our standard
* [ ] `/programmes/`: approach, HEF-2026-001 Data Analytics Scholarship, HEF-2026-002 HEF Bursary, clearly separated Future programmes
* [ ] `/partners/`: ALX Africa with logo, factual description, no trustee interest
* [ ] `/governance/`: three trustees (equal, no hierarchy), independent Selection Lead, Selection Panel wording, written decision files, stewardship and accounts, Legal status (pending, no number)
* [ ] `/contact/`: hello@haliteandemberfoundation.org only
* [ ] Reskin `privacy.html` and `404.html` into the new system without changing the privacy notice wording

### Shared system
* [ ] `assets/css/site.css`: tokens (Ink #111315, Mineral #526B78, Cloud #F3F5F4, Moss #687461, Copper #A66A45), fluid type and spacing via clamp, grid, light and dark themes, AA contrast in both
* [ ] `assets/js/site.js`: theme toggle (respects system, remembers choice), accessible mobile menu (focus trap, Escape, scroll lock), reveal on scroll with reduced motion respected. Site works fully without JS
* [ ] Sticky header with active page marker; footer on every page with the legal status line ready for the charity number
* [ ] Kulim Park woff2 (Latin subset) with metric matched fallback, no layout shift
* [ ] Images: responsive `srcset` WebP, explicit dimensions, lazy loading below the fold, meaningful alt text, no people in distress
* [ ] Per page title, description, canonical, Open Graph; sitemap.xml and robots.txt
* [ ] Remove `fonts/source-serif-4-subset.woff2` once nothing references it

### Verification
* [ ] Every page at 320, 375, 768, 1024, 1440 and 2560px: no horizontal overflow, 44px touch targets, readable measure
* [ ] Keyboard only pass, visible focus, skip link, landmarks
* [ ] Light and dark screenshots of each page
* [ ] Lighthouse on Home and Programmes: 95+ in all four categories
* [ ] Content audit (brief section 16): grep for prohibited terms (Ltd, PorchTalk, Scholars Space, stipend, data top up, device fund, donate, registered charity, charity number), exact mission present on Home and About

### Flagged for the founder (not changed without a decision)
* `privacy.html` currently live says "IF INCLUDED, we buy your data allowance directly" in capitals, and mentions data allowances in two further places. The brief says not to mention data support anywhere. The notice is a legal document, so its wording needs your decision.
* `CLAUDE.md` still says no named programmes may be published. It will be updated to reflect HEF-2026-001 and HEF-2026-002 as live.

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

### Revision, 29 July 2026: centred composition

The founder found the first version left aligned and short of world class. The composition is now a single 40rem column centred on the page, with every element sharing one width so the visual mass sits on the centre line. Two widths were tried first, a wide statement over a narrower body, and rejected: it pulled the mass back off centre and reopened the void on the right.

The statement's line breaks are now set by hand from 512px up, one line each for the name, the predicate and the object. Nothing automatic produces that pattern. `text-wrap: balance` split the Foundation's own name across two lines, and greedy wrapping strands "exists" on the first line at every width above roughly 560px. Below 512px the units run inline and wrap naturally, because forcing them there strands "Foundation" alone.

Verified across eighteen viewport widths from 320px to 2560px: the name holds line one from 480px up, the statement settles into three lines from 560px up, and nothing overflows anywhere. The dark ground was lifted off flat black to a warm near black, which reads as considered rather than cheap and sits further from the company's identity.

Re-measured on the rendered page after the change: cumulative layout shift 0, every colour pairing at AA or better with the lowest at 6.4 to 1, zero external requests, one 34KB font. The full Lighthouse audit was not repeated, because that command was declined; the 100/100/96/100 figures above describe the version before this revision. Nothing affecting asset loading changed, but the audit is worth re-running before the next deploy.

Known follow ups, deliberately left:

* The footer year is hardcoded to 2026 because the page ships zero JavaScript. Workstream 3 generates it at build time. It needs a manual edit before 1 January 2027 if the Astro migration has not landed by then.
* No favicon, pending a mark from the design system.
* `404.html` duplicates the shared CSS foundation because there is no build step to share it yet. Workstream 3 removes the duplication via templates.
* At 320px, the narrowest viewport still in use, one word of the statement sits alone on a line. It is caused by binding "their opportunity" so it cannot split, which is what keeps the last line from stranding between 512px and 639px. The wider band matters more than a 320px screen, so the binding stays.
