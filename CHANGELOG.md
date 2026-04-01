# Proposal Generator - Changelog

**App:** CodeForge Solutions AI Proposal Generator
**Live URL:** https://proposal-ai-rosy-blush.vercel.app
**Built for:** Vibe Coding Course Demo
**Date:** March 31, 2026

---

## What Was Built

A fully functional AI-powered proposal generator for a fictional software company (CodeForge Solutions Sdn Bhd). Clients fill in a project inquiry form, and the app instantly generates a professional, well-formatted proposal using Claude AI - complete with pricing tables, timelines, and payment schedules.

---

## Features

### Application Form (`/apply`)
- Clean, branded inquiry form with 8 fields (name, email, phone, company, service type, project description, budget range, timeline)
- All fields validated before submission
- Character counter on project description (max 1000)
- Standalone public page - no backend navigation visible to applicants

### AI Proposal Generation
- Powered by Claude AI (Anthropic API) with real-time streaming
- Proposals include 8 structured sections: Executive Summary, Requirements, Solution & Approach, Scope of Work, Timeline, Investment, Why CodeForge, and Next Steps
- Properly formatted with markdown tables for pricing, timeline, and tech stack
- AI adapts to context - handles budget mismatches diplomatically (suggests MVP approach), adjusts for "not sure yet" budgets, and tailors proposals to each industry
- Each proposal gets a unique reference number (CF-2026-XXXX)
- CodeForge logo and tagline displayed on every proposal

### PDF Download
- "Download as PDF" button triggers browser print-to-PDF
- Print-optimized layout with CodeForge letterhead, clean typography, and page footer
- All UI chrome (buttons, navigation) hidden in print view

### Email Client
- "Email Client" button opens a pre-filled email draft addressed to the client
- Subject line and body auto-populated with proposal details

### Project Dashboard (`/dashboard`)
- Backend view showing all submitted proposals in a table
- Columns: Company, Service, Budget, Status, Date, Actions
- Action buttons per row: View, Email, Delete
- Status badges (completed/generating/failed)
- Click "View" to see the full proposal with all formatting
- Mobile responsive - switches to card layout on small screens

### Dark/Light Mode
- Toggle between dark and light themes
- Persists across page refreshes (saved to localStorage)
- Respects system preference on first visit

### Data Persistence
- All proposals saved to Supabase (PostgreSQL)
- Proposals saved in two steps: inquiry data saved on submit, proposal content saved after AI generation completes
- Dashboard reads from database in real-time

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| AI | Anthropic Claude API (claude-sonnet-4-0) |
| Database | Supabase (PostgreSQL) |
| Markdown | react-markdown + remark-gfm |
| PDF | Browser print-to-PDF (CSS @media print) |
| Hosting | Vercel |

---

## Routes

| Page | URL | Description |
|------|-----|-------------|
| Application Form | `/apply` | Public-facing inquiry form |
| Project Dashboard | `/dashboard` | Backend - list all proposals |
| Proposal View | `/dashboard/[id]` | View individual proposal |

---

## Test Scenarios Completed

Three different proposals were generated and verified end-to-end:

1. **MediSync Health Sdn Bhd** - Healthcare patient portal (Web App, RM 60-100k, 3-4 months) - AI addressed PDPA compliance and multi-clinic operations
2. **Warung Bestari Holdings Sdn Bhd** - F&B restaurant chain CRM/ERP (Below RM 30k budget for a RM 120k service) - AI diplomatically suggested MVP approach within budget
3. **IlmuPath Education Sdn Bhd** - AI tutoring platform MVP (Budget: Not sure yet, Timeline: Flexible) - AI quoted standard base price and framed for investor pitch at MAGIC accelerator
