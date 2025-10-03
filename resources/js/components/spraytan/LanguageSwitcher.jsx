import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'pl', label: 'PL', flag: '🇵🇱' },
        { code: 'en', label: 'EN', flag: '🇬🇧' }
    ];

    const changeLanguage = (langCode) => {
        i18n.changeLanguage(langCode);
    };

    return (
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        i18n.language === lang.code
                            ? 'bg-amber-500 text-white'
                            : 'text-gray-700 hover:bg-amber-50'
                    }`}
                    aria-label={`Switch to ${lang.label}`}
                >
                    <span className="mr-1.5">{lang.flag}</span>
                    {lang.label}
                </button>
            ))}
        </div>
    );
}