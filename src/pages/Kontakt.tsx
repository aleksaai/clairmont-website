import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import { Home, Send, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import officeBackground from "@/assets/office-background.png";

const contactSchema = z.object({
  firstName: z.string().trim().min(2, "Vorname muss mindestens 2 Zeichen lang sein").max(50, "Vorname darf maximal 50 Zeichen lang sein"),
  lastName: z.string().trim().min(2, "Nachname muss mindestens 2 Zeichen lang sein").max(50, "Nachname darf maximal 50 Zeichen lang sein"),
  email: z.string().trim().email("Bitte geben Sie eine gültige E-Mail-Adresse ein").max(255, "E-Mail darf maximal 255 Zeichen lang sein"),
  phone: z.string().trim().min(6, "Telefonnummer muss mindestens 6 Zeichen lang sein").max(20, "Telefonnummer darf maximal 20 Zeichen lang sein"),
  subject: z.string().trim().min(5, "Betreff muss mindestens 5 Zeichen lang sein").max(100, "Betreff darf maximal 100 Zeichen lang sein"),
  message: z.string().trim().max(1000, "Nachricht darf maximal 1000 Zeichen lang sein").optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Kontakt = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message || "",
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Nachricht gesendet!",
        description: "Vielen Dank für Ihre Kontaktaufnahme. Wir melden uns schnellstmöglich bei Ihnen.",
      });

      reset();
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast({
        title: "Fehler beim Senden",
        description: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
          className="w-full max-w-2xl"
        >
          {/* Glass Container */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 p-8 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="text-[hsl(var(--glass-text))] hover:bg-white/10"
              >
                <Home className="h-5 w-5" />
              </Button>
            </div>

            {/* Title */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-light text-[hsl(var(--glass-text))] mb-4">
                Kontakt aufnehmen
              </h1>
              <p className="text-lg text-[hsl(var(--glass-text))]/80 font-light">
                Wir freuen uns auf Ihre Nachricht und melden uns schnellstmöglich bei Ihnen.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-[hsl(var(--glass-text))] font-light">
                    Vorname *
                  </Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40"
                    disabled={isSubmitting}
                  />
                  {errors.firstName && (
                    <p className="text-red-300 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-[hsl(var(--glass-text))] font-light">
                    Nachname *
                  </Label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40"
                    disabled={isSubmitting}
                  />
                  {errors.lastName && (
                    <p className="text-red-300 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Email & Phone Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-[hsl(var(--glass-text))] font-light">
                    E-Mail *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[hsl(var(--glass-text))] font-light">
                    Telefonnummer *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40"
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="text-red-300 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <Label htmlFor="subject" className="text-[hsl(var(--glass-text))] font-light">
                  Betreff *
                </Label>
                <Input
                  id="subject"
                  {...register("subject")}
                  placeholder="Worum geht es?"
                  className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40"
                  disabled={isSubmitting}
                />
                {errors.subject && (
                  <p className="text-red-300 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-[hsl(var(--glass-text))] font-light">
                  Nachricht (optional)
                </Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Bitte erläutern Sie Ihr Anliegen..."
                  rows={6}
                  className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40 resize-none"
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-red-300 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full text-lg h-14"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    Nachricht senden
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="text-sm text-[hsl(var(--glass-text))]/60 text-center font-light">
                * Pflichtfelder
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Kontakt;
