/**
 * Curriculum - the 30-day onboarding program + 5 phases.
 * Long magazine-style page with cream/navy alternating sections.
 */
import { Link } from "wouter";
import TopNav from "@/components/TopNav";
import { RadialFan, KINGDOM_PALETTE } from "@/components/RadialFan";
import { PageNumber, Eyebrow, Em, DayBadge, PhaseStepper } from "@/components/Furniture";
import { ArrowRight, Check, Video, Headphones } from "lucide-react";
import { DAY_SCHEDULE, PHASES, OPERATIONS_REFERENCE, CURRICULUM_OVERVIEW } from "@/lib/curriculumData";
import { lessonMediaTypes } from "@/lib/mediaData";

const NAVY = "#1A2060";
const BLUE = "#1F6B3F"; // kingdom green (primary accent)
const PALE = "#EAF4EC"; // kingdom pale green
const CREAM = "#FFFBF0";
const HAIRLINE = "#E8DEC6";
const INK = "#2D2A24";
const INK_MUTED = "#6B6357";

export default function Curriculum() {
  return (
    <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
      <TopNav />

      {/* HERO */}
      <section
        style={{
          padding: "72px 32px 64px",
          maxWidth: 1920,
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <RadialFan texture="peptides"
          origin="tr"
          palette={KINGDOM_PALETTE}
          opacity={0.22}
          size={900}
          style={{ position: "absolute", top: -200, right: -250, width: 900, height: 900, zIndex: 0 }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Eyebrow style={{ marginBottom: 16 }}>§ 02 OF 04 · CURRICULUM</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(44px, 6vw, 76px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: NAVY,
              margin: 0,
              maxWidth: "16ch",
            }}
          >
            Thirty days. Five <Em>phases.</Em>
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
            {CURRICULUM_OVERVIEW}
          </p>
          <div style={{ marginTop: 32 }}>
            <PhaseStepper total={5} completed={0} />
          </div>
        </div>
      </section>

      {/* DAY-BY-DAY SCHEDULE */}
      <section style={{ padding: "48px 32px", maxWidth: 1920, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 320px) 1fr",
            gap: 56,
          }}
        >
          {/* Sticky day index */}
          <aside style={{ position: "sticky", top: 100, alignSelf: "start" }}>
            <Eyebrow style={{ marginBottom: 16 }}>§ 30-DAY TIMELINE</Eyebrow>
            <h2
              style={{
                fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                fontWeight: 400,
                fontSize: 36,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: NAVY,
                margin: 0,
              }}
            >
              The first <Em>thirty.</Em>
            </h2>
            <p
              style={{
                marginTop: 16,
                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                fontSize: 14,
                color: INK_MUTED,
                lineHeight: 1.55,
              }}
            >
              Day 1 through Day 30. Admin, systems, methodology, certification,
              shadow phase. Every hire walks this same path.
            </p>
          </aside>

          {/* Day rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 1, background: HAIRLINE }}>
            {DAY_SCHEDULE.map((d) => (
              <div
                key={d.day}
                style={{
                  background: CREAM,
                  padding: "24px 28px",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 20,
                  alignItems: "start",
                  borderLeft: `2px solid ${BLUE}`,
                }}
              >
                <DayBadge n={d.day} />
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 4 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                        fontWeight: 500,
                        fontSize: 19,
                        lineHeight: 1.2,
                        color: NAVY,
                        margin: 0,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {d.title}
                    </h3>
                    {d.date && (
                      <Eyebrow style={{ flexShrink: 0 }}>{d.date}</Eyebrow>
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: INK_MUTED,
                      margin: 0,
                    }}
                  >
                    {d.description}
                  </p>
                  {d.references && (
                    <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {d.references.map((r) => (
                        <span
                          key={r}
                          style={{
                            fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                            fontSize: 11,
                            fontWeight: 500,
                            letterSpacing: "0.04em",
                            color: BLUE,
                            background: PALE,
                            padding: "3px 8px",
                            borderRadius: 3,
                          }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE 5 PHASES - alternating cream/navy sections */}
      {PHASES.map((phase, idx) => {
        const onDark = idx % 2 === 1;
        return (
          <section
            key={phase.slug}
            style={{
              background: onDark ? NAVY : CREAM,
              color: onDark ? CREAM : INK,
              padding: "96px 32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <RadialFan texture="peptides"
              origin={onDark ? "bl" : "tr"}
              palette={onDark ? ["#5FB286", "#9CB3FF", "#F2A06E", "#E08585"] : KINGDOM_PALETTE}
              opacity={onDark ? 0.30 : 0.22}
              size={1000}
              style={{
                position: "absolute",
                ...(onDark ? { bottom: -250, left: -300 } : { top: -200, right: -300 }),
                width: 1000,
                height: 1000,
                zIndex: 0,
              }}
            />
            <div style={{ maxWidth: 1920, margin: "0 auto", position: "relative", zIndex: 1 }}>
              <Eyebrow style={{ color: onDark ? "rgba(255,251,240,0.6)" : INK_MUTED, marginBottom: 16 }}>
                § PHASE {phase.number} OF 05
              </Eyebrow>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
                  gap: 64,
                  alignItems: "start",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                      fontWeight: 400,
                      fontSize: "clamp(40px, 5.5vw, 64px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.025em",
                      color: onDark ? CREAM : NAVY,
                      margin: 0,
                      maxWidth: "16ch",
                    }}
                  >
                    {phase.title.split(phase.italicWord).map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && <Em>{phase.italicWord}</Em>}
                      </span>
                    ))}
                  </h2>
                  <p
                    style={{
                      marginTop: 20,
                      fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                      fontSize: 17,
                      lineHeight: 1.55,
                      color: onDark ? "rgba(255,251,240,0.75)" : INK_MUTED,
                      maxWidth: 540,
                    }}
                  >
                    {phase.summary}
                  </p>
                  <div style={{ marginTop: 28 }}>
                    <PhaseStepper total={5} completed={idx} current={idx} />
                  </div>
                </div>

                {/* Lesson list - sits on its own solid card so the radial fan
                    behind the section does not bleed through the lesson text. */}
                <div>
                  <Eyebrow
                    style={{
                      color: onDark ? "rgba(255,251,240,0.55)" : INK_MUTED,
                      marginBottom: 12,
                    }}
                  >
                    {phase.lessons.length} lessons
                  </Eyebrow>
                  <ol
                    style={{
                      listStyle: "none",
                      padding: "8px 16px",
                      margin: 0,
                      background: onDark ? "#141849" : CREAM,
                      border: `1px solid ${onDark ? "rgba(255,251,240,0.18)" : HAIRLINE}`,
                      borderRadius: 8,
                      boxShadow: onDark
                        ? "0 8px 24px rgba(0,0,0,0.35)"
                        : "0 8px 24px rgba(26, 32, 96, 0.06), 0 1px 2px rgba(26, 32, 96, 0.04)",
                    }}
                  >
                    {phase.lessons.map((l, lessonIdx) => {
                      const media = lessonMediaTypes(l.code);
                      const isLast = lessonIdx === phase.lessons.length - 1;
                      return (
                      <li
                        key={l.code}
                        style={{
                          borderBottom: isLast ? "none" : `1px solid ${onDark ? "rgba(255,251,240,0.12)" : HAIRLINE}`,
                        }}
                      >
                        <Link href={`/curriculum/${l.code}`}>
                          <a
                            className={onDark ? "kingdom-lesson-dark" : "kingdom-lesson-light"}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "auto 1fr auto auto",
                              gap: 12,
                              alignItems: "center",
                              padding: "14px 8px",
                              color: onDark ? CREAM : INK,
                              textDecoration: "none",
                              transition: "background 150ms ease",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: "0.06em",
                                color: onDark ? "#5FB286" : BLUE,
                                minWidth: 44,
                              }}
                            >
                              {l.code}
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                                fontSize: 15,
                                lineHeight: 1.45,
                                color: onDark ? CREAM : INK,
                              }}
                            >
                              {l.title}
                            </span>
                            <span style={{ display: "inline-flex", gap: 6 }}>
                              {media.hasVideo && (
                                <span style={mediaPill("#3B5BDB", onDark)}>
                                  <Video size={10} /> VIDEO
                                </span>
                              )}
                              {media.hasAudio && (
                                <span style={mediaPill("#D9622B", onDark)}>
                                  <Headphones size={10} /> AUDIO
                                </span>
                              )}
                            </span>
                            <ArrowRight
                              size={14}
                              style={{
                                color: onDark ? "#5FB286" : BLUE,
                                opacity: 0.9,
                              }}
                            />
                          </a>
                        </Link>
                      </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* OPERATIONS REFERENCE */}
      <section style={{ padding: "96px 32px", maxWidth: 1920, margin: "0 auto" }}>
        <Eyebrow style={{ marginBottom: 16 }}>§ R · OPERATIONS REFERENCE</Eyebrow>
        <h2
          style={{
            fontFamily: "var(--font-display, Fraunces), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(36px, 4.5vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: NAVY,
            margin: 0,
            maxWidth: "16ch",
          }}
        >
          The supporting <Em>chapters.</Em>
        </h2>
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 16,
          }}
        >
          {OPERATIONS_REFERENCE.map((r) => {
            const media = lessonMediaTypes(r.code);
            return (
            <Link key={r.code} href={`/curriculum/${r.code}`}>
              <a
                className="kingdom-ops-card"
                style={{
                  background: "rgba(255, 255, 255, 0.55)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  padding: "20px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  textDecoration: "none",
                  color: INK,
                  border: `1px solid rgba(232, 222, 198, 0.7)`,
                  borderRadius: 10,
                  boxShadow: "0 1px 2px rgba(26,32,96,0.04), 0 4px 14px rgba(26,32,96,0.05)",
                  transition: "background 150ms ease, transform 150ms ease, box-shadow 150ms ease",
                  minHeight: 96,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: BLUE,
                    letterSpacing: "0.06em",
                    minWidth: 36,
                  }}
                >
                  {r.code}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                    fontWeight: 500,
                    fontSize: 18,
                    lineHeight: 1.25,
                    color: NAVY,
                    letterSpacing: "-0.01em",
                    flex: 1,
                  }}
                >
                  {r.title}
                </span>
                {media.hasVideo && (
                  <span style={mediaPill("#3B5BDB", false)}>
                    <Video size={10} /> VIDEO
                  </span>
                )}
                {media.hasAudio && (
                  <span style={mediaPill("#D9622B", false)}>
                    <Headphones size={10} /> AUDIO
                  </span>
                )}
                <ArrowRight size={14} style={{ color: BLUE, opacity: 0.85 }} />
              </a>
            </Link>
            );
          })}
        </div>
      </section>

      <style>{`
        .kingdom-lesson-light:hover { background: ${PALE}; }
        .kingdom-lesson-dark:hover { background: rgba(255,251,240,0.06); }
        .kingdom-ops-card:hover {
          background: rgba(255, 255, 255, 0.78) !important;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(26,32,96,0.06), 0 8px 24px rgba(26,32,96,0.08) !important;
        }
      `}</style>

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
        <PageNumber current={2} total={4} />
      </footer>
    </div>
  );
}

function mediaPill(accent: string, onDark: boolean): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "3px 8px",
    background: onDark ? "rgba(255,251,240,0.08)" : "transparent",
    color: accent,
    border: `1px solid ${accent}`,
    fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: "0.12em",
    borderRadius: 999,
  };
}
