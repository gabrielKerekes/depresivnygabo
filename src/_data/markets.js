// Daily closing prices for the market dashboard at /trhy/.
//
// The ticker list lives in tickers.json — to track another stock or crypto
// pair, add one line there with its Yahoo Finance symbol (e.g. "AAPL",
// "DOGE-USD", "EURUSD=X"). Nothing else needs to change.
//
// Prices come from Yahoo Finance's public (unofficial, keyless) chart endpoint.
// The browser can't call it directly (no CORS), so we fetch at build time and
// the deploy workflow rebuilds the site daily on a schedule. Responses are
// cached for a few hours in .cache/ so `npm run serve` doesn't refetch on every
// save. A ticker that fails to load is skipped (and logged) instead of
// breaking the build.
const EleventyFetch = require("@11ty/eleventy-fetch");
const tickers = require("./tickers.json");
const mood = require("../../lib/mood.js");

const RANGE = "5y"; // longest range the page offers
const CACHE = "6h";

// Six significant digits is plenty for a chart and keeps the JSON small.
const round = (v) => Number(v.toPrecision(6));
// Day number since 1970-01-01 (UTC) — compact and timezone-proof.
const toDay = (ts) => Math.floor(ts / 86400);

async function load(t) {
  const url =
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(t.symbol)}` +
    `?range=${RANGE}&interval=1d`;
  const json = await EleventyFetch(url, {
    duration: CACHE,
    type: "json",
    fetchOptions: {
      headers: { "User-Agent": "Mozilla/5.0 (depresivnygabo.sk)" },
    },
  });
  const r = json.chart.result[0];
  const closes = r.indicators.quote[0].close;
  const days = [];
  const prices = [];
  r.timestamp.forEach((ts, i) => {
    const c = closes[i];
    if (c == null) return;
    const d = toDay(ts);
    // Keep the last close per day (crypto's live candle can share a day).
    if (days.length && days[days.length - 1] === d)
      prices[prices.length - 1] = round(c);
    else {
      days.push(d);
      prices.push(round(c));
    }
  });
  // Today's live price, so the latest value matches what a quote app shows.
  if (r.meta.regularMarketPrice != null) {
    const d = toDay(r.meta.regularMarketTime);
    const p = round(r.meta.regularMarketPrice);
    if (days[days.length - 1] === d) prices[prices.length - 1] = p;
    else if (d > days[days.length - 1]) {
      days.push(d);
      prices.push(p);
    }
  }
  return { ...t, currency: r.meta.currency, days, prices };
}

// Crypto Fear & Greed Index (alternative.me, free, no key): one 0–100 reading
// per day since 2018. Not a price, so it feeds the weather panel only, shaped
// like a series so lib/mood.js can read it the same way.
async function loadFearGreed() {
  const json = await EleventyFetch(
    "https://api.alternative.me/fng/?limit=0&format=json",
    {
      duration: CACHE,
      type: "json",
    },
  );
  const rows = json.data
    .map((r) => [toDay(Number(r.timestamp)), Number(r.value)])
    .sort((a, b) => a[0] - b[0]);
  return {
    symbol: "FNG",
    days: rows.map((r) => r[0]),
    prices: rows.map((r) => r[1]),
  };
}

module.exports = async function () {
  const series = [];
  for (const [slot, t] of tickers.entries()) {
    try {
      // `slot` = position in tickers.json; the page colours by it, so a
      // ticker that fails to load doesn't repaint the others.
      series.push({ ...(await load(t)), slot });
    } catch (e) {
      console.warn(`[markets] ${t.symbol}: ${e.message}`);
    }
  }
  // `mood` is the "market weather" panel (lib/mood.js), rendered into the page.
  const extras = [];
  try {
    extras.push(await loadFearGreed());
  } catch (e) {
    console.warn(`[markets] fear & greed: ${e.message}`);
  }
  const updated = new Date().toISOString();
  return {
    updated,
    series,
    mood: mood([...series, ...extras]),
    // What /trhy/data.json ships to the browser: days delta-encoded (mostly
    // 1s) to keep the file small. The page decodes them back.
    client: {
      updated,
      series: series.map(({ days, ...s }) => ({
        ...s,
        dd: days.map((d, i) => (i ? d - days[i - 1] : d)),
      })),
    },
  };
};
