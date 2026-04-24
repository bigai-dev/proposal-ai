# CodeForge Proposal AI

An AI-powered proposal generator built for the **Vibe Coding workshop**. A fictional
software agency ("CodeForge Solutions Sdn Bhd") collects project enquiries, and the
AI writes a full, formatted proposal in the background.

Built with **Next.js 16**, **Tailwind v4**, **Turso (libSQL)**, and a
BytePlus Ark LLM (OpenAI-compatible).

---

## What you get

- `/apply` — a public enquiry form (name, company, service, budget, timeline, project description)
- `/dashboard` — a list of every submitted proposal, with status, email, view, and delete actions
- `/dashboard/[id]` — the full, rendered Markdown proposal with a **Download as PDF** button (browser print) and an **Email Client** button (pre-filled `mailto:`)
- Dark / light mode toggle with `localStorage` persistence
- Background proposal generation using `next/server`'s `after()` hook — the form returns instantly, the AI writes the proposal after the response is sent

---

## Setup (5 minutes)

### 1. Prerequisites

- **Node.js 20+** and **npm**
- A **Turso** account — free tier is fine (https://turso.tech)
- A **BytePlus Ark** API key (https://console.byteplus.com) — or swap to any OpenAI-compatible provider (see "Swapping the LLM" below)

### 2. Clone and install

```bash
git clone <this-repo-url>
cd proposal-ai
npm install
```

### 3. Create your Turso database

Install the Turso CLI (https://docs.turso.tech/cli/installation), then:

```bash
turso auth login
turso db create proposal-generator
turso db show proposal-generator --url        # copy the libsql:// URL
turso db tokens create proposal-generator     # copy the auth token
```

Create the `proposals` table:

```bash
turso db shell proposal-generator
```

```sql
CREATE TABLE proposals (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT NOT NULL,
  service TEXT NOT NULL,
  project_description TEXT NOT NULL,
  budget TEXT NOT NULL,
  timeline TEXT NOT NULL,
  proposal_content TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
.quit
```

### 4. Add your environment variables

Copy `.env.example` to `.env.local` and fill in the three values:

```bash
cp .env.example .env.local
```

```
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token
ARK_API_KEY=your-byteplus-ark-api-key
```

> `.env.local` is gitignored — your keys stay on your machine.

### 5. Run it

```bash
npm run dev
```

Open http://localhost:3000. You'll be redirected to `/apply`. Submit the form,
then visit `/dashboard` to watch the proposal status flip from **pending** →
**generating** → **completed**.

---

## How it works

```
┌────────────┐   POST /api/proposals   ┌───────────────┐
│ /apply     │ ─────────────────────▶  │ insert row    │
│ (form)     │                         │ status=pending│
└────────────┘                         └───────┬───────┘
                                               │ after() responds to client
                                               ▼
                                  ┌────────────────────────┐
                                  │ call BytePlus Ark LLM  │
                                  │ stream → full text     │
                                  └───────┬────────────────┘
                                          ▼
                                  ┌────────────────────────┐
                                  │ update row              │
                                  │ status=completed       │
                                  └────────────────────────┘
```

Key files:

- [app/apply/page.tsx](app/apply/page.tsx) — the enquiry form page
- [app/dashboard/page.tsx](app/dashboard/page.tsx) — the list view
- [app/dashboard/[id]/page.tsx](app/dashboard/[id]/page.tsx) — the proposal view
- [app/api/proposals/route.ts](app/api/proposals/route.ts) — POST (create + trigger generation) and GET (list)
- [app/api/proposals/[id]/route.ts](app/api/proposals/[id]/route.ts) — GET, PATCH, DELETE by id
- [lib/prompts.ts](lib/prompts.ts) — the system + user prompt sent to the LLM
- [lib/constants.ts](lib/constants.ts) — dropdown options and TypeScript types
- [lib/turso.ts](lib/turso.ts) — the libSQL client

---

## What to modify next (prompts to try in Claude Code)

This is a workshop project — the whole point is to make it your own. Open this
folder in Claude Code and try these prompts:

**Rebrand it as your own agency:**
```
Rebrand this app as "Acme Digital" — a marketing agency in Singapore.
Update the logo text, footer, prompt (lib/prompts.ts), services, and pricing
to match a typical digital marketing firm (SEO, paid ads, content, social).
Prices in SGD.
```

**Change the services & pricing:**
```
Update lib/constants.ts and lib/prompts.ts to offer these services instead:
- Interior Design Consultation (RM 5,000)
- Full Home Renovation (RM 80,000+)
- Commercial Fit-out (RM 150,000+)
Also update the budget ranges to match.
```

**Swap the LLM:**
```
Switch from BytePlus Ark to OpenAI GPT-4o. Use the existing `openai` package —
just remove the baseURL and change the model name. Put OPENAI_API_KEY in
.env.example.
```
(or Anthropic Claude, Google Gemini, a local Ollama server, etc.)

**Add email notifications:**
```
When a proposal finishes generating, send an email to the client using Resend
(https://resend.com). Add RESEND_API_KEY to env. Attach the rendered proposal
as a PDF or include it inline.
```

**Add authentication:**
```
Put the /dashboard routes behind auth using Clerk (https://clerk.com).
Only logged-in users should be able to view or delete proposals. /apply
stays public.
```

**Polish the proposal:**
```
In lib/prompts.ts, tell the LLM to include a risks section, a team-bio section,
and 3 recent (fake but plausible) case studies relevant to the client's industry.
```

**Add analytics:**
```
On the dashboard, show: total proposals, conversion rate (completed / total),
average budget, and a chart of proposals per week. Use Recharts.
```

---

## Tech stack

| Layer      | Choice                                       |
|------------|----------------------------------------------|
| Framework  | Next.js 16 (App Router, Turbopack)           |
| Language   | TypeScript                                   |
| Styling    | Tailwind CSS v4                              |
| Database   | Turso (libSQL / SQLite at the edge)          |
| LLM        | BytePlus Ark (OpenAI-compatible API)         |
| Markdown   | react-markdown + remark-gfm                  |
| PDF export | Browser print-to-PDF (CSS `@media print`)    |

---

## Deploying

The easiest path is **Vercel** — push to GitHub, import the repo, and set the
same three env vars in the Vercel dashboard. It just works.

---

## License

MIT — do whatever you want with it.
