import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Header() {
    const { t } = useTranslation();
    
    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ 
            behavior: 'smooth' 
        });
    };

    return (
        <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-40">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h2 className="text-2xl font-bold text-amber-600">
                            ✨ Spray Tan Poland
                        </h2>
                    </div>
                    
                    {/* Navigation Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <button
                                onClick={() => scrollToSection('process')}
                                className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                {t('nav.process', 'Process')}
                            </button>
                            <button
                                onClick={() => scrollToSection('about')}
                                className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                {t('nav.about', 'About')}
                            </button>
                            <button
                                onClick={() => scrollToSection('before-after')}
                                className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                {t('nav.gallery', 'Gallery')}
                            </button>
                            <button
                                onClick={() => scrollToSection('testimonials')}
                                className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                {t('nav.testimonials', 'Testimonials')}
                            </button>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                {t('nav.contact', 'Contact')}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}