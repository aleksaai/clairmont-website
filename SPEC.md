# SPEC — clairmont-website (Lovable-Migration)

**Gestartet:** 2026-04-20
**Owner (technisch):** Marcus
**Owner (Business):** Aleksa für Kunde Clairmont Advisory

## Ziel dieser SPEC

Diese Datei beschreibt die **Migration** von Lovable auf eigenes Hosting — keine neuen Features. Sauberer 1:1-Umzug, dann später optimieren.

## User / Stakeholder

| Wer | Interesse |
|---|---|
| **Clairmont-Lead (Privatperson DE)** | Schnell einschätzen ob eine Steuererklärung Geld bringt + ggf. Service buchen |
| **Clairmont-Team (Sachbearbeiter)** | Saubere Lead-Einsendungen im internen Dashboard kriegen, alle Dokumente + Daten strukturiert |
| **Aleksa** | Kontrolle über Hosting + Supabase + Domain zurückgewinnen bevor Lovable-Account gelöscht wird |

## Core function

Eine Multi-Service-Consulting-Website mit 20 Pages. Zentrales Element: Formular "Kostenlose Steuerprognose" (mehrstufig, umfangreich — persönliche Daten, Familie, Kinder, Beruf, Einkommen, Versicherungen, Immobilien, Dokument-Uploads). Ziel: Lead-Generierung für das Clairmont-Sales-Team.

## Aktuelle Pages (20)

Home (`Index.tsx`), Kontakt, Impressum, Datenschutz, Karriere, NotFound

Services:
- Steuerberatung, SteueroptimierungArbeitnehmer
- Prognose (das eigentliche Formular)
- Selbstauskunft
- BaufinanzierungSelbstauskunft, Bauprojekte, Immobilien, Solaranlagen
- Unternehmensberatung, Rechtsberatung
- AIDueDiligence
- GlobalSourcing, PaymentSolutions, CryptoUpload

## Daten-Fluss (aktuell)

1. User öffnet `/prognose` → Multi-Step-Form
2. User füllt aus (20+ Felder über mehrere Steps), lädt Files hoch
3. Submit → POST an `submit-prognose-webhook` Edge Function
4. Edge Function:
   - Uploads Files in Storage-Bucket `prognose-documents` (per Kategorie-Folder)
   - Generiert signierte URLs (31536000 Sek = 1 Jahr Gültigkeit)
   - POSTet JSON-Payload an Make.com-Hook (`ibv42wex7bd1vjqf87lju4iadipsht57`)
   - Generiert PDF (client-side mit `pdf-lib`)
   - POSTet kompletten Payload + PDF (base64) an Dashboard-Webhook mit Bearer `Clairmont_2025`
5. Parallel: `send-prognose-email` schickt HTML-Email mit Zusammenfassung + Download-Links an `service@clairmont-advisory.com`

## Externe APIs

- **Supabase** (Storage + Edge Functions + Auth für Service-Role)
- **Stripe** — nein, nicht in diesem Repo. Nur im Dashboard.
- **Resend** (Email-Versand) — API-Key als Supabase Secret
- **Make.com** — Webhook (externer Fluss)
- **Dashboard-Supabase** — Bearer-Token-Webhook (interner Partner-Fluss)
- **Lovable AI Gateway** (nur `verify-prognose-documents`) — muss ersetzt werden

## Migrations-Plan (7 Phasen — identisch mit Dashboard)

### Phase 1: Prep & Access
- Aleksa liefert: Lovable-Website-Supabase-Credentials (Service-Role-Key + DB-Password), Resend-API-Key, DNS-Zugang
- Stripe-Dashboard-Zugang bestätigen
- Marcus linkt Supabase CLI an Clairmont Advisory

