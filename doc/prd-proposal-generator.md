# PRD: AI-Powered Proposal Generator
## Demo Application for Vibe Coding Course

**Version:** 1.0
**Author:** Nick Lo
**Date:** March 31, 2026
**Status:** Ready for Build

---

## 1. Overview

### 1.1 What Is This?
A single-page web app that lets a fictional custom software development company — **CodeForge Solutions Sdn Bhd** — collect client inquiries through a form and instantly generate a professional PDF proposal using AI (Claude via Anthropic API).

### 1.2 Purpose
This is a **live demo** for a Vibe Coding course. The goal is to show attendees how quickly a non-developer can build a functional, AI-powered business tool using modern no/low-code-friendly stacks and prompting.

### 1.3 Demo Flow (What the Audience Sees)
1. A clean, branded inquiry form loads
2. Presenter fills in a sample client request (e.g. "I want a Grab clone")
3. Clicks "Generate Proposal"
4. AI streams a professional proposal in real-time with a typing animation
5. Presenter clicks "Download PDF" — browser print-to-PDF produces a polished document
6. Audience reaction: "Wait, that's it? That's all the code?"

---

## 2. Fictional Company Profile

> All content below is hardcoded into the system prompt. This gives the AI enough context to produce realistic, detailed proposals without any fine-tuning.

**Company Name:** CodeForge Solutions Sdn Bhd
**Tagline:** "From Concept to Code — Shipped."
**Founded:** 2019
**HQ:** Kuala Lumpur, Malaysia
**Website:** www.codeforgesolutions.com (fictional)
**Contact Email:** hello@codeforgesolutions.com

**Company Bio (for system prompt):**
CodeForge Solutions is a custom software development company based in Kuala Lumpur, Malaysia. We specialize in building mobile apps, web applications, and enterprise software for startups and SMEs across Southeast Asia. Our team of 25 engineers, designers, and project managers has delivered 80+ projects since 2019. We follow Agile methodology with 2-week sprints, and every project includes dedicated QA, CI/CD pipelines, and post-launch support.

---

## 3. Services & Pricing (Hardcoded)

| Service | Base Price (MYR) | Typical Timeline | Description |
|---|---|---|---|
| Mobile App Development | RM 80,000 | 3–5 months | Native or cross-platform (Flutter/React Native). Includes UI/UX design, API integration, App Store/Play Store submission. |
| Web Application Development | RM 60,000 | 2–4 months | Full-stack web apps. Next.js/React frontend, Node.js/Python backend, cloud deployment. |
| UI/UX Design | RM 25,000 | 3–6 weeks | User research, wireframes, high-fidelity prototypes in Figma. Up to 3 revision rounds. |
| API Development & Integration | RM 30,000 | 4–8 weeks | RESTful/GraphQL APIs, third-party integrations (payment gateways, maps, messaging). |
| Custom CRM/ERP System | RM 120,000 | 4–6 months | Tailored business management system. Includes dashboards, reporting, role-based access, and data migration. |
| MVP / Proof of Concept | RM 35,000 | 4–6 weeks | Rapid prototype to validate your idea. Core features only, ready for investor demos or user testing. |

**Additional Terms (for system prompt context):**
- All prices are estimates and may vary based on project complexity
- 50% upfront deposit, 25% at midpoint milestone, 25% upon delivery
- Includes 30 days of post-launch bug fixes
- 12-month warranty on all delivered code
- Hosting and third-party service costs are billed separately
- Prices quoted in Malaysian Ringgit (MYR)

---

## 4. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| AI | Anthropic Claude API (claude-sonnet-4-20250514) |
| PDF Output | Browser print-to-PDF (CSS @media print) |
| Deployment | Vercel |
| Theme | Dark/Light mode toggle (Tailwind dark class strategy) |

---

## 5. Application Structure

### 5.1 Pages
Single page application with two states:

**State 1: Inquiry Form**
**State 2: Proposal Output (streaming)**

