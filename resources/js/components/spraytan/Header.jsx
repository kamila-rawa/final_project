import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Header() {
    const { t, i18n } = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Detect scroll for background transparency
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const scrollToSection = (sectionId) => {
        if (sectionId === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            document.getElementById(sectionId)?.scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
        setIsMenuOpen(false);
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === 'pl' ? 'en' : 'pl';
        i18n.changeLanguage(newLang);
    };

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-white/30 backdrop-blur-md shadow-lg border-b border-white/20' 
                : 'bg-transparent'
        }`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 sm:h-16">

                    {/* Logo - Like a Gold */}
                    <div className="flex-shrink-0">
                        <button
                            onClick={() => scrollToSection('hero')}
                            className={`text-2xl font-bold transition-all duration-300 hover:scale-105 ${
                                isScrolled 
                                    ? 'text-amber-700 hover:text-amber-800' 
                                    : 'text-white hover:text-amber-200 drop-shadow-lg'
                            }`}
                        >
                            Like a Gold
                        </button>
                    </div>
                    
                    {/* Navigation Menu Desktop */}
                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-center space-x-1">
                            <button
                                onClick={() => scrollToSection('process')}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                    isScrolled 
                                        ? 'text-gray-700 hover:text-amber-700 hover:bg-amber-50' 
                                        : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                                }`}
                            >
                                {t('nav.tanning', 'Opalanie')}
                            </button>
                            <button
                                onClick={() => scrollToSection('about')}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                    isScrolled 
                                        ? 'text-gray-700 hover:text-amber-700 hover:bg-amber-50' 
                                        : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                                }`}
                            >
                                {t('nav.about', 'O mnie')}
                            </button>
                            <button
                                onClick={() => scrollToSection('portfolio-gallery')}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                    isScrolled 
                                        ? 'text-gray-700 hover:text-amber-700 hover:bg-amber-50' 
                                        : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                                }`}
                            >
                                {t('nav.gallery', 'Galeria')}
                            </button>
                            <button
                                onClick={() => scrollToSection('testimonials')}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                    isScrolled 
                                        ? 'text-gray-700 hover:text-amber-700 hover:bg-amber-50' 
                                        : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                                }`}
                            >
                                {t('nav.testimonials', 'Opinie')}
                            </button>
                         
                            
                            {/* Kontakt button - style comme Hero */}
                            <button
                                onClick={() => scrollToSection('cta')}
                                className="ml-3 px-6 py-2 text-sm font-semibold text-white rounded-lg bg-amber-500 hover:bg-amber-400 transition-all duration-300 shadow-sm"
                            >
                                {t('nav.contact', 'Kontakt')}
                            </button>
                            
   <button
                                onClick={() => scrollToSection('faq')}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                    isScrolled 
                                        ? 'text-gray-700 hover:text-amber-700 hover:bg-amber-50' 
                                        : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                                }`}
                            >
                                {t('nav.faq', 'FAQ')}
                            </button>

                            {/* Language Toggle */}
                            <button
                                onClick={toggleLanguage}
                                className={`ml-4 px-3 py-1 text-xs font-medium rounded-md transition-all duration-300 ${
                                    isScrolled
                                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                        : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20'
                                }`}
                            >
                                {i18n.language === 'pl' ? 'EN' : 'PL'}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center space-x-3">
                        {/* Mobile Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className={`px-2 py-1 text-xs font-medium rounded-md transition-all duration-300 ${
                                isScrolled
                                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                    : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20'
                            }`}
                        >
                            {i18n.language === 'pl' ? 'EN' : 'PL'}
                        </button>
                        
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-2 rounded-md transition-all duration-300 ${
                                isScrolled 
                                    ? 'text-gray-700 hover:text-amber-700 hover:bg-amber-50' 
                                    : 'text-white hover:text-amber-200 hover:bg-white/10'
                            }`}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden">
                        <div className={`px-2 pt-2 pb-3 space-y-1 rounded-b-xl transition-all duration-300 ${
                            isScrolled 
                                ? 'bg-white/95 backdrop-blur-md border-t border-gray-100' 
                                : 'bg-black/20 backdrop-blur-md border-t border-white/10'
                        }`}>
                            <button
                                onClick={() => scrollToSection('process')}
                                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                                    isScrolled 
                                        ? 'text-gray-700 hover:text-amber-700 hover:bg-amber-50' 
                                        : 'text-white hover:text-amber-200 hover:bg-white/10'
                                }`}
                            >
                                {t('nav.tanning', 'Opalanie')}
                            </button>
                            <button
                                onClick={() => scrollToSection('about')}
                                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                                    isScrolled 
                                        ? 'text-gray-700 hover:text-amber-700 hover:bg-amber-50' 
                                        : 'text-white hover:text-amber-200 hover:bg-white/10'
                                }`}
                            >
                                {t('nav.about', 'O mnie')}
                            </button>
                            <button
                                onClick={() => scrollToSection('portfolio-gallery')}
                                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                                    isScrolled 
                                        ? 'text-gray-700 hover:text-amber-700 hover:bg-amber-50' 
                                        : 'text-white hover:text-amber-200 hover:bg-white/10'
                                }`}
                            >
                                {t('nav.gallery', 'Galeria')}
                            </button>
                            <button
                                onClick={() => scrollToSection('testimonials')}
                                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                                    isScrolled 
                                        ? 'text-gray-700 hover:text-amber-700 hover:bg-amber-50' 
                                        : 'text-white hover:text-amber-200 hover:bg-white/10'
                                }`}
                            >
                                {t('nav.testimonials', 'Opinie')}
                            </button>
                            <button
                                onClick={() => scrollToSection('faq')}
                                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                                    isScrolled 
                                        ? 'text-gray-700 hover:text-amber-700 hover:bg-amber-50' 
                                        : 'text-white hover:text-amber-200 hover:bg-white/10'
                                }`}
                            >
                                {t('nav.faq', 'FAQ')}
                            </button>
                            <button
                                onClick={() => scrollToSection('cta')}
                                className="block w-full text-left px-3 py-2 text-sm font-semibold rounded-md bg-amber-500 hover:bg-amber-400 text-white transition-all duration-300"
                            >
                                {t('nav.contact', 'Kontakt')}
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}