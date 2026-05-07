/**
 * Home - Sales Training cover page.
 * Editorial magazine composition matching the kingdom Sales Catalog.
 * Drops the dark navy + gold tile grid in favor of cream + Fraunces +
 * one Mid Blue accent + radial fan.
 */
import { Link } from "wouter";
import TopNav from "@/components/TopNav";
import { RadialFan, KINGDOM_PALETTE } from "@/components/RadialFan";
import { PageNumber, Eyebrow, Em } from "@/components/Furniture";
import { ArrowRight, BookOpen, Library, GraduationCap, Brain, PlayCircle } from "lucide-react";

const NAVY = "#1A2060";
const BLUE = "#1F6B3F"; // kingdom green (primary accent)
const CREAM = "#FFFBF0";
const HAIRLINE = "#E8DEC6";
const INK = "#2D2A24";
const INK_MUTED = "#6B6357";

export default function Home() {
  const month = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase();

  return (
    <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
      <TopNav />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          padding: "80px 32px 96px",
          maxWidth: 1920,
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        <RadialFan texture="footer"
          origin="tr"
          palette={KINGDOM_PALETTE}
          opacity={0.10}
          size={1600}
          rays={56}
          arcs={6}
          style={{ zIndex: 0 }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <Eyebrow style={{ marginBottom: 24 }}>
            § INTERNAL · KINGDOM ONBOARDING · {month} EDITION
          </Eyebrow>

          <h1
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(48px, 7vw, 88px)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: NAVY,
              margin: 0,
              maxWidth: "14ch",
            }}
          >
            Train like a <Em>clinician.</Em>
          </h1>

          <p
            style={{
              marginTop: 28,
              fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
              fontSize: 17,
              lineHeight: 1.55,
              color: INK_MUTED,
              maxWidth: 540,
            }}
          >
            The complete onboarding curriculum, every reference checklist, and
            the scenario library. Used by every CS, LMS, and AE on the kingdom
            team. Read first. Practice second. Never sell.
          </p>

          {/* Primary CTAs */}
          <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/curriculum">
              <a
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 22px",
                  background: NAVY,
                  color: CREAM,
                  fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderRadius: 4,
                  transition: "background 150ms ease",
                }}
              >
                Start curriculum
                <ArrowRight size={14} style={{ color: BLUE }} />
              </a>
            </Link>
            <Link href="/reference">
              <a
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 22px",
                  background: "transparent",
                  color: NAVY,
                  fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  border: `1px solid ${HAIRLINE}`,
                  borderRadius: 4,
                }}
              >
                The binder
                <ArrowRight size={14} style={{ color: BLUE }} />
              </a>
            </Link>
          </div>

          {/* Stats row */}
          <div
            style={{
              marginTop: 80,
              paddingTop: 32,
              borderTop: `1px solid ${HAIRLINE}`,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 32,
            }}
          >
            {[
              { value: "30", label: "Day curriculum" },
              { value: "05", label: "Phases" },
              { value: "08", label: "Reference guides" },
              { value: "153", label: "Practice items" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                    fontWeight: 600,
                    fontSize: 56,
                    color: BLUE,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <Eyebrow style={{ marginTop: 8 }}>{s.label}</Eyebrow>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIONS DIRECTORY (cream → navy alternation) */}
      <section
        style={{
          background: NAVY,
          color: CREAM,
          padding: "72px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <RadialFan texture="footer"
          origin="bl"
          palette={["#5FB286", "#9CB3FF", "#F2A06E", "#E08585"]}
          opacity={0.14}
          size={1600}
          rays={48}
          arcs={5}
          style={{ zIndex: 0 }}
        />

        <div style={{ maxWidth: 1920, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Eyebrow style={{ color: "rgba(255,251,240,0.6)", marginBottom: 16 }}>
            § THE TABLE OF CONTENTS
          </Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(36px, 5vw, 56px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: CREAM,
              margin: 0,
              maxWidth: "18ch",
            }}
          >
            What you will <Em>master.</Em>
          </h2>

          <div
            style={{
              marginTop: 56,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {[
              {
                n: "01",
                href: "/curriculum",
                title: "Curriculum",
                desc: "Day-by-day onboarding. 30 days, 5 phases, every script and protocol.",
                icon: GraduationCap,
              },
              {
                n: "02",
                href: "/library",
                title: "Media Library",
                desc: "Watch and listen. 7 video explainers + 6 audio recordings, including live calls.",
                icon: PlayCircle,
              },
              {
                n: "03",
                href: "/reference",
                title: "Reference Binder",
                desc: "Eight working guides. Sign-up, billing, DX codes, lab panels, pipelines.",
                icon: Library,
              },
              {
                n: "04",
                href: "/flashcards",
                title: "Flashcards",
                desc: "115 cards across 16 categories. Click to reveal. Drill until instinct.",
                icon: BookOpen,
              },
              {
                n: "05",
                href: "/quiz",
                title: "Knowledge Quiz",
                desc: "38 scenario questions. Score 90+ to certify. Built for elite operators.",
                icon: Brain,
              },
            ].map((s) => (
              <Link key={s.n} href={s.href}>
                <a
                  className="kingdom-toc-card"
                  style={{
                    padding: "32px 24px",
                    background: "rgba(255, 251, 240, 0.04)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "1px solid rgba(255, 251, 240, 0.18)",
                    borderRadius: 12,
                    color: CREAM,
                    textDecoration: "none",
                    display: "block",
                    transition: "background 150ms ease, transform 150ms ease, border-color 150ms ease, box-shadow 150ms ease",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,251,240,0.06)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                    <Eyebrow style={{ color: BLUE }}>§ {s.n}</Eyebrow>
                    <s.icon size={18} style={{ color: "rgba(255,251,240,0.5)" }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                      fontWeight: 500,
                      fontSize: 28,
                      lineHeight: 1.1,
                      letterSpacing: "-0.015em",
                      color: CREAM,
                      margin: 0,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      marginTop: 12,
                      fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                      fontSize: 13,
                      lineHeight: 1.55,
                      color: "rgba(255,251,240,0.65)",
                    }}
                  >
                    {s.desc}
                  </p>
                  <div
                    style={{
                      marginTop: 24,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: BLUE,
                      fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Read <ArrowRight size={12} />
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>

        <style>{`
          .kingdom-toc-card:hover {
            background: rgba(255,251,240,0.10) !important;
            border-color: rgba(255,251,240,0.32) !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.28), 0 12px 32px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,251,240,0.10) !important;
          }
        `}</style>
      </section>

      {/* PULL QUOTE */}
      <section style={{ padding: "96px 32px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <Eyebrow style={{ marginBottom: 24 }}>· THE KINGDOM STANDARD ·</Eyebrow>
        <blockquote
          style={{
            fontFamily: "var(--font-display, Fraunces), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 3.5vw, 42px)",
            lineHeight: 1.25,
            letterSpacing: "-0.015em",
            color: NAVY,
            margin: 0,
          }}
        >
          You are not selling hormones. You are <Em>diagnosing a deficit</Em>{" "}
          and prescribing the corrective protocol. The patient says yes to
          themselves, not to you.
        </blockquote>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "32px",
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
        <PageNumber current={1} total={4} />
      </footer>
    </div>
  );
}
