import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
    const { t } = useTranslation();
    
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ 
            behavior: 'smooth' 
        });
    };

    const scrollToProcess = () => {
        document.getElementById('process')?.scrollIntoView({ 
            behavior: 'smooth' 
        });
    };

    return (
        <section className="relative isolate overflow-hidden bg-gray-900 pt-14 pb-16 sm:pb-20">
            {/* Image de fond - remplacée par votre photo locale */}
            <img
                alt="Professional spray tan service"
                src="/photos/IMG_5148.jpg"
                className="absolute inset-0 -z-10 w-full h-full object-cover"
            />
            
            {/* Overlay sombre pour améliorer la lisibilité */}
            <div className="absolute inset-0 -z-10 bg-black/50"></div>
            
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center text-white">
                    <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
                        {t('hero.title', 'Like a Gold')}
                    </h1>
                    <p className="mt-8 text-lg font-medium text-amber-200 sm:text-xl">
                        {t('hero.subtitle', 'Profesjonalne opalanie natryskowe')}
                    </p>
                    <p className="mt-6 text-base text-gray-300 sm:text-lg max-w-xl mx-auto">
<div className="mt-6 text-base text-gray-300 sm:text-lg max-w-xl mx-auto space-y-2">
    <p>{t('hero.description', 'Uzyskaj idealną złotą opaleniznę.')}</p>
    <p>{t('hero.description_2', 'Bezpieczne, naturalne i długotrwałe efekty gwarantowane.')}</p>
</div>                    </p>
                    
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button
                            onClick={scrollToContact}
                            className="rounded-md bg-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 transition-colors duration-300"
                        >
                            {t('hero.cta_primary', 'Zarezerwuj Wizytę')}
                        </button>
                        
                        <button
                            onClick={scrollToProcess}
                            className="rounded-md px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-600/20 transition-colors duration-300 border border-amber-500"
                        >
                            {t('hero.cta_secondary', 'Dowiedz się więcej')}
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Effet de dégradé en bas */}
            <div
                aria-hidden="true"
                className="absolute inset-x0 -bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-[-20rem]"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-amber-400 to-orange-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>
        </section>
    );
}