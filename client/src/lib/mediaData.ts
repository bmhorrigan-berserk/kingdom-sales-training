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

// MediaCategory groups items in the Library page. "sales-method" items
// teach the kingdom selling system (one video per phase + the call
// recordings). "treatment-catalog" items teach the clinical product
// catalog itself - reps drink these in to understand what they're
// actually selling. Defaults to "sales-method" if omitted for back-compat.
export type MediaCategory = "sales-method" | "treatment-catalog";

export interface MediaItem {
  slug: string;        // unique within manifest, used for routing + filenames
  type: MediaType;
  title: string;
  src: string;         // /media/{slug}.{ext} or https://...
  poster?: string;     // optional thumbnail for video
  durationMin?: number;
  description: string;
  category?: MediaCategory;
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

  // Treatment Catalog entries previously lived here. They moved to
  // TREATMENT_TOPICS below when each topic gained its own detail page
  // at /library/treatment/<slug> with multiple format variations
  // (audio, video, infographic, slide deck).
];

/* ------------------------------------------------------------------
 * Treatment Catalog topics - the "Know What You Sell" library.
 *
 * Each topic has its own detail page at /library/treatment/<slug>
 * showing all available format variations: audio, video, infographic,
 * slide deck. The Library page's Treatment Catalog section renders
 * cards that link into the detail pages.
 *
 * Adding a new format to an existing topic: drop the asset URL into
 * the relevant field. Adding a new topic: append a new entry below.
 *
 * Audio files live in Vercel Blob (store j5aicoata8cxgrkm) under the
 * onboarding/audio/ prefix. Videos should also use Blob or an
 * unlisted Vimeo/YouTube embed, NEVER bundled into the repo (too
 * large for Vercel deploy limits). Infographics and slide decks can
 * live in client/public/treatment-catalog/<slug>/ if they are small
 * (under ~5MB each); migrate to Blob if they grow.
 * ----------------------------------------------------------------*/

export interface TreatmentTopicAsset {
  src: string;            // playable / viewable URL
  poster?: string;        // optional thumbnail
  durationSec?: number;   // optional, computed at runtime if missing
  downloadSrc?: string;   // optional explicit download URL (defaults to src)
  pageCount?: number;     // slide decks only
  alt?: string;           // infographics only
}

export interface TreatmentTopic {
  slug: string;           // unique, used in URL: /library/treatment/<slug>
  title: string;
  tagline: string;        // one-sentence framing, shown on catalog card
  summary: string;        // longer description, shown on detail page hero
  // Order in the array drives card order on the Library page.
  assets: {
    audio?: TreatmentTopicAsset;
    video?: TreatmentTopicAsset;
    infographic?: TreatmentTopicAsset;
    slides?: TreatmentTopicAsset;
  };
}

const BLOB_AUDIO_BASE =
  "https://j5aicoata8cxgrkm.public.blob.vercel-storage.com/onboarding/audio";
const BLOB_VIDEO_BASE =
  "https://j5aicoata8cxgrkm.public.blob.vercel-storage.com/onboarding/video";
const BLOB_INFOGRAPHIC_BASE =
  "https://j5aicoata8cxgrkm.public.blob.vercel-storage.com/onboarding/infographic";

