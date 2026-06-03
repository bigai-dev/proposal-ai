# CodeForge Proposal AI

An AI-powered proposal generator that turns a simple client enquiry form into a complete, professionally formatted project proposal.

Built for a fictional software agency ("CodeForge Solutions Sdn Bhd"), this app collects project enquiries through a public form and uses an LLM to write a full, structured proposal in the background. It's a sales-automation demo aimed at agencies and developers who want to see how AI can draft client-ready documents end to end.

## Features

- **Public enquiry form** (`/apply`) capturing name, email, phone, company, service, project description, budget, and timeline.
- **AI proposal writing** — each submission triggers an LLM that produces a multi-section Markdown proposal (executive summary, scope, timeline, pricing tables, payment schedule, and next steps).
- **Background generation** using Next.js `after()` — the form responds instantly while the proposal is written after the response is sent, with status flowing from `pending` → `generating` → `completed` (or `failed` on error).
- **Proposals dashboard** (`/dashboard`) listing every submission, with view and delete actions.
- **Full proposal view** (`/dashboard/[id]`) rendering the Markdown proposal (with GitHub-flavored Markdown tables), a status badge, a **Download as PDF** button (browser print), and an **Email Client** button (pre-filled `mailto:` link).
- **Dark / light mode toggle** for the interface.
- **REST API** under `/api/proposals` for creating, listing, fetching, updating, and deleting proposals.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **UI:** React 19
- **Styling:** Tailwind CSS v4 (PostCSS)
- **Database:** Turso / libSQL (`@libsql/client`)
- **AI provider:** BytePlus Ark, called through the OpenAI-compatible `openai` SDK
- **Markdown rendering:** react-markdown + remark-gfm

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- A Turso (libSQL) database — free tier is fine
- A BytePlus Ark API key (or any OpenAI-compatible provider)

### Installation

```bash
npm install
```

### Database Setup

Create a `proposals` table in your Turso database:

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
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|----------|-------------|
| `TURSO_DATABASE_URL` | Connection URL for your Turso / libSQL database |
| `TURSO_AUTH_TOKEN` | Auth token for the Turso database |
| `ARK_API_KEY` | API key for the BytePlus Ark LLM (OpenAI-compatible) |

`.env.local` is gitignored, so your keys stay on your machine.

### Running Locally

```bash
npm run dev
```

Then open http://localhost:3000 in your browser. You'll be redirected to `/apply`. Submit the form, then visit `/dashboard` to watch the proposal status update as the AI writes it.

## Project Structure

- `app/` — Next.js App Router pages and API routes
  - `app/apply/` — the public enquiry form page
  - `app/dashboard/` — the proposals list and the full proposal view (`[id]`)
  - `app/api/proposals/` — REST endpoints (create/list, and get/update/delete by id)
  - `app/page.tsx` — redirects the root to `/apply`
- `components/` — shared UI: Header, Footer, InquiryForm, ThemeToggle
- `lib/` — application logic
  - `lib/prompts.ts` — the system and user prompts sent to the LLM
  - `lib/constants.ts` — service/budget/timeline options and TypeScript types
  - `lib/turso.ts` — the libSQL client

## Notes

This project was built as a demo for the Vibe Coding workshop. The agency, pricing, and contact details are fictional and meant to be customized — open the folder in Claude Code and adapt the branding, services, prompts, or AI provider to make it your own.
