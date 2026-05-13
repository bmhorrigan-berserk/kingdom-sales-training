/**
 * RadialFan - Sales Catalog faceted sunburst, fully enclosed and symmetric.
 *
 * The catalog texture SVGs (/textures/texture-<name>.svg) are
 * asymmetric on their own - the rays only radiate in roughly the
 * upper hemisphere from the focal point. To get a fully enclosed
 * circular medallion we layer TWO copies of the texture inside the
 * same masked container: one in its natural orientation and one
 * rotated 180 degrees around the focal. Together they fill the full
 * 360 ring of rays.
 *
 * Everything else stays the same as before:
 *   - container is forced square via aspect-ratio: 1 with max-width
 *     / max-height: 100%, so the medallion shrinks to fit short
 *     sections without distorting.
 *   - radial-gradient mask centered on the focal fades the corners
 *     to transparent so the bounding box is invisible.
 *   - mix-blend-mode integrates the line ink into the surface -
 *     multiply on cream / paper, screen on navy / dark gradients.
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

/* SVG focal sits at approximately (58.7%, 43.9%) of the viewBox.
   Both texture layers share this anchor point. */
const FOCAL_X = "58.7%";
const FOCAL_Y = "43.9%";

function placementFor(origin: Origin): React.CSSProperties {
  switch (origin) {
    case "tr":
      return { top: 0, right: 0 };
    case "tl":
      return { top: 0, left: 0 };
    case "br":
      return { bottom: 0, right: 0 };
    case "bl":
      return { bottom: 0, left: 0 };
    case "right":
      return { top: "50%", right: 0, transform: "translateY(-50%)" };
    case "left":
      return { top: "50%", left: 0, transform: "translateY(-50%)" };
    case "top":
      return { top: 0, left: "50%", transform: "translateX(-50%)" };
    case "bottom":
      return { bottom: 0, left: "50%", transform: "translateX(-50%)" };
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
  const textureUrl = `/textures/texture-${texture}.svg`;

  /* Soft radial mask centered on the focal. Reaches all the way out
     to the bounding-box corner with a gradual fade so the combined
     360 ring of rays stays visible across the whole medallion. */
  const maskImage = `radial-gradient(circle at ${FOCAL_X} ${FOCAL_Y}, black 0%, black 42%, rgba(0,0,0,0.78) 65%, rgba(0,0,0,0.30) 85%, transparent 100%)`;

  /* Style shared by both texture layers. */
  const layerBase: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage: `url('${textureUrl}')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
  };

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
        opacity,
        mixBlendMode: blendMode,
        WebkitMaskImage: maskImage,
        maskImage: maskImage,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
        ...placement,
        ...style,
      }}
    >
      {/* Layer 1: SVG in natural orientation - rays fan into the
          upper hemisphere from the focal. */}
      <div style={layerBase} />
      {/* Layer 2: same SVG rotated 180 degrees around the focal so
          its rays fill the lower hemisphere. Combined with layer 1
          they form a fully enclosed 360 ring. */}
      <div
        style={{
          ...layerBase,
          transform: "rotate(180deg)",
          /* transform-origin set to the focal so the rotation pivots
             around the SVG's natural focal point, keeping both layers'
             focals stacked exactly on top of each other. */
          transformOrigin: `${FOCAL_X} ${FOCAL_Y}`,
        }}
      />
    </div>
  );
}

export default RadialFan;
