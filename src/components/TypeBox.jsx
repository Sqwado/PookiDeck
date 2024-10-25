import React from 'react';
import { usePokemon } from '../context/PokemonContext';
import { useTranslation } from 'react-i18next';

const TypeBox = ({ type }) => {

    const { t, i18n } = useTranslation();

    const { getType } = usePokemon();

    const typeInfo = getType(type);

    return (
        <div className="rounded-xl p-2 shadow-md border-2 border-black dark:border-white w-24 mx-auto flex justify-center items-center"
            style={{ backgroundColor: typeInfo?.backgroundColor }}>
            <span className="text-black dark:text-white text-center text-sm font-semibold tex-center uppercase">{typeInfo?.translations[i18n.language]}</span>
        </div>
    );
}

export default TypeBox;
