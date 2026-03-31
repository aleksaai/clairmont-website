import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import { ArrowRight, Send, Loader2, Users, Briefcase, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const karriereSchema = z.object({
  firstName: z.string().trim().min(2, "Bitte Vornamen eingeben").max(50),
  lastName: z.string().trim().min(2, "Bitte Nachnamen eingeben").max(50),
  email: z.string().trim().email("Bitte gültige E-Mail eingeben").max(255),
  phone: z.string().trim().min(6, "Bitte Telefonnummer eingeben").max(20),
  message: z.string().trim().min(10, "Bitte eine Nachricht eingeben").max(2000),
});

type KarriereFormData = z.infer<typeof karriereSchema>;

const Karriere = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<KarriereFormData>({
    resolver: zodResolver(karriereSchema),
  });

  const onSubmit = async (data: KarriereFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          subject: "Karriere & Partnerschaften – Bewerbung",
          message: data.message,
        },
      });
      if (error) throw error;
      toast({
        title: "Anfrage gesendet!",
        description: "Vielen Dank für Ihr Interesse. Wir melden uns in Kürze bei Ihnen.",
      });
      reset();
    } catch (error) {
      console.error("Error sending karriere form:", error);
      toast({
        title: "Fehler",
        description: "Die Anfrage konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(208,48%,12%)] via-[hsl(208,48%,18%)] to-[hsl(208,48%,8%)]">
      <Navigation />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-light text-[hsl(var(--glass-text))] mb-6">
              Karriere & Partnerschaften
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--glass-text))]/80 font-light max-w-2xl mx-auto">
              Werden Sie Teil unseres Netzwerks und gestalten Sie die Zukunft der Finanzberatung mit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who we're looking for */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 text-center">
              <Users className="h-10 w-10 text-[hsl(var(--glass-text))]/80 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-2">Vertriebler</h3>
              <p className="text-[hsl(var(--glass-text))]/70 font-light text-sm">
                Sie haben Erfahrung im Vertrieb und möchten hochwertige Finanzprodukte vermitteln.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 text-center">
              <Briefcase className="h-10 w-10 text-[hsl(var(--glass-text))]/80 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-2">Versicherungsmakler</h3>
              <p className="text-[hsl(var(--glass-text))]/70 font-light text-sm">
                Sie sind Versicherungsmakler und möchten Ihr Portfolio erweitern.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 text-center">
              <Building2 className="h-10 w-10 text-[hsl(var(--glass-text))]/80 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-2">Immobilienmakler</h3>
              <p className="text-[hsl(var(--glass-text))]/70 font-light text-sm">
                Sie vermitteln Immobilien und suchen einen starken Partner an Ihrer Seite.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-2xl rounded-[2rem] border border-white/20 p-8 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.3)]"
          >
            <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-8 text-center">
              Jetzt bewerben
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-[hsl(var(--glass-text))] font-light">Vorname *</Label>
                  <Input id="firstName" {...register("firstName")} className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40" disabled={isSubmitting} />
                  {errors.firstName && <p className="text-red-300 text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-[hsl(var(--glass-text))] font-light">Nachname *</Label>
                  <Input id="lastName" {...register("lastName")} className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40" disabled={isSubmitting} />
                  {errors.lastName && <p className="text-red-300 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-[hsl(var(--glass-text))] font-light">E-Mail *</Label>
                  <Input id="email" type="email" {...register("email")} className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40" disabled={isSubmitting} />
                  {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone" className="text-[hsl(var(--glass-text))] font-light">Telefon *</Label>
                  <Input id="phone" type="tel" {...register("phone")} className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40" disabled={isSubmitting} />
                  {errors.phone && <p className="text-red-300 text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-[hsl(var(--glass-text))] font-light">Ihre Nachricht *</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Erzählen Sie uns, wie Sie mit Clairmont zusammenarbeiten möchten..."
                  rows={6}
                  className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40 resize-none"
                  disabled={isSubmitting}
                />
                {errors.message && <p className="text-red-300 text-sm mt-1">{errors.message.message}</p>}
              </div>

              <Button type="submit" size="lg" className="w-full rounded-full text-lg h-14" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Wird gesendet...</>
                ) : (
                  <>Anfrage senden <Send className="ml-2 h-5 w-5" /></>
                )}
              </Button>

              <p className="text-sm text-[hsl(var(--glass-text))]/60 text-center font-light">* Pflichtfelder</p>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Karriere;
