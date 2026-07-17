import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Home } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import officeBackground from "@/assets/office-background.png";

// Import step components
import WelcomeStep from "@/components/prognose/WelcomeStep";
import QualificationStep from "@/components/prognose/QualificationStep";
import PersonalInfoStep from "@/components/prognose/PersonalInfoStep";
import FamilyStep from "@/components/prognose/FamilyStep";
import ChildrenStep from "@/components/prognose/ChildrenStep";
import WorkStep from "@/components/prognose/WorkStep";
import CheckStep from "@/components/prognose/CheckStep";
import IncomeStep from "@/components/prognose/IncomeStep";
import TaxCertificateUploadStep from "@/components/prognose/TaxCertificateUploadStep";
import CryptoUploadStep from "@/components/prognose/CryptoUploadStep";
import InsuranceStep from "@/components/prognose/InsuranceStep";
import PropertyStep from "@/components/prognose/PropertyStep";
import SpecialCircumstancesStep from "@/components/prognose/SpecialCircumstancesStep";
import SupportingDocumentsStep from "@/components/prognose/SupportingDocumentsStep";
import AdditionalDocumentsStep from "@/components/prognose/AdditionalDocumentsStep";
import BankDetailsStep from "@/components/prognose/BankDetailsStep";
import DocumentUploadStep from "@/components/prognose/DocumentUploadStep";
import VerificationStep from "@/components/prognose/VerificationStep";
import SuccessStep from "@/components/prognose/SuccessStep";

export interface FormData {
  // Qualification
  grossSalaryOver2500: boolean | null;
  wageTaxOver2000: boolean | null;
  federalState: string;
  qualificationCity: string;

  // Personal Info
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  differentAddress: boolean;
  alternativeAddress?: string;
  personalInfo?: {
    street?: string;
    zipCode?: string;
    city?: string;
  };
  
  // Family
  maritalStatus: string;
  marriedSince?: string;
  spouseName?: string;
  spouseBirthDate?: string;
  spouseOccupation?: string;
  spouseEmployed?: boolean;
  spouseTaxDocument?: File;
  spouseIncomeDocuments?: File[];
  spouseReceivedParentalBenefit: boolean | null;
  spouseParentalBenefitDocuments?: File[];
  divorceDate?: string;
  
  // Children
  hasChildren: boolean;
  children: Array<{
    name: string;
    birthDate: string;
    childBenefitPeriod: string;
  }>;
  
  // Work
  occupation: string;
  homeOfficeDays: string;
  workplace?: {
    street?: string;
    zipCode?: string;
    city?: string;
  };
  trainingCosts: string;
  businessEquipment: string;
  trainingCostDocuments?: File[];
  businessEquipmentDocuments?: File[];
  workPeriodsByYear?: Record<string, {
    from: string;
    to: string;
    gapExplanation: string;
  }>;
  
  // Income
  hasBusiness: boolean;
  businessType?: string;
  businessDocuments?: File[];
  hasCryptoIncome: boolean;
  cryptoDocuments?: File[];
  hasSocialBenefits: boolean;
  socialBenefitDetails?: string;
  socialBenefitAmount?: string;
  taxYears: string[];
  
  // Insurance
  isUnionMember: boolean;
  unionFee?: string;
  unionName?: string;
  hasOtherMemberships: boolean;
  otherMembershipsDetails?: string;
  insurances: Array<{
    type: string;
    provider: string;
    yearlyContribution?: string;
  }>;
  
  // Property
  hasProperty: boolean;
  properties: Array<{
    address: string;
    usageType?: string;
    purchasePrice: string;
    purchaseDate: string;
    completionDate: string;
    numberOfUnits: string;
    rentedArea: string;
    rent: string;
    additionalCosts?: string;
    interestExpense: string;
    notaryCosts: string;
    propertyTax: string;
    otherCostsDescription?: string;
    otherCostsAmount?: string;
  }>;
  propertyDocuments?: File[];

  // Additional tax topics
  hasVehicle: boolean | null;
  vehicleDocuments?: File[];
  educationCompleted: boolean | null;
  educationDocuments?: File[];
  
  // Special Circumstances
  hasDisability: boolean;
  disabilityProof?: File;
  paysAlimony: boolean;
  alimonyProof?: File;
  
  // Documents Upload
  documents?: {
    taxCertificate?: File[];
    idCard?: File[];
    disabilityCertificate?: File[];
    otherDocuments?: File[];
  };
  taxCertificatesByYear?: Record<string, File[]>;
  additionalDocuments?: File[];
  
  // Bank Details
  iban: string;
  confirmCorrectness: boolean;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  partnerCode?: string;
  confirmEmail?: string;
  noTaxCertificatesConfirmed?: boolean;
}

const stripFilesForPersistence = (data: FormData): FormData => {
  const {
    spouseTaxDocument: _spouseTaxDocument,
    spouseIncomeDocuments: _spouseIncomeDocuments,
    spouseParentalBenefitDocuments: _spouseParentalBenefitDocuments,
    trainingCostDocuments: _trainingCostDocuments,
    businessEquipmentDocuments: _businessEquipmentDocuments,
    businessDocuments: _businessDocuments,
    cryptoDocuments: _cryptoDocuments,
    propertyDocuments: _propertyDocuments,
    vehicleDocuments: _vehicleDocuments,
    educationDocuments: _educationDocuments,
    disabilityProof: _disabilityProof,
    alimonyProof: _alimonyProof,
    taxCertificatesByYear: _taxCertificatesByYear,
    additionalDocuments: _additionalDocuments,
    documents: _documents,
    ...serializable
  } = data;

  return serializable as FormData;
};

