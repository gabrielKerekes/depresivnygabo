// Athlete stats shown at the top of the workout log (/treningy/).
//
// Weight is a log, oldest first. Only the most recent entry is shown in the
// stats bar (the "current" weight); the full log is kept as history and
// rendered in a collapsed panel. To record a new weight, append an entry —
// an optional `time` (e.g. "7:00") notes when it was measured.
const weightLog = [
  { date: "2026-07-27", value: "96 kg" },
  { date: "2026-08-14", value: "99 kg" },
  { date: "2026-08-18", value: "98,6 kg", time: "7:00" },
  { date: "2026-09-02", value: "98 kg" },
];

const current = weightLog[weightLog.length - 1];

module.exports = {
  stats: [
    { label: "Váha", value: current.value },
    { label: "Výška", value: "180 cm" },
    { label: "Kondícia", value: "detrénovaný" },
  ],
  // Newest first for display.
  weightHistory: weightLog.slice().reverse(),
};
