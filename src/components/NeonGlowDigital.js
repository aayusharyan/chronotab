import van from "../assets/js/van.js";

const { div, p } = van.tags;

const timeState = van.state("");
const dateState = van.state("");

function pad(num, len) {
  return String(num).padStart(len, "0");
}

function format() {
  const now = new Date();
  timeState.val = `${pad(now.getHours(), 2)}:${pad(now.getMinutes(), 2)}:${pad(
    now.getSeconds(),
    2
  )}`;
  const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  dateState.val = `${pad(now.getFullYear(), 4)}-${pad(
    now.getMonth() + 1,
    2
  )}-${pad(now.getDate(), 2)} ${week[now.getDay()]}`;
}

let intervalId = null;

export default function NeonGlowDigital() {
  return div(
    { id: "clock" },
    p({ class: "date" }, dateState),
    p({ class: "time" }, timeState)
  );
}

NeonGlowDigital.mount = () => {
  format();
  intervalId = setInterval(format, 1000);
};

NeonGlowDigital.unmount = () => {
  clearInterval(intervalId);
};
