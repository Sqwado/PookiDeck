
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
            style={{ width: "150px" }}
            sx={{
                width: '270px',
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
                        maxHeight: 300, width: 270,
                        backgroundColor: 'transparent', backdropFilter: 'blur(10px)', borderRadius: '10px'
                    }
                }
            }}
        >
            <MenuItem className=" dark:text-white"
                value="ja">日本語</MenuItem>
            <MenuItem className="dark:text-white"
                value="ko">한국어</MenuItem>
            <MenuItem className="dark:text-white"
                value="fr">Français</MenuItem>
            <MenuItem className="dark:text-white"
                value="de">Deutsch</MenuItem>
            <MenuItem className="dark:text-white"
                value="es">Español</MenuItem>
            <MenuItem className="dark:text-white"
                value="it">Italiano</MenuItem>
            <MenuItem className="dark:text-white"
                value="en">English</MenuItem>
        </Select>
    );
};

export default LanguageSelector;
