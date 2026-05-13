/**
 * TreatmentTopic - detail page for one Treatment Catalog topic.
 *
 * Layout (top to bottom):
 *   1. TopNav
 *   2. Hero band - navy gradient with corner medallion, breadcrumb,
 *      module number, short label, long serif title, summary,
 *      format pill rail with jump links.
 *   3. "What you'll learn" strip - three bullet points framing the
 *      module before the rep dives into any format.
 *   4. Four asymmetric stacked sections (audio, video, infographic,
 *      slides). The text + meta side alternates left/right so the page
 *      breathes instead of stacking as a column of bricks.
 *   5. Continue Learning - links to the other four modules so the rep
 *      can flow through the catalog without bouncing to Library.
 *   6. Footer.
 *
 * Format rendering:
 *   - audio       -> <audio controls> with duration + download
 *   - video       -> <video controls> or embed iframe (YouTube/Vimeo)
 *   - infographic -> high-res <img> with download
 *   - slides      -> image-page carousel (asset.pages[]) with prev /
 *                    next + keyboard nav, or iframe fallback for
 *                    PDF/Google Slides URLs
 *
 * Reached via /library/treatment/<slug>.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import {
  Headphones,
  Video as VideoIcon,
  Image as ImageIcon,
  Layers,
  Download,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";
import TopNav from "@/components/TopNav";
import { Eyebrow, Em } from "@/components/Furniture";
import { DurationBadge } from "@/components/DurationBadge";
import { RadialFan, type FanTexture } from "@/components/RadialFan";
import {
  getTreatmentTopic,
  topicAvailableFormats,
  TREATMENT_TOPICS,
  type TreatmentTopic as TopicType,
  type TreatmentTopicAsset,
} from "@/lib/mediaData";

/* ─── kingdom palette ────────────────────────────────────────────────────── */
const NAVY = "#1A2060";
const NAVY_DEEP = "#141849";
const GREEN = "#1F6B3F";
const ORANGE = "#D9622B";
const RED = "#B23A3A";
const BLUE = "#3B5BDB";
const ROSE = "#C95371";
const CREAM = "#FFFBF0";
const CREAM_WARM = "#FAF3E2";
const PALE = "#EAF4EC";
const HAIRLINE = "#E8DEC6";
const INK = "#2D2A24";
const INK_MUTED = "#6B6357";

/* ─── per-topic accent + medallion texture ────────────────────────────────
   accent  → bold ink color for headings, period flourishes, borders.
   soft    → faded background tint behind each format section (the cream
             washes Brice asked for: each module owns its own hue).
   texture → which RadialFan vector goes behind the section frames.

   Male Hormones    → BLUE
   Female Hormones  → PINK/RED (rose)
   Peptides         → ORANGE
   Weight Loss      → RED
   Wellness         → GREEN
*/
const TOPIC_THEME: Record<
  string,
  { accent: string; texture: FanTexture; soft: string }
> = {
  "fixing-male-energy-crisis":            { accent: BLUE,   texture: "peptides", soft: "#E8EDFB" },
  "why-women-need-testosterone":          { accent: ROSE,   texture: "hormone",  soft: "#FBE5EB" },
  "peptides-targeted-cellular-repair":    { accent: ORANGE, texture: "weight",   soft: "#FBEBDD" },
  "retatrutide-human-survival-algorithm": { accent: RED,    texture: "hormone",  soft: "#F8E8E5" },
  "targeted-molecules-cellular-energy":   { accent: GREEN,  texture: "wellness", soft: "#E5F0E9" },
};
const DEFAULT_THEME = { accent: GREEN, texture: "wellness" as FanTexture, soft: "#E5F0E9" };

/* ─── format meta (label + icon + section blurb) ─────────────────────────── */
type AssetType = "audio" | "video" | "infographic" | "slides";

const FORMAT_META: Record<
  AssetType,
  { label: string; eyebrow: string; blurb: string; Icon: typeof Headphones }