### 5.2 Layout
```
┌─────────────────────────────────────────────┐
│  [CodeForge Logo]          [Dark/Light Toggle] │
├─────────────────────────────────────────────┤
│                                             │
│         STATE 1: Inquiry Form               │
│              or                              │
│         STATE 2: Proposal Output            │
│                                             │
├─────────────────────────────────────────────┤
│  © 2026 CodeForge Solutions Sdn Bhd         │
└─────────────────────────────────────────────┘
```

---

## 6. Inquiry Form Specification

### 6.1 Contact Information Section

| Field | Type | Required | Validation | Placeholder |
|---|---|---|---|---|
| Full Name | Text input | Yes | Min 2 characters | "e.g. Ahmad Razak" |
| Email Address | Email input | Yes | Valid email format | "e.g. ahmad@company.com" |
| Phone Number | Tel input | Yes | Min 8 digits | "e.g. +60 12-345 6789" |
| Company Name | Text input | Yes | Min 2 characters | "e.g. TechVenture Sdn Bhd" |

### 6.2 Project Details Section

| Field | Type | Required | Options / Placeholder |
|---|---|---|---|
| Service Required | Dropdown (select) | Yes | Mobile App Development, Web Application Development, UI/UX Design, API Development & Integration, Custom CRM/ERP System, MVP / Proof of Concept |
| Project Description | Textarea | Yes | "Describe your project idea in detail. What problem does it solve? Who are the target users? Any reference apps?" (max 1000 chars) |
| Estimated Budget | Dropdown (select) | Yes | Below RM 30,000 · RM 30,000 – 60,000 · RM 60,000 – 100,000 · RM 100,000 – 250,000 · RM 250,000+ · Not sure yet |
| Expected Timeline | Dropdown (select) | Yes | ASAP (1–2 months) · 3–4 months · 5–6 months · 6–12 months · Flexible / Not sure |

### 6.3 Form Behavior
- All fields required — submit button disabled until all fields are filled
- Basic client-side validation only (no backend validation needed for demo)
- On submit: transition to State 2 (Proposal Output)
- Include a "Generate Proposal" call-to-action button (primary color, prominent)

---

## 7. AI Integration

### 7.1 API Call
- **Endpoint:** `https://api.anthropic.com/v1/messages`
- **Model:** `claude-sonnet-4-20250514`
- **Streaming:** Enabled (for live typing effect)
- **Max Tokens:** 4096

### 7.2 System Prompt

```
You are the proposal writer for CodeForge Solutions Sdn Bhd, a custom software development company based in Kuala Lumpur, Malaysia.

Company Background:
- Founded in 2019, team of 25 engineers, designers, and project managers
- 80+ projects delivered across Southeast Asia
- Agile methodology with 2-week sprints
- Every project includes dedicated QA, CI/CD pipelines, and post-launch support

Services & Base Pricing (MYR):
- Mobile App Development: RM 80,000 (3–5 months)
- Web Application Development: RM 60,000 (2–4 months)
- UI/UX Design: RM 25,000 (3–6 weeks)
- API Development & Integration: RM 30,000 (4–8 weeks)
- Custom CRM/ERP System: RM 120,000 (4–6 months)
- MVP / Proof of Concept: RM 35,000 (4–6 weeks)

Payment Terms:
- 50% upfront deposit
- 25% at midpoint milestone
- 25% upon delivery
- 30 days post-launch bug fixes included
- 12-month code warranty
- Hosting and third-party costs billed separately

When you receive a client inquiry, generate a professional proposal with the following structure:

# PROPOSAL

## 1. Executive Summary
Brief overview of the project and how CodeForge will deliver value.

## 2. Understanding of Requirements
Restate and expand on the client's project description. Show deep understanding of their needs. Identify key features and user stories.

## 3. Proposed Solution & Approach
Technical approach, architecture overview, and technology recommendations. Explain WHY these choices fit the client's needs.

## 4. Scope of Work
Break down into phases with clear deliverables:
- Phase 1: Discovery & Planning
- Phase 2: Design (if applicable)
- Phase 3: Development
- Phase 4: Testing & QA
- Phase 5: Deployment & Launch
- Phase 6: Post-Launch Support

## 5. Timeline
Gantt-style breakdown by phase with estimated durations. Adjust based on client's stated timeline preference.

## 6. Investment
Pricing breakdown by phase. Adjust the base price based on project complexity described. Include payment schedule.

## 7. Why CodeForge?
3–4 compelling reasons to choose CodeForge. Reference track record, methodology, and post-launch support.

## 8. Next Steps
Clear call to action — schedule a discovery call, sign-off process, how to get started.

---

Rules:
- Be professional but warm and approachable
- Use the client's company name and project details throughout
- If the client's budget is below the base price for their selected service, acknowledge it diplomatically and suggest phased delivery or MVP approach
- If budget is "Not sure yet", quote the standard base price with a note that final pricing depends on scope
- Always quote in MYR (Malaysian Ringgit)
- Format with clean markdown headers and bullet points
- Keep the total proposal between 800–1200 words
- Do not fabricate specific case studies or client names
- End with: "This proposal is valid for 30 days from the date of issue."
- Include today's date and a reference number in format: CF-2026-XXXX (generate random 4 digits)
```

