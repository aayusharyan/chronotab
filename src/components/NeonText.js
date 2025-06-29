import van from "../assets/js/van.js";

const { div } = van.tags;

const timeState = van.state("");

function pad(n) { return String(n).padStart(2, "0"); }

function update() {
  const d = new Date();
  let h = d.getHours();
  let session = "AM";
  if (h === 0) h = 12;
  if (h > 12) { h -= 12; session = "PM"; }
  const m = d.getMinutes();
  const s = d.getSeconds();
  timeState.val = `${pad(h)}:${pad(m)}:${pad(s)} ${session}`;
}

let timer = null;

export default function NeonText() {
  return div({ id: "MyClockDisplay", class: "clock" }, timeState);
}

NeonText.mount = () => {
  update();
  timer = setInterval(update, 1000);
};

NeonText.unmount = () => {
  clearInterval(timer);
};