> = {
  audio: {
    label: "Audio",
    eyebrow: "§ A · AUDIO DEEP DIVE",
    blurb: "Long-form recording. Headphones in, walk through the biology end to end before the next live call.",
    Icon: Headphones,
  },
  video: {
    label: "Video",
    eyebrow: "§ B · VIDEO OVERVIEW",
    blurb: "Watch the kingdom narrative version. Same content, visual pacing - useful before a roleplay or shadow call.",
    Icon: VideoIcon,
  },
  infographic: {
    label: "Infographic",
    eyebrow: "§ C · INFOGRAPHIC",
    blurb: "One-page visual map of the protocol. Save it, print it, share it with a patient on a follow-up call.",
    Icon: ImageIcon,
  },
  slides: {
    label: "Slide Deck",
    eyebrow: "§ D · SLIDE DECK",
    blurb: "The patient-facing deck. Walk a patient through it on a call, or use it as a study reference between recordings.",
    Icon: Layers,
  },
};

/* ──────────────────────────────────────────────────────────────────────────── */

export default function TreatmentTopic() {
  const [, params] = useRoute<{ slug: string }>("/library/treatment/:slug");
  const slug = params?.slug ?? "";
  const topic = getTreatmentTopic(slug);

  // IMPORTANT: every hook below must run on every render. Computing
  // `otherTopics` against the slug here keeps hook order stable even
  // when the slug points at a missing topic (we still call useMemo
  // before the conditional return).
  const otherTopics = useMemo(
    () => TREATMENT_TOPICS.filter((t) => t.slug !== slug),
    [slug]
  );

  if (!topic) return <NotFoundView slug={slug} />;

  const theme = TOPIC_THEME[topic.slug] ?? DEFAULT_THEME;
  const available = topicAvailableFormats(topic);

  return (
    <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
      <TopNav />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <Hero topic={topic} theme={theme} available={available} />

      {/* ── WHAT YOU'LL LEARN STRIP ──────────────────────────────────── */}
      <LearningStrip topic={topic} accent={theme.accent} />

      {/* ── FORMAT SECTIONS (one shared band, four white tiles) ─────── */}
      <FormatBand topic={topic} theme={theme} />

      {/* ── CONTINUE LEARNING ───────────────────────────────────────── */}
      <ContinueLearning topics={otherTopics} />

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
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
        <Link href="/library">
          <a
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: theme.accent,
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} />
            Back to Library
          </a>
        </Link>
      </footer>
    </div>
  );
}

