import van from "../assets/js/van.js";
import AmbientNeonRings from "./AmbientNeonRings.js";
import CircularCalendar from "./CircularCalendar.js";
import ClassicWall from "./ClassicWall.js";
import CrtGlitch from "./CrtGlitch.js";
import DuotoneCircle from "./DuotoneCircle.js";
import ExecutiveAnalog from "./ExecutiveAnalog.js";
import FuturisticHud from "./FuturisticHud.js";
import HybridWallDial from "./HybridWallDial.js";
import IconBlocks from "./IconBlocks.js";
import LegacyQuartzDial from "./LegacyQuartzDial.js";
import MillisecondBurst from "./MillisecondBurst.js";
import ModernDesk from "./ModernDesk.js";
import NeonGlowDigital from "./NeonGlowDigital.js";
import NeonText from "./NeonText.js";
import RetroFlipboard from "./RetroFlipboard.js";
import ScrollDownDigits from "./ScrollDownDigits.js";
import ScrollUpDigits from "./ScrollUpDigits.js";
import SectorDial from "./SectorDial.js";
import StadiumChronograph from "./StadiumChronograph.js";
import StarryNightScene from "./StarryNightScene.js";
import TimeInText from "./TimeInText.js";
import UltraMinimal from "./UltraMinimal.js";
import VintageDesk from "./VintageDesk.js";
import WheelOfTime from "./WheelOfTime.js";
import WordBlocks from "./WordBlocks.js";

const { div, img, h1, p, code } = van.tags;

// Elements injected for the active variant so they can be removed later
// all clock-specific <link> tags are stamped with data-clock-css for easy cleanup
const currentScriptEls = new Set();
let lastUnmount = null; // reserved for future components which expose unmount()

// NEW: keep a reference to the root container and the floating settings button
let rootEl; // assigned on DOMContentLoaded
let currentFab = null; // reference to the floating action button

// Available variants registry
const variants = {
  "ambient-neon-rings": {
    label: "Ambient Neon Rings",
    component: AmbientNeonRings,
    css: "assets/css/ambient-neon-rings.css",
    js: ["assets/js/ambient-neon-rings.js"],
  },
  "circular-calendar": {
    label: "Circular Calendar",
    component: CircularCalendar,
    css: "assets/css/circular-calendar.css",
    js: ["assets/js/circular-calendar.js"],
  },
  "classic-wall": {
    label: "Classic Wall Dial",
    component: ClassicWall,
    css: "assets/css/classic-wall.css",
    js: ["assets/js/classic-wall.js"],
  },
  "crt-glitch": {
    label: "CRT Glitch Clock",
    component: CrtGlitch,
    css: "assets/css/crt-glitch.css",
    js: ["assets/js/crt-glitch.js"],
  },
  "duotone-circle": {
    label: "Duotone Circle",
    component: DuotoneCircle,
    css: "assets/css/duotone-circle.css",
    js: ["assets/js/duotone-circle.js"],
  },
  "executive-analog": {
    label: "Executive Analog",
    component: ExecutiveAnalog,
    css: "assets/css/executive-analog.css",
    js: ["assets/js/executive-analog.js"],
  },
  "futuristic-hud": {
    label: "Futuristic HUD",
    component: FuturisticHud,
    css: "assets/css/futuristic-hud.css",
    js: ["assets/js/futuristic-hud.js"],
  },
  "hybrid-wall-dial": {
    label: "Hybrid Wall Dial",
    component: HybridWallDial,
    css: "assets/css/hybrid-wall-dial.css",
    js: ["assets/js/hybrid-wall-dial.js"],
  },
  "icon-blocks": {
    label: "Icon Blocks",
    component: IconBlocks,
    css: "assets/css/icon-blocks.css",
    js: ["assets/js/icon-blocks.js"],
  },
  "legacy-quartz-dial": {
    label: "Legacy Quartz Dial",
    component: LegacyQuartzDial,
    css: [
      "assets/css/legacy-quartz-dial.css",
      "assets/css/wall-clock-demo.css",
    ],
    // No additional JS needed
  },
  "millisecond-burst": {
    label: "Millisecond Burst",
    component: MillisecondBurst,
    css: "assets/css/millisecond-burst.css",
    // JS logic reimplemented in component
  },
  "modern-desk": {
    label: "Modern Desk",
    component: ModernDesk,
    css: "assets/css/modern-desk.css",
    // Theme toggling handled internally; no extra JS
  },
  "neon-glow-digital": {
    label: "Neon Glow Digital",
    component: NeonGlowDigital,
    css: "assets/css/neon-glow-digital.css",
  },
  "neon-text": {
    label: "Neon Text",
    component: NeonText,
    css: "assets/css/neon-text.css",
  },
  "retro-flipboard": {
    label: "Retro Flipboard",
    component: RetroFlipboard,
    css: "assets/css/retro-flipboard.css",
  },
  "scroll-down-digits": {
    label: "Scroll Down Digits",
    component: ScrollDownDigits,
    css: "assets/css/scroll-down-digits.css",
  },
  "scroll-up-digits": {
    label: "Scroll Up Digits",
    component: ScrollUpDigits,
    css: "assets/css/scroll-up-digits.css",
  },
  "sector-dial": {
    label: "Sector Dial",
    component: SectorDial,
    css: "assets/css/sector-dial.css",
    // No extra JS needed; animation handled in component
  },
  "stadium-chronograph": {
    label: "Stadium Chronograph",
    component: StadiumChronograph,
    css: "assets/css/stadium-chronograph.css",
  },
  "starry-night-scene": {
    label: "Starry Night Scene",
    component: StarryNightScene,
    css: "assets/css/starry-night-scene.css",
  },
  "time-in-text": {
    label: "Time In Text",
    component: TimeInText,
    css: "assets/css/time-in-text.css",
  },
  "ultra-minimal": {
    label: "Ultra Minimal",
    component: UltraMinimal,
    css: "assets/css/ultra-minimal.css",
  },
  "vintage-desk": {
    label: "Vintage Desk",
    component: VintageDesk,
    css: "assets/css/vintage-desk.css",
  },
  "wheel-of-time": {
    label: "Wheel of Time",
    component: WheelOfTime,
    css: "assets/css/wheel-of-time.css",
    js: ["assets/js/wheel-of-time.js"],
  },
  "word-blocks": {
    label: "Word Blocks",
    component: WordBlocks,
    css: "assets/css/word-blocks.css",
    js: ["assets/js/word-blocks.js"],
  },
  // ← add the rest here the same way
};

