// Workout log. Newest sessions go on top — the page renders them in this order.
//
// Each session has a `date` (YYYY-MM-DD), an optional one/two-sentence
// `summary`, and a list of `exercises`. An exercise is one of:
//   - cardio / mobility: give it `duration` (e.g. "5 min") and an optional
//     `detail` (e.g. "sklon 7 %, 9 km/h"),
//   - strength: give it `weight`, `sets` and `reps` for uniform sets, or a
//     `setList` of `{ reps, weight, note? }` when the sets differ; either way
//     an optional `note` hangs a remark under the whole exercise, or
//   - recovery: set `sauna: true` (with a `duration` and optional `detail`).
//
// For the muscle map, tag an exercise with `muscles`: a map of muscle key →
// involvement (1 = primary mover, ~0.3–0.7 = assisting). Keys must match the
// shapes drawn in _includes/bodymap.njk:
//   chest, shoulders, biceps, triceps, forearms, abs,
//   traps, lats, lowerback, glutes, quads, hamstrings, calves.
// The page turns these into a per-day and an all-time front/back body map,
// shaded darker where the muscle got more work.
const sessions = [
  {
    date: "2026-08-12",
    summary:
      "Tlak na prsia a poriadna dávka ťahov na chrbát — vrchný aj spodný — a RDL na zadnú stranu stehien. Prsia aj chrbát pekne unavené, tricepsy cítiť z nepriamej práce.",
    exercises: [
      { name: "Roller", duration: "5 min" },
      {
        name: "Beh",
        duration: "3 min",
        detail: "sklon 7 %, 9 km/h",
        muscles: { quads: 0.4, hamstrings: 0.3, calves: 0.5, glutes: 0.3 },
      },
      {
        name: "Veslovanie",
        duration: "3 min",
        muscles: { lats: 0.4, traps: 0.3, biceps: 0.3, forearms: 0.2 },
      },
      {
        name: "Tlaky na prsia (stroj)",
        note: "Cítil som aj tricepsy — asi som išiel príliš dozadu.",
        muscles: { chest: 1, triceps: 0.5, shoulders: 0.5 },
        setList: [
          { reps: 20, weight: "30 kg", note: "veľmi ľahké" },
          {
            reps: 15,
            weight: "45 kg",
            note: "trochu ťažšie, ale stále v pohode",
          },
          { reps: 15, weight: "55 kg", note: "limit" },
        ],
      },
      {
        name: "Sťahovanie hornej kladky pred telo (chrbát)",
        note: "Cítil som aj tricepsy — asi boľavé spred dvoch dní.",
        muscles: { lats: 1, biceps: 0.5, traps: 0.3, forearms: 0.3 },
        setList: [
          { reps: 15, weight: "40 kg" },
          { reps: 15, weight: "40 kg" },
          { reps: 10, weight: "40 kg" },
        ],
      },
      {
        name: "Príťahy na šikmej lavici (spodný chrbát)",
        weight: "12,5 kg / ruka",
        sets: 3,
        reps: 10,
        muscles: { lats: 0.7, lowerback: 0.6, traps: 0.5, biceps: 0.4 },
      },
      {
        name: "Príťahy na rovnej lavici (vrchný chrbát)",
        weight: "15 kg / ruka",
        sets: 3,
        reps: 13,
        muscles: { traps: 0.8, lats: 0.6, biceps: 0.4, shoulders: 0.3 },
      },
      {
        name: "Rumunský mŕtvy ťah (RDL)",
        weight: "60 kg",
        sets: 3,
        reps: 12,
        muscles: { hamstrings: 1, glutes: 0.8, lowerback: 0.7, forearms: 0.3 },
      },
    ],
  },
  {
    date: "2026-08-11",
    summary:
      "Čistá regenerácia — štyri kolá v saune pri 90 °C. Žiadna svalová práca navyše, len uvoľnenie a prekrvenie po tréningoch.",
    exercises: [
      {
        name: "Sauna — 1. kolo",
        duration: "11 min",
        detail: "90 °C",
        sauna: true,
      },
      {
        name: "Sauna — 2. kolo",
        duration: "8 min",
        detail: "90 °C",
        sauna: true,
      },
      {
        name: "Sauna — 3. kolo",
        duration: "7 min",
        detail: "90 °C",
        sauna: true,
      },
      {
        name: "Sauna — záverečné kolo",
        duration: "10 min",
        detail: "90 °C",
        sauna: true,
      },
    ],
  },
  {
    date: "2026-08-10",
    totalDuration: "75 min",
    summary:
      "Prvý tréning po pauze: kardio na rozohriatie, potom tricepsy, bicepsy a nohy (drepy, RDL). Slušný celotelový štart — chýbal len chrbát a prsia.",
    exercises: [
      { name: "Roller / mobilita", duration: "10 min" },
      {
        name: "Beh",
        duration: "5 min",
        detail: "sklon 7 %, 9 km/h",
        muscles: { quads: 0.4, hamstrings: 0.3, calves: 0.5, glutes: 0.3 },
      },
      {
        name: "Veslovanie",
        duration: "3 min",
        muscles: { lats: 0.4, traps: 0.3, biceps: 0.3, forearms: 0.2 },
      },
      {
        name: "Tricepsové sťahovanie (kladka)",
        weight: "35 kg",
        sets: 3,
        reps: 13,
        muscles: { triceps: 1 },
      },
      {
        name: "Bicepsové zdvihy",
        weight: "12,5 kg",
        sets: 3,
        reps: 9,
        muscles: { biceps: 1, forearms: 0.4 },
      },
      {
        name: "Tricepsová extenzia nad hlavu (jednoručka)",
        weight: "12,5 kg",
        sets: 3,
        reps: 10,
        muscles: { triceps: 1, shoulders: 0.2 },
      },
      {
        name: "Drepy",
        weight: "50 kg",
        sets: 3,
        reps: 10,
        muscles: { quads: 1, glutes: 0.7, hamstrings: 0.4, lowerback: 0.3 },
      },
      {
        name: "Rumunský mŕtvy ťah (RDL)",
        weight: "60 kg",
        sets: 3,
        reps: 10,
        muscles: { hamstrings: 1, glutes: 0.8, lowerback: 0.7, forearms: 0.3 },
      },
      { name: "Sauna", duration: "10 min", sauna: true },
    ],
    // score out of 5. `by` names the rater; Claude adds one of its own.
    ratings: [
      {
        by: "Gabo",
        label: "Tréning",
        score: 4,
        note: "Chýbal chrbát a prsia.",
      },
      {
        by: "Gabo",
        label: "Výkon",
        score: 4,
        note: "Veľmi solídny prvý pokus.",
      },
      {
        by: "Claude",
        label: "Výkon",
        score: 4,
        note: "Pekne vyvážený návrat — kardio, nohy aj ruky za 75 minút. Nabudúce pridaj ťah pre chrbát a tlak na prsia a máš celé telo. Pri RDL a drepoch drž váhu radšej nižšie, kým sadne technika.",
      },
    ],
  },
];

