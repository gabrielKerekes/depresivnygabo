const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  // Copy static assets straight through to the output folder.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

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
    })
  );

  // "2026-07-03" for <time datetime="...">.
  eleventyConfig.addFilter("htmlDateString", (dateObj) =>
    new Date(dateObj).toISOString().split("T")[0]
  );

  // Digital-garden growth stages. A post's `stage:` front-matter maps to an
  // emoji, a Slovak label and a one-line description. Exposed as a filter so it
  // is reachable from inside Nunjucks macros (page data is not).
  const stages = {
    seedling: {
      emoji: "🌱",
      label: "klíčok",
      description: "Čerstvý nápad — ešte len klíči a bude sa vyvíjať.",
    },
    budding: {
      emoji: "🌿",
      label: "rastie",
      description: "Rozpracovaná myšlienka, ktorá sa ešte formuje.",
    },
    evergreen: {
      emoji: "🌳",
      label: "vyzreté",
      description: "Vyzretý článok, ktorý považujem za dokončený.",
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
