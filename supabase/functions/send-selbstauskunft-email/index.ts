import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.json();

    const emailHtml = `
      <h2>Neue Selbstauskunft für Privatkredit</h2>
      <h3>Persönliche Daten</h3>
      <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p><strong>E-Mail:</strong> ${formData.email}</p>
      <p><strong>Telefon:</strong> ${formData.phone}</p>
      <p><strong>Adresse:</strong> ${formData.currentAddress}</p>
      <p><strong>Wohnhaft seit:</strong> ${formData.livingSince}</p>
      ${formData.previousAddress ? `<p><strong>Vorherige Adresse:</strong> ${formData.previousAddress}</p>` : ''}
      
      <h3>Einkommen & Beruf</h3>
      <p><strong>Berufsbezeichnung:</strong> ${formData.jobTitle}</p>
      ${formData.rentWarm ? `<p><strong>Warmmiete:</strong> ${formData.rentWarm} €</p>` : ''}
      
      <h3>Bankverbindung</h3>
      <p><strong>IBAN:</strong> ${formData.iban}</p>
      
      <h3>Kreditwunsch</h3>
      <p><strong>Gewünschter Betrag:</strong> ${formData.loanAmount} €</p>
      <p><strong>Verwendungszweck:</strong> ${formData.loanPurpose}</p>
    `;

    await resend.emails.send({
      from: "Clairmont Advisory <onboarding@resend.dev>",
      to: ["kolukisaerolemre@gmail.com"],
      subject: `Neue Selbstauskunft: ${formData.firstName} ${formData.lastName}`,
      html: emailHtml,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);
