import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
    const { t } = useTranslation();
    const [openItems, setOpenItems] = useState(new Set());

    // FAQ statique en dur - plus simple !
    const faqData = [
        {
            id: 1,
            questionKey: 'faq.q1',
            answerKey: 'faq.a1',
            questionDefault: 'Jak długo utrzymuje się opalenizna?',
            answerDefault: 'Opalenizna spray tan utrzymuje się 7-10 dni przy odpowiedniej pielęgnacji.'
        },
        {
            id: 2,
            questionKey: 'faq.q2',
            answerKey: 'faq.a2',
            questionDefault: 'Jak przygotować się do zabiegu?',
            answerDefault: 'Dokładnie złuszcz skórę 24h wcześniej, unikaj balsamów i dezodorantów w dniu zabiegu.'
        },
        {
            id: 3,
            questionKey: 'faq.q3',
            answerKey: 'faq.a3',
            questionDefault: 'Czy opalanie natryskowe jest bezpieczne?',
            answerDefault: 'Tak! Używamy DHA (dihydroksyacetonu), bezpiecznego składnika zatwierdzonego przez FDA.'
        },
        {
            id: 4,
            questionKey: 'faq.q4',
            answerKey: 'faq.a4',
            questionDefault: 'Ile trwa aplikacja?',
            answerDefault: 'Proces aplikacji zajmuje 15-20 minut, plus czas na konsultację i przygotowanie.'
        },
        {
            id: 5,
            questionKey: 'faq.q5',
            answerKey: 'faq.a5',
            questionDefault: 'Kiedy mogę się wykąpać po zabiegu?',
            answerDefault: 'Poczekaj co najmniej 8-12 godzin przed pierwszym prysznicem, aby opalenizna mogła się rozwinąć.'
        },
        {
            id: 6,
            questionKey: 'faq.q6',
            answerKey: 'faq.a6',
            questionDefault: 'Czy mogę ćwiczyć po opalaniu natryskowym?',
            answerDefault: 'Unikaj pocenia się i ćwiczeń przez pierwsze 8-12 godzin, aby zapobiec plamom.'
        }
    ];

    const toggleItem = (itemId) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(itemId)) {
            newOpenItems.delete(itemId);
        } else {
            newOpenItems.add(itemId);
        }
        setOpenItems(newOpenItems);
    };

    return (
        <section id="faq" className="py-20 bg-gradient-to-b from-orange-100/30 via-amber-50/50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {t('faq.title', 'Często Zadawane Pytania')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t('faq.subtitle', 'Wszystko co musisz wiedzieć o opalaniu natryskowym')}
                    </p>
                </div>

                <div className="space-y-4">
                    {faqData.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-amber-100 overflow-hidden"
                        >
                            <button
                                onClick={() => toggleItem(item.id)}
                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-amber-50/50 transition-colors"
                            >
                                <span className="font-semibold text-gray-900 pr-4">
                                    {t(item.questionKey, item.questionDefault)}
                                </span>
                                <span className="text-amber-600">
                                    {openItems.has(item.id) ? (
                                        <svg 
                                            className="w-5 h-5" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M20 12H4" 
                                            />
                                        </svg>
                                    ) : (
                                        <svg 
                                            className="w-5 h-5" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M12 4v16m8-8H4" 
                                            />
                                        </svg>
                                    )}
                                </span>
                            </button>
                            
                            {openItems.has(item.id) && (
                                <div className="px-6 pb-4 border-t border-amber-100">
                                    <div className="pt-4 text-gray-700 leading-relaxed">
                                        {t(item.answerKey, item.answerDefault)}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA après FAQ */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4">
                        {t('faq.stillQuestions', 'Masz jeszcze pytania?')}
                    </p>
                    <button
                        onClick={() => {
                            const ctaElement = document.getElementById('cta') || document.querySelector('[data-section="cta"]');
                            if (ctaElement) {
                                ctaElement.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                    >
                        {t('faq.contactUs', 'Skontaktuj się z nami')}
                    </button>
                </div>
            </div>
        </section>
    );
}