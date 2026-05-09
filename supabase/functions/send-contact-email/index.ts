import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const serviceLabels: Record<string, string> = {
  "steuerberatung": "Steueroptimierung Unternehmen",
  "steueroptimierung-arbeitnehmer": "Steueroptimierung Arbeitnehmer",
  "global-sourcing": "Global Sourcing & Deals",
  "unternehmensberatung": "Unternehmensberatung",
  "ai-due-diligence": "AI & Due Diligence",
  "payment-solutions": "Payment Solutions",
  "solaranlagen": "Solaranlagen & Wärmepumpen",
  "immobilien": "Immobilien",
  "rechtsberatung": "Rechtsberatung",
  "sonstiges": "Sonstiges",
};

interface ContactEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service?: string;
  subject: string;
  message: string;
}

const sendEmail = async (to: string[], subject: string, html: string) => {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Clairmont Advisory <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return await res.json();
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, service, subject, message }: ContactEmailRequest = await req.json();
    const serviceLabel = service ? (serviceLabels[service] || service) : "";

    // Send notification email to Clairmont Advisory
    const notificationEmail = await sendEmail(
      ["info@clairmont-advisory.com"],
      `Neue Kontaktanfrage: ${subject}`,
      `
        <h2>Neue Kontaktanfrage erhalten</h2>
        <p><strong>Von:</strong> ${firstName} ${lastName}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        ${serviceLabel ? `<p><strong>Leistung:</strong> ${serviceLabel}</p>` : ''}
        <p><strong>Betreff:</strong> ${subject}</p>
        ${message ? `<p><strong>Nachricht:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
        <hr>
        <p><small>Diese E-Mail wurde über das Kontaktformular auf clairmontadvisory.de gesendet.</small></p>
      `
    );

    // Send confirmation email to customer
    const confirmationEmail = await sendEmail(
      [email],
      "Wir haben Ihre Nachricht erhalten",
      `
        <h2>Vielen Dank für Ihre Kontaktaufnahme, ${firstName}!</h2>
        <p>Wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>
        <h3>Ihre Anfrage:</h3>
        ${serviceLabel ? `<p><strong>Leistung:</strong> ${serviceLabel}</p>` : ''}
        <p><strong>Betreff:</strong> ${subject}</p>
        ${message ? `<p><strong>Nachricht:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
        <hr>
        <p>Mit freundlichen Grüßen,<br>Ihr Clairmont Advisory Team</p>
        <p>
          <small>
            Clairmont Advisory<br>
            E-Mail: info@clairmont-advisory.com<br>
            Tel: +49 176 84569934<br>
            Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.
          </small>
        </p>
      `
    );

    console.log("Emails sent successfully:", { notificationEmail, confirmationEmail });

    return new Response(
      JSON.stringify({ 
        success: true,
        notificationEmail,
        confirmationEmail
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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
