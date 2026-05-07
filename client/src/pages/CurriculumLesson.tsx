/**
 * CurriculumLesson - individual lesson detail page.
 * Loads /curriculum/{code}.html in an iframe with sibling rail of all
 * lessons in the same phase, plus prev/next.
 *
 * Codes: 1-1 through 5-N for phase lessons, R-1 through R-9 for ops reference.
 */
import { Link, useRoute } from "wouter";
import TopNav from "@/components/TopNav";
import { Eyebrow, PageNumber, Em } from "@/components/Furniture";
import { RadialFan, KINGDOM_PALETTE } from "@/components/RadialFan";
import { MediaPanel } from "@/components/MediaPanel";
import { PHASES, OPERATIONS_REFERENCE } from "@/lib/curriculumData";
import { getMediaForLesson } from "@/lib/mediaData";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

const NAVY = "#1A2060";
const GREEN = "#1F6B3F";
const ORANGE = "#D9622B";
const CREAM = "#FFFBF0";
const PALE = "#EAF4EC";
const HAIRLINE = "#E8DEC6";
const INK = "#2D2A24";
const INK_MUTED = "#6B6357";

interface ResolvedLesson {
  code: string;
  title: string;
  phaseNumber?: string;
  phaseTitle?: string;
  isOps: boolean;
}

function resolveLesson(code: string): ResolvedLesson | null {
  // Phase lessons: 1-1, 2-3, ...
  for (const phase of PHASES) {
    const found = phase.lessons.find((l) => l.code === code);
    if (found) {
      return {
        code: found.code,
        title: found.title,
        phaseNumber: phase.number,
        phaseTitle: phase.title.replace(/\.$/, ""),
        isOps: false,
      };
    }
  }
  // Operations Reference: R-1 ...
  const ops = OPERATIONS_REFERENCE.find((r) => r.code === code);
  if (ops) {
    return {
      code: ops.code,
      title: ops.title,
      isOps: true,
    };
  }
  return null;
}