/* ─── Hero band ──────────────────────────────────────────────────────────── */
function Hero({
  topic,
  theme,
  available,
}: {
  topic: TopicType;
  theme: { accent: string; texture: FanTexture };
  available: AssetType[];
}) {
  return (
    <section
      style={{
        position: "relative",
        background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
        color: CREAM,
        overflow: "hidden",
      }}
    >
      {/* Big medallion anchored to the top-left, matching the Sales
          Catalog hero treatment. Only one - no other vector pieces in
          the header. */}
      <RadialFan
        texture={theme.texture}
        origin="tl"
        opacity={0.16}
        size={760}
        style={{ zIndex: 0 }}
      />
      {/* Subtle bottom hairline */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 1,
          background: "rgba(255,251,240,0.10)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "44px 32px 56px",
        }}
      >
        {/* Breadcrumb */}
        <Link href="/library">
          <a
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,251,240,0.66)",
              textDecoration: "none",
              marginBottom: 28,
            }}
          >
            <ArrowLeft size={13} />
            Library &nbsp;/&nbsp; Treatment Catalog
          </a>
        </Link>

        {/* Two-column grid: title block (left, wider) + format rail (right) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.55fr) minmax(0, 1fr)",
            gap: 56,
            alignItems: "start",
          }}
        >
          {/* LEFT: module number + short label + serif title + summary */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 20,
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                  fontWeight: 600,
                  fontSize: "clamp(64px, 8vw, 112px)",
                  lineHeight: 0.85,
                  letterSpacing: "-0.04em",
                  color: theme.accent,
                }}
              >
                {topic.moduleNumber}
              </span>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, ui-monospace, monospace)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(255,251,240,0.65)",
                    marginBottom: 6,
                  }}
                >
                  § Module {topic.moduleNumber} · Treatment Catalog
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                    fontWeight: 500,
                    fontSize: "clamp(32px, 3.6vw, 48px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    color: CREAM,
                  }}
                >
                  {topic.shortLabel}
                  <Em style={{ color: theme.accent }}>.</Em>
                </div>
              </div>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(22px, 2.4vw, 30px)",
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
                color: "rgba(255,251,240,0.78)",
                margin: "18px 0 0",
                maxWidth: "30ch",
              }}
            >
              {topic.title}
            </h1>

            <p
              style={{
                marginTop: 22,
                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                fontSize: 16,
                lineHeight: 1.6,
                color: "rgba(255,251,240,0.82)",
                maxWidth: "62ch",
              }}
            >
              {topic.summary}
            </p>
          </div>

          {/* RIGHT: format rail */}
          <aside
            style={{
              background: "rgba(255,251,240,0.06)",
              border: "1px solid rgba(255,251,240,0.16)",
              borderRadius: 14,
              padding: "20px 22px",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono, ui-monospace, monospace)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,251,240,0.55)",
                marginBottom: 12,
                paddingBottom: 10,
                borderBottom: "1px solid rgba(255,251,240,0.12)",
              }}
            >
              § Formats in this module
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {(["audio", "video", "infographic", "slides"] as AssetType[]).map(
                (f) => {
                  const isAvailable = available.includes(f);
                  const { label, Icon } = FORMAT_META[f];
                  return (
                    <li key={f}>
                      <a
                        href={isAvailable ? `#${f}` : undefined}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          background: isAvailable
                            ? "rgba(255,251,240,0.05)"
                            : "transparent",
                          border: "1px solid rgba(255,251,240,0.10)",
                          borderRadius: 8,
                          color: isAvailable
                            ? CREAM
                            : "rgba(255,251,240,0.36)",
                          textDecoration: "none",
                          fontFamily:
                            "var(--font-body, Inter), system-ui, sans-serif",
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: isAvailable ? "pointer" : "default",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 28,
                            height: 28,
                            borderRadius: 6,
                            background: isAvailable
                              ? theme.accent
                              : "rgba(255,251,240,0.10)",
                            color: isAvailable ? CREAM : "rgba(255,251,240,0.4)",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={13} />
                        </span>
                        <span style={{ flex: 1 }}>{label}</span>
                        <span
                          style={{
                            fontFamily:
                              "var(--font-mono, ui-monospace, monospace)",
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: isAvailable
                              ? "rgba(255,251,240,0.6)"
                              : "rgba(255,251,240,0.32)",
                          }}
                        >
                          {isAvailable ? "Available" : "Soon"}
                        </span>
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ─── "What you'll learn" strip ──────────────────────────────────────────── */
function LearningStrip({
  topic,
  accent,
}: {
  topic: TopicType;
  accent: string;
}) {
  return (
    <section
      style={{
        background: CREAM_WARM,
        borderBottom: `1px solid ${HAIRLINE}`,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "32px 32px 28px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.7fr) minmax(0, 2fr)",
          gap: 32,
          alignItems: "start",
        }}
      >
        <div>
          <Eyebrow style={{ color: accent, marginBottom: 8 }}>
            § What you'll learn
          </Eyebrow>
          <div
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(22px, 2vw, 28px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: NAVY,
            }}
          >
            Three anchors for the call.
          </div>
        </div>
        <ol
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 18,
            counterReset: "learn",
          }}
        >
          {topic.learningBullets.map((b, i) => (
            <li
              key={i}
              style={{
                position: "relative",
                paddingLeft: 44,
                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                fontSize: 14.5,
                lineHeight: 1.55,
                color: INK,
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: accent,
                  color: CREAM,
                  fontFamily:
                    "var(--font-mono, ui-monospace, monospace)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {b}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─── Format band (one shared section wrapping all four format tiles) ──
   The four format tiles (audio, video, infographic, slides) share a
   single soft-tinted band so the page reads as one Treatment Catalog
   spread instead of four stacked stripes. Two giant medallions, one
   anchored top-left and one bottom-right, frame the entire band -
   matching the Sales Catalog hero treatment. */
function FormatBand({
  topic,
  theme,
}: {
  topic: TopicType;
  theme: { accent: string; texture: FanTexture; soft: string };
}) {
  return (
    <section
      style={{
        position: "relative",
        background: theme.soft,
        padding: "72px 32px 88px",
        overflow: "hidden",
      }}
    >
      {/* Giant Sales-Catalog-scale medallions. ONE top-left, ONE
          bottom-right. Nothing else. */}
      <RadialFan
        texture={theme.texture}
        origin="tl"
        opacity={0.16}
        size={820}
        style={{ zIndex: 0 }}
      />
      <RadialFan
        texture={theme.texture}
        origin="br"
        opacity={0.16}
        size={820}
        style={{ zIndex: 0 }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {(["audio", "video", "infographic", "slides"] as AssetType[]).map(
          (type, idx) => (
            <FormatTile
              key={type}
              type={type}
              asset={topic.assets[type]}
              accent={theme.accent}
              reverse={idx % 2 === 1}
            />
          )
        )}
      </div>
    </section>
  );
}

/* ─── Format tile (one per format, plain white card) ──────────────────────
   No background, no vectors of its own - those live on FormatBand.
   Each tile is just the white card with text on one side, media on
   the other. The text column alternates sides so the rhythm reads. */
function FormatTile({
  type,
  asset,
  accent,
  reverse,
}: {
  type: AssetType;
  asset: TreatmentTopicAsset | undefined;
  accent: string;
  reverse: boolean;
}) {
  const meta = FORMAT_META[type];
  const { Icon } = meta;

  // Slide decks render in a wide stacked layout: header band on top
  // (icon + eyebrow + title + blurb) and the carousel below at full
  // tile width. The other formats keep the asymmetric two-column.
  if (type === "slides") {
    return (
      <article
        id={type}
        style={{
          scrollMarginTop: 80,
          background: CREAM,
          border: `1px solid ${HAIRLINE}`,
          borderRadius: 18,
          padding: "40px 44px",
          boxShadow:
            "0 1px 2px rgba(26,32,96,0.04), 0 24px 60px -28px rgba(26,32,96,0.18)",
        }}
      >
        {/* Header band */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
            gap: 32,
            alignItems: "end",
            marginBottom: 28,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: asset ? accent : "rgba(45,42,36,0.10)",
                  color: asset ? CREAM : INK_MUTED,
                  boxShadow: asset ? `0 6px 16px ${accent}33` : "none",
                }}
              >
                <Icon size={16} />
              </span>
              <Eyebrow style={{ color: asset ? accent : INK_MUTED, margin: 0 }}>
                {meta.eyebrow}
              </Eyebrow>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(28px, 3vw, 40px)",
                lineHeight: 1.08,
                letterSpacing: "-0.018em",
                color: NAVY,
                margin: 0,
                maxWidth: "18ch",
              }}
            >
              {meta.label}
              <Em style={{ color: accent }}>.</Em>
            </h2>
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
              fontSize: 15,
              lineHeight: 1.6,
              color: INK_MUTED,
              maxWidth: "60ch",
            }}
          >
            {asset
              ? meta.blurb
              : `This format is on the production list. The slide deck will live here as soon as it ships.`}
          </p>
        </div>

        {/* Full-width carousel - tall enough to actually read */}
        {asset ? (
          <MediaRender type="slides" asset={asset} accent={accent} />
        ) : (
          <PlaceholderMedia
            accent={accent}
            soft="rgba(45,42,36,0.04)"
            Icon={Icon}
          />
        )}
      </article>
    );
  }

  return (
    <article
      id={type}
      style={{
        scrollMarginTop: 80,
        background: CREAM,
        border: `1px solid ${HAIRLINE}`,
        borderRadius: 18,
        padding: "40px 44px",
        boxShadow:
          "0 1px 2px rgba(26,32,96,0.04), 0 24px 60px -28px rgba(26,32,96,0.18)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.6fr)",
          gap: 44,
          alignItems: "center",
        }}
      >
        {/* Text column */}
        <div
          style={{
            gridColumn: reverse ? 2 : 1,
            gridRow: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: 9,
                background: asset ? accent : "rgba(45,42,36,0.10)",
                color: asset ? CREAM : INK_MUTED,
                boxShadow: asset ? `0 6px 16px ${accent}33` : "none",
              }}
            >
              <Icon size={16} />
            </span>
            <Eyebrow style={{ color: asset ? accent : INK_MUTED, margin: 0 }}>
              {meta.eyebrow}
            </Eyebrow>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(28px, 3vw, 40px)",
              lineHeight: 1.08,
              letterSpacing: "-0.018em",
              color: NAVY,
              margin: 0,
              maxWidth: "18ch",
            }}
          >
            {meta.label}
            <Em style={{ color: accent }}>.</Em>
          </h2>
          <p
            style={{
              marginTop: 14,
              marginBottom: 0,
              fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
              fontSize: 15,
              lineHeight: 1.6,
              color: INK_MUTED,
              maxWidth: "44ch",
            }}
          >
            {asset
              ? meta.blurb
              : `This format is on the production list. The ${type} variation will live here as soon as it ships.`}
          </p>
          {!asset && (
            <div style={{ marginTop: 12 }}>
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-mono, ui-monospace, monospace)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: INK_MUTED,
                  padding: "4px 10px",
                  background: "rgba(45,42,36,0.06)",
                  borderRadius: 4,
                }}
              >
                Coming soon
              </span>
            </div>
          )}
        </div>

        {/* Media column */}
        <div
          style={{
            gridColumn: reverse ? 1 : 2,
            gridRow: 1,
            minWidth: 0,
          }}
        >
          {asset ? (
            <MediaRender type={type} asset={asset} accent={accent} />
          ) : (
            <PlaceholderMedia
              accent={accent}
              soft="rgba(45,42,36,0.04)"
              Icon={Icon}
            />
          )}
        </div>
      </div>
    </article>
  );
}

