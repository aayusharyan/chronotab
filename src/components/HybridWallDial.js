import van from "../assets/js/van.js";

const { div, ul, li } = van.tags;

function pad(n) {
  return n.toString().padStart(2, "0");
}

export default function HybridWallDial() {
  // minute marks 48 empty lis
  const minuteMarks = Array.from({ length: 48 }, () => li());

  // hours list starting with 23 then 00..22
  const hours = [23, ...Array.from({ length: 23 }, (_, i) => i)].map((h) => li(pad(h)));

  // minutes 10..59 then 00..09
  const minutes = [
    ...Array.from({ length: 50 }, (_, i) => (i + 10) % 60),
    ...Array.from({ length: 10 }, (_, i) => i),
  ].map((m) => li(pad(m)));

  // seconds 20..59 then 00..19
  const seconds = [
    ...Array.from({ length: 40 }, (_, i) => (i + 20) % 60),
    ...Array.from({ length: 20 }, (_, i) => i),
  ].map((s) => li(pad(s)));

  // clock face numbers 1..12
  const digits = Array.from({ length: 12 }, (_, i) => li(String(i + 1)));

  return div(
    { id: "watch" },
    div({ class: "frame-face" }),
    ul({ class: "minute-marks" }, minuteMarks),
    div(
      { class: "digital-wrap" },
      ul({ class: "digit-hours" }, hours),
      ul({ class: "digit-minutes" }, minutes),
      ul({ class: "digit-seconds" }, seconds)
    ),
    ul({ class: "digits" }, digits),
    div({ class: "hours-hand" }),
    div({ class: "minutes-hand" }),
    div({ class: "seconds-hand" })
  );
}