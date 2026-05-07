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
  /* The texture is densest near the top-right of the SVG canvas (per
     the catalog's source SVGs). For corner placements we offset so the
     dense corner of the texture sits at the page corner with the rest
     of the engraving radiating inward.  */
  const offset = -size * 0.55; // pull most of the texture off-canvas
  switch (origin) {
    case "tl": return { top: offset, left: offset, transform: "scaleX(-1) scaleY(-1)" };
    case "tr": return { top: offset, right: offset, transform: "scaleY(-1)" };
    case "bl": return { bottom: offset, left: offset, transform: "scaleX(-1)" };
    case "br": return { bottom: offset, right: offset };
    case "left":   return { top: "50%", left: offset, transform: "translateY(-50%) scaleX(-1)" };
    case "right":  return { top: "50%", right: offset, transform: "translateY(-50%)" };
    case "center":
    default:       return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  }
}

export function RadialFan({
  texture = "wellness",
  origin = "tr",
  opacity = 0.22,
  size = 900,
  className = "",
  style,
  ariaHidden = true,
}: RadialFanProps) {
  const placement = originPlacement(origin, size);
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
        ...placement,
        ...style,
      }}
    />
  );
}

export default RadialFan;
