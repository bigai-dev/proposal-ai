// Fills the dashboard with believable proposal history for demos.
//   npm run seed        -> insert demo proposals (ids prefixed "seed-")
//   npm run seed:clear  -> remove only the seeded ones
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createClient } from "@libsql/client";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const env = readFileSync(join(root, ".env.local"), "utf8");
const get = (k) => env.match(new RegExp(`^${k}=(.*)$`, "m"))?.[1]?.trim();

const turso = createClient({
  url: get("TURSO_DATABASE_URL"),
  authToken: get("TURSO_AUTH_TOKEN"),
});

const PRICES = {
  "Mobile App Development": 80000,
  "Web Application Development": 60000,
  "UI/UX Design": 25000,
  "API Development & Integration": 30000,
  "Custom CRM/ERP System": 120000,
  "MVP / Proof of Concept": 35000,
};

// [company, contact, email, service, budget, timeline, description, status, daysAgo]
const SEEDS = [
  ["Nusantara Logistics Sdn Bhd", "Farid Hamzah", "farid@nusantaralogistics.my", "Custom CRM/ERP System", "RM 100,000 - 250,000", "5-6 months", "Fleet and delivery management system for 120 trucks across Peninsular Malaysia, with driver mobile app and customer tracking portal.", "won", 118],
  ["Klinik Sejahtera Group", "Dr. Michelle Tan", "michelle@kliniksejahtera.com", "Web Application Development", "RM 60,000 - 100,000", "3-4 months", "Patient appointment booking and queue management system for our chain of 8 clinics in the Klang Valley.", "won", 104],
  ["Borneo Fresh Trading", "Jackson Liew", "jackson@borneofresh.my", "MVP / Proof of Concept", "RM 30,000 - 60,000", "ASAP (1-2 months)", "B2B marketplace connecting Sabah vegetable farmers directly with restaurants in KK, starting with order and delivery scheduling.", "won", 89],
  ["Kedai Kopi Heritage", "Adrian Yap", "adrian@kopiheritage.my", "Mobile App Development", "RM 60,000 - 100,000", "3-4 months", "Loyalty and pre-order app for our 15 kopitiam outlets, with e-wallet integration and franchise reporting.", "won", 47],
  ["MYTutor Academy", "Priya Subramaniam", "priya@mytutor.edu.my", "Web Application Development", "RM 30,000 - 60,000", "3-4 months", "Online tuition platform with live classes, homework submission, and parent progress reports for secondary school students.", "lost", 95],
  ["Sutera Property Ventures", "Danish Ibrahim", "danish@suteraproperty.my", "UI/UX Design", "Below RM 30,000", "ASAP (1-2 months)", "Redesign of our property listing website and sales gallery touchscreen kiosk interface.", "lost", 71],
  ["PerakAgro Cooperative", "Halim Yusof", "halim@perakagro.coop", "API Development & Integration", "RM 30,000 - 60,000", "3-4 months", "Integrate our palm oil weighbridge system with accounting software and government reporting portals.", "sent", 12],
  ["UrbanFit Studios", "Carmen Chong", "carmen@urbanfit.my", "Mobile App Development", "RM 60,000 - 100,000", "5-6 months", "Class booking and membership app for our gym chain, with wearable integration and corporate wellness packages.", "sent", 8],
  ["Selangor Halal Foods", "Amirul Bakri", "amirul@selangorhalal.com.my", "Custom CRM/ERP System", "RM 100,000 - 250,000", "6-12 months", "End-to-end manufacturing ERP covering halal certification tracking, production batches, and distributor orders.", "sent", 5],
  ["TechVenture Capital", "Serena Wong", "serena@techventure.my", "MVP / Proof of Concept", "RM 30,000 - 60,000", "ASAP (1-2 months)", "Deal-flow tracking tool for our investment team with founder submission portal and automated screening.", "completed", 3],
  ["Pantai Resort Collection", "Rizal Mahmud", "rizal@pantairesorts.my", "Web Application Development", "RM 60,000 - 100,000", "3-4 months", "Direct booking engine for our 5 island resorts with seasonal pricing, transfers, and activity add-ons.", "completed", 2],
  ["GoCargo Express", "Vivian Ng", "vivian@gocargo.my", "API Development & Integration", "Below RM 30,000", "ASAP (1-2 months)", "Connect our courier booking system with Shopee, Lazada, and TikTok Shop seller platforms.", "completed", 1],
];

function fmtRM(n) {
  return `RM ${n.toLocaleString("en-MY")}`;
}

