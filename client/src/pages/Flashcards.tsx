// Kingdom Sales Training - Flashcards Page
// Design: Dark Military Command Interface
// Colors: Deep Navy bg, Kingdom Blue primary, Amber accent
// Fonts: Bebas Neue (headers), DM Sans (body)

import { useState, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, Home, Shuffle, BookOpen } from "lucide-react";

import { FLASHCARDS, QUIZ_QUESTIONS, CATEGORIES, type Flashcard } from "@/lib/trainingData";

const LOGO_URL = "https://cdn.prod.website-files.com/697241380caf4b1af9f8e8de/6977aba6f009db2a5f302b9b_kingdom-logo-white.svg";

function FlashcardView({ card, isFlipped, onFlip }: { card: Flashcard; isFlipped: boolean; onFlip: () => void }) {
  return (
    <div className="flashcard-scene w-full" style={{ height: "340px" }} onClick={onFlip}>
      <div className={`flashcard-inner ${isFlipped ? "flipped" : ""}`}>
        {/* Front */}
        <div className="flashcard-front rounded-xl border border-primary/40 bg-card cursor-pointer blue-glow overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
          <div className="h-full flex flex-col p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-['DM_Sans'] font-medium text-accent uppercase tracking-widest px-2 py-1 rounded border border-accent/30 bg-accent/10">
                {card.tag || card.category}
              </span>
              <span className="text-xs text-muted-foreground font-['DM_Sans']">Click to reveal</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="font-['DM_Sans'] text-lg md:text-xl font-semibold text-foreground text-center leading-relaxed">
                {card.front}
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="flashcard-back rounded-xl border border-accent/40 bg-card cursor-pointer amber-glow overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
          <div className="h-full flex flex-col p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-['DM_Sans'] font-medium text-primary uppercase tracking-widest px-2 py-1 rounded border border-primary/30 bg-primary/10">
                Answer
              </span>
              <span className="text-xs text-muted-foreground font-['DM_Sans']">Click to flip back</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              <p className="font-['DM_Sans'] text-sm md:text-base text-foreground leading-relaxed whitespace-pre-line">
                {card.back}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Flashcards() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);
  const [cardKey, setCardKey] = useState(0);

  const filteredCards = selectedCategory === "all"
    ? FLASHCARDS
    : FLASHCARDS.filter(c => c.category === selectedCategory);

  const currentCard = filteredCards[currentIndex];
  const progress = filteredCards.length > 0 ? ((currentIndex + 1) / filteredCards.length) * 100 : 0;

  const goNext = useCallback(() => {
    if (currentIndex < filteredCards.length - 1) {
      setDirection(1);
      setIsFlipped(false);
      setCardKey(k => k + 1);
      setTimeout(() => setCurrentIndex(i => i + 1), 50);
    }
  }, [currentIndex, filteredCards.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setIsFlipped(false);
      setCardKey(k => k + 1);
      setTimeout(() => setCurrentIndex(i => i - 1), 50);
    }
  }, [currentIndex]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentIndex(0);
    setIsFlipped(false);
    setCardKey(k => k + 1);
  };

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(randomIndex);
    setIsFlipped(false);
    setCardKey(k => k + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCardKey(k => k + 1);
  };

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
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="font-['Bebas_Neue'] text-lg tracking-wider text-foreground">FLASHCARDS</span>
            </div>
          </div>
          <Link href="/">
            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-xs font-['DM_Sans']">
              <Home className="w-4 h-4" />
              <span className="hidden sm:block">Home</span>
            </div>
          </Link>
        </div>
      </header>

      <div className="relative z-10 container py-6 md:py-10">
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-['DM_Sans'] font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
              }`}
            >
              {cat.label}
              {cat.id !== "all" && (
                <span className="ml-1.5 opacity-60">
                  {FLASHCARDS.filter(c => c.category === cat.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-['DM_Sans'] text-muted-foreground">
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <span className="text-xs font-['DM_Sans'] text-muted-foreground">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Card area */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {currentCard && (
              <motion.div
                key={cardKey}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <FlashcardView
                  card={currentCard}
                  isFlipped={isFlipped}
                  onFlip={() => setIsFlipped(f => !f)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-['DM_Sans'] text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffle}
                className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-accent hover:border-accent/50 transition-all"
                title="Shuffle"
              >
                <Shuffle className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                title="Reset to start"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={goNext}
              disabled={currentIndex === filteredCards.length - 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/50 bg-primary/10 text-sm font-['DM_Sans'] text-primary hover:bg-primary/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card dots navigation */}
          {filteredCards.length <= 20 && (
            <div className="flex justify-center gap-1.5 mt-6 flex-wrap">
              {filteredCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIndex(i);
                    setIsFlipped(false);
                    setCardKey(k => k + 1);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex
                      ? "bg-accent w-4"
                      : i < currentIndex
                      ? "bg-primary/60"
                      : "bg-border"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick nav to quiz */}
        <div className="max-w-2xl mx-auto mt-12 p-4 rounded-lg border border-accent/20 bg-accent/5 flex items-center justify-between">
          <div>
            <div className="font-['Bebas_Neue'] text-lg tracking-wider text-accent">READY TO TEST YOURSELF?</div>
            <div className="text-xs text-muted-foreground font-['DM_Sans']">{QUIZ_QUESTIONS.length} scenario-based quiz questions</div>
          </div>
          <Link href="/quiz">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-['DM_Sans'] font-semibold hover:bg-accent/90 transition-all">
              Take Quiz
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
