// "Market weather" for /trhy/: a handful of well-known stress gauges, each
// scored 0 (calm) and up, summed into one of five weather levels. Runs at
// build time from the same daily closes the chart uses (see
// src/_data/markets.js). Thresholds are rules of thumb, not a model — tune
// them here. A signal whose tickers are missing is skipped.

// Weather levels by total score (lower bound inclusive).
const LEVELS = [
  {
    min: 0,
    icon: "☀️",
    name: "Jasno",
    text: "Na trhoch je pokoj. Nič sa nedeje.",
  },
  {
    min: 2,
    icon: "🌤️",
    name: "Polojasno",
    text: "Bežný šum. Občas mráčik, nič vážne.",
  },
  {
    min: 4,
    icon: "☁️",
    name: "Zamračené",
    text: "Trhy sú nervózne. Oplatí sa sledovať.",
  },
  { min: 6, icon: "🌧️", name: "Búrka", text: "Je tu strach. Niečo sa deje." },
  {
    min: 9,
    icon: "⛈️",
    name: "Víchrica",
    text: "Panika. Takto vyzerajú krízy.",
  },
];

// Last close at or before `day` (series days are sorted ascending).
function idxAt(s, day) {
  let lo = 0,
    hi = s.days.length - 1;
  if (hi < 0 || s.days[0] > day) return -1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (s.days[mid] <= day) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}
const at = (s, day) => {
  const i = idxAt(s, day);
  return i < 0 ? null : s.prices[i];
};
// % change over the last `n` calendar days.
const change = (s, day, n) => {
  const a = at(s, day - n),
    b = at(s, day);
  return a == null || b == null ? null : (b / a - 1) * 100;
};
// % below the highest close of the last `n` calendar days.
const drawdown = (s, day, n) => {
  const i = idxAt(s, day);
  if (i < 0) return null;
  let hi = -Infinity;
  for (let j = i; j >= 0 && s.days[j] > day - n; j--)
    hi = Math.max(hi, s.prices[j]);
  return (s.prices[i] / hi - 1) * 100;
};
// Average of the last `n` closes.
const average = (s, day, n) => {
  const i = idxAt(s, day);
  if (i < n - 1) return null;
  let sum = 0;
  for (let j = i - n + 1; j <= i; j++) sum += s.prices[j];
  return sum / n;
};

