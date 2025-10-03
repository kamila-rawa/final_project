import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Footer from '@/components/spraytan/Footer';
import '../i18n';

export default function LegalNotice() {
    const { t } = useTranslation();

    const contactInfo = {
        phone: '+48 790 414 940',
        address: 'Perłowa 5, 75-016 Skwierzynka, Pologne'
    };

    return (
        <>
            <Head title="Informacje prawne - Like a Gold" />
            
            <div className="min-h-screen bg-white">
                {/* Barre simple avec bouton retour */}
                <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="text-2xl font-bold text-amber-600">
                                Like a Gold
                            </Link>
                            <Link 
                                href="/"
                                className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Powrót do strony głównej
                            </Link>
                        </div>
                    </div>
                </nav>
                
                <main className="container mx-auto px-6 py-24 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                        Informacje prawne
                    </h1>

                    <div className="prose prose-lg max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Dane właściciela
                            </h2>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="font-medium text-lg">Like a Gold - Mobilne Opalanie Natryskowe</p>
                                <p>Aneta Januszek</p>
                                <p>{contactInfo.address}</p>
                                <p>Tel: {contactInfo.phone}</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Ochrona danych osobowych (RODO)
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Ta strona internetowa ma charakter wyłącznie informacyjny. 
                                <strong> Nie zbieramy, nie przetwarzamy ani nie przechowujemy żadnych danych osobowych 
                                użytkowników przez stronę internetową.</strong>
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Kontakt z nami odbywa się bezpośrednio przez:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>Telefon</li>
                                <li>WhatsApp</li>
                                <li>Instagram</li>
                                <li>Facebook</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                Wszelkie dane osobowe przekazane w trakcie kontaktu bezpośredniego 
                                (imię, telefon) są przetwarzane zgodnie z RODO wyłącznie w celu realizacji 
                                usługi spray tan i nie są udostępniane osobom trzecim.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Cookies
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Strona nie wykorzystuje plików cookies ani innych technologii śledzących użytkowników.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Prawa autorskie
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Wszystkie zdjęcia, grafiki i treści publikowane na stronie są własnością 
                                Like a Gold i chronione prawem autorskim. Kopiowanie, rozpowszechnianie 
                                lub wykorzystywanie materiałów bez zgody jest zabronione.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Odpowiedzialność
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Informacje zawarte na stronie mają charakter ogólny i informacyjny. 
                                Dokładamy starań, aby były one aktualne i poprawne, jednak nie ponosimy 
                                odpowiedzialności za ewentualne błędy lub nieścisłości.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Linki zewnętrzne
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Strona zawiera linki do mediów społecznościowych (Instagram, Facebook). 
                                Nie ponosimy odpowiedzialności za treści dostępne pod tymi linkami.
                            </p>
                        </section>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
                        </p>
                    </div>
                </main>

              
            </div>
        </>
    );
}