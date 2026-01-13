import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PrognoseEmailRequest {
  formData: any;
  userEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData, userEmail }: PrognoseEmailRequest = await req.json();

    console.log("Sending prognose email to service@clairmont-advisory.com");

    // Collect all file paths from formData
    const allFilePaths: string[] = [];
    
    // Helper function to extract file paths from various structures
    const extractPaths = (items: any) => {
      if (!items) return;
      if (Array.isArray(items)) {
        items.forEach(item => {
          if (typeof item === 'string' && item.trim()) {
            allFilePaths.push(item);
          } else if (item && typeof item === 'object' && item.path) {
            allFilePaths.push(item.path);
          }
        });
      } else if (typeof items === 'string' && items.trim()) {
        allFilePaths.push(items);
      }
    };
    
    // Tax certificates by year
    if (formData.taxCertificatesByYear) {
      Object.values(formData.taxCertificatesByYear).forEach((files: any) => {
        extractPaths(files);
      });
    }
    
    // Other documents
    if (formData.documents) {
      Object.values(formData.documents).forEach((files: any) => {
        extractPaths(files);
      });
    }
    
    // Property and additional documents
    extractPaths(formData.propertyDocuments);
    extractPaths(formData.additionalDocuments);
    
    console.log("Collected file paths:", allFilePaths);

    // Download all attachments from Supabase Storage
    const attachments = await Promise.all(
      allFilePaths.map(async (filePath) => {
        try {
          console.log("Attempting to download file:", filePath);
          
          const { data, error } = await supabase.storage
            .from("prognose-documents")
            .download(filePath);

          if (error || !data) {
            console.error("Error downloading file:", filePath, error);
            return null;
          }

          console.log("Successfully downloaded file:", filePath, "Type:", data.type);

          // Convert blob to base64
          const arrayBuffer = await data.arrayBuffer();
          const base64 = btoa(
            new Uint8Array(arrayBuffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );

          // Extract filename from path
          const filename = filePath.split("/").pop() || "document";

          return {
            filename,
            content: base64,
            type: data.type || "application/octet-stream",
          };
        } catch (err) {
          console.error("Error processing file:", filePath, err);
          return null;
        }
      })
    );

    // Filter out null values from failed downloads
    const validAttachments = attachments.filter((att) => att !== null);

    console.log(`Prepared ${validAttachments.length} attachments out of ${allFilePaths.length} files`);

    const emailResponse = await resend.emails.send({
      from: "Clairmont <noreply@tax.clairmont-advisory.com>",
      to: ["service@clairmont-advisory.com"],
      replyTo: userEmail,
      subject: `Neue Steuerprognose von ${formData.firstName || 'N/A'} ${formData.lastName || 'N/A'}`,
      attachments: validAttachments,
      html: `
        <h1>Neue Steuerprognose</h1>
        
        <h2>Persönliche Informationen</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr><td><strong>Vorname</strong></td><td>${formData.firstName || 'N/A'}</td></tr>
          <tr><td><strong>Nachname</strong></td><td>${formData.lastName || 'N/A'}</td></tr>
          <tr><td><strong>Geburtsdatum</strong></td><td>${formData.birthDate || 'N/A'}</td></tr>
          <tr><td><strong>Geschlecht</strong></td><td>${formData.gender || 'N/A'}</td></tr>
          <tr><td><strong>Nationalität</strong></td><td>${formData.nationality || 'N/A'}</td></tr>
          <tr><td><strong>Wohnadresse</strong></td><td>${
            formData.personalInfo 
              ? `${formData.personalInfo.street || ''}, ${formData.personalInfo.zipCode || ''} ${formData.personalInfo.city || ''}`.trim()
              : (formData.address || 'N/A')
          }</td></tr>
        </table>
        
        <h2>Berufliche Informationen</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr><td><strong>Beruf</strong></td><td>${formData.occupation || 'N/A'}</td></tr>
          <tr><td><strong>Arbeitsplatz-Adresse</strong></td><td>${
            formData.workplace 
              ? `${formData.workplace.street || ''}, ${formData.workplace.zipCode || ''} ${formData.workplace.city || ''}`.trim()
              : 'N/A'
          }</td></tr>
          <tr><td><strong>Home-Office Tage</strong></td><td>${formData.homeOfficeDays || 'N/A'}</td></tr>
          <tr><td><strong>Fortbildungskosten</strong></td><td>${formData.trainingCosts || 'N/A'}</td></tr>
          <tr><td><strong>Arbeitsmittel</strong></td><td>${formData.businessEquipment || 'N/A'}</td></tr>
        </table>
        
        <h2>Familiensituation</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr><td><strong>Familienstand</strong></td><td>${formData.maritalStatus || 'N/A'}</td></tr>
          <tr><td><strong>Verheiratet seit</strong></td><td>${formData.marriedSince || 'N/A'}</td></tr>
          <tr><td><strong>Ehepartner Name</strong></td><td>${formData.spouseName || 'N/A'}</td></tr>
          <tr><td><strong>Ehepartner Geburtsdatum</strong></td><td>${formData.spouseBirthDate || 'N/A'}</td></tr>
          <tr><td><strong>Ehepartner Beruf</strong></td><td>${formData.spouseOccupation || 'N/A'}</td></tr>
          <tr><td><strong>Ehepartner berufstätig</strong></td><td>${formData.spouseEmployed ? 'Ja' : 'Nein'}</td></tr>
          <tr><td><strong>Scheidungsdatum</strong></td><td>${formData.divorceDate || 'N/A'}</td></tr>
        </table>
        
        <h2>Kinder</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr><td><strong>Hat Kinder</strong></td><td>${formData.hasChildren ? 'Ja' : 'Nein'}</td></tr>
        </table>
        ${formData.children?.length > 0 ? `
          <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
            <thead>
              <tr>
                <th>Kind Nr.</th>
                <th>Name</th>
                <th>Geburtsdatum</th>
                <th>Kindergeldbezug</th>
              </tr>
            </thead>
            <tbody>
              ${formData.children.map((child: any, index: number) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${child.name || 'N/A'}</td>
                  <td>${child.birthDate || 'N/A'}</td>
                  <td>${child.childBenefitPeriod || 'N/A'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : ''}
        
        <h2>Einkommen & Einkünfte</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr><td><strong>Gewerbe</strong></td><td>${formData.hasBusiness ? 'Ja' : 'Nein'}</td></tr>
          <tr><td><strong>Art des Gewerbes</strong></td><td>${formData.businessType || 'N/A'}</td></tr>
          <tr><td><strong>Crypto/Trading Einkünfte</strong></td><td>${formData.hasCryptoIncome ? 'Ja' : 'Nein'}</td></tr>
          <tr><td><strong>Staatliche Leistungen</strong></td><td>${formData.hasSocialBenefits ? 'Ja' : 'Nein'}</td></tr>
          <tr><td><strong>Staatliche Leistungen Details</strong></td><td>${formData.socialBenefitDetails || 'N/A'}</td></tr>
          <tr><td><strong>Staatliche Leistungen Summe</strong></td><td>${formData.socialBenefitAmount ? formData.socialBenefitAmount + ' €' : 'N/A'}</td></tr>
          <tr><td><strong>Steuerbescheide vorhanden für</strong></td><td>${formData.taxYears?.join(', ') || 'N/A'}</td></tr>
        </table>
        
        <h2>Mitgliedschaften & Versicherungen</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr><td><strong>Gewerkschaftsmitglied</strong></td><td>${formData.isUnionMember ? 'Ja' : 'Nein'}</td></tr>
          <tr><td><strong>Gewerkschaft Name</strong></td><td>${formData.unionName || 'N/A'}</td></tr>
          <tr><td><strong>Gewerkschaftsbeitrag</strong></td><td>${formData.unionFee ? formData.unionFee + ' €' : 'N/A'}</td></tr>
          <tr><td><strong>Sonstige Mitgliedschaften</strong></td><td>${formData.hasOtherMemberships ? 'Ja' : 'Nein'}</td></tr>
          <tr><td><strong>Sonstige Mitgliedschaften Details</strong></td><td>${formData.otherMembershipsDetails || 'N/A'}</td></tr>
        </table>
        
        ${formData.insurances?.length > 0 ? `
          <h3>Versicherungen</h3>
          <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
            <thead>
              <tr>
                <th>Typ</th>
                <th>Anbieter</th>
                <th>Jahresbeitrag</th>
              </tr>
            </thead>
            <tbody>
              ${formData.insurances.map((ins: any) => `
                <tr>
                  <td>${ins.type || 'N/A'}</td>
                  <td>${ins.provider || 'N/A'}</td>
                  <td>${ins.yearlyContribution || '0'} €</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : '<p>Keine Versicherungen angegeben</p>'}
        
        <h2>Immobilien</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr><td><strong>Immobilienbesitz</strong></td><td>${formData.hasProperty ? 'Ja' : 'Nein'}</td></tr>
        </table>
        ${formData.properties?.length > 0 ? `
          <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
            <thead>
              <tr>
                <th>Immobilie Nr.</th>
                <th>Adresse</th>
                <th>Kaufpreis</th>
                <th>Kaufdatum</th>
                <th>Mieteinnahmen</th>
                <th>Weitere Kosten</th>
                <th>Weitere Kosten Betrag</th>
              </tr>
            </thead>
            <tbody>
              ${formData.properties.map((prop: any, index: number) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${prop.address || 'N/A'}</td>
                  <td>${prop.purchasePrice || '0'} €</td>
                  <td>${prop.purchaseDate || 'N/A'}</td>
                  <td>${prop.rent || '0'} €</td>
                  <td>${prop.otherCostsDescription || 'N/A'}</td>
                  <td>${prop.otherCostsAmount || '0'} €</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : ''}
        
        <h2>Besondere Umstände</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr><td><strong>Behinderung</strong></td><td>${formData.hasDisability ? 'Ja' : 'Nein'}</td></tr>
          <tr><td><strong>Grad der Behinderung</strong></td><td>${formData.disabilityDegree || 'N/A'}</td></tr>
          <tr><td><strong>Unterhaltszahlungen</strong></td><td>${formData.paysAlimony ? 'Ja' : 'Nein'}</td></tr>
          <tr><td><strong>Unterhaltszahlungen Betrag</strong></td><td>${formData.alimonyAmount || 'N/A'}</td></tr>
        </table>
        
        <h2>Hochgeladene Dokumente</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr><td><strong>Lohnsteuerbescheide gesamt</strong></td><td>${allFilePaths.length} Datei(en) im Anhang</td></tr>
          <tr><td><strong>Lohnsteuerbescheinigung</strong></td><td>${formData.documents?.taxCertificate?.length || 0} Datei(en)</td></tr>
          <tr><td><strong>Personalausweis</strong></td><td>${formData.documents?.idCard?.length || 0} Datei(en)</td></tr>
          <tr><td><strong>Behindertenausweis</strong></td><td>${formData.documents?.disabilityCertificate?.length || 0} Datei(en)</td></tr>
          <tr><td><strong>Immobilien-Unterlagen</strong></td><td>${formData.propertyDocuments?.length || 0} Datei(en)</td></tr>
          <tr><td><strong>Weitere Unterlagen</strong></td><td>${formData.additionalDocuments?.length || 0} Datei(en)</td></tr>
          <tr><td><strong>Sonstige Belege</strong></td><td>${formData.documents?.otherDocuments?.length || 0} Datei(en)</td></tr>
        </table>
        
        <h2>Bankverbindung</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr><td><strong>IBAN</strong></td><td>${formData.iban || 'N/A'}</td></tr>
          <tr><td><strong>E-Mail</strong></td><td>${formData.email || 'N/A'}</td></tr>
          <tr><td><strong>E-Mail (bestätigt)</strong></td><td>${formData.confirmEmail || 'N/A'}</td></tr>
          <tr><td><strong>Partnercode</strong></td><td>${formData.partnerCode || 'N/A'}</td></tr>
        </table>
        
        ${formData.failedUploads && formData.failedUploads.length > 0 ? `
          <h2 style="color: #d97706;">⚠️ Fehlgeschlagene Datei-Uploads</h2>
          <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px; background-color: #fef3c7;">
            <thead>
              <tr style="background-color: #fcd34d;">
                <th>Dateiname</th>
              </tr>
            </thead>
            <tbody>
              ${formData.failedUploads.map((filename: string) => `
                <tr>
                  <td>${filename}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <p style="color: #d97706; font-weight: bold;">
            Hinweis: Die oben genannten Dateien konnten nicht hochgeladen werden. 
            Bitte den Kunden bitten, diese Dateien erneut zu senden oder direkt per E-Mail nachzureichen.
          </p>
        ` : ''}
        
        <p style="margin-top: 30px; color: #666;">
          Diese Anfrage wurde über das Clairmont Steuerprognose-Formular eingereicht.
        </p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-prognose-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
