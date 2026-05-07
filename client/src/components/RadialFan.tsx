/**
 * RadialFan - kingdom decorative engraving.
 *
 * Renders one of the kingdom catalog textures (hormone / peptides /
 * weight / wellness / footer). These are organically-shaped, dense
 * engraved-line SVGs lifted directly from the kingdom Sales Catalog
 * so the look is consistent across every kingdom property.
 *
 * Pulls the SVG from /textures/texture-<name>.svg (served as a static
 * asset). We position the texture oversized in a corner with
 * overflow:hidden on the parent so the visible portion reads as a
 * round, organic radiance instead of a stiff square.
 *
 * Texture -> hue:
 *   hormone   #731C0D  red
 *   peptides  #0D1A73  navy / blue
 *   weight    #D8730D  orange
 *   wellness  #40760A  green
 *   footer    #3F4559  slate
 *
 * Pick the texture that matches the page's section accent. The dashboard
 * uses the same RadialFan and chooses per route via SectionBackdrop.
 */

export type FanTexture =
  | "hormone"
  | "peptides"
  | "weight"
  | "wellness"
  | "footer";

type Origin = "tl" | "tr" | "bl" | "br" | "center" | "right" | "left";

export const KINGDOM_PALETTE = [
  "#1F6B3F", // legacy: kingdom green
  "#3B5BDB", // legacy: kingdom blue
  "#D9622B", // legacy: kingdom orange
  "#B23A3A", // legacy: kingdom red
];

interface RadialFanProps {
  /** Catalog texture to render. Defaults to "wellness" (green) for onboarding. */
  texture?: FanTexture;
  /** Corner anchor. */
  origin?: Origin;
  /** 0-1; the catalog textures are dense, 0.16-0.30 reads well on cream. */
  opacity?: number;
  /** Pixel size of the SVG square; lift well above the parent so the
      bottom-right of the texture bleeds beyond the viewport, leaving
      only the organic radiating portion visible. */
  size?: number;
  /** Optional override stroke color via CSS filter. */
  className?: string;
  style?: React.CSSProperties;
  ariaHidden?: boolean;

  /* Legacy props kept for source-compat with prior call sites. Ignored
     when using the catalog textures. They still type-check so existing
     pages don't break during the rollout. */
  color?: string;
  palette?: string[];
  rays?: number;
  arcs?: number;
  strokeWidth?: number;
}

/**
 * The catalog SVGs draw a radial sunburst whose FOCAL POINT (where every
 * line converges) sits at roughly (676, 510) inside a 1150x1161 viewBox.
 * That's the upper-right region of the SVG, NOT the geometric center.
 *
 * So if we naively center the SVG on a page corner, the rays appear to
 * "face the wrong way" - they point toward an off-screen focal instead of
 * radiating from the corner outward.
 *
 * Fix: scale + flip the SVG so its focal point lands AT the anchor corner,
 * with the dense radial sweep emanating into the visible page area.
 *
 * Focal coordinates as fractions of viewBox: (0.587, 0.439).
 * Distances from focal to each viewBox edge:
 *   right edge:  1 - 0.587 = 0.413
 *   left edge:   0.587
 *   top edge:    0.439
 *   bottom edge: 1 - 0.439 = 0.561
 */
const FOCAL_X_PCT = 0.587;
const FOCAL_Y_PCT = 0.439;

function originPlacement(origin: Origin, size: number): React.CSSProperties {
  // Distance from focal point to the SVG's right / left / top / bottom edges,
  // in rendered pixels for the current size.
  const focalToRight = size * (1 - FOCAL_X_PCT);   // ~0.413 * size
  const focalToTop = size * FOCAL_Y_PCT;           // ~0.439 * size

  // For each anchor we (a) flip the SVG so the focal moves to the
  // appropriate quadrant, then (b) position so the focal lands on the
  // page corner. The remaining SVG mass radiates inward into the page.
  switch (origin) {
    case "tr":
      // Focal naturally upper-right - no flip. Focal at corner (0, 0)
      // means SVG extends down and left from there.
      return { top: -focalToTop, right: -focalToRight };
    case "tl":
      // Flip X so focal moves to upper-left. Then position symmetric.
      return { top: -focalToTop, left: -focalToRight, transform: "scaleX(-1)" };
    case "br":
      return { bottom: -focalToTop, right: -focalToRight, transform: "scaleY(-1)" };
    case "bl":
      return {
        bottom: -focalToTop,
        left: -focalToRight,
        transform: "scaleX(-1) scaleY(-1)",
      };
    case "left":
      return { top: "50%", left: -focalToRight, transform: "translateY(-50%) scaleX(-1)" };
    case "right":
      return { top: "50%", right: -focalToRight, transform: "translateY(-50%)" };
    case "center":
    default:
      return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  }
}

/**
 * The mask follows the focal point, not the SVG center. We anchor the
 * radial gradient at the focal location (in SVG-local coords expressed as
 * percentages) so the dense sweep stays opaque and the texture fades to
 * transparent before reaching any viewBox edge.
 */
function maskFor(origin: Origin): string {
  // SVG-local position of the focal point as percentages.
  const focalLeft = `${FOCAL_X_PCT * 100}%`;
  const focalTop = `${FOCAL_Y_PCT * 100}%`;
  // Mirror the percentages when the SVG is flipped so the mask stays
  // anchored on the visible focal.
  let cx = focalLeft;
  let cy = focalTop;
  if (origin === "tl" || origin === "bl" || origin === "left") cx = `${(1 - FOCAL_X_PCT) * 100}%`;
  if (origin === "br" || origin === "bl") cy = `${(1 - FOCAL_Y_PCT) * 100}%`;
  return `radial-gradient(circle at ${cx} ${cy}, black 0%, black 32%, transparent 72%)`;
}

export function RadialFan({
  texture = "wellness",
  origin = "tr",
  opacity = 0.10,
  size = 900,
  className = "",
  style,
  ariaHidden = true,
}: RadialFanProps) {
  const placement = originPlacement(origin, size);
  const fadeMask = maskFor(origin);
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
        maskImage: fadeMask,
        WebkitMaskImage: fadeMask,
        ...placement,
        ...style,
      }}
    />
  );
}

export default RadialFan;
