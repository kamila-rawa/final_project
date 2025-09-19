import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

// Composants principaux - nouvel ordre
import Header from '@/components/spraytan/Header';
import About from '@/components/spraytan/About';
import Hero from '@/components/spraytan/Hero';
import PortfolioGallery from '@/components/spraytan/PortfolioGallery';
import CTA from '@/components/spraytan/CTA';
import Testimonials from '@/components/spraytan/Testimonials';
import BeforeAfterGallery from '@/components/spraytan/BeforeAfterGallery';
import FAQ from '@/components/spraytan/FAQ';
import Footer from '@/components/spraytan/Footer';
import Process from '@/components/spraytan/Process';
import '../i18n';

export default function Welcome() {
    const { auth } = usePage().props;
    const { t, i18n } = useTranslation();
    
    // États pour le contenu dynamique
    const [testimonials, setTestimonials] = useState([]);
    const [contactInfo, setContactInfo] = useState({});
    const [beforeAfterImages, setBeforeAfterImages] = useState([]);
    const [portfolioImages, setPortfolioImages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Chargement des données dynamiques
    useEffect(() => {
        fetchDynamicContent();
    }, [i18n.language]);

    const fetchDynamicContent = async () => {
        try {
            setLoading(true);
            
            // Appel API pour récupérer les témoignages
            const testimonialsResponse = await fetch(`/api/public/testimonials?lang=${i18n.language}`);
            const testimonialsData = await testimonialsResponse.json();
            
            // Appel API pour récupérer les infos de contact
            const contactResponse = await fetch(`/api/public/contacts?lang=${i18n.language}`);
            const contactData = await contactResponse.json();
            
            // Appel API pour récupérer les images before/after
            const beforeAfterResponse = await fetch(`/api/public/before-after-images?lang=${i18n.language}`);
            const beforeAfterData = await beforeAfterResponse.json();
            
            // Appel API pour récupérer les images portfolio
            const portfolioResponse = await fetch(`/api/public/portfolio-images?lang=${i18n.language}`);
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
                {/* Header avec navigation ET bouton langue intégré */}
                <Header />

                {/* Section Hero */}
                <Hero />

                {/* Section Processus (étapes du spray tan) */}
                <Process />

                {/* Section À propos (présentation de ta cousine) */}
                <About />

                {/* Galerie Portfolio (salon, produits, équipements) */}
                <PortfolioGallery />

                {/* Témoignages clients */}
                <Testimonials />

                {/* Galerie Before & After (transformations) */}
                <BeforeAfterGallery />

                {/* Call to Action / Contact */}
                <CTA />

                {/* FAQ (statique) */}
                <FAQ />

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