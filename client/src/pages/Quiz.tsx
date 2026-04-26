// Kingdom Sales Training - Quiz Page
// Design: Dark Military Command Interface
// Colors: Deep Navy bg, Kingdom Blue primary, Amber accent
// Fonts: Bebas Neue (headers), DM Sans (body)

import { useState, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Target, CheckCircle2, XCircle, ChevronRight,
  RotateCcw, Trophy, AlertCircle, BookOpen
} from "lucide-react";
import { QUIZ_QUESTIONS, CATEGORIES, type QuizQuestion } from "@/lib/trainingData";

const LOGO_URL = "https://cdn.prod.website-files.com/697241380caf4b1af9f8e8de/6977aba6f009db2a5f302b9b_kingdom-logo-white.svg";

type AnswerState = "unanswered" | "correct" | "incorrect";

interface QuizState {
  currentIndex: number;
  selectedOption: number | null;
  answerState: AnswerState;
  score: number;
  answers: (number | null)[];
  isComplete: boolean;
  selectedCategory: string;
}

function ScoreScreen({ score, total, onRestart, categoryLabel }: {
  score: number;
  total: number;
  onRestart: () => void;
  categoryLabel: string;
}) {
  const pct = Math.round((score / total) * 100);
  const grade = pct >= 90 ? "ELITE" : pct >= 75 ? "PROFICIENT" : pct >= 60 ? "DEVELOPING" : "NEEDS WORK";
  const gradeColor = pct >= 90 ? "text-emerald-400" : pct >= 75 ? "text-primary" : pct >= 60 ? "text-accent" : "text-destructive";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-lg mx-auto text-center"
    >
      <div className="p-8 rounded-xl border border-border bg-card">
        <Trophy className="w-12 h-12 text-accent mx-auto mb-4" />
        <div className="font-['Bebas_Neue'] text-5xl tracking-wider text-foreground mb-1">
          {score} / {total}
        </div>
        <div className={`font-['Bebas_Neue'] text-2xl tracking-wider mb-2 ${gradeColor}`}>
          {grade}
        </div>
        <div className="text-muted-foreground font-['DM_Sans'] text-sm mb-6">
          {pct}% correct on {categoryLabel}
        </div>

        {/* Score bar */}
        <div className="h-2 rounded-full bg-border mb-6 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className={`h-full rounded-full ${
              pct >= 90 ? "bg-emerald-400" : pct >= 75 ? "bg-primary" : pct >= 60 ? "bg-accent" : "bg-destructive"
            }`}
          />
        </div>

        <div className="text-xs font-['DM_Sans'] text-muted-foreground mb-6 leading-relaxed">
          {pct >= 90
            ? "Outstanding. You have internalized the Kingdom framework. You are ready for the floor."
            : pct >= 75
            ? "Strong performance. Review the questions you missed and run the flashcards on those modules."
            : pct >= 60
            ? "You have the foundation. Drill the flashcards daily until the framework is instinct."
            : "Return to the flashcards. The framework must be automatic before you can execute under pressure."}
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-['DM_Sans'] font-semibold hover:bg-primary/90 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Quiz
          </button>
          <Link href="/flashcards">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-accent/40 bg-accent/10 text-accent text-sm font-['DM_Sans'] font-semibold hover:bg-accent/20 transition-all">
              <BookOpen className="w-4 h-4" />
              Review Flashcards
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Quiz() {
  const [state, setState] = useState<QuizState>({
    currentIndex: 0,
    selectedOption: null,
    answerState: "unanswered",
    score: 0,
    answers: [],
    isComplete: false,
    selectedCategory: "all",
  });

  const [shakeKey, setShakeKey] = useState(0);

  const filteredQuestions = state.selectedCategory === "all"
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter(q => q.category === state.selectedCategory);

  const currentQuestion: QuizQuestion | undefined = filteredQuestions[state.currentIndex];
  const progress = filteredQuestions.length > 0
    ? ((state.currentIndex) / filteredQuestions.length) * 100
    : 0;

  const handleOptionSelect = useCallback((optionIndex: number) => {
    if (state.answerState !== "unanswered") return;

    const isCorrect = optionIndex === currentQuestion.correctIndex;
    if (!isCorrect) setShakeKey(k => k + 1);

    setState(prev => ({
      ...prev,
      selectedOption: optionIndex,
      answerState: isCorrect ? "correct" : "incorrect",
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  }, [state.answerState, currentQuestion]);

  const handleNext = useCallback(() => {
    const newAnswers = [...state.answers, state.selectedOption];
    const isLast = state.currentIndex === filteredQuestions.length - 1;

    setState(prev => ({
      ...prev,
      currentIndex: isLast ? prev.currentIndex : prev.currentIndex + 1,
      selectedOption: null,
      answerState: "unanswered",
      answers: newAnswers,
      isComplete: isLast,
    }));
  }, [state, filteredQuestions.length]);

  const handleRestart = () => {
    setState({
      currentIndex: 0,
      selectedOption: null,
      answerState: "unanswered",
      score: 0,
      answers: [],
      isComplete: false,
      selectedCategory: state.selectedCategory,
    });
  };

  const handleCategoryChange = (catId: string) => {
    setState({
      currentIndex: 0,
      selectedOption: null,
      answerState: "unanswered",
      score: 0,
      answers: [],
      isComplete: false,
      selectedCategory: catId,
    });
  };

  const categoryLabel = CATEGORIES.find(c => c.id === state.selectedCategory)?.label || "All Topics";

  return (
    <div className="min-h-screen bg-background">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59,91,219,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,91,219,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm sticky top-0">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link href="/">
              <img src={LOGO_URL} alt="Kingdom" className="h-7 w-auto" />
            </Link>
            <div className="w-px h-5 bg-white/20" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <Target className="w-4 h-4 text-accent" />
              <span className="font-['Bebas_Neue'] text-lg tracking-wider text-foreground">KNOWLEDGE QUIZ</span>
            </div>
          </div>
          {!state.isComplete && (
            <div className="flex items-center gap-3">
              <div className="text-xs font-['DM_Sans'] text-muted-foreground">
                Score: <span className="text-foreground font-semibold">{state.score}</span>
              </div>
              <Link href="/">
                <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-xs font-['DM_Sans']">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:block">Home</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </header>

      <div className="relative z-10 container py-6 md:py-10">
        {/* Category filter */}
        {!state.isComplete && (
          <div className="flex gap-2 flex-wrap mb-6">
            {CATEGORIES.filter(c => c.id === "all" || QUIZ_QUESTIONS.some(q => q.category === c.id)).map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-['DM_Sans'] font-medium transition-all ${
                  state.selectedCategory === cat.id
                    ? "bg-accent text-accent-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {state.isComplete ? (
          <ScoreScreen
            score={state.score}
            total={filteredQuestions.length}
            onRestart={handleRestart}
            categoryLabel={categoryLabel}
          />
        ) : currentQuestion ? (
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-['DM_Sans'] text-muted-foreground">
                  Question {state.currentIndex + 1} of {filteredQuestions.length}
                </span>
                <span className="text-xs font-['DM_Sans'] text-muted-foreground">
                  {state.score} correct
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-primary progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={state.currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="p-6 rounded-xl border border-border bg-card mb-4">
                  <div className="flex items-start gap-3 mb-1">
                    <span className="text-xs font-['JetBrains_Mono'] text-accent/80 mt-0.5 shrink-0">
                      Q{state.currentIndex + 1}
                    </span>
                    <p className="font-['DM_Sans'] text-base md:text-lg font-semibold text-foreground leading-relaxed">
                      {currentQuestion.question}
                    </p>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-4" key={shakeKey}>
                  {currentQuestion.options.map((option, i) => {
                    const isSelected = state.selectedOption === i;
                    const isCorrect = i === currentQuestion.correctIndex;
                    const showResult = state.answerState !== "unanswered";

                    let optionClass = "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5";
                    if (showResult && isCorrect) {
                      optionClass = "border-emerald-500/60 bg-emerald-500/10 text-emerald-300 correct-pulse";
                    } else if (showResult && isSelected && !isCorrect) {
                      optionClass = `border-destructive/60 bg-destructive/10 text-red-300 ${state.answerState === "incorrect" ? "wrong-shake" : ""}`;
                    } else if (!showResult) {
                      optionClass = "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleOptionSelect(i)}
                        disabled={state.answerState !== "unanswered"}
                        className={`w-full text-left p-4 rounded-lg border transition-all font-['DM_Sans'] text-sm leading-relaxed flex items-start gap-3 ${optionClass} disabled:cursor-default`}
                      >
                        <span className="shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-semibold mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {showResult && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {state.answerState !== "unanswered" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`p-4 rounded-lg border mb-4 ${
                        state.answerState === "correct"
                          ? "border-emerald-500/30 bg-emerald-500/5"
                          : "border-amber-500/30 bg-amber-500/5"
                      }`}>
                        <div className="flex items-start gap-2">
                          <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${
                            state.answerState === "correct" ? "text-emerald-400" : "text-amber-400"
                          }`} />
                          <div>
                            <div className={`font-['Bebas_Neue'] text-sm tracking-wider mb-1 ${
                              state.answerState === "correct" ? "text-emerald-400" : "text-amber-400"
                            }`}>
                              {state.answerState === "correct" ? "CORRECT" : "INCORRECT"}
                            </div>
                            <p className="font-['DM_Sans'] text-xs text-muted-foreground leading-relaxed">
                              {currentQuestion.explanation}
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleNext}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-['DM_Sans'] font-semibold text-sm hover:bg-primary/90 transition-all"
                      >
                        {state.currentIndex === filteredQuestions.length - 1 ? "See Results" : "Next Question"}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center text-muted-foreground font-['DM_Sans']">
            No questions found for this category.
          </div>
        )}
      </div>
    </div>
  );
}
