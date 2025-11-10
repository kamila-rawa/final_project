import React from 'react';
import { useTranslation } from 'react-i18next';

export default function CTA() {
  const { t } = useTranslation();
  
  // Coordonnées statiques
  const contactInfo = {
    phone: '+48 790 414 940',
    address: 'Perłowa 5, 75-016 Skwierzynka, Polska',
    whatsapp: '+48790414940',
    instagram: 'https://www.instagram.com/mobilne_opalanie_likeagold/',
    facebook: 'https://www.facebook.com/search/top?q=mobilne%20opalanie%20natryskowe',
    // URL Google Maps
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1801.0199883930743!2d16.193887575779783!3d54.22401510869473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4701d2a1cb828ef1%3A0x2fad0cff32f75e6c!2sPer%C5%82owa%205%2C%2075-016%20Skwierzynka%2C%20Pologne!5e1!3m2!1sfr!2sfr!4v1759393044587!5m2!1sfr!2sfr'
  };

  // Fonctions d'action
  const handleCall = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  const handleWhatsApp = () => {
    const number = contactInfo.whatsapp;
    const message = encodeURIComponent('Cześć! Chciałabym umówić się na spray tan.');
    window.open(`https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div id="cta" className="relative bg-gradient-to-br from-amber-50 to-orange-50 py-24 sm:py-32">
      {/* Effet de fond décoratif */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[calc(50%-36rem)] left-[calc(50%-19rem)] transform-gpu blur-3xl">
          <div
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="aspect-1097/1023 w-[68.5625rem] bg-gradient-to-r from-amber-300 to-yellow-200 opacity-30"
          />
        </div>
      </div>

      {/* Contenu principal - Photo et Texte */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 mb-16">
        <div className="mx-auto flex max-w-2xl flex-col gap-y-16 lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-8">
          
          {/* Contenu texte - à gauche sur desktop */}
          <div className="lg:pr-8 xl:pr-20">
            <div className="lg:max-w-lg">
              {/* Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {t('cta.badge')}
                </span>
              </div>

              {/* Titre principal */}
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {t('cta.title')}
              </h2>
              
              {/* Description */}
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {t('cta.description')}
              </p>

              {/* Informations de contact */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 mr-3 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="font-medium">{contactInfo.phone}</span>
                </div>
                
                <div className="flex items-start text-gray-700">
                  <svg className="h-5 w-5 mr-3 mt-0.5 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{contactInfo.address}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 mr-3 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>{t('cta.appointment_on_demand')}</span>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCall}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg shadow-sm hover:from-amber-400 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300"
                >
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {t('cta.call_button')}
                </button>
                
                <button 
                  onClick={handleWhatsApp}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-amber-700 bg-white border-2 border-amber-200 rounded-lg shadow-sm hover:bg-amber-50 hover:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300"
                >
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.306"/>
                  </svg>
                  {t('cta.whatsapp_button')}
                </button>
              </div>

              {/* Réseaux sociaux */}
              <div className="mt-8">
                <p className="text-sm font-medium text-gray-700 mb-3">{t('footer.follow_us')}</p>
                <div className="flex space-x-4">
                  <a 
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href={contactInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Note de confiance */}
              <p className="mt-6 text-sm text-gray-500">
                {t('cta.trust_note')}
              </p>
            </div>
          </div>

          {/* Photo - à droite sur desktop */}
          <div className="w-full max-w-xl lg:max-w-none">
            <div className="relative">
              <div className="aspect-[4/5] w-full max-w-lg mx-auto lg:max-w-none lg:w-full">
                <img
                  alt={t('cta.image_alt')}
                  src="/photos/LikeAGold-Aneta-137-2.JPEG"
                  className="absolute inset-0 h-full w-full rounded-2xl object-cover object-center shadow-2xl"
                />
                {/* Overlay décoratif */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-amber-900/20 via-transparent to-amber-100/10"></div>
              </div>
              
              {/* Élément décoratif flottant */}
              <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8">
                <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center">
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {t('cta.floating_text')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t('cta.floating_subtext')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Google Maps - Tout en bas après le contenu */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
          <iframe
            src={contactInfo.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation Like a Gold"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}