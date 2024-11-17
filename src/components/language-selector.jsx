import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
    { code: "en", lang: "English" },
    { code: "fr", lang: "French" },
    { code: "hi", lang: "Hindi" },
    { code: "guj", lang: "Gujarati" },
    { code: "sp", lang: "Spanish" },
    { code: "pnb", lang: "Punjabi" },
    { code: "tam", lang: "Tamil" },
    { code: "mrt", lang: "Marathi" },
    { code: "tel", lang: "Telugu" },
];

const Languageselector = () => {
    const { i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsMenuOpen(false); // Close the menu after selecting a language
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative z-20">
            <button
                onClick={toggleMenu}
                className="text-l font-medium px-3 py-2 border rounded-lg"
            >
                {i18n.language.toUpperCase()} &#9662; {/* Down arrow symbol */}
            </button>
            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                    {languages.map((lng) => (
                        <button
                            key={lng.code}
                            onClick={() => changeLanguage(lng.code)}
                            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg ${lng.code === i18n.language ? "font-bold" : ""}`}
                        >
                            {lng.lang}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Languageselector;