### Phase 2: Schema + Edge Functions
- `supabase db push` auf Clairmont Advisory (2 Migrations: Storage-Bucket + RLS-Policies)
- `supabase functions deploy` für alle 7 Website-Functions
- Secrets setzen: `RESEND_API_KEY`, `FORM_WEBHOOK_SECRET`, `LOVABLE_API_KEY`-Ersatz

### Phase 3: Data-Migration
- Storage-Bucket `prognose-documents` von Lovable-Website-Supabase rüberziehen (Signed-URL-Generierung + Re-Upload oder direkt via Supabase-Tool)
- Auth-User gibt es in diesem Projekt nicht (keine `auth.users`, nur Service-Role)

### Phase 4: Stripe-Cutover
- Nicht in diesem Repo — Stripe wird nur vom Dashboard bedient

### Phase 5: Code-Switch
- `.env` auf neue Supabase-URL + Keys umstellen
- `submit-prognose-webhook` Dashboard-Webhook-URL auf neue `form-webhook`-URL umbiegen (oder eliminieren wenn selbes Supabase)
- `verify-prognose-documents` Lovable-AI-Gateway ersetzen:
  - Option A: direkter Gemini-API-Call (`GOOGLE_GEMINI_API_KEY` als Secret)
  - Option B: Claude Haiku via Anthropic-API
  - Option C: Feature raus (wenn nicht kritisch für Live-Betrieb)

### Phase 6: Repo-Cleanup + Netlify-Deploy
- `.lovable/` Folder löschen
- `lovable-tagger` aus `package.json` + `vite.config.ts`
- `.env` in `.gitignore`, `.env.example` committed
- README-Boilerplate ersetzen durch echte Projekt-Docs
- Netlify-Site anlegen, GitHub-Integration, Auto-Deploy auf `main`
- DNS: `clairmontadvisory.com` bzw. aktuelle Domain auf Netlify umbiegen
- Verify: alle 20 Pages live, Formular funktioniert, Mails kommen an

### Phase 7: Lovable disconnecten
- Lovable-Projekt archivieren nachdem Netlify-Deploy 24-48h stabil läuft

## Nicht im Scope

- Design-Refresh
- Copy-Änderungen
- Neue Pages
- Neue Features
- Performance-Optimierung (Bundle-Size, Lazy-Load — kommt später)
- SEO-Audit (kommt später)

## Akzeptanz

- [ ] Alle 20 Pages auf Netlify live
- [ ] Formular `/prognose` Ende-zu-Ende: Submit → Storage-Upload → Dashboard-Empfang → Resend-Email → alles wie vorher
- [ ] Domain zeigt auf Netlify, alte Lovable-URL nicht mehr erreichbar
- [ ] Kein `.env` im Repo, `.env.example` als Template
- [ ] Keine `lovable-*` Dependencies
- [ ] `verify-prognose-documents` läuft auf non-Lovable-AI oder ist sauber entfernt
- [ ] Lovable-Projekt archiviert / Account kann gelöscht werden

## Constraints

- **9 aktive Stripe-Subscriptions im Dashboard** → Cutover zwischen beiden Projekten muss atomar sein. Kein Lead/Zahlung darf zwischen alter und neuer Instanz verloren gehen.
- **DSGVO:** Tax-Daten von Privatpersonen. Migration darf keine Datenverluste produzieren. Cutover bevorzugt Low-Traffic-Fenster (abends oder Wochenende).

## Nicht gebraucht (Clean-up-Kandidaten)

- Lovable-spezifische Dev-Tools
- Ungenutzte shadcn-Components (später aufräumen)
- Alte Test-Migrations / tote Endpoints

## Referenzen

- Sibling-Repo: `~/Desktop/Projects/clairmont-dashboard/` — siehe dessen `SPEC.md`
- Master-Projekt-Karte: `~/Desktop/claude-team/ai-team/projects/clairmont/SUMMARY.md`
- Marcus-Workflow für Lovable-Migrations: WF-M001 / WF-M010 in `ai-team/agents/marcus-engineer/workflows.md`