function PlaceholderMedia({
  accent,
  soft,
  Icon,
}: {
  accent: string;
  soft: string;
  Icon: typeof Headphones;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 10",
        background: soft,
        borderRadius: 14,
        border: `1px dashed ${HAIRLINE}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: accent,
      }}
    >
      <Icon size={36} strokeWidth={1.4} style={{ opacity: 0.6 }} />
    </div>
  );
}

/* ─── Media render switcher ──────────────────────────────────────────────── */
function MediaRender({
  type,
  asset,
  accent,
}: {
  type: AssetType;
  asset: TreatmentTopicAsset;
  accent: string;
}) {
  if (type === "audio") return <AudioBlock asset={asset} accent={accent} />;
  if (type === "video") return <VideoBlock asset={asset} />;
  if (type === "infographic")
    return <InfographicBlock asset={asset} accent={accent} />;
  return <SlidesBlock asset={asset} accent={accent} />;
}

/* ─── Audio ──────────────────────────────────────────────────────────────── */
function AudioBlock({
  asset,
  accent,
}: {
  asset: TreatmentTopicAsset;
  accent: string;
}) {
  return (
    <div
      style={{
        background: CREAM,
        border: `1px solid ${HAIRLINE}`,
        borderRadius: 14,
        padding: "26px 26px 22px",
        boxShadow: "0 1px 2px rgba(26,32,96,0.04), 0 14px 36px rgba(26,32,96,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 18,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 14,
            background: accent,
            color: CREAM,
            boxShadow: `0 8px 20px ${accent}33`,
          }}
        >
          <Headphones size={24} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: accent,
            }}
          >
            Audio · Deep dive
          </div>
          <div
            style={{
              marginTop: 4,
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              fontFamily:
                "var(--font-mono, ui-monospace, monospace)",
              fontSize: 11,
              color: INK_MUTED,
              letterSpacing: "0.06em",
            }}
          >
            <span
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <Clock size={12} />
              <DurationBadge src={asset.src} type="audio" />
            </span>
          </div>
        </div>
      </div>
      <audio
        controls
        preload="metadata"
        src={asset.src}
        style={{ width: "100%" }}
      >
        Your browser does not support audio playback.
      </audio>
      <div style={{ marginTop: 14, textAlign: "right" }}>
        <a
          href={asset.downloadSrc || asset.src}
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono, ui-monospace, monospace)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: accent,
            textDecoration: "none",
          }}
        >
          <Download size={12} />
          Download
        </a>
      </div>
    </div>
  );
}

/* ─── Video ──────────────────────────────────────────────────────────────── */
function VideoBlock({ asset }: { asset: TreatmentTopicAsset }) {
  const src = asset.src;
  const isEmbed =
    /youtube\.com\/embed\//.test(src) ||
    /player\.vimeo\.com\/video\//.test(src);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        background: "#000",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow:
          "0 1px 2px rgba(26,32,96,0.04), 0 18px 40px rgba(26,32,96,0.10)",
      }}
    >
      {isEmbed ? (
        <iframe
          src={src}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video"
        />
      ) : (
        <video
          controls
          preload="metadata"
          poster={asset.poster}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background: "#000",
          }}
        >
          <source src={src} />
          Your browser does not support video playback.
        </video>
      )}
    </div>
  );
}

/* ─── Infographic ────────────────────────────────────────────────────────── */
function InfographicBlock({
  asset,
  accent,
}: {
  asset: TreatmentTopicAsset;
  accent: string;
}) {
  return (
    <div
      style={{
        background: CREAM,
        border: `1px solid ${HAIRLINE}`,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow:
          "0 1px 2px rgba(26,32,96,0.04), 0 18px 40px rgba(26,32,96,0.08)",
      }}
    >
      <img
        src={asset.src}
        alt={asset.alt ?? "Treatment infographic"}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
      <div
        style={{
          padding: "14px 18px",
          borderTop: `1px solid ${HAIRLINE}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono, ui-monospace, monospace)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: INK_MUTED,
          }}
        >
          One-page visual map
        </span>
        <a
          href={asset.downloadSrc || asset.src}
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono, ui-monospace, monospace)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: accent,
            textDecoration: "none",
          }}
        >
          <Download size={12} />
          Download full-res
        </a>
      </div>
    </div>
  );
}

