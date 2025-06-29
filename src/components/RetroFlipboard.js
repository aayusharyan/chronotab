import van from "../assets/js/van.js";

const { div } = van.tags;

function createFlipper(initial = "00") {
  return van.raw(`
    <div class="flipper">
      <div class="gear"></div>
      <div class="gear"></div>
      <div class="top"><div class="text">${initial}</div></div>
      <div class="bottom"><div class="text">${initial}</div></div>
    </div>
  `);
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function buildClock() {
  const clock = div({ class: "clock" }, createFlipper(), createFlipper(), createFlipper());
  return clock;
}

function flipNumber(flipper, newNumber) {
  const top = flipper.querySelector(".top");
  const bottom = flipper.querySelector(".bottom");

  const newTop = top.cloneNode(true);
  const newBottom = bottom.cloneNode(true);
  newTop.classList.add("new");
  newBottom.classList.add("new");
  newBottom.querySelector(".text").textContent = newNumber;

  // insert newTop right after original top
  top.after(newTop);
  // append newBottom inside newTop
  newTop.appendChild(newBottom);

  flipper.classList.add("flipping");

  // Update text in existing top immediately
  top.querySelector(".text").textContent = newNumber;

  // After half rotation time (500ms), update bottom text
  setTimeout(() => {
    bottom.querySelector(".text").textContent = newNumber;
  }, 500);
}

let intervalId = null;

export default function RetroFlipboard() {
  const root = buildClock();

  const flippers = Array.from(root.querySelectorAll(".flipper"));
  const [hourFlip, minuteFlip, secondFlip] = flippers;

  function cleanupNew() {
    flippers.forEach((f) => {
      f.classList.remove("flipping");
    });
    root.querySelectorAll(".flipper .new").forEach((el) => el.remove());
  }

  let lastH = null,
    lastM = null,
    lastS = null;

  function update() {
    cleanupNew();
    const now = new Date();
    let h = now.getHours();
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
    const hourStr = pad2(h);
    const minStr = pad2(now.getMinutes());
    const secStr = pad2(now.getSeconds());

    if (hourStr !== lastH) {
      flipNumber(hourFlip, hourStr);
      lastH = hourStr;
    }
    if (minStr !== lastM) {
      flipNumber(minuteFlip, minStr);
      lastM = minStr;
    }
    if (secStr !== lastS) {
      flipNumber(secondFlip, secStr);
      lastS = secStr;
    }
  }

  RetroFlipboard.mount = () => {
    update();
    intervalId = setInterval(update, 500);
  };

  RetroFlipboard.unmount = () => {
    clearInterval(intervalId);
  };

  return root;
}