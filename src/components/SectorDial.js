import van from "../assets/js/van.js";

// Raw SVG and controls structure (minus script)
const markup = `
<svg viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <filter id="shadow-large"><feDropShadow dx="0" dy="0" stdDeviation="4"/></filter>
    <filter id="shadow-small"><feDropShadow dx="0" dy="0" stdDeviation="0.2"/></filter>
    <mask id="mask">
      <g transform="translate(50 50)">
        <g class="hours" transform="rotate(-15)">
          <circle cx="0" cy="0" r="50" fill="#fff"></circle>
          <path d="M 0 -50 v 50 l 28.86 -50" fill="#000"></path>
        </g>
      </g>
    </mask>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#303335"></circle>
  <circle cx="50" cy="50" r="42" fill="#EA3F3F" filter="url(#shadow-large)"></circle>
  <g class="clock--face" font-size="8px" transform="translate(50 50)" text-anchor="middle" dominant-baseline="middle"></g>
  <circle mask="url(#mask)" cx="50" cy="50" r="50" fill="#303335"></circle>
  <circle cx="50" cy="50" r="4" filter="url(#shadow-small)" fill="#303335"></circle>
  <g class="hands" transform="translate(50 50)">
    <g class="minutes" transform="rotate(0)">
      <path fill="#fff" d="M -0.4 8 h 0.8 v -33 h -0.8 z"></path>
      <circle fill="#303335" cx="0" cy="0" r="0.6"></circle>
    </g>
    <g class="seconds" transform="rotate(0)">
      <path fill="#EA3F3F" d="M -0.4 10 h 0.8 v -45 h -0.8 z"></path>
      <circle stroke-width="0.4" stroke="#EA3F3F" fill="#303335" cx="0" cy="0" r="0.8"></circle>
    </g>
  </g>
</svg>
<div class="controls">
  <div class="controls__control" data-control="hours">
    <button>+</button>
    <span class="control--hours">h</span>
    <button>-</button>
  </div>
  <div class="controls__control" data-control="minutes">
    <button>+</button>
    <span class="control--minutes">m</span>
    <button>-</button>
  </div>
  <div class="controls__control" data-control="seconds">
    <button>+</button>
    <span class="control--seconds">s</span>
    <button>-</button>
  </div>
</div>`;

function zeroPad(num) { return num >= 10 ? String(num) : `0${num}`; }
function twelveClock(h24) { if (h24 === 0) return 12; if (h24 > 12) return h24 - 12; return h24; }

export default function SectorDial() {
  return van.raw(markup);
}

SectorDial.mount = () => {
  const root = document.getElementById("clock-content") || document.body; // fallback
  const svgEl = root.querySelector("svg");
  if (!svgEl) return;

  // Populate numbers around dial
  const faceGroup = svgEl.querySelector("g.clock--face");
  if (faceGroup && faceGroup.children.length === 0) {
    for (let i = 0; i < 12; i++) {
      const deg = -90 + 30 * (i + 1);
      const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
      t.setAttribute("transform", `rotate(${deg}) translate(34 0) rotate(${-deg})`);
      t.textContent = zeroPad(i + 1);
      faceGroup.appendChild(t);
    }
  }

  const gHours = svgEl.querySelector("g.hours");
  const gMinutes = svgEl.querySelector("g.minutes");
  const gSeconds = svgEl.querySelector("g.seconds");

  // Apply CSS transition for smoothness
  [gHours, gMinutes, gSeconds].forEach(g => { if (g) g.style.transition = "transform 0.4s"; });

  // Initial time
  const now = new Date();
  const time = {
    hours: twelveClock(now.getHours()),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };
  const rotation = { ...time };

  const spans = {
    hours: document.querySelector("span.control--hours"),
    minutes: document.querySelector("span.control--minutes"),
    seconds: document.querySelector("span.control--seconds"),
  };
  Object.entries(time).forEach(([k,v])=>{ spans[k].textContent = zeroPad(v); });
  const applyTransforms = () => {
    gHours.setAttribute("transform", `rotate(${-15 + rotation.hours * 30})`);
    gMinutes.setAttribute("transform", `rotate(${rotation.minutes * 6})`);
    gSeconds.setAttribute("transform", `rotate(${rotation.seconds * 6})`);
  };
  applyTransforms();

  // Buttons logic
  const buttons = root.querySelectorAll(".controls button");
  const handleClick = (e) => {
    const key = e.target.parentElement.getAttribute("data-control");
    const operation = e.target.textContent.trim();
    const timeVal = time[key];
    const rotVal = rotation[key];
    let newTimeVal = operation === "+" ? timeVal + 1 : timeVal - 1;
    let newRotVal = operation === "+" ? rotVal + 1 : rotVal - 1;
    if (key === "hours") {
      newTimeVal = newTimeVal > 12 ? 1 : newTimeVal === 0 ? 12 : newTimeVal;
    } else {
      newTimeVal = newTimeVal > 59 ? 0 : newTimeVal < 0 ? 59 : newTimeVal;
    }
    time[key] = newTimeVal;
    rotation[key] = newRotVal;
    spans[key].textContent = zeroPad(newTimeVal);
    applyTransforms();
  };
  buttons.forEach(b => b.addEventListener("click", handleClick));

  SectorDial.unmount = () => {
    buttons.forEach(b => b.removeEventListener("click", handleClick));
  };
};