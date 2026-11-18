export const SERVICES = [
  "Mobile App Development",
  "Web Application Development",
  "UI/UX Design",
  "API Development & Integration",
  "Custom CRM/ERP System",
  "MVP / Proof of Concept",
] as const;

export const BUDGETS = [
  "Below RM 30,000",
  "RM 30,000 - 60,000",
  "RM 60,000 - 100,000",
  "RM 100,000 - 250,000",
  "RM 250,000+",
  "Not sure yet",
] as const;

export const TIMELINES = [
  "ASAP (1-2 months)",
  "3-4 months",
  "5-6 months",
  "6-12 months",
  "Flexible / Not sure",
] as const;

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  service: string;
  projectDescription: string;
  budget: string;
  timeline: string;
}

export type ProposalStatus =
  | "pending"
  | "generating"
  | "completed"
  | "sent"
  | "won"
  | "lost"
  | "failed";

export interface Proposal {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  service: string;
  project_description: string;
  budget: string;
  timeline: string;
  proposal_content: string;
  status: ProposalStatus;
  created_at: string;
  sent_at: string | null;
}

export const STATUS_LABELS: Record<ProposalStatus, string> = {
  pending: "Queued",
  generating: "Generating",
  completed: "Ready",
  sent: "Sent",
  won: "Won",
  lost: "Lost",
  failed: "Failed",
};

// Midpoint estimates used for the dashboard's pipeline value (MYR)
export const BUDGET_VALUES: Record<string, number> = {
  "Below RM 30,000": 25000,
  "RM 30,000 - 60,000": 45000,
  "RM 60,000 - 100,000": 80000,
  "RM 100,000 - 250,000": 175000,
  "RM 250,000+": 300000,
  "Not sure yet": 60000,
};

export const SERVICE_DETAILS: {
  name: (typeof SERVICES)[number];
  price: string;
  duration: string;
  blurb: string;
}[] = [
  {
    name: "Mobile App Development",
    price: "RM 80,000",
    duration: "3-5 months",
    blurb: "Native-quality iOS and Android apps, from onboarding to app store launch.",
  },
  {
    name: "Web Application Development",
    price: "RM 60,000",
    duration: "2-4 months",
    blurb: "Fast, secure web apps and customer portals built on modern frameworks.",
  },
  {
    name: "UI/UX Design",
    price: "RM 25,000",
    duration: "3-6 weeks",
    blurb: "Research-driven interface design that your users understand instantly.",
  },
  {
    name: "API Development & Integration",
    price: "RM 30,000",
    duration: "4-8 weeks",
    blurb: "Connect your systems — payments, logistics, accounting — into one flow.",
  },
  {
    name: "Custom CRM/ERP System",
    price: "RM 120,000",
    duration: "4-6 months",
    blurb: "Purpose-built operations software that fits how your business actually runs.",
  },
  {
    name: "MVP / Proof of Concept",
    price: "RM 35,000",
    duration: "4-6 weeks",
    blurb: "Validate your idea with a working product in front of real users, fast.",
  },
];
