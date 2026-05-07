// Kingdom Sales Training Data
// Sources: Kingdom Training Reference Binder v1, Kingdom Sales Framework (NotebookLM)
// Confidential: Internal Use Only

export interface Flashcard {
  id: string;
  category: string;
  front: string;
  back: string;
  tag?: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "All Topics" },
  { id: "New Patient Sign-Up", label: "New Patient Sign-Up" },
  { id: "Billing & Recurring", label: "Billing & Recurring" },
  { id: "Diagnosis Codes", label: "Diagnosis Codes" },
  { id: "Lab Panels & Ordering", label: "Lab Panels & Ordering" },
  { id: "Patient Pipeline & CRM", label: "Patient Pipeline & CRM" },
  { id: "The Consultation (WHARP)", label: "The Consultation (WHARP)" },
  { id: "Medications & Dosing", label: "Medications & Dosing" },
  { id: "Sticky Notes & Tasks", label: "Sticky Notes & Tasks" },
  { id: "Cancellations & Deviations", label: "Cancellations & Deviations" },
  { id: "Sales Framework", label: "Sales Framework" },
  { id: "Objection Handling", label: "Objection Handling" },
  { id: "HPG Axis & Hormones", label: "HPG Axis & Hormones" },
  { id: "Testosterone Therapy", label: "Testosterone Therapy" },
  { id: "Weight Loss & GLP-1", label: "Weight Loss & GLP-1" },
  { id: "Peptides", label: "Peptides" },
];

