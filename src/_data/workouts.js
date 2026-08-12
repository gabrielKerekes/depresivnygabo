// Workout log. Newest sessions go on top — the page renders them in this order.
//
// Each session has a `date` (YYYY-MM-DD) and a list of `exercises`. An exercise
// is one of:
//   - cardio / mobility: give it `duration` (e.g. "5 min") and an optional
//     `detail` (e.g. "sklon 7 %, 9 km/h"),
//   - strength: give it `weight`, `sets` and `reps` for uniform sets, or a
//     `setList` of `{ reps, weight, note? }` when the sets differ; either way
//     an optional `note` hangs a remark under the whole exercise, or
//   - recovery: set `sauna: true` (with a `duration` and optional `detail`).
// The page decides how to render and group each one from which fields are
// present, so adding a workout is just adding an object here.
const sessions = [
  {
    date: "2026-08-12",
    exercises: [
      { name: "Roller", duration: "5 min" },
      { name: "Beh", duration: "3 min", detail: "sklon 7 %, 9 km/h" },
      { name: "Veslovanie", duration: "3 min" },
      {
        name: "Tlaky na prsia (stroj)",
        note: "Cítil som aj tricepsy — asi som išiel príliš dozadu.",
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
        setList: [
          { reps: 15, weight: "40 kg" },
          { reps: 15, weight: "40 kg" },
          { reps: 10, weight: "40 kg" },
        ],
      },
    ],
  },
  {
    date: "2026-08-11",
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
    exercises: [
      { name: "Roller / mobilita", duration: "10 min" },
      { name: "Beh", duration: "5 min", detail: "sklon 7 %, 9 km/h" },
      { name: "Veslovanie", duration: "3 min" },
      {
        name: "Tricepsové sťahovanie (kladka)",
        weight: "35 kg",
        sets: 3,
        reps: 13,
      },
      { name: "Bicepsové zdvihy", weight: "12,5 kg", sets: 3, reps: 9 },
      {
        name: "Tricepsová extenzia nad hlavu (jednoručka)",
        weight: "12,5 kg",
        sets: 3,
        reps: 10,
      },
      { name: "Drepy", weight: "50 kg", sets: 3, reps: 10 },
      { name: "Rumunský mŕtvy ťah (RDL)", weight: "60 kg", sets: 3, reps: 10 },
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

// Split each session's flat exercise list into cardio/warm-up, strength and
// recovery groups so the template can render each under its own heading without
// any grouping logic in Nunjucks.
module.exports = sessions.map((session) => ({
  ...session,
  cardio: session.exercises.filter(
    (ex) => !ex.sets && !ex.setList && !ex.sauna,
  ),
  strength: session.exercises.filter((ex) => ex.sets || ex.setList),
  recovery: session.exercises.filter((ex) => ex.sauna),
}));
