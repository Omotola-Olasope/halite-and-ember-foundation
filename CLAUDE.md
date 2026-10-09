# CLAUDE.md

## Project
Public website for the Halite & Ember Foundation, a UK governed philanthropic foundation currently pre registration, served at haliteandemberfoundation.org.

## Stack
Plain static HTML/CSS/JS with no build step, deployed via GitHub Pages from the `main` branch root (CNAME file binds the domain). A migration to Astro with TypeScript and MDX is planned, pending founder confirmation of the written plan in `tasks/todo.md`.

## Commands
Dev: `python3 -m http.server 8000` (static files, no build step)
Build: none yet
Test (single file): none yet
Test (all): none yet
Lint: none yet
Type check: none yet

## Architecture
index.html: Home. Each other page is `<name>/index.html`: about, programmes, partners, governance, contact, privacy, credits, financials
Navigation labels are questions a visitor would ask, while the addresses keep their original names: About us (`/about/`), What we do (`/programmes/`), Who we work with (`/partners/`), Our leadership team (`/governance/`), Contact us (`/contact/`). Financials, Privacy notice and Image credits are footer only
404.html: not found page
Every main page opens with a full bleed hero (photograph behind the headline) and uses the overlay header
Header, mobile menu and footer are duplicated in every page (no build step); change all ten files together (nine pages and `404.html`)
assets/css/site.css: the only stylesheet (tokens, fluid type, light and dark themes)
assets/js/site.js: progressive enhancement only (theme, menu, reveal, copy); every page must work without it
assets/img/: Unsplash photography as WebP at fixed widths, credited in `assets/img/CREDITS.md` and on the public `/credits/` page (keep both in step); `partners/` holds the ALX Africa logo; `trustees/` holds trustee portraits
assets/img/brand/: the Foundation's own logo as outlined SVG in the site palette (Ink, Copper, Cloud). The header symbol is inline SVG in every page; the footer uses `logo-stacked-reversed.svg`. `favicon.svg`, `favicon.ico` and `apple-touch-icon.png` sit at the root. All are generated from the logo package scripts, so regenerate rather than hand edit. The logo lettering is artwork (outlines), not a third site typeface
assets/video/: the Home hero film, a 15 second silent loop in WebM and MP4. `site.js` loads it only on screens 48rem and wider, never for reduced motion or data saving, and shows a pause button; the still `abuja-sunset` is the fallback everywhere else. Film must show places, never people presented as beneficiaries, and be credited like the photographs
assets/fonts/: DM Serif Display and Kulim Park woff2 files, each with its OFL licence
tasks/: plan (`todo.md`) and lessons files

## Rules
The Foundation is a legally independent organisation, not part of Halite & Ember Ltd. Never reuse the company's logo, its dark Montserrat identity, or its contact details on this site.
Never describe the Foundation as a registered charity, display a charity number, or add donation functionality of any kind until the founder confirms registration is complete and supplies the registered footer line.
No fabricated content anywhere a user can reach: no placeholder statistics, invented impact numbers, stock beneficiary photography, fake testimonials, or lorem ipsum.
Only two programmes are live and may be published, under generic names with no internal codes: the Data Analytics Scholarship and the Foundation Bursary, both delivered with ALX Africa. Future programmes, always labelled as not yet started, in this order: music tuition (a grant to an established music association for instruments and teachers), the 2027 editions of the two current programmes (applications from mid to late November 2026), and support for internally displaced people and widows (in development, after registration). The Omotola Scholars Program, the Halite & Ember Arts Fellowship and the Initiative for Education and Enterprise are concepts only and must never appear; no programme is ever named after the founder.
Never mention stipends, data support, data allowances or top ups, or device funds, anywhere on the site, the privacy notice included.
Two typefaces, both self hosted from `assets/fonts/`: DM Serif Display for headlines and display moments, Kulim Park for everything else. Palette: Ink #111315, Mineral #526B78, Cloud #F3F5F4, Moss #687461, Copper #A66A45.
No personal contact details or personal social profiles. The only contact route is hello@haliteandemberfoundation.org.
British English spelling throughout, in copy and code comments alike.
IMPORTANT: GitHub Pages serves the `main` branch, so pushing to `main` is a production deploy. Only push to `main` with explicit founder approval for that specific deploy.

## Out of Scope
CNAME: binds the custom domain, do not edit or delete.
.claude/: local tooling state.
