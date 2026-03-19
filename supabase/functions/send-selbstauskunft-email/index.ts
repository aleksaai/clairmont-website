import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.json();
    
    console.log("Received Selbstauskunft form data");
    
    // Collect all file paths from the formData
    const allFilePaths: string[] = [];
    
    if (formData.idDocument) {
      allFilePaths.push(...formData.idDocument);
    }
    if (formData.paySlips) {
      allFilePaths.push(...formData.paySlips);
    }
    if (formData.salaryProof) {
      allFilePaths.push(...formData.salaryProof);
    }
    if (formData.bankStatements) {
      allFilePaths.push(...formData.bankStatements);
    }
    if (formData.insuranceContract) {
      allFilePaths.push(...formData.insuranceContract);
    }
    
    console.log("Files to attach:", allFilePaths.length);
    
    // Download files from Supabase Storage and prepare attachments
    const attachments = [];
    
    for (const filePath of allFilePaths) {
      try {
        console.log("Downloading file:", filePath);
        const { data, error } = await supabase.storage
          .from('prognose-documents')
          .download(filePath);
        
        if (error) {
          console.error("Error downloading file:", filePath, error);
          continue;
        }
        
        // Convert file to base64
        const arrayBuffer = await data.arrayBuffer();
        const base64 = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        
        // Extract filename from path
        const fileName = filePath.split('/').pop() || 'document';
        
        attachments.push({
          filename: fileName,
          content: base64,
        });
        
        console.log("Successfully processed file:", fileName);
      } catch (fileError) {
        console.error("Failed to process file:", filePath, fileError);
      }
    }

    // Build detailed email content
    const emailHtml = `
      <h2>Neue Privatkredit-Selbstauskunft</h2>
      
      <h3>Persönliche Daten</h3>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${formData.firstName} ${formData.lastName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>E-Mail:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${formData.email}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Telefon:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${formData.phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Aktuelle Adresse:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${formData.currentAddress || 'Keine Angabe'}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Wohnhaft seit:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${formData.livingSince || 'Keine Angabe'}</td>
        </tr>
        ${formData.previousAddress ? `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Vorherige Adresse:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${formData.previousAddress}</td>
        </tr>
        ` : ''}
      </table>
      
      ${formData.children && formData.children.length > 0 ? `
      <h3>Kinder</h3>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        ${formData.children.map((child: any, idx: number) => `
        <tr style="background-color: ${idx % 2 === 0 ? '#f5f5f5' : 'white'};">
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Kind ${idx + 1}:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">Geburtsdatum: ${child.birthDate || 'Keine Angabe'}, Kindergeld: ${child.receivesChildBenefit ? 'Ja' : 'Nein'}</td>
        </tr>
        `).join('')}
      </table>
      ` : ''}
      
      <h3>Berufliche Informationen</h3>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Berufsbezeichnung:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${formData.jobTitle || 'Keine Angabe'}</td>
        </tr>
        ${formData.rentWarm ? `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Warmmiete:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${formData.rentWarm} €</td>
        </tr>
        ` : ''}
      </table>
      
      <h3>Bankverbindung</h3>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>IBAN:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${formData.iban || 'Keine Angabe'}</td>
        </tr>
      </table>
      
      ${formData.existingLoans && formData.existingLoans.length > 0 ? `
      <h3>Bestehende Kredite</h3>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        ${formData.existingLoans.map((loan: any, idx: number) => `
        <tr style="background-color: ${idx % 2 === 0 ? '#f5f5f5' : 'white'};">
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Kredit ${idx + 1}:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">
            Typ: ${loan.type || 'Keine Angabe'}<br/>
            Betrag: ${loan.amount || 'Keine Angabe'} €<br/>
            Monatliche Rate: ${loan.monthlyPayment || 'Keine Angabe'} €
          </td>
        </tr>
        `).join('')}
      </table>
      ` : ''}
      
      <h3>Versicherung</h3>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Private Krankenversicherung:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${formData.hasPrivateInsurance ? 'Ja' : 'Nein'}</td>
        </tr>
      </table>
      
      <h3>Kreditwunsch</h3>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Gewünschter Betrag:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${formData.loanAmount || 'Keine Angabe'} €</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Verwendungszweck:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${formData.loanPurpose || 'Keine Angabe'}</td>
        </tr>
      </table>
      
      ${formData.failedUploads && formData.failedUploads.length > 0 ? `
      <div style="background-color: #fff3cd; border: 1px solid #ffc107; padding: 12px; margin-top: 20px; border-radius: 4px;">
        <h4 style="color: #856404; margin: 0 0 8px 0;">⚠️ Hinweis: Einige Dateien konnten nicht hochgeladen werden</h4>
        <p style="color: #856404; margin: 0;">
          Folgende Dateien konnten nicht hochgeladen werden und sind daher nicht im Anhang enthalten:<br/>
          ${formData.failedUploads.join('<br/>')}
        </p>
        <p style="color: #856404; margin: 8px 0 0 0;">
          Bitte kontaktieren Sie den Antragsteller direkt, um diese Dateien nachzureichen.
        </p>
      </div>
      ` : ''}
      
      <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666;">
        <em>Diese E-Mail wurde automatisch generiert von der Clairmont Advisory Privatkredit-Selbstauskunft.</em>
      </p>
    `;
    
    console.log("Sending email with attachments:", attachments.length);

    await resend.emails.send({
      from: "Clairmont Advisory <noreply@tax.clairmont-advisory.com>",
      to: ["service@clairmont-advisory.com"],
      subject: `Neue Privatkredit-Selbstauskunft von ${formData.firstName} ${formData.lastName}`,
      html: emailHtml,
      attachments: attachments,
    });
    
    console.log("Email sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);
