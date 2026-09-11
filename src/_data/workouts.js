// Workout log. Newest sessions go on top — the page renders them in this order.
//
// Each session has a `date` (YYYY-MM-DD) and a list of `exercises`. An optional
// `summary` holds a one/two-sentence note in the owner's own words — leave it
// off unless he writes one; it is never auto-generated. An exercise is one of:
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
//
// A session may also set `circuit` to a slug (see `circuitMeta` below) to mark
// it as one lap of a repeatable route. Sessions sharing a circuit are grouped
// into a progress table on /treningy/, so repeated laps can be compared over
// time. The metrics compared come from the session's `stats` and
// `totalDuration`.
const sessions = [
  {
    date: "2026-09-10",
    title: "Beh — Bratislava (lesný okruh)",
    circuit: "lesna-6",
    totalDuration: "39:48",
    stats: [
      { label: "Vzdialenosť", value: "6,36 km" },
      { label: "Tempo", value: "6:15 / km" },
      { label: "Tep", value: "157 bpm" },
      { label: "Prevýšenie", value: "+143 m" },
    ],
    muscles: { quads: 0.7, hamstrings: 0.6, calves: 0.8, glutes: 0.5 },
    exercises: [],
    ratings: [
      {
        by: "Gabo",
        label: "Tréning",
        score: 5,
        note: "Cítil som sa skvele — konečne som sa netrápil celý čas a chvíľu v strede som držal tempo 5:00.",
      },
      {
        by: "Claude",
        label: "Výkon",
        score: 4.5,
        note: "Prvý zápis Lesnej šestky — odteraz je to tvoj etalón, s ktorým budeš porovnávať ďalšie kolá. Priemer 6:15/km na trati so 143 m stúpania je slušný základ a záblesk 5:00 v strede ukazuje, že v nohách máš viac. Nabudúce skús držať rovnomernejšie tempo namiesto jedného výkyvu — a hlavne, konečne si si beh užil, to je najdôležitejšie číslo.",
      },
    ],
  },
  {
    date: "2026-09-08",
    title: "Beh + kalistenika — Bratislava",
    summary: "Slabý, naozaj slabý. Aspoň som sa dostal von a niečo spravil.",
    stats: [
      { label: "Vzdialenosť", value: "2,23 km" },
      { label: "Čas", value: "13:58" },
      { label: "Tempo", value: "6:16 / km" },
      { label: "Tep", value: "154 bpm" },
      { label: "Kalórie", value: "208 kcal" },
    ],
    muscles: { quads: 0.7, hamstrings: 0.6, calves: 0.8, glutes: 0.5 },
    exercises: [
      {
        name: "Zhyby",
        weight: "vlastná váha",
        sets: 3,
        reps: 5,
        note: "Superséria — zhyby, dipy a príťahy kolien za sebou, 3 kolá.",
        muscles: {
          lats: 1,
          biceps: 0.6,
          forearms: 0.4,
          traps: 0.4,
          shoulders: 0.3,
        },
      },
      {
        name: "Dipy",
        weight: "vlastná váha",
        sets: 3,
        reps: 5,
        muscles: { triceps: 0.8, chest: 0.4, shoulders: 0.3 },
      },
      {
        name: "Príťahy kolien vo vise",
        weight: "vlastná váha",
        sets: 3,
        reps: 10,
        muscles: { abs: 1, forearms: 0.3 },
      },
    ],
    ratings: [
      {
        by: "Claude",
        label: "Tréning",
        score: 4,
        note: "Slabé dni sa počítajú dvojnásobne — prísť a odcvičiť aj cez ne je väčšia výhra než akékoľvek číslo. A skladba je na krátky tréning prekvapivo kompletná: zhyby zaberú chrbát a bicepsy, dipy tricepsy a prsia, príťahy kolien stred tela a beh pridá nohy aj kardio. Zhyby a dipy vo vlastnej váhe sú výborný základ — keď dôjde sila, radšej spomaľ a drž čistý pohyb než naháňať ďalšie opakovania. Nabudúce, keď budeš mať viac šťavy, pridaj štvrté kolo alebo ťažší variant.",
      },
    ],
  },
  {
    date: "2026-09-03",
    title: "Posilňovňa",
    totalDuration: "1 h",
    summary:
      "Určite som bol slabý, nebolo to najlepšie a neužil som si to. Chcel som na záver spraviť zhyby, ale nezostal čas.",
    exercises: [
      { name: "Roller", duration: "10 min" },
      {
        name: "Beh",
        duration: "3 min",
        detail: "sklon 7 %, 9,5 km/h",
        muscles: { quads: 0.4, hamstrings: 0.3, calves: 0.5, glutes: 0.3 },
      },
      {
        name: "Dipy",
        muscles: { triceps: 0.8, chest: 0.4, shoulders: 0.3 },
        setList: [
          { reps: 8, weight: "vlastná váha" },
          { reps: 3, weight: "vlastná váha" },
          { reps: 8, weight: "vlastná váha" },
        ],
      },
      {
        name: "Príťahy kolien vo vise",
        note: "Superséria — príťahy kolien, bicepsové zdvihy a tricepsová extenzia nad hlavu za sebou, 3 kolá.",
        muscles: { abs: 1, forearms: 0.3 },
        setList: [
          { reps: 15, weight: "vlastná váha" },
          { reps: 12, weight: "vlastná váha" },
          { reps: 10, weight: "vlastná váha" },
        ],
      },
      {
        name: "Bicepsové zdvihy",
        weight: "15 kg",
        sets: 3,
        reps: 8,
        muscles: { biceps: 1, forearms: 0.4 },
      },
      {
        name: "Tricepsová extenzia nad hlavu",
        weight: "15 kg",
        sets: 3,
        reps: 8,
        muscles: { triceps: 1, shoulders: 0.2 },
      },
      {
        name: "Drepy",
        weight: "65 kg",
        sets: 3,
        reps: 10,
        muscles: { quads: 1, glutes: 0.7, hamstrings: 0.4, lowerback: 0.3 },
      },
    ],
    ratings: [
      {
        by: "Claude",
        label: "Tréning",
        score: 3.5,
        note: "Slabé dni patria k veci — to, že si prišiel a odcvičil aj cez to, je väčšia výhra než čísla. Skladba drží pokope: dipy a tricepsová extenzia na tricepsy, bicepsy, stred tela cez príťahy kolien a drepy na nohy. Chýba ťah na chrbát a tlak na prsia — nabudúce pridaj jeden ťah a máš vršok vyvážený. Zhyby, čo nevyšli, si nechaj na úvod ďalšieho tréningu, kým máš silu.",
      },
    ],
  },
  {
    date: "2026-08-29",
    title: "Beh — Bratislava",
    totalDuration: "27:44",
    stats: [
      { label: "Vzdialenosť", value: "4,43 km" },
      { label: "Tempo", value: "6:16 / km" },
      { label: "Tep", value: "157 bpm" },
      { label: "Kalórie", value: "420 kcal" },
    ],
    muscles: { quads: 0.7, hamstrings: 0.6, calves: 0.8, glutes: 0.5 },
    exercises: [],
  },
  {
    date: "2026-08-28",
    title: "Dochádzka na bicykli",
    totalDuration: "47 min",
    cardioLabel: "Jazdy",
    muscles: { quads: 0.5, hamstrings: 0.3, calves: 0.3, glutes: 0.3 },
    exercises: [
      {
        name: "Ráno — do práce (7:41)",
        duration: "21:17",
        detail: "7,59 km · 21,4 km/h · +68 m · ⌀ 130 bpm",
      },
      {
        name: "Popoludní — domov (15:33)",
        duration: "25:56",
        detail: "6,57 km · 15,2 km/h · +46 m · ⌀ 127 bpm",
      },
    ],
  },
  {
    date: "2026-08-26",
    title: "Doma",
    exercises: [
      { name: "Roller / mobilita", duration: "15 min", detail: "poriadne" },
      {
        name: "Bicepsové zdvihy",
        weight: "10 kg",
        sets: 1,
        reps: 10,
        muscles: { biceps: 1, forearms: 0.4 },
      },
      {
        name: "Tricepsové kliky (opretý dozadu)",
        weight: "vlastná váha",
        sets: 1,
        reps: 10,
        note: "To isté ako na stroji.",
        muscles: { triceps: 1, chest: 0.4, shoulders: 0.3 },
      },
      {
        name: "Tlak nad hlavu",
        weight: "10 kg",
        sets: 1,
        reps: 10,
        muscles: { shoulders: 1, triceps: 0.5, traps: 0.3 },
      },
      {
        name: "Tricepsová extenzia nad hlavu",
        weight: "10 kg",
        sets: 1,
        reps: 10,
        muscles: { triceps: 1, shoulders: 0.2 },
      },
      {
        name: "Plank",
        duration: "1:40",
        detail: "30 s nízky + 30 s vysoký + 20 s bočný / strana",
        muscles: { abs: 1, shoulders: 0.4, lowerback: 0.3, glutes: 0.3 },
      },
    ],
    ratings: [
      {
        by: "Claude",
        label: "Tréning",
        score: 3.5,
        note: "Pekná domáca porcia na ruky, ramená a stred tela — bicepsy, tricepsy z dvoch uhlov aj tlak nad hlavu. Chýbajú nohy a chrbát, tie si nechaj na posilňovňu. Pri tlaku nad hlavu spevni brucho a nezalamuj sa v drieku, nech ide sila z ramien.",
      },
    ],
  },
  {
    date: "2026-08-25",
    title: "Dochádzka na bicykli",
    totalDuration: "52 min",
    cardioLabel: "Jazdy",
    muscles: { quads: 0.5, hamstrings: 0.3, calves: 0.3, glutes: 0.3 },
    exercises: [
      {
        name: "Ráno — do práce (7:58)",
        duration: "21:35",
        detail: "7,61 km · 21,1 km/h · +48 m · ⌀ 123 bpm",
      },
      {
        name: "Popoludní — domov (15:37)",
        duration: "30:39",
        detail: "7,66 km · 15,0 km/h · +97 m · ⌀ 124 bpm",
      },
    ],
  },
  {
    date: "2026-08-24",
    title: "Posilňovňa",
    summary: "Pri planku sa mi začala robiť nevoľnosť.",
    exercises: [
      { name: "Roller / mobilita", duration: "10 min" },
      {
        name: "Rotoped",
        duration: "5 min",
        muscles: { quads: 0.4, hamstrings: 0.3, calves: 0.4, glutes: 0.3 },
      },
      {
        name: "Príťah v sede (stroj)",
        muscles: {
          lats: 1,
          traps: 0.5,
          biceps: 0.5,
          forearms: 0.3,
          shoulders: 0.3,
        },
        setList: [
          { reps: 12, weight: "40 kg" },
          { reps: 12, weight: "50 kg" },
          { reps: 12, weight: "50 kg" },
        ],
      },
      {
        name: "Drepy",
        weight: "60 kg",
        sets: 3,
        reps: 12,
        muscles: { quads: 1, glutes: 0.7, hamstrings: 0.4, lowerback: 0.3 },
      },
      {
        name: "Plank",
        duration: "3:30",
        detail: "2 kolá · 45 s nízky + 30 s bočný / strana",
        muscles: { abs: 1, shoulders: 0.4, lowerback: 0.3, glutes: 0.3 },
      },
      {
        name: "Tricepsové sťahovanie (kladka)",
        muscles: { triceps: 1 },
        setList: [
          { reps: 12, weight: "40 kg" },
          { reps: 8, weight: "45 kg" },
          { reps: 8, weight: "35 kg" },
        ],
      },
    ],
    ratings: [
      {
        by: "Claude",
        label: "Tréning",
        score: 4,
        note: "Dobrá skladba — príťah na chrbát, drepy na nohy, plank na stred a tricepsy na záver. Nevoľnosť môže byť z málo jedla či pitia pred tréningom alebo z priveľkého tempa; nabudúce skús ľahšie sa najesť a viac piť. Pri príťahu v sede sťahuj lopatky k sebe a ťahaj lakťami, nie rukami.",
      },
    ],
  },
  {
    date: "2026-08-24",
    title: "Beh — Bratislava",
    totalDuration: "21:36",
    stats: [
      { label: "Vzdialenosť", value: "3,31 km" },
      { label: "Tempo", value: "6:32 / km" },
      { label: "Tep", value: "148 bpm" },
      { label: "Kalórie", value: "309 kcal" },
    ],
    muscles: { quads: 0.7, hamstrings: 0.6, calves: 0.8, glutes: 0.5 },
    exercises: [],
  },
  {
    date: "2026-08-19",
    title: "Beh — Dunaj (Ovsište)",
    totalDuration: "41:05",
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

// Repeatable routes. A session's `circuit` slug points here for its display
// name; add an entry when a new route starts repeating.
const circuitMeta = {
  "lesna-6": { name: "Lesná šestka" },
};

const circuitName = (slug) =>
  (circuitMeta[slug] && circuitMeta[slug].name) || slug;

const decorated = sessions.map((session) => {
  const scores = scoreMuscles(session);
  return {
    ...session,
    circuitName: session.circuit ? circuitName(session.circuit) : null,
    cardio: session.exercises.filter(
      (ex) => !ex.sets && !ex.setList && !ex.sauna,
    ),
    strength: session.exercises.filter((ex) => ex.sets || ex.setList),
    recovery: session.exercises.filter((ex) => ex.sauna),
    muscleLevels: levelsFrom(scores),
    trainsMuscles: Object.keys(scores).length > 0,
  };
});

// Group sessions by circuit into a progress log — oldest lap first, with the
// key metrics pulled flat so the page can lay them out as a comparison table.
const statValue = (session, label) => {
  const found = (session.stats || []).find((s) => s.label === label);
  return found ? found.value : null;
};

const circuitGroups = {};
for (const session of sessions) {
  if (!session.circuit) continue;
  (circuitGroups[session.circuit] ||= []).push(session);
}

const circuits = Object.entries(circuitGroups).map(([slug, laps]) => ({
  slug,
  name: circuitName(slug),
  laps: laps
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((session) => ({
      date: session.date,
      distance: statValue(session, "Vzdialenosť"),
      time: session.totalDuration || null,
      pace: statValue(session, "Tempo"),
      hr: statValue(session, "Tep"),
      ascent: statValue(session, "Prevýšenie"),
    })),
}));

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
  circuits,
};
