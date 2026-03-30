

## Plan: Webhook-Problem endgültig lösen

### Ursache (diesmal eindeutig)

Die Edge Function `submit-prognose-webhook` crasht mit **Memory limit exceeded**, weil sie jede hochgeladene Datei aus dem Storage herunterlädt, in Base64 umwandelt und alles zusammen im Speicher hält, bevor sie es an das andere Lovable-Projekt ([Clairmont Mandate Manager](/projects/1d31e0b1-af9f-451a-8d07-e49afc7c5894)) sendet. Auch mit Streaming wird jede Datei vollständig gepuffert. Bei mehreren Dateien (Ausweis + Lohnsteuerbescheinigung + weitere) reicht der ~150 MB Speicher der Edge Function nicht aus.

Die E-Mail funktioniert, weil sie keine Dateien als Base64 versendet, sondern nur signierte Download-Links.

### Lösung: Dateien als URLs statt als Base64 senden

Statt die Dateien herunterzuladen und als Base64 zu senden, schicken wir nur die **signierten Download-URLs** an das andere Projekt. Das andere Projekt lädt die Dateien dann selbst herunter.

Das erfordert **Änderungen in beiden Projekten**:

### Schritt 1: Dieses Projekt — `submit-prognose-webhook` vereinfachen

- Die gesamte Datei-Download-und-Base64-Logik entfernen
- Nur noch senden: `formData`, `pdfContent` (generierte PDF, ~50KB), und `documentUrls` (signierte URLs)
- `files[]` Array wird leer gesendet oder weggelassen
- Ergebnis: Kein Speicherproblem mehr, weil keine Dateien mehr gepuffert werden

### Schritt 2: Clairmont Mandate Manager — `form-webhook` erweitern

- Wenn `files[]` leer ist aber `documentUrls` vorhanden sind, die Dateien direkt über die URLs herunterladen
- Für jede URL: Datei herunterladen → in Storage (`documents` Bucket) speichern → Dokument-Eintrag erstellen
- Das passiert im anderen Projekt, das seinen eigenen Speicher hat

**Wichtig:** Ich kann das andere Projekt von hier aus nur lesen, nicht bearbeiten. Ich werde dir den genauen Code für die Änderung im Clairmont Mandate Manager mitgeben, den du dort einfügen lässt.

### Schritt 3: Frontend — Fehlerbehandlung anpassen

Da du "hart blockieren" gewählt hast: Erfolg wird nur angezeigt, wenn **sowohl** E-Mail **als auch** Webhook erfolgreich waren. Das ist bereits so implementiert (Zeile 105: `if (webhookError) throw webhookError`). Keine Änderung nötig.

### Betroffene Dateien

| Datei | Projekt | Änderung |
|---|---|---|
| `supabase/functions/submit-prognose-webhook/index.ts` | Dieses Projekt | Datei-Download entfernen, nur URLs + PDF senden |
| `supabase/functions/form-webhook/index.ts` | Clairmont Mandate Manager | URL-Download-Logik hinzufügen |

### Ergebnis

```text
VORHER:
Frontend → Storage Upload → submit-prognose-webhook → [Download ALLE Dateien → Base64 → 💥 CRASH] → form-webhook

NACHHER:
Frontend → Storage Upload → submit-prognose-webhook → [nur PDF + URLs senden ✓] → form-webhook → [URLs einzeln herunterladen ✓]
```

