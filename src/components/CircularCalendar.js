import van from "../assets/js/van.js";

const {
  div, h1, h2, section, p, i
} = van.tags;

export default function CircularCalendar() {
  // Build the complex structure using van tags to mirror original HTML
  return div(
    // center-dial
    div(
      { class: "center-dial" },
      h1({ class: "center-preview" }, "HELLO"),
      div({ class: "head" }),
      div({ class: "torso" }),
      div({ class: "hand-container", id: "minutes" }, div({ class: "minute-hand" })),
      div({ class: "hand-container", id: "hours" }, div({ class: "hour-hand" })),
      div({ class: "hand-container", id: "seconds" }, div({ class: "second-hand" }))
    ),

    // day-name-dial
    div(
      { class: "day-name-dial" },
      div({ class: "ring-back" }),
      div({ class: "ring", id: "r1" },
        h1({ class: "day-name-preview" }, "DAY NAME"),
        h2({ class: "day-name-text" }, "MON TUE WED THU FRI SAT SUN")
      )
    ),

    // month-dial
    div(
      { class: "month-dial" },
      div({ class: "ring-back" }),
      div({ class: "ring", id: "r2" },
        h1({ class: "month-preview" }, "MONTH"),
        h2({ class: "month-text" }, "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC")
      )
    ),

    // day-dial
    div(
      { class: "day-dial" },
      div({ class: "ring-back" }),
      div({ class: "ring", id: "r3" },
        h1({ class: "day-preview" }, "DAY"),
        h2({ class: "day-text" },
          "01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31"
        )
      )
    ),

    // weather ring
    div(
      { class: "side-ring", id: "weather" },
      div({ class: "fa fa-cloud" }),
      p({ class: "temperature" }, "14° C")
    ),

    // steps ring
    div(
      { class: "side-ring", id: "steps" },
      div(
        { class: "bars" },
        // Generate 7 bars programmatically
        [..."MTWTFSS"].map((letter, idx) =>
          div(
            { class: "bar" },
            div({ class: "day-letter" }, letter),
            div({ class: "x", id: `x${idx + 1}` })
          )
        )
      )
    )
  );
}