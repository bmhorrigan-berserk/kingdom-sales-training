/**
 * Quiz - certification assessment page.
 * Editorial cream + Mid Blue. Replaces the old radio list with full-width
 * answer cards. Italic Mid Blue accent in question prompts. Magazine-style
 * results spread with Fraunces score number.
 *
 * Adapter: imports existing question data from @/lib/quizData.
 * Expected shape: { questions: { id, prompt, choices: string[], correctIndex, explanation? }[] }
 */
import { useMemo, useState } from "react";
import TopNav from "@/components/TopNav";
import { Eyebrow, PageNumber, Em } from "@/components/Furniture";
import { RadialFan, KINGDOM_PALETTE } from "@/components/RadialFan";
import { Check, X, ArrowRight, RotateCcw } from "lucide-react";
import { QUIZ_QUESTIONS as RAW_QUESTIONS, type QuizQuestion } from "@/lib/trainingData";

// Adapter: existing shape uses `question`/`options`, redesign uses `prompt`/`choices`.
interface Question {
  id: string | number;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation?: string;
  category?: string;
}

function adapt(q: QuizQuestion): Question {
  return {
    id: q.id,
    prompt: q.question,
    choices: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
    category: q.category,
  };
}

const NAVY = "#1A2060";
const BLUE = "#1F6B3F"; // kingdom green (primary accent)
const CREAM = "#FFFBF0";
const PALE = "#EAF4EC"; // kingdom pale green
const HAIRLINE = "#E8DEC6";
const INK = "#2D2A24";
const INK_MUTED = "#6B6357";
const SUCCESS = "#0F7B4A";
const ERROR = "#B23A3A";

