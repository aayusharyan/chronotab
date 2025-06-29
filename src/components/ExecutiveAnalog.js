import van from "../assets/js/van.js";

const { div, button } = van.tags;

export default function ExecutiveAnalog() {
  return [
    div({ class: "page-header" }, "Analog Clock"),
    div(
      { class: "clock" },
      div({ class: "hour" }),
      div({ class: "min" }),
      div({ class: "sec" })
    ),
    div(
      { class: "switch-cont" },
      button({ class: "switch-btn" }, "Light")
    ),
  ];
}