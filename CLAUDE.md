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
index.html: Home. Each other page is `<name>/index.html`: about, programmes, partners, governance, contact, privacy
404.html: not found page
Every main page opens with a full bleed hero (photograph behind the headline) and uses the overlay header
Header, mobile menu and footer are duplicated in every page (no build step); change all eight together
assets/css/site.css: the only stylesheet (tokens, fluid type, light and dark themes)
assets/js/site.js: progressive enhancement only (theme, menu, reveal, copy); every page must work without it
assets/img/: Unsplash photography as WebP at fixed widths, credited in `assets/img/CREDITS.md`; `partners/` holds the ALX Africa logo; `trustees/` holds trustee portraits
assets/fonts/: DM Serif Display and Kulim Park woff2 files, each with its OFL licence
tasks/: plan (`todo.md`) and lessons files

## Rules
The Foundation is a legally independent organisation, not part of Halite & Ember Ltd. Never reuse the company's logo, its dark Montserrat identity, or its contact details on this site.
Never describe the Foundation as a registered charity, display a charity number, or add donation functionality of any kind until the founder confirms registration is complete and supplies the registered footer line.
No fabricated content anywhere a user can reach: no placeholder statistics, invented impact numbers, stock beneficiary photography, fake testimonials, or lorem ipsum.
Only two programmes are live and may be published, under generic names with no internal codes: the Data Analytics Scholarship and the Foundation Bursary, both delivered with ALX Africa. The Omotola Scholars Program, the Halite & Ember Arts Fellowship and the Initiative for Education and Enterprise are concepts only and must never appear; no programme is ever named after the founder.
Never mention stipends, data support, data allowances or top ups, or device funds, anywhere on the site, the privacy notice included.
Two typefaces, both self hosted from `assets/fonts/`: DM Serif Display for headlines and display moments, Kulim Park for everything else. Palette: Ink #111315, Mineral #526B78, Cloud #F3F5F4, Moss #687461, Copper #A66A45.
No personal contact details or personal social profiles. The only contact route is hello@haliteandemberfoundation.org.
British English spelling throughout, in copy and code comments alike.
IMPORTANT: GitHub Pages serves the `main` branch, so pushing to `main` is a production deploy. Only push to `main` with explicit founder approval for that specific deploy.

## Out of Scope
CNAME: binds the custom domain, do not edit or delete.
.claude/: local tooling state.
