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

      {/* HERO */}
      <section
        style={{
          position: "relative",
          padding: "72px 32px 56px",
          maxWidth: 1280,
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        <RadialFan
          origin="tl"
          palette={KINGDOM_PALETTE}
          opacity={0.22}
          size={900}
          rays={48}
          arcs={5}
          style={{
            position: "absolute",
            top: -180,
            left: -240,
            width: 900,
            height: 900,
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <Eyebrow style={{ marginBottom: 20 }}>
            § 02 · THE REFERENCE BINDER · 8 GUIDES
          </Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(44px, 6vw, 76px)",
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              color: NAVY,
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
              color: INK_MUTED,
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
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px 96px",
        }}
      >
        {REFERENCE_CATEGORIES.map((category, catIdx) => {
          const guides = REFERENCE_GUIDES.filter((g) => g.category === category);
          return (
            <div
              key={category}
              style={{
                marginTop: catIdx === 0 ? 0 : 80,
                paddingTop: catIdx === 0 ? 0 : 56,
                borderTop: catIdx === 0 ? "none" : `1px solid ${HAIRLINE}`,
              }}
            >
              <div
                style={{
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

                {/* Right: guide rows */}
                <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {guides.map((g) => (
                    <GuideRow key={g.slug} guide={g} />
                  ))}
                </ol>
              </div>
            </div>
          );
        })}
      </section>

      {/* PULL QUOTE */}
      <section
        style={{
          background: NAVY,
          color: CREAM,
          padding: "80px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <RadialFan
          origin="br"
          palette={["#5FB286", "#9CB3FF", "#F2A06E", "#E08585"]}
          opacity={0.30}
          size={900}
          rays={40}
          arcs={4}
          style={{
            position: "absolute",
            bottom: -200,
            right: -240,
            width: 900,
            height: 900,
            zIndex: 0,
          }}
        />
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          <Eyebrow style={{ color: "rgba(255,251,240,0.6)", marginBottom: 20 }}>
            · BINDER DISCIPLINE ·
          </Eyebrow>
          <blockquote
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(28px, 3.5vw, 40px)",
              lineHeight: 1.25,
              letterSpacing: "-0.015em",
              color: CREAM,
              margin: 0,
            }}
          >
            Memory drifts. The binder does not. <Em>Pull from the binder</Em>{" "}
            and the patient hears the same standard the prior nine operators
            delivered.
          </blockquote>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: 32,
          maxWidth: 1280,
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
        <PageNumber current={2} total={4} />
      </footer>
    </div>
  );
}

function GuideRow({ guide }: { guide: ReferenceGuide }) {
  return (
    <li>
      <Link href={`/reference/${guide.slug}`}>
        <a
          className="kingdom-binder-row"
          style={{
            display: "grid",
            gridTemplateColumns: "60px 1fr auto",
            alignItems: "center",
            gap: 24,
            padding: "24px 16px",
            color: INK,
            textDecoration: "none",
            borderTop: `1px solid ${HAIRLINE}`,
            transition: "background 150ms ease",
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
              borderRadius: 4,
              background: PALE,
              color: NAVY,
              fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
              fontSize: 11,
              fontWeight: 600,
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
      <style>{`.kingdom-binder-row:hover { background: ${PALE}; }`}</style>
    </li>
  );
}
