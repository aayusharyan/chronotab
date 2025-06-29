import van from "../assets/js/van.js";

const { div, ul, li } = van.tags;

function makeList(className, digits) {
  return ul({ class: className }, digits.map((d) => li(String(d))));
}

export default function ScrollDownDigits() {
  return div(
    makeList("hourTens", [0, 1, 2]),
    makeList("hourOnes", Array.from({ length: 10 }, (_, i) => i)),
    makeList("minuteTens", [0, 1, 2, 3, 4, 5]),
    makeList("minuteOnes", Array.from({ length: 10 }, (_, i) => i)),
    makeList("secondTens", [0, 1, 2, 3, 4, 5]),
    makeList("secondOnes", Array.from({ length: 10 }, (_, i) => i))
  );
}