/* ─── Slides ─────────────────────────────────────────────────────────────── */
function SlidesBlock({
  asset,
  accent,
}: {
  asset: TreatmentTopicAsset;
  accent: string;
}) {
  // If `pages` array is provided, render an image carousel.
  // Otherwise fall back to iframe embed (PDF / Google Slides).
  const pages = asset.pages;
  if (pages && pages.length > 0) {
    return <SlideCarousel pages={pages} accent={accent} />;
  }
  return <SlideIframe asset={asset} accent={accent} />;
}

function SlideCarousel({
  pages,
  accent,
}: {
  pages: string[];
  accent: string;
}) {
  const [idx, setIdx] = useState(0);
  const total = pages.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  // Keyboard navigation when carousel container is focused.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  return (
    <div>
      {/* Frame - tall enough that text on each slide stays readable.
          16:9 fills the full tile width, and the minHeight floor keeps
          the frame readable even on narrow viewports. */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          minHeight: 460,
          background: NAVY_DEEP,
          borderRadius: 14,
          overflow: "hidden",
          boxShadow:
            "0 1px 2px rgba(26,32,96,0.04), 0 18px 40px rgba(26,32,96,0.10)",
        }}
      >
        <img
          src={pages[idx]}
          alt={`Slide ${idx + 1} of ${total}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            background: NAVY_DEEP,
          }}
        />

        {/* Prev / Next overlay buttons */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={prev}
          style={navButtonStyle("left", accent)}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={next}
          style={navButtonStyle("right", accent)}
        >
          <ChevronRight size={20} />
        </button>

        {/* Counter pill */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: 14,
            padding: "6px 12px",
            background: "rgba(20,24,73,0.7)",
            color: CREAM,
            borderRadius: 999,
            fontFamily: "var(--font-mono, ui-monospace, monospace)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>

      {/* Thumbnail rail */}
      <div
        style={{
          marginTop: 14,
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 6,
          scrollbarWidth: "thin",
        }}
      >
        {pages.map((p, i) => (
          <button
            key={p}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Jump to slide ${i + 1}`}
            style={{
              flexShrink: 0,
              width: 120,
              aspectRatio: "16 / 9",
              border:
                i === idx
                  ? `2px solid ${accent}`
                  : `1px solid ${HAIRLINE}`,
              borderRadius: 6,
              padding: 0,
              background: NAVY_DEEP,
              overflow: "hidden",
              cursor: "pointer",
              opacity: i === idx ? 1 : 0.72,
              transition: "opacity 120ms ease, border-color 120ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.opacity = i === idx ? "1" : "0.72")
            }
          >
            <img
              src={p}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Meta row */}
      <div
        style={{
          marginTop: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          fontFamily: "var(--font-mono, ui-monospace, monospace)",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: INK_MUTED }}>
          {total} slide{total === 1 ? "" : "s"} · use ← → to navigate
        </span>
        <a
          href={pages[idx]}
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: accent,
            textDecoration: "none",
          }}
        >
          <Download size={12} />
          Download slide {idx + 1}
        </a>
      </div>
    </div>
  );
}

