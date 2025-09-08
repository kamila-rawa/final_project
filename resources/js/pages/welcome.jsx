import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';

// Composants principaux
import Header from '@/components/spraytan/Header';
import Hero from '@/components/spraytan/Hero';
import About from '@/components/spraytan/About';
import BeforeAfterGallery from '@/components/spraytan/BeforeAfterGallery';
import Testimonials from '@/components/spraytan/Testimonials';
import PortfolioGallery from '@/components/spraytan/PortfolioGallery';
import FAQ from '@/components/spraytan/FAQ';
import CTA from '@/components/spraytan/CTA';
import Footer from '@/components/spraytan/Footer';
import LanguageSwitcher from '@/components/spraytan/LanguageSwitcher';
import Process from '@/components/spraytan/Process';
import '../i18n';

export default function Welcome() {
    const { auth } = usePage().props;
    
    // États pour le contenu dynamique
    const [testimonials, setTestimonials] = useState([]);
    const [contactInfo, setContactInfo] = useState({});
    const [beforeAfterImages, setBeforeAfterImages] = useState([]);
    const [portfolioImages, setPortfolioImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentLanguage, setCurrentLanguage] = useState('pl');

    // Chargement des données dynamiques
    useEffect(() => {
        fetchDynamicContent();
    }, [currentLanguage]);

    const fetchDynamicContent = async () => {
        try {
            setLoading(true);
            
            // Appel API pour récupérer les témoignages
            const testimonialsResponse = await fetch(`/api/public/testimonials?lang=${currentLanguage}`);
            const testimonialsData = await testimonialsResponse.json();
            
            // Appel API pour récupérer les infos de contact
            const contactResponse = await fetch(`/api/public/contacts?lang=${currentLanguage}`);
            const contactData = await contactResponse.json();
            
            // Appel API pour récupérer les images before/after
            const beforeAfterResponse = await fetch(`/api/public/before-after-images?lang=${currentLanguage}`);
            const beforeAfterData = await beforeAfterResponse.json();
            
            // Appel API pour récupérer les images portfolio
            const portfolioResponse = await fetch(`/api/public/portfolio-images?lang=${currentLanguage}`);
            const portfolioData = await portfolioResponse.json();
            
            setTestimonials(testimonialsData);
            setContactInfo(contactData);
            setBeforeAfterImages(beforeAfterData);
            setPortfolioImages(portfolioData);
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            // Fallback avec des données par défaut
            setTestimonials([]);
            setContactInfo({
                phone: '+48 123 456 789',
                email: 'contact@spraytan.pl',
                address: 'Warsaw, Poland',
                instagram: '@spraytan_poland',
                facebook: 'SprayTanPoland'
            });
            setBeforeAfterImages([]);
            setPortfolioImages([]);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour changer la langue
    const changeLanguage = (lang) => {
        setCurrentLanguage(lang);
    };

    // Traductions simples pour les métadonnées uniquement
    const t = (key, defaultValue = '') => {
        const translations = {
            pl: {
                'meta.title': 'Profesjonalne Usługi Spray Tan w Polsce',
                'meta.description': 'Uzyskaj idealną opaleniznę dzięki profesjonalnym usługom spray tan. Bezpieczne, naturalnie wyglądające rezultaty. Zarezerwuj wizytę już dziś!'
            },
            en: {
                'meta.title': 'Professional Spray Tan Services in Poland',
                'meta.description': 'Get the perfect golden tan with professional spray tan services. Safe, natural-looking results. Book your appointment today!'
            }
        };
        
        return translations[currentLanguage]?.[key] || defaultValue;
    };

    return (
        <>
            <Head title={t('meta.title', 'Professional Spray Tan Services in Poland')}>
                <meta 
                    name="description" 
                    content={t('meta.description', 'Get the perfect golden tan with professional spray tan services. Safe, natural-looking results. Book your appointment today!')} 
                />
                <meta name="keywords" content="spray tan, bronze, beauty, Poland, professional" />
                <meta property="og:title" content={t('meta.title')} />
                <meta property="og:description" content={t('meta.description')} />
                <meta property="og:type" content="website" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link 
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
                    rel="stylesheet" 
                />
            </Head>

            <div className="min-h-screen bg-white">
                {/* Switcher de langue fixe */}
                <LanguageSwitcher 
                    currentLanguage={currentLanguage}
                    onLanguageChange={changeLanguage}
                    className="fixed top-4 right-4 z-50"
                />

                {/* Header avec navigation */}
                <Header />

                {/* Section Hero */}
                <Hero />

                {/* Section Processus (étapes du spray tan) */}
                <Process />

                {/* Section À propos (présentation de ta cousine) */}
                <About />

                {/* Galerie Before & After (transformations) */}
                <BeforeAfterGallery />

                {/* Témoignages clients */}
                <Testimonials />

                {/* Galerie Portfolio (salon, produits, équipements) */}
                <PortfolioGallery />

                {/* FAQ (statique) */}
                <FAQ />

                {/* Call to Action / Contact */}
                <CTA />

                {/* Footer */}
                <Footer />

                {/* Admin quick access (if authenticated) */}
                {auth.user && (
                    <div className="fixed bottom-4 left-4 z-50">
                        <a
                            href="/dashboard"
                            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 text-sm font-medium"
                        >
                            🔧 Admin
                        </a>
                    </div>
                )}
            </div>
        </>
    );
}