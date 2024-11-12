
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, MenuItem } from "@mui/material";

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
        <Select
            sx={{
                backgroundColor: 'rgb(0 0 0 / 30%)',
                color: 'white',
                borderRadius: '10px',
                '& .MuiSelect-select': {
                    padding: '10px',
                    paddingRight: '30px',
                },
                '& .MuiSelect-icon': {
                    color: 'white',
                    right: '10px',
                },
            }}
            value={selectedLanguage}
            onChange={changeLanguage}
            variant="outlined"
            className="dark:text-white rounded-xl border border-white m-0"
            MenuProps={{
                PaperProps: {
                    style: {
                        maxHeight: 300,
                        backgroundColor: 'transparent', backdropFilter: 'blur(10px)', borderRadius: '10px'
                    }
                }
            }}>
            <MenuItem className=" dark:text-white" value="ja">
                <span className="sm:hidden">JA</span>
                <span className="hidden sm:inline">日本語</span>
            </MenuItem>
            <MenuItem className="dark:text-white" value="ko">
                <span className="sm:hidden">KO</span>
                <span className="hidden sm:inline">한국어</span>
            </MenuItem>
            <MenuItem className="dark:text-white" value="fr">
                <span className="sm:hidden">FR</span>
                <span className="hidden sm:inline">Français</span>
            </MenuItem>
            <MenuItem className="dark:text-white" value="de">
                <span className="sm:hidden">DE</span>
                <span className="hidden sm:inline">Deutsch</span>
            </MenuItem>
            <MenuItem className="dark:text-white" value="es">
                <span className="sm:hidden">ES</span>
                <span className="hidden sm:inline">Español</span>
            </MenuItem>
            <MenuItem className="dark:text-white" value="it">
                <span className="sm:hidden">IT</span>
                <span className="hidden sm:inline">Italiano</span>
            </MenuItem>
            <MenuItem className="dark:text-white" value="en">
                <span className="sm:hidden">EN</span>
                <span className="hidden sm:inline">English</span>
            </MenuItem>
        </Select>
    );
};

export default LanguageSelector;
