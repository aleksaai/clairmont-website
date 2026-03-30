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

type StoragePaths = Record<string, string[]>;

function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function sanitizeFileName(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9._-]/g, '_');
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
      return new Date(dateStr).toLocaleDateString('de-DE');
    } catch {
      return dateStr;
    }
  };

  const formatBoolean = (val: boolean | undefined) => (val ? 'Ja' : 'Nein');

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
    addText('Abweichende Adresse: Ja');
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
    addText('Arbeitsplatz-Adresse:', true);
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
    data.insurances.forEach((insurance: any, index: number) => {
      addText(`Versicherung ${index + 1}:`, true);
      addText(`  Art: ${insurance.type || '-'}`);
      addText(`  Anbieter: ${insurance.provider || '-'}`);
      addText(`  Jahresbeitrag: ${insurance.yearlyContribution || '-'} EUR`);
    });
  }

  addSection('IMMOBILIEN');
  addText(`Immobilienbesitz: ${formatBoolean(data.hasProperty)}`);
  if (data.hasProperty && data.properties?.length > 0) {
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

async function parseIncomingSubmission(req: Request, supabase: ReturnType<typeof createClient>): Promise<{ jsonData: any; storagePaths: StoragePaths }> {
  const contentType = req.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const body = await req.json();
    return {
      jsonData: body.formData ?? {},
      storagePaths: body.storagePaths ?? {},
    };
  }

  if (!contentType.includes('multipart/form-data')) {
    throw new Error(`Unsupported content type: ${contentType || 'missing'}`);
  }

  const formData = await req.formData();
  const rawData = formData.get('data');
  const jsonData = typeof rawData === 'string' ? JSON.parse(rawData) : {};
  const storagePaths: StoragePaths = {};

  const uploadFileGroup = async (category: string, folder: string, files: File[]) => {
    if (!files.length) return;
    storagePaths[category] = [];

    for (const file of files) {
      const filePath = `${folder}/${Date.now()}_${sanitizeFileName(file.name || 'upload')}`;
      const { error } = await supabase.storage.from('prognose-documents').upload(filePath, file, {
        contentType: file.type || 'application/octet-stream',
        upsert: false,
      });

      if (error) {
        console.error(`Fallback upload error for ${category}:`, error);
        continue;
      }

      storagePaths[category].push(filePath);
    }
  };

  await uploadFileGroup('taxCertificate', 'tax-certificates', formData.getAll('taxCertificate').filter((value): value is File => value instanceof File));
  await uploadFileGroup('idCard', 'id-cards', formData.getAll('idCard').filter((value): value is File => value instanceof File));
  await uploadFileGroup('disabilityCertificate', 'disability-certificates', formData.getAll('disabilityCertificate').filter((value): value is File => value instanceof File));
  await uploadFileGroup('otherDocuments', 'other-documents', formData.getAll('otherDocuments').filter((value): value is File => value instanceof File));
  await uploadFileGroup('additionalDocuments', 'additional-documents', formData.getAll('additionalDocuments').filter((value): value is File => value instanceof File));
  await uploadFileGroup('propertyDocuments', 'property-documents', formData.getAll('propertyDocuments').filter((value): value is File => value instanceof File));

  for (const [key, value] of formData.entries()) {
    if (!key.startsWith('taxCertificateYear_') || !(value instanceof File)) continue;
    const year = key.replace('taxCertificateYear_', '');
    const category = `taxCertificateYear_${year}`;
    if (!storagePaths[category]) storagePaths[category] = [];

    const filePath = `tax-certificates/${year}/${Date.now()}_${sanitizeFileName(value.name || 'upload')}`;
    const { error } = await supabase.storage.from('prognose-documents').upload(filePath, value, {
      contentType: value.type || 'application/octet-stream',
      upsert: false,
    });

    if (error) {
      console.error(`Fallback upload error for ${category}:`, error);
      continue;
    }

    storagePaths[category].push(filePath);
  }

  return { jsonData, storagePaths };
}

async function buildSignedDocumentUrls(supabase: ReturnType<typeof createClient>, storagePaths: StoragePaths) {
  const documentUrls: Record<string, string[]> = {};

  for (const [category, paths] of Object.entries(storagePaths)) {
    if (!Array.isArray(paths)) continue;
    documentUrls[category] = [];

    for (const filePath of paths) {
      if (typeof filePath !== 'string') continue;
      const { data } = await supabase.storage.from('prognose-documents').createSignedUrl(filePath, 31536000);
      if (data?.signedUrl) documentUrls[category].push(data.signedUrl);
    }
  }

  return documentUrls;
}

