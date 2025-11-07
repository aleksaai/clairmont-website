import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PrognoseEmailRequest {
  formData: any;
  userEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData, userEmail }: PrognoseEmailRequest = await req.json();

    console.log("Sending prognose email to:", userEmail);

    const emailResponse = await resend.emails.send({
      from: "Clairmont <onboarding@resend.dev>",
      to: ["aleksa@destinymedia.de"],
      replyTo: userEmail,
      subject: `Neue Steuerprognose von ${formData.firstName} ${formData.lastName}`,
      html: `
        <h1>Neue Steuerprognose</h1>
        
        <h2>Persönliche Informationen</h2>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Geburtsdatum:</strong> ${formData.birthDate || 'Nicht angegeben'}</p>
        <p><strong>Geschlecht:</strong> ${formData.gender || 'Nicht angegeben'}</p>
        <p><strong>Nationalität:</strong> ${formData.nationality || 'Nicht angegeben'}</p>
        <p><strong>Adresse:</strong> ${formData.address || 'Nicht angegeben'}</p>
        
        <h2>Familiensituation</h2>
        <p><strong>Familienstand:</strong> ${formData.maritalStatus || 'Nicht angegeben'}</p>
        ${formData.maritalStatus === 'verheiratet' ? `
          <p><strong>Verheiratet seit:</strong> ${formData.marriedSince || 'Nicht angegeben'}</p>
          <p><strong>Ehepartner:</strong> ${formData.spouseName || 'Nicht angegeben'}</p>
          <p><strong>Geburtsdatum Ehepartner:</strong> ${formData.spouseBirthDate || 'Nicht angegeben'}</p>
          <p><strong>Beruf Ehepartner:</strong> ${formData.spouseOccupation || 'Nicht angegeben'}</p>
          <p><strong>Berufstätig:</strong> ${formData.spouseEmployed ? 'Ja' : 'Nein'}</p>
        ` : ''}
        ${formData.maritalStatus === 'geschieden' ? `
          <p><strong>Scheidungsdatum:</strong> ${formData.divorceDate || 'Nicht angegeben'}</p>
        ` : ''}
        
        <h2>Kinder</h2>
        ${formData.hasChildren && formData.children?.length > 0 ? 
          formData.children.map((child: any, index: number) => `
            <p><strong>Kind ${index + 1}:</strong></p>
            <ul>
              <li>Name: ${child.name}</li>
              <li>Geburtsdatum: ${child.birthDate}</li>
              <li>Kindergeldbezug: ${child.childBenefitPeriod || 'Nicht angegeben'}</li>
            </ul>
          `).join('') 
        : '<p>Keine Kinder</p>'}
        
        <h2>Berufliche Tätigkeit</h2>
        <p><strong>Beruf:</strong> ${formData.occupation || 'Nicht angegeben'}</p>
        <p><strong>Home-Office Tage:</strong> ${formData.homeOfficeDays || 'Nicht angegeben'}</p>
        <p><strong>Fortbildungskosten:</strong> ${formData.trainingCosts || 'Nicht angegeben'}</p>
        <p><strong>Arbeitsmittel:</strong> ${formData.businessEquipment || 'Nicht angegeben'}</p>
        
        <h2>Einkommen & Einkünfte</h2>
        <p><strong>Gewerbe:</strong> ${formData.hasBusiness ? 'Ja' : 'Nein'}</p>
        ${formData.hasBusiness ? `<p><strong>Art des Gewerbes:</strong> ${formData.businessType || 'Nicht angegeben'}</p>` : ''}
        <p><strong>Crypto/Trading Einkünfte:</strong> ${formData.hasCryptoIncome ? 'Ja' : 'Nein'}</p>
        <p><strong>Staatliche Leistungen:</strong> ${formData.hasSocialBenefits ? 'Ja' : 'Nein'}</p>
        ${formData.hasSocialBenefits ? `
          <p><strong>Details:</strong> ${formData.socialBenefitDetails || 'Nicht angegeben'}</p>
          <p><strong>Summe:</strong> ${formData.socialBenefitAmount ? formData.socialBenefitAmount + ' €' : 'Nicht angegeben'}</p>
        ` : ''}
        <p><strong>Steuerbescheide vorhanden für:</strong> ${formData.taxYears?.join(', ') || 'Keine'}</p>
        
        <h2>Mitgliedschaften & Versicherungen</h2>
        <p><strong>Gewerkschaftsmitglied:</strong> ${formData.isUnionMember ? 'Ja' : 'Nein'}</p>
        ${formData.isUnionMember ? `
          <p><strong>Gewerkschaft:</strong> ${formData.unionName || 'Nicht angegeben'}</p>
          <p><strong>Beitrag:</strong> ${formData.unionFee ? formData.unionFee + ' €' : 'Nicht angegeben'}</p>
        ` : ''}
        <p><strong>Sonstige Mitgliedschaften:</strong> ${formData.hasOtherMemberships ? 'Ja' : 'Nein'}</p>
        ${formData.hasOtherMemberships ? `<p><strong>Details:</strong> ${formData.otherMembershipsDetails || 'Nicht angegeben'}</p>` : ''}
        
        ${formData.insurances?.length > 0 ? `
          <h3>Versicherungen:</h3>
          <ul>
            ${formData.insurances.map((ins: any) => `
              <li>${ins.type || 'Nicht angegeben'} - ${ins.provider || 'Nicht angegeben'} (${ins.yearlyContribution || '0'} € jährlich)</li>
            `).join('')}
          </ul>
        ` : ''}
        
        <h2>Immobilien</h2>
        <p><strong>Immobilienbesitz:</strong> ${formData.hasProperty ? 'Ja' : 'Nein'}</p>
        ${formData.hasProperty && formData.properties?.length > 0 ? 
          formData.properties.map((prop: any, index: number) => `
            <p><strong>Immobilie ${index + 1}:</strong></p>
            <ul>
              <li>Adresse: ${prop.address || 'Nicht angegeben'}</li>
              <li>Kaufpreis: ${prop.purchasePrice || '0'} €</li>
              <li>Kaufdatum: ${prop.purchaseDate || 'Nicht angegeben'}</li>
              <li>Mieteinnahmen: ${prop.rent || '0'} €</li>
            </ul>
          `).join('')
        : ''}
        
        <h2>Besondere Umstände</h2>
        <p><strong>Behinderung:</strong> ${formData.hasDisability ? 'Ja' : 'Nein'}</p>
        <p><strong>Unterhaltszahlungen:</strong> ${formData.paysAlimony ? 'Ja' : 'Nein'}</p>
        
        <h2>Hochgeladene Dokumente</h2>
        <p><strong>Lohnsteuerbescheinigung:</strong> ${formData.documents?.taxCertificate?.length || 0} Datei(en)</p>
        <p><strong>Personalausweis:</strong> ${formData.documents?.idCard?.length || 0} Datei(en)</p>
        ${formData.hasDisability ? `<p><strong>Behindertenausweis:</strong> ${formData.documents?.disabilityCertificate?.length || 0} Datei(en)</p>` : ''}
        ${formData.documents?.otherDocuments?.length ? `<p><strong>Sonstige Belege:</strong> ${formData.documents.otherDocuments.length} Datei(en)</p>` : ''}
        
        <h2>Bankverbindung</h2>
        <p><strong>IBAN:</strong> ${formData.iban || 'Nicht angegeben'}</p>
        ${formData.partnerCode ? `<p><strong>Partnercode:</strong> ${formData.partnerCode}</p>` : ''}
        
        <p style="margin-top: 30px; color: #666;">
          Diese Anfrage wurde über das Clairmont Steuerprognose-Formular eingereicht.
        </p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-prognose-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
