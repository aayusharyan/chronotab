import van from "../assets/js/van.js";

const { div } = van.tags;

export default function IconBlocks() {
  // 60 graduation divs
  const graduations = Array.from({ length: 60 }, () => div({ class: "graduation" }));

  return div(
    { class: "clock" },
    div(
      { class: "inner" },
      div({ class: "hour hand" }),
      div({ class: "minute hand" }),
      div({ class: "second hand" }),
      div({ class: "graduations" }, graduations)
    )
  );
}