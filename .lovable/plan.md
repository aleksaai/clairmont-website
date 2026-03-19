

## Analyse: Warum gehen Formulardaten bei einigen Nutzern verloren?

### Ursache gefunden: Fehlende CORS-Headers

Die Edge Functions (`submit-prognose-webhook`, `send-prognose-email`, und alle anderen) haben **unvollständige CORS-Headers**:

```
Aktuell: "authorization, x-client-info, apikey, content-type"
```

Die Supabase JS-Bibliothek sendet aber zusätzliche Headers (`x-supabase-client-platform`, `x-supabase-client-platform-version`, etc.). Wenn ein Browser eine sogenannte **Preflight-Anfrage** (OPTIONS) sendet und diese Headers nicht erlaubt sind, **blockiert der Browser die gesamte Anfrage still im Hintergrund**.

Warum es bei dir funktioniert: Safari auf Mac/iPhone cached Preflight-Ergebnisse aggressiver und verhält sich bei CORS teilweise toleranter. Chrome und Firefox auf Windows/Android sind strenger.

### Zweites Problem: Falsche Erfolgs-Anzeige

Der SuccessStep zeigt sofort "Vielen Dank! 🎉" an, **bevor** die Daten tatsächlich gesendet wurden. Die Uploads und E-Mails laufen asynchron im Hintergrund. Wenn sie fehlschlagen, sieht der Nutzer zwar kurz einen Toast, aber er denkt, alles hat funktioniert.

### Betroffene Edge Functions (6 Stück)

Alle außer `verify-prognose-documents` haben die falschen CORS-Headers:

1. `submit-prognose-webhook`
2. `send-prognose-email`
3. `submit-baufinanzierung-webhook`
4. `submit-selbstauskunft-webhook`
5. `send-contact-email`
6. `send-selbstauskunft-email`

### Plan

#### 1. CORS-Headers in allen 6 Edge Functions korrigieren

Ersetze in jeder Datei den `Access-Control-Allow-Headers` Wert durch:
```
authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version
```

#### 2. SuccessStep anpassen: Erst senden, dann Erfolg zeigen

Den SuccessStep so umbauen, dass:
- Zunächst ein **Lade-Zustand** ("Daten werden übermittelt...") angezeigt wird
- Die Uploads, Webhook- und E-Mail-Aufrufe **abgewartet** werden
- Erst bei Erfolg die Erfolgsmeldung erscheint
- Bei Fehler eine klare Fehlermeldung mit Retry-Option angezeigt wird

#### 3. Alle Edge Functions neu deployen

Nach den CORS-Änderungen müssen alle 6 Functions redeployed werden.

### Betroffene Dateien

| Datei | Änderung |
|---|---|
| `supabase/functions/submit-prognose-webhook/index.ts` | CORS-Header fix |
| `supabase/functions/send-prognose-email/index.ts` | CORS-Header fix |
| `supabase/functions/submit-baufinanzierung-webhook/index.ts` | CORS-Header fix |
| `supabase/functions/submit-selbstauskunft-webhook/index.ts` | CORS-Header fix |
| `supabase/functions/send-contact-email/index.ts` | CORS-Header fix |
| `supabase/functions/send-selbstauskunft-email/index.ts` | CORS-Header fix |
| `src/components/prognose/SuccessStep.tsx` | Lade-Zustand + Fehlerbehandlung |

