import van from "../assets/js/van.js";

const { div, span, a } = van.tags;

export default function ModernDesk() {
  // Helper arrays / data
  const digitToName = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  const positions = ["h1", "h2", ":", "m1", "m2", ":", "s1", "s2"];

  // Build digits container
  const digitsObj = {};
  const digitsHolder = div({ class: "digits" });

  positions.forEach((p) => {
    if (p === ":") {
      digitsHolder.appendChild(div({ class: "dots" }));
    } else {
      const posDiv = div();
      for (let i = 1; i < 8; i++) {
        posDiv.appendChild(span({ class: `d${i}` }));
      }
      digitsObj[p] = posDiv;
      digitsHolder.appendChild(posDiv);
    }
  });

  // Weekdays
  const weekdayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const weekdayHolder = div({ class: "weekdays" }, weekdayNames.map((w) => span(w)));
  const weekdaySpans = weekdayHolder.children; // HTMLCollection

  const ampmEl = div({ class: "ampm" });
  const alarmEl = div({ class: "alarm" });

  const display = div({ class: "display" }, weekdayHolder, ampmEl, alarmEl, digitsHolder);
  const clock = div({ id: "clock", class: "light" }, display);

  const button = a({ class: "button", onclick: () => clock.classList.toggle("dark", clock.classList.contains("light")), }, "Switch Theme");
  // When toggling, ensure only one of light/dark present
  button.onclick = () => {
    if (clock.classList.contains("light")) {
      clock.classList.remove("light");
      clock.classList.add("dark");
    } else {
      clock.classList.remove("dark");
      clock.classList.add("light");
    }
  };
  const buttonHolder = div({ class: "button-holder" }, button);

  const root = div(clock, buttonHolder);

  // Time update logic
  const pad = (n) => String(n).padStart(2, "0");
  let intervalId = null;

  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    let period = "AM";
    if (hours >= 12) {
      period = "PM";
    }
    hours = hours % 12;
    if (hours === 0) hours = 12;

    const timeStr = `${pad(hours)}${pad(minutes)}${pad(seconds)}`; // length 6

    digitsObj.h1.className = digitToName[+timeStr[0]];
    digitsObj.h2.className = digitToName[+timeStr[1]];
    digitsObj.m1.className = digitToName[+timeStr[2]];
    digitsObj.m2.className = digitToName[+timeStr[3]];
    digitsObj.s1.className = digitToName[+timeStr[4]];
    digitsObj.s2.className = digitToName[+timeStr[5]];

    // Weekday highlight: 0 Sun - 6 Sat, shift so Sun last
    let dow = now.getDay();
    dow = dow === 0 ? 6 : dow - 1;

    for (let i = 0; i < weekdaySpans.length; i++) {
      weekdaySpans[i].classList.toggle("active", i === dow);
    }

    ampmEl.textContent = period;
  }

  ModernDesk.mount = () => {
    updateTime();
    intervalId = setInterval(updateTime, 1000);
  };

  ModernDesk.unmount = () => {
    clearInterval(intervalId);
  };

  return root;
}