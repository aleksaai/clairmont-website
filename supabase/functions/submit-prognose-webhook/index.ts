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

// Generate actual PDF using pdf-lib
async function generatePDF(jsonData: any): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  let page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const { height } = page.getSize();
  let yPos = height - 50;
  const lineHeight = 16;
  const margin = 50;
  
  const addText = (text: string, bold: boolean = false, size: number = 11) => {
    if (yPos < 50) {
      page = pdfDoc.addPage([595.28, 841.89]);
      yPos = height - 50;
    }
    page.drawText(text, {
      x: margin,
      y: yPos,
      size: size,
      font: bold ? helveticaBold : helveticaFont,
      color: rgb(0, 0, 0),
    });
    yPos -= lineHeight;
  };
  
  const addSection = (title: string) => {
    yPos -= 10;
    addText(title, true, 13);
    yPos -= 5;
  };
  
  // Header
  addText('Steuer-Selbstauskunft', true, 18);
  yPos -= 5;
  addText(`Erstellt am: ${new Date().toLocaleDateString('de-DE')}`, false, 10);
  yPos -= 10;
  
  // Personal Info
  addSection('Persoenliche Informationen');
  addText(`Name: ${jsonData.firstName || ''} ${jsonData.lastName || ''}`);
  addText(`Geburtsdatum: ${jsonData.birthDate || 'Nicht angegeben'}`);
  addText(`E-Mail: ${jsonData.email || 'Nicht angegeben'}`);
  addText(`Adresse: ${jsonData.street || ''} ${jsonData.houseNumber || ''}, ${jsonData.postalCode || ''} ${jsonData.city || ''}`);
  addText(`Telefon: ${jsonData.phone || 'Nicht angegeben'}`);
  
  // Family
  addSection('Familiensituation');
  addText(`Familienstand: ${jsonData.maritalStatus || 'Nicht angegeben'}`);
  if (jsonData.maritalStatus === 'verheiratet') {
    addText(`Verheiratet seit: ${jsonData.marriedSince || 'Nicht angegeben'}`);
    addText(`Ehepartner: ${jsonData.spouseName || 'Nicht angegeben'}`);
  }
  if (jsonData.maritalStatus === 'geschieden') {
    addText(`Scheidungsdatum: ${jsonData.divorceDate || 'Nicht angegeben'}`);
  }
  
  // Children
  addSection('Kinder');
  if (jsonData.hasChildren && jsonData.children && jsonData.children.length > 0) {
    jsonData.children.forEach((child: any, index: number) => {
      addText(`Kind ${index + 1}: ${child.name || 'Nicht angegeben'}, geboren ${child.birthDate || 'Nicht angegeben'}`);
    });
  } else {
    addText('Keine Kinder');
  }
  
  // Work
  addSection('Berufliche Taetigkeit');
  addText(`Beschaeftigungsstatus: ${jsonData.employmentStatus || 'Nicht angegeben'}`);
  addText(`Arbeitgeber: ${jsonData.employer || 'Nicht angegeben'}`);
  addText(`Berufsbezeichnung: ${jsonData.jobTitle || 'Nicht angegeben'}`);
  addText(`Beschaeftigt seit: ${jsonData.employmentSince || 'Nicht angegeben'}`);
  
  // Income
  addSection('Einkommen');
  addText(`Monatliches Einkommen: ${jsonData.monthlyIncome || 0} EUR`);
  addText(`Mieteinnahmen: ${jsonData.hasRentalIncome ? `Ja (${jsonData.rentalIncome || 0} EUR)` : 'Nein'}`);
  addText(`Sozialleistungen: ${jsonData.hasSocialBenefits ? `Ja (${jsonData.socialBenefitAmount || 0} EUR)` : 'Nein'}`);
  addText(`Kapitalertraege: ${jsonData.hasCapitalGains ? `Ja (${jsonData.capitalGains || 0} EUR)` : 'Nein'}`);
  addText(`Selbststaendige Einkuenfte: ${jsonData.hasSelfEmploymentIncome ? `Ja (${jsonData.selfEmploymentIncome || 0} EUR)` : 'Nein'}`);
  addText(`Crypto-Einkuenfte: ${jsonData.hasCryptoIncome ? 'Ja' : 'Nein'}`);
  
  // Insurance
  addSection('Versicherungen');
  addText(`Krankenversicherung: ${jsonData.hasHealthInsurance ? 'Ja' : 'Nein'}`);
  if (jsonData.hasHealthInsurance) {
    addText(`Versicherer: ${jsonData.insuranceProvider || 'Nicht angegeben'}`);
    addText(`Art: ${jsonData.insuranceType || 'Nicht angegeben'}`);
    addText(`Monatliche Kosten: ${jsonData.monthlyInsuranceCost || 0} EUR`);
  }
  addText(`Gewerkschaftsmitglied: ${jsonData.isUnionMember ? `Ja (${jsonData.unionName || ''})` : 'Nein'}`);
  
  // Property
  addSection('Immobilien');
  addText(`Immobilienbesitz: ${jsonData.ownsProperty ? 'Ja' : 'Nein'}`);
  if (jsonData.ownsProperty) {
    addText(`Wert: ${jsonData.propertyValue || 0} EUR`);
    addText(`Nutzung: ${jsonData.propertyUsage || 'Nicht angegeben'}`);
  }
  
  // Special Circumstances
  addSection('Besondere Umstaende');
  addText(`Behinderung: ${jsonData.hasDisability ? `Ja (${jsonData.disabilityDegree || ''})` : 'Nein'}`);
  addText(`Kirchensteuer: ${jsonData.hasChurchTax ? `Ja (${jsonData.religion || ''})` : 'Nein'}`);
  
  // Bank Details
  addSection('Bankverbindung');
  addText(`Kontoinhaber: ${jsonData.accountHolder || 'Nicht angegeben'}`);
  addText(`IBAN: ${jsonData.iban || 'Nicht angegeben'}`);
  addText(`BIC: ${jsonData.bic || 'Nicht angegeben'}`);
  addText(`Bank: ${jsonData.bankName || 'Nicht angegeben'}`);
  
  // Footer
  yPos -= 20;
  addText('Diese Selbstauskunft wurde ueber das Clairmont Advisory Prognose-Formular erstellt.', false, 9);
  
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
      otherDocuments: []
    };

    const filesForWebhook: { name: string; type: string; data: string; category: string }[] = [];

    const fileCategories = ['taxCertificate', 'idCard', 'disabilityCertificate', 'otherDocuments'];
    
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

    console.log('Files uploaded successfully');

    // Flatten all form data for webhook
    const webhookPayload: Record<string, any> = {
      // Personal Info
      firstName: jsonData.firstName || '',
      lastName: jsonData.lastName || '',
      birthDate: jsonData.birthDate || '',
      email: jsonData.email || '',
      street: jsonData.street || '',
      houseNumber: jsonData.houseNumber || '',
      postalCode: jsonData.postalCode || '',
      city: jsonData.city || '',
      phone: jsonData.phone || '',
      
      // Family
      maritalStatus: jsonData.maritalStatus || '',
      marriedSince: jsonData.marriedSince || '',
      spouseName: jsonData.spouseName || '',
      divorceDate: jsonData.divorceDate || '',
      
      // Children
      hasChildren: jsonData.hasChildren || false,
      childrenCount: jsonData.children?.length || 0,
      
      // Work
      employmentStatus: jsonData.employmentStatus || '',
      employer: jsonData.employer || '',
      jobTitle: jsonData.jobTitle || '',
      employmentSince: jsonData.employmentSince || '',
      
      // Income
      monthlyIncome: jsonData.monthlyIncome || 0,
      hasRentalIncome: jsonData.hasRentalIncome || false,
      rentalIncome: jsonData.rentalIncome || 0,
      hasSocialBenefits: jsonData.hasSocialBenefits || false,
      socialBenefitAmount: jsonData.socialBenefitAmount || 0,
      hasCapitalGains: jsonData.hasCapitalGains || false,
      capitalGains: jsonData.capitalGains || 0,
      hasSelfEmploymentIncome: jsonData.hasSelfEmploymentIncome || false,
      selfEmploymentIncome: jsonData.selfEmploymentIncome || 0,
      hasCryptoIncome: jsonData.hasCryptoIncome || false,
      
      // Insurance
      hasHealthInsurance: jsonData.hasHealthInsurance || false,
      insuranceProvider: jsonData.insuranceProvider || '',
      insuranceType: jsonData.insuranceType || '',
      monthlyInsuranceCost: jsonData.monthlyInsuranceCost || 0,
      isUnionMember: jsonData.isUnionMember || false,
      unionName: jsonData.unionName || '',
      
      // Property
      ownsProperty: jsonData.ownsProperty || false,
      propertyValue: jsonData.propertyValue || 0,
      propertyUsage: jsonData.propertyUsage || '',
      
      // Special Circumstances
      hasDisability: jsonData.hasDisability || false,
      disabilityDegree: jsonData.disabilityDegree || '',
      hasChurchTax: jsonData.hasChurchTax || false,
      religion: jsonData.religion || '',
      
      // Bank Details
      accountHolder: jsonData.accountHolder || '',
      iban: jsonData.iban || '',
      bic: jsonData.bic || '',
      bankName: jsonData.bankName || '',
      
      // Document URLs
      taxCertificateUrls: uploadedUrls.taxCertificate,
      idCardUrls: uploadedUrls.idCard,
      disabilityCertificateUrls: uploadedUrls.disabilityCertificate,
      otherDocumentUrls: uploadedUrls.otherDocuments,
    };

    // Add children details individually
    if (jsonData.children && jsonData.children.length > 0) {
      jsonData.children.forEach((child: any, index: number) => {
        webhookPayload[`child_${index + 1}_name`] = child.name || '';
        webhookPayload[`child_${index + 1}_birthDate`] = child.birthDate || '';
        webhookPayload[`child_${index + 1}_livesWithYou`] = child.livesWithYou || false;
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
      documentUrls: uploadedUrls
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
