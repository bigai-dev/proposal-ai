# Production Polish — CodeForge Proposal AI

**Date:** 2026-07-14
**Goal:** Make the demo feel like a fully running product for live workshop demos. No new paid services, no login (intentional — demo tool).

## What changes

### 1. Agency homepage (`/`)
Replace the root redirect with a real landing page: hero ("From Concept to Code — Shipped."), stats row (founded 2019, 25 people, 80+ projects), services grid with starting prices (matching `lib/prompts.ts` lore), "how we work" steps, why-us section, CTA band to `/apply`. Same slate/blue Tailwind design system, dark-mode aware.

### 2. Proposal pipeline
Status flow extends: `pending → generating → completed → sent → won | lost` (plus `failed`).
- New DB column `sent_at TEXT` (nullable).
- "Send to Client" on completed proposals opens a simulated email-compose modal (To/From/Subject/body preview). "Send" marks status `sent` + stamps `sent_at`. **No real email is sent** — simulation only, by user's choice.
- Sent proposals can be marked Won or Lost.
- PATCH whitelist grows to `proposal_content, status, sent_at`.

### 3. Dashboard upgrade
- Stat cards: Total Proposals, Est. Pipeline Value (RM, from budget-range midpoints of completed+sent), Win Rate (won/(won+lost)), Ready to Send count.
- Search box (company/contact/service) + status filter tabs.
- Row actions: View / Send / Won / Lost / Delete depending on status.
- Status badges for all seven statuses; `completed` displays as "Ready".

### 4. Seed data
`npm run seed` inserts ~12 believable proposals (Malaysian company names, varied services/budgets/outcomes, dates spread over ~4 months, template-generated proposal content — no AI calls). Seeded ids are prefixed `seed-` so `npm run seed:clear` removes only them.

### 5. Branding
Shared Header (Home / Get a Proposal / Admin) on all pages including `/apply`; richer footer with contact block matching the proposal prompt (proposals@codeforge.com.my, +60 3-2148 9500, Menara UOA Bangsar); proper page titles and a browser-tab icon.

## Non-goals
Login/auth, real email delivery, payment, multi-user, editing proposal text in-app.

## Testing
Type-check clean; live end-to-end: homepage renders, submit enquiry → AI generates → send → won, stats update, seed + clear work.
