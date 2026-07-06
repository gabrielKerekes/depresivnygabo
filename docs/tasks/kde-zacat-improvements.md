# "Kde začať?" section — follow-up ideas

Backlog of improvements for the curated **„Kde začať?"** entry point on the
homepage (added in the initial version as a hardcoded single-post section).

## 1. Make the curated list front-matter–driven

Instead of hardcoding the slug in `src/index.njk`, add a front-matter field on
posts (e.g. `startHere: true`, or `startHere: <order>` for explicit ordering)
and build a `startHere` collection in `eleventy.config.js`. Picking or
reordering starter posts then becomes a one-line edit in the post itself — no
template changes. Worth doing once there are 3+ entry points.

## 2. Give the garden metaphor its own home

The digital-garden metaphor is currently explained only in this section, but
the whole site already leans into it (🌱/🌿/🌳 stage badges). A short
"čo je digitálna záhradka" note on the About page — or a link from the section's
description to it — would give curious readers somewhere to go.

## 3. Subtle visual distinction for the curated card

The „Kde začať?" card currently reuses the exact `.post-list` styling, so it
looks identical to the „Články" list right below it. A light touch (a faint
accent-tinted background or a left accent border) would help it read as
"start here, then browse below" without breaking the minimal look.

## Notes

- The starter post also still appears in the full „Články" list below — the
  curated section is an *additional* highlight, not a move. Revisit if that
  ever feels redundant.
