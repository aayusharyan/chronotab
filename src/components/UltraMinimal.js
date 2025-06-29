import van from "../assets/js/van.js";

const { div, section } = van.tags;

export default function UltraMinimal() {
  // Build 60 indicator sections
  const indicators = Array.from({ length: 60 }, () => section({ class: "clock__indicator" }));

  return div(
    { class: "clock" },
    div({ class: "clock__second" }),
    div({ class: "clock__minute" }),
    div({ class: "clock__hour" }),
    div({ class: "clock__axis" }),
    ...indicators
  );
}

function setDelay(selector, seconds) {
  const el = document.querySelector(selector);
  if (el) {
    el.style.animationDelay = `${-seconds}s`;
  }
}

function secondsSinceMidnight() {
  const now = new Date();
  return Math.round((now - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 1000);
}

UltraMinimal.mount = () => {
  const secsToday = secondsSinceMidnight();
  setDelay(".clock__second", secsToday % 60);
  setDelay(".clock__minute", secsToday);
  setDelay(".clock__hour", secsToday);
};

UltraMinimal.unmount = () => {
  // nothing to clean
};