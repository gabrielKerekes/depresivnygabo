const { feedPlugin } = require("@11ty/eleventy-plugin-rss");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  // Give every h2/h3 a stable id so the table of contents can link to it.
  eleventyConfig.amendLibrary("md", (md) => {
    md.use(markdownItAnchor, {
      level: [2, 3],
      slugify: (s) => eleventyConfig.getFilter("slugify")(s),
      tabIndex: false,
    });
  });
  // Copy static assets straight through to the output folder.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  // Self-contained mobile editor at /edit/ — copied verbatim (no templating, no
  // layout) so nothing in the build can touch the page that holds the token.
  // Ignoring it as a template keeps its raw HTML/JS untouched by Nunjucks and
  // out of collections (so it never lands in the sitemap or the feed).
  eleventyConfig.ignores.add("src/edit/**");
  eleventyConfig.addPassthroughCopy("src/edit");
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });

  // Atom feed at /feed.xml so readers can subscribe.
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: {
      name: "post",
      limit: 20,
    },
    metadata: {
      language: "sk",
      title: "depresívny gabo",
      subtitle: "Osobný blog.",
      base: "https://depresivnygabo.sk/",
      author: {
        name: "Gabo",
      },
    },
  });

  // "3. júl 2026" style dates for humans.
  eleventyConfig.addFilter("readableDate", (dateObj) =>
    new Date(dateObj).toLocaleDateString("sk-SK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  );

  // "2026-07-03" for <time datetime="...">.
  eleventyConfig.addFilter(
    "htmlDateString",
    (dateObj) => new Date(dateObj).toISOString().split("T")[0],
  );

  // Digital-garden growth stages. A post's `stage:` front-matter maps to an
  // emoji, a Slovak label and a one-line description. Exposed as a filter so it
  // is reachable from inside Nunjucks macros (page data is not).
  const stages = {
    seedling: {
      emoji: "🌱",
      label: "klíčok",
      description: "Čerstvý nápad — ešte len klíči a bude sa vyvíjať.",
      banner:
        "🌱 Toto je zatiaľ len klíčok — čerstvá myšlienka, ktorá sa ešte len rodí a bude rásť.",
    },
    budding: {
      emoji: "🌿",
      label: "rastie",
      description: "Rozpracovaná myšlienka, ktorá sa ešte formuje.",
      banner: "🌿 Toto ešte rastie — myšlienku priebežne dopĺňam a formujem.",
    },
    evergreen: {
      emoji: "🌳",
      label: "dozreté",
      description: "Dozretý článok, ktorý považujem za dokončený.",
    },
  };
  eleventyConfig.addFilter("stageInfo", (stage) => stages[stage] || null);

  // Estimated reading time in whole minutes (~200 words/min), min 1. Strips the
  // HTML tags from rendered content before counting words.
  eleventyConfig.addFilter("readingTime", (html) => {
    const text = String(html || "").replace(/<[^>]+>/g, " ");
    const words = (text.match(/\S+/g) || []).length;
    return Math.max(1, Math.round(words / 200));
  });

  // Build a flat table of contents from the h2/h3 headings in rendered post
  // HTML. Returns "" when there are fewer than two headings (not worth a TOC).
  // Levels are distinguished by class so the markup stays simple and CSS
  // handles the indentation.
  eleventyConfig.addFilter("toc", (html) => {
    const re = /<h([23])[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi;
    const headings = [];
    let m;
    while ((m = re.exec(String(html || ""))) !== null) {
      const text = m[3].replace(/<[^>]+>/g, "").trim();
      if (text) headings.push({ level: m[1], id: m[2], text });
    }
    if (headings.length < 2) return "";
    const items = headings
      .map(
        (h) =>
          `<li class="toc-l${h.level}"><a href="#${h.id}">${h.text}</a></li>`,
      )
      .join("");
    return `<ul class="toc-list">${items}</ul>`;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
