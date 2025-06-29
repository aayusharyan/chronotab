import van from "../assets/js/van.js";

const { div, span } = van.tags;

// Months and days arrays for digital display
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
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function buildDial(count, radiusPx) {
  // return a div element with count span children rotated
  return div(
    Array.from({ length: count }, (_, i) =>
      span({
        style: `transform: rotate(${i * 6}deg) translateX(${radiusPx}px);`,
      }, i)
    )
  );
}

export default function StadiumChronograph() {
  // Digital elements states handled via direct DOM updates for speed
  const dateEl = div({ class: "date" });
  const timeEl = div({ class: "time" });
  const dayEl = div({ class: "day" });

  // Analog rings
  const secondRing = div({ class: "second" });
  const minuteRing = div({ class: "minute" });
  const hourRing = div({ class: "hour" });
  const dailRing = div({ class: "dail" });

  // spear decorative element
  const spear = div({ class: "spear" });

  const clockDigital = div({ class: "clock-digital" }, dateEl, timeEl, dayEl);
  const clockAnalog = div(
    { class: "clock-analog" },
    spear,
    hourRing,
    minuteRing,
    secondRing,
    dailRing
  );

  // Container
  const root = div({ class: "clock-container" }, clockDigital, clockAnalog);

  // Build static dial numbers/ticks after first render
  setTimeout(() => {
    // Populate dial numbers only once
    if (secondRing.childElementCount === 0) {
      // second/minute/dail 0-59
      secondRing.append(...buildDial(60, 195).children);
      minuteRing.append(...buildDial(60, 145).children);
      dailRing.append(...buildDial(60, 230).children);
      // hour numbers 1-12 rotated accordingly
      hourRing.append(
        ...Array.from({ length: 12 }, (_, i) => {
          const deg = (i + 1) * 30;
          return span(
            {
              style: `transform: rotate(${deg}deg) translateX(100px);`,
            },
            i + 1
          );
        })
      );
    }
  });

  let intervalId = null;

  function updateTime() {
    const now = new Date();
    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hour24 = now.getHours();
    const hour = hour24 % 12 === 0 ? 12 : hour24 % 12;

    // Rotate rings (negative degrees like original)
    secondRing.style.transform = `rotate(${-6 * sec}deg)`;
    minuteRing.style.transform = `rotate(${-6 * min}deg)`;
    hourRing.style.transform = `rotate(${-30 * hour}deg)`;

    // Digital text
    const timeStr = now.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
    const dateStr = `${now.getDate()} . ${months[now.getMonth()]}`;
    dateEl.textContent = dateStr;
    timeEl.textContent = timeStr;
    dayEl.textContent = weekdays[now.getDay()];
  }

  StadiumChronograph.mount = () => {
    updateTime();
    intervalId = setInterval(updateTime, 1000);
  };

  StadiumChronograph.unmount = () => {
    clearInterval(intervalId);
  };

  return root;
}