
Ziel: Den echten Fehler jetzt sauber beheben. Die Ursache ist nicht mehr unklar: Das Absenden scheitert weiterhin im Backend-Webhook, nicht im Formular selbst.

1. Hauptursache beheben: Webhook-Function läuft in Speicherlimit
- In `submit-prognose-webhook` wird aktuell alles doppelt verarbeitet:
  - Dateien werden erneut im Backend hochgeladen
  - jede Datei wird zusätzlich in Base64 umgewandelt
  - danach wird noch ein PDF generiert
  - anschließend wird alles zusammen an den zweiten Webhook gesendet
- Die aktuellen Logs zeigen dafür eindeutig: `Memory limit exceeded`.
- Fix:
  - Frontend-Uploads als Quelle verwenden statt Dateien im Webhook erneut komplett zu puffern
  - an den Webhook nur noch die bereits hochgeladenen Storage-Pfade / signierten Links senden
  - PDF weiter generieren, aber Anhänge nicht mehr vollständig als Base64 mitsenden
  - große Dateipuffer vermeiden und Verarbeitung stream-/linkbasiert halten

2. Frontend und Webhook wieder auf dieselbe Datenstruktur bringen
- `SuccessStep.tsx` lädt Dateien bereits vorab in den Storage hoch und baut `uploadedData`.
- Danach sendet es aber zusätzlich nochmals die Originaldateien als `FormData` an `submit-prognose-webhook`.
- Ich stelle den Flow konsistent um:
  - `submit-prognose-webhook` bekommt die bereits vorbereiteten Daten mit Dateipfaden
  - kein doppelter Datei-Upload mehr
  - keine zweite große Dateiübertragung vom Browser an die Function
- Ergebnis: deutlich weniger Speicherverbrauch und weniger Fehlerquellen.

3. PDF-Inhalt im Webhook korrekt behalten
- Die PDF im Webhook ist laut Architektur weiterhin wichtig.
- Deshalb passe ich die Webhook-Function so an, dass sie:
  - weiter das PDF erzeugt
  - alle Formularfelder enthält
  - aber Dokumente nur als Links/Metadaten referenziert statt als komplette Base64-Dateien
- So bleibt die Fachlogik erhalten, ohne das Speicherlimit zu sprengen.

4. KI-Prüfung für PDFs wirklich korrekt nachziehen
- Die Verifikationsfunktion verarbeitet PDFs aktuell noch nicht nach dem robusten nativen PDF-Muster.
- Im Code werden Base64-Dateien weiterhin pauschal als `image_url` weitergegeben.
- Das ist wahrscheinlich der Grund, warum echte Lohnsteuerbescheinigungen teils falsch abgelehnt werden.
- Fix:
  - PDF-Dateien an die KI nativ als PDF-Inhalt senden
  - Bilder weiter als Bild senden
  - dadurch zuverlässigere Erkennung von Lohnsteuerbescheinigungen und Ausweisen

5. Fehlerausgabe für Nutzer verbessern
- Die aktuelle Meldung `Edge Function returned a non-2xx status code` ist technisch und hilft niemandem.
- Ich plane:
  - nutzerfreundliche Fehlermeldung im UI
  - optional unterscheiden zwischen „Dokumentprüfung fehlgeschlagen“ und „Übermittlung fehlgeschlagen“
  - Retry bleibt erhalten

6. Nachkontrolle
- Danach prüfe ich speziell diese Fälle:
  - Steuerprognose mit PDF-Lohnsteuerbescheinigung
  - Steuerprognose mit mehreren Anhängen
  - Steuerprognose mit Ausweis + Steuerbescheid auf Mobilgerät
  - erfolgreicher Versand an E-Mail und Webhook ohne Speicherfehler

Betroffene Dateien
- `supabase/functions/submit-prognose-webhook/index.ts`
- `src/components/prognose/SuccessStep.tsx`
- `supabase/functions/verify-prognose-documents/index.ts`

Technische Kurzdiagnose
- Der Fehler ist nicht mehr „unbekannt“:
  - `submit-prognose-webhook` crasht laut Logs mit `Memory limit exceeded`
  - Ursache ist die doppelte und zu schwere Datei-Verarbeitung
  - zusätzlich ist die PDF-Prüfung in `verify-prognose-documents` noch nicht robust genug umgesetzt
- Deshalb kommt im Frontend weiterhin die rote Fehlermeldung, obwohl das Formular korrekt ausgefüllt ist.
