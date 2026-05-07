/**
 * Lesson-to-media manifest.
 *
 * Maps each curriculum lesson to its associated video / audio companions
 * extracted from Kingdom_Sales_Training_Curriculum_v2.docx. Trainees
 * watch / listen alongside the lesson body. The CurriculumLesson page
 * renders these inline above the lesson iframe.
 *
 * File hosting:
 * - `src` paths starting with "/media/" are served from
 *   client/public/media/. Drop the file there with the matching name
 *   and it will play.
 * - `src` paths starting with "https://" embed external hosts (Vimeo,
 *   YouTube, Loom) via iframe. For now we keep them local; switch to
 *   external when files exceed git-friendly size.
 *
 * Status: src paths are placeholders. Until the actual files are
 * uploaded, MediaPanel renders a clear "Awaiting upload" empty state
 * so trainees know the resource is intentional, not a bug.
 */

export type MediaType = "video" | "audio";

export interface MediaItem {
  slug: string;        // unique within manifest, used for routing + filenames
  type: MediaType;
  title: string;
  src: string;         // /media/{slug}.{ext} or https://...
  poster?: string;     // optional thumbnail for video
  durationMin?: number;
  description: string;
}

/* ------------------------------------------------------------------
 * The catalog. Order does not matter; lookup is by slug.
 * ----------------------------------------------------------------*/
export const MEDIA_CATALOG: MediaItem[] = [
  // Pre-Phase 1 / Onboarding companion
  {
    slug: "selling-the-legacy-self",
    type: "audio",
    title: "Selling the Legacy Self, Not Hormones",
    src: "/media/selling-the-legacy-self.mp3",
    durationMin: 38,
    description:
      "Audio deep dive on the identity shift. Why the patient is buying the optimized future self, never the molecule. Listen before lesson I-1.",
  },
  {
    slug: "kingdom-standard-clinical-performance-audit",
    type: "video",
    title: "The Kingdom Standard: A Clinical Performance Audit",
    src: "/media/kingdom-standard-performance-audit.mp4",
    durationMin: 24,
    description:
      "Walkthrough of the kingdom operating principle. Frames the entire onboarding before you touch a live call.",
  },

  // Phase 1: Medical Authority Opening
  {
    slug: "medical-authority-opening",
    type: "video",
    title: "The Medical Authority Opening",
    src: "/media/medical-authority-opening.mp4",
    durationMin: 28,
    description:
      "Explainer on the first sixty seconds. How to arrive as the diagnostician, disarm the amygdala, and pivot to the requirement for biological intelligence.",
  },

  // Phase 2: Deep Discovery
  {
    slug: "modern-sales-framework",
    type: "video",
    title: "The Modern Sales Framework",
    src: "/media/modern-sales-framework.mp4",
    durationMin: 32,
    description:
      "How NEPQ + Hormozi value math + Voss tactical empathy fuse into the kingdom Discovery flow. Watch alongside lessons 2-1 through 2-9.",
  },

  // Phase 3: Value Stack
  {
    slug: "kingdom-value-stack",
    type: "video",
    title: "The Kingdom Value Stack",
    src: "/media/kingdom-value-stack.mp4",
    durationMin: 26,
    description:
      "Stacking authority on the numerator and eliminating friction on the denominator. The math of value, deployed without performance.",
  },

  // Phase 4: High-Status Objection Handling
  {
    slug: "high-status-objection-handling",
    type: "video",
    title: "High-Status Objection Handling",
    src: "/media/high-status-objection-handling.mp4",
    durationMin: 30,
    description:
      "Closing without selling. Identity polarity. Selling the ecosystem, not the treatment. The diagnostic funnel.",
  },
  // Phase 4 / lesson 4-10: live call audio examples
  {
    slug: "current-clinic-commodity-trap",
    type: "audio",
    title: "Current Clinic: Commodity Trap (Price Shopping and Insurance Reframe)",
    src: "/media/current-clinic-commodity-trap.mp3",
    durationMin: 12,
    description:
      "Live call. The exact reframe when a prospect leads with price comparison or insurance dependency. Hear the rep pivot from commodity to ecosystem without defending the dollar.",
  },
  {
    slug: "why-we-use-spouses-as-shields",
    type: "audio",
    title: "Why We Use Spouses as Shields (Spouse Objection Handling)",
    src: "/media/why-we-use-spouses-as-shields.mp3",
    durationMin: 10,
    description:
      "Live call. Breakdown of the spouse-objection pattern. How to respect the relationship while exposing the deflection.",
  },
  {
    slug: "time-to-think-aggressive-approach",
    type: "audio",
    title: "Time to Think: Aggressive Approach (Timing and Delay Objection)",
    src: "/media/time-to-think-aggressive-approach.mp3",
    durationMin: 9,
    description:
      "Live call. Hold the frame on a 'I need to think about it' stall. Mirror to surface the real objection, then anchor the cost of inaction.",
  },
  {
    slug: "pending-labs-aggressive-empathy",
    type: "audio",
    title: "Pending Labs: Aggressive Empathy (Kingdom Sales Philosophy in Action)",
    src: "/media/pending-labs-aggressive-empathy.mp3",
    durationMin: 14,
    description:
      "Core example of the Neutral, Calm, Detached posture. The rep diagnoses the deficit and lets the patient persuade themselves.",
  },

  // Phase 5: $199 Logistics Close
  {
    slug: "199-logistics-close",
    type: "video",
    title: "The $199 Logistics Close",
    src: "/media/199-logistics-close.mp4",
    durationMin: 22,
    description:
      "The micro-commitment funnel and the logistics pivot hinge. Never defend the price. Mission accomplished is the clinical staging handoff.",
  },
  // Phase 5 / lesson 5-8: handoff audio
  {
    slug: "payment-delay-polite-negligence",
    type: "audio",
    title: "Payment Delay: Polite Negligence (Wallet Deflection)",
    src: "/media/payment-delay-polite-negligence.mp3",
    durationMin: 8,
    description:
      "Live call. The exact response to 'I do not have my card or wallet on me'. Hold the line with calm logistics instead of letting the prospect escape.",
  },

  // Capstone overview
  {
    slug: "deconstructing-the-kingdom-sales-engine",
    type: "video",
    title: "Deconstructing the Kingdom Sales Engine",
    src: "/media/deconstructing-the-kingdom-sales-engine.mp4",
    durationMin: 48,
    description:
      "End-to-end walkthrough of the full kingdom sales engine. Watch as the capstone before certification.",
  },
];

