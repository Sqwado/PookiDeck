
import React, { useEffect } from 'react';
import Logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import SwitchTheme from './SwitchTheme';
import LanguageSelector from './LanguageSelector';
import Filter from './home/Filter';

const TopBar = () => {
    return (
        <div className="flex justify-between items-center p-2 md:p-4">
            <Link to="/">
                <img src={Logo} alt="logo" className="h-10 bg-stone-900 dark:bg-transparent rounded-full" />
            </Link>
            <div className="flex items-center space-x-4">
                {window.location.pathname.split('/')[1] !== 'pokemon' &&
                    <Filter />}
                <SwitchTheme />
                <LanguageSelector />
            </div>
        </div>
    );
}

export default TopBar;
