# HANDOFF — clairmont-website

**Letzte Aktualisierung:** 2026-04-20 (Marcus, Migration abgeschlossen)
**Status:** 🟢 **LIVE**

## Wo das Projekt steht

Öffentliche Multi-Service-Consulting-Website für Clairmont Advisory. Kern-Service: Steuererklärungen für Privatpersonen DE. Funnel über "Kostenlose Steuerprognose" mit AI-Dokument-Verifikation. Migration von Lovable an einem Tag durchgezogen (2026-04-20):

- **Deploy:** Netlify (auto-deploy auf Push zu `main`), verbunden mit Custom-Domain
- **Supabase:** `ufnxliieaejdvxcanqux` (Clairmont Advisory, geteilt mit Dashboard)
- **AI:** OpenAI GPT-4o-mini (`verify-prognose-documents`) — unterstützt PDF + Bilder
- **Emails:** Resend (`noreply@tax.clairmont-advisory.com` + `onboarding@resend.dev` für Contact-Form)
- **Webhooks:** alle 3 submit-Webhooks pushen an Clairmont Advisory's Dashboard-Endpoints (`form-webhook`, `credit-webhook`, `insurance-webhook` mit Bearer `Clairmont_2025`)
- **Validierung:** End-to-End getestet 2026-04-20, Formular-Submit + AI-Verifikation + Dashboard-Folder-Anlage funktioniert

## Stack

- Vite + React 18 + TS + Tailwind + shadcn/ui + Radix
- Motion 12.23 (Animations)
- React-Hook-Form + Zod für alle Formulare
- jspdf für Client-Side-PDF-Generation
- Supabase JS Client (Storage + Edge Functions)

## Lokal starten

```bash
cd ~/Desktop/Projects/clairmont-website
npm install   # wenn node_modules fehlt
npm run dev   # Vite (Port je nach Belegung, meist 8080 oder 8081)
```

`.env` ist aktuell noch committed ins Repo (Lovable-Pattern). Enthält nur Anon-Key (public, unkritisch). Cleanup später.

## Pages (20 total)

- **Home + Navigation:** `Index`, `Kontakt`, `Impressum`, `Datenschutz`, `Karriere`
- **Steuer-Flow:** `Steuerberatung`, `SteueroptimierungArbeitnehmer`, `Prognose` (Hauptformular!), `Selbstauskunft`
- **Immobilien-/Finanz-Flow:** `BaufinanzierungSelbstauskunft`, `Bauprojekte`, `Immobilien`, `Solaranlagen`, `PaymentSolutions`, `CryptoUpload`
- **Consulting-Flow:** `Unternehmensberatung`, `Rechtsberatung`, `AIDueDiligence`, `GlobalSourcing`

## Edge Functions (alle live auf Clairmont Advisory)

| Function | Purpose | Secrets |
|---|---|---|
| `submit-prognose-webhook` | Steuer-Formular → PDF + Make.com + Dashboard-Push | — (service-role implicit) |
| `submit-selbstauskunft-webhook` | Privatkredit-Formular → PDF + Dashboard-Push | — |
| `submit-baufinanzierung-webhook` | Baufi-Formular → PDF + Dashboard-Push | — |
| `send-prognose-email` | Email an service@ mit Prognose-Daten | `RESEND_API_KEY` |
| `send-selbstauskunft-email` | Email an service@ mit Kredit-Daten | `RESEND_API_KEY` |
| `send-contact-email` | Kontaktformular-Email an info@ + Bestätigung an User | `RESEND_API_KEY` |
| `verify-prognose-documents` | AI-Check: ist's ein Ausweis/Lohnsteuerbescheid? (unterstützt PDF + Image via OpenAI `type:"file"` + `type:"image_url"`) | `OPENAI_API_KEY` |

## Optional noch offen

1. **Lovable-Projekt archivieren** — Lovable-Supabase `hvwovrurvleityqyshqv` kann offline, Abo künigen
2. **`.env`-Cleanup** — committed File raus, `.env.example` als Template
3. **`lovable-tagger`** aus `package.json` devDeps + `.lovable/` Folder raus
4. **Make.com-Webhook review** — der alte Hook (`hook.eu2.make.com/ibv42wex7bd1vjqf87lju4iadipsht57`) läuft noch im `submit-prognose-webhook`. Ist der in deinem Make-Account oder bei Clairmont? Falls ungenutzt, entfernen.

## Kontext-Switch für frische Claude-Code-Session

1. Lies `CLAUDE.md` (auto-geladen)
2. Lies `SPEC.md` für historischen Migrations-Kontext
3. Lies diesen HANDOFF für aktuellen Live-State
4. Für Marcus-Mode: `~/Desktop/claude-team/` + `/marcus`. Master-Karte: `ai-team/projects/clairmont/SUMMARY.md`. Live-Status: `ai-team/status/STATUS.md`.
