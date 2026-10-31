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
  {
    id: "risk",
    name: "Chuť riskovať (Bitcoin)",
    needs: ["BTC-USD"],
    calc(day, { "BTC-USD": btc }) {
      const d = drawdown(btc, day, 91);
      if (d == null) return null;
      const value = pct(d) + " od vrcholu";
      if (d <= -35)
        return { score: 2, value, note: "investori utekajú od rizika" };
      if (d <= -20) return { score: 1, value, note: "chuť riskovať slabne" };
      return { score: 0, value, note: "v poriadku" };
    },
  },
];

function levelOf(score) {
  let l = 0;
  LEVELS.forEach((lv, i) => {
    if (score >= lv.min) l = i;
  });
  return l;
}

function evaluate(day, bySym) {
  let total = 0;
  const signals = [];
  for (const sig of SIGNALS) {
    if (!sig.needs.every((s) => bySym[s])) continue;
    const r = sig.calc(day, bySym);
    if (!r) continue;
    total += r.score;
    signals.push({ id: sig.id, name: sig.name, ...r });
  }
  return { score: total, level: levelOf(total), signals };
}

// Today's weather plus a daily history (level per day) for the last year.
module.exports = function mood(series) {
  const bySym = Object.fromEntries(series.map((s) => [s.symbol, s]));
  const spy = bySym.SPY;
  if (!spy) return null;
  const today = spy.days[spy.days.length - 1];
  const now = evaluate(today, bySym);
  // History on trading days only, so weekends don't repeat Friday.
  const history = spy.days
    .filter((d) => d > today - 365)
    .map((d) => {
      const e = evaluate(d, bySym);
      return { date: fmt(d), level: e.level };
    });
  return {
    date: fmt(today),
    ...now,
    ...LEVELS[now.level],
    levels: LEVELS,
    history,
  };
};
module.exports.evaluate = evaluate;
