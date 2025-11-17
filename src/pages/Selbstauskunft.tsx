import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import officeBackground from "@/assets/office-background.png";

// Import step components
import WelcomeStepSelbst from "@/components/selbstauskunft/WelcomeStepSelbst";
import PersonalDataStep from "@/components/selbstauskunft/PersonalDataStep";
import IncomeJobStep from "@/components/selbstauskunft/IncomeJobStep";
import BankPaymentsStep from "@/components/selbstauskunft/BankPaymentsStep";
import ObligationsStep from "@/components/selbstauskunft/ObligationsStep";
import InsuranceStepSelbst from "@/components/selbstauskunft/InsuranceStepSelbst";
import PurposeStep from "@/components/selbstauskunft/PurposeStep";
import SuccessStepSelbst from "@/components/selbstauskunft/SuccessStepSelbst";

export interface SelbstauskunftFormData {
  // Personal Data
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentAddress: string;
  livingSince: string;
  previousAddress?: string;
  idDocument?: File[];
  children: Array<{
    name: string;
    birthDate: string;
  }>;
  
  // Income & Job
  jobTitle: string;
  paySlips?: File[];
  salaryProof?: File[];
  rentWarm?: string;
  
  // Bank & Payments
  iban: string;
  bankStatements?: File[];
  
  // Obligations
  existingLoans: Array<{
    type: string;
    amount: string;
    monthlyPayment: string;
  }>;
  alimonyObligations?: string;
  otherObligations?: string;
  
  // Insurance
  hasPrivateInsurance: boolean;
  insuranceContract?: File[];
  
  // Purpose
  loanPurpose: string;
  loanAmount: string;
  
  // Terms
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

const TOTAL_STEPS = 8;

const Selbstauskunft = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SelbstauskunftFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentAddress: "",
    livingSince: "",
    children: [],
    jobTitle: "",
    iban: "",
    existingLoans: [],
    hasPrivateInsurance: false,
    loanPurpose: "",
    loanAmount: "",
    acceptTerms: false,
    acceptPrivacy: false,
  });

  const updateFormData = (data: Partial<SelbstauskunftFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStepSelbst onNext={handleNext} />;
      case 1:
        return <PersonalDataStep formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
      case 2:
        return <IncomeJobStep formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
      case 3:
        return <BankPaymentsStep formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
      case 4:
        return <ObligationsStep formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
      case 5:
        return <InsuranceStepSelbst formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
      case 6:
        return <PurposeStep formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
      case 7:
        return <SuccessStepSelbst formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: `url(${officeBackground})`,
        }}
      />
      
      {/* Dark Overlay with blur */}
      <div className="fixed inset-0 bg-[hsl(var(--glass-bg))] backdrop-blur-sm -z-10" />

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-white/10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="text-[hsl(var(--glass-text))] hover:bg-white/10"
        >
          <Home className="w-4 h-4 mr-2" />
          Zurück zur Startseite
        </Button>
        {currentStep > 0 && currentStep < TOTAL_STEPS - 1 && (
          <div className="text-sm text-[hsl(var(--glass-text))]/70">
            Schritt {currentStep + 1} von {TOTAL_STEPS}
          </div>
        )}
      </nav>

      {/* Progress Bar */}
      {currentStep < TOTAL_STEPS - 1 && (
        <div className="sticky top-0 z-10 bg-[hsl(var(--glass-bg))]/80 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8 md:py-12">
        <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 p-8 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.3)] min-h-[600px]">
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

          {/* Navigation Buttons */}
          {currentStep > 0 && currentStep < TOTAL_STEPS - 1 && (
            <div className="flex gap-4 mt-8 pt-8 border-t border-white/20">
              <Button
                onClick={handleBack}
                variant="outline"
                size="lg"
                className="flex-1 rounded-full bg-white/10 border-white/20 text-[hsl(var(--glass-text))] hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Selbstauskunft;
