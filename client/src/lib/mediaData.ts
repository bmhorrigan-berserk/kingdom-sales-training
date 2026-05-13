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
  src: string;            // playable / viewable URL (for image-based decks, this is page 1)
  poster?: string;        // optional thumbnail
  durationSec?: number;   // optional, computed at runtime if missing
  downloadSrc?: string;   // optional explicit download URL (defaults to src)
  pageCount?: number;     // slide decks only - count of pages
  pages?: string[];       // slide decks only - array of per-page image URLs
                          // (when present, renders as a carousel instead of iframe)
  alt?: string;           // infographics only
}

export interface TreatmentTopic {
  slug: string;           // unique, used in URL: /library/treatment/<slug>
  title: string;          // long display title (used in hero subtitle)
  shortLabel: string;     // clean module name (Male Hormones, Female Hormones, etc.)
  moduleNumber: string;   // 01-05, drives module-N labeling and ordering
  tagline: string;        // one-sentence framing, shown on catalog card
  summary: string;        // longer description, shown on detail page hero
  learningBullets: string[]; // 3-point "What you'll learn" row in hero band
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
const BLOB_SLIDES_BASE =
  "https://j5aicoata8cxgrkm.public.blob.vercel-storage.com/onboarding/slides";

// Image-based slide decks live as PNG pages under
// onboarding/slides/<slug>/page-NN-<suffix>.png. Each entry is the
// fully-resolved Blob URL because Vercel Blob always appends a random
// suffix. Order matters - index 0 is page 1. Pages render as a
// keyboard-navigable carousel on the topic detail page.
const SLIDES_FIXING_MALE_ENERGY_CRISIS: string[] = [
  `${BLOB_SLIDES_BASE}/fixing-male-energy-crisis/page-01-AdsTQirBjYheHrduUUNeKifT3i0zkx.png`,
  `${BLOB_SLIDES_BASE}/fixing-male-energy-crisis/page-02-JW5u3WymM1csxO92tQu6YeU5zFuOMV.png`,
  `${BLOB_SLIDES_BASE}/fixing-male-energy-crisis/page-03-QzomWJQJbJUcu4ls8cicbUYjkiC0XU.png`,
  `${BLOB_SLIDES_BASE}/fixing-male-energy-crisis/page-04-aCGww9Ed4q11CvkrdrlszDlMGXFCaK.png`,
  `${BLOB_SLIDES_BASE}/fixing-male-energy-crisis/page-05-9UZ1ieI5V5Tw1JFXiM8kGpL20MGsy7.png`,
  `${BLOB_SLIDES_BASE}/fixing-male-energy-crisis/page-06-Ctoy4F3uguwQK6MVU0FeHILyE2zPXV.png`,
  `${BLOB_SLIDES_BASE}/fixing-male-energy-crisis/page-07-gnZbzuWtBMbjpelnwXSZHHlQtCMaCF.png`,
  `${BLOB_SLIDES_BASE}/fixing-male-energy-crisis/page-08-ZP5IOkd2Dn7XWVDMCO9v2Jvw2q0hOb.png`,
  `${BLOB_SLIDES_BASE}/fixing-male-energy-crisis/page-09-BeV5EnJ8x3fkcHOIEcA5ZyNYFINUyX.png`,
  `${BLOB_SLIDES_BASE}/fixing-male-energy-crisis/page-10-RV83BonerWm2hWB0yAXD1lXDdEhYqv.png`,
  `${BLOB_SLIDES_BASE}/fixing-male-energy-crisis/page-11-kHKYupApn9cTvzT2dSVg8XzA8TChWy.png`,
  `${BLOB_SLIDES_BASE}/fixing-male-energy-crisis/page-12-jw7fHz7u2z3eTq5Dz1JDM9i40S173B.png`,
  `${BLOB_SLIDES_BASE}/fixing-male-energy-crisis/page-13-pVwSbcMUEOwuTUI4y0XnnmdUdxBt3H.png`,
  `${BLOB_SLIDES_BASE}/fixing-male-energy-crisis/page-14-ilHKGmNeupUcqa0ubLCa3SDte706Ge.png`,
];

const SLIDES_PEPTIDES_TARGETED_CELLULAR_REPAIR: string[] = [
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-01-N9B3pyv0hxavSotIaOIQ3GA90FUqiM.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-02-AGdUrGANVFDLAADDruktUjfqK17kFR.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-03-SiRC2BV0kboKJPLCGx0Wk1succgZod.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-04-SR2wedkGbT961m3sEdvPICSIAKOVxS.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-05-jtflBUnQ6oCp0Sk5u5SLZe5lr4LlR2.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-06-2A9uHwOC8g885vB8MHA1DyGFk2I8fR.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-07-fKmWp5hrSeuyBTWnCGH4Rzyaqihe1O.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-08-26Z5LfYvVNJGxLz99gh7MpfpDNy7Yu.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-09-7Dmh1eZSJ4o9Cc8C2hON5l35DISRXO.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-10-E3AbgYmJ6qnSqOWJ4Szc4NjXweOnZr.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-11-sWu78S5WBOG2r7lIg2aCijRXibRSwX.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-12-XS33leR5i1ZJbOpAn0qHAjU1HA08bz.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-13-eyGBToTQlILqNQj12V2XZz6YzWONRq.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-14-daImHvfs3DLywJeUakIsxU1rY6t0uN.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-15-hZFpdWkuVUJrBBi0ctsghl5phbkgiW.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-16-G8HhLON0X4c5VUrS3bhSkFGhhLwf53.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-17-Q8anUSOJMrY5QyxgALtXxkQb7Ozn19.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-18-sOVNHnRb1H6ovPCWb2IYZnB7Ipo3Go.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-19-EGL1Y5vMKMXkuuzEiHYhKDJlmfN7et.jpg`,
  `${BLOB_SLIDES_BASE}/peptides-targeted-cellular-repair/page-20-TCjWLLcVnXR2PaejjvW7qZ07XWnphA.jpg`,
];

const SLIDES_RETATRUTIDE_HUMAN_SURVIVAL_ALGORITHM: string[] = [
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-01-cSrAOzbqVvfoY7vGX62NJkOyVKP1Az.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-02-OhKfacsRDVUZedInGhiaglBqwdT0DK.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-03-zwacY0sGXUKaaXXtZlFelMwBPIIYzd.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-04-or8ZhXEmSoLshhGR3R7mnO7HWD7dQh.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-05-OIBOtWVIMWfP2XzpNlT6YQoQCoeNpI.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-06-qp7J80MIrxGOVUZBPF0aRZH4TFJNKN.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-07-Y9LDanU0pv9NhIDnvLRhDUyyqfnUHB.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-08-gAKvv2z6mnL6wKMKuI6Iw2VEOwAJT7.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-09-ecFq4JYZH7k2PJ9dTS7fzldS6RTnwr.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-10-HPTT93FI8FLNL1PN4B5Tzqp1sL5hOz.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-11-yXcL0jZok73cZFI91DXEjbW7lp8ri9.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-12-AXq0I3VYEdYXKiXTv8Pg0ZFeC4CGRG.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-13-5ktQ0wqCoA6plr25kaZQDGmdjbVIm1.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-14-MMcRUhsJyRDwD545XHIvwb9TII0gGQ.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-15-5zJNHiw5Cb32EZvCdclzOUzBuS0boN.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-16-nfOPyVqWJqXozn0rgwSgmqqAni233O.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-17-2lsJDM0uPypk05MNyQpYxGbUXQinCz.jpg`,
  `${BLOB_SLIDES_BASE}/retatrutide-human-survival-algorithm/page-18-O56SQrzNELOOk6Lx6JZRLMkB8aPQRh.jpg`,
];

const SLIDES_TARGETED_MOLECULES_CELLULAR_ENERGY: string[] = [
  `${BLOB_SLIDES_BASE}/targeted-molecules-cellular-energy/page-01-Mw42hghuhLgx6F0BfLmSuxkDSkaQLq.jpg`,
  `${BLOB_SLIDES_BASE}/targeted-molecules-cellular-energy/page-02-pTs7Wlx3VDWfMCMeycHXjhp7jNUDaP.jpg`,
  `${BLOB_SLIDES_BASE}/targeted-molecules-cellular-energy/page-03-URjPwinwgk1md0InNU5OWkgvT1am69.jpg`,
  `${BLOB_SLIDES_BASE}/targeted-molecules-cellular-energy/page-04-Mat0x5PNb9QMvOhz5PJvnti0tD8Lbi.jpg`,
  `${BLOB_SLIDES_BASE}/targeted-molecules-cellular-energy/page-05-qb2zkux59L6PmJXKaINM9yGAWqthRm.jpg`,
  `${BLOB_SLIDES_BASE}/targeted-molecules-cellular-energy/page-06-0lx4GbZPB9ErKYW8GtZuxeZSJCffv8.jpg`,
  `${BLOB_SLIDES_BASE}/targeted-molecules-cellular-energy/page-07-txMtugs8SQvuOltHziUoRRXKDpI2Ob.jpg`,
  `${BLOB_SLIDES_BASE}/targeted-molecules-cellular-energy/page-08-uwlFPR4QL0WOEFocgQm7qk3OY5ipT9.jpg`,
  `${BLOB_SLIDES_BASE}/targeted-molecules-cellular-energy/page-09-jWKaFRnZfP6rin50laQWtLbKR6yiZr.jpg`,
  `${BLOB_SLIDES_BASE}/targeted-molecules-cellular-energy/page-10-UNr7umgjXpcHYEP63rVRkI7yP0hjR8.jpg`,
  `${BLOB_SLIDES_BASE}/targeted-molecules-cellular-energy/page-11-tOJZd3R16w2U0gPqe9ugcKiuFOYRn4.jpg`,
  `${BLOB_SLIDES_BASE}/targeted-molecules-cellular-energy/page-12-UMIExq9PfETEv90c8N7nB9Hxoa0Fmj.jpg`,
  `${BLOB_SLIDES_BASE}/targeted-molecules-cellular-energy/page-13-9IrVFWbwJVAasXKR8UE3abX5v0dLg8.jpg`,
  `${BLOB_SLIDES_BASE}/targeted-molecules-cellular-energy/page-14-4JIB9O5xSRjaXHjx1BKeUFFupKjEph.jpg`,
];

const SLIDES_WHY_WOMEN_NEED_TESTOSTERONE: string[] = [
  `${BLOB_SLIDES_BASE}/why-women-need-testosterone/page-01-CT2WLjibPP1CtXbrPlmlSeKPomXSkq.png`,
  `${BLOB_SLIDES_BASE}/why-women-need-testosterone/page-02-eMLK2vi1rVJvKIAHxaQag1G9A4GD2O.png`,
  `${BLOB_SLIDES_BASE}/why-women-need-testosterone/page-03-w9ppoMmtkFYRlvkrHLrVluY5RukXV6.png`,
  `${BLOB_SLIDES_BASE}/why-women-need-testosterone/page-04-Q8ihFQnptEIv6mO6KjDoQZBox8SHF5.png`,
  `${BLOB_SLIDES_BASE}/why-women-need-testosterone/page-05-Rcj8FjIxi7dHZX58sRDAywML17RQZk.png`,
  `${BLOB_SLIDES_BASE}/why-women-need-testosterone/page-06-Qng6oBEC8BbeD3BwGEzFGPr34onDJC.png`,
  `${BLOB_SLIDES_BASE}/why-women-need-testosterone/page-07-t8Xrqu4fhWnrHffDJaHMzxFKr9qdU3.png`,
  `${BLOB_SLIDES_BASE}/why-women-need-testosterone/page-08-2p82KiZ5WZa22pgTJpkwGxu7dlNwsk.png`,
  `${BLOB_SLIDES_BASE}/why-women-need-testosterone/page-09-Iw8jXwq9YuDiKl1pp8eW99rb00HQfb.png`,
  `${BLOB_SLIDES_BASE}/why-women-need-testosterone/page-10-DxNGIpSVuCxeUmKep9VQEAQbKtcEhz.png`,
  `${BLOB_SLIDES_BASE}/why-women-need-testosterone/page-11-zI04pqbhDYqW0yveLOnBSgqLZ9lmsw.png`,
  `${BLOB_SLIDES_BASE}/why-women-need-testosterone/page-12-E5d1QcdcjaoG6rJm4C8m9f8TTvAEsR.png`,
  `${BLOB_SLIDES_BASE}/why-women-need-testosterone/page-13-sEvuAodj1U4zVJi4KHll96WH6cEfNw.png`,
];

// Order in this array drives both Library card order and module number.
// Module 01 → Male Hormones, 02 → Female Hormones, 03 → Peptides,
// 04 → Weight Loss, 05 → Wellness.
export const TREATMENT_TOPICS: TreatmentTopic[] = [
  {
    slug: "fixing-male-energy-crisis",
    title: "Fixing the Modern Male Energy Crisis",
    shortLabel: "Male Hormones",
    moduleNumber: "01",
    tagline:
      "Why male energy collapses in the modern environment, and what kingdom protocols actually correct.",
    summary:
      "Foundational walk-through of the male hormonal collapse pattern. Ground every TRT and recovery conversation in the biology beneath the symptoms. Testosterone, sleep, and recovery as one integrated signal system rather than three separate complaints.",
    learningBullets: [
      "The HPG axis and the five domains of low testosterone.",
      "Why symptoms cluster, and how the kingdom restoration mechanism unwinds them.",
      "The six-month patient timeline reps anchor every call against.",
    ],
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
      slides: {
        src: SLIDES_FIXING_MALE_ENERGY_CRISIS[0],
        pages: SLIDES_FIXING_MALE_ENERGY_CRISIS,
        pageCount: SLIDES_FIXING_MALE_ENERGY_CRISIS.length,
      },
    },
  },
  {
    slug: "why-women-need-testosterone",
    title: "Why Women Need More Testosterone Than Estrogen",
    shortLabel: "Female Hormones",
    moduleNumber: "02",
    tagline:
      "The signal hierarchy women actually run on, and why the testosterone-first lens reframes the female protocol.",
    summary:
      "Female hormone restoration explained from first principles. Counter to the conventional estrogen-first framing, the female signal hierarchy is testosterone-led. The receptor biology, the cycle-stage realities, and how kingdom's female protocols sequence the restoration.",
    learningBullets: [
      "The female HPG axis and why testosterone leads the signal hierarchy.",
      "Perimenopause vs menopause, and BHRT vs synthetic HRT.",
      "The six-month restoration timeline for the female patient.",
    ],
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
      slides: {
        src: SLIDES_WHY_WOMEN_NEED_TESTOSTERONE[0],
        pages: SLIDES_WHY_WOMEN_NEED_TESTOSTERONE,
        pageCount: SLIDES_WHY_WOMEN_NEED_TESTOSTERONE.length,
      },
    },
  },
  {
    slug: "peptides-targeted-cellular-repair",
    title: "How Peptides Signal Targeted Cellular Repair",
    shortLabel: "Peptides",
    moduleNumber: "03",
    tagline:
      "Peptides as precision signaling tools, not generic supplements.",
    summary:
      "How peptide protocols address specific cellular signaling pathways the body has stopped firing on its own. BPC-157, TB-500, ipamorelin, CJC-1295, and the rest of the kingdom catalog. What each peptide signals, where it acts, and why the protocols stack them in the sequences they do.",
    learningBullets: [
      "Peptides vs hormones, and why the language matters on a call.",
      "The Wolverine Stack (BPC-157 + TB-500) and growth hormone secretagogues.",
      "Aesthetic, libido, cognitive, and immune peptides at a glance.",
    ],
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
      slides: {
        src: SLIDES_PEPTIDES_TARGETED_CELLULAR_REPAIR[0],
        pages: SLIDES_PEPTIDES_TARGETED_CELLULAR_REPAIR,
        pageCount: SLIDES_PEPTIDES_TARGETED_CELLULAR_REPAIR.length,
      },
    },
  },
  {
    slug: "retatrutide-human-survival-algorithm",
    title: "Retatrutide Rewrites the Human Survival Algorithm",
    shortLabel: "Weight Loss",
    moduleNumber: "04",
    tagline:
      "How next-gen GLP-1/GIP/glucagon agonists reset the metabolic set-point that defends weight.",
    summary:
      "Retatrutide and the next-generation GLP-1/GIP/glucagon triple-agonists override the survival algorithm the body uses to defend its weight set-point. The weight-loss conversation framed around biology, not willpower. Position kingdom's GLP-1 line against the legacy single-agonist alternatives.",
    learningBullets: [
      "The biological trap: leptin and ghrelin defending the set-point.",
      "Three generations of GLP medications: semaglutide, tirzepatide, retatrutide.",
      "Receptor mechanism comparison and the six-month restoration timeline.",
    ],
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
      slides: {
        src: SLIDES_RETATRUTIDE_HUMAN_SURVIVAL_ALGORITHM[0],
        pages: SLIDES_RETATRUTIDE_HUMAN_SURVIVAL_ALGORITHM,
        pageCount: SLIDES_RETATRUTIDE_HUMAN_SURVIVAL_ALGORITHM.length,
      },
    },
  },
  {
    slug: "targeted-molecules-cellular-energy",
    title: "Targeted Molecules to Restore Cellular Energy",
    shortLabel: "Wellness",
    moduleNumber: "05",
    tagline:
      "Molecular-level protocol design: rebuilding cellular energy production from the ground up.",
    summary:
      "The kingdom protocol design philosophy at the molecular level. Why we stack specific molecules (mitochondrial cofactors, methylation support, peptide signaling) in specific sequences to rebuild cellular energy production instead of chasing fatigue, brain fog, or recovery as isolated symptoms.",
    learningBullets: [
      "NAD+ as cellular fuel and B12 + lipotropic B for methylation.",
      "Glutathione as master antioxidant and L-carnitine for metabolic flexibility.",
      "PT-141 and PDE5 inhibitors in the sexual-health stack.",
    ],
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
      slides: {
        src: SLIDES_TARGETED_MOLECULES_CELLULAR_ENERGY[0],
        pages: SLIDES_TARGETED_MOLECULES_CELLULAR_ENERGY,
        pageCount: SLIDES_TARGETED_MOLECULES_CELLULAR_ENERGY.length,
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
