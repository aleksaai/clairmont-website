import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 14;

interface PrognoseEmailRequest {
  formData: any;
  userEmail: string;
}

interface FileLink {
  filename: string;
  path: string;
  url: string;
}

const escapeHtml = (value: unknown): string =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "N/A";
  if (typeof value === "boolean") return value ? "Ja" : "Nein";
  return String(value);
};

const formatCurrency = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "N/A";
  return `${value} €`;
};

const renderKeyValueTable = (rows: Array<[string, unknown]>) => `
  <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
    ${rows
      .map(
        ([label, value]) => `
          <tr>
            <td><strong>${escapeHtml(label)}</strong></td>
            <td>${escapeHtml(formatValue(value))}</td>
          </tr>
        `,
      )
      .join("")}
  </table>
`;

const getArrayLength = (value: unknown): number => (Array.isArray(value) ? value.length : 0);

const extractPaths = (items: unknown, target: Set<string>) => {
  if (!items) return;

  if (Array.isArray(items)) {
    items.forEach((item) => {
      if (typeof item === "string" && item.trim()) {
        target.add(item);
        return;
      }

      if (item && typeof item === "object" && "path" in item && typeof item.path === "string" && item.path.trim()) {
        target.add(item.path);
      }
    });
    return;
  }

  if (typeof items === "string" && items.trim()) {
    target.add(items);
  }
};

const createSignedFileLinks = async (formData: any): Promise<FileLink[]> => {
  const filePaths = new Set<string>();

  if (formData.taxCertificatesByYear) {
    Object.values(formData.taxCertificatesByYear).forEach((files) => extractPaths(files, filePaths));
  }

  if (formData.documents) {
    Object.values(formData.documents).forEach((files) => extractPaths(files, filePaths));
  }

  extractPaths(formData.propertyDocuments, filePaths);
  extractPaths(formData.additionalDocuments, filePaths);

  const links: FileLink[] = [];

  for (const filePath of filePaths) {
    try {
      const { data, error } = await supabase.storage
        .from("prognose-documents")
        .createSignedUrl(filePath, SIGNED_URL_TTL_SECONDS);

      if (error || !data?.signedUrl) {
        console.error("Error creating signed URL:", filePath, error);
        continue;
      }

      links.push({
        path: filePath,
        filename: filePath.split("/").pop() || "document",
        url: data.signedUrl,
      });
    } catch (error) {
      console.error("Error processing file path:", filePath, error);
    }
  }

  console.log(`Prepared ${links.length} signed document links out of ${filePaths.size} files`);
  return links;
};

