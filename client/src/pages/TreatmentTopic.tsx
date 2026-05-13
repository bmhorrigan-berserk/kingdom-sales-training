/**
 * TreatmentTopic - detail page for one Treatment Catalog topic.
 *
 * Renders every available format variation (audio, video,
 * infographic, slide deck) for a single topic, stacked vertically.
 * Reached via /library/treatment/<slug>.
 *
 * Each format section is rendered if and only if the topic's
 * `assets.<format>` is set in mediaData.ts. Missing formats show a
 * compact placeholder so the rep knows it's intentional and coming,
 * not a broken link.
 */
import { Link, useRoute } from "wouter";
import {
  Headphones,
  Video as VideoIcon,
  Image as ImageIcon,
  Layers,
  Download,
  ArrowLeft,
  Clock,
} from "lucide-react";
import TopNav from "@/components/TopNav";
import { Eyebrow, Em } from "@/components/Furniture";
import { DurationBadge } from "@/components/DurationBadge";
import {
  getTreatmentTopic,
  topicAvailableFormats,
  type TreatmentTopic as TopicType,
  type TreatmentTopicAsset,
} from "@/lib/mediaData";

const NAVY = "#1A2060";
const NAVY_DEEP = "#141849";
const GREEN = "#1F6B3F";
const ORANGE = "#D9622B";
const CREAM = "#FFFBF0";
const PALE = "#EAF4EC";
const HAIRLINE = "#E8DEC6";
const INK = "#2D2A24";
const INK_MUTED = "#6B6357";
const ACCENT = GREEN;

