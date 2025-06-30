import van from "../assets/js/van.js";

const { section, ul, li, i: italic, h2, h3, output, div } = van.tags;

export default function ClassicWall() {
  // Generate 12 clock numbers
  const numbers = [12, ...Array.from({ length: 11 }, (_, idx) => idx + 1)]; // 12,1..11

  return [
    section({ class: "border-clock" }),
    section(
      { class: "clock" },
      ul(numbers.map((n) => li(italic(String(n))))),
      h2("ophelia"),
      h3("fournier-laflamme"),
      output({ class: "date" }),
      div({ class: "minutes" }),
      div({ class: "hours" }),
      div({ class: "seconds" }),
      div({ class: "cercle" })
    ),
  ];
}
