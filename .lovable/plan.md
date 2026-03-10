

## Analyse: Unterstützte Dateiformate bei der Steuerprognose

### Aktuelle Situation

Alle Upload-Bereiche in der Steuerprognose akzeptieren derzeit nur:

| Komponente | Akzeptierte Formate |
|---|---|
| **Personalausweis** (DocumentUploadStep) | `.pdf, .jpg, .jpeg, .png` |
| **Lohnsteuerbescheide** (TaxCertificateUploadStep) | `.pdf, .jpg, .jpeg, .png` |
| **Weitere Dokumente** (AdditionalDocumentsStep) | `.pdf, .jpg, .jpeg, .png` |
| **Krypto-Dokumente** (CryptoUploadStep) | `.pdf, .jpg, .jpeg, .png, .doc, .docx` |

### Fehlende Formate

Nutzer scannen oder fotografieren Dokumente häufig in weiteren Formaten. Folgende fehlen:

- **HEIC/HEIF** — Standard-Fotoformat von iPhones
- **WEBP** — modernes Bildformat (z.B. aus Screenshots)
- **GIF** — gelegentlich bei gescannten Dokumenten
- **BMP/TIFF** — ältere Scanner-Formate
- **DOC/DOCX** — Word-Dokumente (nur bei Krypto vorhanden, fehlt bei den anderen)
- **XLS/XLSX** — Excel-Tabellen (z.B. für Aufstellungen)

### Empfohlene Änderung

Alle vier Upload-Komponenten einheitlich auf folgendes erweitern:

```
.pdf,.jpg,.jpeg,.png,.heic,.heif,.webp,.gif,.bmp,.tiff,.tif,.doc,.docx,.xls,.xlsx
```

Auch die Hinweistexte ("PDF, JPG oder PNG") werden entsprechend aktualisiert auf z.B. "PDF, Bilder (JPG, PNG, HEIC, WEBP) oder Office-Dokumente (max. 10MB pro Datei)".

### Betroffene Dateien

1. `src/components/prognose/DocumentUploadStep.tsx` — `accept` und Hinweistext
2. `src/components/prognose/TaxCertificateUploadStep.tsx` — `accept` und Hinweistext
3. `src/components/prognose/AdditionalDocumentsStep.tsx` — `accept` und Hinweistext
4. `src/components/prognose/CryptoUploadStep.tsx` — `accept` und Hinweistext