function proposalMarkdown(s) {
  const [company, contact, , service, budget, timeline, description, , daysAgo] = s;
  const base = PRICES[service];
  const discovery = Math.round(base * 0.1);
  const design = Math.round(base * 0.18);
  const dev = Math.round(base * 0.6);
  const launch = base - discovery - design - dev;
  const date = new Date(Date.now() - daysAgo * 86400000).toLocaleDateString("en-MY", {
    day: "numeric", month: "long", year: "numeric",
  });
  const ref = `CF-2026-${String(1000 + Math.floor(Math.random() * 9000))}`;

  return `**Date:** ${date}

**Reference:** ${ref}

**Prepared for:** ${contact}, ${company}

**Prepared by:** CodeForge Solutions Sdn Bhd

## 1. Executive Summary

Thank you for considering CodeForge Solutions for your ${service.toLowerCase()} project. ${company} needs ${description.charAt(0).toLowerCase() + description.slice(1)} Our team of 25 engineers and designers has delivered over 80 projects across Southeast Asia, and we are confident we can deliver this within your ${timeline.toLowerCase()} timeline.

We propose a phased delivery beginning with a structured discovery, so that scope, priorities, and success metrics are agreed before a single line of code is written.

---

## 2. Understanding of Requirements

### Core Features
- ${description}
- Role-based access for your team and administrators
- Reporting dashboard with exportable summaries
- Secure hosting with daily backups

### Key User Stories
- As a customer, I can complete my main task in under two minutes
- As a manager, I can see live operational status at a glance
- As an administrator, I can manage users and permissions without vendor help
- As a finance user, I can export data to our accounting workflow

---

## 3. Proposed Solution & Approach

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React / Next.js | Fast, responsive interface |
| Backend | Node.js API | Business logic and integrations |
| Database | PostgreSQL | Reliable relational data store |
| Hosting | Cloud (SEA region) | Low latency for Malaysian users |

### Architecture Highlights
- Modular services so features can evolve independently
- CI/CD pipeline with automated tests on every release
- Audit logging for all sensitive operations

---

## 4. Scope of Work

### Phase 1: Discovery & Planning (2 weeks)
- Stakeholder workshops and requirement sign-off
- Technical architecture document

### Phase 2: Design (3 weeks)
- UX flows and clickable prototype
- Two revision rounds included

### Phase 3: Development (8 weeks)
- Sprint-based build with fortnightly demos
- Dedicated QA throughout

### Phase 4: Launch & Support (2 weeks)
- UAT, deployment, and team training
- 30 days post-launch bug fixes

---

## 5. Timeline

| Phase | Duration | Weeks |
|-------|----------|-------|
| Discovery & Planning | 2 weeks | 1-2 |
| Design | 3 weeks | 3-5 |
| Development | 8 weeks | 6-13 |
| Launch & Support | 2 weeks | 14-15 |
| **Total** | **15 weeks** | |

---

## 6. Investment

### Project Pricing

| Phase | Investment (MYR) |
|-------|-----------------|
| Discovery & Planning | ${fmtRM(discovery)} |
| Design | ${fmtRM(design)} |
| Development | ${fmtRM(dev)} |
| Launch & Support | ${fmtRM(launch)} |
| **Total Project Investment** | **${fmtRM(base)}** |

### Payment Schedule

| Milestone | Amount | When |
|-----------|--------|------|
| Contract Signing | ${fmtRM(base * 0.5)} (50%) | Upon signing |
| Midpoint | ${fmtRM(base * 0.25)} (25%) | Week 8 |
| Final Delivery | ${fmtRM(base * 0.25)} (25%) | Upon acceptance |

> **Note:** Third-party costs (hosting, API fees, app store fees) are billed separately.

### Included Services
- 30 days post-launch bug fixes
- 12-month code warranty
- Deployment, documentation, and handover training

---

## 7. Why CodeForge?

- **Proven Track Record** - 80+ delivered projects across Southeast Asia since 2019.
- **Technical Excellence** - Dedicated QA and CI/CD pipelines on every engagement.
- **Transparent Pricing** - Published base prices; no surprise line items.
- **You Own Everything** - Full source code and documentation handover.

---

## 8. Next Steps

1. **Schedule Discovery Call** - A 45-minute call to walk through this proposal.
2. **Technical Review** - We refine scope and pricing with your team.
3. **Contract Finalization** - Kickoff within one week of signing.

---

*This proposal is valid for 30 days from the date of issue.*

**Contact Information:**

**CodeForge Solutions Sdn Bhd**

Email: proposals@codeforge.com.my

Phone: +60 3-2148 9500

Address: Level 15, Menara UOA Bangsar, Kuala Lumpur`;
}

async function clear() {
  const r = await turso.execute("DELETE FROM proposals WHERE id LIKE 'seed-%'");
  console.log(`Removed ${r.rowsAffected} seeded proposals.`);
}

async function seed() {
  await clear(); // idempotent: re-running replaces old seeds
  for (let i = 0; i < SEEDS.length; i++) {
    const s = SEEDS[i];
    const [company, contact, email, service, budget, timeline, description, status, daysAgo] = s;
    const created = new Date(Date.now() - daysAgo * 86400000);
    // sent 1-3 days after creation for sent/won/lost
    const sentAt = ["sent", "won", "lost"].includes(status)
      ? new Date(created.getTime() + (1 + Math.floor(Math.random() * 3)) * 86400000).toISOString()
      : null;
    const phone = `+60 1${2 + (i % 7)}-${300 + i} ${4000 + i * 137}`;

    await turso.execute({
      sql: `INSERT INTO proposals (id, full_name, email, phone, company_name, service, project_description, budget, timeline, proposal_content, status, created_at, sent_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        `seed-${i + 1}-${crypto.randomUUID().slice(0, 8)}`,
        contact, email, phone, company, service, description, budget, timeline,
        proposalMarkdown(s), status,
        created.toISOString().replace("T", " ").slice(0, 19),
        sentAt,
      ],
    });
    console.log(`  + ${company} (${status})`);
  }
  console.log(`Seeded ${SEEDS.length} proposals.`);
}

if (process.argv.includes("--clear")) {
  await clear();
} else {
  await seed();
}
