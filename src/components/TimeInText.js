import van from "../assets/js/van.js";

export default function TimeInText() {
  // The markup is largely static; we rely on CSS to hide/show active words
  const html = `
  <div id="text-clock">
    <p id="line-1"><span id="it" class="active">IT</span>L<span id="is" class="active">IS</span>AS<span id="tgif">GTFI</span></p>
    <p id="line-2">AC<span id="quarter" class="desc">QUARTER</span>BS</p>
    <p><span id="twenty" class="desc">TWENTY</span><span id="five" class="desc">FIVE</span>X</p>
    <p><span id="half" class="desc">HALF</span>B<span id="ten" class="desc">TEN</span>F<span id="to" class="desc">TO</span></p>
    <p><span id="past" class="desc">PAST</span>ERU<span id="nine" class="hr">NINE</span></p>
    <p><span id="one" class="hr">ONE</span><span id="six" class="hr">SIX</span><span id="three" class="hr">THREE</span></p>
    <p id="line-7"><span id="four" class="hr">FOUR</span><span id="five-hr" class="hr">FIVE</span><span id="two" class="hr">TWO</span></p>
    <p id="line-8"><span id="eight" class="hr">EIGHT</span><span id="eleven" class="hr">ELEVEN</span></p>
    <p id="line-9"><span id="seven" class="hr">SEVEN</span><span id="twelve" class="hr">TWELVE</span></p>
    <p id="line-10"><span id="ten-hr" class="hr">TEN</span>SE<span id="oclock" class="desc">OCLOCK</span></p>
    <p id="line-11"><span id="midnight" class="hr">MIDNIGHT</span></p>
  </div>`;
  return van.raw(html);
}

// ----- logic identical to original clock -----
function zeroPad(num) { return num < 10 ? `0${num}` : String(num); }

TimeInText.mount = () => {
  const root = document.getElementById("text-clock");
  if (!root) return;

  const descElems = root.querySelectorAll(".desc");
  const hrElems = root.querySelectorAll(".hr");
  const tgifEl = root.querySelector("#tgif");

  const hoursObj = {
    1: "#one",
    2: "#two",
    3: "#three",
    4: "#four",
    5: "#five-hr",
    6: "#six",
    7: "#seven",
    8: "#eight",
    9: "#nine",
    10: "#ten-hr",
    11: "#eleven",
    12: "#twelve",
    23: "#eleven",
    24: "#midnight",
    0: "#midnight",
  };

  const updateDesc = (selectors) => {
    descElems.forEach((el) => el.classList.remove("active"));
    if (!selectors) return;
    root.querySelectorAll(selectors).forEach((el) => el.classList.add("active"));
  };
  const updateHour = (selector) => {
    hrElems.forEach((el) => el.classList.remove("active"));
    if (selector) root.querySelector(selector)?.classList.add("active");
  };

  const update = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (hours > 12 && hours !== 0 && hours !== 23) hours -= 12;

    const minsSecs = parseInt(`${zeroPad(minutes)}${zeroPad(seconds)}`);
    if (minsSecs > 3230) hours += 1;

    if (now.getDay() === 5) tgifEl.textContent = "TGIF";

    updateHour(hoursObj[hours]);

    // Determine phrases
    let selectors = null;
    const ms = minsSecs;
    if ((ms >= 5730 && ms < 6000) || (ms >= 0 && ms < 230)) {
      if (hours !== 24 && hours !== 0) selectors = "#oclock";
    } else if (ms >= 230 && ms < 730) {
      selectors = "#five, #past";
    } else if (ms >= 730 && ms < 1230) {
      selectors = "#ten, #past";
    } else if (ms >= 1230 && ms < 1730) {
      selectors = "#quarter, #past";
    } else if (ms >= 1730 && ms < 2230) {
      selectors = "#twenty, #past";
    } else if (ms >= 2230 && ms < 2730) {
      selectors = "#twenty, #five, #past";
    } else if (ms >= 2730 && ms < 3230) {
      selectors = "#half, #past";
    } else if (ms >= 3230 && ms < 3730) {
      selectors = "#twenty, #five, #to";
    } else if (ms >= 3730 && ms < 4230) {
      selectors = "#twenty, #to";
    } else if (ms >= 4230 && ms < 4730) {
      selectors = "#quarter, #to";
    } else if (ms >= 4730 && ms < 5230) {
      selectors = "#ten, #to";
    } else if (ms >= 5230 && ms < 5730) {
      selectors = "#five, #to";
    }
    updateDesc(selectors);
  };

  update();
  TimeInText._interval = setInterval(update, 1000);
};

TimeInText.unmount = () => {
  clearInterval(TimeInText._interval);
};