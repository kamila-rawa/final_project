import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

// Composants principaux
import Header from '@/components/spraytan/Header';
import About from '@/components/spraytan/About';
import Hero from '@/components/spraytan/Hero';
import PortfolioGallery from '@/components/spraytan/PortfolioGallery';
import CTA from '@/components/spraytan/CTA';
import Testimonials from '@/components/spraytan/Testimonials';
import FAQ from '@/components/spraytan/FAQ';
import Footer from '@/components/spraytan/Footer';
import Process from '@/components/spraytan/Process';
import '../i18n';

export default function Welcome() {
    const { auth } = usePage().props;
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('meta.title', 'Professional Spray Tan Services in Poland')}>
                <meta 
                    name="description" 
                    content={t('meta.description', 'Get the perfect golden tan with professional spray tan services. Safe, natural-looking results. Book your appointment today!')} 
                />
                <meta name="keywords" content="spray tan, bronze, beauty, Poland, professional, opalanie natryskowe" />
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
                {/* Header avec navigation */}
                <Header />

                {/* Section Hero */}
                <Hero />

                {/* Section Processus (étapes du spray tan) */}
                <Process />

                {/* Section À propos */}
                <About />

                {/* Galerie Portfolio - Dynamique via API */}
                <PortfolioGallery />

                {/* Témoignages clients - Statique */}
                <Testimonials />

                {/* Call to Action / Contact - Statique */}
                <CTA />

                {/* FAQ - Statique */}
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