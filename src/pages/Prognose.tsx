import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Home } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import officeBackground from "@/assets/office-background.png";

// Import step components
import WelcomeStep from "@/components/prognose/WelcomeStep";
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
import AdditionalDocumentsStep from "@/components/prognose/AdditionalDocumentsStep";
import BankDetailsStep from "@/components/prognose/BankDetailsStep";
import DocumentUploadStep from "@/components/prognose/DocumentUploadStep";
import VerificationStep from "@/components/prognose/VerificationStep";
import SuccessStep from "@/components/prognose/SuccessStep";

export interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  nationality: string;
  email: string;
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
  
  // Income
  hasBusiness: boolean;
  businessType?: string;
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
  propertyDocuments?: File[];
  additionalDocuments?: File[];
  
  // Bank Details
  iban: string;
  confirmCorrectness: boolean;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  partnerCode?: string;
  confirmEmail?: string;
}

const BASE_STEPS = 16; // Updated to include VerificationStep

const Prognose = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const hasRefParam = !!searchParams.get("ref");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    nationality: "",
    email: "",
    address: "",
    differentAddress: false,
    maritalStatus: "",
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
    const savedStep = localStorage.getItem("prognoseCurrentStep");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
  }, []);

  // Auto-fill partner code from URL parameter (?ref=CODE)
  useEffect(() => {
    const refCode = searchParams.get("ref");
    if (refCode) {
      setFormData((prev) => ({ ...prev, partnerCode: refCode }));
    }
  }, [searchParams]);

  // Save form data to localStorage
  const saveProgress = () => {
    localStorage.setItem("prognoseFormData", JSON.stringify(formData));
    localStorage.setItem("prognoseCurrentStep", currentStep.toString());
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    saveProgress();
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
    // Handle final form submission
    console.log("Form submitted:", formData);
    // Clear localStorage after submission
    localStorage.removeItem("prognoseFormData");
    localStorage.removeItem("prognoseCurrentStep");
    nextStep();
  };

  // Calculate total steps dynamically based on form data
  const hasTaxYears = formData.taxYears && formData.taxYears.length > 0;
  const totalSteps = BASE_STEPS + (formData.hasCryptoIncome ? 1 : 0) + (hasTaxYears ? 1 : 0);
  const progress = (currentStep / totalSteps) * 100;

  const renderStep = () => {
    const hasTaxYears = formData.taxYears && formData.taxYears.length > 0;
    
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={nextStep} />;
      case 1:
        return <PersonalInfoStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 2:
        return <FamilyStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <ChildrenStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <WorkStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <CheckStep data={formData} onNext={nextStep} onBack={prevStep} />;
      case 6:
        return <IncomeStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 7:
        // Show TaxCertificateUploadStep only if taxYears are selected
        if (hasTaxYears) {
          return <TaxCertificateUploadStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        } else if (formData.hasCryptoIncome) {
          return <CryptoUploadStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        } else {
          return <InsuranceStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        }
      case 8:
        // Adjust based on whether tax certificate step was shown
        if (hasTaxYears && formData.hasCryptoIncome) {
          return <CryptoUploadStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        } else if (hasTaxYears) {
          return <InsuranceStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        } else if (formData.hasCryptoIncome) {
          return <InsuranceStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        } else {
          return <PropertyStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        }
      case 9:
        if (hasTaxYears && formData.hasCryptoIncome) {
          return <InsuranceStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        } else if (hasTaxYears || formData.hasCryptoIncome) {
          return <PropertyStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        } else {
          return <SpecialCircumstancesStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        }
      case 10:
        if (hasTaxYears && formData.hasCryptoIncome) {
          return <PropertyStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        } else if (hasTaxYears || formData.hasCryptoIncome) {
          return <SpecialCircumstancesStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        } else {
          return <AdditionalDocumentsStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        }
      case 11:
        if (hasTaxYears && formData.hasCryptoIncome) {
          return <SpecialCircumstancesStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        } else if (hasTaxYears || formData.hasCryptoIncome) {
          return <AdditionalDocumentsStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        } else {
          return <DocumentUploadStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        }
      case 12:
        if (hasTaxYears && formData.hasCryptoIncome) {
          return <AdditionalDocumentsStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        } else if (hasTaxYears || formData.hasCryptoIncome) {
          return <DocumentUploadStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        } else {
          return <BankDetailsStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} hidePartnerCode={hasRefParam} />;
        }
      case 13:
        if (hasTaxYears && formData.hasCryptoIncome) {
          return <DocumentUploadStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        } else if (hasTaxYears || formData.hasCryptoIncome) {
          return <BankDetailsStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} hidePartnerCode={hasRefParam} />;
        } else {
          return <VerificationStep data={formData} onSubmit={handleSubmit} onBack={prevStep} onGoToStep={goToStep} />;
        }
      case 14:
        if (hasTaxYears && formData.hasCryptoIncome) {
          return <BankDetailsStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} hidePartnerCode={hasRefParam} />;
        } else if (hasTaxYears || formData.hasCryptoIncome) {
          return <VerificationStep data={formData} onSubmit={handleSubmit} onBack={prevStep} onGoToStep={goToStep} />;
        } else {
          return <SuccessStep formData={formData} />;
        }
      case 15:
        if (hasTaxYears && formData.hasCryptoIncome) {
          return <VerificationStep data={formData} onSubmit={handleSubmit} onBack={prevStep} onGoToStep={goToStep} />;
        } else {
          return <SuccessStep formData={formData} />;
        }
      case 16:
        return <SuccessStep formData={formData} />;
      default:
        return null;
    }
  };

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
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Prognose;
