import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { PDFDocument, StandardFonts, rgb } from "https://esm.sh/pdf-lib@1.17.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ONLY ONE TARGET: form-webhook
const TARGET_WEBHOOK_URL = "https://ixefmjnjjwntwibkytis.supabase.co/functions/v1/form-webhook";
const WEBHOOK_TOKEN = "Clairmont_2025";

// Helper function to convert Uint8Array or ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Map internal category names to German field names for webhook
function mapCategoryToFieldName(category: string): string {
  const mapping: Record<string, string> = {
    'idCard': 'personalausweis',
    'taxCertificate': 'lohnsteuerbescheinigung',
    'disabilityCertificate': 'behindertenausweis',
    'otherDocuments': 'sonstige_dokumente',
    'additionalDocuments': 'weitere_dokumente',
    'propertyDocuments': 'immobilien_dokumente',
    'disabilityProof': 'behindertennachweis',
    'alimonyProof': 'unterhaltsnachweis',
    'cryptoDocuments': 'krypto_dokumente',
    'spouseTaxDocument': 'ehepartner_steuerdokument'
  };
  
  // Handle tax certificate by year
  if (category.startsWith('taxCertificate_')) {
    const year = category.replace('taxCertificate_', '');
    return `lohnsteuerbescheid_${year}`;
  }
  
  return mapping[category] || category;
}