export const TREATMENT_TOPICS: TreatmentTopic[] = [
  {
    slug: "fixing-male-energy-crisis",
    title: "Fixing the Modern Male Energy Crisis",
    tagline:
      "Why male energy collapses in the modern environment, and what kingdom protocols actually correct.",
    summary:
      "Foundational walk-through of the male hormonal collapse pattern. Use this to ground every TRT and recovery conversation in the biology beneath the symptoms. Frames testosterone, sleep, and recovery as one integrated signal system rather than three separate complaints.",
    assets: {
      audio: {
        src: `${BLOB_AUDIO_BASE}/fixing-male-energy-crisis-0aQNX1BScveflRnZYAUwhAqwxIj343.m4a`,
      },
      video: {
        src: `${BLOB_VIDEO_BASE}/fixing-male-energy-crisis.mp4`,
      },
      infographic: {
        src: `${BLOB_INFOGRAPHIC_BASE}/fixing-male-energy-crisis.jpg`,
        alt: "The Path to Restoration: Understanding Male Hormones and TRT - kingdom infographic covering HPG axis, the 5 domains of low testosterone, restoration mechanism, and 6-month patient timeline.",
      },
    },
  },
  {
    slug: "why-women-need-testosterone",
    title: "Why Women Need More Testosterone Than Estrogen",
    tagline:
      "The signal hierarchy women actually run on, and why the testosterone-first lens reframes the female protocol.",
    summary:
      "Female hormone restoration explained from first principles. Counter to the conventional estrogen-first framing, the female signal hierarchy is testosterone-led. This recording walks through the receptor biology, the cycle-stage realities, and how kingdom's female protocols sequence the restoration.",
    assets: {
      audio: {
        src: `${BLOB_AUDIO_BASE}/why-women-need-testosterone-dTBRNKgBMJRH2LbpfAu5ULGDBjItuY.m4a`,
      },
      video: {
        src: `${BLOB_VIDEO_BASE}/why-women-need-testosterone.mp4`,
      },
      infographic: {
        src: `${BLOB_INFOGRAPHIC_BASE}/why-women-need-testosterone.jpg`,
        alt: "The Path to Hormonal Restoration: Navigating the Female Menopause Transition - kingdom infographic covering female HPG axis, perimenopause vs menopause, BHRT vs synthetic HRT, and the 6-month restoration timeline.",
      },
    },
  },
  {
    slug: "peptides-targeted-cellular-repair",
    title: "How Peptides Signal Targeted Cellular Repair",
    tagline:
      "Peptides as precision signaling tools, not generic supplements.",
    summary:
      "How peptide protocols address specific cellular signaling pathways the body has stopped firing on its own. Walks through BPC-157, TB-500, ipamorelin, CJC-1295, and the rest of the kingdom peptide catalog with a focus on what each peptide signals, where it acts, and why the kingdom protocols stack them in the sequences they do.",
    assets: {
      audio: {
        src: `${BLOB_AUDIO_BASE}/peptides-targeted-cellular-repair-ccQoNdt3QWivyc6cssucrdD8qPUPmI.m4a`,
      },
      video: {
        src: `${BLOB_VIDEO_BASE}/peptides-targeted-cellular-repair.mp4`,
      },
      infographic: {
        src: `${BLOB_INFOGRAPHIC_BASE}/peptides-targeted-cellular-repair.jpg`,
        alt: "Kingdom Module 03 - The Peptide Catalog: Precision Signaling for Repair and Performance. Covers peptides vs hormones, the Wolverine Stack (BPC-157 + TB-500), growth hormone secretagogues, aesthetic/libido peptides (GHK-Cu, PT-141), and cognitive/immune peptides.",
      },
    },
  },
  {
    slug: "targeted-molecules-cellular-energy",
    title: "Targeted Molecules to Restore Cellular Energy",
    tagline:
      "Molecular-level protocol design: rebuilding cellular energy production from the ground up.",
    summary:
      "The kingdom protocol design philosophy at the molecular level. Why we stack specific molecules (mitochondrial cofactors, methylation support, peptide signaling) in specific sequences to rebuild cellular energy production instead of chasing fatigue, brain fog, or recovery as isolated symptoms.",
    assets: {
      audio: {
        src: `${BLOB_AUDIO_BASE}/targeted-molecules-cellular-energy-qFox8vqHZ8rObOTl60EopYgrAXMRxA.m4a`,
      },
      video: {
        src: `${BLOB_VIDEO_BASE}/targeted-molecules-cellular-energy.mp4`,
      },
      infographic: {
        src: `${BLOB_INFOGRAPHIC_BASE}/targeted-molecules-cellular-energy.jpg`,
        alt: "Kingdom Module 05 - Fueling the Cellular Orchestra. Covers NAD+ for cellular fuel, B12 + LIE-poh B for methylation, glutathione (gloo-tah-THY-ohn) as master antioxidant, L carnitine for metabolic flexibility, PT-141 / P-B-E five inhibitors for sexual health.",
      },
    },
  },
  {
    slug: "retatrutide-human-survival-algorithm",
    title: "Retatrutide Rewrites the Human Survival Algorithm",
    tagline:
      "How next-gen GLP-1/GIP/glucagon agonists reset the metabolic set-point that defends weight.",
    summary:
      "Retatrutide and the next-generation GLP-1/GIP/glucagon triple-agonists override the survival algorithm the body uses to defend its weight set-point. This recording frames the weight-loss conversation around biology, not willpower, and gives reps the language to position kingdom's GLP-1 line against the legacy single-agonist alternatives.",
    assets: {
      audio: {
        src: `${BLOB_AUDIO_BASE}/retatrutide-human-survival-algorithm-fCel7qLmzYQVuULq3eMUUsU2gH5hMT.m4a`,
      },
      video: {
        src: `${BLOB_VIDEO_BASE}/retatrutide-human-survival-algorithm.mp4`,
      },
      infographic: {
        src: `${BLOB_INFOGRAPHIC_BASE}/retatrutide-human-survival-algorithm.jpg`,
        alt: "Beyond Willpower: Mapping the Biology of Weight Restoration. Covers the biological trap (leptin/ghrelin set-point), the three generations of GLP medications (semaglutide / tirzepatide / retatrutide), receptor mechanism comparison, and the 6-month restoration timeline.",
      },
    },
  },
];

/** Quick lookup by slug. */
export function getTreatmentTopic(slug: string): TreatmentTopic | undefined {
  return TREATMENT_TOPICS.find((t) => t.slug === slug);
}

/** Which asset formats this topic has. Used to render the chip row. */
export function topicAvailableFormats(
  topic: TreatmentTopic
): Array<"audio" | "video" | "infographic" | "slides"> {
  const out: Array<"audio" | "video" | "infographic" | "slides"> = [];
  if (topic.assets.audio) out.push("audio");
  if (topic.assets.video) out.push("video");
  if (topic.assets.infographic) out.push("infographic");
  if (topic.assets.slides) out.push("slides");
  return out;
}

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
