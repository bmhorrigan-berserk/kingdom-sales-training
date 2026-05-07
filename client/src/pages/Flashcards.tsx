/**
 * Flashcards - drill page with the navy hero + glass tiles depth
 * pattern matching the Quiz redesign.
 *
 * Click the card to flip. Arrow keys to navigate. Glass-tile category
 * filter, glass-tile control bar at the bottom.
 */
import { useEffect, useMemo, useState } from "react";
import TopNav from "@/components/TopNav";
import { Eyebrow, PageNumber } from "@/components/Furniture";
import { RadialFan } from "@/components/RadialFan";
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle } from "lucide-react";

import { FLASHCARDS as RAW_FLASHCARDS, type Flashcard } from "@/lib/trainingData";

const NAVY = "#1A2060";
const NAVY_DEEP = "#141849";
const GREEN = "#1F6B3F";
const ORANGE = "#D9622B";
const CREAM = "#FFFBF0";
const PALE = "#EAF4EC";
const HAIRLINE = "#E8DEC6";
const INK = "#2D2A24";
const INK_MUTED = "#6B6357";

export default function Flashcards() {
  const all: Flashcard[] = RAW_FLASHCARDS ?? [];
  const categories = useMemo(() => {
    const set = new Set<string>();
    all.forEach((c) => set.add(c.category));
    return ["All", ...Array.from(set)];
  }, [all]);

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [order, setOrder] = useState<number[]>(() => all.map((_, i) => i));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    if (activeCategory === "All") return all.map((_, i) => i);
    return all
      .map((c, i) => ({ c, i }))
      .filter(({ c }) => c.category === activeCategory)
      .map(({ i }) => i);
  }, [activeCategory, all]);

  useEffect(() => {
    setOrder(filtered);
    setIdx(0);
    setFlipped(false);
    setSeen(new Set());
  }, [filtered]);

  // Mark current card as seen when flipped
  useEffect(() => {
    if (flipped && order[idx] !== undefined) {
      setSeen((prev) => {
        const s = new Set(prev);
        s.add(order[idx]);
        return s;
      });
    }
  }, [flipped, idx, order]);

  const card: Flashcard | undefined = all[order[idx]];

  const next = () => {
    setFlipped(false);
    setIdx((i) => (i + 1) % order.length);
  };
  const prev = () => {
    setFlipped(false);
    setIdx((i) => (i - 1 + order.length) % order.length);
  };
  const shuffle = () => {
    const s = [...order].sort(() => Math.random() - 0.5);
    setOrder(s);
    setIdx(0);
    setFlipped(false);
  };
  const reset = () => {
    setOrder(filtered);
    setIdx(0);
    setFlipped(false);
    setSeen(new Set());
  };

  const total = order.length;
  const progressPct = total === 0 ? 0 : ((idx + 1) / total) * 100;
  const seenCount = seen.size;

  return (
    <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
      <TopNav />

      {/* NAVY HERO STRIP - full width, mirrors Quiz hero */}
      <section
        style={{
          position: "relative",
          background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
          color: CREAM,
          overflow: "hidden",
        }}
      >
        <RadialFan texture="wellness"
          origin="tr"
          palette={["#5FB286", "#9CB3FF", "#F2A06E", "#E08585"]}
          opacity={0.14}
          size={680}
          rays={48}
          arcs={5}
          style={{ zIndex: 0 }}
        />
        <div
          style={{
            maxWidth: 1920,
            margin: "0 auto",
            padding: "56px 32px 40px",
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
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
              § 03 · DRILL · {all.length} CARDS · {categories.length - 1}{" "}
              CATEGORIES
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(36px, 4.4vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: CREAM,
                margin: 0,
                maxWidth: "20ch",
              }}
            >
              Drill until it is{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: ORANGE,
                  fontWeight: "inherit",
                }}
              >
                instinct.
              </em>
            </h1>
          </div>

          {/* Progress block */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 12,
                fontFamily: "var(--font-mono, ui-monospace, monospace)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,251,240,0.7)",
              }}
            >
              <span>
                Card{" "}
                <span style={{ color: CREAM, fontSize: 14 }}>
                  {String(idx + 1).padStart(2, "0")}
                </span>{" "}
                /{" "}
                <span style={{ color: "rgba(255,251,240,0.6)" }}>
                  {String(total).padStart(2, "0")}
                </span>
              </span>
              <span style={{ color: "#5FB286" }}>{seenCount} seen</span>
            </div>
            <div
              style={{
                height: 6,
                background: "rgba(255,251,240,0.12)",
                borderRadius: 999,
                overflow: "hidden",
                border: "1px solid rgba(255,251,240,0.10)",
              }}
            >
              <div
                style={{
                  width: `${progressPct}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, #5FB286, ${ORANGE})`,
                  transition: "width 350ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                  boxShadow: "0 0 12px rgba(95, 178, 134, 0.5)",
                }}
              />
            </div>

            {/* Category quick stats */}
            <div
              style={{
                marginTop: 14,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <span style={heroPill("#5FB286")}>
                {String(seenCount).padStart(2, "0")} REVIEWED
              </span>
              <span style={heroPill("rgba(255,251,240,0.18)")}>
                {String(total - seenCount).padStart(2, "0")} REMAINING
              </span>
              <span style={heroPill("rgba(255,251,240,0.18)")}>
                {activeCategory === "All" ? "ALL TOPICS" : activeCategory.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER (glass pills) */}
      <section
        style={{
          maxWidth: 1920,
          margin: "0 auto",
          padding: "32px 32px 0",
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {categories.map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="kingdom-cat-pill"
              data-active={active ? "1" : "0"}
              style={{
                padding: "8px 14px",
                border: `1px solid ${active ? NAVY : HAIRLINE}`,
                background: active ? NAVY : "rgba(255, 255, 255, 0.55)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                color: active ? CREAM : INK,
                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderRadius: 999,
                cursor: "pointer",
                transition: "all 150ms ease",
                boxShadow: active
                  ? "0 1px 2px rgba(26,32,96,0.16), 0 4px 14px rgba(26,32,96,0.12)"
                  : "0 1px 2px rgba(26,32,96,0.04)",
              }}
            >
              {cat}
            </button>
          );
        })}
      </section>

      {/* CARD STAGE */}
      <section
        style={{
          position: "relative",
          maxWidth: 1920,
          margin: "0 auto",
          padding: "32px 32px 16px",
          overflow: "hidden",
        }}
      >
        <RadialFan
          texture="wellness"
          origin="left"
          opacity={0.09}
          size={680}
          style={{ zIndex: 0 }}
        />
        <RadialFan
          texture="peptides"
          origin="right"
          opacity={0.09}
          size={680}
          style={{ zIndex: 0 }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 980, margin: "0 auto" }}>
          {!card ? (
            <p style={{ color: INK_MUTED, textAlign: "center", padding: 48 }}>
              No cards in this category.
            </p>
          ) : (
            <div
              onClick={() => setFlipped((f) => !f)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  setFlipped((f) => !f);
                }
                if (e.key === "ArrowRight") next();
                if (e.key === "ArrowLeft") prev();
              }}
              style={{
                perspective: 1600,
                outline: "none",
                cursor: "pointer",
                minHeight: 460,
              }}
            >
              <div
                style={{
                  position: "relative",
                  transformStyle: "preserve-3d",
                  transition: "transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                  transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
                  minHeight: 460,
                }}
              >
                <CardFace side="front" category={card.category} text={card.front} />
                <CardFace side="back" category={card.category} text={card.back} />
              </div>
            </div>
          )}

          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: INK_MUTED,
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <span>
              {total === 0
                ? "0 / 0"
                : `${String(idx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
            </span>
            <span>Click card to flip · Arrow keys to navigate</span>
          </div>
        </div>
      </section>

      {/* CONTROLS - glass bar */}
      <section
        style={{
          maxWidth: 1920,
          margin: "0 auto",
          padding: "0 32px 96px",
        }}
      >
        <div
          style={{
            maxWidth: 980,
            margin: "0 auto",
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <ControlButton
            onClick={prev}
            disabled={!card}
            icon={<ChevronLeft size={14} />}
            label="Previous"
          />
          <ControlButton
            onClick={() => setFlipped((f) => !f)}
            disabled={!card}
            icon={<RotateCcw size={14} />}
            label={flipped ? "Show prompt" : "Reveal answer"}
            primary
          />
          <ControlButton
            onClick={next}
            disabled={!card}
            icon={<ChevronRight size={14} />}
            label="Next"
          />
          <span style={{ flex: 1 }} />
          <ControlButton
            onClick={shuffle}
            disabled={!card}
            icon={<Shuffle size={14} />}
            label="Shuffle"
          />
          <ControlButton
            onClick={reset}
            disabled={!card}
            icon={<RotateCcw size={14} />}
            label="Reset"
          />
        </div>
      </section>

      <style>{`
        .kingdom-cat-pill[data-active="0"]:hover {
          background: rgba(234, 244, 236, 0.85) !important;
          border-color: ${GREEN} !important;
          color: ${GREEN} !important;
        }
      `}</style>

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
        <Eyebrow>· FLASHCARD DRILL · KINGDOM CONFIDENTIAL ·</Eyebrow>
        <PageNumber current={3} total={5} />
      </footer>
    </div>
  );
}

/* ─── Card face: liquid glass front, navy gradient back ──────────────────── */
function CardFace({
  side,
  category,
  text,
}: {
  side: "front" | "back";
  category: string;
  text: string;
}) {
  const isBack = side === "back";
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: isBack ? "rotateY(180deg)" : "rotateY(0)",
        background: isBack
          ? `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`
          : "rgba(255, 255, 255, 0.78)",
        backdropFilter: isBack ? undefined : "blur(20px)",
        WebkitBackdropFilter: isBack ? undefined : "blur(20px)",
        color: isBack ? CREAM : INK,
        border: isBack ? "none" : `1px solid ${HAIRLINE}`,
        borderTop: isBack ? `4px solid ${ORANGE}` : `4px solid ${GREEN}`,
        borderRadius: 14,
        padding: "44px 52px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: isBack
          ? "0 1px 2px rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.32)"
          : "0 1px 2px rgba(31,107,63,0.04), 0 12px 36px rgba(26,32,96,0.08), 0 4px 14px rgba(26,32,96,0.04)",
        minHeight: 460,
        overflow: "hidden",
      }}
    >
      {/* Decorative fan on the back face for visual interest */}
      {isBack && (
        <RadialFan texture="wellness"
          origin="bl"
          palette={["#5FB286", "#9CB3FF", "#F2A06E", "#E08585"]}
          opacity={0.10}
          size={680}
          rays={36}
          arcs={4}
          style={{ zIndex: 0 }}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "5px 12px",
            background: isBack ? "rgba(255,251,240,0.12)" : PALE,
            color: isBack ? CREAM : GREEN,
            border: isBack
              ? "1px solid rgba(255,251,240,0.18)"
              : `1px solid rgba(31,107,63,0.25)`,
            fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            borderRadius: 999,
          }}
        >
          {category}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono, ui-monospace, monospace)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: isBack ? "rgba(255,251,240,0.55)" : GREEN,
            paddingBottom: 4,
            borderBottom: `1px solid ${
              isBack ? "rgba(255,251,240,0.18)" : HAIRLINE
            }`,
          }}
        >
          {isBack ? "§ ANSWER" : "§ PROMPT"}
        </span>
      </div>

      <p
        style={{
          fontFamily: isBack
            ? "var(--font-body, Inter), system-ui, sans-serif"
            : "var(--font-display, Fraunces), Georgia, serif",
          fontWeight: 400,
          fontSize: isBack
            ? "clamp(18px, 2vw, 22px)"
            : "clamp(26px, 3.2vw, 38px)",
          lineHeight: isBack ? 1.55 : 1.2,
          letterSpacing: isBack ? "0" : "-0.015em",
          color: isBack ? CREAM : NAVY,
          margin: "32px 0",
          maxWidth: "32ch",
          position: "relative",
          zIndex: 1,
        }}
      >
        {text}
      </p>

      <div
        style={{
          fontFamily: "var(--font-mono, ui-monospace, monospace)",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: isBack ? "rgba(255,251,240,0.55)" : INK_MUTED,
          position: "relative",
          zIndex: 1,
        }}
      >
        {isBack ? "Click to return to prompt" : "Click to reveal answer"}
      </div>
    </div>
  );
}

/* ─── Glass control button (ghost or primary) ────────────────────────────── */
function ControlButton({
  onClick,
  disabled,
  icon,
  label,
  primary,
}: {
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
}) {
  const baseStyle: React.CSSProperties = primary
    ? {
        background: disabled
          ? "rgba(26,32,96,0.18)"
          : `linear-gradient(135deg, ${NAVY}, #2A2F7A)`,
        color: CREAM,
        border: "none",
        boxShadow: disabled
          ? "none"
          : "0 1px 2px rgba(26,32,96,0.18), 0 6px 16px rgba(26,32,96,0.16)",
      }
    : {
        background: "rgba(255, 255, 255, 0.55)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        color: NAVY,
        border: `1px solid ${HAIRLINE}`,
      };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 18px",
        fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        borderRadius: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "transform 150ms ease, box-shadow 150ms ease",
        ...baseStyle,
      }}
    >
      <span
        style={{
          color: primary ? ORANGE : GREEN,
          display: "inline-flex",
        }}
      >
        {icon}
      </span>
      {label}
    </button>
  );
}

function heroPill(bg: string): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "4px 10px",
    background: bg.startsWith("rgba") ? bg : `${bg}30`,
    color: CREAM,
    border: `1px solid ${bg.startsWith("rgba") ? bg : `${bg}55`}`,
    fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: "0.14em",
    borderRadius: 999,
  };
}
