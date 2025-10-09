import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calculator, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "1. Daten eingeben",
      description: "Beantworten Sie ein paar einfache Fragen zu Ihrer beruflichen Situation. Dauert nur 2 Minuten."
    },
    {
      icon: Calculator,
      title: "2. Kostenlose Prognose erhalten",
      description: "Erfahren Sie sofort, wie viel Steuern Sie zurückbekommen können – komplett kostenlos und unverbindlich."
    },
    {
      icon: CheckCircle,
      title: "3. Steuererklärung einreichen",
      description: "Optional: Lassen Sie uns Ihre Steuererklärung einreichen. Sie zahlen nur bei Erfolg – 30% der Erstattung."
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal text-foreground mb-4">
            Wie funktioniert's?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In nur drei einfachen Schritten zu Ihrer Steuererstattung
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
