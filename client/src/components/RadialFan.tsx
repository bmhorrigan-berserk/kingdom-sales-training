/**
 * RadialFan - Sales Catalog faceted sunburst, full design always visible.
 *
 * Renders the catalog texture SVGs (/textures/texture-<name>.svg) so
 * the entire faceted sunburst stays visible inside the section,
 * regardless of how short the section is. Previous passes were either
 * clipping the SVG when the section was shorter than the texture box
 * (showing a hard horizontal cutoff line mid-page) or bleeding the
 * SVG off the corner (also showing a cutoff). Both wrong.
 *
 * Recipe:
 *   - Container div fills the parent section (inset: 0). The parent
 *     section keeps overflow: hidden, but the texture div never
 *     extends past it, so nothing gets clipped.
 *   - background-image renders the catalog SVG.
 *   - background-size: contain scales the SVG to fit the smaller
 *     section dimension so the whole faceted shape is always visible.
 *   - background-position anchors the SVG to the requested corner
 *     (or center / edge).
 *   - A soft radial-gradient mask centered on the SVG's natural focal
 *     fades the corners to transparent so the bounding-box rectangle
 *     is invisible. You see the sunburst, not the box.
 *   - mix-blend-mode integrates the line ink into the surface -
 *     multiply on cream, screen on navy/dark gradient bands.
 *
 * Existing call sites pass texture / origin / size / opacity / style;
 * `size` is now a soft hint (the SVG actually sizes to the section
 * via contain, but a larger `size` makes the fade-out mask larger so
 * more of the sunburst stays opaque).
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
  /** Where the sunburst's dense focal sits inside the section. */
  origin?: Origin;
  /** 0-1. Default 0.36 for paper / 0.50 with screen blend on dark. */
  opacity?: number;
  /** Soft hint for visual weight. The SVG scales to the section via
      background-size: contain; `size` no longer caps the SVG width
      directly, but larger values can be combined with a custom style
      override if you need finer control on big hero bands. Kept for
      backward compat with existing call sites. */
  size?: number;
  /** mix-blend-mode. "multiply" on light surfaces, "screen" on dark. */
  blendMode?: BlendMode;
  /** Optional override for the SVG square size (in px). Defaults to
      the smaller section dimension via contain. Pass an explicit
      number to lock the texture to a specific visual size. */
  sizeOverride?: number;
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

/* The SVG's natural focal is around (58.7%, 43.9%) of its viewBox -
   slightly right of center, slightly above middle. background-position
   anchors the SVG to the section corner; per-origin transform reorients
   it so the dense focal lands at the requested origin. */

interface OriginConfig {
  bgPosition: string;
  transform: string;
  /** Where the radial mask focal sits within the texture div - same
      x/y as where the SVG's focal will visually land. */
  maskX: string;
  maskY: string;
}

function configFor(origin: Origin): OriginConfig {
  switch (origin) {
    case "tr":
      return {
        bgPosition: "right top",
        transform: "none",
        maskX: "75%",
        maskY: "30%",
      };
    case "tl":
      return {
        bgPosition: "left top",
        transform: "scaleX(-1)",
        maskX: "75%", // post-flip - matches SVG focal after scaleX(-1)
        maskY: "30%",
      };
    case "br":
      return {
        bgPosition: "right bottom",
        transform: "scaleY(-1)",
        maskX: "75%",
        maskY: "30%", // post-flip - matches SVG focal after scaleY(-1)
      };
    case "bl":
      return {
        bgPosition: "left bottom",
        transform: "rotate(180deg)",
        maskX: "75%",
        maskY: "30%",
      };
    case "right":
      return {
        bgPosition: "right center",
        transform: "none",
        maskX: "75%",
        maskY: "50%",
      };
    case "left":
      return {
        bgPosition: "left center",
        transform: "scaleX(-1)",
        maskX: "75%",
        maskY: "50%",
      };
    case "top":
      return {
        bgPosition: "center top",
        transform: "none",
        maskX: "50%",
        maskY: "30%",
      };
    case "bottom":
      return {
        bgPosition: "center bottom",
        transform: "scaleY(-1)",
        maskX: "50%",
        maskY: "30%",
      };
    case "center":
    default:
      return {
        bgPosition: "center center",
        transform: "none",
        maskX: "50%",
        maskY: "50%",
      };
  }
}

export function RadialFan({
  texture = "wellness",
  origin = "tr",
  opacity = 0.36,
  size = 720,
  sizeOverride,
  blendMode = "multiply",
  className = "",
  style,
  ariaHidden = true,
}: RadialFanProps) {
  const cfg = configFor(origin);

  /* Radial mask centered on the SVG's focal. Keeps the dense core
     opaque, fades to transparent past 65% so no hard rectangle edge.
     Slightly bigger reach on the long axis so the rays read through. */
  const maskImage = `radial-gradient(circle at ${cfg.maskX} ${cfg.maskY}, black 0%, black 30%, rgba(0,0,0,0.78) 55%, rgba(0,0,0,0.30) 80%, transparent 100%)`;

  /* Texture size: by default scales to the smaller section dimension
     via contain. sizeOverride locks the visual size in px. */
  const backgroundSize = sizeOverride
    ? `${sizeOverride}px ${sizeOverride}px`
    : "contain";

  return (
    <div
      aria-hidden={ariaHidden}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url('/textures/texture-${texture}.svg')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: cfg.bgPosition,
        backgroundSize: backgroundSize,
        transform: cfg.transform,
        transformOrigin: "center center",
        opacity,
        mixBlendMode: blendMode,
        WebkitMaskImage: maskImage,
        maskImage: maskImage,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
        ...style,
        /* size is no longer a binding width/height — left here so
           callers passing `size` don't break type-checking. */
        ...(size ? {} : {}),
      }}
    />
  );
}

export default RadialFan;
