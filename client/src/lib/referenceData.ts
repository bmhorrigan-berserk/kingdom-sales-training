/**
 * Reference Binder data - the 8 working guides used by the kingdom sales team.
 * The PDFs themselves live in /public/reference/[slug].pdf and are uploaded
 * with the build.
 */

export interface ReferenceGuide {
  number: string;
  slug: string;
  title: string;
  description: string;
  category: "Patient Pipeline" | "Billing" | "Clinical";
  pdfPath: string;
  pages?: number;
}

export const REFERENCE_GUIDES: ReferenceGuide[] = [
  {
    number: "01",
    slug: "new-patient-signup",
    title: "New Patient Sign-up Checklist",
    description: "Every step from first contact to first prescription. The CS canonical flow.",
    category: "Patient Pipeline",
    pdfPath: "/reference/new-patient-signup.html",
  },
  {
    number: "06",
    slug: "patient-sticky-notes",
    title: "Patient Sticky Note Reference",
    description: "How to leave clinical context that the next operator can act on without re-asking the patient.",
    category: "Patient Pipeline",
    pdfPath: "/reference/patient-sticky-notes.html",
  },
  {
    number: "08",
    slug: "cs-pipeline-progression",
    title: "CS Patient Pipeline Progression",
    description: "The Customer Success stage map. Where each patient lives, who owns them, and when they move.",
    category: "Patient Pipeline",
    pdfPath: "/reference/cs-pipeline-progression.html",
  },
  {
    number: "02",
    slug: "billing-recurring-checklist",
    title: "Billing and Recurring Checklist",
    description: "Monthly recurring profile setup, dunning rules, failed-payment routing.",
    category: "Billing",
    pdfPath: "/reference/billing-recurring-checklist.html",
  },
  {
    number: "07",
    slug: "patient-invoicing",
    title: "Patient Invoicing and Recurring Receipts",
    description: "How invoices are issued, where receipts post, and how to reconcile against Charm.",
    category: "Billing",
    pdfPath: "/reference/patient-invoicing.html",
  },
  {
    number: "03",
    slug: "dx-codes",
    title: "Diagnosis Codes (DX Codes)",
    description: "Every kingdom DX code with usage rules. Pull from this, not from memory.",
    category: "Clinical",
    pdfPath: "/reference/dx-codes.html",
  },
  {
    number: "04",
    slug: "lab-panel-reference",
    title: "Lab Panel Reference",
    description: "Junction and LabCorp panels with their scope, cost, and indication.",
    category: "Clinical",
    pdfPath: "/reference/lab-panel-reference.html",
  },
  {
    number: "05",
    slug: "labcorp-templates",
    title: "LabCorp Labs with Templates",
    description: "Template-by-template ordering reference. Copy-paste-able for the busy day.",
    category: "Clinical",
    pdfPath: "/reference/labcorp-templates.html",
  },
];

export const REFERENCE_CATEGORIES = [
  "Patient Pipeline",
  "Billing",
  "Clinical",
] as const;
