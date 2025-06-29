import van from "../assets/js/van.js";

const { div, span } = van.tags;

function createDigitSlider(initialDigit = 0) {
  const digitState = van.state(initialDigit);

  const slider = div({ class: "timer-char-slider" },
    Array.from({ length: 10 }, (_, i) => span({ class: () => `timer-char-slider-option${digitState.val === i ? " active" : ""}` }, i))
  );

  const charDiv = div({ class: "timer-char number" }, slider);

  return { el: charDiv, digitState };
}

function createColon() {
  return span({ class: "timer-char colon" }, ":");
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

export default function ScrollUpDigits() {
  // Build timer-text container
  const segments = [];

  function pushDigit(initial = 0) {
    const seg = createDigitSlider(initial);
    segments.push(seg);
    return seg.el;
  }

  const timerText = div(
    { id: "timer-text" },
    // HH
    pushDigit(),
    pushDigit(),
    createColon(),
    // MM
    pushDigit(),
    pushDigit(),
    createColon(),
    // SS
    pushDigit(),
    pushDigit()
  );

  const timerContainer = div({ id: "timer" }, timerText);
  const root = div({ id: "app" }, timerContainer);

  // Each digit slider needs computed height to set top offset. We'll compute after first render.
  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    hours = hours % 12 === 0 ? 12 : hours % 12;
    const hStr = pad2(hours);
    const mStr = pad2(now.getMinutes());
    const sStr = pad2(now.getSeconds());
    const timeStr = hStr + mStr + sStr; // 6 digits

    segments.forEach((seg, idx) => {
      const digit = parseInt(timeStr[idx], 10);
      if (seg.digitState.val === digit) return;
      seg.digitState.val = digit;
      // update active classes and top offset
      const slider = seg.el.querySelector(".timer-char-slider");
      const height = seg.el.offsetHeight;
      slider.style.top = `${digit * height * -1}px`;
      slider.querySelectorAll(".timer-char-slider-option").forEach((sp, i) => {
        sp.classList.toggle("active", i === digit);
      });
    });
  }

  let intervalId;
  ScrollUpDigits.mount = () => {
    // initial top calculation after DOM insertion
    setTimeout(() => {
      segments.forEach((seg) => {
        const digit = seg.digitState.val;
        const h = seg.el.offsetHeight;
        seg.el.querySelector(".timer-char-slider").style.top = `${digit * h * -1}px`;
      });
    });
    updateTime();
    intervalId = setInterval(updateTime, 1000);
  };

  ScrollUpDigits.unmount = () => {
    clearInterval(intervalId);
  };

  return root;
}