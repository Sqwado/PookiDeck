
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TextToSpeach = ({ text }) => {
    const [voices, setVoices] = useState([]);
    const { i18n } = useTranslation();

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        // Charger les voix au démarrage
        loadVoices();

        // Écouter les changements de voix
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const handleSpeak = (e) => {
        e.preventDefault();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = i18n.language;

        // Chercher une voix qui correspond à la langue sélectionnée
        const selectedVoice = voices.find(voice => voice.lang === i18n.language);
        if (selectedVoice) {
            utterance.voice = selectedVoice; // Définir la voix
        }

        window.speechSynthesis.speak(utterance);
    };

    return (
        <button onClick={handleSpeak} className="px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md border-none cursor-pointer">
            🗣
        </button>
    );
}

export default TextToSpeach;
