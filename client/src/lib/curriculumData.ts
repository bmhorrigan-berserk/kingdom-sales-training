/**
 * Kingdom Sales Training Curriculum data.
 * Extracted from Kingdom_Sales_Training_Curriculum_v2.docx (April 2026 v1.0).
 * The structured 30-day onboarding schedule + 5-phase methodology.
 *
 * Source of truth: the DOCX. Update here when the curriculum revs.
 */

export interface DaySchedule {
  day: number;
  date?: string;
  title: string;
  description: string;
  references?: string[];
}

export interface Phase {
  number: string;
  slug: string;
  title: string;
  italicWord: string;
  summary: string;
  lessons: { code: string; title: string; day?: number }[];
}

export const CURRICULUM_OVERVIEW =
  "Every new kingdom team member completes this material during their first thirty days. No exceptions.";

export const DAY_SCHEDULE: DaySchedule[] = [
  {
    day: 1,
    title: "Admin and Systems Setup",
    description: "ADP registration, I-9 completion, HIPAA certification, ZoHo and Charm login setup. Kingdom overview with Brice.",
  },
  {
    day: 2,
    title: "Charm EHR Instruction",
    description: "Invoicing, billing, recurring setup, LabCorp lab ordering, lab panels, DX codes. Led by Jason.",
    references: ["Binder Guide 2", "Binder Guide 3", "Binder Guide 4", "Binder Guide 5"],
  },
  {
    day: 3,
    title: "ZoHo CRM and Review",
    description: "ZoHo leads, deals, pipeline. Sticky notes, new PT checklist, CS pipeline progression. Afternoon: independent review. Led by Jason.",
    references: ["Binder Guide 1", "Binder Guide 6", "Binder Guide 8"],
  },
  {
    day: 4,
    title: "Live Consult Observation",
    description: "Shadow live CS and AE consults. Observe NEPQ in action, note objection handling, consult prep workflow. Debrief with Jason.",
  },
  {
    day: 5,
    title: "Sales Methodology Introduction",
    description: "NEPQ Foundation, Hormozi Value Equation, Chris Voss Tactical Empathy, audio roleplay review. Week 1 recap.",
  },
  {
    day: 6, title: "Pipeline Management",
    description: "ZoHo pipeline deep dive, Sinch SMS. Tyler with Sean (Medical Pod). Christian and David with Kailee (LMS1).",
  },
  {
    day: 7, title: "Shadow Training",
    description: "Continue pipeline shadowing across CS and LMS roles.",
  },
  {
    day: 8, title: "Monitored Practice",
    description: "Continue shadow assignments, guided roleplay, first monitored live calls with supervision.",
  },
  {
    day: 9, title: "Monitored Practice (cont.)",
    description: "Increase call volume with continued supervision and post-call debriefs.",
  },
  {
    day: 10, title: "Certification Prep",
    description: "Full system walkthrough, written assessment review (90+ to pass), roleplay practice, Day 30/60/90 milestone review.",
  },
  {
    day: 11, title: "Certification Testing",
    description: "Module 1 written assessment.",
  },
  {
    day: 12, title: "Certification Testing",
    description: "Modules 2-3 roleplay scoring.",
  },
  {
    day: 13, title: "Certification Testing",
    description: "Module 4 roleplay scoring.",
  },
  {
    day: 14, title: "Certification Testing",
    description: "Module 5 completion, CRM competency checks.",
  },
  {
    day: 15, title: "Shadow Phase begins",
    description: "Tyler Davis shadows Sean Murphy (Medical Pod). Christian and David continue with Kailee (LMS1).",
  },
];

