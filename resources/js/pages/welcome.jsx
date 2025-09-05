import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';

// Composants principaux
import Header from '@/components/spraytan/Header';
import Hero from '@/components/spraytan/Hero';
import About from '@/components/spraytan/About';
import Process from '@/components/spraytan/Process';
import BeforeAfterGallery from '@/components/spraytan/BeforeAfterGallery';
import PortfolioGallery from '@/components/spraytan/PortfolioGallery';
import Testimonials from '@/components/spraytan/Testimonials';
import CTA from '@/components/spraytan/CTA';
import Footer from '@/components/spraytan/Footer';
import LanguageSwitcher from '@/components/spraytan/LanguageSwitcher';

// Import pour l'internationalisation
import { useTranslation } from 'react-i18next';

export default function Welcome() {
    const { auth } = usePage().props;
    const { t, i18n } = useTranslation();
    
    // États pour le contenu dynamique
    const [testimonials, setTestimonials] = useState([]);
    const [contactInfo, setContactInfo] = useState({});
    const [loading, setLoading] = useState(true);

    // Chargement des données dynamiques
    useEffect(() => {
        fetchDynamicContent();
    }, [i18n.language]);

    const fetchDynamicContent = async () => {
        try {
            setLoading(true);
            
            // Appel API pour récupérer les témoignages
            const testimonialsResponse = await fetch(`/api/testimonials?lang=${i18n.language}`);
            const testimonialsData = await testimonialsResponse.json();
            
            // Appel API pour récupérer les infos de contact
            const contactResponse = await fetch(`/api/contact-info?lang=${i18n.language}`);
            const contactData = await contactResponse.json();
            
            setTestimonials(testimonialsData);
            setContactInfo(contactData);
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
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour changer la langue
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
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
                    currentLanguage={i18n.language}
                    onLanguageChange={changeLanguage}
                    className="fixed top-4 right-4 z-50"
                />

                {/* Header avec navigation */}
                <Header />

                {/* Section Hero */}
                <Hero />

                {/* Section À propos */}
                <About />

                {/* Section Processus */}
                <Process />

                {/* Galerie Before & After */}
                <BeforeAfterGallery 
                    beforeAfterImages={beforeAfterImages}
                />

                {/* Galerie Portfolio */}
                <PortfolioGallery 
                    portfolioImages={portfolioImages}
                />

                {/* Témoignages */}
                {!loading && (
                    <Testimonials 
                        testimonials={testimonials}
                        loading={loading}
                    />
                )}

                {/* Call to Action / Contact */}
                <CTA 
                    contactInfo={contactInfo}
                    loading={loading}
                />

                {/* Footer */}
                <Footer contactInfo={contactInfo} />

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