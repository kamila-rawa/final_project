import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Process() {
    const { t } = useTranslation();

    return (
        <div id="process" className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                    aria-hidden="true"
                    className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-red-200"
                >
                    <defs>
                        <pattern
                            x="50%"
                            y={-1}
                            id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                            width={200}
                            height={200}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-yellow-100">
                        <path
                            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                    <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
                </svg>
            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <p className="text-base/7 font-semibold text-amber-600">
                                {t('process.subtitle', 'Szybki Sposób na Zdrową Opaleniznę')}
                            </p>
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
                    <img
                        alt="Professional spray tan transformation"
                        src="/photos/process.jpg"
                        className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                    />
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
                            <p className="mt-8 text-amber-700">
                                {t('process.conclusion', 'Efekt utrzymuje się 7-10 dni i stopniowo, naturalnie zanika. Możesz cieszyć się pięknym kolorem skóry przez cały rok, niezależnie od pogody czy pory roku.')}
                            </p>
                            
                            {/* Call to Action */}
                            <div className="mt-12 text-center">
                                <h3 className="text-xl font-semibold text-amber-900 mb-4">
                                    {t('process.cta_title', 'Gotowa na swoją transformację?')}
                                </h3>
                                <button
                                    onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors duration-300 shadow-sm"
                                >
                                    {t('process.cta_button', 'Umów się na wizytę')}
                                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}