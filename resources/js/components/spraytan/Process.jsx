import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Process() {
    const { t } = useTranslation();

    return (
        <div id="process" className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            {/* Grille SVG comme Testimonials */}
            <svg
                aria-hidden="true"
className="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-amber-200"            >
                <defs>
                    <pattern
                        x="50%"
                        y={0}
                        id="process-grid-pattern"
                        width={200}
                        height={200}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <svg x="50%" y={0} className="overflow-visible fill-amber-50">
                    <path
                        d="M-200.5 0h201v201h-201Z M599.5 0h201v201h-201Z M399.5 400h201v201h-201Z M-400.5 600h201v201h-201Z"
                        strokeWidth={0}
                    />
                </svg>
                <rect fill="url(#process-grid-pattern)" width="100%" height="100%" strokeWidth={0} />
            </svg>

            {/* Effet décoratif amber comme Testimonials */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
            >
                <div
                    style={{
                        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="ml-[max(50%,38rem)] aspect-1313/771 w-[82.0625rem] bg-gradient-to-tr from-amber-400 to-amber-600"
                />
            </div>
            
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <div className="mb-6">
                                <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    {t('process.subtitle', 'Szybki Sposób na Zdrową Opaleniznę')}
                                </span>
                            </div>
                            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                                {t('process.title', 'Opalanie Natryskowe')}
                            </h1>
                            <p className="mt-6 text-xl/8 text-gray-700">
                                {t('process.description', 'Opalanie natryskowe to nowoczesna metoda uzyskania pięknej, złocistej opalenizny w zaledwie kilka minut. Bez słońca, bez szkodliwego UV, za to z gwarancją równomiernego i naturalnego efektu.')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <div className="relative">
                        <img
                            alt="Professional spray tan transformation"
                            src="/photos/process.png"
                            className="w-[48rem] max-w-none rounded-2xl bg-gray-900 shadow-2xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                        />
                        {/* Overlay décoratif */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-amber-900/20 via-transparent to-amber-100/10"></div>
                    </div>
                </div>
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
                            <p>
                                {t('process.intro', 'To idealne rozwiązanie przed każdą ważną okazją - weselem, sesją zdjęciową, wakacjami czy po prostu gdy chcesz poczuć się pewniej w swojej skórze. Profesjonalne opalanie natryskowe daje Ci kontrolę nad intensywnością koloru i pewność pięknego rezultatu.')}
                            </p>
                            <h3 className="mt-8 text-lg font-semibold text-amber-900">
                                {t('process.benefits_title', 'Dlaczego warto wybrać spray tan?')}
                            </h3>
                            <ul role="list" className="mt-6 space-y-8 text-gray-600">
                                <li className="flex gap-x-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 size-5 flex-none text-amber-600">
                                        <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
                                    </svg>
                                    <span>
                                        <strong className="font-semibold text-amber-900">
                                            {t('process.benefit1.title', 'Natychmiastowy efekt.')}
                                        </strong>{' '}
                                        {t('process.benefit1.description', 'Już po zabiegu widzisz różnicę, a pełny, złocisty kolor rozwija się w ciągu kilku godzin.')}
                                    </span>
                                </li>
                                <li className="flex gap-x-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 size-5 flex-none text-amber-600">
                                        <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                                    </svg>
                                    <span>
                                        <strong className="font-semibold text-amber-900">
                                            {t('process.benefit2.title', 'Całkowicie bezpieczne.')}
                                        </strong>{' '}
                                        {t('process.benefit2.description', 'Żadnego promieniowania UV, które przyspiesza starzenie skóry czy zwiększa ryzyko nowotworów.')}
                                    </span>
                                </li>
                                <li className="flex gap-x-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 size-5 flex-none text-amber-600">
                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                    </svg>
                                    <span>
                                        <strong className="font-semibold text-amber-900">
                                            {t('process.benefit3.title', 'Profesjonalna precyzja.')}
                                        </strong>{' '}
                                        {t('process.benefit3.description', 'Równomierne pokrycie bez smug, plam czy nienaturalnych odcieni - tylko piękna, zdrowo wyglądająca opalenizna.')}
                                    </span>
                                </li>
                            </ul>
                        <p className="mt-8 text-gray-600">
    {t('process.conclusion', 'Efekt utrzymuje się 7-10 dni i stopniowo, naturalnie zanika. Możesz cieszyć się pięknym kolorem skóry przez cały rok, niezależnie od pogody czy pory roku.')}
</p>
                            {/* Call to Action */}
                     {/* Call to Action - Style Testimonials */}
                            <div className="mt-12">
                                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/50">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                                        {t('process.cta_title', 'Gotowa na swoją transformację?')}
                                    </h3>
                                    <div className="text-center">
                                        <button
                                            onClick={() => {
                                                const ctaElement = document.getElementById('cta');
                                                if (ctaElement) {
                                                    ctaElement.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }}
                                            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                                        >
                                            {t('process.cta_button', 'Umów się na wizytę')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}