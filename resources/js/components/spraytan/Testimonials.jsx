import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Testimonials() {
  const { t } = useTranslation();

  // Composant pour afficher les étoiles
  const Stars = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Données des témoignages - utilisant les clés de traduction
  const testimonialsData = [
    { id: 1, name: t('testimonials.client1.name'), message: t('testimonials.client1.message'), rating: 5 },
    { id: 2, name: t('testimonials.client2.name'), message: t('testimonials.client2.message'), rating: 5 },
    { id: 3, name: t('testimonials.client3.name'), message: t('testimonials.client3.message'), rating: 5 },
    { id: 4, name: t('testimonials.client4.name'), message: t('testimonials.client4.message'), rating: 5 },
    { id: 5, name: t('testimonials.client5.name'), message: t('testimonials.client5.message'), rating: 5 },
    { id: 6, name: t('testimonials.client6.name'), message: t('testimonials.client6.message'), rating: 5 },
    { id: 7, name: t('testimonials.client7.name'), message: t('testimonials.client7.message'), rating: 5 },
  ];

  // Témoignage en vedette (le premier)
  const featured = testimonialsData[0];
  // Autres témoignages
  const others = testimonialsData.slice(1);

  return (
    <section id="testimonials" className="relative isolate py-24 sm:py-32">
      {/* Grille décorative */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full stroke-amber-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={0}
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={0} className="overflow-visible fill-amber-50">
          <path
            d="M-200.5 0h201v201h-201Z M599.5 0h201v201h-201Z M399.5 400h201v201h-201Z M-400.5 600h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
      </svg>

      {/* Effets de dégradé */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-amber-400 to-yellow-300"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-8 opacity-25 blur-3xl xl:justify-end"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-amber-400 to-yellow-300 xl:mr-[calc(50%-12rem)] xl:ml-0"
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* En-tête */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {t('testimonials.subtitle')}
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {t('testimonials.title')}
            </h2>
          </div>

          {/* Avis en vedette */}
          <div className="mx-auto max-w-4xl mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 lg:p-12 border border-amber-100/50">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-2xl font-bold">
                    {featured.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{featured.name}</h3>
                    </div>
                    <Stars rating={featured.rating} />
                  </div>
                  <blockquote className="text-lg text-gray-700 leading-relaxed">
                    "{featured.message}"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Grille d'avis - disposition irrégulière */}
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {others.map((testimonial, index) => {
                // Créer un pattern de décalage alternant pour un effet visuel dynamique
                let marginClass = '';
                if (index === 0) marginClass = 'md:mt-8';
                else if (index === 1) marginClass = '';
                else if (index === 2) marginClass = '';
                else if (index === 3) marginClass = 'md:mt-8';
                else if (index === 4) marginClass = 'md:mt-16';
                else if (index === 5) marginClass = '';
                
                return (
                  <div 
                    key={testimonial.id}
                    className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-amber-100/50 hover:shadow-xl transition-shadow ${marginClass}`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center text-white text-lg font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-base">{testimonial.name}</h4>
                      </div>
                    </div>
                    <Stars rating={testimonial.rating} />
                    <p className="mt-6 text-gray-700 leading-relaxed">
                      {testimonial.message}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA final */}
          <div className="text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/50 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('testimonials.cta')}
              </h3>
              <button
                onClick={() => {
                  const ctaElement = document.getElementById('cta');
                  if (ctaElement) {
                    ctaElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                {t('testimonials.book_now')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}