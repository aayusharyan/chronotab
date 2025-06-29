import van from "../assets/js/van.js";

export default function WordBlocks() {
  const blocksHtml = Array.from({ length: 60 }, (_, i) => `<div class="block" data-num="${i}"></div>`).join("\n");
  const html = `
  <div class="clock">
    ${blocksHtml}
    <div class="divider"></div>
  </div>
  <div class="switch-theme">
    <p>Change theme</p>
    <label class="switch">
      <input type="checkbox" onchange="changeTheme(event)"/><span class="slider"></span>
    </label>
  </div>`;
  return van.raw(html);
}