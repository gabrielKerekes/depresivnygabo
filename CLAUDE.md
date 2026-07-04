# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Personal blog served at **https://depresivnygabo.sk** (owner: Gabo,
GitHub `gabrielKerekes`). Static site, intentionally minimal — plain HTML/CSS
with a light build step. Content is written in Markdown.

## Stack

- **[Eleventy (11ty)](https://www.11ty.dev/)** — static site generator (config in
  `eleventy.config.js`, CommonJS). Templates use **Nunjucks** (`.njk`).
- **GitHub Pages** — free hosting, custom domain, auto HTTPS.
- **GitHub Actions** (`.github/workflows/deploy.yml`) — builds and deploys on
  every push to `main`.
- **Cloudflare Web Analytics** — cookieless, no consent banner. Currently
  dormant (see `TODO.md`).

## Layout

```
src/
  _includes/     Nunjucks layouts (base.njk = shell, post.njk = article)
  _data/site.js  Site-wide config (title, author, analytics token)
  posts/         One Markdown file per article
  posts/posts.json  Directory data: applies post.njk layout + "/{slug}/" permalink
  css/style.css  All styling (dark/light via prefers-color-scheme)
  index.njk      Homepage — lists posts (collections.post)
  about.md       About page
  CNAME          Pins the custom domain (copied to output on build)
.github/workflows/deploy.yml   CI: build + deploy
```

## Adding a post

Create `src/posts/YYYY-MM-DD-slug.md` with front-matter:

```
---
title: Title here
date: 2026-07-03
---
```

Then Markdown below. The URL becomes `/slug/` (11ty strips the date prefix from
the filename). Commit + push to `main` → live in ~1 minute.

Add `draft: true` to the front-matter to mark a post as not yet finished. Draft
posts still publish and appear in the list (this site has no separate preview
build), but show a "koncept" badge on the homepage and a banner on the post
page so it's obvious the content isn't done. Remove the flag once the post is
finished.

## Local dev

Requires Node (not installed on the owner's machine as of setup;
`brew install node`):

```
npm install
npm run serve   # http://localhost:8080
npm run build   # one-off build into _site/
```

## Conventions & gotchas

- **Nunjucks, not JS**: templates use `==` not `===`, `{% if %}`, `| filter`.
- **Content language is Slovak** (site UI strings, posts). `lang="sk"`. All
  user-facing text (page copy, nav labels, buttons, empty states, etc.) must be
  written in Slovak. Non-user-facing text (code, comments, commit messages,
  variable names) stays in English.
- **Analytics token is not a secret** — Cloudflare's beacon token is client-side
  (shipped to every visitor), so it lives in `site.js` in this public repo by
  design. Real secrets would go in GitHub Actions Secrets, never in the repo.
- **Pushing from a sandboxed shell**: SSH (port 22) may be blocked, and macOS
  `osxkeychain` can serve a stale token. If a push over HTTPS fails, use only the
  gh helper and reset the helper list:
  `git -c credential.helper="" -c credential.helper='!gh auth git-credential' push https://github.com/gabrielKerekes/depresivnygabo.git main`
  The `origin` remote is intentionally SSH for the owner's normal use.
- Pushes that touch `.github/workflows/**` need the gh token to have the
  `workflow` scope (`gh auth refresh -s workflow`).

## Ops quick reference

- Repo: https://github.com/gabrielKerekes/depresivnygabo (public)
- Pages build type: `workflow` (GitHub Actions), custom domain `depresivnygabo.sk`
- Check deploys: `gh run list --repo gabrielKerekes/depresivnygabo`
- Pages status: `gh api repos/gabrielKerekes/depresivnygabo/pages`
- Enforce HTTPS (only after the cert is issued):
  `gh api -X PUT repos/gabrielKerekes/depresivnygabo/pages -F https_enforced=true`