export default function Quiz() {
  const questions: Question[] = (RAW_QUESTIONS ?? []).map(adapt);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = questions.length;
  const score = useMemo(() => {
    let s = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) s += 1;
    });
    return s;
  }, [answers, questions]);
  const pct = total === 0 ? 0 : Math.round((score / total) * 100);
  const passed = pct >= 90;

  function selectChoice(qIdx: number, cIdx: number) {
    if (showResult[qIdx]) return;
    setAnswers((a) => ({ ...a, [qIdx]: cIdx }));
    setShowResult((s) => ({ ...s, [qIdx]: true }));
  }

  function next() {
    if (step < total - 1) setStep(step + 1);
    else setSubmitted(true);
  }
  function prev() {
    if (step > 0) setStep(step - 1);
  }
  function reset() {
    setStep(0);
    setAnswers({});
    setShowResult({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
        <TopNav />
        <ResultsSpread
          score={score}
          total={total}
          pct={pct}
          passed={passed}
          questions={questions}
          answers={answers}
          onReset={reset}
        />
      </div>
    );
  }

  if (total === 0) {
    return (
      <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
        <TopNav />
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "120px 32px" }}>
          <Eyebrow>§ QUIZ</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 400,
              fontSize: 56,
              color: NAVY,
              marginTop: 16,
            }}
          >
            Quiz data not loaded.
          </h1>
        </div>
      </div>
    );
  }

  const q = questions[step];
  const selected = answers[step];
  const revealed = !!showResult[step];

  const answeredCount = Object.keys(answers).length;
  const progressPct = total === 0 ? 0 : ((step + 1) / total) * 100;
  const ORANGE = "#D9622B";
  const NAVY_DEEP = "#141849";

  return (
    <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
      <TopNav />

      {/* NAVY HERO STRIP - full width, gives the page weight at the top */}
      <section
        style={{
          position: "relative",
          background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
          color: CREAM,
          padding: "0",
          overflow: "hidden",
        }}
      >
        <RadialFan texture="hormone"
          origin="tr"
          palette={["#5FB286", "#9CB3FF", "#F2A06E", "#E08585"]}
          opacity={0.30}
          size={1400}
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
              § 04 · KNOWLEDGE QUIZ · 90 TO PASS
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
                maxWidth: "18ch",
              }}
            >
              Built for{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: ORANGE,
                  fontWeight: "inherit",
                }}
              >
                elite
              </em>{" "}
              operators.
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
                Question{" "}
                <span style={{ color: CREAM, fontSize: 14 }}>
                  {String(step + 1).padStart(2, "0")}
                </span>{" "}
                /{" "}
                <span style={{ color: "rgba(255,251,240,0.6)" }}>
                  {String(total).padStart(2, "0")}
                </span>
              </span>
              <span style={{ color: "#5FB286" }}>
                {answeredCount} answered
              </span>
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

            {/* Question dots - one tiny dot per question, color-coded by status */}
            <div
              style={{
                marginTop: 14,
                display: "flex",
                gap: 4,
                flexWrap: "wrap",
              }}
            >
              {questions.map((_, qi) => {
                const isCurrent = qi === step;
                const wasAnswered = qi in answers;
                const wasCorrect = wasAnswered && answers[qi] === questions[qi].correctIndex;
                const dotColor = isCurrent
                  ? CREAM
                  : wasCorrect
                    ? "#5FB286"
                    : wasAnswered
                      ? "#E08585"
                      : "rgba(255,251,240,0.25)";
                const dotWidth = isCurrent ? 18 : 8;
                return (
                  <span
                    key={qi}
                    title={`Question ${qi + 1}`}
                    style={{
                      width: dotWidth,
                      height: 4,
                      borderRadius: 999,
                      background: dotColor,
                      transition: "width 200ms ease, background 200ms ease",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* QUESTION SURFACE - centered glass card on cream */}
      <section
        style={{
          maxWidth: 1920,
          margin: "0 auto",
          padding: "48px 32px 32px",
        }}
      >
        <div
          style={{
            maxWidth: 980,
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Question card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.78)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${HAIRLINE}`,
              borderTop: `4px solid ${BLUE}`,
              borderRadius: 14,
              padding: "36px 36px 32px",
              boxShadow:
                "0 1px 2px rgba(31,107,63,0.04), 0 12px 36px rgba(26,32,96,0.08), 0 4px 14px rgba(26,32,96,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 24,
                marginBottom: 28,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                  fontWeight: 600,
                  fontSize: 88,
                  color: BLUE,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.85,
                }}
              >
                {String(step + 1).padStart(2, "0")}
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                  fontWeight: 400,
                  fontSize: "clamp(24px, 2.8vw, 34px)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.015em",
                  color: NAVY,
                  margin: 0,
                  maxWidth: "36ch",
                }}
              >
                {q.prompt}
              </h2>
            </div>

            {q.category && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 10px",
                  background: PALE,
                  color: BLUE,
                  fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  borderRadius: 999,
                  marginBottom: 24,
                  border: `1px solid rgba(31, 107, 63, 0.2)`,
                }}
              >
                {q.category}
              </div>
            )}

            {/* CHOICE TILES - liquid glass */}
            <div style={{ display: "grid", gap: 10 }}>
              {q.choices.map((choice, ci) => {
                const isSelected = selected === ci;
                const isCorrect = q.correctIndex === ci;
                const showRight = revealed && isCorrect;
                const showWrong = revealed && isSelected && !isCorrect;

                let borderColor = HAIRLINE;
                let bg = "rgba(255, 255, 255, 0.55)";
                let shadow = "0 1px 2px rgba(26,32,96,0.03)";
                let letterColor = BLUE;

                if (showRight) {
                  borderColor = SUCCESS;
                  bg = "rgba(232, 245, 238, 0.85)";
                  shadow = "0 1px 2px rgba(15,123,74,0.10), 0 4px 14px rgba(15,123,74,0.10)";
                  letterColor = SUCCESS;
                } else if (showWrong) {
                  borderColor = ERROR;
                  bg = "rgba(251, 237, 238, 0.85)";
                  shadow = "0 1px 2px rgba(178,58,58,0.10), 0 4px 14px rgba(178,58,58,0.10)";
                  letterColor = ERROR;
                } else if (isSelected) {
                  borderColor = NAVY;
                  bg = "rgba(234, 244, 236, 0.7)";
                  shadow = "0 1px 2px rgba(26,32,96,0.06), 0 4px 14px rgba(26,32,96,0.08)";
                }

                return (
                  <button
                    key={ci}
                    onClick={() => selectChoice(step, ci)}
                    disabled={revealed}
                    className="kingdom-quiz-choice"
                    data-state={
                      showRight ? "correct" : showWrong ? "wrong" : isSelected ? "selected" : "idle"
                    }
                    style={{
                      display: "grid",
                      gridTemplateColumns: "44px 1fr 28px",
                      alignItems: "center",
                      gap: 16,
                      padding: "20px 22px",
                      background: bg,
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: `1.5px solid ${borderColor}`,
                      borderRadius: 10,
                      textAlign: "left",
                      cursor: revealed ? "default" : "pointer",
                      transition: "all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                      fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                      boxShadow: shadow,
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "var(--font-display, Fraunces), Georgia, serif",
                        fontWeight: 600,
                        fontSize: 22,
                        color: letterColor,
                        letterSpacing: "0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {String.fromCharCode(65 + ci)}
                    </span>
                    <span
                      style={{
                        fontSize: 16,
                        lineHeight: 1.5,
                        color: INK,
                      }}
                    >
                      {choice}
                    </span>
                    <span style={{ display: "inline-flex", justifyContent: "flex-end" }}>
                      {showRight && (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 24,
                            height: 24,
                            borderRadius: 999,
                            background: SUCCESS,
                          }}
                        >
                          <Check size={14} style={{ color: CREAM }} />
                        </span>
                      )}
                      {showWrong && (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 24,
                            height: 24,
                            borderRadius: 999,
                            background: ERROR,
                          }}
                        >
                          <X size={14} style={{ color: CREAM }} />
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* EXPLANATION - branded */}
            {revealed && q.explanation && (
              <div
                style={{
                  marginTop: 24,
                  padding: "20px 22px",
                  background: "rgba(234, 244, 236, 0.7)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid rgba(31, 107, 63, 0.25)`,
                  borderLeft: `4px solid ${BLUE}`,
                  borderRadius: 8,
                }}
              >
                <Eyebrow style={{ color: BLUE, marginBottom: 8 }}>§ WHY</Eyebrow>
                <p
                  style={{
                    fontFamily:
                      "var(--font-body, Inter), system-ui, sans-serif",
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: INK,
                    margin: 0,
                  }}
                >
                  {q.explanation}
                </p>
              </div>
            )}
          </div>

          {/* CONTROLS - separate glass bar below the card */}
          <div
            style={{
              marginTop: 20,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              onClick={prev}
              disabled={step === 0}
              style={btnGhost(step === 0)}
            >
              Previous
            </button>
            <span style={{ flex: 1 }} />
            {!revealed && (
              <span
                style={{
                  fontFamily:
                    "var(--font-body, Inter), system-ui, sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  color: INK_MUTED,
                  letterSpacing: "0.02em",
                }}
              >
                Pick an answer to reveal feedback
              </span>
            )}
            <button
              onClick={next}
              disabled={!revealed}
              style={btnPrimary(!revealed)}
            >
              {step === total - 1 ? "Finish" : "Next question"}
              <ArrowRight size={14} style={{ color: ORANGE }} />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .kingdom-quiz-choice[data-state="idle"]:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.85) !important;
          border-color: ${BLUE} !important;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(31,107,63,0.06), 0 8px 24px rgba(31,107,63,0.10) !important;
        }
      `}</style>

      {/* FOOTER */}
      <footer
        style={{
          marginTop: 64,
          padding: 32,
          maxWidth: 1920,
          margin: "64px auto 0",
          borderTop: `1px solid ${HAIRLINE}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <Eyebrow>· KNOWLEDGE QUIZ · INTERNAL ·</Eyebrow>
        <PageNumber current={4} total={4} />
      </footer>
    </div>
  );
}

