import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { PDFDocument, StandardFonts, rgb } from "https://esm.sh/pdf-lib@1.17.1";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const WEBHOOK_URL = "https://ixefmjnjjwntwibkytis.supabase.co/functions/v1/credit-webhook";
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

// Generate PDF for Privatkredit Selbstauskunft form
async function generatePrivatkreditPDF(jsonData: any): Promise<Uint8Array> {
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
    // Truncate long text to fit on page
    const maxLength = 80;
    const displayText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    page.drawText(displayText, {
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
  addText('Privatkredit Selbstauskunft', true, 18);
  yPos -= 5;
  addText(`Erstellt am: ${new Date().toLocaleDateString('de-DE')}`, false, 10);
  yPos -= 10;
  
  // Personal Data
  addSection('Persoenliche Daten');
  addText(`Name: ${jsonData.firstName || ''} ${jsonData.lastName || ''}`);
  addText(`E-Mail: ${jsonData.email || 'Nicht angegeben'}`);
  addText(`Telefon: ${jsonData.phone || 'Nicht angegeben'}`);
  addText(`Aktuelle Adresse: ${jsonData.currentAddress || 'Nicht angegeben'}`);
  addText(`Wohnt dort seit: ${jsonData.livingSince || 'Nicht angegeben'}`);
  if (jsonData.previousAddress) {
    addText(`Vorherige Adresse: ${jsonData.previousAddress}`);
  }
  
  // Children
  if (jsonData.children && jsonData.children.length > 0) {
    addSection('Kinder');
    jsonData.children.forEach((child: any, index: number) => {
      addText(`Kind ${index + 1}: ${child.name || ''}, geb. ${child.birthDate || ''}`);
    });
  }
  
  // Income & Job
  addSection('Einkommen & Beruf');
  addText(`Berufsbezeichnung: ${jsonData.jobTitle || 'Nicht angegeben'}`);
  addText(`Warmmiete: ${jsonData.rentWarm || 'Nicht angegeben'} EUR`);
  
  // Bank Details
  addSection('Bankverbindung');
  addText(`IBAN: ${jsonData.iban || 'Nicht angegeben'}`);
  
  // Existing Loans / Obligations
  addSection('Bestehende Verpflichtungen');
  if (jsonData.existingLoans && jsonData.existingLoans.length > 0) {
    jsonData.existingLoans.forEach((loan: any, index: number) => {
      addText(`Darlehen ${index + 1}:`);
      addText(`  Art: ${loan.type || 'Nicht angegeben'}`);
      addText(`  Betrag: ${loan.amount || 0} EUR`);
      addText(`  Monatliche Rate: ${loan.monthlyPayment || 0} EUR`);
    });
  } else {
    addText('Keine bestehenden Darlehen');
  }
  if (jsonData.alimonyObligations) {
    addText(`Unterhaltsverpflichtungen: ${jsonData.alimonyObligations}`);
  }
  if (jsonData.otherObligations) {
    addText(`Sonstige Verpflichtungen: ${jsonData.otherObligations}`);
  }
  
  // Insurance
  addSection('Versicherung');
  addText(`Private Krankenversicherung: ${jsonData.hasPrivateInsurance ? 'Ja' : 'Nein'}`);
  
  // Loan Purpose
  addSection('Kreditwunsch');
  addText(`Verwendungszweck: ${jsonData.loanPurpose || 'Nicht angegeben'}`);
  addText(`Gewuenschter Betrag: ${jsonData.loanAmount || 'Nicht angegeben'} EUR`);
  
  // Confirmations
  addSection('Bestaetigungen');
  addText(`AGB akzeptiert: ${jsonData.acceptTerms ? 'Ja' : 'Nein'}`);
  addText(`Datenschutz akzeptiert: ${jsonData.acceptPrivacy ? 'Ja' : 'Nein'}`);
  
  // Footer
  yPos -= 20;
  addText('Diese Selbstauskunft wurde ueber das Clairmont Advisory Privatkredit-Formular erstellt.', false, 9);
  
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const jsonData = JSON.parse(formData.get('data') as string);
    
    console.log('Processing Privatkredit Selbstauskunft submission...');
    console.log('Form data received:', JSON.stringify(jsonData, null, 2));

    // Initialize Supabase client for file downloads
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Collect all files for webhook
    const filesForWebhook: { name: string; type: string; data: string; category: string }[] = [];

    // File categories for Privatkredit Selbstauskunft - these are storage paths
    const filePathCategories = [
      { key: 'idDocument', category: 'idDocument' },
      { key: 'paySlips', category: 'paySlips' },
      { key: 'salaryProof', category: 'salaryProof' },
      { key: 'bankStatements', category: 'bankStatements' },
      { key: 'insuranceContract', category: 'insuranceContract' }
    ];
    
    // Download files from Supabase Storage and convert to base64
    for (const { key, category } of filePathCategories) {
      const filePaths = jsonData[key];
      
      if (filePaths && Array.isArray(filePaths)) {
        for (const filePath of filePaths) {
          if (typeof filePath === 'string' && filePath.length > 0) {
            try {
              const { data: fileData, error } = await supabase.storage
                .from('prognose-documents')
                .download(filePath);
              
              if (error) {
                console.error(`Error downloading ${filePath}:`, error);
                continue;
              }
              
              if (fileData) {
                const arrayBuffer = await fileData.arrayBuffer();
                const fileName = filePath.split('/').pop() || filePath;
                
                filesForWebhook.push({
                  name: fileName,
                  type: fileData.type || 'application/octet-stream',
                  data: arrayBufferToBase64(arrayBuffer),
                  category: category
                });
                
                console.log(`File collected from storage: ${fileName} (${category})`);
              }
            } catch (err) {
              console.error(`Failed to download file ${filePath}:`, err);
            }
          }
        }
      }
    }

    console.log(`Total files collected: ${filesForWebhook.length}`);

    // Generate PDF
    const pdfBytes = await generatePrivatkreditPDF(jsonData);
    const pdfBase64 = arrayBufferToBase64(pdfBytes);
    console.log('PDF generated successfully');

    // Prepare webhook payload
    const webhookPayload = {
      formType: 'privatkredit-selbstauskunft',
      submittedAt: new Date().toISOString(),
      formData: jsonData,
      pdfContent: {
        name: `Privatkredit-Selbstauskunft_${jsonData.firstName || 'Unknown'}_${jsonData.lastName || 'User'}.pdf`,
        type: 'application/pdf',
        data: pdfBase64
      },
      files: filesForWebhook
    };

    console.log('Sending to credit-webhook...');

    // Send to webhook
    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WEBHOOK_TOKEN}`,
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error(`Webhook failed: ${webhookResponse.status}`, errorText);
    } else {
      console.log('Webhook sent successfully');
    }

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
    console.error('Error in submit-selbstauskunft-webhook:', error);
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
