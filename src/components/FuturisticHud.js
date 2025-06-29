import van from "../assets/js/van.js";

const { div, svg: svgTag, defs, pattern, circle, radialGradient, stop, filter, feGaussianBlur, feOffset, feMerge, feMergeNode, rect, ellipse, g, path, text } = van.tags;

export default function FuturisticHud() {
  return svgTag(
    {},
    defs(
      pattern(
        { id: "dotPattern", x: 0, y: 0, width: 10, height: 10, patternUnits: "userSpaceOnUse" },
        circle({ class: "bgDot", cx: 5, cy: 5, r: 2 })
      ),
      radialGradient(
        { id: "backHoleBelowClock", cx: "50%", cy: "50%", r: "50%", fx: "50%", fy: "50%" },
        stop({ offset: "50%", style: "stop-color:rgb(0,0,0);stop-opacity:0.7" }),
        stop({ offset: "100%", style: "stop-color:rgb(0,0,0);stop-opacity:0" })
      ),
      radialGradient(
        { id: "blackVignette", cx: "50%", cy: "50%", r: "50%", fx: "50%", fy: "50%" },
        stop({ offset: "40%", style: "stop-color:rgb(0,0,0);stop-opacity:0" }),
        stop({ offset: "100%", style: "stop-color:rgb(0,0,0);stop-opacity:1" })
      ),
      filter(
        { id: "glow" },
        feGaussianBlur({ stdDeviation: 2.5, result: "coloredBlur" }),
        feMerge(
          feMergeNode({ in: "coloredBlur" }),
          feMergeNode({ in: "SourceGraphic" })
        )
      ),
      filter(
        { id: "shadow", x: "-20%", y: "-20%", width: "140%", height: "140%" },
        feGaussianBlur({ in: "SourceAlpha", stdDeviation: 3, result: "shadow" }),
        feOffset({ dx: 1, dy: 1 }),
        feMerge(
          feMergeNode(),
          feMergeNode({ in: "SourceGraphic" })
        )
      )
    ),
    // background objects
    rect({ x: 0, y: 0, width: "100%", height: "100%", style: "stroke:#000;fill:url(#dotPattern);" }),
    ellipse({ cx: 500, cy: 240, rx: 300, ry: 300, fill: "url(#backHoleBelowClock)" }),
    ellipse({ cx: 500, cy: 240, rx: 600, ry: 600, fill: "url(#blackVignette)" }),
    // clock circles and arcs (empty path d gets set by JS)
    circle({ class: "clockCircle hour", cx: 500, cy: 240, r: 150, strokeWidth: 6 }),
    path({ id: "arcHour", class: "clockArc hour", strokeWidth: 6, strokeLinecap: "round", filter: "url(#glow)" }),
    circle({ class: "clockDot hour", r: 8, filter: "url(#glow)" }),
    circle({ class: "clockCircle minute", cx: 500, cy: 240, r: 170, strokeWidth: 3 }),
    path({ id: "arcMinute", class: "clockArc minute", strokeWidth: 3, strokeLinecap: "round", filter: "url(#glow)" }),
    circle({ class: "clockDot minute", r: 5, filter: "url(#glow)" }),
    // captions
    text({ id: "time", class: "caption timeText", x: 500, y: 240, strokeWidth: 0, textAnchor: "middle", alignmentBaseline: "middle", filter: "url(#shadow)" }),
    text({ id: "day", class: "caption dayText", x: 300, y: 210, strokeWidth: 0, textAnchor: "end", alignmentBaseline: "middle", filter: "url(#shadow)" }),
    text({ id: "date", class: "caption dateText", x: 300, y: 250, strokeWidth: 0, textAnchor: "end", alignmentBaseline: "middle", filter: "url(#shadow)" })
  );
}