export default function TreatmentTopic() {
  const [, params] = useRoute<{ slug: string }>("/library/treatment/:slug");
  const slug = params?.slug ?? "";
  const topic = getTreatmentTopic(slug);

  if (!topic) {
    return (
      <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
        <TopNav />
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "96px 32px" }}>
          <Eyebrow style={{ color: ACCENT }}>· TOPIC NOT FOUND ·</Eyebrow>
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
                  background: ACCENT,
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

  const available = topicAvailableFormats(topic);

  return (
    <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
      <TopNav />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
          color: CREAM,
          padding: "56px 32px 64px",
        }}
      >
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <Link href="/library">
            <a
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono, ui-monospace, monospace)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,251,240,0.7)",
                textDecoration: "none",
                marginBottom: 18,
              }}
            >
              <ArrowLeft size={14} />
              Library / Treatment Catalog
            </a>
          </Link>
          <Eyebrow
            style={{ color: "#5FB286", marginBottom: 14 }}
          >
            § TREATMENT CATALOG · {topic.title.toUpperCase()}
          </Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(40px, 5vw, 68px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: CREAM,
              margin: 0,
              maxWidth: "20ch",
            }}
          >
            {topic.title}
            <Em style={{ color: ORANGE }}>.</Em>
          </h1>
          <p
            style={{
              marginTop: 18,
              fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
              fontSize: 17,
              lineHeight: 1.55,
              color: "rgba(255,251,240,0.84)",
              maxWidth: "70ch",
            }}
          >
            {topic.summary}
          </p>

          {/* Jump nav */}
          {available.length > 1 && (
            <nav
              style={{
                marginTop: 28,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                paddingTop: 18,
                borderTop: "1px solid rgba(255,251,240,0.16)",
              }}
            >
              {available.map((f) => {
                const label =
                  f === "audio" ? "Audio" :
                  f === "video" ? "Video" :
                  f === "infographic" ? "Infographic" :
                  "Slide Deck";
                const Icon =
                  f === "audio" ? Headphones :
                  f === "video" ? VideoIcon :
                  f === "infographic" ? ImageIcon :
                  Layers;
                return (
                  <a
                    key={f}
                    href={`#${f}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      padding: "7px 14px",
                      background: "rgba(255,251,240,0.10)",
                      border: "1px solid rgba(255,251,240,0.20)",
                      borderRadius: 999,
                      fontFamily:
                        "var(--font-mono, ui-monospace, monospace)",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.10em",
                      textTransform: "uppercase",
                      color: CREAM,
                      textDecoration: "none",
                    }}
                  >
                    <Icon size={12} />
                    {label}
                  </a>
                );
              })}
            </nav>
          )}
        </div>
      </section>

      {/* ASSET SECTIONS */}
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "48px 32px 96px" }}>
        <AssetSection
          id="audio"
          eyebrow="§ A · AUDIO"
          title="Audio deep dive"
          asset={topic.assets.audio}
          type="audio"
          accent={ACCENT}
        />
        <AssetSection
          id="video"
          eyebrow="§ B · VIDEO"
          title="Video overview"
          asset={topic.assets.video}
          type="video"
          accent={ACCENT}
        />
        <AssetSection
          id="infographic"
          eyebrow="§ C · INFOGRAPHIC"
          title="Visual summary"
          asset={topic.assets.infographic}
          type="infographic"
          accent={ACCENT}
        />
        <AssetSection
          id="slides"
          eyebrow="§ D · SLIDE DECK"
          title="Patient-facing slide deck"
          asset={topic.assets.slides}
          type="slides"
          accent={ACCENT}
        />
      </div>

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
              color: ACCENT,
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

/* ─── Asset section ──────────────────────────────────────────────────────── */
type AssetType = "audio" | "video" | "infographic" | "slides";

function AssetSection({
  id,
  eyebrow,
  title,
  asset,
  type,
  accent,
}: {
  id: string;
  eyebrow: string;
  title: string;
  asset: TreatmentTopicAsset | undefined;
  type: AssetType;
  accent: string;
}) {
  return (
    <section
      id={id}
      style={{
        marginBottom: 48,
        scrollMarginTop: 80,
        padding: "28px 28px 26px",
        background: CREAM,
        border: `1px solid ${HAIRLINE}`,
        borderLeft: `4px solid ${asset ? accent : HAIRLINE}`,
        borderRadius: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 6,
        }}
      >
        <Eyebrow style={{ color: asset ? accent : INK_MUTED }}>
          {eyebrow}
        </Eyebrow>
        {!asset && (
          <span
            style={{
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: INK_MUTED,
              padding: "2px 8px",
              background: "rgba(45, 42, 36, 0.06)",
              borderRadius: 4,
            }}
          >
            Coming soon
          </span>
        )}
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display, Fraunces), Georgia, serif",
          fontWeight: 500,
          fontSize: 26,
          lineHeight: 1.2,
          color: NAVY,
          margin: 0,
          letterSpacing: "-0.015em",
        }}
      >
        {title}
      </h2>

      {asset ? (
        <div style={{ marginTop: 18 }}>
          {type === "audio" && <AudioPlayer asset={asset} accent={accent} />}
          {type === "video" && <VideoPlayer asset={asset} accent={accent} />}
          {type === "infographic" && <InfographicView asset={asset} accent={accent} />}
          {type === "slides" && <SlideEmbed asset={asset} accent={accent} />}
        </div>
      ) : (
        <p
          style={{
            marginTop: 14,
            marginBottom: 0,
            fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
            fontSize: 14,
            lineHeight: 1.55,
            color: INK_MUTED,
            maxWidth: "60ch",
          }}
        >
          This format is on the production list. The audio is the
          source-of-truth recording; the {type} will be linked here as
          soon as it ships.
        </p>
      )}
    </section>
  );
}

/* ─── Format renderers ───────────────────────────────────────────────────── */

function AudioPlayer({
  asset,
  accent,
}: {
  asset: TreatmentTopicAsset;
  accent: string;
}) {
  return (
    <div>
      <audio
        controls
        preload="metadata"
        src={asset.src}
        style={{ width: "100%" }}
      >
        Your browser does not support audio playback.
      </audio>
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
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Clock size={12} />
          <DurationBadge src={asset.src} type="audio" />
        </span>
        <a
          href={asset.downloadSrc || asset.src}
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: accent,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          <Download size={12} />
          Download
        </a>
      </div>
    </div>
  );
}

function VideoPlayer({
  asset,
}: {
  asset: TreatmentTopicAsset;
  accent: string;
}) {
  // If the src looks like a YouTube/Vimeo embed URL, render an iframe.
  // Otherwise render a native <video> element.
  const src = asset.src;
  const isEmbed =
    /youtube\.com\/embed\//.test(src) ||
    /player\.vimeo\.com\/video\//.test(src);

  if (isEmbed) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          background: "#000",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
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
      </div>
    );
  }

  return (
    <video
      controls
      preload="metadata"
      poster={asset.poster}
      style={{ width: "100%", borderRadius: 8, background: "#000" }}
    >
      <source src={src} />
      Your browser does not support video playback.
    </video>
  );
}

function InfographicView({
  asset,
  accent,
}: {
  asset: TreatmentTopicAsset;
  accent: string;
}) {
  return (
    <div>
      <img
        src={asset.src}
        alt={asset.alt ?? "Treatment infographic"}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: 8,
          border: `1px solid ${HAIRLINE}`,
        }}
      />
      <div style={{ marginTop: 12 }}>
        <a
          href={asset.downloadSrc || asset.src}
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono, ui-monospace, monospace)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: accent,
            textDecoration: "none",
          }}
        >
          <Download size={12} />
          Download full-resolution image
        </a>
      </div>
    </div>
  );
}

function SlideEmbed({
  asset,
  accent,
}: {
  asset: TreatmentTopicAsset;
  accent: string;
}) {
  const src = asset.src;
  // Decide rendering by URL shape. PDF -> embed in iframe. Google Slides
  // / SlideShare / generic embed URL -> iframe directly.
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
          aspectRatio: "4 / 3",
          background: PALE,
          borderRadius: 8,
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
            fontWeight: 600,
          }}
        >
          <Download size={12} />
          Download deck
        </a>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: INK_MUTED,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Open in new tab →
        </a>
      </div>
    </div>
  );
}
