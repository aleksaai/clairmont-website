import jsPDF from "jspdf";
import { FormData } from "@/pages/Prognose";

export const generatePrognosePDF = (formData: FormData): Blob => {
  const doc = new jsPDF();
  let yPos = 20;
  const lineHeight = 7;
  const pageHeight = doc.internal.pageSize.height;
  
  const addText = (text: string, bold: boolean = false) => {
    if (yPos > pageHeight - 20) {
      doc.addPage();
      yPos = 20;
    }
    if (bold) {
      doc.setFont("helvetica", "bold");
    } else {
      doc.setFont("helvetica", "normal");
    }
    doc.text(text, 20, yPos);
    yPos += lineHeight;
  };
  
  const addSection = (title: string) => {
    yPos += 5;
    doc.setFontSize(14);
    addText(title, true);
    doc.setFontSize(11);
    yPos += 2;
  };
  
  // Header
  doc.setFontSize(18);
  addText("Steuer-Selbstauskunft", true);
  doc.setFontSize(11);
  addText(`Erstellt am: ${new Date().toLocaleDateString("de-DE")}`, false);
  yPos += 5;
  
  // Personal Information
  addSection("Persönliche Informationen");
  addText(`Name: ${formData.firstName} ${formData.lastName}`);
  addText(`Geburtsdatum: ${formData.birthDate || "Nicht angegeben"}`);
  addText(`Geschlecht: ${formData.gender || "Nicht angegeben"}`);
  addText(`Nationalität: ${formData.nationality || "Nicht angegeben"}`);
  addText(`Adresse: ${formData.address || "Nicht angegeben"}`);
  
  // Family
  addSection("Familiensituation");
  addText(`Familienstand: ${formData.maritalStatus || "Nicht angegeben"}`);
  if (formData.maritalStatus === "verheiratet") {
    addText(`Verheiratet seit: ${formData.marriedSince || "Nicht angegeben"}`);
    addText(`Ehepartner: ${formData.spouseName || "Nicht angegeben"}`);
    addText(`Geburtsdatum Ehepartner: ${formData.spouseBirthDate || "Nicht angegeben"}`);
    addText(`Beruf Ehepartner: ${formData.spouseOccupation || "Nicht angegeben"}`);
    addText(`Berufstätig: ${formData.spouseEmployed ? "Ja" : "Nein"}`);
  }
  if (formData.maritalStatus === "geschieden") {
    addText(`Scheidungsdatum: ${formData.divorceDate || "Nicht angegeben"}`);
  }
  
  // Children
  addSection("Kinder");
  if (formData.hasChildren && formData.children.length > 0) {
    formData.children.forEach((child, index) => {
      addText(`Kind ${index + 1}:`, true);
      addText(`  Name: ${child.name}`);
      addText(`  Geburtsdatum: ${child.birthDate}`);
      addText(`  Kindergeldbezug: ${child.childBenefitPeriod || "Nicht angegeben"}`);
    });
  } else {
    addText("Keine Kinder");
  }
  
  // Work
  addSection("Berufliche Tätigkeit");
  addText(`Beruf: ${formData.occupation || "Nicht angegeben"}`);
  addText(`Home-Office Tage: ${formData.homeOfficeDays || "Nicht angegeben"}`);
  addText(`Fortbildungskosten: ${formData.trainingCosts || "Nicht angegeben"}`);
  addText(`Arbeitsmittel: ${formData.businessEquipment || "Nicht angegeben"}`);
  
  // Income
  addSection("Einkommen & Einkünfte");
  addText(`Gewerbe: ${formData.hasBusiness ? "Ja" : "Nein"}`);
  if (formData.hasBusiness) {
    addText(`Art des Gewerbes: ${formData.businessType || "Nicht angegeben"}`);
  }
  addText(`Crypto/Trading Einkünfte: ${formData.hasCryptoIncome ? "Ja" : "Nein"}`);
  addText(`Staatliche Leistungen: ${formData.hasSocialBenefits ? "Ja" : "Nein"}`);
  if (formData.hasSocialBenefits) {
    addText(`Details: ${formData.socialBenefitDetails || "Nicht angegeben"}`);
    addText(`Summe: ${formData.socialBenefitAmount ? formData.socialBenefitAmount + " €" : "Nicht angegeben"}`);
  }
  addText(`Steuerbescheide vorhanden für: ${formData.taxYears.join(", ") || "Keine"}`);
  
  // Insurance
  addSection("Mitgliedschaften & Versicherungen");
  addText(`Gewerkschaftsmitglied: ${formData.isUnionMember ? "Ja" : "Nein"}`);
  if (formData.isUnionMember) {
    addText(`Gewerkschaft: ${formData.unionName || "Nicht angegeben"}`);
    addText(`Beitrag: ${formData.unionFee ? formData.unionFee + " €" : "Nicht angegeben"}`);
  }
  addText(`Sonstige Mitgliedschaften: ${formData.hasOtherMemberships ? "Ja" : "Nein"}`);
  if (formData.hasOtherMemberships) {
    addText(`Details: ${formData.otherMembershipsDetails || "Nicht angegeben"}`);
  }
  
  if (formData.insurances.length > 0) {
    addText("Versicherungen:", true);
    formData.insurances.forEach((ins, index) => {
      addText(`${index + 1}. ${ins.type || "Nicht angegeben"} - ${ins.provider || "Nicht angegeben"} (${ins.yearlyContribution || "0"} € jährlich)`);
    });
  }
  
  // Property
  addSection("Immobilien");
  addText(`Immobilienbesitz: ${formData.hasProperty ? "Ja" : "Nein"}`);
  if (formData.hasProperty && formData.properties.length > 0) {
    formData.properties.forEach((prop, index) => {
      addText(`Immobilie ${index + 1}:`, true);
      addText(`  Adresse: ${prop.address || "Nicht angegeben"}`);
      addText(`  Kaufpreis: ${prop.purchasePrice || "0"} €`);
      addText(`  Kaufdatum: ${prop.purchaseDate || "Nicht angegeben"}`);
      addText(`  Mieteinnahmen: ${prop.rent || "0"} €`);
    });
  }
  
  // Special Circumstances
  addSection("Besondere Umstände");
  addText(`Behinderung: ${formData.hasDisability ? "Ja" : "Nein"}`);
  addText(`Unterhaltszahlungen: ${formData.paysAlimony ? "Ja" : "Nein"}`);
  
  // Bank Details
  addSection("Bankverbindung");
  addText(`IBAN: ${formData.iban || "Nicht angegeben"}`);
  if (formData.partnerCode) {
    addText(`Partnercode: ${formData.partnerCode}`);
  }
  
  // Footer
  yPos += 10;
  doc.setFontSize(9);
  addText("Diese Selbstauskunft wurde über das Clairmont Advisory Prognose-Formular erstellt.", false);
  
  return doc.output("blob");
};
