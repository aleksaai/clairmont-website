export type Language = 'de' | 'en' | 'tr';

export const translations = {
  // Navigation
  nav: {
    home: { de: 'Home', en: 'Home', tr: 'Ana Sayfa' },
    about: { de: 'Über uns', en: 'About Us', tr: 'Hakkımızda' },
    services: { de: 'Leistungen', en: 'Services', tr: 'Hizmetler' },
    forms: { de: 'Formulare', en: 'Forms', tr: 'Formlar' },
    faq: { de: 'FAQ', en: 'FAQ', tr: 'SSS' },
    contact: { de: 'Kontakt', en: 'Contact', tr: 'İletişim' },
    taxPrognosis: { de: 'Kostenlose Steuerprognose', en: 'Free Tax Forecast', tr: 'Ücretsiz Vergi Tahmini' },
    privateLoan: { de: 'Privatkredit Selbstauskunft', en: 'Personal Loan Self-Disclosure', tr: 'Bireysel Kredi Beyanı' },
    mortgage: { de: 'Baufinanzierung Selbstauskunft', en: 'Mortgage Self-Disclosure', tr: 'Konut Kredisi Beyanı' },
    buildingProjects: { de: 'Bauprojekte', en: 'Building Projects', tr: 'İnşaat Projeleri' },
    dubai: { de: 'Dubai', en: 'Dubai', tr: 'Dubai' },
    istanbul: { de: 'Istanbul / Türkei', en: 'Istanbul / Turkey', tr: 'İstanbul / Türkiye' },
    azerbaijan: { de: 'Aserbaidschan', en: 'Azerbaijan', tr: 'Azerbaycan' },
  },

  // Hero
  hero: {
    welcome: { de: 'Willkommen bei', en: 'Welcome to', tr: 'Hoş Geldiniz' },
    subtitle: { de: 'Die Zukunft der Finanzberatung.', en: 'The Future of Financial Advisory.', tr: 'Finansal Danışmanlığın Geleceği.' },
    description: {
      de: 'Erfahrung trifft auf moderne Technologie – für klare, effiziente und zukunftssichere Finanzen. Persönlich. Präzise. Intelligent.',
      en: 'Experience meets modern technology – for clear, efficient, and future-proof finances. Personal. Precise. Intelligent.',
      tr: 'Deneyim modern teknolojiyle buluşuyor – net, verimli ve geleceğe yönelik finanslar için. Kişisel. Hassas. Akıllı.',
    },
    tagline: { de: 'Steuern. Kredite. Vermögen', en: 'Taxes. Loans. Assets', tr: 'Vergiler. Krediler. Varlıklar' },
    viewServices: { de: 'Leistungen ansehen', en: 'View Services', tr: 'Hizmetleri Görüntüle' },
    learnMore: { de: 'Mehr erfahren', en: 'Learn More', tr: 'Daha Fazla Bilgi' },
  },

  // How It Works
  howItWorks: {
    title: { de: "Wie funktioniert's?", en: 'How Does It Work?', tr: 'Nasıl Çalışır?' },
    subtitle: {
      de: 'In nur drei einfachen Schritten zu Ihrer Steuererstattung',
      en: 'Your tax refund in just three simple steps',
      tr: 'Sadece üç basit adımda vergi iadeniz',
    },
    step1Title: { de: 'Daten eingeben', en: 'Enter Your Data', tr: 'Verilerinizi Girin' },
    step1Desc: {
      de: 'Beantworten Sie ein paar einfache Fragen zu Ihrer beruflichen Situation. Dauert nur 2 Minuten.',
      en: 'Answer a few simple questions about your professional situation. Takes only 2 minutes.',
      tr: 'Mesleki durumunuz hakkında birkaç basit soruyu yanıtlayın. Sadece 2 dakika sürer.',
    },
    step2Title: { de: 'Kostenlose Prognose', en: 'Free Forecast', tr: 'Ücretsiz Tahmin' },
    step2Desc: {
      de: 'Erfahren Sie sofort, wie viel Steuern Sie zurückbekommen können – komplett kostenlos und unverbindlich.',
      en: 'Find out immediately how much tax you can get back – completely free and non-binding.',
      tr: 'Ne kadar vergi iadesi alabileceğinizi hemen öğrenin – tamamen ücretsiz ve bağlayıcı değil.',
    },
    step3Title: { de: 'Steuererklärung einreichen', en: 'Submit Tax Return', tr: 'Vergi Beyannamesi Gönderin' },
    step3Desc: {
      de: 'Optional: Lassen Sie uns Ihre Steuererklärung einreichen. Sie zahlen nur bei Erfolg – 30% der Erstattung.',
      en: 'Optional: Let us submit your tax return. You only pay on success – 30% of the refund.',
      tr: 'İsteğe bağlı: Vergi beyannamenizi biz gönderlim. Sadece başarı durumunda ödeme yaparsınız – iadenin %30\'u.',
    },
  },

  // Why Clairmont
  whyClairmont: {
    badge: { de: 'Ihre Vorteile', en: 'Your Benefits', tr: 'Avantajlarınız' },
    title: { de: 'Warum Clairmont Advisory?', en: 'Why Clairmont Advisory?', tr: 'Neden Clairmont Advisory?' },
    benefit1Title: { de: 'Schnelle, unkomplizierte Beratung', en: 'Fast, Uncomplicated Advice', tr: 'Hızlı, Komplikasyonsuz Danışmanlık' },
    benefit1Desc: {
      de: 'Zeit ist entscheidend. Sie erhalten direkte Antworten und verständliche Lösungen – ohne Umwege, ohne Fachjargon.',
      en: 'Time is crucial. You get direct answers and understandable solutions – no detours, no jargon.',
      tr: 'Zaman önemlidir. Doğrudan cevaplar ve anlaşılır çözümler alırsınız – dolambaçsız, jargonsuz.',
    },
    benefit2Title: { de: 'Expertise trifft auf Präzision', en: 'Expertise Meets Precision', tr: 'Uzmanlık Hassasiyetle Buluşuyor' },
    benefit2Desc: {
      de: 'Jahrzehntelange Erfahrung vereint mit datenbasierten Entscheidungsprozessen für Finanzierungslösungen, die wirklich passen.',
      en: 'Decades of experience combined with data-driven decision-making for financing solutions that truly fit.',
      tr: 'On yılların deneyimi, gerçekten uyan finansman çözümleri için veri odaklı karar alma süreçleriyle birleştirildi.',
    },
    benefit3Title: { de: 'Maßgeschneiderte Konzepte', en: 'Tailored Concepts', tr: 'Kişiye Özel Konseptler' },
    benefit3Desc: {
      de: 'Intelligente Analysen und internationales Partnernetzwerk für Strategien, die Ihre Ziele optimal unterstützen.',
      en: 'Intelligent analyses and an international partner network for strategies that optimally support your goals.',
      tr: 'Hedeflerinizi en iyi şekilde destekleyen stratejiler için akıllı analizler ve uluslararası ortak ağı.',
    },
    benefit4Title: { de: 'Transparenz auf jedem Schritt', en: 'Transparency at Every Step', tr: 'Her Adımda Şeffaflık' },
    benefit4Desc: {
      de: 'Nachvollziehbare Berechnungen, klare Konditionen und vollständige Kostentransparenz. Sie behalten die Kontrolle.',
      en: 'Traceable calculations, clear conditions, and full cost transparency. You stay in control.',
      tr: 'İzlenebilir hesaplamalar, net koşullar ve tam maliyet şeffaflığı. Kontrol sizde.',
    },
    benefit5Title: { de: 'Internationales Netzwerk', en: 'International Network', tr: 'Uluslararası Ağ' },
    benefit5Desc: {
      de: 'Digitale Systeme und weltweite Kontakte für reibungslose Abläufe bei komplexen oder grenzüberschreitenden Projekten.',
      en: 'Digital systems and worldwide contacts for smooth processes in complex or cross-border projects.',
      tr: 'Karmaşık veya sınır ötesi projelerde sorunsuz süreçler için dijital sistemler ve dünya çapında bağlantılar.',
    },
    closing: {
      de: 'Egal ob Privathaushalt, Familie oder Unternehmen – wir beraten alle Kundengruppen individuell und auf Augenhöhe. Vertrauen Sie unserer Expertise und erreichen Sie Ihr Ziel mit maximaler Planungssicherheit.',
      en: 'Whether private household, family, or business – we advise all client groups individually and at eye level. Trust our expertise and reach your goals with maximum planning security.',
      tr: 'İster özel hane, ister aile, ister işletme – tüm müşteri gruplarına bireysel ve eşit düzeyde danışmanlık yapıyoruz. Uzmanlığımıza güvenin ve maksimum planlama güvenliğiyle hedefinize ulaşın.',
    },
  },

  // Services
  services: {
    badge: { de: 'Leistungen', en: 'Services', tr: 'Hizmetler' },
    title: { de: 'Unsere Leistungen – alles aus einer Hand', en: 'Our Services – Everything from One Source', tr: 'Hizmetlerimiz – Tek Elden Her Şey' },
    subtitle: {
      de: 'Wir bieten moderne, technologiegestützte Finanz- und Beratungsleistungen in den Bereichen Steuern, Finanzierung, Immobilien und Vermögensaufbau.',
      en: 'We offer modern, technology-driven financial and advisory services in taxes, financing, real estate, and wealth building.',
      tr: 'Vergiler, finansman, gayrimenkul ve servet oluşturma alanlarında modern, teknoloji destekli finansal ve danışmanlık hizmetleri sunuyoruz.',
    },
    taxService: { de: 'Steuerservice', en: 'Tax Service', tr: 'Vergi Hizmeti' },
    taxServiceDesc: {
      de: 'Lohnsteuerjahresausgleich, Steuerprognose und Optimierung Ihrer Steuererklärung.',
      en: 'Annual tax adjustment, tax forecast, and optimization of your tax return.',
      tr: 'Yıllık vergi düzenlemesi, vergi tahmini ve vergi beyannamenizin optimizasyonu.',
    },
    taxServiceCta: { de: 'Kostenlose Steuerprognose', en: 'Free Tax Forecast', tr: 'Ücretsiz Vergi Tahmini' },
    privateLoans: { de: 'Privatkredite', en: 'Personal Loans', tr: 'Bireysel Krediler' },
    privateLoansDesc: {
      de: 'Kreditberatung, Selbstauskunft und Vermittlung über starke Partner.',
      en: 'Loan advisory, self-disclosure, and brokerage through strong partners.',
      tr: 'Kredi danışmanlığı, kendi beyanı ve güçlü ortaklar aracılığıyla aracılık.',
    },
    privateLoansDescCta: { de: 'Jetzt anfragen', en: 'Inquire Now', tr: 'Şimdi Başvurun' },
    mortgageTitle: { de: 'Baufinanzierung', en: 'Mortgage', tr: 'Konut Kredisi' },
    mortgageDesc: {
      de: 'Immobilienfinanzierung, Refinanzierung und Ablösung bestehender Kredite.',
      en: 'Property financing, refinancing, and redemption of existing loans.',
      tr: 'Gayrimenkul finansmanı, yeniden finansman ve mevcut kredilerin kapatılması.',
    },
    investmentTitle: { de: 'Investmentberatung', en: 'Investment Advisory', tr: 'Yatırım Danışmanlığı' },
    investmentDesc: {
      de: 'Persönliche Investmentplanung und strategischer Vermögensaufbau.',
      en: 'Personal investment planning and strategic wealth building.',
      tr: 'Kişisel yatırım planlaması ve stratejik servet oluşturma.',
    },
    solarTitle: { de: 'Solaranlagen', en: 'Solar Systems', tr: 'Güneş Enerjisi Sistemleri' },
    solarDesc: {
      de: 'Beratung über Partner für Installation, Finanzierung und Rentabilitätsbewertung.',
      en: 'Advisory through partners for installation, financing, and profitability assessment.',
      tr: 'Kurulum, finansman ve karlılık değerlendirmesi için ortaklar aracılığıyla danışmanlık.',
    },
    portalTitle: { de: 'Kunden-Portal', en: 'Client Portal', tr: 'Müşteri Portalı' },
    portalDesc: {
      de: 'Digitale Dokumentenverwaltung und Zusammenarbeit (in Planung).',
      en: 'Digital document management and collaboration (coming soon).',
      tr: 'Dijital belge yönetimi ve işbirliği (planlama aşamasında).',
    },
  },

  // Statistics
  statistics: {
    badge: { de: 'Unsere Erfolge', en: 'Our Achievements', tr: 'Başarılarımız' },
    title: { de: 'Zahlen, die überzeugen', en: 'Numbers That Convince', tr: 'İkna Eden Rakamlar' },
    subtitle: {
      de: 'Tausende Deutsche vertrauen bereits auf unsere Expertise. Werden Sie Teil unserer Erfolgsgeschichte.',
      en: 'Thousands of Germans already trust our expertise. Become part of our success story.',
      tr: 'Binlerce Alman zaten uzmanlığımıza güveniyor. Başarı hikayemizin parçası olun.',
    },
    avgRefund: { de: '⌀ Rückerstattung', en: '⌀ Refund', tr: '⌀ İade' },
    avgRefundTooltip: {
      de: 'Mit unserer Hilfe erreichen Kunden oft bis zu €3.800 oder mehr.',
      en: 'With our help, clients often achieve up to €3,800 or more.',
      tr: 'Yardımımızla müşteriler genellikle 3.800€ veya daha fazlasına ulaşıyor.',
    },
    happyClients: { de: 'Zufriedene Kunden', en: 'Happy Clients', tr: 'Memnun Müşteriler' },
    happyClientsTooltip: {
      de: 'Vertrauen Sie auf unsere Erfahrung: Über 5.000 Kunden haben wir bereits erfolgreich beraten.',
      en: 'Trust our experience: We have already successfully advised over 5,000 clients.',
      tr: 'Deneyimimize güvenin: 5.000\'den fazla müşteriyi başarıyla danıştık.',
    },
    successRate: { de: 'Erfolgsquote', en: 'Success Rate', tr: 'Başarı Oranı' },
    successRateTooltip: {
      de: 'Wir maximieren Ihre Sicherheit: In 98% der Fälle erhalten Sie die von uns erwartete Rückerstattung wie berechnet.',
      en: 'We maximize your security: In 98% of cases, you receive the refund we calculated.',
      tr: 'Güvenliğinizi en üst düzeye çıkarıyoruz: Vakaların %98\'inde hesapladığımız iadeyi alıyorsunuz.',
    },
    processingTime: { de: '⌀ Bearbeitungszeit', en: '⌀ Processing Time', tr: '⌀ İşlem Süresi' },
    processingTimeTooltip: {
      de: 'Wir sorgen für eine zügige Bearbeitung Ihres Vorgangs – weit unter dem Branchendurchschnitt.',
      en: 'We ensure fast processing of your case – well below industry average.',
      tr: 'İşleminizin hızlı bir şekilde işlenmesini sağlıyoruz – sektör ortalamasının çok altında.',
    },
    days: { de: ' Tage', en: ' Days', tr: ' Gün' },
  },

  // Testimonials
  testimonials: {
    title: { de: 'Was unsere Kunden sagen', en: 'What Our Clients Say', tr: 'Müşterilerimiz Ne Diyor' },
    subtitle: {
      de: 'Vertrauen Sie auf die Erfahrung von zufriedenen Kunden!',
      en: 'Trust the experience of satisfied clients!',
      tr: 'Memnun müşterilerin deneyimine güvenin!',
    },
    googleReviews: { de: 'Google Bewertungen', en: 'Google Reviews', tr: 'Google Yorumları' },
  },

  // FAQ
  faq: {
    badge: { de: 'FAQ', en: 'FAQ', tr: 'SSS' },
    title: { de: 'Häufig gestellte Fragen', en: 'Frequently Asked Questions', tr: 'Sıkça Sorulan Sorular' },
    subtitle: {
      de: 'Hier finden Sie Antworten auf die wichtigsten Fragen rund um Ihre Steuererklärung',
      en: 'Find answers to the most important questions about your tax return',
      tr: 'Vergi beyannameniz hakkındaki en önemli soruların cevaplarını burada bulabilirsiniz',
    },
    q1: {
      de: 'Wer kann Ihre Unterstützung bei der Steuererklärung nutzen?',
      en: 'Who can use your tax return support?',
      tr: 'Vergi beyannamesi desteğinizi kimler kullanabilir?',
    },
    a1: {
      de: 'Privatpersonen mit Wohnsitz in Deutschland, die ihre Steuererklärung optimieren möchten. Besonders hilfreich ist unser Service für alle, die Steuererstattungen maximieren oder komplexe Sachverhalte wie Kapitalerträge, Versicherungen oder Immobilien korrekt deklarieren möchten.',
      en: 'Individuals residing in Germany who want to optimize their tax return. Our service is especially helpful for those who want to maximize tax refunds or correctly declare complex matters such as capital gains, insurance, or real estate.',
      tr: 'Almanya\'da ikamet eden ve vergi beyannamesini optimize etmek isteyen bireyler. Hizmetimiz özellikle vergi iadelerini maksimize etmek veya sermaye kazançları, sigorta veya gayrimenkul gibi karmaşık konuları doğru beyan etmek isteyenler için faydalıdır.',
    },
    q2: {
      de: 'Wie lange dauert die Bearbeitung meiner Steuererklärung?',
      en: 'How long does it take to process my tax return?',
      tr: 'Vergi beyannamemin işlenmesi ne kadar sürer?',
    },
    a2: {
      de: 'Die durchschnittliche Bearbeitungszeit durch das Finanzamt beträgt 6-8 Wochen nach Einreichung. Wir erstellen Ihre Steuererklärung in der Regel innerhalb von 14 Tagen nach Erhalt aller benötigten Unterlagen.',
      en: 'The average processing time by the tax office is 6-8 weeks after submission. We typically prepare your tax return within 14 days of receiving all required documents.',
      tr: 'Vergi dairesi tarafından ortalama işlem süresi, gönderimden sonra 6-8 haftadır. Gerekli tüm belgeleri aldıktan sonra vergi beyannamenizi genellikle 14 gün içinde hazırlarız.',
    },
    q3: {
      de: 'Welche Dokumente werden für die Steuererklärung benötigt?',
      en: 'What documents are needed for the tax return?',
      tr: 'Vergi beyannamesi için hangi belgeler gereklidir?',
    },
    a3: {
      de: 'Typischerweise benötigen wir Ihre Lohnsteuerbescheinigung, Belege für Versicherungen, Nachweise über Werbungskosten, Spendenquittungen und weitere relevante Dokumente. Nach der Prognose erhalten Sie eine individuell auf Sie zugeschnittene Checkliste.',
      en: 'Typically, we need your wage tax certificate, insurance receipts, proof of work-related expenses, donation receipts, and other relevant documents. After the forecast, you will receive a customized checklist.',
      tr: 'Genellikle ücret vergisi belgenize, sigorta makbuzlarına, işle ilgili gider kanıtlarına, bağış makbuzlarına ve diğer ilgili belgelere ihtiyacımız var. Tahminden sonra size özel bir kontrol listesi alacaksınız.',
    },
    q4: {
      de: 'Wie hoch sind die Kosten für Ihre Dienstleistung?',
      en: 'How much does your service cost?',
      tr: 'Hizmetinizin maliyeti nedir?',
    },
    a4: {
      de: 'Unsere Vergütung beträgt 30% Ihrer tatsächlichen Steuererstattung. Sie erfahren zunächst kostenlos durch unsere Prognose, wie viel Sie voraussichtlich zurückbekommen. Wenn Sie sich entscheiden fortzufahren, zahlen Sie 30% der prognostizierten Summe im Voraus. Sollte die tatsächliche Erstattung niedriger ausfallen, erstatten wir Ihnen die Differenz zurück – Sie zahlen garantiert nur 30% dessen, was Sie wirklich erhalten.',
      en: 'Our fee is 30% of your actual tax refund. You first learn for free through our forecast how much you can expect back. If you decide to proceed, you pay 30% of the forecasted amount upfront. If the actual refund is lower, we refund the difference – you are guaranteed to pay only 30% of what you actually receive.',
      tr: 'Ücretimiz gerçek vergi iadenizin %30\'udur. Önce tahminimiz aracılığıyla ne kadar geri alabileceğinizi ücretsiz öğrenirsiniz. Devam etmeye karar verirseniz, tahmin edilen tutarın %30\'unu peşin ödersiniz. Gerçek iade daha düşükse, farkı iade ederiz – gerçekten aldığınızın yalnızca %30\'unu ödemeniz garanti edilir.',
    },
    q5: {
      de: 'Gibt es eine Frist für die Steuererklärung?',
      en: 'Is there a deadline for the tax return?',
      tr: 'Vergi beyannamesi için bir son tarih var mı?',
    },
    a5: {
      de: 'Die reguläre Abgabefrist für die Steuererklärung 2024 endet am 31. Juli 2025. Mit steuerlicher Beratung verlängert sich die Frist bis zum 28. Februar 2026. Wir empfehlen jedoch, frühzeitig zu beginnen, um Ihre Erstattung schneller zu erhalten.',
      en: 'The regular deadline for the 2024 tax return is July 31, 2025. With tax advisory, the deadline extends to February 28, 2026. However, we recommend starting early to receive your refund faster.',
      tr: '2024 vergi beyannamesi için düzenli son tarih 31 Temmuz 2025\'tir. Vergi danışmanlığı ile son tarih 28 Şubat 2026\'ya uzar. Ancak iadenizi daha hızlı almak için erken başlamanızı öneririz.',
    },
    q6: {
      de: 'Kann ich auch Steuererklärungen für vergangene Jahre nachreichen?',
      en: 'Can I also submit tax returns for previous years?',
      tr: 'Geçmiş yıllar için de vergi beyannamesi verebilir miyim?',
    },
    a6: {
      de: 'Ja, Sie können Steuererklärungen für bis zu vier Jahre rückwirkend einreichen (ohne Verpflichtung zur Abgabe). Wir prüfen gerne Ihre individuelle Situation und beraten Sie zu möglichen Erstattungen aus Vorjahren.',
      en: 'Yes, you can submit tax returns retroactively for up to four years (without obligation). We are happy to review your individual situation and advise you on possible refunds from previous years.',
      tr: 'Evet, vergi beyannamelerini geriye dönük olarak dört yıla kadar verebilirsiniz (zorunluluk olmadan). Bireysel durumunuzu incelemekten ve önceki yıllardan olası iadeler hakkında sizi bilgilendirmekten memnuniyet duyarız.',
    },
  },

  // CTA
  cta: {
    title: { de: 'Bereit für Ihre finanzielle Zukunft?', en: 'Ready for Your Financial Future?', tr: 'Finansal Geleceğinize Hazır mısınız?' },
    subtitle: {
      de: 'Ob Steuern, Kredite, Baufinanzierung oder Investments – wir beraten Sie umfassend und finden die beste Lösung für Ihre individuelle Situation.',
      en: 'Whether taxes, loans, mortgages, or investments – we advise you comprehensively and find the best solution for your individual situation.',
      tr: 'Vergiler, krediler, konut finansmanı veya yatırımlar – size kapsamlı danışmanlık yapıyor ve bireysel durumunuz için en iyi çözümü buluyoruz.',
    },
    button: { de: 'Jetzt Kontakt aufnehmen', en: 'Get in Touch Now', tr: 'Şimdi İletişime Geçin' },
    footer: {
      de: '100% kostenlose Erstberatung • Keine Verpflichtung • Datenschutzkonform',
      en: '100% free initial consultation • No obligation • GDPR compliant',
      tr: '%100 ücretsiz ilk danışma • Zorunluluk yok • KVKK uyumlu',
    },
  },

  // Footer
  footer: {
    description: {
      de: 'Ihr Partner für Finanzdienstleistungen. Von Steuerprognosen bis Baufinanzierung - kompetent, sicher und unkompliziert.',
      en: 'Your partner for financial services. From tax forecasts to mortgages - competent, secure, and uncomplicated.',
      tr: 'Finansal hizmetler için ortağınız. Vergi tahminlerinden konut kredilerine - yetkin, güvenli ve komplikasyonsuz.',
    },
    links: { de: 'Links', en: 'Links', tr: 'Bağlantılar' },
    forms: { de: 'Formulare', en: 'Forms', tr: 'Formlar' },
    legal: { de: 'Rechtliches', en: 'Legal', tr: 'Yasal' },
    taxPrognosis: { de: 'Steuerprognose', en: 'Tax Forecast', tr: 'Vergi Tahmini' },
    impressum: { de: 'Impressum', en: 'Imprint', tr: 'Künye' },
    datenschutz: { de: 'Datenschutz', en: 'Privacy Policy', tr: 'Gizlilik Politikası' },
    copyright: { de: 'Alle Rechte vorbehalten.', en: 'All rights reserved.', tr: 'Tüm hakları saklıdır.' },
    madeWith: { de: 'Made with ❤️ in Berlin', en: 'Made with ❤️ in Berlin', tr: 'Berlin\'de ❤️ ile yapıldı' },
  },

  // Contact page
  kontakt: {
    title: { de: 'Kontakt aufnehmen', en: 'Get in Touch', tr: 'İletişime Geçin' },
    subtitle: {
      de: 'Wir freuen uns auf Ihre Nachricht und melden uns schnellstmöglich bei Ihnen.',
      en: 'We look forward to your message and will get back to you as soon as possible.',
      tr: 'Mesajınızı bekliyoruz ve en kısa sürede size geri döneceğiz.',
    },
    firstName: { de: 'Vorname', en: 'First Name', tr: 'Ad' },
    lastName: { de: 'Nachname', en: 'Last Name', tr: 'Soyad' },
    email: { de: 'E-Mail', en: 'Email', tr: 'E-posta' },
    phone: { de: 'Telefonnummer', en: 'Phone Number', tr: 'Telefon Numarası' },
    subject: { de: 'Betreff', en: 'Subject', tr: 'Konu' },
    subjectPlaceholder: { de: 'Worum geht es?', en: 'What is it about?', tr: 'Ne hakkında?' },
    message: { de: 'Nachricht (optional)', en: 'Message (optional)', tr: 'Mesaj (isteğe bağlı)' },
    messagePlaceholder: { de: 'Bitte erläutern Sie Ihr Anliegen...', en: 'Please describe your concern...', tr: 'Lütfen konunuzu açıklayın...' },
    submit: { de: 'Nachricht senden', en: 'Send Message', tr: 'Mesaj Gönder' },
    sending: { de: 'Wird gesendet...', en: 'Sending...', tr: 'Gönderiliyor...' },
    required: { de: '* Pflichtfelder', en: '* Required fields', tr: '* Zorunlu alanlar' },
    successTitle: { de: 'Nachricht gesendet!', en: 'Message sent!', tr: 'Mesaj gönderildi!' },
    successDesc: {
      de: 'Vielen Dank für Ihre Kontaktaufnahme. Wir melden uns schnellstmöglich bei Ihnen.',
      en: 'Thank you for reaching out. We will get back to you as soon as possible.',
      tr: 'İletişime geçtiğiniz için teşekkür ederiz. En kısa sürede size geri döneceğiz.',
    },
    errorTitle: { de: 'Fehler beim Senden', en: 'Error Sending', tr: 'Gönderme Hatası' },
    errorDesc: {
      de: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
      en: 'An error occurred. Please try again later.',
      tr: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
    },
  },

  // NotFound
  notFound: {
    title: { de: 'Seite nicht gefunden', en: 'Page not found', tr: 'Sayfa bulunamadı' },
    description: { de: 'Ups! Diese Seite existiert nicht.', en: 'Oops! Page not found', tr: 'Hata! Sayfa bulunamadı' },
    back: { de: 'Zurück zur Startseite', en: 'Return to Home', tr: 'Ana Sayfaya Dön' },
  },
} as const;

export type TranslationKey = keyof typeof translations;
