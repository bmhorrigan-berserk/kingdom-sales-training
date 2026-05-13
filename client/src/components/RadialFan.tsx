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

/* Position the SVG so its natural FOCAL sits exactly at the section
   corner, with the rest of the SVG bleeding off-screen. The visible
   portion shows the rays fanning INWARD from the corner - which is
   exactly what the Sales Catalog does.

   Focal at (58.7%, 43.9%) of SVG. To place focal at corner:
     right corner: SVG's right of focal (41.3% of size) sits OUTSIDE
                   the section. CSS: right = -(0.413 * size)
     top corner:   SVG's above focal (43.9% of size) sits OUTSIDE
                   the section. CSS: top = -(0.439 * size)
   Same idea for the other corners + mirroring transforms so the
   natural focal can land in any corner. */
function placementFor(
  origin: Origin,
  size: number
): React.CSSProperties {
  const offsetH = -Math.round(0.413 * size); // horizontal bleed
  const offsetV = -Math.round(0.439 * size); // vertical bleed

  switch (origin) {
    case "tr":
      return { top: offsetV, right: offsetH, transform: "none" };
    case "tl":
      return { top: offsetV, left: offsetH, transform: "scaleX(-1)" };
    case "br":
      return { bottom: offsetV, right: offsetH, transform: "scaleY(-1)" };
    case "bl":
      return { bottom: offsetV, left: offsetH, transform: "rotate(180deg)" };
    case "right":
      return {
        top: "50%",
        right: offsetH,
        transform: "translateY(-50%)",
      };
    case "left":
      return {
        top: "50%",
        left: offsetH,
        transform: "translateY(-50%) scaleX(-1)",
      };
    case "top":
      return {
        top: offsetV,
        left: "50%",
        transform: "translateX(-50%)",
      };
    case "bottom":
      return {
        bottom: offsetV,
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
  const placement = placementFor(origin, size);

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
