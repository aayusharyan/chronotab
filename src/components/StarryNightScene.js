import van from "../assets/js/van.js";

const { div, h2, small } = van.tags;

export default function StarryNightScene() {
  const header = div({ class: "header" }, h2("Beneath the Moonlight"), small("Samir Chahine"));

  // Hills container
  const hcon = div({ class: "h-con" }, div({ class: "hill2" }), div({ class: "hill" }), div({ class: "hill3" }));

  // Moons (8)
  const moons = div({ class: "moons" }, Array.from({ length: 8 }, () => div({ class: "moon" })));

  // Shooting stars (8 to satisfy CSS nth-child)
  const shoots = Array.from({ length: 8 }, () => div({ class: "shoot" }));

  // Stars (201 as CSS defines nth-child(0) through nth-child(200))
  const starsContainer = div({ class: "stars" }, Array.from({ length: 201 }, () => div({ class: "star" })));

  return div({ class: "con" }, header, hcon, moons, ...shoots, starsContainer);
}