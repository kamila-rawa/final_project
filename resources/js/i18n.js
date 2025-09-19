import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Traductions pour le projet Spray Tan
const resources = {
  pl: {
    translation: {
      // Hero Section
      "hero.title": "Like a Gold",
      "hero.subtitle": "Profesjonalne opalanie natryskowe",
      "hero.description": "Uzyskaj idealną złotą opaleniznę.",
      "hero.description_2": "Bezpieczne, naturalne i długotrwałe efekty gwarantowane.",
      "hero.cta_primary": "Zarezerwuj Wizytę",
      "hero.cta_secondary": "Dowiedz się więcej",

      // Navigation
      "nav.home": "Strona główna",
      "nav.about": "O mnie",
      "nav.tanning": "Opalanie",
      "nav.services": "Usługi", 
      "nav.testimonials": "Opinie",
      "nav.gallery": "Galeria",
      "nav.portfolio": "Portfolio",
      "nav.contact": "Kontakt",
      "nav.faq": "FAQ",
      
      // Process Section - NOUVELLES TRADUCTIONS
      "process.subtitle": "Szybki Sposób na Zdrową Opaleniznę",
      "process.title": "Opalanie Natryskowe",
      "process.description": "Opalanie natryskowe to nowoczesna metoda uzyskania pięknej, złocistej opalenizny w zaledwie kilka minut. Bez słońca, bez szkodliwego UV, za to z gwarancją równomiernego i naturalnego efektu.",
      "process.intro": "To idealne rozwiązanie przed każdą ważną okazją - weselem, sesją zdjęciową, wakacjami czy po prostu gdy chcesz poczuć się pewniej w swojej skórze. Profesjonalne opalanie natryskowe daje Ci kontrolę nad intensywnością koloru i pewność pięknego rezultatu.",
      "process.benefits_title": "Dlaczego warto wybrać spray tan?",
      "process.benefit1.title": "Natychmiastowy efekt.",
      "process.benefit1.description": "Już po zabiegu widzisz różnicę, a pełny, złocisty kolor rozwija się w ciągu kilku godzin.",
      "process.benefit2.title": "Całkowicie bezpieczne.",
      "process.benefit2.description": "Żadnego promieniowania UV, które przyspiesza starzenie skóry czy zwiększa ryzyko nowotworów.",
      "process.benefit3.title": "Profesjonalna precyzja.",
      "process.benefit3.description": "Równomierne pokrycie bez smug, plam czy nienaturalnych odcieni - tylko piękna, zdrowo wyglądająca opalenizna.",
      "process.conclusion": "Efekt utrzymuje się 7-10 dni i stopniowo, naturalnie zanika. Możesz cieszyć się pięknym kolorem skóry przez cały rok, niezależnie od pogody czy pory roku.",
      "process.cta_title": "Gotowa na swoją transformację?",
      "process.cta_button": "Umów się na wizytę",
      
      // About Section
      "about.title": "O mnie",
      "about.imageAlt": "Aneta Januszek - Certyfikowany Specjalista Spray Tan",
      "about.description1": "Jestem Aneta i od lat zajmuję się profesjonalnym opalaniem natryskowym. Moją misją jest pomóc każdej kobiecie poczuć się pewnie i pięknie w swojej skórze.",
      "about.description2": "Specializuję się w tworzeniu naturalnych, złocistych odcieni, które podkreślają Twoją urodę. Każdy zabieg dostosuję indywidualnie - zarówno pod względem intensywności koloru, jak i Twoich potrzeb.",
      "about.description3": "W swojej pracy używam wyłącznie produktów najwyższej jakości firmy Norvell oraz najnowszych technik aplikacji. To gwarantuje równomierny efekt bez smug i długotrwały rezultat.",
      "about.why_title": "Dlaczego wybrać mnie?",
      "about.benefit1": "Doświadczenie i certyfikowane szkolenia",
      "about.benefit2": "Indywidualne podejście do każdej klientki",
      "about.benefit3": "Naturalne efekty bez pomarańczowego odcienia",
      "about.benefit4": "Higiena i bezpieczeństwo na najwyższym poziomie",
      "about.role": "Certyfikowany Specjalista Spray Tan",
      
      // CTA Section
      "cta.badge": "Profesjonalna transformacja",
      "cta.title": "Poczuj się pięknie w swojej skórze",
      "cta.description": "Zarezerwuj swoją sesję profesjonalnego spray tan już dziś. Doświadcz naturalnej, złocistej opalenizny, która podkreśli Twoją urodę i doda pewności siebie.",
      "cta.appointment_text": "Wizyty po wcześniejszym umówieniu",
      "cta.call_button": "Zadzwoń teraz",
      "cta.whatsapp_button": "WhatsApp",
      "cta.trust_note": "Bezpłatna konsultacja • Produkty Norvell • Efekt natychmiastowy",
      "cta.image_alt": "Aneta Januszek - Profesjonalna transformacja spray tan",
      "cta.floating_text": "Efekt natychmiastowy",
      "cta.floating_subtext": "7-10 dni trwałości",
      
      // CTA Section
      "cta.appointment_on_demand": "Wizyty po telefonicznym umówieniu",
      
      // Métadonnées
      "meta.title": "Profesjonalne Usługi Spray Tan w Polsce - Like a Gold",
      "meta.description": "Uzyskaj idealną opaleniznę dzięki profesjonalnym usługom spray tan. Bezpieczne, naturalnie wyglądające rezultaty. Zarezerwuj wizytę już dziś!",

      // Témoignages
      "testimonials.title": "Opinie klientów",
      "testimonials.subtitle": "Poznaj opinie naszych zadowolonych klientów",
      "testimonials.cta": "Dołącz do naszych zadowolonych klientów!",
      "testimonials.book_now": "Zarezerwuj teraz",
      "testimonials.error": "Błąd przy ładowaniu opinii",
      
      // Galerie avant/après
      "gallery.title": "Galeria Przed/Po",
      "gallery.subtitle": "Odkryj transformacje wykonane przez nasz profesjonalny spray tan",
      "gallery.before_after": "Przed/Po",
      "gallery.click_to_compare": "Kliknij aby zobaczyć przed/po",
      "gallery.view_image": "Zobacz obraz",
      "gallery.before": "Przed",
      "gallery.after": "Po",
      "gallery.previous": "Poprzedni",
      "gallery.next": "Następny",
      "gallery.close": "Zamknij",
      "gallery.comparison": "Porównanie",
      "gallery.modal_title": "Porównanie przed/po",
      "gallery.navigation_hint": "Użyj strzałek lub ESC aby zamknąć",
      "gallery.no_images": "Brak dostępnych zdjęć w tym momencie",
      "gallery.error": "Błąd przy ładowaniu galerii",
      
      // Portfolio
      "portfolio.title": "Nasze Portfolio",
      "portfolio.subtitle": "Odkryj nasze realizacje i zainspiruj się naszymi kreacjami",
      "portfolio.category.all": "Wszystko",
      "portfolio.category.classic": "Klasyczny",
      "portfolio.category.express": "Express",
      "portfolio.category.special": "Specjalny",
      "portfolio.view_image": "Zobacz obraz",
      "portfolio.no_items": "Brak elementów w tej kategorii",
      "portfolio.cta_title": "Gotowa na swoją transformację?",
      "portfolio.cta_description": "Skontaktuj się z nami, aby dowiedzieć się, jak możemy pomóc Ci uzyskać idealną opaleniznę",
      "portfolio.contact_us": "Skontaktuj się z nami",
      "portfolio.modal_title": "Powiększony obraz",
      "portfolio.close": "Zamknij",
      "portfolio.client_type": "Typ klienta",
      "portfolio.modal_hint": "Naciśnij ESC aby zamknąć",
      "portfolio.error": "Błąd przy ładowaniu portfolio",
      
      // CTA/Contact
      "cta.title": "Gotowa na swoją transformację?",
      "cta.subtitle": "Skontaktuj się z nami już teraz, aby zarezerwować swoją sesję profesjonalnego spray tan",
      "cta.call": "Zadzwoń",
      "cta.sms": "SMS",
      "cta.email": "Email",
      "cta.whatsapp": "WhatsApp",
      "cta.instant": "Szybko",
      "cta.hours": "Godziny otwarcia",
      "cta.address": "Adres",
      "cta.response_time": "Czas odpowiedzi",
      "cta.response_time_default": "Do 24h",
      "cta.follow_us": "Śledź nas w mediach społecznościowych",
      "cta.sms_message": "Cześć, chciałbym umówić się na spray tan.",
      "cta.email_subject": "Prośba o wizytę spray tan",
      "cta.email_body": "Cześć,\n\nChciałbym umówić się na spray tan.\n\nPozdrawiam",
      "cta.whatsapp_message": "Cześć, chciałbym umówić się na spray tan.",
      "cta.error": "Błąd przy ładowaniu informacji kontaktowych",
      
      // FAQ Section
      "faq.badge": "Często zadawane pytania",
      "faq.title": "Wszystko co musisz wiedzieć",
      "faq.subtitle": "Praktyczne informacje o spray tan - przygotowanie, pielęgnacja i efekty",
      "faq.stillQuestions": "Masz jeszcze pytania?",
      "faq.contactDescription": "Skontaktuj się ze mną bezpośrednio. Chętnie odpowiem na wszystkie Twoje pytania i pomogę przygotować się do zabiegu.",
      "faq.contactMe": "Skontaktuj się ze mną",
      
      "faq.q1": "Jak przygotować się do zabiegu spray tan?",
      "faq.a1": "Przygotowanie jest kluczowe dla idealnego efektu. 24-48 godzin przed zabiegiem wykonaj peeling całego ciała, ale unikaj olejowych produktów. W dniu wizyty: wykąp się bez mydła nawilżającego, nie używaj dezodorantu, balsamów, perfum ani olejków. Noś luźne, ciemne ubranie i flip-flopy. Golenie wykonaj dzień wcześniej, nie w dniu zabiegu.",
      
      "faq.q2": "Jak długo utrzymuje się opalenizna?",
      "faq.a2": "Opalenizna spray tan utrzymuje się 7-10 dni przy odpowiedniej pielęgnacji. Efekt jest najbardziej intensywny przez pierwsze 3-4 dni, następnie stopniowo i naturalnie blaknie. Trwałość zależy od typu skóry, pielęgnacji i aktywności fizycznej. Skóra sucha zatrzymuje opaleniznę dłużej niż tłusta.",
      
      "faq.q3": "Czy opalanie natryskowe jest bezpieczne?",
      "faq.a3": "Tak, spray tan jest całkowicie bezpieczny. Używamy DHA (dihydroksyacetonu) - naturalnego składnika zatwierdzonego przez FDA, który reaguje tylko z powierzchniową warstwą skóry. W przeciwieństwie do opalania na słońcu czy w solarium, nie ma ryzyka nowotworów skóry, przedwczesnego starzenia czy poparzenia.",
      
      "faq.q4": "Kiedy mogę się wykąpać po zabiegu?",
      "faq.a4": "Pierwszy prysznic po minimum 8-12 godzinach (najlepiej następnego ranka). Używaj letniej wody i delikatnego żelu bez olejków. Nie pocieraj skóry - tylko delikatnie osusz ręcznikiem. Po kąpieli natychmiast nawilż skórę balsamem bez olejków. Unikaj długich, gorących kąpieli, sauny i jacuzzi przez pierwsze 24-48 godzin.",
      
      "faq.q5": "Czy mogę ćwiczyć po opalaniu natryskowym?",
      "faq.a5": "Unikaj intensywnych ćwiczeń przez pierwsze 8-12 godzin, aby zapobiec plamom od potu. Po tym czasie możesz normalnie ćwiczyć, ale zawsze bierz prysznic zaraz po treningu i nawilżaj skórę. Pływanie w chlorowanej wodzie skraca trwałość opalenizny.",
      
      "faq.q6": "Jak przedłużyć trwałość opalenizny?",
      "faq.a6": "Nawilżanie to klucz! Używaj balsamu bez olejków 2 razy dziennie. Unikaj produktów z AHA, BHA, retinol - przyspieszają złuszczanie. Noś rękawiczki przy sprzątaniu, unikaj długich, gorących kąpieli. Delikatnie złuszczaj skórę co 2-3 dni suchą szczotką lub rękawicą.",
      
      "faq.q7": "Czy spray tan jest odpowiedni dla skóry wrażliwej?",
      "faq.a7": "Używam hipoalergicznych produktów Norvell, bezpiecznych dla skóry wrażliwej. Przed zabiegiem wykonuję test próbny na małym obszarze skóry. Unikam spray tan przy aktywnych stanach zapalnych skóry, świeżych ranach czy podrażnieniach.",
      
      "faq.q8": "Czy mogę się opalać w ciąży?",
      "faq.a8": "Spray tan jest bezpieczny w ciąży - DHA nie wchłania się do krwiobiegu. Jednak zawsze zalecam konsultację z ginekologiem przed zabiegiem. Unikam obszaru brzucha w pierwszym trymestrze z ostrożności.",
      
      "faq.q9": "Ile trwa zabieg i jak przebiega?",
      "faq.a9": "Zabieg trwa 20-30 minut całkowicie. Rozpoczynamy konsultacją - dobór odcienia, omówienie oczekiwań. Następnie aplikacja w specjalnej kabinie z profesjonalnym pistoletem. Na koniec instruktaż pielęgnacji. Cały proces jest komfortowy i dyskretny.",
      
      "faq.q10": "Co robić jeśli efekt jest nierówny?",
      "faq.a10": "Nierówności można skorygować w ciągu 24-48 godzin. Ciemniejsze miejsca delikatnie złuszcz mieszanką cukru i oliwy. Jasne miejsca można dotknąć samoopalaczem. Jeśli problem utrzymuje się, skontaktuj się ze mną - poprawa w ramach usługi.",

      // Footer
      "footer.business_name": "Spray Tan Polska",
      "footer.description": "Twój specjalista od profesjonalnego spray tan w Polsce. Naturalne i trwałe efekty dla idealnej opalenizny przez cały rok.",
      "footer.quick_links": "Szybka nawigacja",
      "footer.about": "O nas",
      "footer.testimonials": "Opinie",
      "footer.gallery": "Galeria",
      "footer.portfolio": "Portfolio",
      "footer.contact": "Kontakt",
      "footer.services": "Nasze usługi",
      "footer.service_1": "Klasyczny Spray Tan",
      "footer.service_2": "Express Spray Tan",
      "footer.service_3": "Przygotowanie skóry",
      "footer.service_4": "Porady personalizowane",
      "footer.contact_info": "Kontakt",
      "footer.follow_us": "Śledź nas",
      "footer.all_rights_reserved": "Wszystkie prawa zastrzeżone",
      "footer.legal_notice": "Informacje prawne",
      "footer.privacy_policy": "Polityka prywatności",
      "footer.gdpr": "RODO",
      "footer.developed_by": "Opracowane przez",
      "footer.back_to_top": "Wróć na górę"
    }
  },
  en: {
    translation: {
      // Hero Section
      "hero.title": "Like a Gold",
      "hero.subtitle": "Professional spray tanning",
      "hero.description": "Get the perfect golden tan.",
      "hero.description_2": "Safe, natural and long-lasting effects guaranteed.",
      "hero.cta_primary": "Book Appointment",
      "hero.cta_secondary": "Learn more",

      // Navigation
      "nav.home": "Home",
      "nav.about": "About me",
      "nav.tanning": "Tanning",
      "nav.services": "Services",
      "nav.testimonials": "Testimonials",
      "nav.gallery": "Gallery",
      "nav.portfolio": "Portfolio",
      "nav.contact": "Contact",
      "nav.faq": "FAQ",
      
      // Process Section - NOUVELLES TRADUCTIONS
      "process.subtitle": "Quick Way to Healthy Tan",
      "process.title": "Spray Tanning",
      "process.description": "Spray tanning is a modern method to achieve beautiful, golden tan in just a few minutes. No sun, no harmful UV, but with guarantee of even and natural effect.",
      "process.intro": "It's the perfect solution before any important occasion - wedding, photo shoot, vacation, or simply when you want to feel more confident in your skin. Professional spray tanning gives you control over color intensity and confidence of beautiful results.",
      "process.benefits_title": "Why choose spray tan?",
      "process.benefit1.title": "Instant effect.",
      "process.benefit1.description": "You see the difference right after treatment, and the full, golden color develops within hours.",
      "process.benefit2.title": "Completely safe.",
      "process.benefit2.description": "No UV radiation that accelerates skin aging or increases cancer risk.",
      "process.benefit3.title": "Professional precision.",
      "process.benefit3.description": "Even coverage without streaks, spots or unnatural shades - just beautiful, healthy-looking tan.",
      "process.conclusion": "The effect lasts 7-10 days and gradually, naturally fades. You can enjoy beautiful skin color all year round, regardless of weather or season.",
      "process.cta_title": "Ready for your transformation?",
      "process.cta_button": "Book your appointment",
      
      // About Section
      "about.title": "About Me",
      "about.imageAlt": "Aneta Januszek - Certified Spray Tan Specialist",
      "about.description1": "I'm Aneta and I've been working with professional spray tanning for years. My mission is to help every woman feel confident and beautiful in her skin.",
      "about.description2": "I specialize in creating natural, golden shades that enhance your beauty. I customize each treatment individually - both in terms of color intensity and your needs.",
      "about.description3": "In my work, I use only the highest quality Norvell products and the latest application techniques. This guarantees an even effect without streaks and long-lasting results.",
      "about.why_title": "Why choose me?",
      "about.benefit1": "Experience and certified training",
      "about.benefit2": "Individual approach to each client",
      "about.benefit3": "Natural effects without orange tint",
      "about.benefit4": "Hygiene and safety at the highest level",
      "about.role": "Certified Spray Tan Specialist",
      
      // CTA Section
      "cta.badge": "Professional transformation",
      "cta.title": "Feel beautiful in your skin",
      "cta.description": "Book your professional spray tan session today. Experience natural, golden tan that enhances your beauty and boosts your confidence.",
      "cta.appointment_text": "Appointments by prior arrangement",
      "cta.call_button": "Call now",
      "cta.whatsapp_button": "WhatsApp",
      "cta.trust_note": "Free consultation • Norvell products • Instant effect",
      "cta.image_alt": "Aneta Januszek - Professional spray tan transformation",
      "cta.floating_text": "Instant effect",
      "cta.floating_subtext": "7-10 days lasting",
      
      // CTA Section
      "cta.appointment_on_demand": "Appointments by phone arrangement",
      
      // Métadonnées
      "meta.title": "Professional Spray Tan Services in Poland - Like a Gold",
      "meta.description": "Get the perfect golden tan with professional spray tan services. Safe, natural-looking results. Book your appointment today!",

      // Testimonials
      "testimonials.title": "Client Testimonials",
      "testimonials.subtitle": "Discover the reviews of our satisfied clients",
      "testimonials.cta": "Join our satisfied clients!",
      "testimonials.book_now": "Book now",
      "testimonials.error": "Error loading testimonials",
      
      // Before/After Gallery
      "gallery.title": "Before/After Gallery",
      "gallery.subtitle": "Discover the transformations achieved by our professional spray tan",
      "gallery.before_after": "Before/After",
      "gallery.click_to_compare": "Click to see before/after",
      "gallery.view_image": "View image",
      "gallery.before": "Before",
      "gallery.after": "After",
      "gallery.previous": "Previous",
      "gallery.next": "Next",
      "gallery.close": "Close",
      "gallery.comparison": "Comparison",
      "gallery.modal_title": "Before/after comparison",
      "gallery.navigation_hint": "Use arrows or ESC to close",
      "gallery.no_images": "No images available at the moment",
      "gallery.error": "Error loading gallery",
      
      // Portfolio
      "portfolio.title": "Our Portfolio",
      "portfolio.subtitle": "Discover our work and get inspired by our creations",
      "portfolio.category.all": "All",
      "portfolio.category.classic": "Classic",
      "portfolio.category.express": "Express",
      "portfolio.category.special": "Special",
      "portfolio.view_image": "View image",
      "portfolio.no_items": "No items in this category",
      "portfolio.cta_title": "Ready for your transformation?",
      "portfolio.cta_description": "Contact us to find out how we can help you achieve the perfect tan",
      "portfolio.contact_us": "Contact us",
      "portfolio.modal_title": "Enlarged image",
      "portfolio.close": "Close",
      "portfolio.client_type": "Client type",
      "portfolio.modal_hint": "Press ESC to close",
      "portfolio.error": "Error loading portfolio",
      
      // CTA/Contact
      "cta.title": "Ready for your transformation?",
      "cta.subtitle": "Contact us now to book your professional spray tan session",
      "cta.call": "Call",
      "cta.sms": "SMS",
      "cta.email": "Email",
      "cta.whatsapp": "WhatsApp",
      "cta.instant": "Quick",
      "cta.hours": "Opening hours",
      "cta.address": "Address",
      "cta.response_time": "Response time",
      "cta.response_time_default": "Within 24h",
      "cta.follow_us": "Follow us on social media",
      "cta.sms_message": "Hello, I would like to book a spray tan appointment.",
      "cta.email_subject": "Spray tan appointment request",
      "cta.email_body": "Hello,\n\nI would like to book a spray tan appointment.\n\nBest regards",
      "cta.whatsapp_message": "Hello, I would like to book a spray tan appointment.",
      "cta.error": "Error loading contact information",
      
      // Footer
      "footer.business_name": "Spray Tan Poland",
      "footer.description": "Your professional spray tan specialist in Poland. Natural and lasting results for a perfect tan all year round.",
      "footer.quick_links": "Quick navigation",
      "footer.about": "About",
      "footer.testimonials": "Testimonials",
      "footer.gallery": "Gallery",
      "footer.portfolio": "Portfolio",
      "footer.contact": "Contact",
      "footer.services": "Our services",
      "footer.service_1": "Classic Spray Tan",
      "footer.service_2": "Express Spray Tan",
      "footer.service_3": "Skin preparation",
      "footer.service_4": "Personalized advice",
      "footer.contact_info": "Contact",
      "footer.follow_us": "Follow us",
      "footer.all_rights_reserved": "All rights reserved",
      "footer.legal_notice": "Legal notice",
      "footer.privacy_policy": "Privacy policy",
      "footer.gdpr": "GDPR",
      "footer.developed_by": "Developed by",
      "footer.back_to_top": "Back to top"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pl', // Langue par défaut : polonais
    fallbackLng: 'en', // Langue de secours : anglais
    
    interpolation: {
      escapeValue: false // React escape déjà les valeurs
    },
    
    // Options pour le développement
    debug: process.env.NODE_ENV === 'development',
    
    // Options pour la détection de langue
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;