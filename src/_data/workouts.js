// Workout log. Newest sessions go on top — the page renders them in this order.
//
// Each session has a `date` (YYYY-MM-DD) and a list of `exercises`. An exercise
// is either:
//   - cardio / mobility: give it `duration` (e.g. "5 min") and an optional
//     `detail` (e.g. "sklon 7 %, 9 km/h"), or
//   - strength: give it `weight`, `sets` and `reps`.
// The page decides how to render each one from which fields are present, so
// adding a workout is just adding an object here.
const sessions = [
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

// Split each session's flat exercise list into a cardio/warm-up group (no sets)
// and a strength group (has sets) so the template can render each with its own
// heading without any grouping logic in Nunjucks.
module.exports = sessions.map((session) => ({
  ...session,
  cardio: session.exercises.filter((ex) => !ex.sets),
  strength: session.exercises.filter((ex) => ex.sets),
}));
