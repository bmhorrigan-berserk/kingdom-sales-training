/**
 * RadialFan - Sales Catalog faceted sunburst.
 *
 * Renders the catalog texture SVGs (/textures/texture-<name>.svg) as
 * a single uncropped fan, exactly the way the Sales Catalog uses
 * them. The SVG's natural shape IS a fan opening from a focal point;
 * trying to clip it to a perfect circle (single layer + tight mask)
 * or fake symmetry (two stacked rotated layers) both looked wrong.
 *
 * What the Sales Catalog does:
 *   - container sized to be larger than its parent so the rays fan
 *     deep into the section
 *   - anchored to a corner via negative inset so the focal sits near
 *     the section corner and the fan opens inward
 *   - very light radial fade only at the absolute outer edge to soft-
 *     land the bounding box; no aggressive masking
 *
 * We mirror that here. Default `origin="tr"` puts the focal in the
 * top-right corner with the fan opening down-left; other origins
 * flip the SVG via transform so the focal lands in whichever corner
 * is requested.
 */

export type FanTexture =
  | "hormone"   // red    #731C0D
  | "peptides"  // navy   #0E1A3A
  | "weight"    // orange #C36E3A
  | "wellness"  // green  #4C5A2C
  | "footer";   // slate  #0E1622

export type FanFocal =
  | "tr"
  | "tl"
  | "br"
  | "bl"
  | "right"
  | "left"
  | "top"
  | "bottom"
  | "center";

type Origin = FanFocal;
type BlendMode =
  | "multiply"
  | "screen"
  | "normal"
  | "overlay"
  | "soft-light"
  | "lighten"
  | "darken";

export const KINGDOM_PALETTE = ["#1F6B3F", "#3B5BDB", "#D9622B", "#B23A3A"];

interface RadialFanProps {
  texture?: FanTexture;
  origin?: Origin;
  opacity?: number;
  size?: number;
  blendMode?: BlendMode;
  className?: string;
  style?: React.CSSProperties;
  ariaHidden?: boolean;
  /* Legacy props (accepted, ignored). */
  color?: string;
  palette?: string[];
  rays?: number;
  arcs?: number;
  strokeWidth?: number;
}

/* Natural orientation, flush to the section edge.

   The catalog SVG has its flat rim at the very top of its viewBox.
   With zero inset (top:0, right:0 for `tr`), the SVG's top edge -
   the rim - sits exactly on the section's top edge. The focal lands
   in the section's interior (about 44% down, 41% in from the right
   edge), with the rays fanning from the rim down to the focal.

   Mirroring transforms send the focal to whichever interior quadrant
   the caller asks for, while keeping the rim along the matching
   section edges. */
function placementFor(origin: Origin): React.CSSProperties {
  switch (origin) {
    case "tr":
      return { top: 0, right: 0, transform: "none" };
    case "tl":
      return { top: 0, left: 0, transform: "scaleX(-1)" };
    case "br":
      return { bottom: 0, right: 0, transform: "scaleY(-1)" };
    case "bl":
      return { bottom: 0, left: 0, transform: "rotate(180deg)" };
    case "right":
      return { top: "50%", right: 0, transform: "translateY(-50%)" };
    case "left":
      return {
        top: "50%",
        left: 0,
        transform: "translateY(-50%) scaleX(-1)",
      };
    case "top":
      return { top: 0, left: "50%", transform: "translateX(-50%)" };
    case "bottom":
      return {
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%) scaleY(-1)",
      };
    case "center":
    default:
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
  }
}

export function RadialFan({
  texture = "wellness",
  origin = "tr",
  opacity = 0.36,
  size = 720,
  blendMode = "multiply",
  className = "",
  style,
  ariaHidden = true,
}: RadialFanProps) {
  const placement = placementFor(origin);

  /* Very soft outer-edge fade only - just enough to land the
     bounding box. The catalog's natural fan shape stays intact. */
  const maskImage =
    "radial-gradient(ellipse at center, black 0%, black 70%, rgba(0,0,0,0.6) 88%, transparent 100%)";

  return (
    <div
      aria-hidden={ariaHidden}
      className={className}
      style={{
        position: "absolute",
        width: size,
        height: size,
        backgroundImage: `url('/textures/texture-${texture}.svg')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        opacity,
        mixBlendMode: blendMode,
        WebkitMaskImage: maskImage,
        maskImage: maskImage,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
        ...placement,
        ...style,
        ...(style?.transform
          ? {
              transform: `${placement.transform ?? ""} ${style.transform}`.trim(),
            }
          : null),
      }}
    />
  );
}

export default RadialFan;
