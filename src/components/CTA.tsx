import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const CTA = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <section id="cta" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-12 md:p-16 backdrop-blur-xl border border-primary/10 shadow-[0_20px_70px_rgba(0,0,0,0.1)]"
        >
          <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-primary mb-6">
                {t('cta', 'title')}
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-primary/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
            >
              {t('cta', 'subtitle')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center items-center"
            >
              <Button 
                size="lg" 
                className="rounded-full px-8 text-base md:text-lg h-14 shadow-lg hover:shadow-xl transition-shadow group"
                onClick={() => navigate("/kontakt")}
              >
                {t('cta', 'button')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm text-primary/50 mt-8 font-light"
            >
              {t('cta', 'footer')}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
