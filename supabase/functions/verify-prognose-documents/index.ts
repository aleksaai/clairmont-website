import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface VerificationRequest {
  idCardFiles: string[]; // base64 encoded files
  taxCertificateFiles: Record<string, string[]>; // year -> base64 files
  taxYears: string[];
  iban: string;
  hasTaxYears: boolean;
}

interface DocumentCheckResult {
  id: string;
  label: string;
  status: "ok" | "error" | "warning";
  message: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const body: VerificationRequest = await req.json();
    const results: DocumentCheckResult[] = [];

    // 1. Check IBAN
    const ibanClean = (body.iban || "").replace(/\s/g, "");
    if (!ibanClean) {
      results.push({
        id: "iban",
        label: "IBAN",
        status: "error",
        message: "Keine IBAN angegeben. Die IBAN wird für die Rückerstattung benötigt.",
      });
    } else if (!/^[A-Z]{2}\d{2}[A-Z0-9]{4,}$/i.test(ibanClean) || ibanClean.length < 15) {
      results.push({
        id: "iban",
        label: "IBAN",
        status: "warning",
        message: "Die IBAN scheint ungültig zu sein. Bitte überprüfen Sie Ihre Eingabe.",
      });
    } else {
      results.push({
        id: "iban",
        label: "IBAN",
        status: "ok",
        message: "IBAN vorhanden und gültig.",
      });
    }

    // 2. Check ID card
    if (!body.idCardFiles || body.idCardFiles.length === 0) {
      results.push({
        id: "idCard",
        label: "Personalausweis",
        status: "error",
        message: "Kein Personalausweis hochgeladen. Dieses Dokument ist Pflicht.",
      });
    } else {
      // Use AI to verify the ID card
      try {
        const idCheckResult = await verifyDocumentWithAI(
          LOVABLE_API_KEY,
          body.idCardFiles,
          "Prüfe ob dieses Dokument ein deutscher Personalausweis (Vorder- und/oder Rückseite) oder Reisepass ist. Antworte mit einem JSON-Objekt: {\"isValid\": true/false, \"reason\": \"kurze Begründung auf Deutsch\"}. Wenn es kein Ausweis ist, beschreibe was du stattdessen siehst."
        );

        if (idCheckResult.isValid) {
          results.push({
            id: "idCard",
            label: "Personalausweis",
            status: "ok",
            message: "Personalausweis erkannt und verifiziert.",
          });
        } else {
          results.push({
            id: "idCard",
            label: "Personalausweis",
            status: "error",
            message: `Das hochgeladene Dokument scheint kein gültiger Personalausweis zu sein. ${idCheckResult.reason}`,
          });
        }
      } catch (aiError) {
        console.error("AI verification error for ID card:", aiError);
        results.push({
          id: "idCard",
          label: "Personalausweis",
          status: "warning",
          message: "Personalausweis hochgeladen, konnte aber nicht automatisch verifiziert werden. Bitte stellen Sie sicher, dass es sich um einen gültigen Ausweis handelt.",
        });
      }
    }

