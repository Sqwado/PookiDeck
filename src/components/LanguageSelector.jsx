
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "@chakra-ui/react";

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('i18nextLng') || 'en');

    const changeLanguage = (e) => {
        const lang = e.target.value;
        setSelectedLanguage(lang);
        i18n.changeLanguage(lang);
        localStorage.setItem('i18nextLng', lang);
    };

    return (

        <Select value={selectedLanguage} onChange={changeLanguage}
            className="bg-stone-200 dark:bg-stone-600 dark:text-white rounded-xl shadow-md">
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="es">Español</option>
            <option value="it">Italiano</option>
            <option value="en">English</option>
        </Select>
    );
};

export default LanguageSelector;
