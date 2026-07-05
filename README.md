# depresivnygabo.sk

Personal blog. Static site built with [Eleventy (11ty)](https://www.11ty.dev/),
hosted free on GitHub Pages, cookieless analytics via
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
  CNAME          Custom domain for GitHub Pages
.github/workflows/deploy.yml   Auto-build + deploy on push to main
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

### 2. Enable GitHub Pages

Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The included workflow does the rest. The first push triggers a deploy.

### 3. Point the domain (at your .sk registrar's DNS)

Add these records for `depresivnygabo.sk`:

| Type  | Host / Name | Value                      |
| ----- | ----------- | -------------------------- |
| A     | @           | 185.199.108.153            |
| A     | @           | 185.199.109.153            |
| A     | @           | 185.199.110.153            |
| A     | @           | 185.199.111.153            |
| AAAA  | @           | 2606:50c0:8000::153        |
| AAAA  | @           | 2606:50c0:8001::153        |
| AAAA  | @           | 2606:50c0:8002::153        |
| AAAA  | @           | 2606:50c0:8003::153        |
| CNAME | www         | <your-username>.github.io. |

Then in Repo → Settings → Pages → **Custom domain**, enter
`depresivnygabo.sk`, save, and tick **Enforce HTTPS** once the cert is issued
(can take a few minutes to an hour). The `src/CNAME` file already pins the
domain on every build.

### 4. Set up analytics (Cloudflare Web Analytics)

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/) →
   **Web Analytics** → **Add a site**, enter `depresivnygabo.sk`. No need to
   move your DNS to Cloudflare — choose the JS-snippet (beacon) method.
2. It shows a snippet containing `data-cf-beacon='{"token":"..."}'`. Copy that
   long hex **token** and paste it into `cloudflareToken` in
   `src/_data/site.js`, then commit + push.
3. It's cookieless and needs **no cookie/consent banner**. Stats live in the
   Cloudflare dashboard (there is no on-page view counter).

To disable analytics, set `cloudflareToken: ""` in `src/_data/site.js`.
