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
      to: ["info@clairmont.ch"], // Change this to your desired recipient email
      replyTo: userEmail,
      subject: `Neue Steuerprognose von ${formData.personalInfo?.firstName} ${formData.personalInfo?.lastName}`,
      html: `
        <h1>Neue Steuerprognose</h1>
        <h2>Persönliche Informationen</h2>
        <p><strong>Name:</strong> ${formData.personalInfo?.firstName} ${formData.personalInfo?.lastName}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Telefon:</strong> ${formData.personalInfo?.phone || 'Nicht angegeben'}</p>
        <p><strong>Geburtsdatum:</strong> ${formData.personalInfo?.birthDate || 'Nicht angegeben'}</p>
        <p><strong>Strasse:</strong> ${formData.personalInfo?.street || 'Nicht angegeben'}</p>
        <p><strong>PLZ:</strong> ${formData.personalInfo?.zipCode || 'Nicht angegeben'}</p>
        <p><strong>Ort:</strong> ${formData.personalInfo?.city || 'Nicht angegeben'}</p>
        
        <h2>Familiensituation</h2>
        <p><strong>Zivilstand:</strong> ${formData.family?.maritalStatus || 'Nicht angegeben'}</p>
        ${formData.family?.partnerFirstName ? `<p><strong>Partner:</strong> ${formData.family.partnerFirstName} ${formData.family.partnerLastName}</p>` : ''}
        
        <h2>Kinder</h2>
        <p><strong>Anzahl Kinder:</strong> ${formData.children?.hasChildren === 'yes' ? formData.children.childrenCount : 'Keine'}</p>
        
        <h2>Erwerbstätigkeit</h2>
        <p><strong>Erwerbstätig:</strong> ${formData.work?.isEmployed || 'Nicht angegeben'}</p>
        ${formData.work?.employer ? `<p><strong>Arbeitgeber:</strong> ${formData.work.employer}</p>` : ''}
        
        <h2>Einkommen</h2>
        <p><strong>Jahreseinkommen:</strong> CHF ${formData.income?.annualIncome || '0'}</p>
        ${formData.income?.partnerAnnualIncome ? `<p><strong>Partner Jahreseinkommen:</strong> CHF ${formData.income.partnerAnnualIncome}</p>` : ''}
        
        <h2>Versicherungen</h2>
        <p><strong>Säule 3a:</strong> CHF ${formData.insurance?.pillar3a || '0'}</p>
        <p><strong>Krankenversicherung:</strong> CHF ${formData.insurance?.healthInsurance || '0'}</p>
        
        <h2>Immobilien</h2>
        <p><strong>Immobilienbesitz:</strong> ${formData.property?.hasProperty || 'Nicht angegeben'}</p>
        
        ${formData.specialCircumstances?.hasCircumstances === 'yes' ? `
        <h2>Besondere Umstände</h2>
        <p>${formData.specialCircumstances.description}</p>
        ` : ''}
        
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
