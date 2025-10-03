import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
    const { t } = useTranslation();
    const [openItems, setOpenItems] = useState(new Set());

    const toggleItem = (itemId) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(itemId)) {
            newOpenItems.delete(itemId);
        } else {
            newOpenItems.add(itemId);
        }
        setOpenItems(newOpenItems);
    };

    const FAQItem = ({ id, questionKey, answerKey }) => (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-amber-100/50 overflow-hidden hover:shadow-md transition-all duration-300">
            <button
                onClick={() => toggleItem(id)}
                className="w-full px-6 py-5 text-left flex justify-between items-start hover:bg-amber-50/50 transition-colors group"
            >
                <span className="font-semibold text-gray-900 pr-4 group-hover:text-amber-700 transition-colors">
                    {t(questionKey)}
                </span>
                <span className="text-amber-600 flex-shrink-0 mt-1">
                    <svg 
                        className={`w-5 h-5 transition-transform duration-200 ${
                            openItems.has(id) ? 'rotate-180' : ''
                        }`}
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
            
            <div 
                className={`overflow-hidden transition-all duration-300 ${
                    openItems.has(id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-6 pb-5 border-t border-amber-100/50">
                    <div className="pt-4 text-gray-700 leading-relaxed">
                        {t(answerKey)}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section id="faq" className="relative py-24 sm:py-32 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
            {/* Effet de fond décoratif */}
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[calc(50%-36rem)] right-[calc(50%-19rem)] transform-gpu blur-3xl">
                    <div
                        style={{
                            clipPath: 'polygon(25.9% 55.9%, 0% 38.4%, 2.5% 73.1%, 14.5% 99.9%, 19.3% 98%, 27.5% 67.5%, 39.8% 37.6%, 47.6% 31.9%, 52.5% 41.7%, 54.8% 65.5%, 72.5% 23.3%, 99.9% 35.1%, 82.1% 0%, 72.4% 23.2%, 23.9% 2.3%, 25.9% 55.9%)',
                        }}
                        className="aspect-1097/1023 w-[68.5625rem] bg-gradient-to-r from-yellow-200 to-amber-300 opacity-20"
                    />
                </div>
            </div>

            <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
                {/* En-tête */}
                <div className="text-center mb-16">
                    <div className="mb-6">
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
                            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            {t('faq.badge')}
                        </span>
                    </div>
                    
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        {t('faq.title')}
                    </h2>
                    
                    <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                        {t('faq.subtitle')}
                    </p>
                </div>

                {/* Liste FAQ */}
                <div className="space-y-4 mb-16">
                    <FAQItem id={1} questionKey="faq.q1" answerKey="faq.a1" />
                    <FAQItem id={2} questionKey="faq.q2" answerKey="faq.a2" />
                    <FAQItem id={3} questionKey="faq.q3" answerKey="faq.a3" />
                    <FAQItem id={4} questionKey="faq.q4" answerKey="faq.a4" />
                    <FAQItem id={5} questionKey="faq.q5" answerKey="faq.a5" />
                    <FAQItem id={6} questionKey="faq.q6" answerKey="faq.a6" />
                    <FAQItem id={7} questionKey="faq.q7" answerKey="faq.a7" />
                    <FAQItem id={8} questionKey="faq.q8" answerKey="faq.a8" />
                    <FAQItem id={9} questionKey="faq.q9" answerKey="faq.a9" />
                    <FAQItem id={10} questionKey="faq.q10" answerKey="faq.a10" />
                </div>

                {/* CTA final */}
                <div className="text-center">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/50 max-w-2xl mx-auto">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            {t('faq.stillQuestions')}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {t('faq.contactDescription')}
                        </p>
                        <button
                            onClick={() => {
                                const ctaElement = document.getElementById('cta');
                                if (ctaElement) {
                                    ctaElement.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                        >
                            {t('faq.contactMe')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}