// Build list array for cards (dir, label)
const variantList = Object.entries(variants).map(([dir, v]) => [dir, v.label]);

// Card component
const Card = (dir, label) =>
  div(
    { class: "column col-4 p-2" },
    div(
      {
        class: "card c-hand",
        onclick: () => {
          localStorage.setItem("selectedClock", dir);
          showVariant(dir); // ← switch to the selected clock immediately
        },
      },
      div(
        { class: "card-image" },
        img({
          src: "assets/img/placeholder.png",
          alt: label,
          class: "img-responsive",
        })
      ),
      div(
        { class: "card-body p-2 text-center" },
        div({ class: "h6 mb-0 text-dark" }, label)
      )
    )
  );

// Main loader
function loadVariant(dir) {
  const conf = variants[dir];
  if (!conf) {
    // fallback
    location.href = `${dir}.html`;
    return;
  }

  // run previous unmount
  lastUnmount?.();
  lastUnmount = null;

  // cleanup previous assets
  document
    .querySelectorAll('link[data-clock-css="yes"]')
    .forEach((el) => el.remove());
  currentScriptEls.forEach((el) => el.remove());
  currentScriptEls.clear();

  // ----- inject CSS (support array) -----
  const cssPaths = Array.isArray(conf.css)
    ? conf.css
    : conf.css
    ? [conf.css]
    : [];
  cssPaths.forEach((href) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.setAttribute("data-clock-css", "yes");
    document.head.appendChild(link);
  });

  // inject scripts
  (conf.js || []).forEach((src) => {
    const s = document.createElement("script");
    s.src = src;
    document.body.appendChild(s);
    currentScriptEls.add(s);
  });

  // render component
  const container = document.getElementById("clock-content");
  if (!container) return;
  container.innerHTML = "";
  const comp = conf.component();
  van.add(container, comp);

  // Optional lifecycle hooks
  if (typeof conf.component.mount === "function") conf.component.mount();
  if (typeof conf.component.unmount === "function")
    lastUnmount = conf.component.unmount;
}

// -------------------------------------------------------------
// Helper views for Settings <-> Variant modes
// -------------------------------------------------------------

// Create (or return existing) floating settings button
function createSettingsFab() {
  if (currentFab) return currentFab;
  const btn = document.createElement("button");
  btn.setAttribute("aria-label", "Settings");
  btn.className = "settings-fab";
  Object.assign(btn.style, {
    position: "fixed",
    bottom: "1.5rem",
    right: "1.5rem",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    border: "none",
    background: "#3b82f6",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,.3)",
    zIndex: 1000,
  });
  btn.innerHTML = "\u2699"; // gear unicode ⚙︎
  btn.onclick = () => {
    showSettings();
  };
  document.body.appendChild(btn);
  currentFab = btn;
  return btn;
}

// Render the settings screen
function showSettings() {
  // remove FAB if present
  currentFab?.remove();
  currentFab = null;

  // ensure we are in select mode (update URL param)
  const url = new URL(location.href);
  url.searchParams.set("select", "");
  history.replaceState(null, "", url.pathname + url.search);

  rootEl.innerHTML = "";
  van.add(rootEl, App());
}

// Render a chosen clockface and show the FAB
function showVariant(dir) {
  // clear select param so refresh lands on clock view
  const url = new URL(location.href);
  url.searchParams.delete("select");
  history.replaceState(null, "", url.pathname + url.search);

  rootEl.innerHTML = "";
  const container = document.createElement("div");
  container.id = "clock-content";
  rootEl.appendChild(container);

  loadVariant(dir);
  createSettingsFab();
}

// -------------------------------------------------------------
// Root App component – moved from index.html to vanJS (similar to React)
// -------------------------------------------------------------

const App = () =>
  div(
    { class: "hero bg-dark" },
    div(
      { class: "hero-body container grid-md text-light px-2 py-6" },
      h1({ class: "h2 text-center mb-8" }, "Select Your Clock Face"),
      div(
        { id: "clock-list", class: "columns col-gap-lg" },
        variantList.map(([dir, label]) => Card(dir, label))
      ),
      p(
        { class: "mt-10 text-center text-small text-secondary" },
        "Your choice is stored locally. To change later, open a new tab with ",
        code("?select"),
        " query."
      ),
      div({ id: "clock-content" })
    )
  );

// Mount the root App & restore previous selection (if enabled)
window.addEventListener("DOMContentLoaded", () => {
  rootEl = document.getElementById("app");
  if (!rootEl) return;

  const stored = localStorage.getItem("selectedClock");
  const forceSelectMode = new URLSearchParams(location.search).has("select");

  if (!stored || forceSelectMode || true) {
    showSettings();
  } else {
    showVariant(stored);
  }
});
