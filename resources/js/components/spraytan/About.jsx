import React from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
    const { t } = useTranslation();

    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {t('about.title', 'About Me')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t('about.subtitle', 'Professional spray tan artist with passion for perfect results')}
                    </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {t('about.description1', 'Welcome! I\'m a certified spray tan professional with years of experience in creating the perfect golden glow for my clients.')}
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {t('about.description2', 'Using only the highest quality, organic products, I ensure each client gets a natural, streak-free tan that lasts up to 10 days.')}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-6 pt-6">
                            <div className="text-center p-4 bg-amber-50 rounded-lg">
                                <div className="text-2xl font-bold text-amber-600">500+</div>
                                <div className="text-sm text-gray-600">{t('about.stats.clients', 'Happy Clients')}</div>
                            </div>
                            <div className="text-center p-4 bg-amber-50 rounded-lg">
                                <div className="text-2xl font-bold text-amber-600">3+</div>
                                <div className="text-sm text-gray-600">{t('about.stats.years', 'Years Experience')}</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Photo de l'artiste */}
                    <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl flex items-center justify-center shadow-xl">
                            <div className="text-4xl">👩‍💼</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}