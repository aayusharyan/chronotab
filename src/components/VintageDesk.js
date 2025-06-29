import van from "../assets/js/van.js";

const { div, span } = van.tags;

function buildNumber(idPrefix, max) {
  // returns array of div.number elements 0..max inclusive
  return Array.from({ length: max + 1 }, (_, i) =>
    div(
      { class: "number", id: `${idPrefix}-${i}` },
      div({ class: "up" }, div({ class: "digit" }, i)),
      div({ class: "down" }, div({ class: "digit" }, i))
    )
  );
}

export default function VintageDesk() {
  // knob lines 15
  const knobLines = div({ class: "knob-lines", id: "knob-lines" },
    Array.from({ length: 15 }, () => div({ class: "knob-line" }))
  );

  // Minutes
  const minutesDizaines = div({ class: "dizaines" }, ...buildNumber("minutes-dizaines", 5));
  const minutesUnites = div({ class: "unites" }, ...buildNumber("minutes-unites", 9));
  const minutes = div({ class: "minutes" }, minutesDizaines, minutesUnites);

  // Hours
  const hoursDizaines = div({ class: "dizaines" }, ...buildNumber("hours-dizaines", 1));
  const hoursUnites = div({ class: "unites" }, ...buildNumber("hours-unites", 9));
  const hours = div({ class: "hours" }, hoursDizaines, hoursUnites);

  // Seconds list
  const secondsList = div({ class: "seconds", id: "seconds" },
    Array.from({ length: 60 }, (_, i) => div({ class: "second" }, i))
  );
  const secondsWrapper = div({ class: "seconds-wrapper" }, secondsList);

  const ampmBtn = div({ class: "btn", id: "ampm" });
  const radioBtn = div({ class: "btn radio-btn", id: "radio-btn" }, span("radio"));

  return div(
    { class: "clock-wrapper" },
    div({ class: "bg" }),
    div({ class: "knob" }),
    knobLines,
    ampmBtn,
    radioBtn,
    div({ class: "logo" }, "Ika"),
    minutes,
    hours,
    secondsWrapper
  );
}

function checkTime(val) { return val < 10 ? "0" + val : String(val); }

function setSecondsAnimation(startSec) {
  const secEl = document.getElementById("seconds");
  if (!secEl) return;
  secEl.style.animation = `secondsTick 60s linear infinite`;
  secEl.style.animationDelay = `${-startSec}s`;
  secEl.style.webkitAnimation = `secondsTick 60s linear infinite`;
  secEl.style.webkitAnimationDelay = `${-startSec}s`;
}

VintageDesk.mount = () => {
  const ampmEl = document.getElementById("ampm");
  const radioBtn = document.getElementById("radio-btn");

  let prev = { hT: null, hU: null, mT: null, mU: null };

  const update = () => {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes();
    const ampm = h >= 12 ? "pm" : "am";

    h = h % 12;
    h = h ? h : 12;
    const hStr = checkTime(h);
    const mStr = checkTime(m);

    const digits = {
      hT: parseInt(hStr[0]), hU: parseInt(hStr[1]),
      mT: parseInt(mStr[0]), mU: parseInt(mStr[1])
    };

    const setActive = (group, idPrefix, digit) => {
      if (prev[group] === digit) return;
      // remove existing active/outgoing classes
      const outgoingEls = document.querySelectorAll(`.${idPrefix} .outgoing`);
      outgoingEls.forEach((el)=> el.className = "number");
      const activeEls = document.querySelectorAll(`.${idPrefix} .is-active`);
      activeEls.forEach((el)=> el.className = "number outgoing");
      const current = document.getElementById(`${idPrefix}-${digit}`);
      if (current) current.className = "number is-active";
      prev[group] = digit;
    };

    setActive("mT", "minutes-dizaines", digits.mT);
    setActive("mU", "minutes-unites", digits.mU);
    setActive("hT", "hours-dizaines", digits.hT);
    setActive("hU", "hours-unites", digits.hU);

    if (ampmEl) ampmEl.innerHTML = `<span>${ampm}</span>`;
  };

  update();
  VintageDesk._interval = setInterval(update, 500);

  // seconds ticker delay
  const startSec = new Date().getSeconds();
  setSecondsAnimation(startSec);

  // radio button toggles active class (no audio)
  radioBtn?.addEventListener("click", () => {
    radioBtn.classList.toggle("is-active");
  });

  VintageDesk._cleanup = () => {
    clearInterval(VintageDesk._interval);
    radioBtn?.removeEventListener("click", null);
  };
};

VintageDesk.unmount = () => {
  VintageDesk._cleanup?.();
};