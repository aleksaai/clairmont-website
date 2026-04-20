import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { PDFDocument, StandardFonts, rgb } from "https://esm.sh/pdf-lib@1.17.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const WEBHOOK_URL = "https://ufnxliieaejdvxcanqux.supabase.co/functions/v1/insurance-webhook";
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

// Generate PDF for Baufinanzierung form
async function generateBaufinanzierungPDF(jsonData: any): Promise<Uint8Array> {
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
  addText('Baufinanzierung Selbstauskunft', true, 18);
  yPos -= 5;
  addText(`Erstellt am: ${new Date().toLocaleDateString('de-DE')}`, false, 10);
  yPos -= 10;
  
  // Personal Data
  addSection('Persoenliche Daten');
  addText(`Name: ${jsonData.firstName || ''} ${jsonData.lastName || ''}`);
  addText(`Telefon: ${jsonData.phone || 'Nicht angegeben'}`);
  addText(`E-Mail: ${jsonData.email || 'Nicht angegeben'}`);
  addText(`Adresse: ${jsonData.address || 'Nicht angegeben'}`);
  addText(`Wohnt dort seit: ${jsonData.livingThereSince || 'Nicht angegeben'}`);
  
  // Family
  addSection('Familie');
  addText(`Verheiratet: ${jsonData.isMarried ? 'Ja' : 'Nein'}`);
  addText(`Kinder: ${jsonData.hasChildren ? 'Ja' : 'Nein'}`);
  if (jsonData.hasChildren && jsonData.children && jsonData.children.length > 0) {
    jsonData.children.forEach((child: any, index: number) => {
      addText(`Kind ${index + 1}: ${child.firstName || ''} ${child.lastName || ''}, geb. ${child.birthDate || ''}`);
    });
  }
  
  // Finances
  addSection('Finanzen');
  addText(`Selbststaendig: ${jsonData.isSelfEmployed ? 'Ja' : 'Nein'}`);
  addText(`Private Krankenversicherung: ${jsonData.hasPrivateHealthInsurance ? 'Ja' : 'Nein'}`);
  
  // Current Obligations
  addSection('Aktuelle Verpflichtungen');
  if (jsonData.currentLoans && jsonData.currentLoans.length > 0) {
    jsonData.currentLoans.forEach((loan: any, index: number) => {
      addText(`Darlehen ${index + 1}:`);
      addText(`  Kreditgeber: ${loan.lender || 'Nicht angegeben'}`);
      addText(`  Monatliche Rate: ${loan.monthlyRate || 0} EUR`);
      addText(`  Restschuld: ${loan.remainingDebt || 0} EUR`);
      addText(`  Wird abgeloest: ${loan.isToBeReplaced ? 'Ja' : 'Nein'}`);
    });
  } else {
    addText('Keine aktuellen Darlehen');
  }
  addText(`Weitere Verpflichtungen: ${jsonData.hasOtherObligations ? 'Ja' : 'Nein'}`);
  if (jsonData.hasOtherObligations && jsonData.otherObligations) {
    addText(`Details: ${jsonData.otherObligations}`);
  }
  
  // Property Data
  addSection('Immobiliendaten');
  addText(`Grundbuchauszug vorhanden: ${jsonData.hasLandRegisterExtract ? 'Ja' : 'Nein'}`);
  addText(`Energieausweis vorhanden: ${jsonData.hasEnergyCertificate ? 'Ja' : 'Nein'}`);
  addText(`Wohnflaechenberechnung vorhanden: ${jsonData.hasLivingSpaceCalculation ? 'Ja' : 'Nein'}`);
  
  // Rental Information
  addSection('Vermietung');
  addText(`Vermietet: ${jsonData.isRented ? 'Ja' : 'Nein'}`);
  
  // Bank Details
  addSection('Bankverbindung');
  addText(`IBAN: ${jsonData.iban || 'Nicht angegeben'}`);
  
  // Confirmations
  addSection('Bestaetigungen');
  addText(`Korrektheit bestaetigt: ${jsonData.confirmCorrectness ? 'Ja' : 'Nein'}`);
  addText(`AGB akzeptiert: ${jsonData.acceptTerms ? 'Ja' : 'Nein'}`);
  addText(`Datenschutz akzeptiert: ${jsonData.acceptPrivacy ? 'Ja' : 'Nein'}`);
  
  // Footer
  yPos -= 20;
  addText('Diese Selbstauskunft wurde ueber das Clairmont Advisory Baufinanzierung-Formular erstellt.', false, 9);
  
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
    
    console.log('Processing Baufinanzierung submission...');
    console.log('Form data received:', JSON.stringify(jsonData, null, 2));

    // Collect all files for webhook
    const filesForWebhook: { name: string; type: string; data: string; category: string }[] = [];

    // File categories from BaufiFormData
    const fileCategories = [
      'idCardFront',
      'idCardBack',
      'spouseIdCard',
      'taxReturns2021',
      'taxReturns2022',
      'taxReturns2023',
      'taxReturns2024',
      'balanceSheets2024',
      'bwa2024',
      'privateHealthInsuranceProof',
      'landRegisterExtract',
      'energyCertificate',
      'livingSpaceCalculation',
      'cadastralMap',
      'divisionDeclaration',
      'buildingPlans',
      'photosInterior',
      'photosExterior',
      'rentalContracts',
      'rentalList',
      'rentalIncomeProof'
    ];
    
    for (const category of fileCategories) {
      const files = formData.getAll(category);
      
      for (const file of files) {
        if (file && file instanceof File) {
          const arrayBuffer = await file.arrayBuffer();
          
          filesForWebhook.push({
            name: file.name,
            type: file.type,
            data: arrayBufferToBase64(arrayBuffer),
            category: category
          });
          
          console.log(`File collected: ${file.name} (${category})`);
        }
      }
    }

    console.log(`Total files collected: ${filesForWebhook.length}`);

    // Generate PDF
    const pdfBytes = await generateBaufinanzierungPDF(jsonData);
    const pdfBase64 = arrayBufferToBase64(pdfBytes);
    console.log('PDF generated successfully');

    // Prepare webhook payload
    const webhookPayload = {
      formType: 'baufinanzierung-selbstauskunft',
      submittedAt: new Date().toISOString(),
      formData: jsonData,
      pdfContent: {
        name: `Baufinanzierung-Selbstauskunft_${jsonData.firstName || 'Unknown'}_${jsonData.lastName || 'User'}.pdf`,
        type: 'application/pdf',
        data: pdfBase64
      },
      files: filesForWebhook
    };

    console.log('Sending to webhook...');

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
    console.error('Error in submit-baufinanzierung-webhook:', error);
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
