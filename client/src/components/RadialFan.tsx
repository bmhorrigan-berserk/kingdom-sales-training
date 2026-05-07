/**
 * RadialFan - kingdom catalog-style sunburst.
 *
 * Renders the kingdom catalog texture SVG with the focal point
 * positioned INSIDE the visible section (not off-screen). The rays
 * radiate outward from the visible focal toward a soft circular
 * fade boundary so the design reads as a complete sunburst with no
 * hard rectangular cutoffs.
 *
 * Same look as the kingdom Sales Catalog landing page. Sized BIG
 * (default 1400px) so the radiation fills the page, with per-page
 * `focal` controlling where the empty inner circle sits and per-page
 * `texture` controlling the hue.
 *
 * The catalog SVG focal point is at viewBox (676, 510) of 1150x1161,
 * i.e. (0.587, 0.439) of the SVG. We compute the SVG top-left so the
 * focal lands at the requested page position.
 */

export type FanTexture =
  | "hormone"   // red    #731C0D
  | "peptides"  // navy   #0D1A73
  | "weight"    // orange #D8730D
  | "wellness"  // green  #40760A
  | "footer";   // slate  #3F4559

/**
 * Where the focal (empty inner circle) sits on the page. Each page
 * can pick a different focal so the sunburst feels different across
 * the site without changing the asset. Values are in CSS units that
 * resolve against the section box.
 */
export type FanFocal =
  | "tr"      // upper-right (default - matches catalog landing)
  | "tl"      // upper-left
  | "br"      // lower-right
  | "bl"      // lower-left
  | "right"   // mid-right
  | "left"    // mid-left
  | "top"     // top-center
  | "bottom"  // bottom-center
  | "center"; // dead center

// Legacy alias - older call sites pass `origin`
type Origin = FanFocal;

// Legacy palette export kept for source-compat.
export const KINGDOM_PALETTE = ["#1F6B3F", "#3B5BDB", "#D9622B", "#B23A3A"];

const FOCAL_X_PCT = 0.587;
const FOCAL_Y_PCT = 0.439;

interface RadialFanProps {
  /** Hue of the engraving. */
  texture?: FanTexture;
  /** Where the focal sits on the section. */
  origin?: Origin;
  /** 0-1; default 0.16 reads as a soft engraving on cream. */
  opacity?: number;
  /** SVG size in px - default 1400, big so the radiation fills the page. */
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  ariaHidden?: boolean;

  /* Legacy props ignored. */
  color?: string;
  palette?: string[];
  rays?: number;
  arcs?: number;
  strokeWidth?: number;
}

/**
 * Resolve the focal position to CSS top/left percentages for the
 * section. Each anchor places the focal at a recognizable point
 * inside the visible area, NOT off-screen.
 */
function focalCoords(focal: FanFocal): { topPct: number; leftPct: number } {
  switch (focal) {
    case "tr":     return { topPct: 18, leftPct: 78 };
    case "tl":     return { topPct: 18, leftPct: 22 };
    case "br":     return { topPct: 82, leftPct: 78 };
    case "bl":     return { topPct: 82, leftPct: 22 };
    case "right":  return { topPct: 50, leftPct: 82 };
    case "left":   return { topPct: 50, leftPct: 18 };
    case "top":    return { topPct: 18, leftPct: 50 };
    case "bottom": return { topPct: 82, leftPct: 50 };
    case "center":
    default:       return { topPct: 50, leftPct: 50 };
  }
}

export function RadialFan({
  texture = "wellness",
  origin = "tr",
  opacity = 0.16,
  size = 1400,
  className = "",
  style,
  ariaHidden = true,
}: RadialFanProps) {
  const { topPct, leftPct } = focalCoords(origin);

  /* Position the SVG so the focal point lands at (leftPct%, topPct%)
     of the section.

     For a section with width W, the focal in section coords is at
     (W * leftPct / 100). The SVG's focal (in SVG-local coords) is at
     `size * FOCAL_X_PCT`. So the SVG's top-left needs to be at
     section-x:  W * leftPct/100 - size * FOCAL_X_PCT
     section-y:  H * topPct/100 - size * FOCAL_Y_PCT

     We can express that with `left: calc(<leftPct>% - <focal_x>px)`. */
  const focalLeftPx = size * FOCAL_X_PCT;
  const focalTopPx = size * FOCAL_Y_PCT;

  /* The radial mask is anchored at the SVG's focal (so the dense
     center stays opaque) and fades to transparent before reaching the
     SVG bounding box, giving the soft circular boundary. */
  const fadeMask = `radial-gradient(circle at ${FOCAL_X_PCT * 100}% ${FOCAL_Y_PCT * 100}%, black 0%, black 30%, transparent 70%)`;

  return (
    <img
      src={`/textures/texture-${texture}.svg`}
      alt=""
      aria-hidden={ariaHidden}
      className={className}
      style={{
        position: "absolute",
        width: size,
        height: size,
        opacity,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
        left: `calc(${leftPct}% - ${focalLeftPx}px)`,
        top: `calc(${topPct}% - ${focalTopPx}px)`,
        maskImage: fadeMask,
        WebkitMaskImage: fadeMask,
        ...style,
      }}
    />
  );
}

export default RadialFan;