// Generate actual PDF using pdf-lib - COMPLETE with all form fields
async function generatePDF(data: any): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]); // A4
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let yPosition = 800;
  const leftMargin = 50;
  const lineHeight = 16;
  const sectionSpacing = 25;

  const winAnsiSafe = (value: unknown): string => {
    const s = (value ?? '').toString();
    return s
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ß/g, 'ss');
  };

  const addText = (text: string, isBold = false, fontSize = 10) => {
    if (yPosition < 60) {
      page = pdfDoc.addPage([595, 842]);
      yPosition = 800;
    }

    page.drawText(winAnsiSafe(text), {
      x: leftMargin,
      y: yPosition,
      size: fontSize,
      font: isBold ? boldFont : font,
      color: rgb(0, 0, 0),
    });
    yPosition -= lineHeight;
  };
  
  const addSection = (title: string) => {
    yPosition -= sectionSpacing;
    if (yPosition < 60) {
      page = pdfDoc.addPage([595, 842]);
      yPosition = 800;
    }
    addText(title, true, 12);
    yPosition -= 5;
  };

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '-';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('de-DE');
    } catch {
      return dateStr;
    }
  };

  const formatBoolean = (val: boolean | undefined) => val ? 'Ja' : 'Nein';

  // Header
  addText('STEUER-SELBSTAUSKUNFT', true, 18);
  yPosition -= 10;
  addText(`Erstellt am: ${new Date().toLocaleDateString('de-DE')}`, false, 9);
  yPosition -= 20;

  // Personal Info
  addSection('PERSOENLICHE INFORMATIONEN');
  addText(`Vorname: ${data.firstName || '-'}`);
  addText(`Nachname: ${data.lastName || '-'}`);
  addText(`Geburtsdatum: ${formatDate(data.birthDate)}`);
  addText(`Geschlecht: ${data.gender || '-'}`);
  addText(`Nationalitaet: ${data.nationality || '-'}`);
  addText(`E-Mail: ${data.email || '-'}`);
  addText(`Adresse: ${data.address || '-'}`);
  
  if (data.differentAddress) {
    addText(`Abweichende Adresse: Ja`);
    addText(`Alternative Adresse: ${data.alternativeAddress || '-'}`);
  }
  
  if (data.personalInfo) {
    if (data.personalInfo.street) addText(`Strasse: ${data.personalInfo.street}`);
    if (data.personalInfo.zipCode) addText(`PLZ: ${data.personalInfo.zipCode}`);
    if (data.personalInfo.city) addText(`Stadt: ${data.personalInfo.city}`);
  }

  // Family
  addSection('FAMILIENSITUATION');
  addText(`Familienstand: ${data.maritalStatus || '-'}`);
  
  if (data.maritalStatus === 'married' || data.maritalStatus === 'verheiratet') {
    addText(`Verheiratet seit: ${formatDate(data.marriedSince)}`);
    addText(`Name des Ehepartners: ${data.spouseName || '-'}`);
    addText(`Geburtsdatum Ehepartner: ${formatDate(data.spouseBirthDate)}`);
    addText(`Beruf Ehepartner: ${data.spouseOccupation || '-'}`);
    addText(`Ehepartner berufstaetig: ${formatBoolean(data.spouseEmployed)}`);
  }
  
  if (data.maritalStatus === 'divorced' || data.maritalStatus === 'geschieden') {
    addText(`Scheidungsdatum: ${formatDate(data.divorceDate)}`);
  }

  // Children
  addSection('KINDER');
  addText(`Kinder vorhanden: ${formatBoolean(data.hasChildren)}`);
  
  if (data.hasChildren && data.children && Array.isArray(data.children) && data.children.length > 0) {
    addText(`Anzahl Kinder: ${data.children.length}`);
    yPosition -= 5;
    data.children.forEach((child: any, index: number) => {
      addText(`Kind ${index + 1}:`, true);
      addText(`  Name: ${child.name || '-'}`);
      addText(`  Geburtsdatum: ${formatDate(child.birthDate)}`);
      addText(`  Kindergeld-Bezugszeitraum: ${child.childBenefitPeriod || '-'}`);
    });
  }

  // Work
  addSection('BERUFLICHE TAETIGKEIT');
  addText(`Beruf/Taetigkeit: ${data.occupation || '-'}`);
  addText(`Home-Office-Tage pro Woche: ${data.homeOfficeDays || '-'}`);
  
  if (data.workplace) {
    addText(`Arbeitsplatz-Adresse:`, true);
    addText(`  Strasse: ${data.workplace.street || '-'}`);
    addText(`  PLZ: ${data.workplace.zipCode || '-'}`);
    addText(`  Stadt: ${data.workplace.city || '-'}`);
  }
  
  addText(`Fortbildungskosten: ${data.trainingCosts || '-'}`);
  addText(`Arbeitsmittel: ${data.businessEquipment || '-'}`);

  // Income
  addSection('EINKOMMEN');
  addText(`Gewerbliche Einkuenfte: ${formatBoolean(data.hasBusiness)}`);
  if (data.hasBusiness) {
    addText(`Art des Gewerbes: ${data.businessType || '-'}`);
  }
  
  addText(`Krypto-Einkuenfte: ${formatBoolean(data.hasCryptoIncome)}`);
  
  addText(`Sozialleistungen: ${formatBoolean(data.hasSocialBenefits)}`);
  if (data.hasSocialBenefits) {
    addText(`Art der Sozialleistung: ${data.socialBenefitDetails || '-'}`);
    addText(`Betrag Sozialleistung: ${data.socialBenefitAmount || '-'}`);
  }
  
  if (data.taxYears && Array.isArray(data.taxYears) && data.taxYears.length > 0) {
    addText(`Steuerjahre: ${data.taxYears.join(', ')}`);
  }

  // Insurance
  addSection('VERSICHERUNGEN & MITGLIEDSCHAFTEN');
  addText(`Gewerkschaftsmitglied: ${formatBoolean(data.isUnionMember)}`);
  if (data.isUnionMember) {
    addText(`Name der Gewerkschaft: ${data.unionName || '-'}`);
    addText(`Gewerkschaftsbeitrag (jaehrlich): ${data.unionFee || '-'} EUR`);
  }
  
  addText(`Andere Mitgliedschaften: ${formatBoolean(data.hasOtherMemberships)}`);
  if (data.hasOtherMemberships) {
    addText(`Details andere Mitgliedschaften: ${data.otherMembershipsDetails || '-'}`);
  }
  
  if (data.insurances && Array.isArray(data.insurances) && data.insurances.length > 0) {
    yPosition -= 5;
    addText(`Versicherungen (${data.insurances.length}):`, true);
    data.insurances.forEach((insurance: any, index: number) => {
      addText(`Versicherung ${index + 1}:`, true);
      addText(`  Art: ${insurance.type || '-'}`);
      addText(`  Anbieter: ${insurance.provider || '-'}`);
      addText(`  Jahresbeitrag: ${insurance.yearlyContribution || '-'} EUR`);
    });
  }

  // Property
  addSection('IMMOBILIEN');
  addText(`Immobilienbesitz: ${formatBoolean(data.hasProperty)}`);
  
  if (data.hasProperty && data.properties && Array.isArray(data.properties) && data.properties.length > 0) {
    addText(`Anzahl Immobilien: ${data.properties.length}`);
    yPosition -= 5;
    data.properties.forEach((property: any, index: number) => {
      addText(`Immobilie ${index + 1}:`, true);
      addText(`  Adresse: ${property.address || '-'}`);
      addText(`  Kaufpreis: ${property.purchasePrice || '-'} EUR`);
      addText(`  Kaufdatum: ${formatDate(property.purchaseDate)}`);
      addText(`  Fertigstellungsdatum: ${formatDate(property.completionDate)}`);
      addText(`  Anzahl Einheiten: ${property.numberOfUnits || '-'}`);
      addText(`  Vermietete Flaeche: ${property.rentedArea || '-'} m2`);
      addText(`  Monatliche Miete: ${property.rent || '-'} EUR`);
      addText(`  Nebenkosten: ${property.additionalCosts || '-'} EUR`);
      addText(`  Zinsaufwendungen: ${property.interestExpense || '-'} EUR`);
      addText(`  Notarkosten: ${property.notaryCosts || '-'} EUR`);
      addText(`  Grundsteuer: ${property.propertyTax || '-'} EUR`);
      if (property.otherCostsDescription) {
        addText(`  Sonstige Kosten: ${property.otherCostsDescription}`);
        addText(`  Sonstige Kosten Betrag: ${property.otherCostsAmount || '-'} EUR`);
      }
    });
  }

  // Special Circumstances
  addSection('BESONDERE UMSTAENDE');
  addText(`Behinderung vorhanden: ${formatBoolean(data.hasDisability)}`);
  addText(`Unterhaltszahlungen: ${formatBoolean(data.paysAlimony)}`);

  // Bank
  addSection('BANKVERBINDUNG');
  addText(`IBAN: ${data.iban || '-'}`);
  if (data.partnerCode) {
    addText(`Partnercode: ${data.partnerCode}`);
  }

  // Confirmations
  addSection('BESTAETIGUNGEN');
  addText(`Richtigkeit bestaetigt: ${formatBoolean(data.confirmCorrectness)}`);
  addText(`AGB akzeptiert: ${formatBoolean(data.acceptTerms)}`);
  addText(`Datenschutz akzeptiert: ${formatBoolean(data.acceptPrivacy)}`);
  addText(`E-Mail bestaetigt: ${formatBoolean(data.confirmEmail)}`);

  // Footer
  yPosition -= 30;
  addText('---', false, 8);
  addText('Dieses Dokument wurde automatisch generiert.', false, 8);
  addText('Clairmont Advisory - Steuer-Selbstauskunft', false, 8);

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

