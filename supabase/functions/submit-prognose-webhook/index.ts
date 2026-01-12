import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { PDFDocument, StandardFonts, rgb } from "https://esm.sh/pdf-lib@1.17.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const WEBHOOK_URL = "https://hook.eu2.make.com/ibv42wex7bd1vjqf87lju4iadipsht57";
const ADDITIONAL_WEBHOOK_URL = "https://ixefmjnjjwntwibkytis.supabase.co/functions/v1/form-webhook";
const ADDITIONAL_WEBHOOK_TOKEN = "Clairmont_2025";

interface FormDataRequest {
  formData: any;
  documents: {
    taxCertificate: File[];
    idCard: File[];
    disabilityCertificate: File[];
    otherDocuments: File[];
  };
}

// Helper function to convert Uint8Array or ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
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
  
  const addText = (text: string, isBold = false, fontSize = 10) => {
    if (yPosition < 60) {
      page = pdfDoc.addPage([595, 842]);
      yPosition = 800;
    }
    page.drawText(text, {
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

  // ==================== PERSÖNLICHE INFORMATIONEN ====================
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

  // ==================== FAMILIENSITUATION ====================
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

  // ==================== KINDER ====================
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

  // ==================== BERUFLICHE TÄTIGKEIT ====================
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

  // ==================== EINKOMMEN ====================
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

  // ==================== VERSICHERUNGEN & MITGLIEDSCHAFTEN ====================
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

  // ==================== IMMOBILIEN ====================
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

  // ==================== BESONDERE UMSTÄNDE ====================
  addSection('BESONDERE UMSTAENDE');
  addText(`Behinderung vorhanden: ${formatBoolean(data.hasDisability)}`);
  addText(`Unterhaltszahlungen: ${formatBoolean(data.paysAlimony)}`);

  // ==================== BANKVERBINDUNG ====================
  addSection('BANKVERBINDUNG');
  addText(`IBAN: ${data.iban || '-'}`);
  if (data.partnerCode) {
    addText(`Partnercode: ${data.partnerCode}`);
  }

  // ==================== BESTÄTIGUNGEN ====================
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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const formData = await req.formData();
    const jsonData = JSON.parse(formData.get('data') as string);
    
    console.log('Processing prognose submission...');

    // Upload files and get URLs + collect files for additional webhook
    const uploadedUrls: Record<string, string[]> = {
      taxCertificate: [],
      idCard: [],
      disabilityCertificate: [],
      otherDocuments: [],
      additionalDocuments: [],
      propertyDocuments: []
    };

    // Also track tax certificates by year
    const taxCertificatesByYearUrls: Record<string, string[]> = {};

    const filesForWebhook: { name: string; type: string; data: string; category: string }[] = [];

    // Base file categories
    const fileCategories = ['taxCertificate', 'idCard', 'disabilityCertificate', 'otherDocuments', 'additionalDocuments', 'propertyDocuments'];
    
    // Process base categories
    for (const category of fileCategories) {
      const files = formData.getAll(category);
      
      for (const file of files) {
        if (file && file instanceof File) {
          const fileName = `${Date.now()}-${file.name}`;
          const filePath = `${category}/${fileName}`;
          
          const arrayBuffer = await file.arrayBuffer();
          
          // Store file data for additional webhook
          filesForWebhook.push({
            name: file.name,
            type: file.type,
            data: arrayBufferToBase64(arrayBuffer),
            category: category
          });
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('prognose-documents')
            .upload(filePath, arrayBuffer, {
              contentType: file.type,
              upsert: false
            });

          if (uploadError) {
            console.error(`Upload error for ${category}:`, uploadError);
            continue;
          }

          // Generate signed URL (valid for 1 year)
          const { data: urlData } = await supabase.storage
            .from('prognose-documents')
            .createSignedUrl(filePath, 31536000); // 1 year in seconds

          if (urlData?.signedUrl) {
            uploadedUrls[category].push(urlData.signedUrl);
          }
        }
      }
    }

    // Process tax certificates by year (dynamic keys like taxCertificateYear_2023, taxCertificateYear_2024)
    const allFormKeys = Array.from(formData.keys());
    const taxYearCategories = allFormKeys.filter(key => key.startsWith('taxCertificateYear_'));
    
    for (const category of taxYearCategories) {
      const year = category.replace('taxCertificateYear_', '');
      const files = formData.getAll(category);
      
      if (!taxCertificatesByYearUrls[year]) {
        taxCertificatesByYearUrls[year] = [];
      }
      
      for (const file of files) {
        if (file && file instanceof File) {
          const fileName = `${Date.now()}-${file.name}`;
          const filePath = `tax-certificates/${year}/${fileName}`;
          
          const arrayBuffer = await file.arrayBuffer();
          
          // Store file data for additional webhook
          filesForWebhook.push({
            name: file.name,
            type: file.type,
            data: arrayBufferToBase64(arrayBuffer),
            category: `taxCertificate_${year}`
          });
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('prognose-documents')
            .upload(filePath, arrayBuffer, {
              contentType: file.type,
              upsert: false
            });

          if (uploadError) {
            console.error(`Upload error for tax certificate year ${year}:`, uploadError);
            continue;
          }

          // Generate signed URL (valid for 1 year)
          const { data: urlData } = await supabase.storage
            .from('prognose-documents')
            .createSignedUrl(filePath, 31536000); // 1 year in seconds

          if (urlData?.signedUrl) {
            taxCertificatesByYearUrls[year].push(urlData.signedUrl);
          }
        }
      }
    }

    console.log('Files uploaded successfully');
    console.log('Tax certificates by year:', Object.keys(taxCertificatesByYearUrls));
    console.log('Additional documents count:', uploadedUrls.additionalDocuments.length);
    console.log('Property documents count:', uploadedUrls.propertyDocuments.length);

    // Flatten all form data for webhook - COMPLETE with correct field names
    const webhookPayload: Record<string, any> = {
      // Personal Info
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
      
      // Family
      maritalStatus: jsonData.maritalStatus || '',
      marriedSince: jsonData.marriedSince || '',
      spouseName: jsonData.spouseName || '',
      spouseBirthDate: jsonData.spouseBirthDate || '',
      spouseOccupation: jsonData.spouseOccupation || '',
      spouseEmployed: jsonData.spouseEmployed || false,
      divorceDate: jsonData.divorceDate || '',
      
      // Children
      hasChildren: jsonData.hasChildren || false,
      childrenCount: jsonData.children?.length || 0,
      
      // Work - CORRECT field names
      occupation: jsonData.occupation || '',
      homeOfficeDays: jsonData.homeOfficeDays || '',
      workplaceStreet: jsonData.workplace?.street || '',
      workplaceZipCode: jsonData.workplace?.zipCode || '',
      workplaceCity: jsonData.workplace?.city || '',
      trainingCosts: jsonData.trainingCosts || '',
      businessEquipment: jsonData.businessEquipment || '',
      
      // Income - CORRECT field names
      hasBusiness: jsonData.hasBusiness || false,
      businessType: jsonData.businessType || '',
      hasCryptoIncome: jsonData.hasCryptoIncome || false,
      hasSocialBenefits: jsonData.hasSocialBenefits || false,
      socialBenefitDetails: jsonData.socialBenefitDetails || '',
      socialBenefitAmount: jsonData.socialBenefitAmount || '',
      taxYears: jsonData.taxYears || [],
      
      // Insurance & Memberships - CORRECT field names
      isUnionMember: jsonData.isUnionMember || false,
      unionName: jsonData.unionName || '',
      unionFee: jsonData.unionFee || '',
      hasOtherMemberships: jsonData.hasOtherMemberships || false,
      otherMembershipsDetails: jsonData.otherMembershipsDetails || '',
      insurancesCount: jsonData.insurances?.length || 0,
      
      // Property - CORRECT field names
      hasProperty: jsonData.hasProperty || false,
      propertiesCount: jsonData.properties?.length || 0,
      
      // Special Circumstances - CORRECT field names
      hasDisability: jsonData.hasDisability || false,
      paysAlimony: jsonData.paysAlimony || false,
      
      // Bank Details - CORRECT field names
      iban: jsonData.iban || '',
      partnerCode: jsonData.partnerCode || '',
      confirmCorrectness: jsonData.confirmCorrectness || false,
      acceptTerms: jsonData.acceptTerms || false,
      acceptPrivacy: jsonData.acceptPrivacy || false,
      confirmEmail: jsonData.confirmEmail || false,
      
      // Document URLs
      taxCertificateUrls: uploadedUrls.taxCertificate,
      idCardUrls: uploadedUrls.idCard,
      disabilityCertificateUrls: uploadedUrls.disabilityCertificate,
      otherDocumentUrls: uploadedUrls.otherDocuments,
      additionalDocumentUrls: uploadedUrls.additionalDocuments,
      propertyDocumentUrls: uploadedUrls.propertyDocuments,
    };

    // Add tax certificates by year URLs to webhook payload
    for (const [year, urls] of Object.entries(taxCertificatesByYearUrls)) {
      webhookPayload[`taxCertificateYear_${year}_urls`] = urls;
    }

    // Add children details individually
    if (jsonData.children && jsonData.children.length > 0) {
      jsonData.children.forEach((child: any, index: number) => {
        webhookPayload[`child_${index + 1}_name`] = child.name || '';
        webhookPayload[`child_${index + 1}_birthDate`] = child.birthDate || '';
        webhookPayload[`child_${index + 1}_childBenefitPeriod`] = child.childBenefitPeriod || '';
      });
    }

    // Add insurances details individually
    if (jsonData.insurances && jsonData.insurances.length > 0) {
      jsonData.insurances.forEach((insurance: any, index: number) => {
        webhookPayload[`insurance_${index + 1}_type`] = insurance.type || '';
        webhookPayload[`insurance_${index + 1}_provider`] = insurance.provider || '';
        webhookPayload[`insurance_${index + 1}_yearlyContribution`] = insurance.yearlyContribution || '';
      });
    }

    // Add properties details individually
    if (jsonData.properties && jsonData.properties.length > 0) {
      jsonData.properties.forEach((property: any, index: number) => {
        webhookPayload[`property_${index + 1}_address`] = property.address || '';
        webhookPayload[`property_${index + 1}_purchasePrice`] = property.purchasePrice || '';
        webhookPayload[`property_${index + 1}_purchaseDate`] = property.purchaseDate || '';
        webhookPayload[`property_${index + 1}_completionDate`] = property.completionDate || '';
        webhookPayload[`property_${index + 1}_numberOfUnits`] = property.numberOfUnits || '';
        webhookPayload[`property_${index + 1}_rentedArea`] = property.rentedArea || '';
        webhookPayload[`property_${index + 1}_rent`] = property.rent || '';
        webhookPayload[`property_${index + 1}_additionalCosts`] = property.additionalCosts || '';
        webhookPayload[`property_${index + 1}_interestExpense`] = property.interestExpense || '';
        webhookPayload[`property_${index + 1}_notaryCosts`] = property.notaryCosts || '';
        webhookPayload[`property_${index + 1}_propertyTax`] = property.propertyTax || '';
        webhookPayload[`property_${index + 1}_otherCostsDescription`] = property.otherCostsDescription || '';
        webhookPayload[`property_${index + 1}_otherCostsAmount`] = property.otherCostsAmount || '';
      });
    }

    // Add crypto uploads if applicable
    if (jsonData.cryptoUploads && jsonData.cryptoUploads.length > 0) {
      jsonData.cryptoUploads.forEach((upload: any, index: number) => {
        webhookPayload[`crypto_${index + 1}_exchange`] = upload.exchange || '';
        webhookPayload[`crypto_${index + 1}_date`] = upload.date || '';
      });
    }

    console.log('Sending to Make.com webhook...');

    // Send to original Make.com webhook
    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      console.error(`Make.com webhook failed: ${webhookResponse.status}`);
    } else {
      console.log('Make.com webhook sent successfully');
    }

    // Generate actual PDF
    const pdfBytes = await generatePDF(jsonData);
    const pdfBase64 = arrayBufferToBase64(pdfBytes);

    // Prepare additional webhook payload
    const additionalWebhookPayload = {
      formType: 'steuerprognose',
      submittedAt: new Date().toISOString(),
      formData: jsonData,
      pdfContent: {
        name: `Steuer-Selbstauskunft_${jsonData.firstName || 'Unknown'}_${jsonData.lastName || 'User'}.pdf`,
        type: 'application/pdf',
        data: pdfBase64
      },
      files: filesForWebhook,
      documentUrls: uploadedUrls,
      taxCertificatesByYearUrls: taxCertificatesByYearUrls
    };

    console.log('Sending to additional webhook...');

    // Send to additional webhook
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
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    );

  } catch (error: any) {
    console.error('Error in submit-prognose-webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    );
  }
};

serve(handler);
