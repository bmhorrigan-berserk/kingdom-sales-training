/**
 * Library - companion video + audio catalog.
 *
 * Surfaces the same media that's pinned to individual lessons via the
 * MediaPanel, but as a flat browseable catalog so trainees can revisit
 * any explainer or live-call recording without walking the curriculum.
 *
 * Two sections: Video Explainers and Audio + Podcasts. Each item card
 * shows the title, runtime, the linked lesson code, a short
 * description, and the in-place native player.
 */
import { Link } from "wouter";
import TopNav from "@/components/TopNav";
import { Eyebrow, PageNumber, Em } from "@/components/Furniture";
import { RadialFan, KINGDOM_PALETTE } from "@/components/RadialFan";
import { MEDIA_CATALOG, LESSON_MEDIA, type MediaItem } from "@/lib/mediaData";
import { Play, Headphones, Video, ArrowRight, Clock } from "lucide-react";

const NAVY = "#1A2060";
const NAVY_DEEP = "#141849";
const GREEN = "#1F6B3F";
const BLUE = "#3B5BDB";
const ORANGE = "#D9622B";
const CREAM = "#FFFBF0";
const PALE = "#EAF4EC";
const HAIRLINE = "#E8DEC6";
const INK = "#2D2A24";
const INK_MUTED = "#6B6357";

/** Reverse-lookup: given a media slug, which lesson code references it. */
function lessonForSlug(slug: string): string | null {
  for (const [code, slugs] of Object.entries(LESSON_MEDIA)) {
    if (slugs.includes(slug)) return code;
  }
  return null;
}

/** Friendly label for a lesson code. */
function lessonLabel(code: string | null): string {
  if (!code) return "Capstone";
  if (code.startsWith("R-")) return `Operations Reference ${code}`;
  if (code.startsWith("I-")) return `Intro ${code}`;
  const [phase, n] = code.split("-");
  return `Phase ${phase} · Lesson ${code}`;
}

export default function Library() {
  const videos = MEDIA_CATALOG.filter((m) => m.type === "video");
  const audios = MEDIA_CATALOG.filter((m) => m.type === "audio");

  return (
    <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
      <TopNav />

      {/* HERO STRIP */}
      <section
        style={{
          position: "relative",
          background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
          color: CREAM,
          overflow: "hidden",
        }}
      >
        <RadialFan texture="weight"
          origin="tr"
          palette={["#5FB286", "#9CB3FF", "#F2A06E", "#E08585"]}
          opacity={0.14}
          size={1400}
          rays={56}
          arcs={6}
          style={{ zIndex: 0 }}
        />
        <div
          style={{
            maxWidth: 1920,
            margin: "0 auto",
            padding: "72px 32px 56px",
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)",
            gap: 48,
            alignItems: "end",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono, ui-monospace, monospace)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#5FB286",
                marginBottom: 14,
              }}
            >
              § 05 · MEDIA LIBRARY · {videos.length} VIDEOS · {audios.length}{" "}
              AUDIO
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(40px, 5vw, 64px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: CREAM,
                margin: 0,
                maxWidth: "20ch",
              }}
            >
              Watch and{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: ORANGE,
                  fontWeight: "inherit",
                }}
              >
                listen.
              </em>
            </h1>
            <p
              style={{
                marginTop: 16,
                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                fontSize: 16,
                lineHeight: 1.55,
                color: "rgba(255,251,240,0.78)",
                maxWidth: "60ch",
              }}
            >
              Every companion explainer and live-call recording from the
              curriculum, in one place. Watch the videos before each phase.
              Listen to the audio walks during practice. Each item lists the
              lesson it pairs with so you can dive deeper from here.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <a
              href="#videos"
              style={statTile(BLUE, videos.length, "Video", "explainers")}
            >
              <Video size={18} style={{ color: CREAM }} />
              <div style={statTileNumber}>
                {String(videos.length).padStart(2, "0")}
              </div>
              <div style={statTileLabel}>Video explainers</div>
            </a>
            <a
              href="#audio"
              style={statTile(ORANGE, audios.length, "Audio", "recordings")}
            >
              <Headphones size={18} style={{ color: CREAM }} />
              <div style={statTileNumber}>
                {String(audios.length).padStart(2, "0")}
              </div>
              <div style={statTileLabel}>Audio + podcasts</div>
            </a>
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section
        id="videos"
        style={{
          maxWidth: 1920,
          margin: "0 auto",
          padding: "72px 32px 32px",
          scrollMarginTop: 80,
        }}
      >
        <SectionHeader
          eyebrow="§ A · VIDEO EXPLAINERS"
          eyebrowColor={BLUE}
          headline={
            <>
              Watch <Em>first.</Em>
            </>
          }
          subline="One video per phase, plus the capstone. Watch before stepping into the corresponding lesson set."
          count={videos.length}
          accent={BLUE}
        />
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
            gap: 20,
          }}
        >
          {videos.map((m) => (
            <MediaTile
              key={m.slug}
              item={m}
              accent={BLUE}
              lessonCode={lessonForSlug(m.slug)}
            />
          ))}
        </div>
      </section>

      {/* AUDIO */}
      <section
        id="audio"
        style={{
          maxWidth: 1920,
          margin: "0 auto",
          padding: "32px 32px 96px",
          scrollMarginTop: 80,
        }}
      >
        <SectionHeader
          eyebrow="§ B · AUDIO + PODCASTS"
          eyebrowColor={ORANGE}
          headline={
            <>
              Listen <Em>alongside.</Em>
            </>
          }
          subline="Long-form deep dives plus four live-call recordings demonstrating the kingdom posture in action. Bring headphones."
          count={audios.length}
          accent={ORANGE}
        />
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
            gap: 20,
          }}
        >
          {audios.map((m) => (
            <MediaTile
              key={m.slug}
              item={m}
              accent={ORANGE}
              lessonCode={lessonForSlug(m.slug)}
            />
          ))}
        </div>
      </section>

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
        <PageNumber current={5} total={5} />
      </footer>
    </div>
  );
}

