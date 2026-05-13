/**
 * RadialFan - Sales Catalog faceted sunburst, fully enclosed.
 *
 * Renders the catalog texture SVGs (/textures/texture-<name>.svg) with
 * a soft radial mask so the faceted edges fade out cleanly instead of
 * clipping at the SVG bounding box. The texture sits fully inside the
 * parent section - no negative inset, no corner bleed-off that
 * created hard cutoffs mid-page.
 *
 * Visual recipe:
 *   - div with background-image (no circular clip, no clip-path)
 *   - positive inset places the texture fully inside the parent
 *   - radial-gradient mask centered on the SVG's natural focal point
 *     fades the edges to transparent so the bounding box is invisible
 *   - mix-blend-mode integrates the line ink into the surface
 *     (multiply on cream, screen on navy/dark gradients)
 *
 * Existing call sites pass `texture`, `origin`, `size`, `opacity`,
 * `style` - those still work. Optional `blendMode` defaults to
 * "multiply" (right for cream surfaces); pass "screen" on dark hero
 * bands so the texture lightens instead of disappearing.
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
  /** Which corner / edge the texture sits in. Texture is fully inside
      the section - never bleeds off the page. Default "tr". */
  origin?: Origin;
  /** 0-1. Default 0.36 for paper / 0.45 for screen blend on dark. */
  opacity?: number;
  /** Square diameter in px. The full faceted sunburst fits inside
      this box. Sized so it doesn't crowd the section content. */
  size?: number;
  /** mix-blend-mode. "multiply" on light surfaces, "screen" on dark. */
  blendMode?: BlendMode;
  className?: string;
  style?: React.CSSProperties;
  ariaHidden?: boolean;
  /* Legacy props (still accepted, still ignored). */
  color?: string;
  palette?: string[];
  rays?: number;
  arcs?: number;
  strokeWidth?: number;
}

/* The SVG's natural focal is around (58.7%, 43.9%) of its viewBox -
   slightly right of center, slightly above middle. After per-origin
   transform the focal lands inside the requested corner. */
const FOCAL_X = "58.7%";
const FOCAL_Y = "43.9%";

/* Anchor + transform for each origin. Texture is FULLY ENCLOSED -
   sits with a positive inset from the section edge, no negative
   bleed. */
function placementFor(origin: Origin): React.CSSProperties {
  const TIGHT = "0"; // flush to the corner
  const EDGE = "0"; // edge-anchored, no inset

  switch (origin) {
    case "tr":
      return { top: TIGHT, right: TIGHT, transform: "none" };
    case "tl":
      return { top: TIGHT, left: TIGHT, transform: "scaleX(-1)" };
    case "br":
      return { bottom: TIGHT, right: TIGHT, transform: "scaleY(-1)" };
    case "bl":
      return { bottom: TIGHT, left: TIGHT, transform: "rotate(180deg)" };
    case "right":
      return { top: "50%", right: EDGE, transform: "translateY(-50%)" };
    case "left":
      return {
        top: "50%",
        left: EDGE,
        transform: "translateY(-50%) scaleX(-1)",
      };
    case "top":
      return { top: EDGE, left: "50%", transform: "translateX(-50%)" };
    case "bottom":
      return {
        bottom: EDGE,
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

  /* Radial mask centered on the SVG's natural focal point. The
     densest part of the sunburst (around the focal) stays fully
     opaque; the bounding-box edges fade smoothly to transparent so
     the SVG rectangle is invisible - no hard cutoff lines, no
     visible edge. */
  const maskImage = `radial-gradient(circle at ${FOCAL_X} ${FOCAL_Y}, black 0%, black 45%, rgba(0,0,0,0.6) 70%, transparent 100%)`;

  return (
    <div
      aria-hidden={ariaHidden}
      className={className}
      style={{
        position: "absolute",
        width: size,
        height: size,
        maxWidth: "100%",
        maxHeight: "100%",
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
        /* If caller passed `transform`, concatenate with our placement
           transform (otherwise theirs would clobber ours). */
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
