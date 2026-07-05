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
  _includes/macros.njk  Shared Nunjucks macros (post-list item, tag chips, stage badge)
  _data/site.js  Site-wide config (title, author, analytics token)
  posts/         One Markdown file per article
  posts/posts.json  Directory data: applies post.njk layout + "/{slug}/" permalink
  css/style.css  All styling (dark/light via prefers-color-scheme)
  index.njk      Homepage — lists posts (collections.post)
  tema.njk       One page per topic tag → /tema/<slug>/ (paginated over collections)
  temy.njk       Topics index → /temy/
  sitemap.njk    /sitemap.xml    robots.njk  /robots.txt
  about.md       About page
  CNAME          Pins the custom domain (copied to output on build)
eleventy.config.js  Plugins (Atom feed, heading anchors) + filters (dates, stageInfo, readingTime, toc)
.github/workflows/deploy.yml   CI: build + deploy
```

## Adding a post

Create `src/posts/YYYY-MM-DD-slug.md` with front-matter:

```
---
title: Title here
date: 2026-07-03
updated: 2026-07-05      # optional — "last tended" date (see below)
stage: seedling          # optional — growth stage (see below)
tags:                    # optional — topic tags (the "post" tag is added automatically)
  - depresia
---
```

Then Markdown below. The URL becomes `/slug/` (11ty strips the date prefix from
the filename). Commit + push to `main` → live in ~1 minute.

Optional front-matter fields (all safe to omit):

- **`draft: true`** — marks a post as not yet finished. Draft posts still publish
  and appear in the list (this site has no separate preview build), but show a
  "koncept" badge on the homepage and a banner on the post page. Remove the flag
  once finished.
- **`stage:`** — a digital-garden growth stage, independent of `draft`. One of
  `seedling` (🌱 klíčok), `budding` (🌿 rastie) or `evergreen` (🌳 vyzreté).
  Rendered as a badge on the homepage and in the post header; the label/emoji
  mapping lives in the `stageInfo` filter in `eleventy.config.js`.
- **`updated:`** — the "last tended" date. When set, the post header shows both a
  "zasadené" (planted = `date`) and an "ošetrené" (tended = `updated`) date, and
  the sitemap/JSON-LD use it. Leave it off for posts that haven't been revised.
- **`tags:`** — topic tags. Each generates a page at `/tema/<slug>/`, all are
  listed at `/temy/`, and chips appear under the article. The internal `post`
  tag is merged in automatically via Eleventy's data deep merge.

Other niceties that need no front-matter: an Atom feed at `/feed.xml`, a
`/sitemap.xml` + `/robots.txt`, an estimated **reading time** (computed from the
content), and a **table of contents** auto-built from a post's `h2`/`h3`
headings (only shown when there are at least two — collapsed on mobile, a sticky
sidebar on wide screens).

## Local dev

Requires Node (not installed on the owner's machine as of setup;
`brew install node`):

```
npm install
npm run serve   # http://localhost:8080
npm run build   # one-off build into _site/
```

## Conventions & gotchas

- **Commit and push straight to `main`.** This is a solo personal-blog repo
  with no branch protection or review process — there's no need for feature
  branches or pull requests here. Always commit and push directly to `main`.
- **Rebase, never merge commits.** The Format workflow
  (`.github/workflows/format.yml`) auto-formats with Prettier and pushes a
  commit back to `main`, so local and remote will diverge whenever you have an
  unpushed commit. Always reconcile with `git pull --rebase` (never a plain
  `git pull`/merge) to keep history linear — no merge commits, ever. Setting
  `git config pull.rebase true` and `git config rebase.autoStash true` makes
  this the default.
- **Prettier formats the source.** `npm run format` (Markdown, CSS, JS, JSON;
  config in `.prettierrc.json`, exclusions in `.prettierignore`). Nunjucks
  `.njk` templates are excluded — Prettier has no Nunjucks parser and mangles
  the tags. `proseWrap` is `preserve`, so post prose is never reflowed.
- **Nunjucks, not JS**: templates use `==` not `===`, `{% if %}`, `| filter`.
- **Content language is Slovak** (site UI strings, posts). `lang="sk"`. All
  user-facing text (page copy, nav labels, buttons, empty states, etc.) must be
  written in Slovak. Non-user-facing text (code, comments, commit messages,
  variable names) stays in English.
- **Don't editorialize the owner's draft text.** He often writes post content
  without diacritics/accents and asks for it to be typeset properly. Only fix
  diacritics, spelling, and obvious typos — do not add, remove, or reinterpret
  words (e.g. inserting a negation) based on inferred logic or what "makes
  more sense" in context, even if the literal wording looks contradictory or
  ambiguous. If something genuinely seems like a typo/mistake, ask rather than
  guessing at the intended meaning.
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