interface DownloadReport {
  filePath: string;
  fieldName: string;
  ok: boolean;
  errorMessage?: string;
}

// Download file from storage and convert to base64
async function downloadFileAsBase64(
  supabase: any,
  filePath: string,
  fieldName: string
): Promise<{ fileData: { data: string; type: string; name: string } | null; report: DownloadReport }> {
  const report: DownloadReport = {
    filePath,
    fieldName,
    ok: false
  };

  try {
    console.log(`Downloading file: ${filePath} (${fieldName})`);
    
    const { data, error } = await supabase.storage
      .from('prognose-documents')
      .download(filePath);
    
    if (error || !data) {
      report.errorMessage = error?.message || 'No data returned';
      console.error(`Download failed for ${filePath}:`, report.errorMessage);
      return { fileData: null, report };
    }
    
    const arrayBuffer = await data.arrayBuffer();
    const base64 = arrayBufferToBase64(arrayBuffer);
    
    const fileName = filePath.split('/').pop() || 'unknown';
    
    report.ok = true;
    console.log(`Successfully downloaded: ${fileName} (${base64.length} bytes base64)`);
    
    return {
      fileData: {
        data: base64,
        type: data.type || 'application/octet-stream',
        name: fileName
      },
      report
    };
  } catch (err: any) {
    report.errorMessage = err?.message || 'Unknown error';
    console.error(`Error processing file ${filePath}:`, err);
    return { fileData: null, report };
  }
}

