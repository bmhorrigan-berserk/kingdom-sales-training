/**
 * RadialFan - engraved-line sunburst, kingdom signature decoration.
 *
 * Two modes:
 * 1. Single color (legacy): pass `color` (string).
 * 2. Multi-color: pass `palette` (array). Rays alternate through the palette
 *    so the engraving shimmers green / blue / orange / red across the
 *    cream surface. This is what the kingdom site now uses everywhere.
 *
 * Pass `palette={KINGDOM_PALETTE}` for the canonical 4-color set.
 */
type Origin = "tl" | "tr" | "bl" | "br" | "center" | "right" | "left";

export const KINGDOM_PALETTE = [
  "#1F6B3F", // kingdom green
  "#3B5BDB", // kingdom blue
  "#D9622B", // kingdom orange
  "#B23A3A", // kingdom red
];

interface RadialFanProps {
  origin?: Origin;
  color?: string;
  palette?: string[];
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
  color,
  palette,
  opacity = 0.18,
  size = 800,
  rays = 48,
  arcs = 5,
  strokeWidth = 0.7,
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

  // Build per-ray records so we can color each independently when a palette
  // is provided.
  const rayPaths: { d: string; color: string }[] = [];
  for (let i = 0; i < rays; i++) {
    const t = rays === 1 ? 0 : i / (rays - 1);
    const angle = startAngle + (endAngle - startAngle) * t;
    const x2 = cx + Math.cos(angle) * maxRadius;
    const y2 = cy + Math.sin(angle) * maxRadius;
    const c = palette && palette.length > 0
      ? palette[i % palette.length]
      : (color ?? "#3B5BDB");
    rayPaths.push({
      d: `M${cx},${cy} L${x2.toFixed(2)},${y2.toFixed(2)}`,
      color: c,
    });
  }

  const arcPaths: { d: string; color: string }[] = [];
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
    const c = palette && palette.length > 0
      ? palette[(r - 1) % palette.length]
      : (color ?? "#3B5BDB");
    arcPaths.push({ d: path, color: c });
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ pointerEvents: "none", ...style }}
      aria-hidden={ariaHidden}
      preserveAspectRatio="xMidYMid slice"
    >
      <g strokeWidth={strokeWidth} fill="none" opacity={opacity}>
        {rayPaths.map((r, i) => (
          <path key={`ray-${i}`} d={r.d} stroke={r.color} />
        ))}
      </g>
      <g
        strokeWidth={strokeWidth * 0.7}
        fill="none"
        opacity={opacity * 0.85}
        strokeDasharray="2 8"
      >
        {arcPaths.map((a, i) => (
          <path key={`arc-${i}`} d={a.d} stroke={a.color} />
        ))}
      </g>
    </svg>
  );
}

export default RadialFan;