    // 3. Check tax certificates
    if (!body.hasTaxYears || !body.taxYears || body.taxYears.length === 0) {
      results.push({
        id: "taxYears",
        label: "Lohnsteuerbescheinigung",
        status: "warning",
        message: "Sie haben keine Steuerjahre ausgewählt. Haben Sie wirklich keine Lohnsteuerbescheinigung? Diese ist wichtig für eine genaue Prognose.",
      });
    } else {
      for (const year of body.taxYears) {
        const yearFiles = body.taxCertificateFiles?.[year] || [];
        
        if (yearFiles.length === 0) {
          results.push({
            id: `taxCert_${year}`,
            label: `Lohnsteuerbescheinigung ${year}`,
            status: "error",
            message: `Keine Lohnsteuerbescheinigung für ${year} hochgeladen. Bitte laden Sie das Dokument hoch.`,
          });
        } else {
          // Use AI to verify tax certificate
          try {
            const taxCheckResult = await verifyDocumentWithAI(
              LOVABLE_API_KEY,
              yearFiles,
              `Prüfe ob dieses Dokument eine deutsche Lohnsteuerbescheinigung (Elektronische Lohnsteuerbescheinigung / Ausdruck der elektronischen Lohnsteuerbescheinigung) für das Jahr ${year} ist. Antworte mit einem JSON-Objekt: {"isValid": true/false, "reason": "kurze Begründung auf Deutsch"}. Wenn es keine Lohnsteuerbescheinigung ist, beschreibe was du stattdessen siehst.`
            );

            if (taxCheckResult.isValid) {
              results.push({
                id: `taxCert_${year}`,
                label: `Lohnsteuerbescheinigung ${year}`,
                status: "ok",
                message: `Lohnsteuerbescheinigung für ${year} erkannt und verifiziert.`,
              });
            } else {
              results.push({
                id: `taxCert_${year}`,
                label: `Lohnsteuerbescheinigung ${year}`,
                status: "error",
                message: `Das Dokument für ${year} scheint keine Lohnsteuerbescheinigung zu sein. ${taxCheckResult.reason}`,
              });
            }
          } catch (aiError) {
            console.error(`AI verification error for tax cert ${year}:`, aiError);
            results.push({
              id: `taxCert_${year}`,
              label: `Lohnsteuerbescheinigung ${year}`,
              status: "warning",
              message: `Dokument für ${year} hochgeladen, konnte aber nicht automatisch verifiziert werden.`,
            });
          }
        }
      }
    }

    const hasErrors = results.some((r) => r.status === "error");
    const hasWarnings = results.some((r) => r.status === "warning");

    return new Response(
      JSON.stringify({
        results,
        canSubmit: !hasErrors,
        hasWarnings,
        hasErrors,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("verify-prognose-documents error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function verifyDocumentWithAI(
  apiKey: string,
  base64Files: string[],
  prompt: string
): Promise<{ isValid: boolean; reason: string }> {
  // Build content array with images
  const content: any[] = [];
  
  for (const base64Data of base64Files.slice(0, 3)) { // Limit to 3 files
    // Detect mime type from base64 header or default to jpeg
    let mimeType = "image/jpeg";
    if (base64Data.startsWith("data:")) {
      const match = base64Data.match(/^data:(.*?);base64,/);
      if (match) {
        mimeType = match[1];
      }
    }
    
    // Strip data URL prefix if present
    const cleanBase64 = base64Data.replace(/^data:.*?;base64,/, "");
    
    // For PDFs, we can't send as image - send as text description
    if (mimeType === "application/pdf") {
      content.push({
        type: "text",
        text: "[Ein PDF-Dokument wurde hochgeladen. Bitte berücksichtige, dass PDF-Dateien nicht visuell geprüft werden können. Gehe davon aus, dass das Dokument korrekt sein könnte, markiere es aber als 'nicht visuell prüfbar'.]",
      });
    } else {
      content.push({
        type: "image_url",
        image_url: {
          url: `data:${mimeType};base64,${cleanBase64}`,
        },
      });
    }
  }
  
  content.push({
    type: "text",
    text: prompt,
  });

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: "Du bist ein Dokumentenprüfer für eine deutsche Steuerberatung. Du analysierst hochgeladene Dokumente und prüfst ob sie dem erwarteten Dokumenttyp entsprechen. Antworte immer mit einem validen JSON-Objekt.",
        },
        {
          role: "user",
          content,
        },
      ],
    }),
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Rate limit exceeded");
    }
    if (response.status === 402) {
      throw new Error("Payment required");
    }
    const errorText = await response.text();
    throw new Error(`AI gateway error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const responseText = data.choices?.[0]?.message?.content || "";
  
  // Extract JSON from response
  const jsonMatch = responseText.match(/\{[\s\S]*?\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      // fallback
    }
  }
  
  // If we can't parse, assume it's ok but with a warning
  return { isValid: true, reason: "Automatische Prüfung nicht eindeutig." };
}
