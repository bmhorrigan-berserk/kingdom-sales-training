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

  return (
    <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
      <TopNav />

      {/* HEADER STRIP */}
      <section
        style={{
          position: "relative",
          padding: "56px 32px 24px",
          maxWidth: 1080,
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        <RadialFan
          origin="tl"
          palette={KINGDOM_PALETTE}
          opacity={0.22}
          size={720}
          rays={36}
          arcs={4}
          style={{
            position: "absolute",
            top: -160,
            left: -200,
            width: 720,
            height: 720,
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Eyebrow style={{ marginBottom: 16 }}>
            § 04 · KNOWLEDGE QUIZ · QUESTION {step + 1} OF {total} · 90 TO PASS
          </Eyebrow>
          <h1
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
            Built for <Em>elite</Em> operators.
          </h1>

          {/* Progress bar */}
          <div
            style={{
              marginTop: 28,
              height: 4,
              background: HAIRLINE,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${((step + 1) / total) * 100}%`,
                height: "100%",
                background: BLUE,
                transition: "width 250ms ease",
              }}
            />
          </div>
        </div>
      </section>

      {/* QUESTION */}
      <section
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "32px 32px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 24,
            marginBottom: 32,
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
              maxWidth: "32ch",
            }}
          >
            {q.prompt}
          </h2>
        </div>

        {/* CHOICE CARDS */}
        <div style={{ display: "grid", gap: 12 }}>
          {q.choices.map((choice, ci) => {
            const isSelected = selected === ci;
            const isCorrect = q.correctIndex === ci;
            const showRight = revealed && isCorrect;
            const showWrong = revealed && isSelected && !isCorrect;

            const borderColor = showRight
              ? SUCCESS
              : showWrong
                ? ERROR
                : isSelected
                  ? NAVY
                  : HAIRLINE;
            const bg = showRight
              ? "#E8F5EE"
              : showWrong
                ? "#FBEDEE"
                : isSelected
                  ? PALE
                  : "transparent";

            return (
              <button
                key={ci}
                onClick={() => selectChoice(step, ci)}
                disabled={revealed}
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr 24px",
                  alignItems: "center",
                  gap: 16,
                  padding: "20px 20px",
                  background: bg,
                  border: `1.5px solid ${borderColor}`,
                  borderRadius: 6,
                  textAlign: "left",
                  cursor: revealed ? "default" : "pointer",
                  transition: "all 150ms ease",
                  fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-display, Fraunces), Georgia, serif",
                    fontWeight: 600,
                    fontSize: 20,
                    color: BLUE,
                    letterSpacing: "0.04em",
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
                  {showRight && <Check size={18} style={{ color: SUCCESS }} />}
                  {showWrong && <X size={18} style={{ color: ERROR }} />}
                </span>
              </button>
            );
          })}
        </div>

        {/* EXPLANATION */}
        {revealed && q.explanation && (
          <div
            style={{
              marginTop: 24,
              padding: 20,
              background: PALE,
              border: `1px solid ${HAIRLINE}`,
              borderRadius: 6,
            }}
          >
            <Eyebrow style={{ color: BLUE, marginBottom: 8 }}>
              § WHY
            </Eyebrow>
            <p
              style={{
                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                fontSize: 15,
                lineHeight: 1.55,
                color: INK,
                margin: 0,
              }}
            >
              {q.explanation}
            </p>
          </div>
        )}

        {/* CONTROLS */}
        <div
          style={{
            marginTop: 32,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
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
          <button
            onClick={next}
            disabled={!revealed}
            style={btnPrimary(!revealed)}
          >
            {step === total - 1 ? "Finish" : "Next question"}
            <ArrowRight size={14} style={{ color: BLUE }} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          marginTop: 64,
          padding: 32,
          maxWidth: 1280,
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
  return (
    <>
      {/* SCORE HERO */}
      <section
        style={{
          position: "relative",
          padding: "72px 32px 40px",
          maxWidth: 1080,
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        <RadialFan
          origin="tr"
          palette={KINGDOM_PALETTE}
          opacity={0.24}
          size={900}
          rays={48}
          arcs={5}
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 900,
            height: 900,
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <Eyebrow style={{ marginBottom: 16 }}>
            § 04 · QUIZ COMPLETE · {passed ? "PASS" : "REVIEW REQUIRED"}
          </Eyebrow>
          <div
            style={{
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
                  color: BLUE,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.85,
                }}
              >
                {pct}
              </div>
              <Eyebrow style={{ marginTop: 8 }}>
                {score} of {total} correct
              </Eyebrow>
            </div>
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                  fontWeight: 400,
                  fontSize: "clamp(36px, 4.4vw, 56px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: NAVY,
                  margin: 0,
                }}
              >
                {passed ? (
                  <>
                    The standard is <Em>met.</Em>
                  </>
                ) : (
                  <>
                    Below the <Em>standard.</Em>
                  </>
                )}
              </h1>
              <p
                style={{
                  marginTop: 16,
                  fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: INK_MUTED,
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
                <button onClick={onReset} style={btnPrimary(false)}>
                  <RotateCcw size={14} style={{ color: BLUE }} /> Re-take quiz
                </button>
                <a href="/curriculum" style={btnGhost(false) as React.CSSProperties}>
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
          maxWidth: 1080,
          margin: "0 auto",
          padding: "40px 32px 96px",
          borderTop: `1px solid ${HAIRLINE}`,
        }}
      >
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

        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {questions.map((q, i) => {
            const userIdx = answers[i];
            const correct = userIdx === q.correctIndex;
            return (
              <li
                key={q.id}
                style={{
                  padding: "20px 0",
                  borderTop: `1px solid ${HAIRLINE}`,
                  display: "grid",
                  gridTemplateColumns: "60px 1fr auto",
                  gap: 24,
                  alignItems: "start",
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
      </section>

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
    padding: "12px 20px",
    background: NAVY,
    color: CREAM,
    border: `1px solid ${NAVY}`,
    fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    borderRadius: 4,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    textDecoration: "none",
  };
}

function btnGhost(disabled: boolean): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 20px",
    background: "transparent",
    color: NAVY,
    border: `1px solid ${HAIRLINE}`,
    fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    borderRadius: 4,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    textDecoration: "none",
  };
}
