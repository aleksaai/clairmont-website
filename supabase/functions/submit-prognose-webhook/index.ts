import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

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

// Helper function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Simple PDF generator for server-side
function generatePDFContent(jsonData: any): string {
  const lines: string[] = [];
  
  lines.push('Steuer-Selbstauskunft');
  lines.push(`Erstellt am: ${new Date().toLocaleDateString('de-DE')}`);
  lines.push('');
  
  // Personal Info
  lines.push('=== Persönliche Informationen ===');
  lines.push(`Name: ${jsonData.firstName || ''} ${jsonData.lastName || ''}`);
  lines.push(`Geburtsdatum: ${jsonData.birthDate || 'Nicht angegeben'}`);
  lines.push(`E-Mail: ${jsonData.email || 'Nicht angegeben'}`);
  lines.push(`Adresse: ${jsonData.street || ''} ${jsonData.houseNumber || ''}, ${jsonData.postalCode || ''} ${jsonData.city || ''}`);
  lines.push(`Telefon: ${jsonData.phone || 'Nicht angegeben'}`);
  lines.push('');
  
  // Family
  lines.push('=== Familiensituation ===');
  lines.push(`Familienstand: ${jsonData.maritalStatus || 'Nicht angegeben'}`);
  if (jsonData.maritalStatus === 'verheiratet') {
    lines.push(`Verheiratet seit: ${jsonData.marriedSince || 'Nicht angegeben'}`);
    lines.push(`Ehepartner: ${jsonData.spouseName || 'Nicht angegeben'}`);
  }
  if (jsonData.maritalStatus === 'geschieden') {
    lines.push(`Scheidungsdatum: ${jsonData.divorceDate || 'Nicht angegeben'}`);
  }
  lines.push('');
  
  // Children
  lines.push('=== Kinder ===');
  if (jsonData.hasChildren && jsonData.children && jsonData.children.length > 0) {
    jsonData.children.forEach((child: any, index: number) => {
      lines.push(`Kind ${index + 1}: ${child.name || 'Nicht angegeben'}, geboren ${child.birthDate || 'Nicht angegeben'}`);
    });
  } else {
    lines.push('Keine Kinder');
  }
  lines.push('');
  
  // Work
  lines.push('=== Berufliche Tätigkeit ===');
  lines.push(`Beschäftigungsstatus: ${jsonData.employmentStatus || 'Nicht angegeben'}`);
  lines.push(`Arbeitgeber: ${jsonData.employer || 'Nicht angegeben'}`);
  lines.push(`Berufsbezeichnung: ${jsonData.jobTitle || 'Nicht angegeben'}`);
  lines.push(`Beschäftigt seit: ${jsonData.employmentSince || 'Nicht angegeben'}`);
  lines.push('');
  
  // Income
  lines.push('=== Einkommen ===');
  lines.push(`Monatliches Einkommen: ${jsonData.monthlyIncome || 0} €`);
  lines.push(`Mieteinnahmen: ${jsonData.hasRentalIncome ? `Ja (${jsonData.rentalIncome || 0} €)` : 'Nein'}`);
  lines.push(`Sozialleistungen: ${jsonData.hasSocialBenefits ? `Ja (${jsonData.socialBenefitAmount || 0} €)` : 'Nein'}`);
  lines.push(`Kapitalerträge: ${jsonData.hasCapitalGains ? `Ja (${jsonData.capitalGains || 0} €)` : 'Nein'}`);
  lines.push(`Selbstständige Einkünfte: ${jsonData.hasSelfEmploymentIncome ? `Ja (${jsonData.selfEmploymentIncome || 0} €)` : 'Nein'}`);
  lines.push(`Crypto-Einkünfte: ${jsonData.hasCryptoIncome ? 'Ja' : 'Nein'}`);
  lines.push('');
  
  // Insurance
  lines.push('=== Versicherungen ===');
  lines.push(`Krankenversicherung: ${jsonData.hasHealthInsurance ? 'Ja' : 'Nein'}`);
  if (jsonData.hasHealthInsurance) {
    lines.push(`Versicherer: ${jsonData.insuranceProvider || 'Nicht angegeben'}`);
    lines.push(`Art: ${jsonData.insuranceType || 'Nicht angegeben'}`);
    lines.push(`Monatliche Kosten: ${jsonData.monthlyInsuranceCost || 0} €`);
  }
  lines.push(`Gewerkschaftsmitglied: ${jsonData.isUnionMember ? `Ja (${jsonData.unionName || ''})` : 'Nein'}`);
  lines.push('');
  
  // Property
  lines.push('=== Immobilien ===');
  lines.push(`Immobilienbesitz: ${jsonData.ownsProperty ? 'Ja' : 'Nein'}`);
  if (jsonData.ownsProperty) {
    lines.push(`Wert: ${jsonData.propertyValue || 0} €`);
    lines.push(`Nutzung: ${jsonData.propertyUsage || 'Nicht angegeben'}`);
  }
  lines.push('');
  
  // Special Circumstances
  lines.push('=== Besondere Umstände ===');
  lines.push(`Behinderung: ${jsonData.hasDisability ? `Ja (${jsonData.disabilityDegree || ''})` : 'Nein'}`);
  lines.push(`Kirchensteuer: ${jsonData.hasChurchTax ? `Ja (${jsonData.religion || ''})` : 'Nein'}`);
  lines.push('');
  
  // Bank Details
  lines.push('=== Bankverbindung ===');
  lines.push(`Kontoinhaber: ${jsonData.accountHolder || 'Nicht angegeben'}`);
  lines.push(`IBAN: ${jsonData.iban || 'Nicht angegeben'}`);
  lines.push(`BIC: ${jsonData.bic || 'Nicht angegeben'}`);
  lines.push(`Bank: ${jsonData.bankName || 'Nicht angegeben'}`);
  
  return lines.join('\n');
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

    // Generate PDF content as text (base64 encoded)
    const pdfTextContent = generatePDFContent(jsonData);
    const pdfBase64 = btoa(unescape(encodeURIComponent(pdfTextContent)));

    // Prepare additional webhook payload
    const additionalWebhookPayload = {
      formType: 'steuerprognose',
      submittedAt: new Date().toISOString(),
      formData: jsonData,
      pdfContent: {
        name: `Steuer-Selbstauskunft_${jsonData.firstName || 'Unknown'}_${jsonData.lastName || 'User'}.txt`,
        type: 'text/plain',
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
