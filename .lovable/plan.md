

## Plan: Hauptseite allgemeiner gestalten

Die Hauptseite ist aktuell stark auf den Steuerservice fokussiert — "Wie funktioniert's?" erklärt nur die Steuerprognose, die Statistiken zeigen nur Steuer-Kennzahlen (€3.800 Erstattung, 14 Tage Bearbeitungszeit), die FAQs drehen sich nur um Steuererklärungen, und die Services-Karten verlinken teilweise auf /prognose. Das passt nicht mehr zum breiten Leistungsspektrum.

### Änderungen

**1. Hero-Bereich** (`Hero.tsx`, `translations.ts`)
- Tagline von "Steuern. Kredite. Vermögen" erweitern zu etwas wie "Steuern. Investments. Immobilien. Beratung." — breiter gefasst
- Beschreibungstext allgemeiner formulieren (Finanz- und Unternehmensberatung statt nur Finanzen)

**2. "Wie funktioniert's?" umbauen** (`HowItWorks.tsx`, `translations.ts`)
- Nicht mehr "3 Schritte zur Steuererstattung", sondern allgemein: "So arbeiten wir"
- Schritt 1: "Anfrage stellen" — Kontaktieren Sie uns oder füllen Sie eine Selbstauskunft aus
- Schritt 2: "Individuelle Beratung" — Wir analysieren Ihre Situation und erstellen ein Konzept
- Schritt 3: "Umsetzung & Betreuung" — Professionelle Abwicklung mit laufender Begleitung

**3. Services-Karten aktualisieren** (`Services.tsx`, `translations.ts`)
- Die 6 Karten an die neuen 9 Leistungen anpassen (oder die wichtigsten 6 zeigen)
- Korrekte Links zu den neuen Unterseiten statt alle auf /prognose
- Vorschlag: Steueroptimierung, Immobilien, Unternehmensberatung, Global Sourcing, Solaranlagen, Karriere — mit je korrektem Link und CTA

**4. Statistiken verallgemeinern** (`Statistics.tsx`, `translations.ts`)
- Statt nur Steuer-Kennzahlen → allgemeinere Erfolge:
  - "5.000+ zufriedene Kunden" (bleibt)
  - "98% Erfolgsquote" (bleibt)
  - "9 Leistungsbereiche" (neu)
  - "3+ Länder" oder "Internationales Netzwerk" (neu, passend zu Immobilien/Global Sourcing)

**5. FAQ allgemeiner machen** (`FAQ.tsx`, `translations.ts`)
- Die 6 Fragen sind alle rein steuerlich. Ersetzen durch einen Mix:
  - 1-2 allgemeine Fragen (Wer ist Clairmont? Wie läuft die Zusammenarbeit?)
  - 1 Frage zu Steuern (gekürzt)
  - 1 Frage zu Immobilien/Bauprojekten
  - 1 Frage zu Kosten/Erstberatung
  - 1 Frage zu internationalen Leistungen

**6. CTA-Sektion** (`translations.ts`)
- Text ist bereits recht allgemein gehalten — nur minimal anpassen

### Dateien

| Datei | Änderung |
|---|---|
| `src/i18n/translations.ts` | Alle Texte aktualisieren (DE/EN/TR) |
| `src/components/HowItWorks.tsx` | Keine Strukturänderung, nur neue Translation-Keys |
| `src/components/Services.tsx` | Neue Karten mit korrekten Links zu Unterseiten |
| `src/components/Statistics.tsx` | Neue Kennzahlen-Karten |
| `src/components/FAQ.tsx` | Neue allgemeinere Fragen |
| `src/components/Hero.tsx` | Minimal — Tagline-Anpassung über Translations |

