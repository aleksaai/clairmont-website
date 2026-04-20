# HANDOFF — clairmont-website

**Letzte Aktualisierung:** 2026-04-20 (Marcus)

## Wo wir aktuell stehen

**Phase 1 von 7** (Prep & Access) — Marcus wartet auf Aleksa.

## Was schon passiert ist

- Repo von Lovable-synced GitHub gepullt nach `~/Desktop/Projects/clairmont-website/`
- Vollständige Code-Analyse durchgeführt (Marcus, 2026-04-20): Stack, Edge Functions, Datenbanken, Dependencies, Lovable-Abhängigkeiten dokumentiert
- `CLAUDE.md` + `SPEC.md` + `HANDOFF.md` (diese Datei) angelegt
- Supabase-Projekt "Clairmont Advisory" von Aleksa frisch angelegt (2026-04-20)
- Ziel-Strategie entschieden: **ein Supabase-Projekt für beide Lovable-Apps** (Website + Dashboard)
- Migration-Plan in 7 Phasen definiert (siehe SPEC.md)

## Was gerade blockiert

**Aleksa muss liefern:**
- Lovable-Dashboard-Supabase Service-Role-Key + DB-Password (für `pg_dump` der Live-Daten im Dashboard-Projekt)
- Stripe-Dashboard-Zugang bestätigen
- DNS-Zugang für `clairmontadvisory.com` (bzw. aktuelle Domain) bestätigen

Ohne die ersten beiden läuft Phase 2-3 nicht.

## Was als nächstes kommt (sobald Phase 1 durch)

Phase 2: Supabase CLI link an Clairmont Advisory, Migrations pushen, alle 7 Edge Functions deployen, Secrets setzen.

**Konkreter erster Befehl (Marcus plant):**
```bash
cd ~/Desktop/Projects/clairmont-website/
supabase link --project-ref <CLAIRMONT-ADVISORY-REF>
supabase db push
supabase functions deploy --project-ref <CLAIRMONT-ADVISORY-REF>
```

## Kontext-Switch-Notizen

Wenn du in einer frischen Claude-Code-Session landest:

1. Lies `CLAUDE.md` (sollte auto-geladen sein)
2. Lies `SPEC.md` für den Migrations-Plan
3. Lies diesen HANDOFF für den aktuellen Stand
4. Wenn Marcus-Modus gebraucht: zurück nach `~/Desktop/claude-team/` und `/marcus` tippen — Marcus hat hier alle seine Workflows + Tools
5. Für dieses Projekt gehört Marcus `~/Desktop/claude-team/ai-team/projects/clairmont/SUMMARY.md` als Master-Projekt-Karte

## Bekannte Gotchas

- `.env` ist aktuell ins Repo committed. NICHT pushen bevor Phase 6 durch ist (`.env` muss raus, `.env.example` rein)
- `lovable-tagger` in `package.json` → erzeugt `data-lov-id` Attribute auf allen Komponenten → muss in Phase 6 raus
- `verify-prognose-documents` hat harte Abhängigkeit zu `ai.gateway.lovable.dev` → in Phase 5 ersetzen oder Feature entfernen
- Supabase-Anon-Key im `.env` ist öffentlich (by design OK), aber keine Service-Role-Keys ins Repo

## Kommunikations-Kanal

- Slash-Command `/marcus` im claude-team Repo für Migration-Arbeit
- Direkt bei Aleksa für Credentials + Entscheidungen
- Kein Slack/Discord aktuell
