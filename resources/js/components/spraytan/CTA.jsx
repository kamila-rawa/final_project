import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function CTA() {
  const { t } = useTranslation();
  const [contactInfo, setContactInfo] = useState({
    phone: '+48 790 414 940',
    address: 'Perłowa 5, 75-016 Skwierzynka, Pologne',
    hours: 'Ouvert ⋅ Ferme à 20:30',
    whatsapp: '+48790414940',
  });

  // Récupération des informations de contact via API (en arrière-plan)
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

  // Fonctions d'action
  const handleCall = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  const handleWhatsApp = () => {
    const number = contactInfo.whatsapp || contactInfo.phone;
    const message = encodeURIComponent('Cześć! Chciałabym umówić się na spray tan.');
    window.open(`https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 [mask:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#d97706" />
                <stop offset={1} stopColor="#92400e" />
              </radialGradient>
            </defs>
          </svg>
          
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
              Gotowa na swoją transformację?
            </h2>
            <p className="mt-6 text-lg/8 text-pretty text-amber-100">
              Skontaktuj się z Like a Gold, aby zarezerwować swoją sesję profesjonalnego spray tan
            </p>
            
            {/* Informations de contact dynamiques */}
            <div className="mt-8 space-y-3 text-amber-100">
              <div className="flex items-center justify-center lg:justify-start text-sm">
                <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="font-medium">{contactInfo.phone}</span>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start text-sm">
                <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{contactInfo.address}</span>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start text-sm">
                <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <span>{t('cta.appointment_on_demand', 'Wizyty po telefonicznym umówieniu')}</span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <button
                onClick={handleCall}
                className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-amber-700 shadow-xs hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Zadzwoń teraz
              </button>
              
              <button 
                onClick={handleWhatsApp}
                className="text-sm/6 font-semibold text-white hover:text-amber-100 transition-colors duration-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.306"/>
                </svg>
                WhatsApp
                <span aria-hidden="true" className="ml-1">→</span>
              </button>
            </div>
          </div>

          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              alt="Spray tan professional service"
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1000&auto=format&fit=crop"
              width={1824}
              height={1080}
              className="absolute top-0 left-0 w-[28rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}