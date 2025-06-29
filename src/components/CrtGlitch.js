import van from "../assets/js/van.js";

const { a, div, span } = van.tags;

export default function CrtGlitch() {
  return [
    a({ class: "switcher", href: "#" }),
    div(
      { class: "screen glitch" },
      div(
        { class: "clock is-off" },
        span({ class: "time", "data-time": "" })
      ),
      div({ class: "figure" }),
      div({ class: "figure-mask" })
    ),
  ];
}