const fmt = (day) =>
  new Date(day * 86400000).toLocaleDateString("sk-SK", {
    timeZone: "UTC",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
// HYG pays a monthly dividend, which nudges its raw price down; its
// thresholds below are loose enough to absorb that.
const pct = (v) =>
  (v > 0 ? "+" : v < 0 ? "−" : "") +
  Math.abs(v).toFixed(1).replace(".", ",") +
  " %";

// Each signal returns { score, value, note } or null when data is missing.
const SIGNALS = [
  {
    id: "vix",
    name: "Index strachu (VIX)",
    needs: ["^VIX"],
    calc(day, { "^VIX": vix }) {
      const v = at(vix, day);
      if (v == null) return null;
      const value = v.toFixed(1).replace(".", ",");
      if (v >= 30) return { score: 2, value, note: "panika (nad 30)" };
      if (v >= 20) return { score: 1, value, note: "nervozita (20–30)" };
      return { score: 0, value, note: "pokoj (pod 20)" };
    },
  },
  {
    id: "combo",
    name: "Strach vs. pokles (5 dní)",
    needs: ["^VIX", "SPY"],
    calc(day, { "^VIX": vix, SPY: spy }) {
      const dv = change(vix, day, 7),
        ds = change(spy, day, 7);
      if (dv == null || ds == null) return null;
      const value = "VIX " + pct(dv) + ", S&P " + pct(ds);
      if (dv >= 25 && ds <= -2)
        return {
          score: 2,
          value,
          note: "VIX vyskočil, S&P padá — strach je skutočný",
        };
      if (dv >= 25)
        return {
          score: 1,
          value,
          note: "VIX rastie, hoci akcie držia — niekto sa poisťuje",
        };
      if (ds <= -2)
        return { score: 1, value, note: "akcie padajú, ale bez paniky" };
      return { score: 0, value, note: "pokojný týždeň" };
    },
  },
  {
    id: "drawdown",
    name: "S&P 500 pod vrcholom",
    needs: ["SPY"],
    calc(day, { SPY: spy }) {
      const d = drawdown(spy, day, 365);
      if (d == null) return null;
      const value = pct(d);
      if (d <= -20)
        return { score: 3, value, note: "medvedí trh (−20 % a viac)" };
      if (d <= -10) return { score: 2, value, note: "korekcia (−10 % a viac)" };
      if (d <= -5) return { score: 1, value, note: "pokles" };
      return { score: 0, value, note: "blízko vrcholu" };
    },
  },
  {
    id: "trend",
    name: "Trend S&P 500",
    needs: ["SPY"],
    calc(day, { SPY: spy }) {
      const ma = average(spy, day, 200),
        v = at(spy, day);
      if (ma == null || v == null) return null;
      const value = pct((v / ma - 1) * 100) + " voči priemeru";
      return v < ma
        ? { score: 1, value, note: "pod 200-dňovým priemerom" }
        : { score: 0, value, note: "nad 200-dňovým priemerom" };
    },
  },
  {
    id: "credit",
    name: "Rizikové dlhopisy (HYG)",
    needs: ["HYG"],
    calc(day, { HYG: hyg }) {
      const d = drawdown(hyg, day, 91);
      if (d == null) return null;
      const value = pct(d) + " od vrcholu";
      if (d <= -6) return { score: 2, value, note: "úverový stres" };
      if (d <= -3.5) return { score: 1, value, note: "veritelia znervózňujú" };
      return { score: 0, value, note: "v pokoji" };
    },
  },
  {
    id: "safety",
    name: "Útek do bezpečia (1 mesiac)",
    needs: ["SPY", "TLT", "GLD"],
    calc(day, { SPY: spy, TLT: tlt, GLD: gld }) {
      const ds = change(spy, day, 30),
        dt = change(tlt, day, 30),
        dg = change(gld, day, 30);
      if (ds == null || dt == null || dg == null) return null;
      const value = "dlhopisy " + pct(dt) + ", zlato " + pct(dg);
      if (ds <= -3 && (dt >= 2 || dg >= 3))
        return { score: 1, value, note: "peniaze utekajú z akcií do istoty" };
      return { score: 0, value, note: "žiadny útek" };
    },
  },
];

// Crypto has its own, wilder baseline: a 20 % drop is a bad month there, not a
// crash. Scored on Bitcoin plus the altcoins in tickers.json.
const ALTS = ["ETH-USD", "SOL-USD", "ADA-USD"];
const CRYPTO_SIGNALS = [
  {
    id: "btc-drawdown",
    name: "Bitcoin pod vrcholom (3 mesiace)",
    needs: ["BTC-USD"],
    calc(day, { "BTC-USD": btc }) {
      const d = drawdown(btc, day, 91);
      if (d == null) return null;
      const value = pct(d);
      if (d <= -50) return { score: 3, value, note: "krypto zima" };
      if (d <= -35) return { score: 2, value, note: "veľký prepad" };
      if (d <= -20) return { score: 1, value, note: "chuť riskovať slabne" };
      return { score: 0, value, note: "v poriadku" };
    },
  },
  {
    id: "btc-week",
    name: "Bitcoin za týždeň",
    needs: ["BTC-USD"],
    calc(day, { "BTC-USD": btc }) {
      const c = change(btc, day, 7);
      if (c == null) return null;
      const value = pct(c);
      if (c <= -20) return { score: 2, value, note: "krach" };
      if (c <= -10) return { score: 1, value, note: "prudký pokles" };
      return { score: 0, value, note: "bežný týždeň" };
    },
  },
  {
    id: "btc-trend",
    name: "Trend Bitcoinu",
    needs: ["BTC-USD"],
    calc(day, { "BTC-USD": btc }) {
      const ma = average(btc, day, 200),
        v = at(btc, day);
      if (ma == null || v == null) return null;
      const value = pct((v / ma - 1) * 100) + " voči priemeru";
      return v < ma
        ? { score: 1, value, note: "pod 200-dňovým priemerom" }
        : { score: 0, value, note: "nad 200-dňovým priemerom" };
    },
  },
  {
    id: "btc-vol",
    name: "Rozkolísanosť Bitcoinu (30 dní)",
    needs: ["BTC-USD"],
    calc(day, { "BTC-USD": btc }) {
      const v = volatility(btc, day, 30);
      if (v == null) return null;
      const value = Math.round(v) + " % ročne";
      if (v >= 80) return { score: 2, value, note: "divoké výkyvy" };
      if (v >= 60) return { score: 1, value, note: "nepokojné" };
      return { score: 0, value, note: "pokojné" };
    },
  },
  {
    id: "alts",
    name: "Altcoiny vs. Bitcoin (1 mesiac)",
    needs: ["BTC-USD"],
    calc(day, bySym) {
      const b = change(bySym["BTC-USD"], day, 30);
      const alts = ALTS.filter((s) => bySym[s])
        .map((s) => change(bySym[s], day, 30))
        .filter((c) => c != null);
      if (b == null || !alts.length) return null;
      const gap = alts.reduce((a, c) => a + c, 0) / alts.length - b;
      const value = pct(gap) + " voči BTC";
      if (gap <= -15)
        return { score: 2, value, note: "útek z rizikovejších mincí" };
      if (gap <= -7) return { score: 1, value, note: "altcoiny zaostávajú" };
      return { score: 0, value, note: "držia krok" };
    },
  },
];

// Annualised volatility of daily returns over the last `n` calendar days.
function volatility(s, day, n) {
  const i = idxAt(s, day);
  const r = [];
  for (let j = i; j > 0 && s.days[j] > day - n; j--)
    r.push(Math.log(s.prices[j] / s.prices[j - 1]));
  if (r.length < 10) return null;
  const m = r.reduce((a, x) => a + x, 0) / r.length;
  const sd = Math.sqrt(
    r.reduce((a, x) => a + (x - m) ** 2, 0) / (r.length - 1),
  );
  return sd * Math.sqrt(365) * 100;
}

// The two forecasts. `mins` maps a total score to a level (index into
// LEVELS), lower bound inclusive. `clock` is the ticker whose trading days
// drive the history strip.
const GROUPS = [
  {
    id: "fiat",
    title: "Akcie",
    clock: "SPY",
    signals: SIGNALS,
    mins: [0, 2, 4, 6, 9],
  },
  {
    id: "crypto",
    title: "Krypto",
    clock: "BTC-USD",
    signals: CRYPTO_SIGNALS,
    mins: [0, 2, 4, 5, 7],
  },
];

function levelOf(score, mins) {
  let l = 0;
  mins.forEach((m, i) => {
    if (score >= m) l = i;
  });
  return l;
}

function evaluate(group, day, bySym) {
  let total = 0;
  const signals = [];
  for (const sig of group.signals) {
    if (!sig.needs.every((s) => bySym[s])) continue;
    const r = sig.calc(day, bySym);
    if (!r) continue;
    total += r.score;
    signals.push({ id: sig.id, name: sig.name, ...r });
  }
  return signals.length
    ? { score: total, level: levelOf(total, group.mins), signals }
    : null;
}

// The overall forecast is the average of the two levels, rounded up: one
// stormy market and one calm one make it cloudy, not stormy.
const combine = (levels) =>
  Math.ceil(levels.reduce((a, l) => a + l, 0) / levels.length);

const withLevel = (level) => ({ level, ...LEVELS[level] });

// Today's weather for each group and combined, plus a daily history for the
// last year (one entry per trading day of each group's clock).
module.exports = function mood(series) {
  const bySym = Object.fromEntries(series.map((s) => [s.symbol, s]));
  const groups = [];
  for (const g of GROUPS) {
    const clock = bySym[g.clock];
    if (!clock) continue;
    const today = clock.days[clock.days.length - 1];
    const now = evaluate(g, today, bySym);
    if (!now) continue;
    const days = clock.days.filter((d) => d > today - 365);
    const levelOn = new Map(
      days.map((d) => [d, (evaluate(g, d, bySym) || now).level]),
    );
    groups.push({
      id: g.id,
      title: g.title,
      date: fmt(today),
      today,
      ...now,
      ...LEVELS[now.level],
      levelOn,
      history: days.map((d) => ({ date: fmt(d), level: levelOn.get(d) })),
    });
  }
  if (!groups.length) return null;

  // Combined history on the first group's days (stock trading days), using
  // each group's latest level at or before that day.
  const base = groups[0];
  const lastLevel = (g, d) => {
    let l = null;
    for (const [day, lv] of g.levelOn) if (day <= d) l = lv;
    return l;
  };
  const history = [...base.levelOn.keys()].map((d) => {
    const ls = groups.map((g) => lastLevel(g, d)).filter((l) => l != null);
    return { date: fmt(d), level: combine(ls) };
  });
  const today = Math.max(...groups.map((g) => g.today));
  groups.forEach((g) => {
    delete g.levelOn;
    delete g.today;
  });
  return {
    date: fmt(today),
    ...withLevel(combine(groups.map((g) => g.level))),
    groups,
    levels: LEVELS,
    history,
  };
};
module.exports.GROUPS = GROUPS;
module.exports.evaluate = evaluate;
