# clairmont-website — Clairmont Advisory öffentliche Website

> Claude Code lädt diese Datei automatisch als Projekt-Kontext beim Starten im Projekt-Root.

## Was ist das?

Öffentliche Multi-Service-Consulting-Website für Clairmont Advisory. Kern-Service: Steuererklärungen für Privatpersonen DE. Dazu ~7 weitere Services: Baufinanzierung, Immobilien, Solaranlagen, Rechtsberatung, Unternehmensberatung, Global Sourcing, Payment Solutions, AI Due Diligence. 20 Pages gesamt.

Das Herzstück ist das Formular "Kostenlose Steuerprognose" — Lead-Magnet, der Einsendungen über Supabase Edge Functions an das interne Dashboard (eigener Repo: `aleksaai/clairmont-dashboard`) schickt.

## Aktueller Stand (2026-04-20)

🟡 **In Lovable-Migration.** Der Repo wurde frisch von Lovable gepullt. Sibling-Dashboard wird gleichzeitig migriert. Ziel: raus aus Lovable, rein in eigenes Supabase-Projekt "Clairmont Advisory" + Netlify-Deploy. Vollständiger 7-Phasen-Plan in `SPEC.md` + laufender Stand in `HANDOFF.md`.

**Aktuell vor Phase 2:** Warten auf Lovable-DB-Credentials von Aleksa.

## Stack

- **Vite 5** + **React 18** + **TypeScript**
- **Tailwind CSS 3** + **shadcn/ui** (komplettes Radix-Set)
- **Motion 12** (`motion/react`) — Animations bereits drin
- **React-Hook-Form + Zod** — Form-Validierung
- **React-Router v6**
- **jspdf** — Client-side PDF-Generierung
- **@supabase/supabase-js** — Backend-Client
- **Sonner** — Toasts

## Run locally

```bash
pnpm install   # oder: npm install
pnpm dev       # Startet Vite dev-server auf port 5173 (default)
```

## Env-Variablen

Aktuell (Lovable-Zeit):
- `VITE_SUPABASE_URL` — `https://hvwovrurvleityqyshqv.supabase.co` (Lovable-Supabase, wird in Phase 5 umgestellt)
- `VITE_SUPABASE_PUBLISHABLE_KEY` — Anon Key (public, OK im Repo)
- `VITE_SUPABASE_PROJECT_ID` — Project ref

Nach Phase 5 (Migration) zeigt das alles auf das neue **Clairmont Advisory** Supabase-Projekt.

**Pitfall:** `.env` ist aktuell ins Repo committed (Lovable-Pattern). In Phase 6 wird das gefixt — `.env` in `.gitignore`, `.env.example` committed.

## Supabase

- Projekt: `hvwovrurvleityqyshqv` (Lovable-managed, stirbt mit Lovable-Account)
- Migrations: 2 — beide nur für Storage-Bucket-Setup (`prognose-documents` + RLS-Policies)
- **Keine eigenen Tabellen** — Website persistiert keine Leads lokal, pusht via Webhook an Dashboard-Supabase
- Edge Functions (7): `submit-prognose-webhook`, `submit-selbstauskunft-webhook`, `submit-baufinanzierung-webhook`, `send-prognose-email`, `send-selbstauskunft-email`, `send-contact-email`, `verify-prognose-documents`

## Externe Integrationen

- **Dashboard-Supabase:** `submit-prognose-webhook` pusht Lead an `https://ixefmjnjjwntwibkytis.supabase.co/functions/v1/form-webhook` (Bearer: `Clairmont_2025`). Wird in Phase 5 auf das neue Clairmont Advisory Supabase umgestellt.
- **Make.com:** `submit-prognose-webhook` pusht parallel an `https://hook.eu2.make.com/ibv42wex7bd1vjqf87lju4iadipsht57` — aktuell unklar wessen Make-Account das ist.
- **Resend (Email):** alle `send-*-email` Functions. Sender: `noreply@tax.clairmont-advisory.com` (braucht DKIM).
- **Lovable AI Gateway:** `verify-prognose-documents` nutzt `ai.gateway.lovable.dev` mit `LOVABLE_API_KEY` für Dokumenten-KI-Check (Gemini 2.5 Flash). **Stirbt mit Lovable-Account** — muss in Phase 5 ersetzt werden.

## Deploy

Aktuell: Lovable-managed. Ziel: **Netlify** (siehe SPEC.md Phase 6).

## Wer arbeitet hier?

- **Aleksa** (Owner, GitHub: aleksaai) — non-technical, arbeitet via Claude Code
- **Marcus** (AI Engineer, acts via `/marcus` im claude-team Repo) — Migrations-Lead, Spec + Build-Plan

## Sibling-Repos

- `~/Desktop/Projects/clairmont-dashboard/` — das interne Admin-Tool, gleiche Migration. Siehe dessen `CLAUDE.md`.
- `~/Desktop/claude-team/` — AI-Team-Workspace (Marcus, Patricia, Lisa, Vincent, Emilija lebendig als Agents, plus Edge Functions + Tooling).

## Lovable-Artefakte die in Phase 6 raus müssen

- `.lovable/` Folder
- `lovable-tagger` in `package.json` devDependencies
- `.env` committed ins Repo → muss in `.gitignore`
- `ai.gateway.lovable.dev` in `supabase/functions/verify-prognose-documents/index.ts`
- README-Lovable-Boilerplate