// Sum how much each muscle was worked in a set of exercises. Volume is the
// number of sets (a per-set list counts its length); cardio counts as one light
// unit. Each muscle's involvement is multiplied by that volume and summed.
function scoreMuscles(exercises) {
  const scores = {};
  for (const ex of exercises) {
    if (!ex.muscles) continue;
    const volume = ex.setList ? ex.setList.length : ex.sets || 1;
    for (const [muscle, involvement] of Object.entries(ex.muscles)) {
      scores[muscle] = (scores[muscle] || 0) + involvement * volume;
    }
  }
  return scores;
}

// Turn raw scores into 0–4 shading levels, normalised so the most-worked muscle
// in the image is the darkest (level 4) and untouched muscles stay at 0. This
// makes each map self-scaling: a single day shows that day's balance, the
// all-time map shows the overall balance and the gaps.
function levelsFrom(scores) {
  const max = Math.max(0, ...Object.values(scores));
  const levels = {};
  if (max > 0) {
    for (const [muscle, value] of Object.entries(scores)) {
      levels[muscle] =
        value <= 0 ? 0 : Math.max(1, Math.round((value / max) * 4));
    }
  }
  return levels;
}

const decorated = sessions.map((session) => {
  const scores = scoreMuscles(session.exercises);
  return {
    ...session,
    cardio: session.exercises.filter(
      (ex) => !ex.sets && !ex.setList && !ex.sauna,
    ),
    strength: session.exercises.filter((ex) => ex.sets || ex.setList),
    recovery: session.exercises.filter((ex) => ex.sauna),
    muscleLevels: levelsFrom(scores),
    trainsMuscles: Object.keys(scores).length > 0,
  };
});

// All-time totals across every session, for the coverage map at the top.
const totalScores = {};
for (const session of sessions) {
  for (const [muscle, value] of Object.entries(
    scoreMuscles(session.exercises),
  )) {
    totalScores[muscle] = (totalScores[muscle] || 0) + value;
  }
}

module.exports = {
  sessions: decorated,
  muscleTotals: levelsFrom(totalScores),
};
