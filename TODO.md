# TODO

- [ ] **Analytics (Cloudflare Web Analytics).** Deferred — Cloudflare login is
      currently broken for the owner (social login fails; dashboard returns 401
      on `rum/site_info` in both Brave and Chrome — an auth/session issue, not a
      site problem). The integration is already wired: the beacon in
      `src/_includes/base.njk` stays dormant until `cloudflareToken` is set in
      `src/_data/site.js`. **To finish:** log in (try incognito + email/password
      instead of social) → Web Analytics → Add a site `depresivnygabo.sk` → JS
      beacon method → copy the `token` → paste into `cloudflareToken` → commit +
      push. No cookie banner needed. Fallback if Cloudflare stays broken:
      GoatCounter (free, cookieless, plain email signup).
