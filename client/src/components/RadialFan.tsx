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

/* The SVG's natural FOCAL (the small half-moon void where rays
   converge) sits at (58.7%, 43.9%) of the viewBox. The rays bloom
   OUTWARD from the focal toward the upper portion of the viewBox.

   The edge origins place the focal AT the section edge with rays
   blooming INWARD into the page. After rotation:
     - rotate(180): focal at (41.3%, 56.1%) of div, rays bloom DOWN
     - rotate(90):  focal at (43.9%, 41.3%) of div, rays bloom RIGHT
     - rotate(-90): focal at (56.1%, 58.7%) of div, rays bloom LEFT
     - no rotate:   focal at (58.7%, 43.9%) of div, rays bloom UP

   For each edge, we offset the div so the post-rotation focal
   coordinates land exactly on the section edge, centered along the
   perpendicular axis.

   The corner origins (tr/tl/br/bl) stay as natural rim-at-corner
   placement for backward compatibility. */
function placementFor(
  origin: Origin,
  size: number
): React.CSSProperties {
  switch (origin) {
    case "tr":
      return { top: 0, right: 0, transform: "none" };
    case "tl":
      return { top: 0, left: 0, transform: "scaleX(-1)" };
    case "br":
      return { bottom: 0, right: 0, transform: "scaleY(-1)" };
    case "bl":
      return { bottom: 0, left: 0, transform: "rotate(180deg)" };

    case "top":
      // focal at top edge, horizontally centered, rays bloom DOWN
      return {
        top: -0.561 * size,
        left: `calc(50% - ${0.413 * size}px)`,
        transform: "rotate(180deg)",
      };
    case "bottom":
      // focal at bottom edge, horizontally centered, rays bloom UP
      return {
        bottom: -0.561 * size,
        left: `calc(50% - ${0.587 * size}px)`,
        transform: "none",
      };
    case "left":
      // focal at left edge, vertically centered, rays bloom RIGHT
      return {
        left: -0.439 * size,
        top: `calc(50% - ${0.413 * size}px)`,
        transform: "rotate(90deg)",
      };
    case "right":
      // focal at right edge, vertically centered, rays bloom LEFT
      return {
        right: -0.439 * size,
        top: `calc(50% - ${0.587 * size}px)`,
        transform: "rotate(-90deg)",
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
