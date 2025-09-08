import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Testimonials() {
  const { t, i18n } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupération des témoignages via API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/testimonials?lang=${i18n.language}`);
        
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des témoignages');
        }
        
        const data = await response.json();
        
        // Mélange aléatoire des témoignages (exigence DWWM : affichage aléatoire)
        const shuffled = data.sort(() => 0.5 - Math.random());
        // Limite à 5 témoignages maximum
        setTestimonials(shuffled.slice(0, 5));
        
      } catch (err) {
        setError(err.message);
        console.error('Erreur témoignages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [i18n.language]); // Recharge quand la langue change

  if (loading) {
    return (
      <section id="testimonials" className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
            {t('testimonials.title', 'Témoignages clients')}
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonials" className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
            {t('testimonials.title', 'Témoignages clients')}
          </h2>
          <div className="text-center text-red-600">
            <p>{t('testimonials.error', 'Erreur lors du chargement des témoignages')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-4">
          {t('testimonials.title', 'Témoignages clients')}
        </h2>
        <p className="text-center text-amber-700 mb-12 max-w-2xl mx-auto">
          {t('testimonials.subtitle', 'Découvrez les avis de nos clients satisfaits')}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-xl shadow-lg p-6 border border-amber-100 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Étoiles de notation */}
              <div className="flex mb-4" aria-label={`${testimonial.rating} étoiles sur 5`}>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    role="img"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Témoignage */}
              <blockquote className="text-gray-700 mb-4 italic">
                "{testimonial.message}"
              </blockquote>

              {/* Informations client */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.client_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900">
                    {testimonial.client_name}
                  </h4>
                  <p className="text-sm text-amber-600">
                    {new Date(testimonial.created_at).toLocaleDateString(
                      i18n.language === 'pl' ? 'pl-PL' : 'en-GB'
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Appel à l'action */}
        <div className="text-center mt-12">
          <p className="text-amber-700 mb-4">
            {t('testimonials.cta', 'Rejoignez nos clients satisfaits !')}
          </p>
          <a 
            href="#contact" 
            className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {t('testimonials.book_now', 'Réserver maintenant')}
          </a>
        </div>
      </div>
    </section>
  );
}