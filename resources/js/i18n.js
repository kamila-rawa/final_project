import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Traductions pour le projet Spray Tan
const resources = {
  pl: {
    translation: {
      // Hero Section - AJOUTÉ
      "hero.title": "Like a Gold",
      "hero.subtitle": "Profesjonalne opalanie natryskowe",
      "hero.description": "Uzyskaj idealną złotą opaleniznę.",
      "hero.description_2": "Bezpieczne, naturalne i długotrwałe efekty gwarantowane.",
      "hero.cta_primary": "Zarezerwuj Wizytę",
      "hero.cta_secondary": "Dowiedz się więcej",

      // Navigation - AJOUTÉ les clés manquantes
      "nav.home": "Strona główna",
      "nav.about": "O mnie",
      "nav.tanning": "Opalanie",
      "nav.services": "Usługi", 
      "nav.testimonials": "Opinie",
      "nav.gallery": "Galeria",
      "nav.portfolio": "Portfolio",
      "nav.contact": "Kontakt",
      "nav.faq": "FAQ",
      
      // Process Section - AJOUTÉ
      "process.subtitle": "Szybki Sposób na Zdrową Opaleniznę",
      "process.title": "Opalanie Natryskowe",
      "process.description": "Opalanie natryskowe to bezpieczna i szybka metoda uzyskania pięknej, równomiernej opalenizny bez konieczności wystawiania skóry na szkodliwe promieniowanie UV.",
      "process.intro": "Opalanie natryskowe jest szczególnie polecane przed ważnymi wydarzeniami, takimi jak wesela, sesje zdjęciowe czy wakacje, zapewniając zdrowy i promienny wygląd skóry.",
      "process.benefit1.title": "Szybki efekt.",
      "process.benefit1.description": "Efekt opalenizny jest widoczny natychmiast po aplikacji i osiąga pełną intensywność w ciągu kilku godzin.",
      "process.benefit2.title": "Bezpieczeństwo dla skóry.",
      "process.benefit2.description": "Unikasz szkodliwego promieniowania UV, które może prowadzić do starzenia się skóry i zwiększa ryzyko raka skóry.",
      "process.benefit3.title": "Równomierna opalenizna.",
      "process.benefit3.description": "Profesjonalne opalanie natryskowe zapewnia równomierną aplikację bez smug i plam.",
      "process.details": "Podczas zabiegu specjalny preparat z substancją aktywną DHA (dihydroksyaceton) jest równomiernie aplikowany na skórę za pomocą natrysku. Efekt opalenizny pojawia się już po kilku godzinach, a pełna intensywność koloru rozwija się w ciągu 24 godzin. Opalenizna utrzymuje się zwykle od 5 do 10 dni, w zależności od pielęgnacji skóry.",
      "process.preparation.title": "Jak przygotować się do zabiegu?",
      "process.preparation.description": "Przed zabiegiem dokładnie oczyść i złuszcz skórę, unikaj balsamów, olejków, perfum oraz makijażu. W dniu zabiegu załóż luźne, ciemne ubrania. Po aplikacji unikaj kontaktu z wodą przez kilka godzin, aby opalenizna mogła się utrwalić.",
      
      // CTA Section - AJOUTÉ les clés manquantes
      "cta.appointment_on_demand": "Wizyty po telefonicznym umówieniu",
      
      // Métadonnées - AJOUTÉ
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
      "portfolio.cta_title": "Gotowy na swoją transformację?",
      "portfolio.cta_description": "Skontaktuj się z nami, aby dowiedzieć się, jak możemy pomóc Ci uzyskać idealną opaleniznę",
      "portfolio.contact_us": "Skontaktuj się z nami",
      "portfolio.modal_title": "Powiększony obraz",
      "portfolio.close": "Zamknij",
      "portfolio.client_type": "Typ klienta",
      "portfolio.modal_hint": "Naciśnij ESC aby zamknąć",
      "portfolio.error": "Błąd przy ładowaniu portfolio",
      
      // CTA/Contact
      "cta.title": "Gotowy na swoją transformację?",
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
      // Hero Section - AJOUTÉ
      "hero.title": "Like a Gold",
      "hero.subtitle": "Professional spray tanning",
      "hero.description": "Get the perfect golden tan.",
      "hero.description_2": "Safe, natural and long-lasting effects guaranteed.",
      "hero.cta_primary": "Book Appointment",
      "hero.cta_secondary": "Learn more",

      // Navigation - AJOUTÉ les clés manquantes
      "nav.home": "Home",
      "nav.about": "About me",
      "nav.tanning": "Tanning",
      "nav.services": "Services",
      "nav.testimonials": "Testimonials",
      "nav.gallery": "Gallery",
      "nav.portfolio": "Portfolio",
      "nav.contact": "Contact",
      "nav.faq": "FAQ",
      
      // Process Section - AJOUTÉ
      "process.subtitle": "Quick Way to Healthy Tan",
      "process.title": "Spray Tanning",
      "process.description": "Spray tanning is a safe and quick method to achieve a beautiful, even tan without exposing your skin to harmful UV radiation.",
      "process.intro": "Spray tanning is especially recommended before important events such as weddings, photo shoots, or vacations, providing a healthy and radiant skin appearance.",
      "process.benefit1.title": "Quick effect.",
      "process.benefit1.description": "The tanning effect is visible immediately after application and reaches full intensity within hours.",
      "process.benefit2.title": "Skin safety.",
      "process.benefit2.description": "You avoid harmful UV radiation that can lead to skin aging and increase the risk of skin cancer.",
      "process.benefit3.title": "Even tan.",
      "process.benefit3.description": "Professional spray tanning ensures even application without streaks and spots.",
      "process.details": "During the treatment, a special preparation with the active substance DHA (dihydroxyacetone) is evenly applied to the skin using spray. The tanning effect appears within hours, and full color intensity develops within 24 hours. The tan typically lasts 5 to 10 days, depending on skin care.",
      "process.preparation.title": "How to prepare for the treatment?",
      "process.preparation.description": "Before treatment, thoroughly cleanse and exfoliate your skin, avoid lotions, oils, perfumes, and makeup. On the day of treatment, wear loose, dark clothing. After application, avoid contact with water for several hours so the tan can set.",
      
      // CTA Section - AJOUTÉ les clés manquantes
      "cta.appointment_on_demand": "Appointments by phone arrangement",
      
      // Métadonnées - AJOUTÉ
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