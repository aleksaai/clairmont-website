import { TimelineContent } from "@/components/ui/timeline-animation";
import { Star } from "lucide-react";
import { useRef } from "react";
import aleksaImage from "@/assets/aleksa-spalevic.png";

const testimonials = [
  {
    name: "Aleksa Spalevic",
    role: "KI-Berater aus Köln",
    content: "Die Zusammenarbeit mit Clairmont Advisory war hervorragend. Professionelle Beratung und innovative Lösungen, die wirklich überzeugen!",
    rating: 5,
    image: aleksaImage,
  },
  {
    name: "Sarah Kowalski",
    role: "Eigentümerin mehrerer Objekte",
    content: "Endlich verstehe ich meine Steuersituation! Der Service ist professionell und die Beratung erstklassig.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?q=80&w=687&auto=format&fit=crop",
  },
  {
    name: "Thomas Bauer",
    role: "Gewerblicher Investor",
    content: "Transparente Kommunikation und fundierte Expertise. Die Zusammenarbeit mit Clairmont Advisory hat sich absolut gelohnt.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1021&auto=format&fit=crop",
  },
  {
    name: "Dr. Julia Weber",
    role: "Ärztin & Kapitalanlegerin",
    content: "Außergewöhnlich kompetente Beratung mit Fokus auf langfristige Strategien. Ich fühle mich bestens betreut.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop",
  },
  {
    name: "Marcus Hoffmann",
    role: "Unternehmer",
    content: "Die Expertise von Clairmont Advisory ist beeindruckend. Jede Frage wird professionell und verständlich beantwortet.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=765&auto=format&fit=crop",
  },
  {
    name: "Anna Richter",
    role: "Immobilien-Portfoliomanagerin",
    content: "Hervorragende Zusammenarbeit! Die individuellen Lösungen und die Detailgenauigkeit haben mich überzeugt.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=687&auto=format&fit=crop",
  },
];

const Testimonials = () => {
  const testimonialRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const googleRating = 4.9;
  const totalReviews = 127;

  return (
    <section id="testimonials" className="relative py-32 px-6 bg-background" ref={testimonialRef}>
      <div className="max-w-7xl mx-auto">
        <article className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <TimelineContent 
            as="h2" 
            className="text-5xl md:text-6xl font-light text-primary"
            animationNum={0} 
            customVariants={revealVariants} 
            timelineRef={testimonialRef}
          >
            Was unsere Kunden sagen
          </TimelineContent>
          <TimelineContent 
            as="p" 
            className="text-xl md:text-2xl text-primary/70 font-light"
            animationNum={1} 
            customVariants={revealVariants} 
            timelineRef={testimonialRef}
          >
            Vertrauen Sie auf die Erfahrung von zufriedenen Kunden!
          </TimelineContent>
          
          {/* Google Rating Display */}
          <TimelineContent 
            animationNum={2} 
            customVariants={revealVariants} 
            timelineRef={testimonialRef}
            className="flex items-center justify-center gap-4 pt-4"
          >
            <div className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl bg-card border border-border/50">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-semibold text-primary">{googleRating}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Google Bewertungen
              </p>
            </div>
          </TimelineContent>
        </article>

        <div className="lg:grid lg:grid-cols-3 gap-4 flex flex-col w-full">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <TimelineContent 
              animationNum={3} 
              customVariants={revealVariants} 
              timelineRef={testimonialRef} 
              className="flex-[7] flex flex-col justify-between relative bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden rounded-2xl border border-primary/20 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto relative z-10">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[0].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-primary/90 mb-6 leading-relaxed">
                  "{testimonials[0].content}"
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg text-primary">
                      {testimonials[0].name}
                    </h3>
                    <p className="text-sm text-primary/60">{testimonials[0].role}</p>
                  </div>
                  <img
                    src={testimonials[0].image}
                    alt={testimonials[0].name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent 
              animationNum={4} 
              customVariants={revealVariants} 
              timelineRef={testimonialRef} 
              className="flex-[3] flex flex-col justify-between relative bg-primary text-primary-foreground overflow-hidden rounded-2xl border border-primary/20 p-6 hover:shadow-lg transition-shadow"
            >
              <article className="mt-auto">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[1].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary-foreground text-primary-foreground" />
                  ))}
                </div>
                <p className="mb-6 leading-relaxed">
                  "{testimonials[1].content}"
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{testimonials[1].name}</h3>
                    <p className="text-sm opacity-80">{testimonials[1].role}</p>
                  </div>
                  <img
                    src={testimonials[1].image}
                    alt={testimonials[1].name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <TimelineContent 
              animationNum={5} 
              customVariants={revealVariants} 
              timelineRef={testimonialRef} 
              className="flex flex-col justify-between relative bg-card text-card-foreground overflow-hidden rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <article className="mt-auto">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[2].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm mb-6 leading-relaxed">
                  "{testimonials[2].content}"
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{testimonials[2].name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonials[2].role}</p>
                  </div>
                  <img
                    src={testimonials[2].image}
                    alt={testimonials[2].name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent 
              animationNum={6} 
              customVariants={revealVariants} 
              timelineRef={testimonialRef} 
              className="flex flex-col justify-between relative bg-card text-card-foreground overflow-hidden rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <article className="mt-auto">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[3].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm mb-6 leading-relaxed">
                  "{testimonials[3].content}"
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{testimonials[3].name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonials[3].role}</p>
                  </div>
                  <img
                    src={testimonials[3].image}
                    alt={testimonials[3].name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent 
              animationNum={7} 
              customVariants={revealVariants} 
              timelineRef={testimonialRef} 
              className="flex flex-col justify-between relative bg-card text-card-foreground overflow-hidden rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <article className="mt-auto">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[4].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm mb-6 leading-relaxed">
                  "{testimonials[4].content}"
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{testimonials[4].name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonials[4].role}</p>
                  </div>
                  <img
                    src={testimonials[4].image}
                    alt={testimonials[4].name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <TimelineContent 
              animationNum={8} 
              customVariants={revealVariants} 
              timelineRef={testimonialRef} 
              className="flex-[3] flex flex-col justify-between relative bg-primary text-primary-foreground overflow-hidden rounded-2xl border border-primary/20 p-6 hover:shadow-lg transition-shadow"
            >
              <article className="mt-auto">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[5].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary-foreground text-primary-foreground" />
                  ))}
                </div>
                <p className="mb-6 leading-relaxed">
                  "{testimonials[5].content}"
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{testimonials[5].name}</h3>
                    <p className="text-sm opacity-80">{testimonials[5].role}</p>
                  </div>
                  <img
                    src={testimonials[5].image}
                    alt={testimonials[5].name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent 
              animationNum={9} 
              customVariants={revealVariants} 
              timelineRef={testimonialRef} 
              className="flex-[7] flex flex-col justify-between relative bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden rounded-2xl border border-primary/20 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto relative z-10">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[0].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-primary/90 mb-6 leading-relaxed">
                  "{testimonials[0].content}"
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg text-primary">
                      {testimonials[0].name}
                    </h3>
                    <p className="text-sm text-primary/60">{testimonials[0].role}</p>
                  </div>
                  <img
                    src={testimonials[0].image}
                    alt={testimonials[0].name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
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