function ResultsSpread({
  score,
  total,
  pct,
  passed,
  questions,
  answers,
  onReset,
}: {
  score: number;
  total: number;
  pct: number;
  passed: boolean;
  questions: Question[];
  answers: Record<number, number>;
  onReset: () => void;
}) {
  const NAVY_DEEP = "#141849";
  const ORANGE = "#D9622B";
  const scoreColor = passed ? BLUE : ERROR;

  return (
    <>
      {/* SCORE HERO - navy bar matching the active quiz hero */}
      <section
        style={{
          position: "relative",
          background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
          color: CREAM,
          overflow: "hidden",
        }}
      >
        <RadialFan texture="hormone"
          origin="tr"
          palette={["#5FB286", "#9CB3FF", "#F2A06E", "#E08585"]}
          opacity={0.30}
          size={1600}
          rays={56}
          arcs={6}
          style={{ zIndex: 0 }}
        />
        <div
          style={{
            maxWidth: 1920,
            margin: "0 auto",
            padding: "72px 32px 64px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: passed ? "#5FB286" : "#E08585",
              marginBottom: 20,
            }}
          >
            § 04 · QUIZ COMPLETE · {passed ? "PASS" : "REVIEW REQUIRED"}
          </div>
          <div
            style={{
              maxWidth: 980,
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 56,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                  fontWeight: 600,
                  fontSize: "clamp(96px, 14vw, 200px)",
                  color: passed ? "#5FB286" : "#E08585",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.85,
                  textShadow: passed
                    ? "0 0 40px rgba(95, 178, 134, 0.4)"
                    : "0 0 40px rgba(224, 133, 133, 0.4)",
                }}
              >
                {pct}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: "var(--font-mono, ui-monospace, monospace)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,251,240,0.7)",
                }}
              >
                {score} of {total} correct
              </div>
            </div>
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                  fontWeight: 400,
                  fontSize: "clamp(36px, 4.4vw, 56px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: CREAM,
                  margin: 0,
                }}
              >
                {passed ? (
                  <>
                    The standard is{" "}
                    <em style={{ fontStyle: "italic", color: ORANGE, fontWeight: "inherit" }}>
                      met.
                    </em>
                  </>
                ) : (
                  <>
                    Below the{" "}
                    <em style={{ fontStyle: "italic", color: ORANGE, fontWeight: "inherit" }}>
                      standard.
                    </em>
                  </>
                )}
              </h1>
              <p
                style={{
                  marginTop: 16,
                  fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "rgba(255,251,240,0.78)",
                  maxWidth: "52ch",
                }}
              >
                {passed
                  ? "Cleared the 90 threshold. Move to monitored practice and book your roleplay scoring blocks."
                  : "Below the 90 threshold. Review the missed items, return to the curriculum, and re-take when ready."}
              </p>

              <div
                style={{
                  marginTop: 28,
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={onReset}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 22px",
                    background: CREAM,
                    color: NAVY,
                    border: "none",
                    fontFamily:
                      "var(--font-body, Inter), system-ui, sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    borderRadius: 8,
                    cursor: "pointer",
                    boxShadow:
                      "0 1px 2px rgba(0,0,0,0.18), 0 6px 16px rgba(0,0,0,0.16)",
                  }}
                >
                  <RotateCcw size={14} style={{ color: ORANGE }} /> Re-take quiz
                </button>
                <a
                  href="/curriculum"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 22px",
                    background: "rgba(255,251,240,0.08)",
                    backdropFilter: "blur(10px)",
                    color: CREAM,
                    border: "1px solid rgba(255,251,240,0.20)",
                    fontFamily:
                      "var(--font-body, Inter), system-ui, sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    borderRadius: 8,
                    textDecoration: "none",
                  }}
                >
                  Back to curriculum
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEW LIST */}
      <section
        style={{
          maxWidth: 1920,
          margin: "0 auto",
          padding: "56px 32px 96px",
        }}
      >
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <Eyebrow style={{ color: BLUE, marginBottom: 16 }}>§ ITEM BY ITEM</Eyebrow>
        <h2
          style={{
            fontFamily: "var(--font-display, Fraunces), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 3.4vw, 40px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: NAVY,
            margin: 0,
            marginBottom: 24,
          }}
        >
          Review the answers.
        </h2>

        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
          {questions.map((q, i) => {
            const userIdx = answers[i];
            const correct = userIdx === q.correctIndex;
            return (
              <li
                key={q.id}
                style={{
                  padding: "20px 22px",
                  background: "rgba(255, 255, 255, 0.62)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: `1px solid ${HAIRLINE}`,
                  borderLeft: `4px solid ${correct ? SUCCESS : ERROR}`,
                  borderRadius: 10,
                  display: "grid",
                  gridTemplateColumns: "60px 1fr auto",
                  gap: 24,
                  alignItems: "start",
                  boxShadow: "0 1px 2px rgba(26,32,96,0.04)",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-display, Fraunces), Georgia, serif",
                    fontWeight: 600,
                    fontSize: 24,
                    color: BLUE,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-body, Inter), system-ui, sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      color: NAVY,
                      lineHeight: 1.4,
                    }}
                  >
                    {q.prompt}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontFamily:
                        "var(--font-body, Inter), system-ui, sans-serif",
                      fontSize: 13,
                      color: INK_MUTED,
                    }}
                  >
                    Correct: <strong style={{ color: SUCCESS }}>{q.choices[q.correctIndex]}</strong>
                    {!correct && userIdx !== undefined && (
                      <>
                        {" · "}
                        Yours: <strong style={{ color: ERROR }}>{q.choices[userIdx]}</strong>
                      </>
                    )}
                  </div>
                </div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: correct ? "#E8F5EE" : "#FBEDEE",
                    color: correct ? SUCCESS : ERROR,
                    fontFamily:
                      "var(--font-body, Inter), system-ui, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {correct ? <Check size={12} /> : <X size={12} />}
                  {correct ? "Correct" : "Missed"}
                </span>
              </li>
            );
          })}
        </ol>
        </div>
      </section>

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
        <Eyebrow>· QUIZ RESULTS · INTERNAL ·</Eyebrow>
        <PageNumber current={4} total={4} />
      </footer>
    </>
  );
}

function btnPrimary(disabled: boolean): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 22px",
    background: disabled ? "rgba(26,32,96,0.18)" : `linear-gradient(135deg, ${NAVY}, #2A2F7A)`,
    color: CREAM,
    border: "none",
    fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    borderRadius: 8,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    textDecoration: "none",
    boxShadow: disabled
      ? "none"
      : "0 1px 2px rgba(26,32,96,0.18), 0 6px 16px rgba(26,32,96,0.16)",
    transition: "transform 150ms ease, box-shadow 150ms ease",
  };
}

function btnGhost(disabled: boolean): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 22px",
    background: "rgba(255, 255, 255, 0.55)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    color: NAVY,
    border: `1px solid ${HAIRLINE}`,
    fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    borderRadius: 8,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    textDecoration: "none",
  };
}
