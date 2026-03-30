import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { PDFDocument, StandardFonts, rgb } from "https://esm.sh/pdf-lib@1.17.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const WEBHOOK_URL = "https://hook.eu2.make.com/ibv42wex7bd1vjqf87lju4iadipsht57";
const ADDITIONAL_WEBHOOK_URL = "https://ixefmjnjjwntwibkytis.supabase.co/functions/v1/form-webhook";
const ADDITIONAL_WEBHOOK_TOKEN = "Clairmont_2025";

function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function generatePDF(data: any): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  let yPosition = 800;
  const leftMargin = 50;
  const lineHeight = 16;
  const sectionSpacing = 25;
  
  const addText = (text: string, isBold = false, fontSize = 10) => {
    if (yPosition < 60) {
      page = pdfDoc.addPage([595, 842]);
      yPosition = 800;
    }
    page.drawText(text, {
      x: leftMargin, y: yPosition, size: fontSize,
      font: isBold ? boldFont : font, color: rgb(0, 0, 0),
    });
    yPosition -= lineHeight;
  };
  
  const addSection = (title: string) => {
    yPosition -= sectionSpacing;
    if (yPosition < 60) { page = pdfDoc.addPage([595, 842]); yPosition = 800; }
    addText(title, true, 12);
    yPosition -= 5;
  };

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '-';
    try { return new Date(dateStr).toLocaleDateString('de-DE'); } catch { return dateStr; }
  };
  const formatBoolean = (val: boolean | undefined) => val ? 'Ja' : 'Nein';

  addText('STEUER-SELBSTAUSKUNFT', true, 18);
  yPosition -= 10;
  addText(`Erstellt am: ${new Date().toLocaleDateString('de-DE')}`, false, 9);
  yPosition -= 20;

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

  addSection('KINDER');
  addText(`Kinder vorhanden: ${formatBoolean(data.hasChildren)}`);
  if (data.hasChildren && data.children?.length > 0) {
    addText(`Anzahl Kinder: ${data.children.length}`);
    yPosition -= 5;
    data.children.forEach((child: any, index: number) => {
      addText(`Kind ${index + 1}:`, true);
      addText(`  Name: ${child.name || '-'}`);
      addText(`  Geburtsdatum: ${formatDate(child.birthDate)}`);
      addText(`  Kindergeld-Bezugszeitraum: ${child.childBenefitPeriod || '-'}`);
    });
  }

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

  addSection('EINKOMMEN');
  addText(`Gewerbliche Einkuenfte: ${formatBoolean(data.hasBusiness)}`);
  if (data.hasBusiness) addText(`Art des Gewerbes: ${data.businessType || '-'}`);
  addText(`Krypto-Einkuenfte: ${formatBoolean(data.hasCryptoIncome)}`);
  addText(`Sozialleistungen: ${formatBoolean(data.hasSocialBenefits)}`);
  if (data.hasSocialBenefits) {
    addText(`Art der Sozialleistung: ${data.socialBenefitDetails || '-'}`);
    addText(`Betrag Sozialleistung: ${data.socialBenefitAmount || '-'}`);
  }
  if (data.taxYears?.length > 0) addText(`Steuerjahre: ${data.taxYears.join(', ')}`);

  addSection('VERSICHERUNGEN & MITGLIEDSCHAFTEN');
  addText(`Gewerkschaftsmitglied: ${formatBoolean(data.isUnionMember)}`);
  if (data.isUnionMember) {
    addText(`Name der Gewerkschaft: ${data.unionName || '-'}`);
    addText(`Gewerkschaftsbeitrag (jaehrlich): ${data.unionFee || '-'} EUR`);
  }
  addText(`Andere Mitgliedschaften: ${formatBoolean(data.hasOtherMemberships)}`);
  if (data.hasOtherMemberships) addText(`Details andere Mitgliedschaften: ${data.otherMembershipsDetails || '-'}`);
  if (data.insurances?.length > 0) {
    yPosition -= 5;
    addText(`Versicherungen (${data.insurances.length}):`, true);
    data.insurances.forEach((ins: any, i: number) => {
      addText(`Versicherung ${i + 1}:`, true);
      addText(`  Art: ${ins.type || '-'}`);
      addText(`  Anbieter: ${ins.provider || '-'}`);
      addText(`  Jahresbeitrag: ${ins.yearlyContribution || '-'} EUR`);
    });
  }

  addSection('IMMOBILIEN');
  addText(`Immobilienbesitz: ${formatBoolean(data.hasProperty)}`);
  if (data.hasProperty && data.properties?.length > 0) {
    addText(`Anzahl Immobilien: ${data.properties.length}`);
    yPosition -= 5;
    data.properties.forEach((p: any, i: number) => {
      addText(`Immobilie ${i + 1}:`, true);
      addText(`  Adresse: ${p.address || '-'}`);
      addText(`  Kaufpreis: ${p.purchasePrice || '-'} EUR`);
      addText(`  Kaufdatum: ${formatDate(p.purchaseDate)}`);
      addText(`  Fertigstellungsdatum: ${formatDate(p.completionDate)}`);
      addText(`  Anzahl Einheiten: ${p.numberOfUnits || '-'}`);
      addText(`  Vermietete Flaeche: ${p.rentedArea || '-'} m2`);
      addText(`  Monatliche Miete: ${p.rent || '-'} EUR`);
      addText(`  Nebenkosten: ${p.additionalCosts || '-'} EUR`);
      addText(`  Zinsaufwendungen: ${p.interestExpense || '-'} EUR`);
      addText(`  Notarkosten: ${p.notaryCosts || '-'} EUR`);
      addText(`  Grundsteuer: ${p.propertyTax || '-'} EUR`);
      if (p.otherCostsDescription) {
        addText(`  Sonstige Kosten: ${p.otherCostsDescription}`);
        addText(`  Sonstige Kosten Betrag: ${p.otherCostsAmount || '-'} EUR`);
      }
    });
  }

  addSection('BESONDERE UMSTAENDE');
  addText(`Behinderung vorhanden: ${formatBoolean(data.hasDisability)}`);
  addText(`Unterhaltszahlungen: ${formatBoolean(data.paysAlimony)}`);

  addSection('BANKVERBINDUNG');
  addText(`IBAN: ${data.iban || '-'}`);
  if (data.partnerCode) addText(`Partnercode: ${data.partnerCode}`);

  addSection('BESTAETIGUNGEN');
  addText(`Richtigkeit bestaetigt: ${formatBoolean(data.confirmCorrectness)}`);
  addText(`AGB akzeptiert: ${formatBoolean(data.acceptTerms)}`);
  addText(`Datenschutz akzeptiert: ${formatBoolean(data.acceptPrivacy)}`);
  addText(`E-Mail bestaetigt: ${formatBoolean(data.confirmEmail)}`);

  yPosition -= 30;
  addText('---', false, 8);
  addText('Dieses Dokument wurde automatisch generiert.', false, 8);
  addText('Clairmont Advisory - Steuer-Selbstauskunft', false, 8);

  return await pdfDoc.save();
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

    // Now accepts JSON instead of FormData - no more raw file uploads
    const { formData: jsonData, storagePaths } = await req.json();
    
    console.log('Processing prognose submission (lightweight mode)...');

    // Generate signed URLs from already-uploaded storage paths
    const documentUrls: Record<string, string[]> = {};
    
    if (storagePaths && typeof storagePaths === 'object') {
      for (const [category, paths] of Object.entries(storagePaths)) {
        if (!Array.isArray(paths)) continue;
        documentUrls[category] = [];
        for (const filePath of paths) {
          if (typeof filePath !== 'string') continue;
          const { data: urlData } = await supabase.storage
            .from('prognose-documents')
            .createSignedUrl(filePath, 31536000); // 1 year
          if (urlData?.signedUrl) {
            documentUrls[category].push(urlData.signedUrl);
          }
        }
      }
    }

    console.log('Signed URLs generated from storage paths');

    // Build webhook payload (same structure as before, just no file re-processing)
    const webhookPayload: Record<string, any> = {
      firstName: jsonData.firstName || '',
      lastName: jsonData.lastName || '',
      birthDate: jsonData.birthDate || '',
      gender: jsonData.gender || '',
      nationality: jsonData.nationality || '',
      email: jsonData.email || '',
      address: jsonData.address || '',
      differentAddress: jsonData.differentAddress || false,
      alternativeAddress: jsonData.alternativeAddress || '',
      personalInfoStreet: jsonData.personalInfo?.street || '',
      personalInfoZipCode: jsonData.personalInfo?.zipCode || '',
      personalInfoCity: jsonData.personalInfo?.city || '',
      maritalStatus: jsonData.maritalStatus || '',
      marriedSince: jsonData.marriedSince || '',
      spouseName: jsonData.spouseName || '',
      spouseBirthDate: jsonData.spouseBirthDate || '',
      spouseOccupation: jsonData.spouseOccupation || '',
      spouseEmployed: jsonData.spouseEmployed || false,
      divorceDate: jsonData.divorceDate || '',
      hasChildren: jsonData.hasChildren || false,
      childrenCount: jsonData.children?.length || 0,
      occupation: jsonData.occupation || '',
      homeOfficeDays: jsonData.homeOfficeDays || '',
      workplaceStreet: jsonData.workplace?.street || '',
      workplaceZipCode: jsonData.workplace?.zipCode || '',
      workplaceCity: jsonData.workplace?.city || '',
      trainingCosts: jsonData.trainingCosts || '',
      businessEquipment: jsonData.businessEquipment || '',
      hasBusiness: jsonData.hasBusiness || false,
      businessType: jsonData.businessType || '',
      hasCryptoIncome: jsonData.hasCryptoIncome || false,
      hasSocialBenefits: jsonData.hasSocialBenefits || false,
      socialBenefitDetails: jsonData.socialBenefitDetails || '',
      socialBenefitAmount: jsonData.socialBenefitAmount || '',
      taxYears: jsonData.taxYears || [],
      isUnionMember: jsonData.isUnionMember || false,
      unionName: jsonData.unionName || '',
      unionFee: jsonData.unionFee || '',
      hasOtherMemberships: jsonData.hasOtherMemberships || false,
      otherMembershipsDetails: jsonData.otherMembershipsDetails || '',
      insurancesCount: jsonData.insurances?.length || 0,
      hasProperty: jsonData.hasProperty || false,
      propertiesCount: jsonData.properties?.length || 0,
      hasDisability: jsonData.hasDisability || false,
      paysAlimony: jsonData.paysAlimony || false,
      iban: jsonData.iban || '',
      partnerCode: jsonData.partnerCode || '',
      confirmCorrectness: jsonData.confirmCorrectness || false,
      acceptTerms: jsonData.acceptTerms || false,
      acceptPrivacy: jsonData.acceptPrivacy || false,
      confirmEmail: jsonData.confirmEmail || false,
      // Document URLs instead of raw files
      ...Object.fromEntries(
        Object.entries(documentUrls).map(([k, v]) => [`${k}Urls`, v])
      ),
    };

    // Add children details
    if (jsonData.children?.length > 0) {
      jsonData.children.forEach((child: any, i: number) => {
        webhookPayload[`child_${i + 1}_name`] = child.name || '';
        webhookPayload[`child_${i + 1}_birthDate`] = child.birthDate || '';
        webhookPayload[`child_${i + 1}_childBenefitPeriod`] = child.childBenefitPeriod || '';
      });
    }

    // Add insurances details
    if (jsonData.insurances?.length > 0) {
      jsonData.insurances.forEach((ins: any, i: number) => {
        webhookPayload[`insurance_${i + 1}_type`] = ins.type || '';
        webhookPayload[`insurance_${i + 1}_provider`] = ins.provider || '';
        webhookPayload[`insurance_${i + 1}_yearlyContribution`] = ins.yearlyContribution || '';
      });
    }

    // Add properties details
    if (jsonData.properties?.length > 0) {
      jsonData.properties.forEach((p: any, i: number) => {
        webhookPayload[`property_${i + 1}_address`] = p.address || '';
        webhookPayload[`property_${i + 1}_purchasePrice`] = p.purchasePrice || '';
        webhookPayload[`property_${i + 1}_purchaseDate`] = p.purchaseDate || '';
        webhookPayload[`property_${i + 1}_completionDate`] = p.completionDate || '';
        webhookPayload[`property_${i + 1}_numberOfUnits`] = p.numberOfUnits || '';
        webhookPayload[`property_${i + 1}_rentedArea`] = p.rentedArea || '';
        webhookPayload[`property_${i + 1}_rent`] = p.rent || '';
        webhookPayload[`property_${i + 1}_additionalCosts`] = p.additionalCosts || '';
        webhookPayload[`property_${i + 1}_interestExpense`] = p.interestExpense || '';
        webhookPayload[`property_${i + 1}_notaryCosts`] = p.notaryCosts || '';
        webhookPayload[`property_${i + 1}_propertyTax`] = p.propertyTax || '';
        webhookPayload[`property_${i + 1}_otherCostsDescription`] = p.otherCostsDescription || '';
        webhookPayload[`property_${i + 1}_otherCostsAmount`] = p.otherCostsAmount || '';
      });
    }

    // Add crypto uploads
    if (jsonData.cryptoUploads?.length > 0) {
      jsonData.cryptoUploads.forEach((upload: any, i: number) => {
        webhookPayload[`crypto_${i + 1}_exchange`] = upload.exchange || '';
        webhookPayload[`crypto_${i + 1}_date`] = upload.date || '';
      });
    }

    console.log('Sending to Make.com webhook...');

    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      console.error(`Make.com webhook failed: ${webhookResponse.status}`);
    } else {
      console.log('Make.com webhook sent successfully');
    }

    // Generate PDF (lightweight - text only, no file embedding)
    const pdfBytes = await generatePDF(jsonData);
    const pdfBase64 = arrayBufferToBase64(pdfBytes);

    // Send to additional webhook with PDF + document URLs (no raw file data)
    const additionalWebhookPayload = {
      formType: 'steuerprognose',
      submittedAt: new Date().toISOString(),
      formData: jsonData,
      pdfContent: {
        name: `Steuer-Selbstauskunft_${jsonData.firstName || 'Unknown'}_${jsonData.lastName || 'User'}.pdf`,
        type: 'application/pdf',
        data: pdfBase64
      },
      // Instead of raw base64 files, send download URLs
      documentUrls,
    };

    console.log('Sending to additional webhook...');

    try {
      const additionalWebhookResponse = await fetch(ADDITIONAL_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADDITIONAL_WEBHOOK_TOKEN}`,
        },
        body: JSON.stringify(additionalWebhookPayload),
      });

      if (!additionalWebhookResponse.ok) {
        const errorText = await additionalWebhookResponse.text();
        console.error(`Additional webhook failed: ${additionalWebhookResponse.status}`, errorText);
      } else {
        console.log('Additional webhook sent successfully');
      }
    } catch (additionalError) {
      console.error('Error sending to additional webhook:', additionalError);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Data sent to webhooks successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error: any) {
    console.error('Error in submit-prognose-webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);
