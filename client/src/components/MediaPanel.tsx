/**
 * MediaPanel - editorial media block for embedded video / audio players.
 *
 * Used inside CurriculumLesson above the lesson iframe. Each lesson with
 * companion media (per LESSON_MEDIA) renders this panel so trainees
 * watch / listen alongside the lesson body.
 *
 * Behavior:
 * - Video items render a native <video> with controls and a poster.
 * - Audio items render a native <audio> with controls.
 * - When the file at `src` is missing (file 404 OR the platform refuses
 *   to load), we surface an "Awaiting upload" empty state instead of a
 *   broken player. The kingdom palette is preserved.
 */
import { useState } from "react";
import { Eyebrow, Em } from "@/components/Furniture";
import type { MediaItem } from "@/lib/mediaData";
import { Play, Headphones, Video, AlertCircle } from "lucide-react";
import { DurationBadge } from "@/components/DurationBadge";

const NAVY = "#1A2060";
const GREEN = "#1F6B3F";
const ORANGE = "#D9622B";
const BLUE = "#3B5BDB";
const RED = "#B23A3A";
const CREAM = "#FFFBF0";
const PALE = "#EAF4EC";
const HAIRLINE = "#E8DEC6";
const INK = "#2D2A24";
const INK_MUTED = "#6B6357";

interface MediaPanelProps {
  items: MediaItem[];
}

export function MediaPanel({ items }: MediaPanelProps) {
  if (!items || items.length === 0) return null;

  const hasVideo = items.some((i) => i.type === "video");
  const hasAudio = items.some((i) => i.type === "audio");

  let header = "Watch and listen";
  let italic = "alongside";
  if (hasVideo && !hasAudio) {
    header = "Watch this";
    italic = "first";
  } else if (hasAudio && !hasVideo) {
    header = "Listen";
    italic = "alongside";
  }

  return (
    <section
      style={{
        marginBottom: 32,
        padding: "28px 28px 32px",
        background: PALE,
        border: `1px solid ${HAIRLINE}`,
        borderLeft: `4px solid ${GREEN}`,
        borderRadius: 8,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16, gap: 16, flexWrap: "wrap" }}>
        <div>
          <Eyebrow style={{ color: GREEN, marginBottom: 6 }}>
            § COMPANION MEDIA · {items.length} {items.length === 1 ? "ITEM" : "ITEMS"}
          </Eyebrow>
          <h3
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 400,
              fontSize: 28,
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              color: NAVY,
              margin: 0,
            }}
          >
            {header} <Em>{italic}.</Em>
          </h3>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {hasVideo && (
            <span style={pillStyle(BLUE)}>
              <Video size={11} /> VIDEO
            </span>
          )}
          {hasAudio && (
            <span style={pillStyle(ORANGE)}>
              <Headphones size={11} /> AUDIO
            </span>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gap: 20 }}>
        {items.map((item) => (
          <MediaCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}

function MediaCard({ item }: { item: MediaItem }) {
  const [missing, setMissing] = useState(false);

  const isVideo = item.type === "video";
  const accent = isVideo ? BLUE : ORANGE;

  return (
    <article
      style={{
        background: CREAM,
        border: `1px solid ${HAIRLINE}`,
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: 16,
          padding: "14px 18px",
          borderBottom: `1px solid ${HAIRLINE}`,
          alignItems: "center",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: 4,
            background: accent,
            color: CREAM,
          }}
        >
          {isVideo ? <Play size={16} /> : <Headphones size={16} />}
        </span>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 500,
              fontSize: 18,
              lineHeight: 1.2,
              color: NAVY,
              letterSpacing: "-0.01em",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.title}
          </div>
          <div style={{ marginTop: 4, display: "flex", gap: 12, color: INK_MUTED, fontFamily: "var(--font-body, Inter), system-ui, sans-serif", fontSize: 12 }}>
            <span style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, color: accent }}>
              {item.type}
            </span>
            <span>
              <DurationBadge src={item.src} type={item.type} fallbackMin={item.durationMin} />
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: 18 }}>
        {missing ? (
          <MissingState item={item} />
        ) : isVideo ? (
          <video
            controls
            preload="metadata"
            poster={item.poster}
            onError={() => setMissing(true)}
            style={{
              width: "100%",
              maxHeight: 480,
              borderRadius: 4,
              background: "#000",
              display: "block",
            }}
          >
            <source src={item.src} />
            Your browser does not support video playback.
          </video>
        ) : (
          <audio
            controls
            preload="metadata"
            onError={() => setMissing(true)}
            style={{ width: "100%" }}
          >
            <source src={item.src} />
            Your browser does not support audio playback.
          </audio>
        )}

        {item.description && (
          <p
            style={{
              marginTop: 14,
              fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
              fontSize: 14,
              lineHeight: 1.55,
              color: INK,
            }}
          >
            {item.description}
          </p>
        )}
      </div>
    </article>
  );
}

function MissingState({ item }: { item: MediaItem }) {
  return (
    <div
      style={{
        padding: "20px 20px",
        background: PALE,
        border: `1px dashed ${HAIRLINE}`,
        borderRadius: 4,
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
      }}
    >
      <AlertCircle size={18} style={{ color: RED, flexShrink: 0, marginTop: 2 }} />
      <div>
        <div
          style={{
            fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 13,
            color: NAVY,
            letterSpacing: "0.02em",
          }}
        >
          Awaiting upload
        </div>
        <div
          style={{
            marginTop: 4,
            fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
            fontSize: 13,
            lineHeight: 1.55,
            color: INK_MUTED,
          }}
        >
          The file <code style={{ background: CREAM, padding: "2px 6px", borderRadius: 3, fontFamily: "var(--font-mono, monospace)", fontSize: 12 }}>{item.src}</code> is not yet hosted.
          Drop the {item.type} file at this path in <code style={{ background: CREAM, padding: "2px 6px", borderRadius: 3, fontFamily: "var(--font-mono, monospace)", fontSize: 12 }}>client/public{item.src}</code> and the player will appear automatically.
        </div>
      </div>
    </div>
  );
}

function pillStyle(color: string): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 10px",
    background: color,
    color: CREAM,
    fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.14em",
    borderRadius: 999,
  };
}
