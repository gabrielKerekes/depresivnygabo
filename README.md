# depresivnygabo.sk

Personal blog. Static site built with [Eleventy (11ty)](https://www.11ty.dev/),
served from a home server (gk-server) through Cloudflare, cookieless analytics via
[Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/).

## Writing a new post

1. Create a Markdown file in `src/posts/`, named with a leading date:
   `src/posts/2026-07-03-my-title.md`
2. Start it with front-matter:
   ```
   ---
   title: My title
   date: 2026-07-03
   ---
   ```
3. Write Markdown below it.
4. `git commit` + `git push` → GitHub Actions builds and publishes automatically
   (usually live within a minute).

## Local preview (optional)

Requires [Node.js](https://nodejs.org/) (e.g. `brew install node`):

```bash
npm install
npm run serve   # live preview at http://localhost:8080
npm run build   # one-off build into _site/
```

## Project layout

```
src/
  _includes/     HTML layouts (base.njk, post.njk)
  _data/site.js  Site-wide settings (title, analytics token, ...)
  posts/         One Markdown file per article
  css/style.css  All styling
  index.njk      Homepage (list of posts)
  about.md       About page
  CNAME          Leftover from GitHub Pages (harmless)
.github/workflows/deploy.yml   Build on push / schedule, publish to the `site` branch
```

---

## One-time setup checklist

### 1. Create the GitHub repo and push

```bash
cd depresivnygabo
git init
git add .
git commit -m "Initial blog scaffold"
git branch -M main
# create an empty repo named "depresivnygabo" on github.com first, then:
git remote add origin git@github.com:<your-username>/depresivnygabo.git
git push -u origin main
```

### 2. Hosting

GitHub Actions builds the site and force-pushes the output to the `site`
branch. The home server ([gk-server](https://github.com/gabrielKerekes/gk-server),
stack `depresivnygabo`) pulls that branch every minute and serves it through a
Cloudflare Tunnel. DNS for `depresivnygabo.sk` is on Cloudflare (moved from
hostcreators.sk on 2026-11-22; email records still point at hostcreators).
A new post is live about a minute after the workflow finishes.

### 3. Set up analytics (Cloudflare Web Analytics)

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/) →
   **Web Analytics** → **Add a site**, enter `depresivnygabo.sk` (the zone is
   already on Cloudflare) — choose the JS-snippet (beacon) method.
2. It shows a snippet containing `data-cf-beacon='{"token":"..."}'`. Copy that
   long hex **token** and paste it into `cloudflareToken` in
   `src/_data/site.js`, then commit + push.
3. It's cookieless and needs **no cookie/consent banner**. Stats live in the
   Cloudflare dashboard (there is no on-page view counter).

To disable analytics, set `cloudflareToken: ""` in `src/_data/site.js`.