### 7.3 User Prompt Construction

```
New client inquiry received:

Client Name: {fullName}
Email: {email}
Phone: {phone}
Company: {companyName}

Service Requested: {selectedService}
Project Description: {projectDescription}
Estimated Budget: {selectedBudget}
Expected Timeline: {selectedTimeline}

Please generate a professional proposal for this client.
```

---

## 8. Proposal Output Page

### 8.1 Layout
```
┌─────────────────────────────────────────────┐
│  [CodeForge Logo]     [Dark/Light] [New Inquiry] │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  PROPOSAL                           │    │
│  │  Prepared for: {Company Name}       │    │
│  │  Date: March 31, 2026               │    │
│  │  Ref: CF-2026-XXXX                  │    │
│  │                                     │    │
│  │  [AI-generated content streams here │    │
│  │   with typing animation]            │    │
│  │                                     │    │
│  │  ─────────────────────────────────  │    │
│  │  CodeForge Solutions Sdn Bhd        │    │
│  │  hello@codeforgesolutions.com       │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  [← Back to Form]         [Download as PDF] │
│                                             │
└─────────────────────────────────────────────┘
```

### 8.2 Streaming Behavior
- Use Anthropic streaming API (`stream: true`)
- Render markdown as it arrives using a markdown renderer (e.g. react-markdown)
- Typing cursor animation at the end of the stream
- Show a subtle loading state before first token arrives ("Generating your proposal...")
- Once streaming completes, show "Download as PDF" button

### 8.3 PDF Output (Print-to-PDF)
- "Download as PDF" button triggers `window.print()`
- CSS `@media print` styles:
  - Hide header, footer, dark/light toggle, and action buttons
  - White background, black text (regardless of dark mode)
  - Add CodeForge letterhead/header to printed version
  - Add page footer: "CodeForge Solutions Sdn Bhd | www.codeforgesolutions.com | hello@codeforgesolutions.com"
  - Clean typography: serif or professional sans-serif font
  - Appropriate page margins (2cm all sides)
  - Page break management (avoid orphan headings)

---

## 9. Dark/Light Mode

- Toggle button in top-right corner (sun/moon icon)
- Persisted in localStorage
- Respects system preference on first load (`prefers-color-scheme`)
- Tailwind `dark:` class strategy
- Form and proposal output both support dark mode
- Print output always uses light/white theme regardless of mode

---

## 10. UI/UX Design Guidelines

### 10.1 Brand Colors (CodeForge)
| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| Primary | #2563EB (Blue 600) | #3B82F6 (Blue 500) | Buttons, links, accents |
| Background | #FFFFFF | #0F172A (Slate 900) | Page background |
| Surface | #F8FAFC (Slate 50) | #1E293B (Slate 800) | Cards, form containers |
| Text Primary | #0F172A (Slate 900) | #F1F5F9 (Slate 100) | Headings, body text |
| Text Secondary | #64748B (Slate 500) | #94A3B8 (Slate 400) | Labels, helper text |
| Border | #E2E8F0 (Slate 200) | #334155 (Slate 700) | Input borders, dividers |
| Success | #16A34A (Green 600) | #22C55E (Green 500) | Validation, success states |
| Error | #DC2626 (Red 600) | #EF4444 (Red 500) | Validation errors |

