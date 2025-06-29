import van from "../assets/js/van.js";

const { div, a, br } = van.tags;

// States for each time fragment
const mon = van.state("");
const d = van.state("");
const y = van.state("");
const h = van.state("");
const m = van.state("");
const s = van.state("");
const mi = van.state("");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function pad(num, n) {
  return String(num).padStart(n, "0");
}

function updateClock() {
  const now = new Date();
  mon.val = months[now.getMonth()];
  d.val = now.getDate();
  y.val = now.getFullYear();
  h.val = pad(now.getHours(), 2);
  m.val = pad(now.getMinutes(), 2);
  s.val = pad(now.getSeconds(), 2);
  mi.val = pad(now.getMilliseconds(), 3);
}

let intervalId = null;

export default function MillisecondBurst() {
  // Build DOM structure identical to original variant
  return div(
    { id: "timedate" },
    a({ id: "mon" }, mon),
    " ",
    a({ id: "d" }, d),
    ", ",
    a({ id: "y" }, y),
    br(),
    a({ id: "h" }, h),
    " : ",
    a({ id: "m" }, m),
    ":",
    a({ id: "s" }, s),
    ":",
    a({ id: "mi" }, mi)
  );
}

// Lifecycle hooks for the app loader
MillisecondBurst.mount = () => {
  updateClock();
  intervalId = setInterval(updateClock, 1);
};

MillisecondBurst.unmount = () => {
  if (intervalId) clearInterval(intervalId);
  intervalId = null;
};