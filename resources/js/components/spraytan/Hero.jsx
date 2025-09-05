import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
    const { t } = useTranslation();
    
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ 
            behavior: 'smooth' 
        });
    };

    return (
        <section className="relative bg-gradient-to-br from-amber-50 to-orange-100 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenu principal */}
                    <div className="space-y-8">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                            {t('hero.title', 'Perfect Golden Tan')}
                            <span className="text-amber-600 block">
                                {t('hero.subtitle', 'Professional Results')}
                            </span>
                        </h1>
                        
                        <p className="text-xl text-gray-600 leading-relaxed">
                            {t('hero.description', 'Get the perfect sun-kissed glow with our professional spray tan services. Safe, natural-looking, and long-lasting results guaranteed.')}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={scrollToContact}
                                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                            >
                                {t('hero.cta_primary', 'Book Appointment')}
                            </button>
                            <button
                                onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
                                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                            >
                                {t('hero.cta_secondary', 'Learn More')}
                            </button>
                        </div>
                    </div>
                    
                    {/* Image hero */}
                    <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center shadow-2xl">
                            <div className="text-6xl">🌟</div>
                        </div>
                        {/* Placeholder pour l'image réelle */}
                        <div className="absolute inset-0 rounded-full bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white text-sm">Photo à venir</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}