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
index.html: the holding page
about/: legacy page belonging to the commercial company, scheduled for removal
assets/: template CSS/JS, Swiper bundle and company logos, scheduled for removal
tasks/: plan (`todo.md`) and lessons files

## Rules
The Foundation is a legally independent organisation, not part of Halite & Ember Ltd. Never reuse the company's logo, its dark Montserrat identity, or its contact details on this site.
Never describe the Foundation as a registered charity, display a charity number, or add donation functionality of any kind until the founder confirms registration is complete and supplies the registered footer line.
No fabricated content anywhere a user can reach: no placeholder statistics, invented impact numbers, stock beneficiary photography, fake testimonials, or lorem ipsum.
No named programmes may be published yet. The Omotola Scholars Program, the Halite & Ember Arts Fellowship and the Initiative for Education and Enterprise are concepts only.
No personal contact details or personal social profiles. The only contact route is hello@haliteandemberfoundation.org.
British English spelling throughout, in copy and code comments alike.
IMPORTANT: GitHub Pages serves the `main` branch, so pushing to `main` is a production deploy. Only push to `main` with explicit founder approval for that specific deploy.

## Out of Scope
CNAME: binds the custom domain, do not edit or delete.
.claude/: local tooling state.
