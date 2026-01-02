# BlackBox Records

Static Jekyll site for the BlackBox Records label. Built for GitHub Pages, with
content managed via Decap CMS.

## Stack

- Jekyll + Liquid templates
- Sass (partials in `_sass/`, entrypoint `assets/css/site-styles.scss`)
- Vanilla JavaScript (`assets/js/site-interactions.js`)
- Decap CMS (`/admin`)

## Local development

1. `bundle install`
2. `bundle exec jekyll serve --config _config.yml,_config.local.yml`
3. Open `http://127.0.0.1:4000`

## CMS (Decap)

The admin UI lives at `/admin`.

Local editing uses the Decap proxy server:

1. In one terminal: `bundle exec jekyll serve --config _config.yml,_config.local.yml`
2. In another terminal: `npx decap-server`
3. Open `http://127.0.0.1:4000/admin/`

Commit messages are configured in `admin/config.yml` to follow Conventional
Commits.

## Content sources

- Home sections: `_data/home.yml`
- Artists roster: `_artists/`
- Releases: `_releases/`
- News: `_news/`
- About content: `_data/about.yml`
- Newsletter: `_data/newsletter.yml`
- Navigation: `_data/nav.yml`
- Social links: `_data/socials.yml`
- Site settings: `_data/settings.yml`
- Page front matter: `index.md`, `about/index.md`, `artists/index.md`,
  `news/index.md`, `releases/index.md`, `shop/index.md`

## Shop

The shop page redirects to the external Fourthwall store.

## Build

- `bundle exec jekyll build`

## Deployment

GitHub Pages builds from `main` using `_config.yml`. Keep plugins compatible    
with GitHub Pages.

## Licensing

- Code is MIT-licensed. See `LICENSE`.
- Media assets in `/assets` are CC BY-ND 4.0. See `ASSETS_LICENSE.md`.