export const FLASHCARDS: Flashcard[] = [
  // ─── NEW PATIENT SIGN-UP ───
  {
    id: "fc-001",
    category: "New Patient Sign-Up",
    front: "What must you verify in the Treatment Options (TO) before proceeding with a new patient sign-up?",
    back: "Verify: Driver's license, did they respond to every question - Approved Treatment, Confirmed Shipping Address, Approved Card on File or Invoice, Attached Photo of front of Driver's License. Correct any unanswered questions or errors before proceeding.",
  },
  {
    id: "fc-002",
    category: "New Patient Sign-Up",
    front: "What information must be entered into the patient's life file during sign-up?",
    back: "Full Name, Identification Type, Identification Number, Identification Authority or State (verified from DL photo), Address as PT Confirmed, Email from PT Portal, Phone # from PT Portal.",
  },
  {
    id: "fc-003",
    category: "New Patient Sign-Up",
    front: "What is the rule for setting up recurring when an invoice was paid for a new order?",
    back: "If an Invoice was paid for the new Order, set the recurring for the FOLLOWING MONTH - not the current month. Setting it for the current month would double-bill the patient.",
  },
  {
    id: "fc-004",
    category: "New Patient Sign-Up",
    front: "What is the recurring count rule for Nandrolone?",
    back: "Nandrolone is a 3-count recurring. If the 1st month was already invoiced, adjust to a 2-count recurring to account for the month already charged.",
  },
  {
    id: "fc-005",
    category: "New Patient Sign-Up",
    front: "What is the Pharm message format sent to RN and LMS after sign-up?",
    back: "Use the '.paid' quick text. Enter: Provider, Invoice #, Medication (Dosing, Treatment, Frequency or QTY). Example: '200mg Test Cyp, Split'.",
  },
  {
    id: "fc-006",
    category: "New Patient Sign-Up",
    front: "What is the final step after completing a new patient sign-up?",
    back: "Send the New PT to the Patient Advocate within the Pod for the 'Welcome Letter Message to PT'.",
  },
  {
    id: "fc-007",
    category: "New Patient Sign-Up",
    front: "What must be set up in Stickies after a new patient sign-up?",
    back: "Set up Stickies and tasks to reflect approved medications. Include: Recurring (Price, Dosing, Treatment, Frequency or QTY) - example: $149 / 200mg Modafinil #33, and Approved Add-Ons.",
  },
  {
    id: "fc-008",
    category: "New Patient Sign-Up",
    front: "After creating the invoice, what must you verify before charging?",
    back: "Cross-check the invoice against: Approved medications from the TO, Pricing listed in the TO, and the patient's responses. Then charge the invoice.",
  },

  // ─── BILLING & RECURRING ───
  {
    id: "fc-009",
    category: "Billing & Recurring",
    front: "What four approvals must be obtained before billing a patient?",
    back: "1. Medication approval, 2. Price approval, 3. Card to charge approval, 4. Recurring approval - from both patient AND Provider.",
  },
  {
    id: "fc-010",
    category: "Billing & Recurring",
    front: "What are the shipping code abbreviations in the billing system?",
    back: "RS = Required Shipping, RSI = Required Shipping Included, CSI = Cold Shipping Included.",
  },
  {
    id: "fc-011",
    category: "Billing & Recurring",
    front: "What is the step-by-step process to approve an invoice in the patient portal?",
    back: "Approve Invoice → Three Dots → + Add Payment → Select Card on File → Click drop-down to verify card info → Click Add → Wait for green 'Payment Approved' notification.",
  },
  {
    id: "fc-012",
    category: "Billing & Recurring",
    front: "What message do you send the patient after their order is charged?",
    back: "Go back to the original PT message and reply: 'Your order was charged and sent for processing...'",
  },
  {
    id: "fc-013",
    category: "Billing & Recurring",
    front: "What is the navigation path to set up a recurring payment?",
    back: "Billing → Receipts → Recurring → + Recurring Payments → Charge card on file (drop-down to verify) → Set Start Date.",
  },
  {
    id: "fc-014",
    category: "Billing & Recurring",
    front: "What is the process for sending an order to the pharmacy after billing?",
    back: "Email the RN for Order Entry into the Pharmacy Platform. Utilize the '.paid' quick text. Annotate the correct Provider and Invoice Number.",
  },
  {
    id: "fc-015",
    category: "Billing & Recurring",
    front: "What must you verify when setting up a recurring profile?",
    back: "Verify: Medication on the next screen, Dates, Count, Facility, and Status on the following screen.",
  },

  // ─── DIAGNOSIS CODES ───
  {
    id: "fc-016",
    category: "Diagnosis Codes",
    front: "What diagnosis codes apply to Testosterone Cypionate for males?",
    back: "E29.1: Testicular Hypofunction; R53.83: Fatigue; R68.82: Decreased Libido.",
  },
  {
    id: "fc-017",
    category: "Diagnosis Codes",
    front: "What diagnosis code applies to Testosterone Cypionate for females?",
    back: "E34.9: Hormone Disturbance/Endocrine Disorder.",
  },
  {
    id: "fc-018",
    category: "Diagnosis Codes",
    front: "What diagnosis codes apply to Nandrolone Decanoate?",
    back: "E29.1: Testicular Hypofunction; M62.50: Muscle Wasting; M25.50: Joint Pain.",
  },
  {
    id: "fc-019",
    category: "Diagnosis Codes",
    front: "What diagnosis codes apply to Sermorelin, Tesamorelin, and IGF-LR3?",
    back: "M62.50: Muscle Wasting; M25.50: Joint Pain; R53.83: Fatigue - same for all three peptides.",
  },
  {
    id: "fc-020",
    category: "Diagnosis Codes",
    front: "What diagnosis code applies to Semaglutide, Oral Semaglutide, and Phentermine?",
    back: "E66.3: Overweight - all three weight loss medications share this code.",
  },
  {
    id: "fc-021",
    category: "Diagnosis Codes",
    front: "What diagnosis code applies to Tadalafil, Sildenafil, and Trimix?",
    back: "N52.9: Erectile Dysfunction - all three ED medications share this code.",
  },
  {
    id: "fc-022",
    category: "Diagnosis Codes",
    front: "What diagnosis code applies to Bremelanotide Nasal Spray (PT-141)?",
    back: "R68.82: Decreased Libido.",
  },
  {
    id: "fc-023",
    category: "Diagnosis Codes",
    front: "What diagnosis code applies to Minoxidil/Finasteride Solution?",
    back: "L65.9: Non-scarring hair loss, unspecified.",
  },
  {
    id: "fc-024",
    category: "Diagnosis Codes",
    front: "What diagnosis codes apply to Stanozolol and Oxandrolone (both genders)?",
    back: "M62.50: Muscle Wasting - applies to both males and females for both compounds.",
  },
  {
    id: "fc-025",
    category: "Diagnosis Codes",
    front: "What diagnosis code applies to Anastrozole, Exemestane, Kyzatrex, and Enclomiphene?",
    back: "E29.1: Testicular Hypofunction - all four share this code.",
  },
  {
    id: "fc-026",
    category: "Diagnosis Codes",
    front: "What is the rule for diagnosis codes in every patient encounter?",
    back: "Every treatment must have a corresponding diagnosis code documented in the encounter. The code must be based on clinical symptoms, medical history, and present condition.",
  },
  {
    id: "fc-027",
    category: "Diagnosis Codes",
    front: "What diagnosis codes apply to NAD+ and Glutathione?",
    back: "NAD+: R53.83: Fatigue. Glutathione: R53.83: Fatigue.",
  },
  {
    id: "fc-028",
    category: "Diagnosis Codes",
    front: "What diagnosis code applies to Progesterone Capsules and Estradiol Cream?",
    back: "E34.9: Hormone Disturbance/Endocrine Disorder - both female hormone medications share this code.",
  },

  // ─── LAB PANELS & ORDERING ───
  {
    id: "fc-029",
    category: "Lab Panels & Ordering",
    front: "What is the maximum age of labs that can be used to start hormone therapy?",
    back: "Labs must NOT be older than 12 months. Labs must be ordered or uploaded for the Provider to review before the scheduled appointment.",
  },
  {
    id: "fc-030",
    category: "Lab Panels & Ordering",
    front: "What baseline labs are required before starting HRT for males?",
    back: "Complete Blood Count (CBC): WBC, RBC, Hemoglobin, Hematocrit. Plus: CMP, Testosterone, Estradiol, and PSA.",
  },
  {
    id: "fc-031",
    category: "Lab Panels & Ordering",
    front: "What baseline labs are required before starting HRT for females?",
    back: "CMP, CBC with Diff, Testosterone, Estradiol, and Progesterone.",
  },
  {
    id: "fc-032",
    category: "Lab Panels & Ordering",
    front: "What baseline labs are required before starting GLP-1 treatment?",
    back: "CBC, Comprehensive Metabolic Panel (CMP), TSH, Hemoglobin A1C, Lipid Panel, Insulin, Fasting Glucose.",
  },
  {
    id: "fc-033",
    category: "Lab Panels & Ordering",
    front: "What is the lab recheck protocol after starting or changing hormone therapy?",
    back: "Labs are rechecked at the 6-7 week mark after starting or making changes to hormone therapy, then every 6 months per protocol - unless the Provider or patient requests sooner.",
  },
  {
    id: "fc-034",
    category: "Lab Panels & Ordering",
    front: "What is the first step before sending a lab order?",
    back: "Invoice the patient for the labs first. Reference: Work Instructions - Patient Invoicing and Recurring Receipts Set Up.",
  },
  {
    id: "fc-035",
    category: "Lab Panels & Ordering",
    front: "In the lab order, what must be entered in the 'Note to Lab/Patient' box?",
    back: "Paste the patient's email address. Also ensure 'Client' is selected for billing before sending the order electronically.",
  },
  {
    id: "fc-036",
    category: "Lab Panels & Ordering",
    front: "What is the color legend for the Lab Panel Reference Guide?",
    back: "Green = MUST HAVE; Yellow = ONLY NECESSARY IF; Blue = IMPORTANT TEST; Pink = FEMALE.",
  },
  {
    id: "fc-037",
    category: "Lab Panels & Ordering",
    front: "Why is high Hematocrit dangerous in TRT patients?",
    back: "High Hematocrit means thicker blood, increasing the risk of clots, heart attack, and stroke. It must be monitored closely in patients on testosterone therapy.",
  },
  {
    id: "fc-038",
    category: "Lab Panels & Ordering",
    front: "What portal message subject line and quick text is used when labs are ordered?",
    back: "Subject: 'Labs Ordered'. Use the '.labsord' quick text in the message body. New patients: highlight the New Patient section in blue. Existing patients: highlight the Important Information section in blue.",
  },
  {
    id: "fc-039",
    category: "Lab Panels & Ordering",
    front: "What is the 'Ordered By' field set to when placing a lab order?",
    back: "In the Ordered By drop-down, select John Swint. In the Lab drop-down, verify it is Access Medical Labs. Select the correct panel (e.g., PHHW Male Hormone Panel).",
  },

  // ─── PATIENT PIPELINE & CRM ───
  {
    id: "fc-040",
    category: "Patient Pipeline & CRM",
    front: "What are the stages in the ZoHo CRM patient pipeline?",
    back: "Cold Lead → Initial Consult Scheduled → Warm Leads → Awaiting Labs → Missed Physician Consult → Physician Consult Scheduled → Physician Consult Complete → Treatment Options Sent → Added As Recurring Member → Added As A La Carte Customer → Declined Treatment → Cancelled Membership → No Show/Non-responsive → Declined Treatment After Physician Consult.",
  },
  {
    id: "fc-041",
    category: "Patient Pipeline & CRM",
    front: "What must you do in the system when a patient is a No Show?",
    back: "1. In the appointment, change Status to 'No Show' and confirm. 2. Annotate in ZoHo CRM that the Deal is 'No Show/Non-responsive'. 3. Annotate in Quick Notes: Date, attempt made, and text message sent. Example: '09/30 Called, left VM and sent rescheduling text'.",
  },
  {
    id: "fc-042",
    category: "Patient Pipeline & CRM",
    front: "What must you verify before starting a patient's consultation in the portal?",
    back: "1. Verify PT is assigned to the right Provider under the correct Facility. 2. Check if the portal is registered (PHR Registration). 3. Verify uploaded labs and assign to correct provider. 4. Verify approved forms of ID. 5. Check the 'Reason' for the consult for any state limitations.",
  },
  {
    id: "fc-043",
    category: "Patient Pipeline & CRM",
    front: "What state-specific limitations exist for compound medications?",
    back: "California: Only Testosterone is approved for Hormone Health - Nandrolone and other compounds are NOT approved for CA patients. Iowa and Wisconsin patients use Revive pharmacy. CA patients for Testosterone use Tailor-Made when Empower is out of stock.",
  },
  {
    id: "fc-044",
    category: "Patient Pipeline & CRM",
    front: "What is the purpose and proven impact of the Precursor Message before a consultation?",
    back: "The Precursor Message reminds the PT of the upcoming consult and identifies the area code you will call from. Validity tests show it aids a 20% increase in 'Completed' consultations.",
  },
  {
    id: "fc-045",
    category: "Patient Pipeline & CRM",
    front: "What is the Precursor Message quick text format?",
    back: "'This is [Name] with Premier Hormone Health and Wellness! (PHH&W) I will be calling from a 704-area code for your consultation at [TIME]. I am looking forward to speaking with you!'",
  },
  {
    id: "fc-046",
    category: "Patient Pipeline & CRM",
    front: "What are the two Facility assignments and which Providers belong to each?",
    back: "Olivero Facility = Kathleen Mishak NP. PHH&W (Premier Hormone Health & Wellness) = John Swint PA. Verify the PT is assigned to the correct Provider under the correct Facility before billing.",
  },

  // ─── THE CONSULTATION (WHARP) ───
  {
    id: "fc-047",
    category: "The Consultation (WHARP)",
    front: "What does WHARP stand for?",
    back: "W = Welcome, H = Heard, A = Align, R = Relate, P = Partner. It is the framework used to navigate every consultation call.",
  },
  {
    id: "fc-048",
    category: "The Consultation (WHARP)",
    front: "What are the key questions asked during the WELCOME phase of WHARP?",
    back: "'What brings you in to partner with us today?' / 'What goals do you want to achieve?' / 'Did anything in particular about our website interest you?'",
  },
  {
    id: "fc-049",
    category: "The Consultation (WHARP)",
    front: "What does the HEARD phase of WHARP require you to do?",
    back: "Make the PT feel heard by being engaged when they talk. Don't interrupt. Highlight key ownership points: how they feel, side effects, issues with PCP or other clinics, family life, achievement of goals.",
  },
  {
    id: "fc-050",
    category: "The Consultation (WHARP)",
    front: "What does the ALIGN phase of WHARP involve?",
    back: "Confirm talking points by: repeating side effects/feelings, congratulating goal achievements, validating the product can aid their goals, validating their research, informing them of positive compound benefits (e.g., Nandrolone for joint restoration), and building trust through knowledge.",
  },
  {
    id: "fc-051",
    category: "The Consultation (WHARP)",
    front: "What does the RELATE phase of WHARP involve?",
    back: "Humanize yourself from just a clinic rep. Relate through: family size/kids ages, military or LE service, Jiu-Jitsu or fighting, shared compound experiences and your TRT story, and Kingdom's culture and clinic model.",
  },
  {
    id: "fc-052",
    category: "The Consultation (WHARP)",
    front: "What does the PARTNER phase of WHARP involve?",
    back: "Champion Kingdom's structure and pricing: No memberships, no strings attached, pay-as-you-go mentality, care and communication provided. Send portal registration if not set up. Validate next steps: Labs, Provider Consult, Treatment Options, Pharmacy Processing time.",
  },
  {
    id: "fc-053",
    category: "The Consultation (WHARP)",
    front: "What are the two fee options when converting a consultation?",
    back: "CPT Code 201 = Physician Consult only = $99 (Cognitive Function and Weight Loss - no labs required). CPT Code 202 = Initial Hormone Panel + Initial Physician Consult = $199 (Hormone Health - labs required).",
  },
  {
    id: "fc-054",
    category: "The Consultation (WHARP)",
    front: "What must be created at the start of a successful consultation call?",
    back: "Create an 'Encounter' to begin the PT's Timeline. Select Encounter → + Encounter → Validate 'Encounter with' as yourself → Visit Type = 'Free Phone Consult' → Select 'Quick' → Create.",
  },
  {
    id: "fc-055",
    category: "The Consultation (WHARP)",
    front: "What is the final step when scheduling a Physician Consult after the initial consultation?",
    back: "Inform the PT they will receive a Text Message confirmation with a link. They open it, provide their preferred name and state of residence, which creates a Zoom room for the call (no Zoom login or app required).",
  },

  // ─── MEDICATIONS & DOSING ───
  {
    id: "fc-056",
    category: "Medications & Dosing",
    front: "What does 'Split' mean in a medication dosing sticky note?",
    back: "'Split' means the medication is administered twice per week (2x/week). Example: '200mg Test Cyp, Split' = 100mg administered twice weekly.",
  },
  {
    id: "fc-057",
    category: "Medications & Dosing",
    front: "What do the dosing abbreviations BID, TID, and EOM mean?",
    back: "BID = Twice a Day; TID = Three Times a Day; EOM = Every Other Month (e.g., HCG).",
  },
  {
    id: "fc-058",
    category: "Medications & Dosing",
    front: "What is the difference between a 21-gauge and 25-gauge needle?",
    back: "21-gauge = used to DRAW from a vial. 25-gauge = finer needle used for ADMINISTERING in the body. Higher gauge = skinnier needle. 5/8\" 25g needles are standard for IM injections.",
  },
  {
    id: "fc-059",
    category: "Medications & Dosing",
    front: "What is the standard syringe size for 200mg/ml Test Cyp orders?",
    back: "1ml syringes are standard for all orders of 200mg/ml Test Cyp, unless the PT requests otherwise. Some PTs prefer 3ml syringes if they administer two or more compounds per injection (e.g., Test + Nandrolone).",
  },
  {
    id: "fc-060",
    category: "Medications & Dosing",
    front: "What are the common Anastrozole (AI) dosing options?",
    back: "1mg Anastrozole, Split; 0.5mg Anastrozole, Split; 0.5mg Anastrozole, 1x/week; 0.25mg Anastrozole, 3x/week; 0.5mg Anastrozole, half tablet 3x/week #8 (for 0.75mg 2x/week or 1.5mg weekly). AI dosing is set by the Provider.",
  },
  {
    id: "fc-061",
    category: "Medications & Dosing",
    front: "What does 'SubQ injections' mean in a supply deviation?",
    back: "SubQ = Subcutaneous injections. These use insulin needles and syringes to administer medication into the layer of fat and tissue just beneath the skin (as opposed to intramuscular/IM injections).",
  },
  {
    id: "fc-062",
    category: "Medications & Dosing",
    front: "What is the Phentermine quantity per charge?",
    back: "Phentermine #90 = 90 pills per charge.",
  },
  {
    id: "fc-063",
    category: "Medications & Dosing",
    front: "What are the primary compounds offered for Hormone Health at Kingdom?",
    back: "Testosterone Cypionate, Testosterone Enanthate, Nandrolone Decanoate, Anastrozole, Exemestane, Kyzatrex, Enclomiphene, HCG, FSH, Progesterone (females), Estradiol (females).",
  },
  {
    id: "fc-064",
    category: "Medications & Dosing",
    front: "What is the clinical benefit of Nandrolone Decanoate beyond muscle wasting?",
    back: "Nandrolone Decanoate is beneficial for joint restoration (M25.50: Joint Pain). This is a key differentiator and talking point when discussing Nandrolone with patients who have joint issues.",
  },

  // ─── STICKY NOTES & TASKS ───
  {
    id: "fc-065",
    category: "Sticky Notes & Tasks",
    front: "What is the purpose of the Yellow Sticky Note?",
    back: "The Yellow Sticky shows the approved Treatment and Add-Ons for reference. It must accurately reflect the approved treatment so the medical team can verify the official charge from the receipt/invoice and complete their assigned tasks.",
  },
  {
    id: "fc-066",
    category: "Sticky Notes & Tasks",
    front: "What is the purpose of the Pink Sticky Note?",
    back: "The Pink Sticky approves and sets pricing lines, dictates discount reasons and prices, annotates promotions/sales, and sets discounts for providers or executives. Military/Veteran/First Responder: $99 labs + consult, $135 TRT, 10% off add-ons, Labs $130.",
  },
  {
    id: "fc-067",
    category: "Sticky Notes & Tasks",
    front: "What is the purpose of the Green Sticky Note?",
    back: "The Green Sticky is used for address changes - temporary to short-term work addresses, including Military Deployment areas approved for shipping. For 1-2 month changes, update the green sticky with the new/temp address and set a task for the recurring refill date.",
  },
  {
    id: "fc-068",
    category: "Sticky Notes & Tasks",
    front: "What quick text is used to set a recurring refill task with an address change?",
    back: "Use 'taskrefadd' - set for the date of the next recurring refill. In Comments: place the New/Temp Address and the duration this address will be utilized.",
  },

  // ─── CANCELLATIONS & DEVIATIONS ───
  {
    id: "fc-069",
    category: "Cancellations & Deviations",
    front: "How do you mark a patient cancellation in the system?",
    back: "Change the Yellow Sticky to RED and add 'CXL' to denote patient cancellation. This is only used if a PT wishes to stop using services and no longer be an active patient.",
  },
  {
    id: "fc-070",
    category: "Cancellations & Deviations",
    front: "Which pharmacy is used for Iowa and Wisconsin patients?",
    back: "Iowa and Wisconsin patients use Revive pharmacy (not Empower).",
  },
  {
    id: "fc-071",
    category: "Cancellations & Deviations",
    front: "What pharmacy is used for California patients when Empower is out of stock?",
    back: "California patients for Testosterone use Tailor-Made pharmacy when Empower is out of stock.",
  },
  {
    id: "fc-072",
    category: "Cancellations & Deviations",
    front: "What is the Military/Veteran/First Responder discount structure?",
    back: "Initial Sign-Up Cost = $99 for Labs and Physician Consult; $135 for TRT; 10% off Add-Ons; Labs = $130.",
  },

  // ─── SALES FRAMEWORK ───
  {
    id: "fc-073",
    category: "Sales Framework",
    front: "What are the 5 Phases of the Kingdom Sales Framework?",
    back: "Phase 1: The Medical Authority Opening\nPhase 2: Deep Discovery\nPhase 3: Deploying the Kingdom Value Stack\nPhase 4: High-Status Objection Handling and the C.L.O.S.E.R. Handoff\nPhase 5: The $199 Assumptive Logistics Close",
  },
  {
    id: "fc-074",
    category: "Sales Framework",
    front: "What is the Kingdom $199 breakdown?",
    back: "$99 = Provider consultation fee\n$100 = LabCorp 31-biomarker panel\nTotal = $199\n\nThis is NOT a subscription. Upon payment, the LabCorp walk-in order is emailed instantly.",
  },
  {
    id: "fc-075",
    category: "Sales Framework",
    front: "What does NCD stand for and why does it matter?",
    back: "NCD = Neutral, Calm, and Detached. This is the required tonality at all times. Sounding eager or needy raises the prospect's guard. Detachment signals authority and makes the prospect chase the solution rather than resist it.",
  },
  {
    id: "fc-076",
    category: "Sales Framework",
    front: "What does C.L.O.S.E.R. stand for?",
    back: "C = Clarify (re-state why they are on the call)\nL = Label (validate their problem with tactical empathy)\nO = Overview (summarize what they have tried and why it failed)\nS = Sell the Vacation (shift focus to the Kingdom ecosystem destination)\nE = Explain Away Concerns (dismantle friction with objection handling tools)\nR = Reinforce (solidify their decision by processing the $199 payment)",
  },
  {
    id: "fc-077",
    category: "Sales Framework",
    front: "What is the 'Legacy Self' concept in the Kingdom sales approach?",
    back: "The Legacy Self is the vision of who the prospect becomes after breaking free from their biological trap. You sell the destination, not the product. Paint the picture of their optimized, high-performing future self.",
  },
  {
    id: "fc-078",
    category: "Sales Framework",
    front: "What is the NEPQ Commitment Question and why must it come BEFORE asking for payment?",
    back: "NEPQ Commitment Questions force the prospect to articulate why they need the solution, shifting them from cost-based to results-based thinking. This creates emotional ownership. If you skip this step and ask for the card first, you will face maximum resistance.",
  },
  {
    id: "fc-079",
    category: "Sales Framework",
    front: "What are four NEPQ Commitment Question scripts?",
    back: "1. 'Do you feel like this could be the answer for you?'\n2. 'What specific parts of the Kingdom ecosystem do you feel are going to really help you the most?'\n3. 'Do you feel like this is something that will actually get you where you want to go?'\n4. 'Money aside, why do you feel like this is the right fit for you right now?'",
  },
  {
    id: "fc-080",
    category: "Sales Framework",
    front: "What is the Assumptive Logistics Close and why does it work?",
    back: "The Assumptive Logistics Close treats the decision as already made and moves directly to logistics. It works because it eliminates the 'decision moment' that triggers buyer hesitation. You are not asking IF they want to proceed - you are asking HOW to proceed.",
  },

  // ─── HPG AXIS & HORMONES ───
  {
    id: "fc-087",
    category: "HPG Axis & Hormones",
    front: "What does HPG Axis stand for and what does it regulate?",
    back: "Hypothalamus-Pituitary-Gonadal Axis. It is the master feedback loop that regulates sex hormone production. The hypothalamus releases GnRH, which signals the pituitary to release LH and FSH, which signal the gonads to produce testosterone (males) or estrogen/progesterone (females).",
  },
  {
    id: "fc-088",
    category: "HPG Axis & Hormones",
    front: "What hormone does the hypothalamus release to start the HPG cascade?",
    back: "Gonadotropin-Releasing Hormone (GnRH). GnRH signals the pituitary gland to secrete LH (Luteinizing Hormone) and FSH (Follicle-Stimulating Hormone).",
  },
  {
    id: "fc-089",
    category: "HPG Axis & Hormones",
    front: "What is the difference between primary and secondary hypogonadism?",
    back: "Primary hypogonadism: the testicles fail to respond to LH/FSH (problem is in the gonads). Secondary hypogonadism: the pituitary does not secrete enough LH/FSH (problem is upstream at the hypothalamus or pituitary). Secondary can often be treated with enclomiphene.",
  },
  {
    id: "fc-090",
    category: "HPG Axis & Hormones",
    front: "How does exogenous testosterone affect the HPG feedback loop?",
    back: "Exogenous testosterone suppresses GnRH from the hypothalamus, which reduces LH and FSH from the pituitary. This causes the Leydig cells in the testicles to become dormant, decreasing natural testosterone production and sperm count.",
  },
  {
    id: "fc-091",
    category: "HPG Axis & Hormones",
    front: "Why does testicular atrophy occur on TRT?",
    back: "The Leydig cells (which account for much of testicular volume) become dormant because the negative feedback loop suppresses LH/FSH. Without stimulation, the cells shrink. HCG or enclomiphene can be used to prevent this.",
  },
  {
    id: "fc-092",
    category: "HPG Axis & Hormones",
    front: "What is HCG and why is it used with TRT?",
    back: "HCG (Human Chorionic Gonadotropin) is an analog of LH. It directly stimulates the Leydig cells to remain active despite the suppressed HPG axis, helping preserve testicular size and fertility during TRT.",
  },
  {
    id: "fc-093",
    category: "HPG Axis & Hormones",
    front: "How does enclomiphene work to support testosterone production?",
    back: "Enclomiphene is a SERM (Selective Estrogen Receptor Modulator) that blocks estrogen receptors in the hypothalamus and pituitary, causing increased GnRH, LH, and FSH secretion, which stimulates natural testosterone production. Used for secondary hypogonadism.",
  },
  {
    id: "fc-094",
    category: "HPG Axis & Hormones",
    front: "What is aromatization and why does it matter on TRT?",
    back: "Aromatization is the conversion of testosterone into estradiol (estrogen) via the aromatase enzyme. Excess estrogen on TRT can cause water retention, mood changes, gynecomastia, and erectile dysfunction. Anastrozole (an aromatase inhibitor) is used to manage this.",
  },
  {
    id: "fc-095",
    category: "HPG Axis & Hormones",
    front: "What are the symptoms of high estrogen in a male patient on TRT?",
    back: "Sensitive or puffy nipples (with or without a palpable nodule behind the nipple), water retention in the lower extremities, 'moon face' (bloated appearance), and erectile dysfunction.",
  },

  // ─── TESTOSTERONE THERAPY ───
  {
    id: "fc-096",
    category: "Testosterone Therapy",
    front: "What are the primary functions of testosterone in the human body?",
    back: "Testosterone drives: muscle mass and strength, bone density, fat distribution, red blood cell production, libido/sex drive, sperm production, energy, cognitive function, mood, and development of male characteristics (facial/body hair, puberty). In females, needed in smaller amounts for the same functions.",
  },
  {
    id: "fc-097",
    category: "Testosterone Therapy",
    front: "What is the gold standard method of testosterone administration and why?",
    back: "Injectable testosterone cypionate. It has the longest half-life (~8 days), produces the most stable blood levels, and provides the most clinically reliable lab data for titration. Topical and sublingual options have unpredictable peaks/troughs that make lab monitoring unreliable.",
  },
  {
    id: "fc-098",
    category: "Testosterone Therapy",
    front: "What are the three main testosterone esters and their half-lives?",
    back: "1. Testosterone Cypionate: ~8 days (gold standard, most stable). 2. Testosterone Enanthate: ~4 days (used when cypionate sensitivity exists). 3. Testosterone Propionate: ~24 hours (requires daily/EOD injections, rarely used at Kingdom).",
  },
  {
    id: "fc-099",
    category: "Testosterone Therapy",
    front: "What are the general contraindications for TRT?",
    back: "Prostate cancer, breast cancer, heart failure, heart attack within the last year, PSA > 4 ng/mL with unknown origin, untreated obstructive sleep apnea, and patients in active fertility planning (TRT reduces sperm count).",
  },
  {
    id: "fc-100",
    category: "Testosterone Therapy",
    front: "What labs must be monitored while on TRT and why?",
    back: "Red blood cells, hemoglobin, and hematocrit (TRT upregulates erythropoietin, increasing RBC production). Estradiol (to monitor aromatization). PSA (prostate health). CMP and lipids. Labs drawn at trough (6-7 days post-injection for cypionate).",
  },
  {
    id: "fc-101",
    category: "Testosterone Therapy",
    front: "When do patients typically begin feeling the effects of TRT?",
    back: "Energy, libido, and cognitive improvements are often felt within a few weeks. Body composition changes (muscle gain, fat loss) become noticeable at weeks 6-8 for patients who are exercising, eating adequate protein, and sleeping well. Changes compound over months.",
  },
  {
    id: "fc-102",
    category: "Testosterone Therapy",
    front: "What is anastrozole and when is it prescribed with TRT?",
    back: "Anastrozole is an aromatase inhibitor (AI) that blocks the conversion of testosterone to estrogen. Prescribed when estradiol levels are elevated on TRT. Must not be overused - estrogen serves critical biological functions including protecting cholesterol levels and sexual function.",
  },
  {
    id: "fc-103",
    category: "Testosterone Therapy",
    front: "What is the dream outcome for a patient seeking TRT?",
    back: "Increase muscle mass, fat loss, overall body recomposition, increase in strength/athletic performance/recovery time, improve energy, better libido/sex drive, better mental clarity, and improved mental health (reduce anxiety/depression).",
  },

  // ─── WEIGHT LOSS & GLP-1 ───
  {
    id: "fc-104",
    category: "Weight Loss & GLP-1",
    front: "What are GLP-1 receptor agonists and how do they produce weight loss?",
    back: "GLP-1 (Glucagon-Like Peptide-1) agonists mimic the GLP-1 hormone, which slows gastric emptying, increases satiety, reduces appetite signals in the brain, and regulates blood sugar. The result is significantly reduced caloric intake and weight loss.",
  },
  {
    id: "fc-105",
    category: "Weight Loss & GLP-1",
    front: "What is semaglutide and what is it commonly known as?",
    back: "Semaglutide is a GLP-1 receptor agonist. It is the active ingredient in Ozempic (diabetes management) and Wegovy (weight loss). Kingdom uses compounded semaglutide. It is administered via weekly subcutaneous injection.",
  },
  {
    id: "fc-106",
    category: "Weight Loss & GLP-1",
    front: "What is tirzepatide and how does it differ from semaglutide?",
    back: "Tirzepatide is a dual GLP-1 and GIP receptor agonist (brand names Mounjaro/Zepbound). It activates two pathways vs. semaglutide's one, often producing greater weight loss results. Kingdom uses compounded tirzepatide.",
  },
  {
    id: "fc-107",
    category: "Weight Loss & GLP-1",
    front: "What are the most common side effects of GLP-1 medications?",
    back: "Nausea, vomiting, diarrhea, constipation, and decreased appetite. Most common when starting or increasing the dose. Titrating slowly minimizes side effects. Rare but serious: pancreatitis, gallbladder issues.",
  },
  {
    id: "fc-108",
    category: "Weight Loss & GLP-1",
    front: "Why is muscle preservation critical during GLP-1-assisted weight loss?",
    back: "GLP-1 medications cause significant caloric restriction. Without adequate protein and resistance training, patients lose muscle mass along with fat, lowering metabolism and producing a 'skinny fat' outcome. Kingdom combines GLP-1 with hormone optimization to preserve and build muscle simultaneously.",
  },
  {
    id: "fc-109",
    category: "Weight Loss & GLP-1",
    front: "What is Kingdom's differentiator vs. just prescribing a GLP-1 medication?",
    back: "Kingdom combines GLP-1 therapy with hormone optimization (TRT), metabolic support, and lifestyle coaching. Optimizing testosterone alongside GLP-1 therapy helps preserve and build muscle during weight loss, producing superior body recomposition vs. GLP-1 alone.",
  },

  // ─── PEPTIDES ───
  {
    id: "fc-110",
    category: "Peptides",
    front: "What are peptides and how do they work therapeutically?",
    back: "Peptides are short chains of amino acids that act as signaling molecules in the body. Therapeutic peptides mimic or stimulate natural biological processes such as growth hormone release, tissue repair, immune modulation, and fat metabolism.",
  },
  {
    id: "fc-111",
    category: "Peptides",
    front: "What is BPC-157 and what is it used for?",
    back: "BPC-157 (Body Protection Compound 157) is derived from a gastric protein. It promotes tissue healing, reduces inflammation, accelerates recovery from injuries (tendons, ligaments, muscles), and has gut-protective properties. Often stacked with TB-500.",
  },
  {
    id: "fc-112",
    category: "Peptides",
    front: "What are CJC-1295 and Ipamorelin and how do they work together?",
    back: "CJC-1295 is a GHRH analog that stimulates the pituitary to release growth hormone. Ipamorelin is a GHRP that amplifies GH pulses. Together they produce a synergistic increase in growth hormone, improving body composition, sleep quality, and recovery. Results compound over 3-6 months.",
  },
  {
    id: "fc-113",
    category: "Peptides",
    front: "What is PT-141 (Bremelanotide) used for?",
    back: "PT-141 is a melanocortin receptor agonist used to treat sexual dysfunction in both men and women. It works centrally (in the brain) to increase sexual desire and arousal, unlike PDE5 inhibitors (Viagra/Cialis) which work peripherally on blood vessels.",
  },
  {
    id: "fc-114",
    category: "Peptides",
    front: "What is Sermorelin and how does it compare to CJC-1295?",
    back: "Sermorelin is a shorter GHRH analog (first 29 amino acids of GHRH). It stimulates natural GH release but has a shorter half-life than CJC-1295. Often used as a more affordable entry-level GH peptide with a strong safety profile.",
  },
  {
    id: "fc-115",
    category: "Peptides",
    front: "What is the typical administration route for most therapeutic peptides?",
    back: "Subcutaneous injection (under the skin), typically in the abdomen. Some peptides like PT-141 can be administered intranasally. BPC-157 can also be taken orally for gut-related conditions.",
  },

  // ─── OBJECTION HANDLING ───
  {
    id: "fc-081",
    category: "Objection Handling",
    front: "What is an Accusation Audit and when do you use it?",
    back: "An Accusation Audit proactively lists the worst things the prospect might be thinking and says them first - BEFORE the prospect voices their objection.\n\nScript: 'You probably think we are just another expensive online clinic that is going to complicate your life, trap you into massive out-of-pocket costs, and leave you guessing. I completely understand that fear.'\n\nResult: The prospect instinctively disagrees and lowers their defenses.",
  },
  {
    id: "fc-082",
    category: "Objection Handling",
    front: "What are the 3 A's of objection handling?",
    back: "Acknowledge: Repeat their concern back. 'I completely understand wanting to find the best rate for your initial lab work.'\n\nAssociate: Align their objection with behavior of elite successful patients. 'Our most successful patients scrutinized the initial costs too.'\n\nAsk (Power Reversal): Calibrated question to reframe value. 'What is most important to you right now, purely finding the lowest upfront price, or getting safe results backed by elite clinical oversight?'",
  },
  {
    id: "fc-083",
    category: "Objection Handling",
    front: "What is Mirroring (Isopraxism) and how does it work?",
    back: "Mirroring repeats the last 1-3 critical words of the prospect's sentence with an upward, inquisitive inflection, then goes completely silent for at least 4 seconds.\n\nProspect: 'I think I just need some time to think about all of this.'\nRep: 'Time to think about it?' [4 second pause]\n\nThe prospect will instinctively elaborate and reveal the true root of their hesitation.",
  },
  {
    id: "fc-084",
    category: "Objection Handling",
    front: "Give 3 examples of No-Oriented Questions for the Kingdom close.",
    back: "1. 'Would it be a bad idea to just get your biological baseline established first, so you have actual data instead of guessing?'\n2. 'Would you be opposed to taking the next step?'\n3. 'Is there any reason why we shouldn't move ahead?'",
  },
  {
    id: "fc-085",
    category: "Objection Handling",
    front: "How do you handle the 'I need to talk to my partner' objection?",
    back: "Prospects use their spouse to mask uncertainty. Reframe the $199 as simply gathering biological data, not a full treatment commitment.\n\nKey insight: You are not asking them to commit to a protocol. You are asking them to get a blood test. Nobody needs a spouse's permission to get a blood test.",
  },
  {
    id: "fc-086",
    category: "Objection Handling",
    front: "How do you handle the 'Time to Think' stall?",
    back: "This is a smoke screen. Use Mirroring first to uncover the real objection.\n\nThen establish the Cost of Inaction: make the pain of staying the same feel far worse than the pain of purchasing. The prospect is choosing to stay in their biological trap every day they delay.",
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ─── HPG AXIS & HORMONES ───
  {
    id: "q-hpg-1",
    category: "HPG Axis & Hormones",
    question: "What hormone does the hypothalamus release to initiate the HPG axis cascade?",
    options: [
      "Luteinizing Hormone (LH)",
      "Gonadotropin-Releasing Hormone (GnRH)",
      "Follicle-Stimulating Hormone (FSH)",
      "Human Chorionic Gonadotropin (HCG)",
    ],
    correctIndex: 1,
    explanation: "The hypothalamus releases GnRH, which signals the pituitary gland to secrete LH and FSH. GnRH is the master trigger of the entire HPG axis cascade.",
  },
  {
    id: "q-hpg-2",
    category: "HPG Axis & Hormones",
    question: "A patient on TRT asks why his testicles have shrunk. What is the correct clinical explanation?",
    options: [
      "TRT directly damages testicular tissue over time",
      "The negative feedback loop suppresses LH/FSH, causing Leydig cells to become dormant and atrophy",
      "High estrogen levels cause testicular shrinkage",
      "The testosterone molecule is toxic to testicular cells at high concentrations",
    ],
    correctIndex: 1,
    explanation: "Exogenous testosterone suppresses GnRH, which reduces LH and FSH. Without LH stimulation, the Leydig cells (which account for much testicular volume) become dormant and atrophy.",
  },
  {
    id: "q-hpg-3",
    category: "HPG Axis & Hormones",
    question: "A patient has low testosterone with LOW LH and FSH. What type of hypogonadism is this and what treatment might help?",
    options: [
      "Primary hypogonadism; TRT is the only option",
      "Secondary hypogonadism; enclomiphene (a SERM) may restore natural production",
      "Primary hypogonadism; HCG therapy is indicated",
      "Secondary hypogonadism; anastrozole is the first-line treatment",
    ],
    correctIndex: 1,
    explanation: "Low LH/FSH with low testosterone indicates secondary hypogonadism (problem is upstream at the pituitary/hypothalamus). Enclomiphene blocks estrogen receptors in the hypothalamus/pituitary, increasing GnRH, LH, and FSH, which can restore natural testosterone production.",
  },
  {
    id: "q-hpg-4",
    category: "HPG Axis & Hormones",
    question: "What are the symptoms of high estrogen in a male patient on TRT?",
    options: [
      "Increased libido, acne, and oily skin",
      "Fatigue, low libido, and depression",
      "Sensitive/puffy nipples, water retention, moon face, and erectile dysfunction",
      "Hair loss, increased aggression, and elevated PSA",
    ],
    correctIndex: 2,
    explanation: "High estrogen from aromatization causes sensitive or puffy nipples, water retention in the lower extremities, a bloated 'moon face' appearance, and erectile dysfunction. Anastrozole is used to manage this.",
  },
  // ─── TESTOSTERONE THERAPY ───
  {
    id: "q-trt-1",
    category: "Testosterone Therapy",
    question: "Why is testosterone cypionate considered the gold standard for TRT administration?",
    options: [
      "It is the cheapest form of testosterone available",
      "It can be taken orally, making it the most convenient option",
      "It has the longest half-life (~8 days), producing the most stable blood levels and reliable lab data for titration",
      "It does not aromatize into estrogen, eliminating the need for an AI",
    ],
    correctIndex: 2,
    explanation: "Testosterone cypionate has a half-life of approximately 8 days, producing stable blood levels without frequent injections. It also provides clinically meaningful trough lab values for accurate dose titration - something topical and sublingual forms cannot reliably provide.",
  },
  {
    id: "q-trt-2",
    category: "Testosterone Therapy",
    question: "A patient is concerned about TRT causing prostate cancer. What is the most accurate response?",
    options: [
      "TRT doubles the risk of prostate cancer, which is why we monitor PSA closely",
      "Current medical literature does not support a causal link between properly managed TRT and prostate cancer; we monitor PSA regularly as a precaution",
      "TRT is contraindicated in any patient with a family history of prostate cancer",
      "Prostate cancer risk is only a concern for patients over 65 on TRT",
    ],
    correctIndex: 1,
    explanation: "The current body of medical literature does not establish a causal link between properly managed TRT and prostate cancer. In fact, low testosterone is associated with higher health risks. PSA monitoring is a standard precaution, not a reason to withhold TRT from appropriate candidates.",
  },
  {
    id: "q-trt-3",
    category: "Testosterone Therapy",
    question: "When should labs be drawn relative to a testosterone cypionate injection for the most accurate results?",
    options: [
      "24 hours after the injection (peak level)",
      "Immediately before the injection (trough level, 6-7 days after last dose)",
      "3-4 days after the injection (midpoint)",
      "The timing does not matter for testosterone cypionate",
    ],
    correctIndex: 1,
    explanation: "Labs should be drawn at the trough - just before the next scheduled injection, approximately 6-7 days after the last testosterone cypionate dose. Trough levels provide the most clinically relevant baseline for accurate dose titration.",
  },
  // ─── WEIGHT LOSS & GLP-1 ───
  {
    id: "q-wl-1",
    category: "Weight Loss & GLP-1",
    question: "How does semaglutide produce weight loss?",
    options: [
      "It directly burns fat by increasing metabolic rate",
      "It acts as a GLP-1 receptor agonist, slowing gastric emptying, increasing satiety, reducing appetite, and regulating blood sugar",
      "It blocks fat absorption in the intestines",
      "It suppresses ghrelin (the hunger hormone) production in the stomach",
    ],
    correctIndex: 1,
    explanation: "Semaglutide mimics the GLP-1 hormone, which slows gastric emptying, increases feelings of fullness, reduces appetite signals in the brain, and helps regulate blood sugar. The result is significantly reduced caloric intake and weight loss.",
  },
  {
    id: "q-wl-2",
    category: "Weight Loss & GLP-1",
    question: "How does tirzepatide differ from semaglutide mechanistically?",
    options: [
      "Tirzepatide is a GLP-1 agonist only; semaglutide activates both GLP-1 and GIP receptors",
      "Tirzepatide activates both GLP-1 and GIP receptors (dual agonist), while semaglutide activates only GLP-1 receptors",
      "They are identical in mechanism but differ only in dosing frequency",
      "Tirzepatide works peripherally while semaglutide works centrally in the brain",
    ],
    correctIndex: 1,
    explanation: "Tirzepatide is a dual GLP-1/GIP receptor agonist (Mounjaro/Zepbound), activating two pathways vs. semaglutide's one. This dual mechanism often produces greater weight loss results than semaglutide alone.",
  },
  {
    id: "q-wl-3",
    category: "Weight Loss & GLP-1",
    question: "Why is muscle preservation critical during GLP-1-assisted weight loss, and what is the primary strategy?",
    options: [
      "Muscle preservation is not a concern with GLP-1 therapy as it only targets fat tissue",
      "GLP-1 medications cause caloric restriction that can lead to muscle loss; high protein intake and resistance training are essential",
      "Taking HCG alongside GLP-1 medications automatically preserves muscle mass",
      "Muscle loss only occurs if the patient does not take the medication as prescribed",
    ],
    correctIndex: 1,
    explanation: "GLP-1 medications create significant caloric restriction. Without adequate protein and resistance training, patients lose muscle along with fat, lowering metabolism and producing a 'skinny fat' outcome. Kingdom combines GLP-1 with hormone optimization to prevent this.",
  },
  // ─── PEPTIDES ───
  {
    id: "q-pep-1",
    category: "Peptides",
    question: "What is the mechanism of action of CJC-1295 and Ipamorelin when used together?",
    options: [
      "CJC-1295 blocks cortisol while Ipamorelin directly injects growth hormone into the bloodstream",
      "CJC-1295 is a GHRH analog that stimulates the pituitary to release GH; Ipamorelin is a GHRP that amplifies GH pulses - together they produce a synergistic increase in GH",
      "Both peptides work identically and are combined only to reduce the required dose of each",
      "CJC-1295 increases IGF-1 directly while Ipamorelin increases testosterone",
    ],
    correctIndex: 1,
    explanation: "CJC-1295 mimics GHRH, stimulating the pituitary to release growth hormone. Ipamorelin amplifies the GH pulse. Together they produce a synergistic, more robust GH release than either alone, improving body composition, sleep, and recovery.",
  },
  {
    id: "q-pep-2",
    category: "Peptides",
    question: "What is BPC-157 primarily used for in a clinical setting?",
    options: [
      "Increasing testosterone levels in hypogonadal patients",
      "Promoting tissue healing, reducing inflammation, and accelerating recovery from tendon/ligament/muscle injuries",
      "Stimulating growth hormone release from the pituitary gland",
      "Treating sexual dysfunction in both men and women",
    ],
    correctIndex: 1,
    explanation: "BPC-157 promotes tissue healing, reduces inflammation, and accelerates recovery from musculoskeletal injuries (tendons, ligaments, muscles). It also has gut-protective properties. Often stacked with TB-500 for enhanced recovery.",
  },
  {
    id: "q-pep-3",
    category: "Peptides",
    question: "What is PT-141 (Bremelanotide) and how does it differ from PDE5 inhibitors like Viagra?",
    options: [
      "PT-141 works peripherally on blood vessels; Viagra works centrally in the brain",
      "PT-141 works centrally in the brain to increase sexual desire; Viagra works peripherally on blood vessels",
      "They work through identical mechanisms but PT-141 is administered nasally",
      "PT-141 is only effective for females; Viagra is only effective for males",
    ],
    correctIndex: 1,
    explanation: "PT-141 is a melanocortin receptor agonist that works centrally in the brain to increase sexual desire and arousal in both men and women. PDE5 inhibitors like Viagra work peripherally by increasing blood flow to genital tissue. PT-141 addresses the desire component, not just the mechanical component.",
  },
  // ─── NEW PATIENT SIGN-UP ───
  {
    id: "q-001",
    category: "New Patient Sign-Up",
    question: "A new patient just paid their invoice for a new order. When should you set up their recurring payment?",
    options: [
      "The same month the invoice was paid",
      "The following month after the invoice was paid",
      "Two months after the invoice was paid",
      "Immediately upon receiving payment, same day",
    ],
    correctIndex: 1,
    explanation: "If an Invoice was paid for a new Order, you ALWAYS set the recurring for the FOLLOWING MONTH. Setting it for the current month would double-bill the patient for the month they were already invoiced.",
  },
  {
    id: "q-002",
    category: "New Patient Sign-Up",
    question: "A patient is being set up on Nandrolone for the first time and their first month was already invoiced. What recurring count do you set?",
    options: [
      "1 count",
      "2 count",
      "3 count",
      "4 count",
    ],
    correctIndex: 1,
    explanation: "Nandrolone is normally a 3-count recurring. However, if the 1st month was already invoiced, you adjust to a 2-count recurring to account for the month already charged.",
  },
  {
    id: "q-003",
    category: "New Patient Sign-Up",
    question: "After completing a new patient sign-up, what is the final step you must take?",
    options: [
      "Send the lab order to LabCorp",
      "Schedule the Physician Consult",
      "Send the New PT to the Patient Advocate for the Welcome Letter Message",
      "Set up the recurring payment",
    ],
    correctIndex: 2,
    explanation: "The final step after completing a new patient sign-up is to send the New PT to the Patient Advocate within the Pod for the 'Welcome Letter Message to PT'.",
  },
  // ─── BILLING & RECURRING ───
  {
    id: "q-004",
    category: "Billing & Recurring",
    question: "What are the correct shipping code abbreviations used in the billing system?",
    options: [
      "RS = Regular Shipping, RSI = Rush Shipping Included, CSI = Cold Storage Included",
      "RS = Required Shipping, RSI = Required Shipping Included, CSI = Cold Shipping Included",
      "RS = Retail Shipping, RSI = Retail Shipping Invoice, CSI = Customer Shipping Included",
      "RS = Refrigerated Shipping, RSI = Required Standard Invoice, CSI = Cold Shipping Invoice",
    ],
    correctIndex: 1,
    explanation: "RS = Required Shipping, RSI = Required Shipping Included, CSI = Cold Shipping Included. These codes determine how shipping is handled and billed on the invoice.",
  },
  {
    id: "q-005",
    category: "Billing & Recurring",
    question: "What exact message do you send the patient after their order has been charged and sent for processing?",
    options: [
      "'Your payment has been received and your order is confirmed.'",
      "'Your order was charged and sent for processing...'",
      "'Your prescription has been submitted to the pharmacy.'",
      "'Thank you for your payment. Your order is on its way.'",
    ],
    correctIndex: 1,
    explanation: "The exact reply is: 'Your order was charged and sent for processing...' - go back to the original PT message and reply with this exact language.",
  },
  // ─── DIAGNOSIS CODES ───
  {
    id: "q-006",
    category: "Diagnosis Codes",
    question: "A male patient is being prescribed Testosterone Cypionate. Which diagnosis codes apply?",
    options: [
      "E34.9: Hormone Disturbance; R53.83: Fatigue",
      "E29.1: Testicular Hypofunction; R53.83: Fatigue; R68.82: Decreased Libido",
      "N52.9: Erectile Dysfunction; E29.1: Testicular Hypofunction",
      "M62.50: Muscle Wasting; R53.83: Fatigue",
    ],
    correctIndex: 1,
    explanation: "For Testosterone Cypionate (Males): E29.1 Testicular Hypofunction, R53.83 Fatigue, and R68.82 Decreased Libido. Female patients use E34.9 Hormone Disturbance/Endocrine Disorder instead.",
  },
  {
    id: "q-007",
    category: "Diagnosis Codes",
    question: "A patient is being prescribed Semaglutide for weight loss. What is the correct diagnosis code?",
    options: [
      "E29.1: Testicular Hypofunction",
      "R53.83: Fatigue",
      "E66.3: Overweight",
      "M62.50: Muscle Wasting",
    ],
    correctIndex: 2,
    explanation: "E66.3: Overweight applies to all weight loss medications including Semaglutide, Oral Semaglutide, and Phentermine.",
  },
  {
    id: "q-008",
    category: "Diagnosis Codes",
    question: "Which diagnosis code applies to Nandrolone Decanoate that is UNIQUE compared to testosterone-only compounds?",
    options: [
      "E29.1: Testicular Hypofunction",
      "R53.83: Fatigue",
      "M25.50: Joint Pain",
      "R68.82: Decreased Libido",
    ],
    correctIndex: 2,
    explanation: "Nandrolone Decanoate uniquely includes M25.50: Joint Pain in addition to E29.1 and M62.50. This reflects Nandrolone's therapeutic benefit for joint restoration, which is a key selling point.",
  },
  // ─── LAB PANELS & ORDERING ───
  {
    id: "q-009",
    category: "Lab Panels & Ordering",
    question: "How old can labs be before they are no longer acceptable for starting hormone therapy?",
    options: [
      "6 months",
      "9 months",
      "12 months",
      "18 months",
    ],
    correctIndex: 2,
    explanation: "Labs must NOT be older than 12 months. If labs are older than 12 months, the patient must get new labs before proceeding with treatment.",
  },
  {
    id: "q-010",
    category: "Lab Panels & Ordering",
    question: "What is the FIRST step before sending a lab order to LabCorp?",
    options: [
      "Copy the patient's email address",
      "Invoice the patient for the labs",
      "Select the lab panel template",
      "Send the portal message",
    ],
    correctIndex: 1,
    explanation: "The first step is always to Invoice the patient for the labs. Reference: Work Instructions - Patient Invoicing and Recurring Receipts Set Up. Only after invoicing do you proceed with the lab order.",
  },
  {
    id: "q-011",
    category: "Lab Panels & Ordering",
    question: "What must be selected in the 'Bill To' section when sending a lab order electronically?",
    options: [
      "Patient",
      "Third Party",
      "Client",
      "Insurance",
    ],
    correctIndex: 2,
    explanation: "'Client' must be selected in the Bill To section. The patient's email is pasted in the 'Internal Comments to Lab' box, and then you select the orange 'Send Order' button.",
  },
  // ─── THE CONSULTATION (WHARP) ───
  {
    id: "q-012",
    category: "The Consultation (WHARP)",
    question: "What does the 'A' in WHARP stand for and what is its primary purpose?",
    options: [
      "Assess - evaluate the patient's current health status",
      "Align - confirm talking points and validate the patient's goals and research",
      "Advise - provide medical recommendations",
      "Agree - get the patient to commit to treatment",
    ],
    correctIndex: 1,
    explanation: "A = Align. You confirm talking points by repeating side effects/feelings, congratulating achievements, validating that the product can aid their goals, validating their research, and building trust through demonstrated knowledge.",
  },
  {
    id: "q-013",
    category: "The Consultation (WHARP)",
    question: "A patient wants Hormone Health treatment and does NOT have labs. What CPT code and fee applies?",
    options: [
      "CPT Code 201 - $99 (Physician Consult only)",
      "CPT Code 202 - $199 (Initial Hormone Panel + Initial Physician Consult)",
      "CPT Code 201 - $199 (Physician Consult with Labs)",
      "CPT Code 202 - $99 (Labs only)",
    ],
    correctIndex: 1,
    explanation: "CPT Code 202 = Initial Hormone Panel + Initial Physician Consult = $199. Hormone Health REQUIRES lab work. If the patient doesn't provide labs, you process them for $100 included in the $199 fee. Cognitive Function and Weight Loss do NOT require labs ($99 only).",
  },
  // ─── PATIENT PIPELINE & CRM ───
  {
    id: "q-014",
    category: "Patient Pipeline & CRM",
    question: "A patient from California wants to start Nandrolone therapy. What should you do?",
    options: [
      "Process the order normally - Nandrolone is available in all states",
      "Inform the patient that California legislation only allows Testosterone for Hormone Health - Nandrolone is not approved for CA patients",
      "Refer the patient to a different clinic",
      "Use Tailor-Made pharmacy to fulfill the Nandrolone order for CA",
    ],
    correctIndex: 1,
    explanation: "California legislation only allows treatment for Testosterone as it pertains to Hormone Health. Nandrolone is NOT approved for CA patients. Inquire about the shipping address at the beginning of the consult to avoid wasting the patient's time.",
  },
  {
    id: "q-015",
    category: "Patient Pipeline & CRM",
    question: "By how much do precursor messages increase completed consultations?",
    options: [
      "5%",
      "10%",
      "15%",
      "20%",
    ],
    correctIndex: 3,
    explanation: "Validity tests have shown that precursor messages aid in a 20% increase in 'Completed' consultations. They remind the PT of the upcoming consult and identify the area code you will be calling from.",
  },
  // ─── MEDICATIONS & DOSING ───
  {
    id: "q-016",
    category: "Medications & Dosing",
    question: "What does 'Split' mean when written on a patient's medication sticky note?",
    options: [
      "The medication is split between two pharmacies",
      "The dose is divided and administered twice per week",
      "The patient splits the cost with insurance",
      "The vial is split between two patients",
    ],
    correctIndex: 1,
    explanation: "'Split' means the medication is administered twice per week (2x/week). Example: '200mg Test Cyp, Split' = 100mg administered twice weekly.",
  },
  {
    id: "q-017",
    category: "Medications & Dosing",
    question: "What gauge needle is used to DRAW from a vial vs. ADMINISTER in the body?",
    options: [
      "Draw: 25-gauge; Administer: 21-gauge",
      "Draw: 21-gauge; Administer: 25-gauge",
      "Draw: 18-gauge; Administer: 25-gauge",
      "Draw: 25-gauge; Administer: 18-gauge",
    ],
    correctIndex: 1,
    explanation: "21-gauge is used to DRAW from a vial. 25-gauge is a finer needle used for ADMINISTERING in the body. The higher the gauge number, the skinnier the needle. Standard for IM injections is 5/8\" 25g needles.",
  },
  // ─── STICKY NOTES & TASKS ───
  {
    id: "q-018",
    category: "Sticky Notes & Tasks",
    question: "A patient is canceling their membership. What do you do to the Yellow Sticky?",
    options: [
      "Delete the sticky note entirely",
      "Change it to blue and add 'INACTIVE'",
      "Change it to red and add 'CXL'",
      "Change it to green and add 'CANCELLED'",
    ],
    correctIndex: 2,
    explanation: "Change the Yellow Sticky to RED and add 'CXL' to denote patient cancellation. This is only used when a PT wishes to stop using services and no longer be an active patient.",
  },
  // ─── CANCELLATIONS & DEVIATIONS ───
  {
    id: "q-019",
    category: "Cancellations & Deviations",
    question: "Which pharmacy do Iowa and Wisconsin patients use?",
    options: [
      "Empower Pharmacy",
      "Tailor-Made Pharmacy",
      "Revive Pharmacy",
      "Amazon Pharmacy",
    ],
    correctIndex: 2,
    explanation: "Iowa and Wisconsin patients use Revive pharmacy. California patients for Testosterone use Tailor-Made when Empower is out of stock. Amazon Pharmacy is used for ADHD medications for NC patients.",
  },
  // ─── SALES FRAMEWORK ───
  {
    id: "q-020",
    category: "Sales Framework",
    question: "During the PARTNER phase of WHARP, what key structural advantages of Kingdom should you champion?",
    options: [
      "Low prices, fast shipping, and a wide medication selection",
      "No memberships, no strings attached, pay-as-you-go mentality, and strong care and communication",
      "Board-certified physicians, FDA-approved medications, and insurance acceptance",
      "24/7 support, free lab work, and guaranteed results",
    ],
    correctIndex: 1,
    explanation: "In the PARTNER phase, champion: No memberships, no strings attached, pay-as-you-go mentality, care provided to PT, and communication provided to PT. Work on meeting their needs even if it involves pricing (in moderation).",
  },
  {
    id: "q-021",
    category: "Sales Framework",
    question: "What is the correct order of the C.L.O.S.E.R. framework?",
    options: [
      "Clarify, Label, Overview, Sell the Vacation, Explain Away Concerns, Reinforce",
      "Connect, Listen, Offer, Solve, Engage, Resolve",
      "Clarify, Listen, Overcome, Sell, Explain, Reinforce",
      "Close, Label, Open, Sell, Engage, Relate",
    ],
    correctIndex: 0,
    explanation: "C = Clarify, L = Label, O = Overview, S = Sell the Vacation, E = Explain Away Concerns, R = Reinforce. Each step builds on the previous to move the prospect from hesitation to commitment.",
  },
  // ─── OBJECTION HANDLING ───
  {
    id: "q-022",
    category: "Objection Handling",
    question: "A prospect says 'I think I just need some time to think about this.' What is the FIRST technique you should use?",
    options: [
      "Immediately offer a discount to close",
      "Use Mirroring - repeat 'Time to think about it?' and wait 4 seconds",
      "Use an Accusation Audit",
      "Ask a No-Oriented Question",
    ],
    correctIndex: 1,
    explanation: "The 'Time to Think' stall is a smoke screen. Use Mirroring FIRST to uncover the real objection. Repeat 'Time to think about it?' with an upward inflection and go silent for at least 4 seconds. The prospect will elaborate and reveal the true hesitation.",
  },
  {
    id: "q-023",
    category: "Objection Handling",
    question: "What is the key reframe when a prospect says 'I need to talk to my partner first'?",
    options: [
      "Offer to schedule a three-way call with the partner",
      "Reframe the $199 as simply gathering biological data - not a treatment commitment. Nobody needs a partner's permission to get a blood test.",
      "Agree and schedule a follow-up call for after they speak with their partner",
      "Explain that the decision is time-sensitive and the price may go up",
    ],
    correctIndex: 1,
    explanation: "Prospects use their spouse to mask uncertainty. Reframe the $199 as simply gathering biological data, not a full treatment commitment. You are not asking them to commit to a protocol - you are asking them to get a blood test.",
  },
  {
    id: "q-024",
    category: "Objection Handling",
    question: "What is a 'Counterfeit Yes' and how do you avoid triggering one?",
    options: [
      "A fake agreement that leads to a refund; avoid it by getting a written commitment",
      "An evasive reply designed to make the salesperson go away; avoid it by using No-Oriented Questions instead of pushing for 'Yes'",
      "A yes given under pressure; avoid it by giving the prospect more time",
      "A conditional yes; avoid it by removing all conditions from the offer",
    ],
    correctIndex: 1,
    explanation: "A Counterfeit Yes is an evasive reply designed to make the salesperson go away without any true commitment. It is triggered by pushing for 'Yes' too early. Avoid it by using No-Oriented Questions - saying 'No' makes the prospect feel safe and in control, which creates genuine buy-in.",
  },
  {
    id: "q-025",
    category: "Lab Panels & Ordering",
    question: "What is the lab recheck schedule after a patient starts or changes hormone therapy?",
    options: [
      "Recheck at 3 weeks, then every 3 months",
      "Recheck at 6-7 weeks, then every 6 months per protocol",
      "Recheck at 4 weeks, then annually",
      "Recheck at 8 weeks, then every 4 months",
    ],
    correctIndex: 1,
    explanation: "Labs are rechecked at the 6-7 week mark after starting or making changes to hormone therapy, then every 6 months per protocol - unless the Provider or patient requests sooner.",
  },
];