export const PHASES: Phase[] = [
  {
    number: "01",
    slug: "medical-authority-opening",
    title: "Medical Authority Opening.",
    italicWord: "Authority",
    summary:
      "The first 60 seconds. You arrive as the diagnostician, not the salesperson. You disarm, anchor in clinical authority, and pivot to the requirement for biological intelligence.",
    lessons: [
      { code: "1-1",  title: "The $199 Diagnostic Bridge" },
      { code: "1-2",  title: "Situational Status and Frame Control" },
      { code: "1-3",  title: "Disarming the Amygdala: Vocal and Behavioral Mechanics" },
      { code: "1-4",  title: "Pushing vs. Pulling: The NEPQ Advantage" },
      { code: "1-5",  title: "The Science of Self-Persuasion" },
      { code: "1-6",  title: "The First 60 Seconds: Inbound Execution" },
      { code: "1-7",  title: "Advanced Empathy: Validating the Pain" },
      { code: "1-8",  title: "Early Objection Handling: Reversing the Power Dynamic" },
      { code: "1-9",  title: "Diminishing Time and Effort" },
      { code: "1-10", title: "The Pivot: The Requirement for Biological Intelligence" },
      { code: "1-11", title: "Value Stacking: Pitch the Legacy Self" },
      { code: "1-12", title: "The Assumptive Handoff" },
      { code: "1-13", title: "The Medical Authority Checklist" },
    ],
  },
  {
    number: "02",
    slug: "deep-discovery",
    title: "Deep Discovery.",
    italicWord: "Discovery",
    summary:
      "You ask the questions a clinician asks. Vitals, diagnosis, the cost of inaction, the optimized future. The patient persuades themselves.",
    lessons: [
      { code: "2-1",  title: "The Kingdom Standard Review" },
      { code: "2-2",  title: "Down-Regulating the Nervous System" },
      { code: "2-3",  title: "The Architecture of the Gap" },
      { code: "2-4",  title: "The Diagnostician's Listening Toolkit" },
      { code: "2-5",  title: "Situation Questions (The Vitals)" },
      { code: "2-6",  title: "Problem Awareness Questions (The Diagnosis)" },
      { code: "2-7",  title: "Consequence Questions (The Cost of Inaction)" },
      { code: "2-8",  title: "Solution Awareness Questions (The Vacation)" },
      { code: "2-9",  title: "The Deep Discovery Loop" },
      { code: "2-10", title: "The Pivot: Moving from Discovery to Action" },
      { code: "2-11", title: "The $199 Diagnostic Prescription" },
      { code: "2-12", title: "The Value Shield" },
      { code: "2-13", title: "Holding Their Hand Across the Bridge" },
      { code: "2-14", title: "The Kingdom Discovery Blueprint" },
    ],
  },
  {
    number: "03",
    slug: "value-stack",
    title: "Kingdom Value Stack.",
    italicWord: "Value",
    summary:
      "Stack authority on the numerator. Eliminate friction on the denominator. The math of value, deployed without performance.",
    lessons: [
      { code: "3-1",  title: "Commodity vs. Elite Ecosystem" },
      { code: "3-2",  title: "The Neutral, Calm, Detached Tonality" },
      { code: "3-3",  title: "The Mathematics of Value" },
      { code: "3-4",  title: "Stacking Authority: Maximizing the Numerator" },
      { code: "3-5",  title: "Eliminating Friction: Minimizing the Denominator" },
      { code: "3-6",  title: "The Frictionless $199 LabCorp Workflow" },
      { code: "3-7",  title: "The C.L.O.S.E.R. Conversational Architecture" },
      { code: "3-8",  title: "Clarify and Label: Diagnosing the Deficit" },
      { code: "3-9",  title: "Overview and Sell: The Optimized Future" },
      { code: "3-10", title: "Explain Concerns: Reframing the Value Stack" },
      { code: "3-11", title: "Tactical Reframes for Common Resistance" },
      { code: "3-12", title: "Reinforce: Execute the Handoff" },
      { code: "3-13", title: "The Non-Negotiable Rules of Engagement" },
    ],
  },
  {
    number: "04",
    slug: "objection-handling",
    title: "High-Status Objection Handling.",
    italicWord: "Objection",
    summary:
      "Closing without selling. Selling the ecosystem, not the treatment. Identity polarity. The diagnostic funnel.",
    lessons: [
      { code: "4-1",  title: "The Prime Directive: Closing Without Selling" },
      { code: "4-2",  title: "The Diagnostician Mindset and Identity Polarity" },
      { code: "4-3",  title: "Selling the Ecosystem, Not the Treatment" },
      { code: "4-4",  title: "The Disarming Sequence" },
      { code: "4-5",  title: "The Diagnostic Funnel" },
      { code: "4-6",  title: "Identifying the Status Quo Pain" },
      { code: "4-7",  title: "Amplifying the Gap" },
      { code: "4-8",  title: "The Kingdom Value Equation (Advanced)" },
      { code: "4-9",  title: "The 3 A's of Ethical Reframing" },
      { code: "4-10", title: "Objection Diagnostic Matrix" },
      { code: "4-11", title: "Holding the Frame: Logistics Over High-Pressure" },
      { code: "4-12", title: "The $199 Walk-In LabCorp Protocol" },
      { code: "4-13", title: "Holding Their Hand Across the Bridge (Advanced)" },
      { code: "4-14", title: "The Kingdom Standard of Excellence" },
    ],
  },
  {
    number: "05",
    slug: "199-close",
    title: "The $199 Logistics Close.",
    italicWord: "Logistics",
    summary:
      "Identity shift. Micro-commitment funnel. Logistics pivot. Never defend the price. Mission accomplished is the clinical staging handoff.",
    lessons: [
      { code: "5-1", title: "The Patient Pipeline Timeline" },
      { code: "5-2", title: "The Identity Shift: Operating as a Diagnostician" },
      { code: "5-3", title: "The Micro-Commitment Funnel" },
      { code: "5-4", title: "The Logistics Pivot Hinge" },
      { code: "5-5", title: "Script-to-Behavior Mapping for the $199 Retainer" },
      { code: "5-6", title: "The Hormozi Value Equation: Minimizing the Denominator" },
      { code: "5-7", title: "The Kingdom Standard: Never Defend the Price" },
      { code: "5-8", title: "Mission Accomplished: The Clinical Staging Handoff" },
    ],
  },
];

export const OPERATIONS_REFERENCE = [
  { code: "R-1", title: "Team Architecture and Pipeline Definitions" },
  { code: "R-2", title: "The $199 Financial Framework and LMS1 Conversion Checklist" },
  { code: "R-3", title: "Operational Routing: Sync vs. Async" },
  { code: "R-4", title: "The QRF and the 5-Minute Rule" },
  { code: "R-5", title: "Core Operating Rules and Compliance" },
  { code: "R-6", title: "Technical Toolset" },
  { code: "R-7", title: "Certification Requirements and Ramp Milestones" },
  { code: "R-8", title: "Study Resources and Supplemental Materials" },
];
