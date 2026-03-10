

## Plan: KI-gestützte Dokumentenprüfung vor Formularabsendung

### Konzept

Bevor das Formular abgesendet wird, prüft eine KI alle hochgeladenen Dokumente und Pflichtfelder. Der Button im letzten Schritt (BankDetailsStep) wird von "Prognose anfordern" zu "Antrag prüfen" geändert. Statt direkt abzusenden, öffnet sich ein Prüfungs-Dialog, der die KI-Ergebnisse anzeigt.

### Prüfungen der KI

1. **Personalausweis** (Pflicht): Ist ein Dokument hochgeladen? Ist es tatsächlich ein Personalausweis (Vorder- und Rückseite)?
2. **Lohnsteuerbescheinigung**: Wurden für die ausgewählten Steuerjahre Dokumente hochgeladen? Sind es tatsächlich Lohnsteuerbescheinigungen?
3. **Keine Steuerjahre ausgewählt**: KI fragt nach: "Haben Sie wirklich keine Lohnsteuerbescheinigung?" mit Option, zurückzugehen oder zu bestätigen.
4. **IBAN**: Ist eine gültige IBAN eingetragen?

### Technische Umsetzung

#### 1. Lovable AI aktivieren
LOVABLE_API_KEY muss als Secret hinzugefügt werden (via `ai_gateway--enable`).

#### 2. Neue Edge Function: `verify-prognose-documents`
- Empfängt: Hochgeladene Dateien als Base64 (Personalausweis, Lohnsteuerbescheinigungen), Formulardaten (taxYears, IBAN)
- Sendet Bilder/PDFs an Gemini 2.5 Flash (Vision-fähig) mit Prompt:
  - "Ist dieses Dokument ein deutscher Personalausweis?"
  - "Ist dieses Dokument eine Lohnsteuerbescheinigung für das Jahr X?"
- Gibt strukturiertes Ergebnis zurück mit Status pro Dokument

#### 3. Neue Komponente: `VerificationStep.tsx`
- Wird zwischen BankDetailsStep und SuccessStep eingefügt
- Zeigt einen Lade-Zustand während der KI-Prüfung
- Ergebnisse als Checkliste:
  - Grün: Dokument erkannt und korrekt
  - Rot: Dokument fehlt oder nicht erkannt
  - Gelb: Warnung (z.B. keine Steuerjahre ausgewählt)
- Buttons:
  - "Zurück & korrigieren" — navigiert zum relevanten Schritt
  - "Trotzdem absenden" — nur bei Warnungen, nicht bei fehlenden Pflichtdokumenten
  - "Absenden" — wenn alles in Ordnung ist

#### 4. Änderungen an bestehenden Dateien

- **BankDetailsStep.tsx**: Button-Text zu "Antrag prüfen" ändern
- **Prognose.tsx**: Neuen VerificationStep in die Step-Logik einfügen, `handleSubmit` wird erst nach erfolgreicher Prüfung aufgerufen

### Ablauf für den Nutzer

```text
BankDetailsStep
    ↓ Klick "Antrag prüfen"
VerificationStep (KI prüft...)
    ├── Alles OK → "Absenden" → SuccessStep
    ├── Warnung (z.B. kein Steuerjahr) → "Trotzdem absenden" oder "Zurück"
    └── Fehler (z.B. kein Ausweis) → "Zurück & korrigieren" (Absenden blockiert)
```

### Betroffene Dateien

| Datei | Änderung |
|---|---|
| `supabase/functions/verify-prognose-documents/index.ts` | Neue Edge Function mit Lovable AI |
| `src/components/prognose/VerificationStep.tsx` | Neue Komponente für KI-Prüfung |
| `src/components/prognose/BankDetailsStep.tsx` | Button-Text ändern |
| `src/pages/Prognose.tsx` | VerificationStep einfügen, Logik anpassen |
| `supabase/config.toml` | Neue Function registrieren |