const renderChildrenTable = (children: any[] = []) => {
  if (!children.length) return "<p>Keine Kinder angegeben</p>";

  return `
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
      <thead>
        <tr>
          <th>Kind Nr.</th>
          <th>Name</th>
          <th>Geburtsdatum</th>
          <th>Kindergeldbezug</th>
        </tr>
      </thead>
      <tbody>
        ${children
          .map(
            (child, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${escapeHtml(formatValue(child?.name))}</td>
                <td>${escapeHtml(formatValue(child?.birthDate))}</td>
                <td>${escapeHtml(formatValue(child?.childBenefitPeriod))}</td>
              </tr>
            `,
          )
          .join("")}
      </tbody>
    </table>
  `;
};

const renderInsurancesTable = (insurances: any[] = []) => {
  if (!insurances.length) return "<p>Keine Versicherungen angegeben</p>";

  return `
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
      <thead>
        <tr>
          <th>Typ</th>
          <th>Anbieter</th>
          <th>Jahresbeitrag</th>
        </tr>
      </thead>
      <tbody>
        ${insurances
          .map(
            (insurance) => `
              <tr>
                <td>${escapeHtml(formatValue(insurance?.type))}</td>
                <td>${escapeHtml(formatValue(insurance?.provider))}</td>
                <td>${escapeHtml(formatCurrency(insurance?.yearlyContribution))}</td>
              </tr>
            `,
          )
          .join("")}
      </tbody>
    </table>
  `;
};

const renderPropertiesTable = (properties: any[] = []) => {
  if (!properties.length) return "<p>Keine Immobilien angegeben</p>";

  return `
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
      <thead>
        <tr>
          <th>Nr.</th>
          <th>Adresse</th>
          <th>Kaufpreis</th>
          <th>Kaufdatum</th>
          <th>Fertigstellung</th>
          <th>Wohnungen</th>
          <th>Fläche (m²)</th>
          <th>Kaltmiete</th>
          <th>Nebenkosten</th>
          <th>Schuldzinsen</th>
          <th>Notarkosten</th>
          <th>Grundsteuer</th>
          <th>Sonstige Kosten</th>
        </tr>
      </thead>
      <tbody>
        ${properties
          .map(
            (property, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${escapeHtml(formatValue(property?.address))}</td>
                <td>${escapeHtml(formatCurrency(property?.purchasePrice))}</td>
                <td>${escapeHtml(formatValue(property?.purchaseDate))}</td>
                <td>${escapeHtml(formatValue(property?.completionDate))}</td>
                <td>${escapeHtml(formatValue(property?.numberOfUnits))}</td>
                <td>${escapeHtml(formatValue(property?.rentedArea))}</td>
                <td>${escapeHtml(formatCurrency(property?.rent))}</td>
                <td>${escapeHtml(formatCurrency(property?.additionalCosts))}</td>
                <td>${escapeHtml(formatCurrency(property?.interestExpense))}</td>
                <td>${escapeHtml(formatCurrency(property?.notaryCosts))}</td>
                <td>${escapeHtml(formatCurrency(property?.propertyTax))}</td>
                <td>${escapeHtml(
                  property?.otherCostsDescription
                    ? `${formatValue(property.otherCostsDescription)}: ${formatCurrency(property.otherCostsAmount)}`
                    : "N/A",
                )}</td>
              </tr>
            `,
          )
          .join("")}
      </tbody>
    </table>
  `;
};

const renderFileLinks = (fileLinks: FileLink[]) => {
  if (!fileLinks.length) return "<p>Keine Dokumentlinks verfügbar.</p>";

  return `
    <ul style="padding-left: 18px; margin-bottom: 12px;">
      ${fileLinks
        .map(
          (file) => `
            <li style="margin-bottom: 8px;">
              <a href="${escapeHtml(file.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(file.filename)}</a>
              <br />
              <span style="color: #666; font-size: 12px;">${escapeHtml(file.path)}</span>
            </li>
          `,
        )
        .join("")}
    </ul>
    <p style="color: #666; font-size: 12px;">Die Download-Links sind aus Sicherheitsgründen 14 Tage gültig.</p>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData, userEmail }: PrognoseEmailRequest = await req.json();

    console.log("Sending prognose email to service@clairmont-advisory.com");

    const fileLinks = await createSignedFileLinks(formData);
    const taxCertificateCount = Object.values(formData.taxCertificatesByYear ?? {}).reduce(
      (sum: number, files: unknown) => sum + getArrayLength(files),
      0,
    );

    const emailResponse = await resend.emails.send({
      from: "Clairmont <noreply@tax.clairmont-advisory.com>",
      to: ["service@clairmont-advisory.com"],
      replyTo: userEmail,
      subject: `Neue Steuerprognose von ${formData.firstName || "N/A"} ${formData.lastName || "N/A"}`,
      html: `
        <h1>Neue Steuerprognose</h1>

        <h2>Persönliche Informationen</h2>
        ${renderKeyValueTable([
          ["Vorname", formData.firstName],
          ["Nachname", formData.lastName],
          ["Geburtsdatum", formData.birthDate],
          ["Geschlecht", formData.gender],
          ["Nationalität", formData.nationality],
          ["E-Mail", formData.email],
          [
            "Wohnadresse",
            formData.personalInfo
              ? `${formData.personalInfo.street || ""}, ${formData.personalInfo.zipCode || ""} ${formData.personalInfo.city || ""}`.trim()
              : formData.address,
          ],
          ["Abweichende Adresse auf Lohnsteuerbescheid", formData.differentAddress],
          ["Alternative Adresse", formData.differentAddress ? formData.alternativeAddress : "N/A"],
        ])}

        <h2>Berufliche Informationen</h2>
        ${renderKeyValueTable([
          ["Beruf", formData.occupation],
          [
            "Arbeitsplatz-Adresse",
            formData.workplace
              ? `${formData.workplace.street || ""}, ${formData.workplace.zipCode || ""} ${formData.workplace.city || ""}`.trim()
              : "N/A",
          ],
          ["Home-Office Tage", formData.homeOfficeDays],
          ["Fortbildungskosten", formData.trainingCosts],
          ["Arbeitsmittel", formData.businessEquipment],
        ])}

        <h2>Familiensituation</h2>
        ${renderKeyValueTable([
          ["Familienstand", formData.maritalStatus],
          ["Verheiratet seit", formData.marriedSince],
          ["Ehepartner Name", formData.spouseName],
          ["Ehepartner Geburtsdatum", formData.spouseBirthDate],
          ["Ehepartner Beruf", formData.spouseOccupation],
          ["Ehepartner berufstätig", formData.spouseEmployed],
          ["Scheidungsdatum", formData.divorceDate],
        ])}

        <h2>Kinder</h2>
        ${renderKeyValueTable([["Hat Kinder", formData.hasChildren]])}
        ${renderChildrenTable(formData.children)}

        <h2>Einkommen & Einkünfte</h2>
        ${renderKeyValueTable([
          ["Gewerbe", formData.hasBusiness],
          ["Art des Gewerbes", formData.businessType],
          ["Crypto/Trading Einkünfte", formData.hasCryptoIncome],
          ["Staatliche Leistungen", formData.hasSocialBenefits],
          ["Staatliche Leistungen Details", formData.socialBenefitDetails],
          ["Staatliche Leistungen Summe", formatCurrency(formData.socialBenefitAmount)],
          ["Steuerbescheide vorhanden für", Array.isArray(formData.taxYears) ? formData.taxYears.join(", ") : "N/A"],
        ])}

        <h2>Mitgliedschaften & Versicherungen</h2>
        ${renderKeyValueTable([
          ["Gewerkschaftsmitglied", formData.isUnionMember],
          ["Gewerkschaft Name", formData.unionName],
          ["Gewerkschaftsbeitrag", formatCurrency(formData.unionFee)],
          ["Sonstige Mitgliedschaften", formData.hasOtherMemberships],
          ["Sonstige Mitgliedschaften Details", formData.otherMembershipsDetails],
        ])}
        ${renderInsurancesTable(formData.insurances)}

        <h2>Immobilien</h2>
        ${renderKeyValueTable([["Immobilienbesitz", formData.hasProperty]])}
        ${renderPropertiesTable(formData.properties)}

        <h2>Besondere Umstände</h2>
        ${renderKeyValueTable([
          ["Behinderung", formData.hasDisability],
          ["Grad der Behinderung", formData.disabilityDegree],
          ["Unterhaltszahlungen", formData.paysAlimony],
          ["Unterhaltszahlungen Betrag", formData.alimonyAmount],
        ])}

        <h2>Hochgeladene Dokumente</h2>
        ${renderKeyValueTable([
          ["Lohnsteuerbescheide nach Jahren", taxCertificateCount],
          ["Personalausweis", getArrayLength(formData.documents?.idCard)],
          ["Behindertenausweis", getArrayLength(formData.documents?.disabilityCertificate)],
          ["Immobilien-Unterlagen", getArrayLength(formData.propertyDocuments)],
          ["Weitere Unterlagen", getArrayLength(formData.additionalDocuments)],
          ["Sonstige Belege", getArrayLength(formData.documents?.otherDocuments)],
          ["Verfügbare Dokumentlinks", fileLinks.length],
        ])}

        <h3>Dokument-Downloads</h3>
        ${renderFileLinks(fileLinks)}

        <h2>Bankverbindung</h2>
        ${renderKeyValueTable([
          ["IBAN", formData.iban],
          ["E-Mail", formData.email],
          ["E-Mail bestätigt", formData.confirmEmail],
          ["Partnercode", formData.partnerCode],
        ])}

        ${formData.failedUploads && formData.failedUploads.length > 0 ? `
          <h2 style="color: #d97706;">⚠️ Fehlgeschlagene Datei-Uploads</h2>
          <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px; background-color: #fef3c7;">
            <thead>
              <tr style="background-color: #fcd34d;">
                <th>Dateiname</th>
              </tr>
            </thead>
            <tbody>
              ${formData.failedUploads
                .map(
                  (filename: string) => `
                    <tr>
                      <td>${escapeHtml(filename)}</td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
          <p style="color: #d97706; font-weight: bold;">
            Hinweis: Die oben genannten Dateien konnten nicht hochgeladen werden.
          </p>
        ` : ""}

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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
