import React from 'react';

export default function LanguageSwitcher({ currentLanguage, onLanguageChange, className = '' }) {
    const languages = [
        { code: 'pl', label: 'PL', flag: '🇵🇱' },
        { code: 'en', label: 'EN', flag: '🇬🇧' }
    ];

    return (
        <div className={`flex bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                        currentLanguage === lang.code
                            ? 'bg-amber-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    <span className="mr-1">{lang.flag}</span>
                    {lang.label}
                </button>
            ))}
        </div>
    );
}