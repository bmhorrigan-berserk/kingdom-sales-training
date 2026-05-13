/**
 * RadialFan - Sales Catalog-style faceted sunburst vector.
 *
 * Renders the same crystalline radial textures the Sales Catalog uses
 * at catalog.kingdomcommandcenter.com - five color variants stored at
 * /textures/texture-<name>.svg. Previously this component clipped the
 * SVG to a perfect circle; that was wrong. The catalog leaves the SVG
 * un-clipped so the natural faceted edges show, bleeds it off the
 * section corner via negative inset, and blends it into the surface
 * with mix-blend-mode (multiply for light surfaces, screen for dark).
 *
 * The original prop API is preserved so every existing call site
 * keeps working without modification - `texture`, `origin`, `size`,
 * `opacity`, `style`, `className` all behave the same way. The
 * `blendMode` prop is new; default "multiply" works on cream/paper
 * sections, pass "screen" on navy/dark hero bands so the texture
 * lightens instead of disappearing.
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
  /** Which corner / edge the sunburst anchors to. The SVG's natural
      focal sits in the upper-right area; this component flips/rotates
      to put the focal at the requested origin. Default "tr". */
  origin?: Origin;
  /** 0-1. Default 0.40 to match the Sales Catalog. Pair with the
      right `blendMode` for the surface (multiply on light, screen on
      dark). */
  opacity?: number;
  /** Visual width of the sunburst square in px. The SVG is rendered
      as a square background-image, so this controls both width and
      height. The sunburst bleeds off the section corner so a large
      portion is intentionally off-canvas. */
  size?: number;
  /** mix-blend-mode. Default "multiply" works on cream/paper. Use
      "screen" on navy/dark hero bands. */
  blendMode?: BlendMode;
  className?: string;
  style?: React.CSSProperties;
  ariaHidden?: boolean;
  /* Legacy props (still accepted, still ignored, so existing call
     sites that pass them keep type-checking). */
  color?: string;
  palette?: string[];
  rays?: number;
  arcs?: number;
  strokeWidth?: number;
}

/* Anchor + transform for each origin. The catalog anchors textures
   with negative inset so the focal sits just inside the section
   corner and the rest of the sunburst bleeds off the edge. Transforms
   are picked so the SVG's natural focal (upper-right) lands at the
   requested origin. */
function placementFor(origin: Origin): React.CSSProperties {
  const NEG = "-26%"; // negative inset that lets the sunburst bleed off the corner
  const EDGE = "-22%"; // softer negative for edge-anchored variants

  switch (origin) {
    case "tr":
      return { top: NEG, right: NEG, transform: "none" };
    case "tl":
      return { top: NEG, left: NEG, transform: "scaleX(-1)" };
    case "br":
      return { bottom: NEG, right: NEG, transform: "scaleY(-1)" };
    case "bl":
      return { bottom: NEG, left: NEG, transform: "rotate(180deg)" };
    case "right":
      return {
        top: "50%",
        right: EDGE,
        transform: "translateY(-50%)",
      };
    case "left":
      return {
        top: "50%",
        left: EDGE,
        transform: "translateY(-50%) scaleX(-1)",
      };
    case "top":
      return {
        top: EDGE,
        left: "50%",
        transform: "translateX(-50%)",
      };
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
  opacity = 0.40,
  size = 980,
  blendMode = "multiply",
  className = "",
  style,
  ariaHidden = true,
}: RadialFanProps) {
  const placement = placementFor(origin);

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
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
        ...placement,
        // Per-call style overrides win, but if the caller passes a
        // `transform` the placement transform is concatenated.
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
