/**
 * ShiftingBand - kingdom signature bottom band.
 *
 * The shifting blue → teal → green → blue gradient with a centered
 * closed-circle medallion and an editorial Fraunces pull quote. Used at
 * the bottom of every onboarding page so the close of every screen
 * reads with the same kingdom signature.
 *
 * The gradient drifts via the `kingdomShift` keyframes injected
 * alongside the markup so the section stays self-contained (a page can
 * drop this in without touching its own <style> block).
 */
import { RadialFan, type FanTexture } from "@/components/RadialFan";
import { Eyebrow, Em } from "@/components/Furniture";

const CREAM = "#FFFBF0";

interface ShiftingBandProps {
  /** Small monospace label above the headline. */
  eyebrow: string;
  /** Pull quote. Wrap the italic accent word(s) with the `Em` token. */
  children: React.ReactNode;
  /** Vector medallion texture. Default: footer (slate). */
  texture?: FanTexture;
}

export default function ShiftingBand({
  eyebrow,
  children,
  texture = "footer",
}: ShiftingBandProps) {
  return (
    <section
      style={{
        position: "relative",
        padding: "72px 32px 96px",
        marginTop: 32,
        background:
          "linear-gradient(115deg, #1F6B3F 0%, #2A6F8E 38%, #3B5BDB 70%, #1F6B3F 100%)",
        backgroundSize: "240% 240%",
        animation: "kingdomShift 18s ease-in-out infinite",
        color: CREAM,
        overflow: "hidden",
      }}
    >
      <RadialFan
        texture={texture}
        origin="center"
        opacity={0.16}
        size={520}
        style={{ zIndex: 0 }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 980,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Eyebrow style={{ color: "rgba(255,251,240,0.7)", marginBottom: 16 }}>
          {eyebrow}
        </Eyebrow>
        <h2
          style={{
            fontFamily: "var(--font-display, Fraunces), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 3.5vw, 42px)",
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
            color: CREAM,
            margin: 0,
            maxWidth: "22ch",
            marginInline: "auto",
          }}
        >
          {children}
        </h2>
      </div>

      <style>{`
        @keyframes kingdomShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}

export { Em };
