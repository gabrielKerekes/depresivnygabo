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
//
// A session may set `cardioLabel` to rename the cardio group heading (defaults
// to "Rozcvička a kardio") — handy for a commute logged as a couple of rides.
const sessions = [
  {
    date: "2026-08-19",
    title: "Beh — Dunaj (Ovsište)",
    totalDuration: "41:05",
    summary:
      "Poobedný beh popri Dunaji cez Ovsište — vyše šesť kilometrov rovnomerným tempom v 27 °C. Nohy dostali dávku, tep držal v pohodovom aeróbnom pásme.",
    stats: [
      { label: "Vzdialenosť", value: "6,02 km" },
      { label: "Tempo", value: "6:50 / km" },
      { label: "Tep", value: "150 bpm" },
      { label: "Kalórie", value: "566 kcal" },
    ],
    muscles: {
      quads: 0.7,
      hamstrings: 0.6,
      calves: 0.8,
      glutes: 0.5,
    },
    exercises: [],
  },
  {
    date: "2026-08-19",
    title: "Dochádzka na bicykli",
    totalDuration: "51 min",
    summary:
      "Dvakrát cez mesto popri Dunaji — ráno svižne do práce, podvečer pomalšie a do kopca späť na Dlhé diely.",
    cardioLabel: "Jazdy",
    muscles: { quads: 0.5, hamstrings: 0.3, calves: 0.3, glutes: 0.3 },
    exercises: [
      {
        name: "Ráno — do práce (8:05)",
        duration: "20:10",
        detail: "7,50 km · 22,3 km/h · ⌀ 130 bpm",
      },
      {
        name: "Podvečer — domov (17:38)",
        duration: "31:07",
        detail: "7,64 km · 14,7 km/h · ⌀ 132 bpm",
      },
    ],
  },
  {
    date: "2026-08-17",
    title: "Posilňovňa",
    totalDuration: "50 min",
    summary:
      "Superséria zhybov a dipov na vršok tela, potom drepy, tricepsová extenzia a RDL. Pekne pokrytý chrbát, tricepsy aj nohy.",
    exercises: [
      {
        name: "Beh",
        duration: "4 min",
        detail: "10 km/h, sklon 7 %",
        muscles: { quads: 0.4, hamstrings: 0.3, calves: 0.5, glutes: 0.3 },
      },
      {
        name: "Veslovanie",
        duration: "3 min",
        detail: "30 záberov/min",
        muscles: { lats: 0.4, traps: 0.3, biceps: 0.3, forearms: 0.2 },
      },
      { name: "Roller", duration: "3 min" },
      {
        name: "Zhyby + dipy (superséria)",
        weight: "vlastná váha",
        sets: 3,
        reps: 5,
        note: "5 zhybov → 5 dipov, 3 kolá. Dipy cielené na tricepsy.",
        muscles: {
          lats: 0.8,
          biceps: 0.5,
          triceps: 0.8,
          chest: 0.4,
          shoulders: 0.3,
          forearms: 0.3,
        },
      },
      {
        name: "Drepy",
        weight: "55 kg",
        sets: 3,
        reps: 12,
        muscles: { quads: 1, glutes: 0.7, hamstrings: 0.4, lowerback: 0.3 },
      },
      {
        name: "Tricepsová extenzia nad hlavu (jednoručka)",
        weight: "12,5 kg",
        sets: 3,
        reps: 12,
        muscles: { triceps: 1, shoulders: 0.2 },
      },
      {
        name: "Rumunský mŕtvy ťah (RDL)",
        weight: "50 kg",
        sets: 2,
        reps: 14,
        muscles: { hamstrings: 1, glutes: 0.8, lowerback: 0.7, forearms: 0.3 },
      },
    ],
    ratings: [
      {
        by: "Gabo",
        label: "Tréning",
        score: 4,
        note: "Celkom dobrý.",
      },
      {
        by: "Gabo",
        label: "Výkon",
        score: 4,
      },
      {
        by: "Claude",
        label: "Tréning",
        score: 4,
        note: "Dobrá skladba — zhyby a dipy v supersérii zapoja chrbát aj tricepsy naraz, drepy a RDL pokryjú nohy. Nabudúce skús pridať tlak na prsia, nech je vršok kompletný. Pri RDL veď pohyb z bokov a chrbát drž rovný.",
      },
    ],
  },
  {
    date: "2026-08-12",
    title: "Posilňovňa",
    totalDuration: "1 h 10 min",
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
      { name: "Sauna", duration: "12 min", sauna: true },
    ],
    ratings: [
      {
        by: "Gabo",
        label: "Tréning",
        score: 3.5,
        note: "Neistý pri niektorých cvikoch.",
      },
      {
        by: "Claude",
        label: "Tréning",
        score: 4,
        note: "Skladba dáva zmysel — tlak na prsia, dva ťahy na chrbát a RDL pokrývajú vršok aj spodnú časť tela. Pri príťahoch na lavici drž trup spevnený a lopatky sťahuj k sebe, nech to cítiš v chrbte a nie v tricepsoch.",
      },
    ],
  },
  {
    date: "2026-08-12",
    title: "Túra — Sarnia Skała (Zakopané)",
    totalDuration: "2 h 44 min",
    summary:
      "Ranná túra s deťmi nad Zakopané — pomalé tempo, mierne stúpanie a slnečných 15 °C. Nohy dostali dlhú a ľahkú prácu, najviac lýtka a stehná.",
    stats: [
      { label: "Vzdialenosť", value: "5,80 km" },
      { label: "Prevýšenie", value: "+189 m" },
      { label: "Tempo", value: "28:15 / km" },
      { label: "Kalórie", value: "765 kcal" },
    ],
    muscles: {
      quads: 0.6,
      hamstrings: 0.5,
      glutes: 0.5,
      calves: 0.7,
      lowerback: 0.2,
    },
    exercises: [],
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

// Sum how much each muscle was worked in a session. Volume is the number of
// sets (a per-set list counts its length); cardio counts as one light unit.
// A session may also carry its own `muscles` map for whole-session activities
// like a hike; those are added at a moderate fixed volume.
function scoreMuscles(session) {
  const scores = {};
  const add = (muscles, volume) => {
    if (!muscles) return;
    for (const [muscle, involvement] of Object.entries(muscles)) {
      scores[muscle] = (scores[muscle] || 0) + involvement * volume;
    }
  };
  for (const ex of session.exercises || []) {
    add(ex.muscles, ex.setList ? ex.setList.length : ex.sets || 1);
  }
  add(session.muscles, 3);
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
  const scores = scoreMuscles(session);
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
  for (const [muscle, value] of Object.entries(scoreMuscles(session))) {
    totalScores[muscle] = (totalScores[muscle] || 0) + value;
  }
}

module.exports = {
  sessions: decorated,
  muscleTotals: levelsFrom(totalScores),
};
