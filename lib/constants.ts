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
