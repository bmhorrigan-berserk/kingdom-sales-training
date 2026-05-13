/**
 * Furniture - editorial page-numbering, day badges, and phase steppers.
 * Three small reusable pieces that carry the magazine-grade visual system
 * across every page in the sales-training site.
 */

/* PageNumber: § 03 / 16 in mono uppercase, used as section/page indicator. */
export function PageNumber({
  current,
  total,
  prefix = "§",
  className = "",
}: {
  current: number | string;
  total: number | string;
  prefix?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 tabular-nums ${className}`}
      style={{
        fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#6B6357",
      }}
    >
      <span>{prefix}</span>
      <span>{String(current).padStart(2, "0")}</span>
      <span style={{ opacity: 0.5 }}>/</span>
      <span>{String(total).padStart(2, "0")}</span>
    </span>
  );
}

/* DayBadge: 40x40 Pale Blue tile with Fraunces day number. */
export function DayBadge({
  n,
  size = 40,
  variant = "pale",
}: {
  n: number | string;
  size?: number;
  variant?: "pale" | "navy" | "cream";
}) {
  const surfaces = {
    pale:  { bg: "#EAF4EC", text: "#1F6B3F", border: "#CFE3D5" },
    navy:  { bg: "#1A2060", text: "#FFFBF0", border: "#1A2060" },
    cream: { bg: "#FFFBF0", text: "#1A2060", border: "#EDE6D6" },
  }[variant];

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 4,
        background: surfaces.bg,
        border: `1px solid ${surfaces.border}`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-display, Fraunces), Georgia, serif",
        fontWeight: 600,
        fontSize: size * 0.42,
        color: surfaces.text,
        letterSpacing: "-0.02em",
        flexShrink: 0,
      }}
    >
      {n}
    </div>
  );
}

/* PhaseStepper: 5 horizontal bars showing curriculum progress. */
export function PhaseStepper({
  total = 5,
  completed = 0,
  current,
  barWidth = 32,
  barHeight = 3,
  gap = 8,
}: {
  total?: number;
  completed?: number;
  current?: number;
  barWidth?: number;
  barHeight?: number;
  gap?: number;
}) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={completed}
      style={{ display: "inline-flex", gap }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const isDone = i < completed;
        const isCurrent = current !== undefined && i === current;
        const bg = isDone || isCurrent ? "#1F6B3F" : "#EDE6D6";
        return (
          <span
            key={i}
            style={{
              width: barWidth,
              height: barHeight,
              borderRadius: 999,
              background: bg,
              opacity: isCurrent && !isDone ? 0.5 : 1,
              transition: "background 200ms ease",
            }}
          />
        );
      })}
    </div>
  );
}

/* HeadlineAccent: italic kingdom Orange word inside a Fraunces headline.
   Pass `style` to override the color (e.g. per-topic accent on Treatment
   Catalog pages). The defaults (italic + inherit weight) stay intact. */
export function Em({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <em
      style={{
        fontStyle: "italic",
        color: "#D9622B",
        fontWeight: "inherit",
        ...style,
      }}
    >
      {children}
    </em>
  );
}

/* Eyebrow: tracked uppercase mono label. */
export function Eyebrow({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#6B6357",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
