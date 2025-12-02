import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Building2, MapPin, Phone, Mail, FileText } from "lucide-react";

const Impressum = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light text-primary mb-12">
            Impressum
          </h1>
          
          <div className="space-y-12">
            {/* Company Information */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
              <div className="flex items-start gap-3 mb-6">
                <Building2 className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h2 className="text-2xl font-light text-primary mb-4">Angaben gemäß § 5 TMG</h2>
                </div>
              </div>
              
              <div className="space-y-3 text-primary/70 leading-relaxed">
                <p className="text-lg font-medium text-primary">
                  Clairmont Advisory and Partners L.L.C-FZ
                </p>
                <p>Limited Liability Company</p>
                <p>Formation Number: 2203348</p>
                <p>License Number: 2203348.01</p>
              </div>
            </section>

            {/* Address */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
              <div className="flex items-start gap-3 mb-6">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h2 className="text-2xl font-light text-primary mb-4">Geschäftsadresse</h2>
                </div>
              </div>
              
              <div className="space-y-2 text-primary/70 leading-relaxed">
                <p>Meydan Grandstand, 6th floor</p>
                <p>Meydan Road, Nad Al Sheba</p>
                <p>Dubai, U.A.E.</p>
                <p className="pt-2">P.O.Box: 9305</p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
              <div className="flex items-start gap-3 mb-6">
                <Phone className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h2 className="text-2xl font-light text-primary mb-4">Kontakt</h2>
                </div>
              </div>
              
              <div className="space-y-3 text-primary/70 leading-relaxed">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info@clairmont-advisory.com" className="hover:text-primary transition-colors">
                    info@clairmont-advisory.com
                  </a>
                </div>
              </div>
            </section>

            {/* Management */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
              <div className="flex items-start gap-3 mb-6">
                <FileText className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h2 className="text-2xl font-light text-primary mb-4">Vertretungsberechtigter Geschäftsführer</h2>
                </div>
              </div>
              
              <div className="space-y-2 text-primary/70 leading-relaxed">
                <p>Erol Emre Kolukisa</p>
              </div>
            </section>

            {/* Business Activities */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
              <div className="flex items-start gap-3 mb-6">
                <Building2 className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h2 className="text-2xl font-light text-primary mb-4">Geschäftstätigkeit</h2>
                </div>
              </div>
              
              <div className="space-y-2 text-primary/70 leading-relaxed">
                <p>Strategy advisory services</p>
                <p>Accounting, bookkeeping and auditing activities</p>
                <p>Tax consultancy</p>
              </div>
            </section>

            {/* Registration Details */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
              <div className="flex items-start gap-3 mb-6">
                <FileText className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h2 className="text-2xl font-light text-primary mb-4">Registrierungsdetails</h2>
                </div>
              </div>
              
              <div className="space-y-2 text-primary/70 leading-relaxed">
                <p>Registriert bei: Meydan Free Zone</p>
                <p>Formation Date: 24. August 2022</p>
                <p>Company Type: Limited Liability Company</p>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
              <h2 className="text-2xl font-light text-primary mb-4">Haftungsausschluss</h2>
              
              <div className="space-y-4 text-primary/70 leading-relaxed">
                <div>
                  <h3 className="font-medium text-primary mb-2">Haftung für Inhalte</h3>
                  <p>
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-primary mb-2">Haftung für Links</h3>
                  <p>
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen 
                    Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-primary mb-2">Urheberrecht</h3>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                    dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                    der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                    Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Impressum;