export default function CurriculumLesson() {
  const [, params] = useRoute<{ code: string }>("/curriculum/:code");
  const code = params?.code ?? "";

  const lesson = resolveLesson(code);
  if (!lesson) {
    return (
      <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
        <TopNav />
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "120px 32px" }}>
          <Eyebrow>§ NOT FOUND</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 400,
              fontSize: 56,
              color: NAVY,
              marginTop: 16,
            }}
          >
            Lesson not in the curriculum.
          </h1>
          <p style={{ color: INK_MUTED, marginTop: 16 }}>
            Looked for code <strong>{code}</strong>.
          </p>
          <Link href="/curriculum">
            <a style={{ color: GREEN, fontWeight: 600, textDecoration: "none" }}>
              ← Back to curriculum
            </a>
          </Link>
        </div>
      </div>
    );
  }

  // Build sibling list + prev/next
  let siblings: { code: string; title: string }[] = [];
  if (lesson.isOps) {
    siblings = OPERATIONS_REFERENCE.map((r) => ({ code: r.code, title: r.title }));
  } else {
    const phase = PHASES.find((p) => p.number === lesson.phaseNumber);
    siblings = phase?.lessons.map((l) => ({ code: l.code, title: l.title })) ?? [];
  }

  const idx = siblings.findIndex((s) => s.code === lesson.code);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  const htmlPath = `/curriculum/${lesson.code}.html`;

  return (
    <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
      <TopNav />

      {/* BACK STRIP */}
      <div style={{ maxWidth: 1920, margin: "0 auto", padding: "20px 32px 0" }}>
        <Link href="/curriculum">
          <a
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: NAVY,
              textDecoration: "none",
              fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <ArrowLeft size={14} style={{ color: GREEN }} />
            Curriculum Index
          </a>
        </Link>
      </div>

      {/* TITLE BLOCK */}
      <header
        style={{
          maxWidth: 1920,
          margin: "0 auto",
          padding: "32px 32px 40px",
          borderBottom: `1px solid ${HAIRLINE}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <RadialFan texture="peptides"
          origin="tr"
          palette={KINGDOM_PALETTE}
          opacity={0.10}
          size={1400}
          style={{ zIndex: 0 }}
        />
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "start", position: "relative", zIndex: 1 }}>
          <span
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 600,
              fontSize: 96,
              color: GREEN,
              letterSpacing: "-0.03em",
              lineHeight: 0.85,
            }}
          >
            {lesson.code}
          </span>
          <div>
            <Eyebrow style={{ color: GREEN, marginBottom: 12 }}>
              §{" "}
              {lesson.isOps
                ? "OPERATIONS REFERENCE"
                : `PHASE ${lesson.phaseNumber} · ${lesson.phaseTitle?.toUpperCase()}`}
            </Eyebrow>
            <h1
              style={{
                fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(32px, 4.4vw, 52px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: NAVY,
                margin: 0,
                maxWidth: "26ch",
              }}
            >
              {lesson.title}.
            </h1>

            <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href={htmlPath}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  background: NAVY,
                  color: CREAM,
                  fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderRadius: 4,
                }}
              >
                <ExternalLink size={12} style={{ color: GREEN }} />
                Open in new tab
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN GRID: lesson + sibling rail */}
      <main
        style={{
          maxWidth: 1920,
          margin: "0 auto",
          padding: "40px 32px 64px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 3fr) minmax(260px, 1fr)",
          gap: 40,
        }}
      >
        {/* Lesson body */}
        <div>
          <MediaPanel items={getMediaForLesson(lesson.code)} />

          <Eyebrow style={{ marginBottom: 16 }}>§ LESSON</Eyebrow>
          <div
            style={{
              border: `1px solid ${HAIRLINE}`,
              borderRadius: 8,
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 12px 32px rgba(26, 32, 96, 0.08), 0 2px 6px rgba(26, 32, 96, 0.05)",
            }}
          >
            <iframe
              src={htmlPath}
              title={lesson.title}
              style={{
                width: "100%",
                height: "82vh",
                border: 0,
                display: "block",
                background: "#fff",
              }}
            />
          </div>
        </div>

        {/* Sibling rail */}
        <aside style={{ position: "sticky", top: 100, alignSelf: "start" }}>
          <Eyebrow style={{ color: GREEN, marginBottom: 16 }}>
            §{" "}
            {lesson.isOps
              ? "ALL OPERATIONS REFERENCE"
              : `ALL OF PHASE ${lesson.phaseNumber}`}
          </Eyebrow>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {siblings.map((s) => {
              const active = s.code === lesson.code;
              return (
                <li key={s.code}>
                  <Link href={`/curriculum/${s.code}`}>
                    <a
                      className="kingdom-sib-row"
                      style={{
                        display: "block",
                        padding: "12px 12px",
                        borderTop: `1px solid ${HAIRLINE}`,
                        color: INK,
                        textDecoration: "none",
                        background: active ? PALE : "transparent",
                      }}
                    >
                      <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                        <span
                          style={{
                            fontFamily:
                              "var(--font-display, Fraunces), Georgia, serif",
                            fontWeight: 600,
                            fontSize: 13,
                            color: GREEN,
                            letterSpacing: "0.04em",
                            minWidth: 36,
                          }}
                        >
                          {s.code}
                        </span>
                        <span
                          style={{
                            fontFamily:
                              "var(--font-body, Inter), system-ui, sans-serif",
                            fontSize: 13,
                            fontWeight: active ? 600 : 500,
                            color: active ? NAVY : INK,
                            lineHeight: 1.35,
                          }}
                        >
                          {s.title}
                        </span>
                      </div>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            style={{
              marginTop: 32,
              padding: 20,
              background: PALE,
              border: `1px solid ${HAIRLINE}`,
              borderRadius: 6,
            }}
          >
            <Eyebrow style={{ color: GREEN, marginBottom: 8 }}>§ READING ORDER</Eyebrow>
            <p
              style={{
                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                fontSize: 13,
                lineHeight: 1.55,
                color: INK_MUTED,
                margin: 0,
              }}
            >
              Read in order. Each lesson <Em>builds</Em> on the prior one.
            </p>
          </div>
        </aside>
      </main>

      {/* PREV / NEXT - single connected bar across the page so the corners
          do not read as floating brackets in the cream space. */}
      <nav
        style={{
          maxWidth: 1920,
          margin: "0 auto",
          padding: "0 32px 64px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            background: "rgba(255, 255, 255, 0.55)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: `1px solid rgba(232, 222, 198, 0.7)`,
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: "0 1px 2px rgba(26,32,96,0.04), 0 4px 14px rgba(26,32,96,0.05)",
          }}
        >
          {prev ? (
            <Link href={`/curriculum/${prev.code}`}>
              <a
                className="kingdom-prevnext"
                style={{
                  padding: "20px 24px",
                  color: INK,
                  textDecoration: "none",
                  background: "transparent",
                  borderRight: `1px solid rgba(232, 222, 198, 0.7)`,
                  display: "block",
                  transition: "background 150ms ease",
                }}
              >
                <Eyebrow style={{ color: GREEN, marginBottom: 8 }}>
                  <ArrowLeft size={11} style={{ display: "inline", marginRight: 6 }} />
                  Previous
                </Eyebrow>
                <div
                  style={{
                    fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                    fontSize: 18,
                    fontWeight: 500,
                    color: NAVY,
                  }}
                >
                  {prev.code} {prev.title}
                </div>
              </a>
            </Link>
          ) : (
            <div
              style={{
                padding: "20px 24px",
                borderRight: `1px solid rgba(232, 222, 198, 0.7)`,
                color: INK_MUTED,
                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
              }}
            >
              First lesson in this set
            </div>
          )}
          {next ? (
            <Link href={`/curriculum/${next.code}`}>
              <a
                className="kingdom-prevnext"
                style={{
                  padding: "20px 24px",
                  color: INK,
                  textDecoration: "none",
                  background: "transparent",
                  textAlign: "right",
                  display: "block",
                  transition: "background 150ms ease",
                }}
              >
                <Eyebrow style={{ color: GREEN, marginBottom: 8, justifyContent: "flex-end" }}>
                  Next
                  <ArrowRight size={11} style={{ display: "inline", marginLeft: 6 }} />
                </Eyebrow>
                <div
                  style={{
                    fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                    fontSize: 18,
                    fontWeight: 500,
                    color: NAVY,
                  }}
                >
                  {next.code} {next.title}
                </div>
              </a>
            </Link>
          ) : (
            <div
              style={{
                padding: "20px 24px",
                textAlign: "right",
                color: INK_MUTED,
                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              Last lesson in this set
            </div>
          )}
        </div>
      </nav>
      <style>{`.kingdom-prevnext:hover { background: rgba(255, 255, 255, 0.78); }`}</style>

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
        <Eyebrow>· {lesson.code} · {lesson.title.toUpperCase()} ·</Eyebrow>
        <PageNumber current={2} total={4} />
      </footer>
    </div>
  );
}
