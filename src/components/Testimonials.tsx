import { TimelineContent } from "@/components/ui/timeline-animation";
import { Star } from "lucide-react";
import { useRef } from "react";
import aleksaImage from "@/assets/aleksa-spalevic.png";
import { useLanguage } from "@/i18n/LanguageContext";

const testimonials = [
  {
    name: "Michael Schmidt",
    role: { de: "Selbstständiger Unternehmer", en: "Self-Employed Entrepreneur", tr: "Serbest Girişimci" },
    content: {
      de: "Dank der professionellen Beratung konnte ich erhebliche Einsparungen erzielen. Absolute Empfehlung!",
      en: "Thanks to the professional advice, I was able to achieve significant savings. Highly recommended!",
      tr: "Profesyonel danışmanlık sayesinde önemli tasarruflar elde edebildim. Kesinlikle tavsiye ederim!",
    },
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop",
  },
  {
    name: "Aleksa Spalevic",
    role: { de: "KI-Berater aus Köln", en: "AI Consultant from Cologne", tr: "Köln'den Yapay Zeka Danışmanı" },
    content: {
      de: "Die Zusammenarbeit mit Clairmont Advisory war hervorragend. Professionelle Beratung und innovative Lösungen, die wirklich überzeugen!",
      en: "The collaboration with Clairmont Advisory was outstanding. Professional advice and innovative solutions that truly convince!",
      tr: "Clairmont Advisory ile işbirliği mükemmeldi. Gerçekten ikna eden profesyonel danışmanlık ve yenilikçi çözümler!",
    },
    rating: 5,
    image: aleksaImage,
  },
  {
    name: "Sarah Kowalski",
    role: { de: "Eigentümerin mehrerer Objekte", en: "Multi-Property Owner", tr: "Çoklu Mülk Sahibi" },
    content: {
      de: "Endlich verstehe ich meine Steuersituation! Der Service ist professionell und die Beratung erstklassig.",
      en: "I finally understand my tax situation! The service is professional and the advice is first-class.",
      tr: "Sonunda vergi durumumu anlıyorum! Hizmet profesyonel ve danışmanlık birinci sınıf.",
    },
    rating: 5,
    image: "https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?q=80&w=687&auto=format&fit=crop",
  },
  {
    name: "Thomas Bauer",
    role: { de: "Gewerblicher Investor", en: "Commercial Investor", tr: "Ticari Yatırımcı" },
    content: {
      de: "Transparente Kommunikation und fundierte Expertise. Die Zusammenarbeit mit Clairmont Advisory hat sich absolut gelohnt.",
      en: "Transparent communication and solid expertise. The collaboration with Clairmont Advisory was absolutely worth it.",
      tr: "Şeffaf iletişim ve sağlam uzmanlık. Clairmont Advisory ile işbirliği kesinlikle değdi.",
    },
    rating: 5,
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1021&auto=format&fit=crop",
  },
  {
    name: "Dr. Julia Weber",
    role: { de: "Ärztin & Kapitalanlegerin", en: "Doctor & Investor", tr: "Doktor & Yatırımcı" },
    content: {
      de: "Außergewöhnlich kompetente Beratung mit Fokus auf langfristige Strategien. Ich fühle mich bestens betreut.",
      en: "Exceptionally competent advice with a focus on long-term strategies. I feel excellently cared for.",
      tr: "Uzun vadeli stratejilere odaklanan olağanüstü yetkin danışmanlık. Mükemmel bir şekilde ilgilenildiğimi hissediyorum.",
    },
    rating: 5,
    image: "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop",
  },
  {
    name: "Marcus Hoffmann",
    role: { de: "Unternehmer", en: "Entrepreneur", tr: "Girişimci" },
    content: {
      de: "Die Expertise von Clairmont Advisory ist beeindruckend. Jede Frage wird professionell und verständlich beantwortet.",
      en: "The expertise of Clairmont Advisory is impressive. Every question is answered professionally and understandably.",
      tr: "Clairmont Advisory'nin uzmanlığı etkileyici. Her soru profesyonelce ve anlaşılır şekilde cevaplanıyor.",
    },
    rating: 5,
    image: "https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=765&auto=format&fit=crop",
  },
  {
    name: "Anna Richter",
    role: { de: "Immobilien-Portfoliomanagerin", en: "Real Estate Portfolio Manager", tr: "Gayrimenkul Portföy Yöneticisi" },
    content: {
      de: "Hervorragende Zusammenarbeit! Die individuellen Lösungen und die Detailgenauigkeit haben mich überzeugt.",
      en: "Excellent collaboration! The individual solutions and attention to detail convinced me.",
      tr: "Mükemmel işbirliği! Bireysel çözümler ve detaylara gösterilen özen beni ikna etti.",
    },
    rating: 5,
    image: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=687&auto=format&fit=crop",
  },
];

