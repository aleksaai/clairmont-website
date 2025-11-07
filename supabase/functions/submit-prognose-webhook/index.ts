import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const WEBHOOK_URL = "https://hook.eu2.make.com/ibv42wex7bd1vjqf87lju4iadipsht57";

interface FormDataRequest {
  formData: any;
  documents: {
    taxCertificate: File[];
    idCard: File[];
    disabilityCertificate: File[];
    otherDocuments: File[];
  };
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

    // Upload files and get URLs
    const uploadedUrls: Record<string, string[]> = {
      taxCertificate: [],
      idCard: [],
      disabilityCertificate: [],
      otherDocuments: []
    };

    const fileCategories = ['taxCertificate', 'idCard', 'disabilityCertificate', 'otherDocuments'];
    
    for (const category of fileCategories) {
      const files = formData.getAll(category);
      
      for (const file of files) {
        if (file && file instanceof File) {
          const fileName = `${Date.now()}-${file.name}`;
          const filePath = `${category}/${fileName}`;
          
          const arrayBuffer = await file.arrayBuffer();
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

    console.log('Sending to webhook...');

    // Send to webhook
    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      throw new Error(`Webhook failed: ${webhookResponse.status}`);
    }

    console.log('Webhook sent successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'Data sent to webhook successfully' }),
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