function navButtonStyle(
  side: "left" | "right",
  accent: string
): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: 14,
    transform: "translateY(-50%)",
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "rgba(20,24,73,0.62)",
    color: CREAM,
    border: `1px solid rgba(255,251,240,0.18)`,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    transition: "background 120ms ease",
  } as React.CSSProperties;
}

function SlideIframe({
  asset,
  accent,
}: {
  asset: TreatmentTopicAsset;
  accent: string;
}) {
  const src = asset.src;
  const isPdf = src.toLowerCase().endsWith(".pdf");
  const embedSrc = isPdf
    ? `${src}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`
    : src;

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          minHeight: 460,
          background: PALE,
          borderRadius: 14,
          overflow: "hidden",
          border: `1px solid ${HAIRLINE}`,
        }}
      >
        <iframe
          src={embedSrc}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
          allow="autoplay; fullscreen"
          allowFullScreen
          title="Slide deck"
        />
      </div>
      <div
        style={{
          marginTop: 12,
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
          fontFamily: "var(--font-mono, ui-monospace, monospace)",
          fontSize: 11,
          color: INK_MUTED,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {asset.pageCount && (
          <span>
            {asset.pageCount} slide{asset.pageCount === 1 ? "" : "s"}
          </span>
        )}
        <a
          href={asset.downloadSrc || asset.src}
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: accent,
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          <Download size={12} />
          Download deck
        </a>
      </div>
    </div>
  );
}

