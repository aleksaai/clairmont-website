import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, FileText, Mail, Database } from "lucide-react";

const Datenschutz = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-light text-primary">
              Datenschutzerklärung
            </h1>
          </div>
          
          <p className="text-primary/70 leading-relaxed mb-12">
            Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <div className="space-y-12">
            {/* Einleitung */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
              <h2 className="text-2xl font-light text-primary mb-4">1. Datenschutz auf einen Blick</h2>
              
              <div className="space-y-4 text-primary/70 leading-relaxed">
                <div>
                  <h3 className="font-medium text-primary mb-2">Allgemeine Hinweise</h3>
                  <p>
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
                    Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit 
                    denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz 
                    entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                  </p>
                </div>
              </div>
            </section>

            {/* Verantwortliche Stelle */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
              <div className="flex items-start gap-3 mb-6">
                <FileText className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h2 className="text-2xl font-light text-primary mb-4">2. Verantwortliche Stelle</h2>
                </div>
              </div>
              
              <div className="space-y-3 text-primary/70 leading-relaxed">
                <p className="font-medium text-primary">
                  Clairmont Advisory and Partners L.L.C-FZ
                </p>
                <p>Meydan Grandstand, 6th floor</p>
                <p>Meydan Road, Nad Al Sheba</p>
                <p>Dubai, U.A.E.</p>
                <p className="pt-3">
                  Vertretungsberechtigter Geschäftsführer: Erol Emre Kolukisa
                </p>
                <div className="pt-3 space-y-2">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    E-Mail: <a href="mailto:info@clairmont-advisory.com" className="hover:text-primary transition-colors">info@clairmont-advisory.com</a>
                  </p>
                </div>
              </div>
            </section>

            {/* Datenerfassung */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
              <div className="flex items-start gap-3 mb-6">
                <Database className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h2 className="text-2xl font-light text-primary mb-4">3. Datenerfassung auf dieser Website</h2>
                </div>
              </div>
              
              <div className="space-y-6 text-primary/70 leading-relaxed">
                <div>
                  <h3 className="font-medium text-primary mb-2">Wer ist verantwortlich für die Datenerfassung?</h3>
                  <p>
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                    können Sie dem Impressum dieser Website entnehmen.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-primary mb-2">Wie erfassen wir Ihre Daten?</h3>
                  <p>
                    Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich 
                    z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                  </p>
                  <p className="mt-2">
                    Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere 
                    IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem 
                    oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese 
                    Website betreten.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-primary mb-2">Wofür nutzen wir Ihre Daten?</h3>
                  <p>
                    Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. 
                    Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-primary mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
                  <p>
                    Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer 
                    gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung 
                    oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt 
                    haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen.
                  </p>
                </div>
              </div>
            </section>

            {/* SSL-Verschlüsselung */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
              <div className="flex items-start gap-3 mb-6">
                <Lock className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h2 className="text-2xl font-light text-primary mb-4">4. SSL- bzw. TLS-Verschlüsselung</h2>
                </div>
              </div>
              
              <div className="text-primary/70 leading-relaxed">
                <p>
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, 
                  wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine 
                  SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die 
                  Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in 
                  Ihrer Browserzeile.
                </p>
                <p className="mt-3">
                  Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns 
                  übermitteln, nicht von Dritten mitgelesen werden.
                </p>
              </div>
            </section>

            {/* Kontaktformular */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
              <div className="flex items-start gap-3 mb-6">
                <Mail className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h2 className="text-2xl font-light text-primary mb-4">5. Kontaktformular und E-Mail-Kontakt</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-primary/70 leading-relaxed">
                <p>
                  Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben aus 
                  dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der 
                  Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                </p>
                <p>
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre 
                  Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher 
                  Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem 
                  berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen 
                  (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
                <p>
                  Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung 
                  auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung 
                  entfällt. Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
                </p>
              </div>
            </section>

            {/* Ihre Rechte */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
              <div className="flex items-start gap-3 mb-6">
                <Eye className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h2 className="text-2xl font-light text-primary mb-4">6. Ihre Rechte als betroffene Person</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-primary/70 leading-relaxed">
                <div>
                  <h3 className="font-medium text-primary mb-2">Recht auf Auskunft</h3>
                  <p>
                    Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet 
                    werden und auf Auskunft über diese Daten sowie auf weitere Informationen und Kopie der Daten.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-primary mb-2">Recht auf Berichtigung</h3>
                  <p>
                    Sie haben das Recht, die Berichtigung Sie betreffender unrichtiger Daten zu verlangen.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-primary mb-2">Recht auf Löschung</h3>
                  <p>
                    Sie haben das Recht, zu verlangen, dass betreffende Daten unverzüglich gelöscht werden.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-primary mb-2">Recht auf Einschränkung der Verarbeitung</h3>
                  <p>
                    Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-primary mb-2">Recht auf Datenübertragbarkeit</h3>
                  <p>
                    Sie haben das Recht, die Sie betreffenden personenbezogenen Daten in einem strukturierten, 
                    gängigen und maschinenlesbaren Format zu erhalten.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-primary mb-2">Widerspruchsrecht</h3>
                  <p>
                    Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit 
                    gegen die Verarbeitung Sie betreffender personenbezogener Daten Widerspruch einzulegen.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-primary mb-2">Beschwerderecht bei einer Aufsichtsbehörde</h3>
                  <p>
                    Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren, insbesondere in dem 
                    Mitgliedstaat Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen 
                    Verstoßes, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden Daten gegen 
                    die DSGVO verstößt.
                  </p>
                </div>
              </div>
            </section>

            {/* Speicherdauer */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
              <h2 className="text-2xl font-light text-primary mb-4">7. Speicherdauer</h2>
              
              <div className="text-primary/70 leading-relaxed">
                <p>
                  Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, 
                  verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. 
                  Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung 
                  widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für 
                  die Speicherung Ihrer personenbezogenen Daten haben (z.B. steuer- oder handelsrechtliche 
                  Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
                </p>
              </div>
            </section>

            {/* Kontakt für Datenschutzfragen */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
              <h2 className="text-2xl font-light text-primary mb-4">8. Kontakt für Datenschutzfragen</h2>
              
              <div className="text-primary/70 leading-relaxed">
                <p className="mb-4">
                  Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:
                </p>
                <div className="space-y-2">
                  <p className="font-medium text-primary">Clairmont Advisory and Partners L.L.C-FZ</p>
                  <p>Meydan Grandstand, 6th floor</p>
                  <p>Meydan Road, Nad Al Sheba</p>
                  <p>Dubai, U.A.E.</p>
                  <p className="pt-2">
                    E-Mail: <a href="mailto:info@clairmont-advisory.com" className="hover:text-primary transition-colors">info@clairmont-advisory.com</a>
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

export default Datenschutz;
