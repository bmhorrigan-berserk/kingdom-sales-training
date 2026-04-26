// Kingdom Sales Training - Home Page
// Design: TRT Kingdom brand identity — deep navy, cream white, clean sans-serif
// Logo: Kingdom wordmark SVG (no crown icon)
// Colors: #0A0D14 bg, #1a1f35 card, #C9A84C gold accent, white foreground

import { Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, Target, ChevronRight, Shield, Award, Layers } from "lucide-react";
import { FLASHCARDS, QUIZ_QUESTIONS } from "@/lib/trainingData";

const LOGO_URL = "https://cdn.prod.website-files.com/697241380caf4b1af9f8e8de/6977aba6f009db2a5f302b9b_kingdom-logo-white.svg";

export default function Home() {
  const totalCards = FLASHCARDS.length;
  const totalQuestions = QUIZ_QUESTIONS.length;
  const totalCategories = Array.from(new Set(FLASHCARDS.map(f => f.category))).length;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }}
      />

      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* Radial glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] rounded-full bg-gold/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />

      {/* Radial vector graphic — matches trtkingdom.com */}
      <div className="absolute right-0 top-0 w-[55vw] max-w-[700px] h-screen pointer-events-none overflow-hidden opacity-[0.18]">
        <svg viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10) * (Math.PI / 180);
            const x2 = 0 + Math.cos(angle) * 900;
            const y2 = 350 + Math.sin(angle) * 900;
            return (
              <line
                key={i}
                x1="0"
                y1="350"
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth="0.8"
              />
            );
          })}
          <circle cx="0" cy="350" r="12" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="0" cy="350" r="60" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="0" cy="350" r="150" fill="none" stroke="white" strokeWidth="0.4" strokeDasharray="2 12" />
          <circle cx="0" cy="350" r="280" fill="none" stroke="white" strokeWidth="0.3" strokeDasharray="1 16" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/8">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <img
              src={LOGO_URL}
              alt="Kingdom"
              className="h-7 w-auto"
            />
            <div className="w-px h-5 bg-white/20" />
            <span className="text-white/50 text-xs font-['DM_Sans'] tracking-widest uppercase">
              Sales Training
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40 font-['DM_Sans']">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wider">INTERNAL USE ONLY</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold/30 bg-gold/8 text-gold text-xs font-['DM_Sans'] font-medium mb-8 tracking-wider uppercase">
            <span className="w-1 h-1 rounded-full bg-gold" />
            Kingdom Telehealth Operations
          </div>

          <h1 className="font-['Bebas_Neue'] text-6xl md:text-8xl lg:text-9xl tracking-wider text-white leading-none mb-4">
            MASTER THE
            <br />
            <span className="text-gold">PROTOCOL</span>
          </h1>

          <p className="text-white/50 text-base md:text-lg font-['DM_Sans'] leading-relaxed max-w-2xl mb-12">
            From new patient sign-up to the $199 close. Every diagnosis code, lab panel, billing workflow, and objection handled. Train until the framework is instinct.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <Link href="/flashcards">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-between gap-6 px-7 py-5 rounded-sm bg-white text-background hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10"
              >
                <div className="flex items-center gap-4">
                  <BookOpen className="w-5 h-5 text-background/70" />
                  <div>
                    <div className="font-['Bebas_Neue'] text-xl tracking-wider text-background">
                      FLASHCARDS
                    </div>
                    <div className="text-xs text-background/50 font-['DM_Sans']">
                      {totalCards} cards across {totalCategories} modules
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-background/40 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>

            <Link href="/quiz">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-between gap-6 px-7 py-5 rounded-sm bg-gold/10 border border-gold/40 hover:bg-gold/15 transition-all cursor-pointer shadow-lg shadow-gold/5"
              >
                <div className="flex items-center gap-4">
                  <Target className="w-5 h-5 text-gold" />
                  <div>
                    <div className="font-['Bebas_Neue'] text-xl tracking-wider text-gold">
                      KNOWLEDGE QUIZ
                    </div>
                    <div className="text-xs text-white/40 font-['DM_Sans']">
                      {totalQuestions} scenario-based questions
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gold/50 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
          >
            {[
              { value: String(totalCards), label: "Flashcards", icon: BookOpen },
              { value: String(totalQuestions), label: "Quiz Questions", icon: Target },
              { value: String(totalCategories), label: "Training Modules", icon: Layers },
              { value: "5", label: "Objection Scripts", icon: Shield },
            ].map((stat, i) => (
              <div key={i} className="p-5 rounded-sm border border-white/8 bg-white/3 backdrop-blur-sm">
                <stat.icon className="w-4 h-4 text-gold mb-3 opacity-70" />
                <div className="font-['Bebas_Neue'] text-4xl text-white tracking-wide mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-['DM_Sans'] text-white/40 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Module grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="font-['Bebas_Neue'] text-2xl tracking-wider text-white/80 mb-5 flex items-center gap-3">
              <Award className="w-5 h-5 text-gold opacity-70" />
              TRAINING MODULES
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {[
                "New Patient Sign-Up",
                "Billing & Recurring",
                "Diagnosis Codes",
                "Lab Panels & Ordering",
                "Patient Pipeline & CRM",
                "The Consultation (WHARP)",
                "Medications & Dosing",
                "Sticky Notes & Tasks",
                "Cancellations & Deviations",
                "Sales Framework",
                "Objection Handling",
                "The $199 Close",
              ].map((module, i) => (
                <div
                  key={i}
                  className="px-3 py-2.5 rounded-sm border border-white/8 bg-white/3 hover:border-gold/30 hover:bg-gold/5 transition-all"
                >
                  <div className="font-['DM_Sans'] text-xs text-white/60 leading-tight">
                    {module}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/8 mt-16">
        <div className="container py-5 flex items-center justify-between">
          <img src={LOGO_URL} alt="Kingdom" className="h-6 w-auto opacity-60" />
          <div className="text-xs text-white/25 font-['DM_Sans'] tracking-wider">
            CONFIDENTIAL — INTERNAL USE ONLY
          </div>
        </div>
      </footer>
    </div>
  );
}
