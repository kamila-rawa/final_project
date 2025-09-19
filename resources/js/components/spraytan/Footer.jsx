import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  const [contactInfo, setContactInfo] = useState({
    phone: '+48 790 414 940',
    address: 'Perłowa 5, 75-016 Skwierzynka, Pologne',
    whatsapp: '+48790414940',
    email: 'contact@likeagold.pl'
  });

  // Récupération des informations de contact via API (même logique que CTA)
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('/api/public/contacts', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setContactInfo(result.data);
          }
        }
      } catch (err) {
        console.error('Erreur contact info:', err);
      }
    };

    fetchContactInfo();
  }, []);

  const handleCall = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  const handleWhatsApp = () => {
    const number = contactInfo.whatsapp || contactInfo.phone;
    const message = encodeURIComponent('Cześć! Chciałabym umówić się na spray tan.');
    window.open(`https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <footer className="relative bg-gray-100 text-gray-800">
      {/* Effet de fond décoratif comme About */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[calc(50%-36rem)] right-[calc(50%-19rem)] transform-gpu blur-3xl">
          <div
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="aspect-1097/1023 w-[68.5625rem] bg-gradient-to-r from-amber-400 to-orange-300 opacity-20"
          />
        </div>
      </div>

      {/* Section principale */}
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Colonne 1: À propos */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              {t('footer.business_name', 'Like a Gold')}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('footer.description', 'Twój specjalista od profesjonalnego spray tan w Polsce. Naturalne i trwałe efekty dla idealnej opalenizny przez cały rok.')}
            </p>
            
            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleCall}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {t('footer.call', 'Zadzwoń')}
              </button>
              
              <button 
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-amber-700 bg-white border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.306"/>
                </svg>
                WhatsApp
              </button>
            </div>
          </div>

          {/* Colonne 2: Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">
              {t('footer.quick_links', 'Szybka nawigacja')}
            </h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-600 hover:text-amber-600 transition-colors text-sm">{t('footer.about', 'O mnie')}</a></li>
              <li><a href="#process" className="text-gray-600 hover:text-amber-600 transition-colors text-sm">Opalanie</a></li>
              <li><a href="#testimonials" className="text-gray-600 hover:text-amber-600 transition-colors text-sm">{t('footer.testimonials', 'Opinie')}</a></li>
              <li><a href="#gallery" className="text-gray-600 hover:text-amber-600 transition-colors text-sm">{t('footer.gallery', 'Galeria')}</a></li>
              <li><a href="#faq" className="text-gray-600 hover:text-amber-600 transition-colors text-sm">FAQ</a></li>
              <li><a href="#cta" className="text-gray-600 hover:text-amber-600 transition-colors text-sm">{t('footer.contact', 'Kontakt')}</a></li>
            </ul>
          </div>

          {/* Colonne 3: Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">
              {t('footer.contact_info', 'Kontakt')}
            </h4>
            <div className="space-y-3 text-gray-600 text-sm">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{contactInfo.address}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>{t('footer.appointment', 'Wizyty po umówieniu')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Séparateur */}
      <div className="relative border-t border-gray-300">
        {/* Copyright */}
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
            <p>© {currentYear} Like a Gold. {t('footer.all_rights_reserved', 'Wszystkie prawa zastrzeżone.')} {t('footer.developed_by', 'Opracowane przez')} DWWM Developer.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="/mentions-legales" className="hover:text-amber-600 transition-colors">{t('footer.legal_notice', 'Informacje prawne')}</a>
              <a href="/rgpd" className="hover:text-amber-600 transition-colors">{t('footer.gdpr', 'RODO')}</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton retour en haut */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 rounded-full shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:scale-110 z-40"
        aria-label={t('footer.back_to_top', 'Wróć na górę')}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
}