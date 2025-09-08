import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function CTA() {
  const { t, i18n } = useTranslation();
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupération des informations de contact via API
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/contact-info?lang=${i18n.language}`);
        
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des informations de contact');
        }
        
        const data = await response.json();
        setContactInfo(data);
        
      } catch (err) {
        setError(err.message);
        console.error('Erreur contact info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, [i18n.language]);

  // Fonctions d'action
  const handleCall = () => {
    if (contactInfo?.phone) {
      window.location.href = `tel:${contactInfo.phone}`;
    }
  };

  const handleSMS = () => {
    if (contactInfo?.phone) {
      const message = encodeURIComponent(
        t('cta.sms_message', 'Bonjour, je souhaiterais prendre rendez-vous pour un spray tan.')
      );
      window.location.href = `sms:${contactInfo.phone}?body=${message}`;
    }
  };

  const handleEmail = () => {
    if (contactInfo?.email) {
      const subject = encodeURIComponent(t('cta.email_subject', 'Demande de rendez-vous spray tan'));
      const body = encodeURIComponent(
        t('cta.email_body', 'Bonjour,\n\nJe souhaiterais prendre rendez-vous pour un spray tan.\n\nCordialement')
      );
      window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    }
  };

  const handleWhatsApp = () => {
    if (contactInfo?.whatsapp) {
      const message = encodeURIComponent(
        t('cta.whatsapp_message', 'Bonjour, je souhaiterais prendre rendez-vous pour un spray tan.')
      );
      window.open(`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    }
  };

  if (loading) {
    return (
      <section id="contact" className="py-16 bg-gradient-to-br from-amber-500 to-amber-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !contactInfo) {
    return (
      <section id="contact" className="py-16 bg-gradient-to-br from-amber-500 to-amber-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            {t('cta.title', 'Prêt pour votre transformation ?')}
          </h2>
          <div className="text-white/80">
            <p>{t('cta.error', 'Erreur lors du chargement des informations de contact')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-amber-500 to-amber-700">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Titre principal */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {contactInfo.cta_title || t('cta.title', 'Prêt pour votre transformation ?')}
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            {contactInfo.cta_subtitle || t('cta.subtitle', 'Contactez-nous dès maintenant pour réserver votre séance de spray tan professionnel')}
          </p>

          {/* Boutons d'action principaux */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {/* Bouton Appeler */}
            {contactInfo.phone && (
              <button
                onClick={handleCall}
                className="group bg-white text-amber-600 px-6 py-4 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                aria-label={`${t('cta.call', 'Appeler')} ${contactInfo.phone}`}
              >
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">{t('cta.call', 'Appeler')}</div>
                  <div className="text-xs opacity-75">{contactInfo.phone}</div>
                </div>
              </button>
            )}

            {/* Bouton SMS */}
            {contactInfo.phone && (
              <button
                onClick={handleSMS}
                className="group bg-white text-amber-600 px-6 py-4 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                aria-label={t('cta.sms', 'Envoyer un SMS')}
              >
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">{t('cta.sms', 'SMS')}</div>
                  <div className="text-xs opacity-75">{t('cta.instant', 'Rapide')}</div>
                </div>
              </button>
            )}

            {/* Bouton Email */}
            {contactInfo.email && (
              <button
                onClick={handleEmail}
                className="group bg-white text-amber-600 px-6 py-4 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                aria-label={`${t('cta.email', 'Email')} ${contactInfo.email}`}
              >
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">{t('cta.email', 'Email')}</div>
                  <div className="text-xs opacity-75">{contactInfo.email}</div>
                </div>
              </button>
            )}

            {/* Bouton WhatsApp */}
            {contactInfo.whatsapp && (
              <button
                onClick={handleWhatsApp}
                className="group bg-white text-amber-600 px-6 py-4 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                aria-label={t('cta.whatsapp', 'WhatsApp')}
              >
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.306"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">{t('cta.whatsapp', 'WhatsApp')}</div>
                  <div className="text-xs opacity-75">{t('cta.instant', 'Rapide')}</div>
                </div>
              </button>
            )}
          </div>

          {/* Informations supplémentaires */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
              {/* Horaires */}
              {contactInfo.opening_hours && (
                <div>
                  <div className="flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <h3 className="font-semibold">{t('cta.hours', 'Horaires')}</h3>
                  </div>
                  <p className="text-sm opacity-90">{contactInfo.opening_hours}</p>
                </div>
              )}

              {/* Adresse */}
              {contactInfo.address && (
                <div>
                  <div className="flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <h3 className="font-semibold">{t('cta.address', 'Adresse')}</h3>
                  </div>
                  <p className="text-sm opacity-90">{contactInfo.address}</p>
                </div>
              )}

              {/* Délai de réponse */}
              <div>
                <div className="flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <h3 className="font-semibold">{t('cta.response_time', 'Réponse')}</h3>
                </div>
                <p className="text-sm opacity-90">
                  {contactInfo.response_time || t('cta.response_time_default', 'Sous 24h')}
                </p>
              </div>
            </div>

            {/* Message personnalisé */}
            {contactInfo.cta_message && (
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-center italic opacity-90">{contactInfo.cta_message}</p>
              </div>
            )}
          </div>

          {/* Réseaux sociaux */}
          {(contactInfo.facebook || contactInfo.instagram || contactInfo.tiktok) && (
            <div className="mt-8">
              <p className="text-white/80 mb-4">{t('cta.follow_us', 'Suivez-nous sur les réseaux sociaux')}</p>
              <div className="flex justify-center space-x-4">
                {contactInfo.facebook && (
                  <a
                    href={contactInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {contactInfo.instagram && (
                  <a
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.559-3.24-1.448l3.826-6.912c.162-.292.559-.292.721 0l3.826 6.912c-.792.889-1.943 1.448-3.24 1.448z"/>
                    </svg>
                  </a>
                )}
                {contactInfo.tiktok && (
                  <a
                    href={contactInfo.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                    aria-label="TikTok"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}