const Testimonials = () => {
  const testimonialRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  const revealVariants = {
    visible: (i: number) => ({
      y: 0, opacity: 1, filter: "blur(0px)",
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
    hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
  };

  const googleRating = 4.9;

  const getContent = (item: typeof testimonials[0]) => item.content[language];
  const getRole = (item: typeof testimonials[0]) => item.role[language];

  return (
    <section id="testimonials" className="relative py-32 px-6 bg-background" ref={testimonialRef}>
      <div className="max-w-7xl mx-auto">
        <article className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <TimelineContent as="h2" className="text-5xl md:text-6xl font-light text-primary" animationNum={0} customVariants={revealVariants} timelineRef={testimonialRef}>
            {t('testimonials', 'title')}
          </TimelineContent>
          <TimelineContent as="p" className="text-xl md:text-2xl text-primary/70 font-light" animationNum={1} customVariants={revealVariants} timelineRef={testimonialRef}>
            {t('testimonials', 'subtitle')}
          </TimelineContent>
          
          <TimelineContent animationNum={2} customVariants={revealVariants} timelineRef={testimonialRef} className="flex items-center justify-center gap-4 pt-4">
            <div className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl bg-card border border-border/50">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-semibold text-primary">{googleRating}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{t('testimonials', 'googleReviews')}</p>
            </div>
          </TimelineContent>
        </article>

        <div className="lg:grid lg:grid-cols-3 gap-4 flex flex-col w-full">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <TimelineContent animationNum={3} customVariants={revealVariants} timelineRef={testimonialRef} className="flex-[7] flex flex-col justify-between relative bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden rounded-2xl border border-primary/20 p-6 hover:shadow-lg transition-shadow">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto relative z-10">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[0].rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-primary text-primary" />))}
                </div>
                <p className="text-primary/90 mb-6 leading-relaxed">"{getContent(testimonials[0])}"</p>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg text-primary">{testimonials[0].name}</h3>
                    <p className="text-sm text-primary/60">{getRole(testimonials[0])}</p>
                  </div>
                  <img src={testimonials[0].image} alt={testimonials[0].name} className="w-16 h-16 rounded-xl object-cover" />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent animationNum={4} customVariants={revealVariants} timelineRef={testimonialRef} className="flex-[3] flex flex-col justify-between relative bg-primary text-primary-foreground overflow-hidden rounded-2xl border border-primary/20 p-6 hover:shadow-lg transition-shadow">
              <article className="mt-auto">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[1].rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-primary-foreground text-primary-foreground" />))}
                </div>
                <p className="mb-6 leading-relaxed">"{getContent(testimonials[1])}"</p>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{testimonials[1].name}</h3>
                    <p className="text-sm opacity-80">{getRole(testimonials[1])}</p>
                  </div>
                  <img src={testimonials[1].image} alt={testimonials[1].name} className="w-16 h-16 rounded-xl object-cover" />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            {[2, 3, 4].map((idx, colIdx) => (
              <TimelineContent key={idx} animationNum={5 + colIdx} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-card text-card-foreground overflow-hidden rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow">
                <article className="mt-auto">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonials[idx].rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-primary text-primary" />))}
                  </div>
                  <p className="text-sm mb-6 leading-relaxed">"{getContent(testimonials[idx])}"</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{testimonials[idx].name}</h3>
                      <p className="text-sm text-muted-foreground">{getRole(testimonials[idx])}</p>
                    </div>
                    <img src={testimonials[idx].image} alt={testimonials[idx].name} className="w-12 h-12 rounded-xl object-cover" />
                  </div>
                </article>
              </TimelineContent>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <TimelineContent animationNum={8} customVariants={revealVariants} timelineRef={testimonialRef} className="flex-[3] flex flex-col justify-between relative bg-primary text-primary-foreground overflow-hidden rounded-2xl border border-primary/20 p-6 hover:shadow-lg transition-shadow">
              <article className="mt-auto">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[5].rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-primary-foreground text-primary-foreground" />))}
                </div>
                <p className="mb-6 leading-relaxed">"{getContent(testimonials[5])}"</p>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{testimonials[5].name}</h3>
                    <p className="text-sm opacity-80">{getRole(testimonials[5])}</p>
                  </div>
                  <img src={testimonials[5].image} alt={testimonials[5].name} className="w-16 h-16 rounded-xl object-cover" />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent animationNum={9} customVariants={revealVariants} timelineRef={testimonialRef} className="flex-[7] flex flex-col justify-between relative bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden rounded-2xl border border-primary/20 p-6 hover:shadow-lg transition-shadow">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto relative z-10">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[6].rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-primary text-primary" />))}
                </div>
                <p className="text-primary/90 mb-6 leading-relaxed">"{getContent(testimonials[6])}"</p>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg text-primary">{testimonials[6].name}</h3>
                    <p className="text-sm text-primary/60">{getRole(testimonials[6])}</p>
                  </div>
                  <img src={testimonials[6].image} alt={testimonials[6].name} className="w-16 h-16 rounded-xl object-cover" />
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