const Prognose = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [submissionId] = useState(() => {
    const existing = localStorage.getItem("prognoseSubmissionId");
    if (existing) return existing;
    const created = crypto.randomUUID();
    localStorage.setItem("prognoseSubmissionId", created);
    return created;
  });
  const hasRefParam = !!searchParams.get("ref");
  const [formData, setFormData] = useState<FormData>({
    grossSalaryOver2500: null,
    wageTaxOver2000: null,
    federalState: "",
    qualificationCity: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    nationality: "",
    email: "",
    phone: "",
    address: "",
    differentAddress: false,
    maritalStatus: "",
    spouseEmployed: false,
    spouseReceivedParentalBenefit: null,
    hasChildren: false,
    children: [],
    occupation: "",
    homeOfficeDays: "",
    trainingCosts: "",
    businessEquipment: "",
    hasBusiness: false,
    hasCryptoIncome: false,
    hasSocialBenefits: false,
    taxYears: [],
    isUnionMember: false,
    hasOtherMemberships: false,
    insurances: [],
    hasProperty: false,
    properties: [],
    hasVehicle: null,
    educationCompleted: null,
    hasDisability: false,
    paysAlimony: false,
    iban: "",
    confirmCorrectness: false,
    acceptTerms: false,
    acceptPrivacy: false,
  });

  // Load saved form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("prognoseFormData");
    if (savedData) {
      setFormData((current) => ({ ...current, ...JSON.parse(savedData) }));
      // Browser File objects cannot be restored from localStorage. Restart the
      // guided flow so required uploads are selected again and revalidated.
      setCurrentStep(1);
    }
  }, []);

  // Auto-fill partner code from URL parameter (?ref=CODE)
  useEffect(() => {
    const refCode = searchParams.get("ref");
    if (refCode) {
      setFormData((prev) => ({ ...prev, partnerCode: refCode }));
    }
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem("prognoseFormData", JSON.stringify(stripFilesForPersistence(formData)));
    localStorage.setItem("prognoseCurrentStep", currentStep.toString());
  }, [formData, currentStep]);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = () => {
    nextStep();
  };

  const handleSubmissionSuccess = useCallback(() => {
    localStorage.removeItem("prognoseFormData");
    localStorage.removeItem("prognoseCurrentStep");
    localStorage.removeItem("prognoseSubmissionId");
  }, []);

  const hasTaxYears = formData.taxYears && formData.taxYears.length > 0;
  const goToStepById = (stepId: string) => {
    const targetIndex = steps.findIndex((step) => step.id === stepId);
    if (targetIndex >= 0) goToStep(targetIndex);
  };

  const steps = [
    { id: "welcome", node: <WelcomeStep onNext={nextStep} /> },
    { id: "qualification", node: <QualificationStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} /> },
    { id: "personal", node: <PersonalInfoStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} /> },
    { id: "family", node: <FamilyStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} /> },
    { id: "children", node: <ChildrenStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} /> },
    { id: "work", node: <WorkStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} /> },
    { id: "check", node: <CheckStep data={formData} onNext={nextStep} onBack={prevStep} /> },
    { id: "income", node: <IncomeStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} /> },
    ...(hasTaxYears ? [{ id: "tax-certificates", node: <TaxCertificateUploadStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} /> }] : []),
    ...(formData.hasCryptoIncome ? [{ id: "crypto", node: <CryptoUploadStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} /> }] : []),
    { id: "insurance", node: <InsuranceStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} /> },
    { id: "property", node: <PropertyStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} /> },
    { id: "special", node: <SpecialCircumstancesStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} /> },
    { id: "supporting-documents", node: <SupportingDocumentsStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} /> },
    { id: "additional-documents", node: <AdditionalDocumentsStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} /> },
    { id: "documents", node: <DocumentUploadStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} /> },
    { id: "bank", node: <BankDetailsStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} hidePartnerCode={hasRefParam} /> },
    { id: "verification", node: <VerificationStep data={formData} updateData={updateFormData} onSubmit={handleSubmit} onBack={prevStep} onGoToStep={goToStepById} /> },
    { id: "success", node: <SuccessStep formData={formData} submissionId={submissionId} onSuccess={handleSubmissionSuccess} /> },
  ];

  const totalSteps = steps.length - 1;
  const progress = (currentStep / totalSteps) * 100;
  const activeStep = steps[currentStep] ?? steps[steps.length - 1];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${officeBackground})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-[hsl(var(--glass-bg))] backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl"
        >
          {/* Header with Progress */}
          {currentStep > 0 && currentStep < totalSteps && (
            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span className="hidden sm:inline">Zurück zur Startseite</span>
                </button>
                <button
                  onClick={saveProgress}
                  className="text-sm text-[hsl(var(--glass-text))]/70 hover:text-[hsl(var(--glass-text))] transition-colors"
                >
                  Fortschritt speichern
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-[hsl(var(--glass-text))]/80">
                  <span>Schritt {currentStep} von {totalSteps}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          )}

          {currentStep === 0 && (
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Zurück</span>
            </button>
          )}

          {/* Glass Form Container */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 p-8 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeStep.node}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Prognose;
