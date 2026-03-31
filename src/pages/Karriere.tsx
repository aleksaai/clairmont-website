import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import { Send, Loader2, Users, Briefcase, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/services/karriere-hero.jpg";

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
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-[hsl(var(--glass-bg))] backdrop-blur-sm" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center justify-center px-4 py-1.5 border border-white/20 rounded-full mb-6">
              <span className="text-sm font-medium text-[hsl(var(--glass-text))]">Karriere</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-[hsl(var(--glass-text))] mb-6 leading-tight">
              Karriere &<br />Partnerschaften
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--glass-text))]/80 font-light max-w-2xl mx-auto">
              Werden Sie Teil unseres Netzwerks und gestalten Sie die Zukunft der Finanzberatung mit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who we're looking for */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-light text-primary mb-4">
              Wen wir suchen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
              Wir suchen ambitionierte Partner, die gemeinsam mit uns wachsen möchten.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Vertriebler", desc: "Sie haben Erfahrung im Vertrieb und möchten hochwertige Finanzprodukte vermitteln." },
              { icon: Briefcase, title: "Versicherungsmakler", desc: "Sie sind Versicherungsmakler und möchten Ihr Portfolio erweitern." },
              { icon: Building2, title: "Immobilienmakler", desc: "Sie vermitteln Immobilien und suchen einen starken Partner an Ihrer Seite." },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-primary/5 rounded-3xl p-10 h-full border border-primary/10 hover:border-primary/20 hover:shadow-lg transition-all duration-300 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-primary/[0.03]">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-primary mb-8 text-center">
              Jetzt bewerben
            </h2>

            <div className="bg-background rounded-3xl border border-primary/10 p-8 md:p-12 shadow-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-primary font-light">Vorname *</Label>
                    <Input id="firstName" {...register("firstName")} className="mt-2" disabled={isSubmitting} />
                    {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-primary font-light">Nachname *</Label>
                    <Input id="lastName" {...register("lastName")} className="mt-2" disabled={isSubmitting} />
                    {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-primary font-light">E-Mail *</Label>
                    <Input id="email" type="email" {...register("email")} className="mt-2" disabled={isSubmitting} />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-primary font-light">Telefon *</Label>
                    <Input id="phone" type="tel" {...register("phone")} className="mt-2" disabled={isSubmitting} />
                    {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-primary font-light">Ihre Nachricht *</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Erzählen Sie uns, wie Sie mit Clairmont zusammenarbeiten möchten..."
                    rows={6}
                    className="mt-2 resize-none"
                    disabled={isSubmitting}
                  />
                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
                </div>

                <Button type="submit" size="lg" className="w-full rounded-full text-lg h-14" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Wird gesendet...</>
                  ) : (
                    <>Anfrage senden <Send className="ml-2 h-5 w-5" /></>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground/60 text-center font-light">* Pflichtfelder</p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Karriere;
