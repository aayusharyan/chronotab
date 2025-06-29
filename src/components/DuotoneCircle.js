import van from "../assets/js/van.js";

const { div, svg: svgTag, filter, feGaussianBlur, feOffset, g, circle, line } = van.tags;

export default function DuotoneCircle() {
  // Build static SVG markup equivalent
  return [
    div({ class: "filler" }),
    svgTag(
      { width: 200, height: 200 },
      // defs
      filter(
        { id: "innerShadow", x: "-20%", y: "-20%", width: "140%", height: "140%" },
        feGaussianBlur({ in: "SourceGraphic", stdDeviation: 3, result: "blur" }),
        feOffset({ in: "blur", dx: 2.5, dy: 2.5 })
      ),
      g(
        circle({ id: "shadow", style: "fill:rgba(0,0,0,0.1)", cx: 97, cy: 100, r: 87, filter: "url(#innerShadow)" }),
        circle({ id: "circle", style: "stroke:#FFF;stroke-width:12px;fill:#20B7AF", cx: 100, cy: 100, r: 80 })
      ),
      g(
        line({
          x1: 100,
          y1: 100,
          x2: 100,
          y2: 55,
          transform: "rotate(80 100 100)",
          style: "stroke-width:3px;stroke:#fffbf9;",
          id: "hourhand",
        },
          // nested animateTransform as string due to SVG limitations in van
          van.raw(`<animatetransform attributeName="transform" attributeType="XML" type="rotate" dur="43200s" repeatCount="indefinite"/>`)
        ),
        line({
          x1: 100,
          y1: 100,
          x2: 100,
          y2: 40,
          style: "stroke-width:4px;stroke:#fdfdfd;",
          id: "minutehand",
        },
          van.raw(`<animatetransform attributeName="transform" attributeType="XML" type="rotate" dur="3600s" repeatCount="indefinite"/>`)
        ),
        line({
          x1: 100,
          y1: 100,
          x2: 100,
          y2: 30,
          style: "stroke-width:2px;stroke:#C1EFED;",
          id: "secondhand",
        },
          van.raw(`<animatetransform attributeName="transform" attributeType="XML" type="rotate" dur="60s" repeatCount="indefinite"/>`)
        )
      ),
      circle({ id: "center", style: "fill:#128A86;stroke:#C1EFED;stroke-width:2px;", cx: 100, cy: 100, r: 3 })
    )
  ];
}