/* ─── Continue learning strip (shifting kingdom gradient) ─────────────────
   Mirrors the ShiftingBand footer pattern - the red → blue → orange →
   green gradient drifts continuously underneath glassy uniform tiles.
   Each tile is exactly the same size (grid-auto-rows: 1fr) so the row
   reads as one motion rather than four shapes. */
function ContinueLearning({ topics }: { topics: TopicType[] }) {
  return (
    <section
      style={{
        position: "relative",
        padding: "64px 32px 72px",
        marginTop: 0,
        background:
          "linear-gradient(115deg, #B23A3A 0%, #3B5BDB 33%, #D9622B 66%, #1F6B3F 100%)",
        backgroundSize: "260% 260%",
        animation: "kingdomShift 22s ease-in-out infinite",
        color: CREAM,
        overflow: "hidden",
      }}
    >
      <RadialFan
        texture="footer"
        origin="center"
        opacity={0.14}
        size={620}
        style={{ zIndex: 0 }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div>
            <Eyebrow style={{ color: "rgba(255,251,240,0.78)", marginBottom: 10 }}>
              <Sparkles size={11} style={{ marginRight: 6, verticalAlign: -1 }} />
              § CONTINUE LEARNING
            </Eyebrow>
            <h3
              style={{
                fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(28px, 3vw, 40px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: CREAM,
                margin: 0,
              }}
            >
              Other modules in the catalog<Em style={{ color: CREAM }}>.</Em>
            </h3>
          </div>
          <Link href="/library#treatment">
            <a
              style={{
                fontFamily: "var(--font-mono, ui-monospace, monospace)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: CREAM,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                background: "rgba(255,251,240,0.10)",
                border: "1px solid rgba(255,251,240,0.24)",
                borderRadius: 999,
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              All modules
              <ArrowRight size={12} />
            </a>
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gridAutoRows: "1fr",
            gap: 14,
            alignItems: "stretch",
          }}
        >
          {topics.map((t) => {
            const theme = TOPIC_THEME[t.slug] ?? DEFAULT_THEME;
            return (
              <Link key={t.slug} href={`/library/treatment/${t.slug}`}>
                <a
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    minHeight: 180,
                    padding: "20px 20px 18px",
                    background: "rgba(255,251,240,0.10)",
                    border: "1px solid rgba(255,251,240,0.22)",
                    borderRadius: 14,
                    textDecoration: "none",
                    color: "inherit",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    transition: "transform 180ms ease, background 180ms ease, border-color 180ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.background =
                      "rgba(255,251,240,0.18)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,251,240,0.40)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.background =
                      "rgba(255,251,240,0.10)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,251,240,0.22)";
                  }}
                >
                  {/* Topic dot + module label */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 12,
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: theme.accent,
                        boxShadow: `0 0 0 3px rgba(255,251,240,0.18)`,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily:
                          "var(--font-mono, ui-monospace, monospace)",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "rgba(255,251,240,0.78)",
                      }}
                    >
                      Module {t.moduleNumber}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-display, Fraunces), Georgia, serif",
                      fontWeight: 500,
                      fontSize: 22,
                      lineHeight: 1.15,
                      letterSpacing: "-0.015em",
                      color: CREAM,
                      marginBottom: 6,
                    }}
                  >
                    {t.shortLabel}
                  </div>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-body, Inter), system-ui, sans-serif",
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "rgba(255,251,240,0.78)",
                      flex: 1,
                    }}
                  >
                    {t.tagline}
                  </div>
                  <div
                    style={{
                      marginTop: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      color: CREAM,
                    }}
                  >
                    <ArrowRight size={14} />
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
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

/* ─── 404 fallback ───────────────────────────────────────────────────────── */
function NotFoundView({ slug }: { slug: string }) {
  return (
    <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
      <TopNav />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "96px 32px" }}>
        <Eyebrow style={{ color: GREEN }}>· TOPIC NOT FOUND ·</Eyebrow>
        <h1
          style={{
            fontFamily: "var(--font-display, Fraunces), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(36px, 4vw, 56px)",
            color: NAVY,
            marginTop: 14,
          }}
        >
          We could not find that topic.
        </h1>
        <p style={{ marginTop: 16, color: INK_MUTED }}>
          The Treatment Catalog topic <code>{slug}</code> is not in the
          library. It may have been renamed or removed.
        </p>
        <div style={{ marginTop: 28 }}>
          <Link href="/library">
            <a
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 18px",
                background: GREEN,
                color: CREAM,
                textDecoration: "none",
                borderRadius: 8,
                fontFamily:
                  "var(--font-body, Inter), system-ui, sans-serif",
                fontWeight: 600,
              }}
            >
              <ArrowLeft size={16} />
              Back to Library
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
