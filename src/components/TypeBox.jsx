import React from 'react';
import { usePokemon } from '../context/PokemonContext';

const TypeBox = ({ type }) => {

    const { getType } = usePokemon();

    const typeInfo = getType(type);

    return (
        <div className="rounded-full p-2 shadow-md border-2 border-black dark:border-white w-24 mx-auto flex justify-center items-center"
            style={{ backgroundColor: typeInfo.backgroundColor }}>
            <span className="text-black dark:text-white text-center text-sm font-semibold tex-center uppercase">{typeInfo.translations.en}</span>
        </div>
    );
}

export default TypeBox;