function buildWebhookPayload(jsonData: any, documentUrls: Record<string, string[]>) {
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
    ...Object.fromEntries(Object.entries(documentUrls).map(([key, value]) => [`${key}Urls`, value])),
  };

  if (jsonData.children?.length > 0) {
    jsonData.children.forEach((child: any, index: number) => {
      webhookPayload[`child_${index + 1}_name`] = child.name || '';
      webhookPayload[`child_${index + 1}_birthDate`] = child.birthDate || '';
      webhookPayload[`child_${index + 1}_childBenefitPeriod`] = child.childBenefitPeriod || '';
    });
  }

  if (jsonData.insurances?.length > 0) {
    jsonData.insurances.forEach((insurance: any, index: number) => {
      webhookPayload[`insurance_${index + 1}_type`] = insurance.type || '';
      webhookPayload[`insurance_${index + 1}_provider`] = insurance.provider || '';
      webhookPayload[`insurance_${index + 1}_yearlyContribution`] = insurance.yearlyContribution || '';
    });
  }

  if (jsonData.properties?.length > 0) {
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

  if (jsonData.cryptoUploads?.length > 0) {
    jsonData.cryptoUploads.forEach((upload: any, index: number) => {
      webhookPayload[`crypto_${index + 1}_exchange`] = upload.exchange || '';
      webhookPayload[`crypto_${index + 1}_date`] = upload.date || '';
    });
  }

  return webhookPayload;
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

    const { jsonData, storagePaths } = await parseIncomingSubmission(req, supabase);
    console.log('Processing prognose submission (compatible mode)...');

    const documentUrls = await buildSignedDocumentUrls(supabase, storagePaths);
    const webhookPayload = buildWebhookPayload(jsonData, documentUrls);

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

    const pdfBytes = await generatePDF(jsonData);
    const pdfBase64 = arrayBufferToBase64(pdfBytes);

    console.log('Sending to additional webhook...');
    try {
      const encoder = new TextEncoder();

      const additionalWebhookStream = new ReadableStream({
        async start(controller) {
          const push = (chunk: string) => controller.enqueue(encoder.encode(chunk));

          try {
            push('{"formType":"steuerprognose",');
            push(`"submittedAt":${JSON.stringify(new Date().toISOString())},`);
            push(`"formData":${JSON.stringify(jsonData)},`);
            push(`"pdfContent":${JSON.stringify({
              name: `Steuer-Selbstauskunft_${jsonData.firstName || 'Unknown'}_${jsonData.lastName || 'User'}.pdf`,
              type: 'application/pdf',
              data: pdfBase64,
            })},`);
            push('"files":[');

            let isFirstFile = true;

            for (const [category, paths] of Object.entries(storagePaths)) {
              if (!Array.isArray(paths)) continue;

              for (const filePath of paths) {
                if (typeof filePath !== 'string') continue;

                try {
                  const { data: fileData, error: downloadError } = await supabase.storage
                    .from('prognose-documents')
                    .download(filePath);

                  if (downloadError || !fileData) {
                    console.error(`Download error for ${filePath}:`, downloadError);
                    continue;
                  }

                  const arrayBuffer = await fileData.arrayBuffer();
                  const filePayload = {
                    name: filePath.split('/').pop() || 'document',
                    type: fileData.type || 'application/octet-stream',
                    data: arrayBufferToBase64(arrayBuffer),
                    category,
                  };

                  if (!isFirstFile) push(',');
                  push(JSON.stringify(filePayload));
                  isFirstFile = false;

                  console.log(`Streamed file ${filePayload.name} (${category}) to additional webhook`);
                } catch (dlError) {
                  console.error(`Error downloading ${filePath}:`, dlError);
                }
              }
            }

            push('],');
            push(`"documentUrls":${JSON.stringify(documentUrls)}}`);
            controller.close();
          } catch (streamError) {
            controller.error(streamError);
          }
        },
      });

      const additionalWebhookResponse = await fetch(ADDITIONAL_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADDITIONAL_WEBHOOK_TOKEN}`,
        },
        body: additionalWebhookStream,
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

    return new Response(JSON.stringify({ success: true, message: 'Data sent to webhooks successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error: any) {
    console.error('Error in submit-prognose-webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

serve(handler);
