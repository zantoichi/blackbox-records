# AGENTS.md

## Purpose

Build a static record-label website with Jekyll and host it on GitHub Pages. Commerce will be provided by Payhip Free,
embedded into a “Shop” section, but the store is implemented LAST.

Codex must treat this file as the primary persistent project guidance at startup (it does not replace reading code
files; it sets conventions and intent). Codex reads `AGENTS.md` before doing work.

---

## Current Phase and Sequencing

Phase 0 (now): Site structure + layout system + content scaffolding + CSS foundations.
Phase 1: Core pages (Home, Artists, Releases, News, Shows, About, Contact) with placeholder content.
Phase 2 (last): Payhip “Shop” integration + production product wiring.

Hard rule:

- DO NOT implement the store until the last phase unless explicitly instructed.

---

## Branding and assets policy

Until final phase:

- Use placeholders for logos, wordmarks, icons, and any brand imagery.
- Do not pull assets from reference sites.
- Any typography choices should be temporary unless specified.

When branding is added at the end:

- Replace placeholders cleanly without rewriting templates.

---

Workflow:

---

## Tech stack

- Jekyll + Liquid templates
- GitHub Pages hosting/build
- Minimal vanilla JS (only when needed) but ideally typescript
- Payhip Free embedded checkout/cart (implemented last)

---

## Repository conventions

Keep the structure predictable:

- `_layouts/` : layouts (default, page, post, etc.)
- `_includes/` : reusable components (header, footer, nav, card, etc.)
- `_data/` : structured site data (nav, socials, settings, later: payhip products)
- `assets/` : CSS/JS/images
- Optional collections (only if we benefit from them):
    - `_artists/`
    - `_releases/`
    - `_news/`
    - `_shows/`

Rules:

- Prefer data-driven rendering over duplicated markup.
- One obvious place to edit navigation: `_data/nav.yml` (or similar).
- No heavyweight JS frameworks. No build tool sprawl.

---

## Local development (Windows + WebStorm)

Assume:

- Editing in WebStorm on Windows.
- Running Jekyll via Bundler.
- Keep commands in `README.md` and consistent with GitHub Pages build.

Standard commands:

- `bundle install`
- `bundle exec jekyll serve --livereload`
- `bundle exec jekyll build`

If Ruby on Windows becomes painful, use WSL2 for running the Jekyll commands, but keep the repo editable in WebStorm.

---

## Codex operating instructions

Codex should:

1) Read `_config.yml`, the main layout(s), and key includes before editing.
2) Make small, reviewable changes (avoid sweeping refactors) that ideally should become commits using the Conventional
   Commits specification.
3) Follow the sequencing rules (no Payhip until Phase 2).
4) Keep CSS consistent with the design tokens (type scale + spacing scale).
5) Verify build success locally (`jekyll build`) before claiming completion.

Codex should NOT:

- Introduce unsupported GitHub Pages plugins without explicit instruction.
- Copy code/assets from reference sites.
- Implement store logic early.

---

## CSS strategy

- Define tokens as CSS variables (type scale, spacing scale, container width, breakpoints).
- Keep component styles near their component naming (or grouped by component section).
- Ensure accessible defaults: focus states, readable contrast, sensible line-height.

---

## Payhip integration plan (Phase 2 only)

Approach:

- Create `/shop/` page that lists products and renders Payhip buttons.
- Include Payhip script once globally (layout head).
- Use Payhip “theme=none” and style buttons locally.

Data:

- Add `_data/payhip.yml` (or JSON) listing products: id, name, price_display, link, mode (cart|buy), etc.
- No hardcoding product IDs inside templates.

Implementation detail reminder:

- Payhip embed requires loading `https://payhip.com/payhip.js` and adding anchor tags with Payhip classes/data
  attributes.

---

## Definition of done (each task)

A task is done when:

- `bundle exec jekyll build` succeeds.
- Fonts are okay to be placeholders.
- No non-placeholder branding assets are added before final phase.
- No Payhip code is added before Phase 2 (unless explicitly authorized).
