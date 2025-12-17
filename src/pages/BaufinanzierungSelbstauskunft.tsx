import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import officeBackground from "@/assets/office-background.png";

// Import step components
import WelcomeStepBaufi from "@/components/baufinanzierung/WelcomeStepBaufi";
import PersonalDataStepBaufi from "@/components/baufinanzierung/PersonalDataStepBaufi";
import FinancesStepBaufi from "@/components/baufinanzierung/FinancesStepBaufi";
import CurrentObligationsStepBaufi from "@/components/baufinanzierung/CurrentObligationsStepBaufi";
import PropertyDataStepBaufi from "@/components/baufinanzierung/PropertyDataStepBaufi";
import RentalStepBaufi from "@/components/baufinanzierung/RentalStepBaufi";
import BankDetailsStepBaufi from "@/components/baufinanzierung/BankDetailsStepBaufi";
import SuccessStepBaufi from "@/components/baufinanzierung/SuccessStepBaufi";

export interface BaufiFormData {
  // Personal Data
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  livingThereSince: string;
  idCardFront?: File;
  idCardBack?: File;
  
  // Family members
  isMarried: boolean;
  spouseIdCard?: File;
  hasChildren: boolean;
  children: Array<{
    firstName: string;
    lastName: string;
    birthDate: string;
  }>;
  
  // Finances
  taxReturns2021?: File[];
  taxReturns2022?: File[];
  taxReturns2023?: File[];
  taxReturns2024?: File[];
  balanceSheets2024?: File[];
  bwa2024?: File[];
  isSelfEmployed: boolean;
  hasPrivateHealthInsurance: boolean;
  privateHealthInsuranceProof?: File[];
  
  // Current obligations
  currentLoans: Array<{
    lender: string;
    monthlyRate: string;
    remainingDebt: string;
    isToBeReplaced: boolean;
  }>;
  hasOtherObligations: boolean;
  otherObligations?: string;
  
  // Property data
  landRegisterExtract?: File[];
  hasLandRegisterExtract: boolean;
  energyCertificate?: File[];
  hasEnergyCertificate: boolean;
  livingSpaceCalculation?: File[];
  hasLivingSpaceCalculation: boolean;
  cadastralMap?: File[];
  divisionDeclaration?: File[];
  buildingPlans?: File[];
  photosInterior?: File[];
  photosExterior?: File[];
  
  // Rental (optional)
  isRented: boolean;
  rentalContracts?: File[];
  rentalList?: File[];
  rentalIncomeProof?: File[];
  
