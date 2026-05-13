/**
 * RadialFan - Sales Catalog faceted sunburst, fully enclosed and square.
 *
 * Renders the catalog texture SVGs (/textures/texture-<name>.svg) so
 * the entire faceted shape is always visible inside the section,
 * regardless of section height/width.
 *
 * The trick: the container is forced square via `aspect-ratio: 1`
 * with `max-width: 100%` and `max-height: 100%`. When the parent is
 * shorter than the requested `size`, the container shrinks to a
 * smaller square - never a rectangle - so the SVG inside (sized via
 * `contain`) fills the container without leaving rectangular empty
 * margins. That means the radial mask centered on the SVG's natural
 * focal stays aligned with where the focal actually lands.
 *
 * Per-origin transforms (scaleX, scaleY, rotate) flip the SVG so the
 * dense focal lands in the requested corner. The radial mask fades
 * the bounding-box corners to transparent so the rectangle outline
 * never shows.
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
  /** Which corner / edge the dense focal sits in. */
  origin?: Origin;
  /** 0-1. Default 0.36 for paper / 0.50 with screen blend on dark. */
  opacity?: number;
  /** Square diameter in px. Capped to the parent's smaller dimension
      via max-width / max-height + aspect-ratio so the container stays
      square. */
  size?: number;
  /** mix-blend-mode. "multiply" on light surfaces, "screen" on dark. */
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

/* SVG focal sits at approximately (58.7%, 43.9%) of the viewBox. */
const FOCAL_X = "58.7%";
const FOCAL_Y = "43.9%";

/* Per-origin: where the square sits, and which transform flips the
   SVG so the focal lands at that corner. Mask coordinates stay at the
   SVG's natural focal because both the SVG and the mask are inside
   the same transformed element - they move together. */
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

  /* Tight radial mask centered on the SVG's natural focal. The
     catalog texture is asymmetric - the dense rays radiate in one
     cone away from the focal, so showing the full SVG looks like a
     half-fan. Clipping to a tight circle around the focal reveals
     only the dense core, which reads as a balanced circular medallion. */
  const maskImage = `radial-gradient(circle at ${FOCAL_X} ${FOCAL_Y}, black 0%, black 26%, rgba(0,0,0,0.55) 42%, transparent 62%)`;

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
        aspectRatio: "1 / 1",
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
