import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Composant principal de l'application
import './index.css'; // Fichier de styles globaux (avec TailwindCSS)
import './i18n'; // Configuration i18n pour la gestion des langues
import { ThemeProvider } from './context/ThemeContext'; // Importer le ThemeProvider
import { PokemonProvider } from './context/PokemonContext'; // Importer le DataProvider

// Point d'entrée principal de l'application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <PokemonProvider>
        <App />
      </PokemonProvider>
    </ThemeProvider>
  </React.StrictMode>
);
