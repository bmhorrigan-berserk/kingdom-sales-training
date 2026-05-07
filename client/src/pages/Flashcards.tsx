/**
 * Flashcards - drill page with editorial cream + Mid Blue accent.
 * Keeps the click-to-flip mechanic. Replaces the old gold/navy tile with
 * a magazine-style large card on cream, hairline border, Mid Blue category
 * pill, Fraunces front prompt, Inter back answer.
 *
 * Data: expects window.__KINGDOM_FLASHCARDS__ (pre-existing) OR the existing
 * client/src/lib/flashcardData module. Adapter at top of file picks whichever
 * exists.
 */
import { useEffect, useMemo, useState } from "react";
import TopNav from "@/components/TopNav";
import { Eyebrow, PageNumber, Em } from "@/components/Furniture";
import { RadialFan } from "@/components/RadialFan";
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle } from "lucide-react";

// ---------- adapter: existing trainingData.ts ----------
import { FLASHCARDS as RAW_FLASHCARDS, type Flashcard } from "@/lib/trainingData";

const NAVY = "#1A2060";
const BLUE = "#3B5BDB";
const CREAM = "#FFFBF0";
const PALE = "#F0F7FE";
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

  // Filter by category
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
  }, [filtered]);

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
  };

  return (
    <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
      <TopNav />

      {/* HERO STRIP */}
      <section
        style={{
          position: "relative",
          padding: "56px 32px 24px",
          maxWidth: 1280,
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        <RadialFan
          origin="tr"
          color={BLUE}
          opacity={0.06}
          size={780}
          rays={40}
          arcs={4}
          style={{
            position: "absolute",
            top: -180,
            right: -200,
            width: 780,
            height: 780,
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Eyebrow style={{ marginBottom: 16 }}>
            § 03 · DRILL · {all.length} CARDS · {categories.length - 1}{" "}
            CATEGORIES
          </Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: NAVY,
              margin: 0,
              maxWidth: "16ch",
            }}
          >
            Drill until it is <Em>instinct.</Em>
          </h1>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "16px 32px 0",
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
              style={{
                padding: "8px 14px",
                border: `1px solid ${active ? NAVY : HAIRLINE}`,
                background: active ? NAVY : "transparent",
                color: active ? CREAM : INK,
                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderRadius: 4,
                cursor: "pointer",
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
          maxWidth: 960,
          margin: "0 auto",
          padding: "32px 32px 24px",
        }}
      >
        {!card ? (
          <p style={{ color: INK_MUTED }}>No cards in this category.</p>
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
              perspective: 1400,
              outline: "none",
              cursor: "pointer",
              minHeight: 420,
            }}
          >
            <div
              style={{
                position: "relative",
                transformStyle: "preserve-3d",
                transition: "transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
                minHeight: 420,
              }}
            >
              {/* FRONT */}
              <CardFace side="front" category={card.category} text={card.front} />
              {/* BACK */}
              <CardFace side="back" category={card.category} text={card.back} />
            </div>
          </div>
        )}

        {/* Counter + flip hint */}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: INK_MUTED,
            fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <span>
            {order.length === 0
              ? "0 / 0"
              : `${String(idx + 1).padStart(2, "0")} / ${String(order.length).padStart(2, "0")}`}
          </span>
          <span>
            Click card to flip · Arrow keys to navigate
          </span>
        </div>
      </section>

      {/* CONTROLS */}
      <section
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 32px 96px",
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <ControlButton onClick={prev} disabled={!card} icon={<ChevronLeft size={14} />} label="Previous" />
        <ControlButton
          onClick={() => setFlipped((f) => !f)}
          disabled={!card}
          icon={<RotateCcw size={14} />}
          label="Flip"
          primary
        />
        <ControlButton onClick={next} disabled={!card} icon={<ChevronRight size={14} />} label="Next" />
        <span style={{ flex: 1 }} />
        <ControlButton onClick={shuffle} disabled={!card} icon={<Shuffle size={14} />} label="Shuffle" />
        <ControlButton onClick={reset} disabled={!card} icon={<RotateCcw size={14} />} label="Reset" />
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
        <Eyebrow>· FLASHCARD DRILL · KINGDOM CONFIDENTIAL ·</Eyebrow>
        <PageNumber current={3} total={4} />
      </footer>
    </div>
  );
}

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
        background: isBack ? NAVY : CREAM,
        color: isBack ? CREAM : INK,
        border: `1px solid ${isBack ? "rgba(255,251,240,0.18)" : HAIRLINE}`,
        borderRadius: 8,
        padding: "48px 56px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: isBack
          ? "0 1px 0 rgba(0,0,0,0.4)"
          : "0 1px 0 rgba(26,32,96,0.04)",
        minHeight: 420,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            display: "inline-block",
            padding: "6px 12px",
            background: isBack ? "rgba(255,251,240,0.1)" : PALE,
            color: isBack ? CREAM : NAVY,
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
        <Eyebrow style={{ color: isBack ? "rgba(255,251,240,0.55)" : BLUE }}>
          {isBack ? "§ ANSWER" : "§ PROMPT"}
        </Eyebrow>
      </div>

      <p
        style={{
          fontFamily: isBack
            ? "var(--font-body, Inter), system-ui, sans-serif"
            : "var(--font-display, Fraunces), Georgia, serif",
          fontWeight: isBack ? 400 : 400,
          fontSize: isBack ? "clamp(18px, 2vw, 22px)" : "clamp(24px, 3vw, 36px)",
          lineHeight: isBack ? 1.55 : 1.2,
          letterSpacing: isBack ? "0" : "-0.015em",
          color: isBack ? CREAM : NAVY,
          margin: "32px 0",
          maxWidth: "30ch",
        }}
      >
        {text}
      </p>

      <div
        style={{
          fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: isBack ? "rgba(255,251,240,0.55)" : INK_MUTED,
        }}
      >
        {isBack ? "Click to return to prompt" : "Click to reveal answer"}
      </div>
    </div>
  );
}

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
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 16px",
        background: primary ? NAVY : "transparent",
        color: primary ? CREAM : NAVY,
        border: `1px solid ${primary ? NAVY : HAIRLINE}`,
        fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        borderRadius: 4,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <span style={{ color: primary ? BLUE : BLUE, display: "inline-flex" }}>{icon}</span>
      {label}
    </button>
  );
}
