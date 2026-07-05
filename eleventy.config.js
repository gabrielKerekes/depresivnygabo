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