/* ─── Section header ─────────────────────────────────────────────────────── */
function SectionHeader({
  eyebrow,
  eyebrowColor,
  headline,
  subline,
  count,
  accent,
}: {
  eyebrow: string;
  eyebrowColor: string;
  headline: React.ReactNode;
  subline: string;
  count: number;
  accent: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
        gap: 48,
        alignItems: "end",
      }}
    >
      <div>
        <Eyebrow style={{ color: eyebrowColor, marginBottom: 12 }}>
          {eyebrow}
        </Eyebrow>
        <h2
          style={{
            fontFamily: "var(--font-display, Fraunces), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(36px, 4.4vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: NAVY,
            margin: 0,
            maxWidth: "16ch",
          }}
        >
          {headline}
        </h2>
        <p
          style={{
            marginTop: 14,
            fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
            fontSize: 16,
            lineHeight: 1.55,
            color: INK_MUTED,
            maxWidth: "60ch",
          }}
        >
          {subline}
        </p>
      </div>
      <div style={{ textAlign: "right" }}>
        <span
          style={{
            display: "inline-block",
            padding: "6px 14px",
            background: accent,
            color: CREAM,
            fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            borderRadius: 999,
          }}
        >
          {count} {count === 1 ? "item" : "items"}
        </span>
      </div>
    </div>
  );
}

/* ─── Individual tile with inline player ─────────────────────────────────── */
function MediaTile({
  item,
  accent,
  lessonCode,
}: {
  item: MediaItem;
  accent: string;
  lessonCode: string | null;
}) {
  const isVideo = item.type === "video";
  return (
    <article
      style={{
        background: "rgba(255, 255, 255, 0.72)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${HAIRLINE}`,
        borderTop: `4px solid ${accent}`,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow:
          "0 1px 2px rgba(26,32,96,0.04), 0 12px 32px rgba(26,32,96,0.06)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "20px 22px 16px",
          display: "grid",
          gridTemplateColumns: "44px 1fr",
          gap: 14,
          alignItems: "start",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            borderRadius: 10,
            background: accent,
            color: CREAM,
            flexShrink: 0,
            boxShadow: `0 4px 14px ${accent}33`,
          }}
        >
          {isVideo ? <Play size={18} /> : <Headphones size={18} />}
        </span>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono, ui-monospace, monospace)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: accent,
              }}
            >
              {item.type}
            </span>
            {item.durationMin ? (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily:
                    "var(--font-body, Inter), system-ui, sans-serif",
                  fontSize: 12,
                  color: INK_MUTED,
                }}
              >
                <Clock size={11} /> {item.durationMin} min
              </span>
            ) : null}
            {lessonCode && (
              <Link href={`/curriculum/${lessonCode}`}>
                <a
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "2px 8px",
                    background: PALE,
                    color: GREEN,
                    fontFamily:
                      "var(--font-body, Inter), system-ui, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    borderRadius: 999,
                    textDecoration: "none",
                    border: `1px solid rgba(31,107,63,0.25)`,
                  }}
                >
                  {lessonLabel(lessonCode).toUpperCase()}
                  <ArrowRight size={9} />
                </a>
              </Link>
            )}
          </div>
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
            {item.title}
          </h3>
        </div>
      </header>

      {/* Description */}
      {item.description && (
        <div
          style={{
            padding: "0 22px 16px",
            fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
            fontSize: 14,
            lineHeight: 1.55,
            color: INK,
          }}
        >
          {item.description}
        </div>
      )}

      {/* Player */}
      <div style={{ padding: "0 22px 22px", marginTop: "auto" }}>
        {isVideo ? (
          <video
            controls
            preload="metadata"
            poster={item.poster}
            style={{
              width: "100%",
              maxHeight: 420,
              borderRadius: 8,
              background: "#000",
              display: "block",
            }}
          >
            <source src={item.src} />
            Your browser does not support video playback.
          </video>
        ) : (
          <audio controls preload="metadata" style={{ width: "100%" }}>
            <source src={item.src} />
            Your browser does not support audio playback.
          </audio>
        )}
      </div>
    </article>
  );
}

/* ─── Stat tile helpers (hero) ───────────────────────────────────────────── */
function statTile(bg: string, _n: number, _l1: string, _l2: string): React.CSSProperties {
  return {
    display: "block",
    padding: "20px 22px",
    background: `linear-gradient(135deg, ${bg}, rgba(255,255,255,0.04))`,
    border: "1px solid rgba(255,251,240,0.18)",
    borderRadius: 12,
    color: CREAM,
    textDecoration: "none",
    transition: "transform 150ms ease",
    backdropFilter: "blur(8px)",
  };
}

const statTileNumber: React.CSSProperties = {
  marginTop: 10,
  fontFamily: "var(--font-display, Fraunces), Georgia, serif",
  fontWeight: 600,
  fontSize: 44,
  lineHeight: 1,
  letterSpacing: "-0.025em",
  color: CREAM,
};

const statTileLabel: React.CSSProperties = {
  marginTop: 6,
  fontFamily: "var(--font-mono, ui-monospace, monospace)",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(255,251,240,0.85)",
};
