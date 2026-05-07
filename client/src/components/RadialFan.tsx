/**
 * RadialFan - kingdom catalog-style sunburst, GUARANTEED full circle.
 *
 * The catalog texture SVG is positioned inside a circular div
 * (`border-radius: 50%; overflow: hidden`) so the boundary is
 * mathematically a perfect circle - no SVG bounding-box edges, no
 * hard cutoffs, no mask leakage. The SVG is rendered at 2x the
 * circular div's size with the texture's focal point pinned to the
 * div's geometric center. The visible portion is the densest part
 * of the radiation, clipped to a clean circle.
 *
 * Position the medallion anywhere inside the section. Default
 * placement has the FULL circle inside the page (not corner-clipped).
 */

export type FanTexture =
  | "hormone"   // red    #731C0D
  | "peptides"  // navy   #0D1A73
  | "weight"    // orange #D8730D
  | "wellness"  // green  #40760A
  | "footer";   // slate  #3F4559

export type FanFocal =
  | "tr"   // upper-right inset
  | "tl"   // upper-left inset
  | "br"   // lower-right inset
  | "bl"   // lower-left inset
  | "right"
  | "left"
  | "top"
  | "bottom"
  | "center";

type Origin = FanFocal;

export const KINGDOM_PALETTE = ["#1F6B3F", "#3B5BDB", "#D9622B", "#B23A3A"];

const FOCAL_X_PCT = 0.587;
const FOCAL_Y_PCT = 0.439;

interface RadialFanProps {
  texture?: FanTexture;
  origin?: Origin;
  /** 0-1; default 0.16. */
  opacity?: number;
  /** Diameter of the circular medallion in px. The full circle is
      always visible inside the section, never clipped. */
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

/** Where the medallion sits. Inset enough that the FULL circle is
    visible inside the section. */
function placementFor(origin: Origin, size: number): React.CSSProperties {
  // Inset = enough cushion that the circle isn't kissing the section edge.
  const inset = 0;
  switch (origin) {
    case "tr":     return { top: inset, right: inset };
    case "tl":     return { top: inset, left: inset };
    case "br":     return { bottom: inset, right: inset };
    case "bl":     return { bottom: inset, left: inset };
    case "right":  return { top: "50%", right: inset, transform: `translateY(-50%)` };
    case "left":   return { top: "50%", left: inset, transform: `translateY(-50%)` };
    case "top":    return { top: inset, left: "50%", transform: `translateX(-50%)` };
    case "bottom": return { bottom: inset, left: "50%", transform: `translateX(-50%)` };
    case "center":
    default:       return { top: "50%", left: "50%", transform: `translate(-50%, -50%)` };
  }
}

export function RadialFan({
  texture = "wellness",
  origin = "tr",
  opacity = 0.16,
  size = 720,
  className = "",
  style,
  ariaHidden = true,
}: RadialFanProps) {
  const placement = placementFor(origin, size);
  /* Render the SVG at 2x the medallion size so the texture's focal
     can be pinned to the medallion's center while content radiates
     across the entire visible circle. */
  const svgSize = size * 2;
  /* Position the SVG so its focal lands at the medallion's geometric
     center (size/2, size/2). */
  const svgLeft = size / 2 - svgSize * FOCAL_X_PCT;
  const svgTop = size / 2 - svgSize * FOCAL_Y_PCT;

  return (
    <div
      aria-hidden={ariaHidden}
      className={className}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
        opacity,
        // A subtle inner radial fade so the very edge of the circle
        // softens out without ever showing the bounding box.
        WebkitMaskImage:
          "radial-gradient(circle at 50% 50%, black 0%, black 60%, rgba(0,0,0,0.7) 85%, transparent 100%)",
        maskImage:
          "radial-gradient(circle at 50% 50%, black 0%, black 60%, rgba(0,0,0,0.7) 85%, transparent 100%)",
        ...placement,
        ...style,
      }}
    >
      <img
        src={`/textures/texture-${texture}.svg`}
        alt=""
        style={{
          position: "absolute",
          width: svgSize,
          height: svgSize,
          left: svgLeft,
          top: svgTop,
          maxWidth: "none",
          maxHeight: "none",
        }}
      />
    </div>
  );
}

export default RadialFan;