/* ------------------------------------------------------------------
 * Lesson-to-media routing.
 * Each lesson code can have multiple companion items.
 * ----------------------------------------------------------------*/
export const LESSON_MEDIA: Record<string, string[]> = {
  // Pre-Phase 1
  "I-1": [
    "selling-the-legacy-self",
    "kingdom-standard-clinical-performance-audit",
  ],

  // Phase 1
  "1-1": ["medical-authority-opening"],

  // Phase 2
  "2-1": ["modern-sales-framework"],

  // Phase 3
  "3-1": ["kingdom-value-stack"],

  // Phase 4
  "4-1": ["high-status-objection-handling"],
  "4-10": [
    "current-clinic-commodity-trap",
    "why-we-use-spouses-as-shields",
    "time-to-think-aggressive-approach",
    "pending-labs-aggressive-empathy",
  ],

  // Phase 5
  "5-1": ["199-logistics-close"],
  "5-8": ["payment-delay-polite-negligence"],

  // Operations Reference / capstone
  "R-8": ["deconstructing-the-kingdom-sales-engine"],
};

/* ------------------------------------------------------------------
 * Lookup helpers.
 * ----------------------------------------------------------------*/
export function getMediaForLesson(code: string): MediaItem[] {
  const slugs = LESSON_MEDIA[code] ?? [];
  return slugs
    .map((s) => MEDIA_CATALOG.find((m) => m.slug === s))
    .filter((m): m is MediaItem => Boolean(m));
}

export function lessonHasMedia(code: string): boolean {
  return (LESSON_MEDIA[code]?.length ?? 0) > 0;
}

export function lessonMediaTypes(code: string): { hasVideo: boolean; hasAudio: boolean } {
  const items = getMediaForLesson(code);
  return {
    hasVideo: items.some((i) => i.type === "video"),
    hasAudio: items.some((i) => i.type === "audio"),
  };
}
