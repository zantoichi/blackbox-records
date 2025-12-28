# AGENTS.md ## Purpose Build a static record-label website with Jekyll and host it on GitHub Pages. Commerce will be provided by Fourthwall as

an external site for now. Codex must treat this file as the primary persistent project guidance at startup (it does not
replace reading code
files; it sets conventions and intent). Codex reads `AGENTS.md` before doing work. --- ## Branding and assets policy -
Use placeholders for logos, wordmarks, icons, and any brand imagery.

- Any typography choices should be temporary unless specified. When branding is added at the end: - Replace placeholders
  cleanly without rewriting templates. --- ## Tech stack - Jekyll + Liquid templates
- GitHub Pages hosting/build
- Minimal vanilla JS (only when needed) --- ## Repository conventions Keep the structure predictable: - `_layouts/` :
  layouts (default, page, post, etc.)
- `_includes/` : reusable components (header, footer, nav, card, etc.)
- `_data/` : structured site data (nav, socials, settings, later: payhip products)
- `assets/` : CSS/JS/images
- Optional collections (only if we benefit from them): - `_news/` - `_artists/` - `_releases/` Rules: - Prefer
  data-driven rendering over duplicated markup.
- One obvious place to edit navigation: `_data/nav.yml` (or similar).
- No heavyweight JS frameworks. No build tool sprawl. --- ## Local development (Windows + WebStorm) Assume: - Editing in
  WebStorm on Windows.
- Running Jekyll via Bundler.
- Keep commands in `README.md` and consistent with GitHub Pages build. Enrich `README.md` after you finish a task to be
  a great `README.md` for our usecase. Standard commands: - `bundle install`
- `bundle exec jekyll build` --- ## Codex operating instructions Codex should: 1) Read `_config.yml`, the main layout(
  s), and key includes before editing.

2) Make small, reviewable changes (avoid sweeping refactors) that ideally should become commits using the Conventional
   Commits specification.
3) Verify build success locally (`jekyll build`) before claiming completion. Codex should NOT: - Introduce unsupported
   GitHub Pages plugins without explicit instruction. --- ## CSS strategy - Define tokens as CSS variables (type scale,
   spacing scale, container width, breakpoints).

- Keep component styles near their component naming (or grouped by component page-section-standard-spacing).
- Ensure accessible defaults: focus states, readable contrast, sensible line-height. --- ## Definition of done (each
  task) A task is done when: - `bundle exec jekyll build` succeeds.
- Fonts are okay to be placeholders.
- No non-placeholder branding assets are added before final phase.
- No Payhip code is added before Phase 2 (unless explicitly authorized).
