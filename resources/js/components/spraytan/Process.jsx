import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Process() {
  const { t } = useTranslation();
  const steps = [
    {
      id: 1,
      title: t('process.step1.title', 'Consultation'),
      description: t('process.step1.description', 'Nous analysons votre type de peau et vos attentes pour choisir la teinte parfaite.'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      id: 2,
      title: t('process.step2.title', 'Préparation'),
      description: t('process.step2.description', 'Exfoliation douce et préparation de la peau pour une application uniforme.'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: t('process.step3.title', 'Application'),
      description: t('process.step3.description', 'Application professionnelle du spray tan avec une technique uniforme et naturelle.'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0V3a1 1 0 011-1h8a1 1 0 011 1v1M7 4l1 16h8l1-16M10 8v8m4-8v8" />
        </svg>
      )
    },
    {
      id: 4,
      title: t('process.step4.title', 'Séchage & Conseils'),
      description: t('process.step4.description', 'Temps de séchage optimal et conseils personnalisés pour maintenir votre bronzage.'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="process" className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            {t('process.title', 'Notre Processus')}
          </h2>
          <p className="text-amber-700 max-w-2xl mx-auto">
            {t('process.subtitle', 'Découvrez notre méthode professionnelle en 4 étapes pour un bronzage parfait et naturel')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Ligne de connexion (sauf pour le dernier élément) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-amber-300 to-amber-200 transform translate-x-4"></div>
              )}
              
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center group hover:-translate-y-2">
                {/* Numéro de l'étape */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                  {step.id}
                </div>

                {/* Icône */}
                <div className="text-amber-600 mb-4 flex justify-center group-hover:text-amber-700 transition-colors">
                  {step.icon}
                </div>

                {/* Titre */}
                <h3 className="text-xl font-semibold text-amber-900 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-amber-700 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-amber-700 mb-6">
            {t('process.cta_text', 'Prêt à découvrir votre meilleur bronzage ?')}
          </p>
          <a 
            href="#contact" 
            className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t('process.cta_button', 'Réserver une consultation')}
          </a>
        </div>
      </div>
    </section>
  );
}