// Count expected files from uploadedPaths
function countExpectedFiles(uploadedPaths: any): number {
  let count = 0;
  
  if (uploadedPaths?.documents) {
    for (const paths of Object.values(uploadedPaths.documents)) {
      if (Array.isArray(paths)) count += paths.length;
    }
  }
  
  if (uploadedPaths?.taxCertificatesByYear) {
    for (const paths of Object.values(uploadedPaths.taxCertificatesByYear)) {
      if (Array.isArray(paths)) count += paths.length;
    }
  }
  
  if (Array.isArray(uploadedPaths?.additionalDocuments)) {
    count += uploadedPaths.additionalDocuments.length;
  }
  
  if (Array.isArray(uploadedPaths?.propertyDocuments)) {
    count += uploadedPaths.propertyDocuments.length;
  }
  
  if (Array.isArray(uploadedPaths?.cryptoDocuments)) {
    count += uploadedPaths.cryptoDocuments.length;
  }
  
  if (Array.isArray(uploadedPaths?.disabilityProof)) {
    count += uploadedPaths.disabilityProof.length;
  }
  
  if (Array.isArray(uploadedPaths?.alimonyProof)) {
    count += uploadedPaths.alimonyProof.length;
  }
  
  if (Array.isArray(uploadedPaths?.spouseTaxDocument)) {
    count += uploadedPaths.spouseTaxDocument.length;
  }
  
  return count;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const requestBody = await req.json();
    const jsonData = requestBody.data;
    const uploadedPaths = requestBody.uploadedPaths;
    
    console.log('=== PROGNOSE WEBHOOK PROCESSING ===');
    console.log('Received uploadedPaths:', JSON.stringify(uploadedPaths, null, 2));

    const filesForWebhook: { fieldName: string; fileName: string; mimeType: string; data: string }[] = [];
    const downloadReports: DownloadReport[] = [];
    const uploadedUrls: Record<string, string[]> = {};
    const taxCertificatesByYearUrls: Record<string, string[]> = {};

    // Helper to process a category of files
    async function processFileCategory(paths: any, category: string, urlsArray?: string[]) {
      if (!Array.isArray(paths)) return;
      
      console.log(`Processing ${category}: ${paths.length} files`);
      
      for (const filePath of paths) {
        if (typeof filePath !== 'string') continue;
        
        const fieldName = mapCategoryToFieldName(category);
        const { fileData, report } = await downloadFileAsBase64(supabase, filePath, fieldName);
        downloadReports.push(report);
        
        if (fileData) {
          filesForWebhook.push({
            fieldName,
            fileName: fileData.name,
            mimeType: fileData.type,
            data: fileData.data
          });
        }
        
        // Generate signed URL
        if (urlsArray) {
          const { data: urlData } = await supabase.storage
            .from('prognose-documents')
            .createSignedUrl(filePath, 31536000);
          
          if (urlData?.signedUrl) {
            urlsArray.push(urlData.signedUrl);
          }
        }
      }
    }

    // Process all document categories
    if (uploadedPaths?.documents) {
      for (const [category, paths] of Object.entries(uploadedPaths.documents)) {
        if (!uploadedUrls[category]) uploadedUrls[category] = [];
        await processFileCategory(paths, category, uploadedUrls[category]);
      }
    }

    // Process tax certificates by year
    if (uploadedPaths?.taxCertificatesByYear) {
      for (const [year, paths] of Object.entries(uploadedPaths.taxCertificatesByYear)) {
        taxCertificatesByYearUrls[year] = [];
        await processFileCategory(paths, `taxCertificate_${year}`, taxCertificatesByYearUrls[year]);
      }
    }

    // Process additional documents
    if (uploadedPaths?.additionalDocuments) {
      uploadedUrls.additionalDocuments = [];
      await processFileCategory(uploadedPaths.additionalDocuments, 'additionalDocuments', uploadedUrls.additionalDocuments);
    }

    // Process property documents
    if (uploadedPaths?.propertyDocuments) {
      uploadedUrls.propertyDocuments = [];
      await processFileCategory(uploadedPaths.propertyDocuments, 'propertyDocuments', uploadedUrls.propertyDocuments);
    }

    // Process crypto documents
    if (uploadedPaths?.cryptoDocuments) {
      uploadedUrls.cryptoDocuments = [];
      await processFileCategory(uploadedPaths.cryptoDocuments, 'cryptoDocuments', uploadedUrls.cryptoDocuments);
    }

    // Process disability proof
    if (uploadedPaths?.disabilityProof) {
      uploadedUrls.disabilityProof = [];
      await processFileCategory(uploadedPaths.disabilityProof, 'disabilityProof', uploadedUrls.disabilityProof);
    }

    // Process alimony proof
    if (uploadedPaths?.alimonyProof) {
      uploadedUrls.alimonyProof = [];
      await processFileCategory(uploadedPaths.alimonyProof, 'alimonyProof', uploadedUrls.alimonyProof);
    }

    // Process spouse tax document
    if (uploadedPaths?.spouseTaxDocument) {
      uploadedUrls.spouseTaxDocument = [];
      await processFileCategory(uploadedPaths.spouseTaxDocument, 'spouseTaxDocument', uploadedUrls.spouseTaxDocument);
    }

    // Calculate expected vs actual
    const expectedFilesCount = countExpectedFiles(uploadedPaths);
    const actualFilesCount = filesForWebhook.length;
    const downloadFailures = downloadReports.filter(r => !r.ok);

    console.log('=== FILE PROCESSING SUMMARY ===');
    console.log(`Expected files: ${expectedFilesCount}`);
    console.log(`Successfully downloaded: ${actualFilesCount}`);
    console.log(`Failed downloads: ${downloadFailures.length}`);
    if (downloadFailures.length > 0) {
      console.log('Failed files:', JSON.stringify(downloadFailures, null, 2));
    }
    console.log('=================================');

    // Block if we expected files but got none
    if (expectedFilesCount > 0 && actualFilesCount === 0) {
      console.error('BLOCKING: Expected files but none could be downloaded!');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Keine Dateien konnten heruntergeladen werden',
          expectedFilesCount,
          actualFilesCount,
          downloadFailures
        }),
        { 
          status: 422,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    // Generate PDF
    const pdfFileName = `Steuer-Selbstauskunft_${jsonData.firstName || 'Unknown'}_${jsonData.lastName || 'User'}.pdf`;
    let pdfBase64 = '';
    let pdfError: string | null = null;

    try {
      const pdfBytes = await generatePDF(jsonData);
      pdfBase64 = arrayBufferToBase64(pdfBytes);
      console.log(`PDF generated successfully: ${pdfBase64.length} bytes base64`);
    } catch (err: any) {
      pdfError = err?.message || 'Unknown PDF error';
      console.error('PDF generation failed:', pdfError);
    }

    // Prepare webhook payload for form-webhook
    const webhookPayload = {
      formType: 'steuerprognose',
      submittedAt: new Date().toISOString(),
      formData: jsonData,
      pdfContent: {
        name: pdfFileName,
        type: 'application/pdf',
        data: pdfBase64,
      },
      pdfGenerationFailed: !pdfBase64,
      files: filesForWebhook,
      filesCount: actualFilesCount,
      expectedFilesCount,
      documentUrls: uploadedUrls,
      taxCertificatesByYearUrls
    };

    console.log(`Sending to form-webhook with ${actualFilesCount} files...`);

    // Send to form-webhook (ONLY target)
    let webhookStatus = 'pending';
    let webhookError: string | null = null;

    try {
      const webhookResponse = await fetch(TARGET_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${WEBHOOK_TOKEN}`,
        },
        body: JSON.stringify(webhookPayload),
      });

      if (!webhookResponse.ok) {
        const errorText = await webhookResponse.text();
        webhookError = `${webhookResponse.status}: ${errorText}`;
        webhookStatus = 'failed';
        console.error(`Webhook failed:`, webhookError);
      } else {
        webhookStatus = 'success';
        console.log('Webhook sent successfully');
      }
    } catch (err: any) {
      webhookError = err?.message || 'Unknown webhook error';
      webhookStatus = 'failed';
      console.error('Webhook error:', err);
    }

    // Return detailed response
    return new Response(
      JSON.stringify({
        success: webhookStatus === 'success',
        message: webhookStatus === 'success' ? 'Daten erfolgreich übermittelt' : 'Webhook fehlgeschlagen',
        filesCount: actualFilesCount,
        expectedFilesCount,
        downloadFailures: downloadFailures.length > 0 ? downloadFailures : undefined,
        webhookStatus,
        webhookError,
        pdfGenerated: !!pdfBase64,
        pdfError
      }),
      { 
        status: webhookStatus === 'success' ? 200 : 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );

  } catch (error: any) {
    console.error('Error in submit-prognose-webhook:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }
};

serve(handler);
