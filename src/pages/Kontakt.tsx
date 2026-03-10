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
import { useLanguage } from "@/i18n/LanguageContext";

const contactSchema = z.object({
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(20),
  subject: z.string().trim().min(5).max(100),
  message: z.string().trim().max(1000).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Kontakt = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
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
      if (error) throw error;
      toast({
        title: t('kontakt', 'successTitle'),
        description: t('kontakt', 'successDesc'),
      });
      reset();
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast({
        title: t('kontakt', 'errorTitle'),
        description: t('kontakt', 'errorDesc'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${officeBackground})` }} />
      <div className="absolute inset-0 bg-[hsl(var(--glass-bg))] backdrop-blur-sm" />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 p-8 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-[hsl(var(--glass-text))] hover:bg-white/10">
                <Home className="h-5 w-5" />
              </Button>
            </div>

            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-light text-[hsl(var(--glass-text))] mb-4">
                {t('kontakt', 'title')}
              </h1>
              <p className="text-lg text-[hsl(var(--glass-text))]/80 font-light">
                {t('kontakt', 'subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-[hsl(var(--glass-text))] font-light">{t('kontakt', 'firstName')} *</Label>
                  <Input id="firstName" {...register("firstName")} className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40" disabled={isSubmitting} />
                  {errors.firstName && <p className="text-red-300 text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-[hsl(var(--glass-text))] font-light">{t('kontakt', 'lastName')} *</Label>
                  <Input id="lastName" {...register("lastName")} className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40" disabled={isSubmitting} />
                  {errors.lastName && <p className="text-red-300 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-[hsl(var(--glass-text))] font-light">{t('kontakt', 'email')} *</Label>
                  <Input id="email" type="email" {...register("email")} className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40" disabled={isSubmitting} />
                  {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone" className="text-[hsl(var(--glass-text))] font-light">{t('kontakt', 'phone')} *</Label>
                  <Input id="phone" type="tel" {...register("phone")} className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40" disabled={isSubmitting} />
                  {errors.phone && <p className="text-red-300 text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="text-[hsl(var(--glass-text))] font-light">{t('kontakt', 'subject')} *</Label>
                <Input id="subject" {...register("subject")} placeholder={t('kontakt', 'subjectPlaceholder')} className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40" disabled={isSubmitting} />
                {errors.subject && <p className="text-red-300 text-sm mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <Label htmlFor="message" className="text-[hsl(var(--glass-text))] font-light">{t('kontakt', 'message')}</Label>
                <Textarea id="message" {...register("message")} placeholder={t('kontakt', 'messagePlaceholder')} rows={6} className="mt-2 bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:bg-white/20 focus:border-white/40 resize-none" disabled={isSubmitting} />
                {errors.message && <p className="text-red-300 text-sm mt-1">{errors.message.message}</p>}
              </div>

              <Button type="submit" size="lg" className="w-full rounded-full text-lg h-14" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" />{t('kontakt', 'sending')}</>
                ) : (
                  <>{t('kontakt', 'submit')}<Send className="ml-2 h-5 w-5" /></>
                )}
              </Button>

              <p className="text-sm text-[hsl(var(--glass-text))]/60 text-center font-light">{t('kontakt', 'required')}</p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Kontakt;
