import van from "../assets/js/van.js";

export default function WheelOfTime() {
  const faces = [
    { type: "years", numbers: 101 },
    { type: "seconds", numbers: 60 },
    { type: "minutes", numbers: 60 },
    { type: "hours", numbers: 24 },
    { type: "days", numbers: 31 },
    { type: "months", numbers: 12 },
    { type: "day-names", numbers: 7 },
  ];

  const faceHTML = faces
    .map(
      (f) =>
        `<div><div data-clock="${f.type}" data-numbers="${f.numbers}" class="clock-face"></div></div>`
    )
    .join("");

  return van.raw(`
    <div class="clock" data-date="2024-12-25">
      ${faceHTML}
      <button type="button" id="current-lang" class="current-lang-display">en</button>
      <dialog id="language-dialog">
        <button type="button" id="btn-dialog-close" class="btn-dialog-close" autofocus>&#10005;</button>
        <div id="language-options" class="language-options"></div>
      </dialog>
    </div>`);
}