  // Bank details
  iban: string;
  confirmCorrectness: boolean;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

const BASE_STEPS = 8;

const BaufinanzierungSelbstauskunft = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BaufiFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    livingThereSince: "",
    isMarried: false,
    hasChildren: false,
    children: [],
    isSelfEmployed: false,
    hasPrivateHealthInsurance: false,
    currentLoans: [],
    hasOtherObligations: false,
    hasLandRegisterExtract: false,
    hasEnergyCertificate: false,
    hasLivingSpaceCalculation: false,
    isRented: false,
    iban: "",
    confirmCorrectness: false,
    acceptTerms: false,
    acceptPrivacy: false,
  });

  // Load saved form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("baufiFormData");
    const savedStep = localStorage.getItem("baufiCurrentStep");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
  }, []);

  // Save form data to localStorage
  const saveProgress = () => {
    localStorage.setItem("baufiFormData", JSON.stringify(formData));
    localStorage.setItem("baufiCurrentStep", currentStep.toString());
  };

  const updateFormData = (data: Partial<BaufiFormData>) => {
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

  const handleSubmit = async () => {
    console.log("Baufi form submitted:", formData);
    
    try {
      // Prepare FormData for file upload
      const submitFormData = new FormData();
      
      // Add JSON data
      const jsonData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        livingThereSince: formData.livingThereSince,
        isMarried: formData.isMarried,
        hasChildren: formData.hasChildren,
        children: formData.children,
        isSelfEmployed: formData.isSelfEmployed,
        hasPrivateHealthInsurance: formData.hasPrivateHealthInsurance,
        currentLoans: formData.currentLoans,
        hasOtherObligations: formData.hasOtherObligations,
        otherObligations: formData.otherObligations,
        hasLandRegisterExtract: formData.hasLandRegisterExtract,
        hasEnergyCertificate: formData.hasEnergyCertificate,
        hasLivingSpaceCalculation: formData.hasLivingSpaceCalculation,
        isRented: formData.isRented,
        iban: formData.iban,
        confirmCorrectness: formData.confirmCorrectness,
        acceptTerms: formData.acceptTerms,
        acceptPrivacy: formData.acceptPrivacy,
      };
      
      submitFormData.append('data', JSON.stringify(jsonData));
      
      // Add files
      const fileFields: (keyof BaufiFormData)[] = [
        'idCardFront', 'idCardBack', 'spouseIdCard',
        'taxReturns2021', 'taxReturns2022', 'taxReturns2023', 'taxReturns2024',
        'balanceSheets2024', 'bwa2024', 'privateHealthInsuranceProof',
        'landRegisterExtract', 'energyCertificate', 'livingSpaceCalculation',
        'cadastralMap', 'divisionDeclaration', 'buildingPlans',
        'photosInterior', 'photosExterior',
        'rentalContracts', 'rentalList', 'rentalIncomeProof'
      ];
      
      for (const field of fileFields) {
        const fileData = formData[field];
        if (fileData instanceof File) {
          submitFormData.append(field, fileData);
        } else if (Array.isArray(fileData)) {
          fileData.forEach((file) => {
            if (file instanceof File) {
              submitFormData.append(field, file);
            }
          });
        }
      }
      
      // Send to webhook using direct fetch
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-baufinanzierung-webhook`,
        {
          method: 'POST',
          body: submitFormData,
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Webhook error:', errorText);
        toast.error('Fehler beim Senden der Daten');
      } else {
        const result = await response.json();
        console.log('Webhook response:', result);
        toast.success('Daten erfolgreich gesendet!');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Fehler beim Senden der Anfrage');
    }
    
    localStorage.removeItem("baufiFormData");
    localStorage.removeItem("baufiCurrentStep");
    nextStep();
  };

  // Calculate total steps dynamically
  const totalSteps = BASE_STEPS + (formData.isRented ? 1 : 0);
  const progress = (currentStep / totalSteps) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStepBaufi onNext={nextStep} />;
      case 1:
        return <PersonalDataStepBaufi data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 2:
        return <FinancesStepBaufi data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <CurrentObligationsStepBaufi data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <PropertyDataStepBaufi data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 5:
        if (formData.isRented) {
          return <RentalStepBaufi data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        } else {
          return <BankDetailsStepBaufi data={formData} updateData={updateFormData} onNext={handleSubmit} onBack={prevStep} />;
        }
      case 6:
        if (formData.isRented) {
          return <BankDetailsStepBaufi data={formData} updateData={updateFormData} onNext={handleSubmit} onBack={prevStep} />;
        } else {
          return <SuccessStepBaufi formData={formData} />;
        }
      case 7:
        return <SuccessStepBaufi formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${officeBackground})` }}
      >
        <div className="absolute inset-0 backdrop-blur-md bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 md:p-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/10"
          >
            <Home className="mr-2 h-4 w-4" />
            Zurück zur Startseite
          </Button>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-6">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20"
              >
                {currentStep > 0 && currentStep < totalSteps && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[hsl(var(--glass-text))]">
                        Schritt {currentStep} von {totalSteps - 1}
                      </span>
                      <span className="text-sm text-[hsl(var(--glass-text))]">
                        {Math.round(progress)}% abgeschlossen
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaufinanzierungSelbstauskunft;