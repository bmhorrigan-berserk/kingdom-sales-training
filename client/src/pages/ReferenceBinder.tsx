/**
 * ReferenceBinder - the binder landing page.
 * Magazine spread: hero + 3 category sections (Patient Pipeline, Billing,
 * Clinical) each rendered as a numbered table-of-contents with cream rows,
 * hairline rules, Mid Blue numbers, and an arrow link into the guide.
 */
import { Link } from "wouter";
import TopNav from "@/components/TopNav";
import { RadialFan, KINGDOM_PALETTE } from "@/components/RadialFan";
import { PageNumber, Eyebrow, Em } from "@/components/Furniture";
import ShiftingBand from "@/components/ShiftingBand";
import {
  REFERENCE_GUIDES,
  REFERENCE_CATEGORIES,
  type ReferenceGuide,
} from "@/lib/referenceData";
import { ArrowRight, FileText } from "lucide-react";

const NAVY = "#1A2060";
const BLUE = "#1F6B3F"; // kingdom green (primary accent)
const CREAM = "#FFFBF0";
const PALE = "#EAF4EC"; // kingdom pale green
const HAIRLINE = "#E8DEC6";
const INK = "#2D2A24";
const INK_MUTED = "#6B6357";

export default function ReferenceBinder() {
  return (
    <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
      <TopNav />

      {/* HERO — kingdom green band. The binder is the lookup section,
          green is the reference / wellness color in the kingdom system. */}
      <section
        style={{
          position: "relative",
          background: `linear-gradient(135deg, #1F6B3F 0%, #16532F 100%)`,
          color: CREAM,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1920,
            margin: "0 auto",
            padding: "72px 32px 56px",
          }}
        >
          <Eyebrow style={{ color: "rgba(255,251,240,0.78)", marginBottom: 20 }}>
            § 04 OF 06 · THE REFERENCE BINDER · 8 GUIDES
          </Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(44px, 6vw, 76px)",
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              color: CREAM,
              margin: 0,
              maxWidth: "16ch",
            }}
          >
            The working <Em>binder.</Em>
          </h1>
          <p
            style={{
              marginTop: 24,
              fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
              fontSize: 17,
              lineHeight: 1.55,
              color: "rgba(255,251,240,0.84)",
              maxWidth: 620,
            }}
          >
            Eight checklists and protocol references. Every operator pulls from
            this binder during live consults. Pull from the binder, not from
            memory.
          </p>
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      <section
        style={{
          maxWidth: 1920,
          margin: "0 auto",
          padding: "0 32px 96px",
        }}
      >
        {REFERENCE_CATEGORIES.map((category, catIdx) => {
          const guides = REFERENCE_GUIDES.filter((g) => g.category === category);
          // Each category carries its own kingdom texture so the page
          // reads with rhythm. Billing -> weight (orange), Patient
          // Pipeline -> peptides (navy), Clinical -> hormone (red);
          // anything else falls back to wellness.
          const categoryTexture: "weight" | "peptides" | "hormone" | "wellness" =
            category === "Billing"
              ? "weight"
              : category === "Patient Pipeline"
              ? "peptides"
              : category === "Clinical"
              ? "hormone"
              : "wellness";
          /* Patient Pipeline (first category) anchors its medallion
             to the TOP so it butts up against the green hero above.
             Every other category anchors to the BOTTOM so each
             medallion butts against the section that follows. */
          const medallionOrigin: "tr" | "tl" | "br" | "bl" =
            catIdx === 0 ? "tr" : "br";
          return (
            <div
              key={category}
              style={{
                position: "relative",
                marginTop: catIdx === 0 ? 0 : 96,
                paddingTop: catIdx === 0 ? 0 : 64,
                borderTop: catIdx === 0 ? "none" : `1px solid ${HAIRLINE}`,
                overflow: "hidden",
              }}
            >
              <RadialFan
                texture={categoryTexture}
                origin={medallionOrigin}
                opacity={0.30}
                size={760}
                style={{ zIndex: 0 }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)",
                  gap: 56,
                  alignItems: "start",
                }}
              >
                {/* Left: category label */}
                <div style={{ position: "sticky", top: 100 }}>
                  <Eyebrow style={{ color: BLUE, marginBottom: 12 }}>
                    § {String(catIdx + 1).padStart(2, "0")} CATEGORY
                  </Eyebrow>
                  <h2
                    style={{
                      fontFamily:
                        "var(--font-display, Fraunces), Georgia, serif",
                      fontWeight: 400,
                      fontSize: 44,
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                      color: NAVY,
                      margin: 0,
                    }}
                  >
                    {category}.
                  </h2>
                  <p
                    style={{
                      marginTop: 16,
                      fontFamily:
                        "var(--font-body, Inter), system-ui, sans-serif",
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: INK_MUTED,
                    }}
                  >
                    {guides.length} {guides.length === 1 ? "guide" : "guides"}
                  </p>
                </div>

                {/* Right: guide tiles */}
                <ol
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "grid",
                    gap: 12,
                  }}
                >
                  {guides.map((g) => (
                    <GuideRow key={g.slug} guide={g} />
                  ))}
                </ol>
              </div>
            </div>
          );
        })}
      </section>

      <ShiftingBand eyebrow="· BINDER DISCIPLINE ·">
        Memory drifts. The binder does not. <Em>Pull from the binder.</Em>
      </ShiftingBand>

      {/* FOOTER */}
      <footer
        style={{
          padding: 32,
          maxWidth: 1920,
          margin: "0 auto",
          borderTop: `1px solid ${HAIRLINE}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <Eyebrow>· KINGDOM CONFIDENTIAL · INTERNAL USE ONLY ·</Eyebrow>
        <PageNumber current="04" total="06" />
      </footer>
    </div>
  );
}

function GuideRow({ guide }: { guide: ReferenceGuide }) {
  return (
    <li>
      <Link href={`/reference/${guide.slug}`}>
        <a
          className="kingdom-binder-tile"
          style={{
            display: "grid",
            gridTemplateColumns: "60px 1fr auto",
            alignItems: "center",
            gap: 24,
            padding: "22px 22px",
            color: INK,
            textDecoration: "none",
            background: "rgba(255, 255, 255, 0.62)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: `1px solid ${HAIRLINE}`,
            borderLeft: `4px solid ${BLUE}`,
            borderRadius: 10,
            boxShadow: "0 1px 2px rgba(26,32,96,0.04)",
            transition:
              "background 150ms ease, transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 600,
              fontSize: 32,
              color: BLUE,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {guide.number}
          </span>
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                fontWeight: 500,
                fontSize: 22,
                lineHeight: 1.2,
                letterSpacing: "-0.015em",
                color: NAVY,
                margin: 0,
              }}
            >
              {guide.title}
            </h3>
            <p
              style={{
                marginTop: 6,
                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                fontSize: 14,
                lineHeight: 1.5,
                color: INK_MUTED,
                maxWidth: "62ch",
              }}
            >
              {guide.description}
            </p>
          </div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              borderRadius: 999,
              background: PALE,
              color: NAVY,
              border: `1px solid rgba(31, 107, 63, 0.25)`,
              fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <FileText size={12} />
            Open
            <ArrowRight size={12} style={{ color: BLUE }} />
          </span>
        </a>
      </Link>
      <style>{`
        .kingdom-binder-tile:hover {
          background: rgba(255, 255, 255, 0.85) !important;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(31,107,63,0.06), 0 8px 24px rgba(31,107,63,0.10) !important;
        }
      `}</style>
    </li>
  );
}
