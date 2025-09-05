import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function FAQ({ faqItems = [] }) {
    const { t } = useTranslation();
    const [openItems, setOpenItems] = useState(new Set());

    // FAQ par défaut si pas de contenu dynamique
    const defaultFAQ = [
        {
            id: 1,
            question: t('faq.q1', 'How long does a spray tan last?'),
            answer: t('faq.a1', 'A professional spray tan typically lasts 7-10 days, depending on your skin type and aftercare routine.')
        },
        {
            id: 2,
            question: t('faq.q2', 'How should I prepare for my appointment?'),
            answer: t('faq.a2', 'Exfoliate 24 hours before, avoid moisturizers and deodorant on the day, and wear loose, dark clothing.')
        },
        {
            id: 3,
            question: t('faq.q3', 'Is spray tanning safe?'),
            answer: t('faq.a3', 'Yes! Spray tanning uses DHA (dihydroxyacetone), a safe, FDA-approved ingredient that only affects the top layer of skin.')
        },
        {
            id: 4,
            question: t('faq.q4', 'How long does the application take?'),
            answer: t('faq.a4', 'The application process typically takes 15-20 minutes, plus time for consultation and preparation.')
        },
        {
            id: 5,
            question: t('faq.q5', 'When can I shower after the treatment?'),
            answer: t('faq.a5', 'Wait at least 8-12 hours before your first shower to allow the tan to fully develop.')
        },
        {
            id: 6,
            question: t('faq.q6', 'Can I exercise after spray tanning?'),
            answer: t('faq.a6', 'Avoid sweating and exercise for the first 8-12 hours to prevent streaking and uneven color development.')
        }
    ];

    const displayItems = faqItems.length > 0 ? faqItems : defaultFAQ;

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
        <section id="faq" className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {t('faq.title', 'Frequently Asked Questions')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t('faq.subtitle', 'Everything you need to know about spray tanning')}
                    </p>
                </div>

                <div className="space-y-4">
                    {displayItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <button
                                onClick={() => toggleItem(item.id)}
                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-gray-900 pr-4">
                                    {item.question}
                                </span>
                                <span className={`text-amber-600 transition-transform duration-200 ${
                                    openItems.has(item.id) ? 'rotate-180' : ''
                                }`}>
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
                                            d="M19 9l-7 7-7-7" 
                                        />
                                    </svg>
                                </span>
                            </button>
                            
                            {openItems.has(item.id) && (
                                <div className="px-6 pb-4 border-t border-gray-100">
                                    <div className="pt-4 text-gray-700 leading-relaxed">
                                        {item.answer}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA après FAQ */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4">
                        {t('faq.stillQuestions', 'Still have questions?')}
                    </p>
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        {t('faq.contactUs', 'Contact Us')}
                    </button>
                </div>
            </div>
        </section>
    );
}