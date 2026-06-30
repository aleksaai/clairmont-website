# HANDOFF — clairmont-website

**Letzte Aktualisierung:** 2026-06-30 (Marcus, Steuerprognose-Formular erweitert + API-getestet)
**Status:** 🟢 **LIVE**

## Was wurde in dieser Session gemacht (2026-06-30)

**Steuerprognose-Formular nach Erols WhatsApp-Spec erweitert** (`2a5d24d`, `355309c`, Edge Functions `submit-prognose-webhook` + `send-prognose-email` deployed)

- Neues Vorab-Check-Step: mind. 2.500 EUR Brutto/Monat und mind. 2.000 EUR eingezahlte Lohnsteuer. Wenn beide Antworten "Nein" sind, stoppt das Formular mit Kapazitaets-Hinweis.
- Direkt danach werden jetzt **Bundesland** und **Stadt** erfasst (`federalState`, `qualificationCity`). Die Werte landen in Client-PDF, Server-PDF, Make.com/Webhook-Payload, Dashboard-`customer_register.raw_data` und der internen Email an `service@clairmont-advisory.com`.
- Lohnsteuerbescheid-Upload ist jetzt je Steuerjahr organisiert. Pro Jahr werden Arbeitszeitraum `from/to` und bei Luecken eine Erklaerung gespeichert (`workPeriodsByYear`).
- Neue bedingte Nachweis-Uploads: Crypto/Trading, Fortbildungskosten, Arbeitsmittel, Selbststaendigkeit/EUER/Bilanz, KFZ, Ausbildung/Studium/Fortbildung, Ehepartner-Einkommen und Ehepartner-Elterngeld. Diese Upload-Gruppen werden serverseitig in `prognose-documents` gespeichert und per Signed URL an das Dashboard weitergereicht.
- API-Verifikation live: `API-20260630090919` pruefte alle neuen Upload-Gruppen und erzeugte im Dashboard 13 Dokumente plus PDF. `API-BUNDESLAND-20260630100509` pruefte Bundesland/Stadt. Supabase Function-Logs zeigten jeweils erfolgreichen internen Email-Versand via Resend.

## Was wurde in dieser Session gemacht (2026-06-02)

**Steuerprognose-Submit-Härtung nach Jörg-H.-Incident** (`2136700`, Edge Function `submit-prognose-webhook` deployed)

- Diagnose: Für den gemeldeten Jörg-H.-Versuch gab es keinen finalen `submit-prognose-webhook`-Request, keinen `form-webhook`-Request und keine neuen `prognose-documents` im relevanten Zeitfenster. Der Submit ist also nicht als fehlgeschlagene Edge-Function hängen geblieben, sondern hat Supabase gar nicht erreicht.
- Schwache Architekturstelle entfernt: Der Browser lud Dateien vorher clientseitig vorab in `prognose-documents` hoch und rief danach weitere Schritte auf. Wenn diese Sequenz vor dem finalen Submit abbrach, konnte kein Dashboard-Folder entstehen.
- Fix Frontend: `SuccessStep.tsx` sendet jetzt einen einzigen multipart Request an `submit-prognose-webhook` inklusive JSON-Daten und aller Dateien.
- Fix Edge Function: `submit-prognose-webhook` übernimmt Uploads, Dashboard-Forwarding an `form-webhook` und internen Email-Versand an `send-prognose-email` serverseitig.
- Verhalten jetzt: Wenn der finale Request Supabase erreicht, hängen Dashboard-Folder und interne Email nicht mehr von browserseitigen Vorab-Uploads ab. Wenn der User die Seite schließt oder keine Verbindung hat, bevor der Request Supabase erreicht, kann technisch kein Serverprozess starten; dann bleibt nur der sichtbare Error-/Retry-State im Formular.
- Verifikation: `npm run build` erfolgreich; `submit-prognose-webhook` live auf Clairmont Supabase `ufnxliieaejdvxcanqux` deployed.

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
