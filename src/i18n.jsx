
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importation des fichiers de traduction principaux
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';

const initialresources = {
    en: {
        translation: translationEN,
    },
    fr: {
        translation: translationFR,
    },
};

// Charger les traductions et initialiser i18next
const initI18n = async () => {
    const resources = initialresources;


    i18n
        .use(initReactI18next)
        .init({
            resources,
            lng: localStorage.getItem('i18nextLng') || 'en', // langue par défaut
            fallbackLng: 'en', // langue de secours
            interpolation: {
                escapeValue: false // React se charge de la protection contre les failles XSS
            }
        });
};

initI18n();

export default i18n;
