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

function originPlacement(origin: Origin, size: number): React.CSSProperties {
  /* The catalog textures have their radial focal point near the SVG center,
     not a corner. So we center the SVG ON the page corner: the SVG sits
     half on/half off the section, and the visible quadrant inside the page
     reads as a radial fan emanating from the corner. No transforms needed -
     the engraving is rotationally symmetric enough that any quadrant looks
     correct. */
  const offset = -size / 2;
  switch (origin) {
    case "tl":     return { top: offset, left: offset };
    case "tr":     return { top: offset, right: offset };
    case "bl":     return { bottom: offset, left: offset };
    case "br":     return { bottom: offset, right: offset };
    case "left":   return { top: "50%", left: offset, transform: "translateY(-50%)" };
    case "right":  return { top: "50%", right: offset, transform: "translateY(-50%)" };
    case "center":
    default:       return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  }
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
  /* Radial fade mask. The catalog SVGs have dense content all the way to
     their viewBox edges, so without a mask the SVG's bounding box shows
     as a hard rectangle when the page is bigger than half the texture.
     The mask is anchored at the SVG center (where the radial focal point
     sits) and fades to transparent before reaching the bounding box,
     giving a clean organic falloff with no visible edges. */
  const fadeMask =
    "radial-gradient(circle at 50% 50%, black 0%, black 35%, transparent 75%)";
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
