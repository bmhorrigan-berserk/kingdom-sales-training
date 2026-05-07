/**
 * RadialFan / KingdomMedallion - kingdom decorative element.
 *
 * Renders a COMPLETE, CLOSED CIRCLE medallion with sunburst rays
 * radiating from its center to a clean outer ring boundary. No more
 * corner-anchored partial fans, no clipped edges, no hard rectangular
 * cutoffs. The medallion is a self-contained graphic that can be
 * positioned anywhere on a page and always reads as a full circle.
 *
 * The visual is generated procedurally so we can tint it any kingdom
 * color (no more PNG/SVG bounding-box issues from the catalog
 * textures).
 */

export type FanTexture =
  | "hormone"   // red
  | "peptides"  // navy/blue
  | "weight"    // orange
  | "wellness"  // green
  | "footer";   // slate

type Origin = "tl" | "tr" | "bl" | "br" | "center" | "right" | "left";

const TEXTURE_COLORS: Record<FanTexture, string> = {
  hormone:  "#B23A3A",   // kingdom red
  peptides: "#3B5BDB",   // kingdom blue
  weight:   "#D9622B",   // kingdom orange
  wellness: "#1F6B3F",   // kingdom green
  footer:   "#1A2060",   // kingdom navy
};

// Legacy palette export kept for source-compat. Ignored by the new
// medallion renderer.
export const KINGDOM_PALETTE = [
  "#1F6B3F",
  "#3B5BDB",
  "#D9622B",
  "#B23A3A",
];

interface RadialFanProps {
  texture?: FanTexture;
  /** Where on the page to anchor the medallion. */
  origin?: Origin;
  /** 0-1; default 0.18 reads as a soft engraving on cream. */
  opacity?: number;
  /** Diameter of the medallion in px. */
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  ariaHidden?: boolean;

  /* Legacy props - ignored (kept so existing call sites typecheck). */
  color?: string;
  palette?: string[];
  rays?: number;
  arcs?: number;
  strokeWidth?: number;
}

function originPlacement(origin: Origin): React.CSSProperties {
  /* The medallion is a complete circle - we position it so the WHOLE
     circle is visible inside the section. For corner placements we
     offset just enough that the ring sits in the corner with a small
     gutter, NOT clipped off-screen. */
  const gutter = 32;
  switch (origin) {
    case "tl":     return { top: gutter, left: gutter };
    case "tr":     return { top: gutter, right: gutter };
    case "bl":     return { bottom: gutter, left: gutter };
    case "br":     return { bottom: gutter, right: gutter };
    case "left":   return { top: "50%", left: gutter, transform: "translateY(-50%)" };
    case "right":  return { top: "50%", right: gutter, transform: "translateY(-50%)" };
    case "center":
    default:       return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  }
}

export function RadialFan({
  texture = "wellness",
  origin = "tr",
  opacity = 0.18,
  size = 360,
  className = "",
  style,
  ariaHidden = true,
}: RadialFanProps) {
  const placement = originPlacement(origin);
  const color = TEXTURE_COLORS[texture];

  /* Build the medallion paths: 64 rays from inner ring to outer ring,
     plus 3 concentric circles (outer boundary, mid dashed ring, inner
     focal ring). */
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 1; // -1 keeps strokes inside the viewBox
  const innerR = outerR * 0.18;
  const midR = outerR * 0.62;
  const numRays = 64;

  const rayPaths: string[] = [];
  for (let i = 0; i < numRays; i++) {
    const angle = (i * 2 * Math.PI) / numRays - Math.PI / 2; // start at 12 o'clock
    const x1 = cx + Math.cos(angle) * innerR;
    const y1 = cy + Math.sin(angle) * innerR;
    const x2 = cx + Math.cos(angle) * outerR;
    const y2 = cy + Math.sin(angle) * outerR;
    rayPaths.push(`M${x1.toFixed(2)},${y1.toFixed(2)} L${x2.toFixed(2)},${y2.toFixed(2)}`);
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden={ariaHidden}
      style={{
        position: "absolute",
        opacity,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
        ...placement,
        ...style,
      }}
    >
      {/* Sunburst rays */}
      <g stroke={color} strokeWidth={0.8} fill="none">
        {rayPaths.map((d, i) => (
          <path key={`ray-${i}`} d={d} />
        ))}
      </g>
      {/* Outer ring (closes the circle) */}
      <circle cx={cx} cy={cy} r={outerR} stroke={color} strokeWidth={1.2} fill="none" />
      {/* Mid dashed ring */}
      <circle
        cx={cx}
        cy={cy}
        r={midR}
        stroke={color}
        strokeWidth={0.6}
        fill="none"
        strokeDasharray="2 4"
      />
      {/* Inner focal ring */}
      <circle cx={cx} cy={cy} r={innerR} stroke={color} strokeWidth={0.8} fill="none" />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={1.5} fill={color} />
    </svg>
  );
}

export default RadialFan;
