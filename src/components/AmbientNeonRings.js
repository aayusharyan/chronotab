import van from "../assets/js/van.js";

const { div, canvas } = van.tags;

// Ambient Neon Rings clock face component
export default function AmbientNeonRings() {
  // The canvas will be used by assets/js/ambient-neon-rings.js to draw the clock
  return div(
    { class: "d-flex flex-centered py-6" },
    canvas({ id: "canvas", width: 500, height: 500 })
  );
}