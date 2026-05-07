/**
 * RadialFan - engraved-line sunburst, kingdom signature decoration.
 * Identical to the dashboard component for cross-product consistency.
 */
type Origin = "tl" | "tr" | "bl" | "br" | "center" | "right" | "left";

interface RadialFanProps {
  origin?: Origin;
  color?: string;
  opacity?: number;
  size?: number;
  rays?: number;
  arcs?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
  ariaHidden?: boolean;
}

function originPoint(origin: Origin, size: number): { cx: number; cy: number } {
  const m = size;
  switch (origin) {
    case "tl":     return { cx: 0,       cy: 0 };
    case "tr":     return { cx: m,       cy: 0 };
    case "bl":     return { cx: 0,       cy: m };
    case "br":     return { cx: m,       cy: m };
    case "left":   return { cx: 0,       cy: m / 2 };
    case "right":  return { cx: m,       cy: m / 2 };
    case "center":
    default:       return { cx: m / 2,   cy: m / 2 };
  }
}

export function RadialFan({
  origin = "tr",
  color = "#3B5BDB",
  opacity = 0.1,
  size = 800,
  rays = 48,
  arcs = 5,
  strokeWidth = 0.5,
  className = "",
  style,
  ariaHidden = true,
}: RadialFanProps) {
  const { cx, cy } = originPoint(origin, size);
  const maxRadius = size * 1.4;

  let startAngle = 0, endAngle = Math.PI;
  if (origin === "br") { startAngle = Math.PI; endAngle = 1.5 * Math.PI; }
  else if (origin === "bl") { startAngle = 1.5 * Math.PI; endAngle = 2 * Math.PI; }
  else if (origin === "tr") { startAngle = 0.5 * Math.PI; endAngle = Math.PI; }
  else if (origin === "tl") { startAngle = 0; endAngle = 0.5 * Math.PI; }
  else if (origin === "right") { startAngle = Math.PI * 0.5; endAngle = Math.PI * 1.5; }
  else if (origin === "left") { startAngle = -Math.PI * 0.5; endAngle = Math.PI * 0.5; }
  else { startAngle = 0; endAngle = 2 * Math.PI; }

  const rayPaths: string[] = [];
  for (let i = 0; i < rays; i++) {
    const t = rays === 1 ? 0 : i / (rays - 1);
    const angle = startAngle + (endAngle - startAngle) * t;
    const x2 = cx + Math.cos(angle) * maxRadius;
    const y2 = cy + Math.sin(angle) * maxRadius;
    rayPaths.push(`M${cx},${cy} L${x2.toFixed(2)},${y2.toFixed(2)}`);
  }

  const arcPaths: string[] = [];
  for (let r = 1; r <= arcs; r++) {
    const radius = (maxRadius / arcs) * r;
    const segments = 80;
    let path = "";
    for (let s = 0; s <= segments; s++) {
      const t = s / segments;
      const angle = startAngle + (endAngle - startAngle) * t;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      path += s === 0 ? `M${x.toFixed(2)},${y.toFixed(2)}` : ` L${x.toFixed(2)},${y.toFixed(2)}`;
    }
    arcPaths.push(path);
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ pointerEvents: "none", ...style }}
      aria-hidden={ariaHidden}
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke={color} strokeWidth={strokeWidth} fill="none" opacity={opacity}>
        {rayPaths.map((d, i) => <path key={`ray-${i}`} d={d} />)}
      </g>
      <g stroke={color} strokeWidth={strokeWidth * 0.7} fill="none" opacity={opacity * 0.9} strokeDasharray="2 8">
        {arcPaths.map((d, i) => <path key={`arc-${i}`} d={d} />)}
      </g>
    </svg>
  );
}

export default RadialFan;