### 10.2 Typography
- **Headings:** Inter or system sans-serif, bold
- **Body:** Inter or system sans-serif, regular
- **Proposal content:** Prose-friendly sizing (16–18px body)
- **Form labels:** 14px, semi-bold, text-secondary

### 10.3 Form Design
- Single column layout, max-width 640px, centered
- Grouped sections with subtle section headers ("Contact Information", "Project Details")
- Generous padding and spacing (not cramped)
- Input focus states with primary color ring
- Dropdown selects styled consistently with text inputs
- Textarea with visible character count

### 10.4 Proposal Design
- Max-width 800px, centered
- Paper/card-like container with subtle shadow
- Clean heading hierarchy
- Bulleted lists with proper indentation
- Professional, document-like feel

---

## 11. Environment & API Key

### 11.1 Environment Variable
```
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

### 11.2 API Route (Next.js)
- Create `/api/generate-proposal/route.ts`
- Server-side API call (key never exposed to browser)
- Stream response back to client using ReadableStream
- Handle errors gracefully (show user-friendly error message, not raw API errors)

---

## 12. File Structure (Suggested)

```
/app
  /api
    /generate-proposal
      route.ts            # API route — calls Anthropic, streams response
  layout.tsx              # Root layout with dark mode provider
  page.tsx                # Main page — form + proposal output
  globals.css             # Tailwind base + print styles

/components
  InquiryForm.tsx         # The inquiry form component
  ProposalOutput.tsx      # Streaming proposal display
  ThemeToggle.tsx         # Dark/light mode toggle
  Header.tsx              # Top bar with logo + controls
  Footer.tsx              # Simple footer

/lib
  prompts.ts              # System prompt + user prompt builder
  constants.ts            # Services list, budget options, timeline options

/public
  codeforge-logo.svg      # Placeholder logo (or text-based)
```

---

## 13. Demo Script (Suggested Walkthrough)

> For the presenter to follow during the live course demo.

**Step 1 — Show the Form (30 sec)**
"Here's a simple inquiry form for a software company. Name, email, phone, company, what service they want, describe the project, budget, timeline. That's it."

**Step 2 — Fill It In (30 sec)**
Fill with sample data:
- Name: Sarah Chen
- Email: sarah@techventure.com
- Phone: +60 12-987 6543
- Company: TechVenture Sdn Bhd
- Service: Mobile App Development
- Description: "We want to build a Grab-like ride-hailing app for our internal fleet of 500 delivery riders. Need real-time tracking, driver/rider matching, in-app payments via FPX and credit card, and a driver management dashboard."
- Budget: RM 100,000 – 250,000
- Timeline: 5–6 months

**Step 3 — Generate (60 sec)**
Click "Generate Proposal." Watch it stream in real-time. Point out how the AI understood the requirements, matched them to the right service, proposed a phased approach, and quoted a realistic price.

**Step 4 — Download PDF (15 sec)**
Click "Download as PDF." Show the clean, print-formatted output. "That's a client-ready proposal, generated in under a minute."

**Step 5 — The Reveal (30 sec)**
"This entire app — form, AI integration, PDF output, dark mode — was built in [X] hours using vibe coding. Let me show you how."

---

## 14. Out of Scope (for this demo)

- Backend database / saving submissions
- User authentication
- Email sending (no auto-email of proposals)
- Real payment integration
- Multiple language support
- Edit/revise proposal workflow
- Template selection
- File upload (attachments)
- Analytics or tracking

---

## 15. Success Criteria

The demo succeeds if:
1. The form loads cleanly with no errors
2. Form validation works (cannot submit empty fields)
3. AI generates a coherent, professional proposal that references the actual form inputs
4. Streaming animation is visible and smooth
5. PDF output is clean and presentable
6. Dark/light toggle works
7. Total audience experience from form fill to PDF download takes under 2 minutes
8. The audience believes this could be deployed to a real business tomorrow

---

*End of PRD v1.0*
