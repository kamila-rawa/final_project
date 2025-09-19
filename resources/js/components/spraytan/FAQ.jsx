import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
    const { t } = useTranslation();
    const [openItems, setOpenItems] = useState(new Set());

    // FAQ focalisée sur l'information pratique
    const faqData = [
        {
            id: 1,
            questionKey: 'faq.q1',
            answerKey: 'faq.a1',
            questionDefault: 'Jak przygotować się do zabiegu spray tan?',
            answerDefault: 'Przygotowanie jest kluczowe dla idealnego efektu. 24-48 godzin przed zabiegiem wykonaj peeling całego ciała, ale unikaj olejowych produktów. W dniu wizyty: wykąp się bez mydła nawilżającego, nie używaj dezodorantu, balsamów, perfum ani olejków. Noś luźne, ciemne ubranie i flip-flopy. Golenie wykonaj dzień wcześniej, nie w dniu zabiegu.'
        },
        {
            id: 2,
            questionKey: 'faq.q2',
            answerKey: 'faq.a2',
            questionDefault: 'Jak długo utrzymuje się opalenizna?',
            answerDefault: 'Opalenizna spray tan utrzymuje się 7-10 dni przy odpowiedniej pielęgnacji. Efekt jest najbardziej intensywny przez pierwsze 3-4 dni, następnie stopniowo i naturalnie blaknie. Trwałość zależy od typu skóry, pielęgnacji i aktywności fizycznej. Skóra sucha zatrzymuje opaleniznę dłużej niż tłusta.'
        },
        {
            id: 3,
            questionKey: 'faq.q3',
            answerKey: 'faq.a3',
            questionDefault: 'Czy opalanie natryskowe jest bezpieczne?',
            answerDefault: 'Tak, spray tan jest całkowicie bezpieczny. Używamy DHA (dihydroksyacetonu) - naturalnego składnika zatwierdzonego przez FDA, który reaguje tylko z powierzchniową warstwą skóry. W przeciwieństwie do opalania na słońcu czy w solarium, nie ma ryzyka nowotworów skóry, przedwczesnego starzenia czy poparzenia.'
        },
        {
            id: 4,
            questionKey: 'faq.q4',
            answerKey: 'faq.a4',
            questionDefault: 'Kiedy mogę się wykąpać po zabiegu?',
            answerDefault: 'Pierwszy prysznic po minimum 8-12 godzinach (najlepiej następnego ranka). Używaj letniej wody i delikatnego żelu bez olejków. Nie pocieraj skóry - tylko delikatnie osusz ręcznikiem. Po kąpieli natychmiast nawilż skórę balsamem bez olejków. Unikaj długich, gorących kąpieli, sauny i jacuzzi przez pierwsze 24-48 godzin.'
        },
        {
            id: 5,
            questionKey: 'faq.q5',
            answerKey: 'faq.a5',
            questionDefault: 'Czy mogę ćwiczyć po opalaniu natryskowym?',
            answerDefault: 'Unikaj intensywnych ćwiczeń przez pierwsze 8-12 godzin, aby zapobiec plamom od potu. Po tym czasie możesz normalnie ćwiczyć, ale zawsze bierz prysznic zaraz po treningu i nawilżaj skórę. Pływanie w chlorowanej wodzie skraca trwałość opalenizny.'
        },
        {
            id: 6,
            questionKey: 'faq.q6',
            answerKey: 'faq.a6',
            questionDefault: 'Jak przedłużyć trwałość opalenizny?',
            answerDefault: 'Nawilżanie to klucz! Używaj balsamu bez olejków 2 razy dziennie. Unikaj produktów z AHA, BHA, retinol - przyspieszają złuszczanie. Noś rękawiczki przy sprzątaniu, unikaj długich, gorących kąpieli. Delikatnie złuszczaj skórę co 2-3 dni suchą szczotką lub rękawicą.'
        },
        {
            id: 7,
            questionKey: 'faq.q7',
            answerKey: 'faq.a7',
            questionDefault: 'Czy spray tan jest odpowiedni dla skóry wrażliwej?',
            answerDefault: 'Używam hipoalergicznych produktów Norvell, bezpiecznych dla skóry wrażliwej. Przed zabiegiem wykonuję test próbny na małym obszarze skóry. Unikam spray tan przy aktywnych stanach zapalnych skóry, świeżych ranach czy podrażnieniach.'
        },
        {
            id: 8,
            questionKey: 'faq.q8',
            answerKey: 'faq.a8',
            questionDefault: 'Czy mogę się opalać w ciąży?',
            answerDefault: 'Spray tan jest bezpieczny w ciąży - DHA nie wchłania się do krwiobiegu. Jednak zawsze zalecam konsultację z ginekologiem przed zabiegiem. Unikam obszaru brzucha w pierwszym trymestrze z ostrożności.'
        },
        {
            id: 9,
            questionKey: 'faq.q9',
            answerKey: 'faq.a9',
            questionDefault: 'Ile trwa zabieg i jak przebiega?',
            answerDefault: 'Zabieg trwa 20-30 minut całkowicie. Rozpoczynamy konsultacją - dobór odcienia, omówienie oczekiwań. Następnie aplikacja w specjalnej kabinie z profesjonalnym pistoletem. Na koniec instruktaż pielęgnacji. Cały proces jest komfortowy i dyskretny.'
        },
        {
            id: 10,
            questionKey: 'faq.q10',
            answerKey: 'faq.a10',
            questionDefault: 'Co robić jeśli efekt jest nierówny?',
            answerDefault: 'Nierówności można skorygować w ciągu 24-48 godzin. Ciemniejsze miejsca delikatnie złuszcz mieszanką cukru i oliwy. Jasne miejsca można dotknąć samoopalaczem. Jeśli problem utrzymuje się, skontaktuj się ze mną - poprawa w ramach usługi.'
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
        <section id="faq" className="relative py-24 sm:py-32 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
            {/* Effet de fond décoratif matching CTA */}
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
                            {t('faq.badge', 'Często zadawane pytania')}
                        </span>
                    </div>
                    
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        {t('faq.title', 'Wszystko co musisz wiedzieć')}
                    </h2>
                    
                    <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                        {t('faq.subtitle', 'Praktyczne informacje o spray tan - przygotowanie, pielęgnacja i efekty')}
                    </p>
                </div>

                {/* Liste FAQ */}
                <div className="space-y-4 mb-16">
                    {faqData.map((item, index) => (
                        <div
                            key={item.id}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-amber-100/50 overflow-hidden hover:shadow-md transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleItem(item.id)}
                                className="w-full px-6 py-5 text-left flex justify-between items-start hover:bg-amber-50/50 transition-colors group"
                            >
                                <span className="font-semibold text-gray-900 pr-4 group-hover:text-amber-700 transition-colors">
                                    {t(item.questionKey, item.questionDefault)}
                                </span>
                                <span className="text-amber-600 flex-shrink-0 mt-1">
                                    <svg 
                                        className={`w-5 h-5 transition-transform duration-200 ${
                                            openItems.has(item.id) ? 'rotate-180' : ''
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
                                    openItems.has(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="px-6 pb-5 border-t border-amber-100/50">
                                    <div className="pt-4 text-gray-700 leading-relaxed">
                                        {t(item.answerKey, item.answerDefault)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA final simplifié */}
                <div className="text-center">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/50 max-w-2xl mx-auto">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            {t('faq.stillQuestions', 'Masz jeszcze pytania?')}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {t('faq.contactDescription', 'Skontaktuj się ze mną bezpośrednio. Chętnie odpowiem na wszystkie Twoje pytania i pomogę przygotować się do zabiegu.')}
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
                            {t('faq.contactMe', 'Skontaktuj się ze mną')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}